import { randomUUID } from 'node:crypto'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import {
  AuthenticationError,
  AuthorizationError,
  authorize,
  requireSession,
} from '@/server/auth'
import { consumeRateLimit } from '@/server/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_REQUEST_BYTES = 16 * 1024
const MAX_RESPONSE_BYTES = 256 * 1024
const UPSTREAM_TIMEOUT_MS = 5_000

const paramsSchema = z.object({ id: z.string().uuid() }).strict()
const bodySchema = z.object({ name: z.string().trim().min(1).max(120) }).strict()
const upstreamSchema = z.object({ id: z.string().uuid(), name: z.string().max(120) }).strict()
const correlationIdSchema = z.string().uuid()

function jsonError(status: number, code: string, correlationId: string) {
  return NextResponse.json(
    { error: code, correlationId },
    { status, headers: { 'Cache-Control': 'no-store' } },
  )
}

async function readBodyWithLimit(
  body: ReadableStream<Uint8Array> | null,
  limit: number,
  errorCode: string,
) {
  if (!body) return new Uint8Array()

  const reader = body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > limit) {
      await reader.cancel(errorCode)
      throw new Error(errorCode)
    }
    chunks.push(value)
  }

  const bytes = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return bytes
}

function rejectDeclaredLength(headers: Headers, limit: number, errorCode: string) {
  const value = headers.get('content-length')
  if (value !== null && (!/^\d+$/.test(value) || Number(value) > limit)) {
    throw new Error(errorCode)
  }
}

async function readRequestJson(request: NextRequest) {
  rejectDeclaredLength(request.headers, MAX_REQUEST_BYTES, 'request_too_large')
  const bytes = await readBodyWithLimit(request.body, MAX_REQUEST_BYTES, 'request_too_large')
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown
}

async function readResponseJson(response: Response) {
  rejectDeclaredLength(response.headers, MAX_RESPONSE_BYTES, 'upstream_too_large')
  const bytes = await readBodyWithLimit(response.body, MAX_RESPONSE_BYTES, 'upstream_too_large')
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown
}

function classifyFailure(error: unknown) {
  if (error instanceof AuthenticationError) return { status: 401, reason: 'authentication_failed' }
  if (error instanceof AuthorizationError) return { status: 403, reason: 'authorization_failed' }
  if (error instanceof z.ZodError || error instanceof SyntaxError) {
    return { status: 400, reason: 'schema_validation_failed' }
  }
  if (error instanceof Error && error.message === 'request_too_large') {
    return { status: 413, reason: 'request_too_large' }
  }
  if (error instanceof Error && error.name === 'TimeoutError') {
    return { status: 504, reason: 'upstream_timeout' }
  }
  return { status: 502, reason: 'dependency_or_internal_failure' }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const suppliedCorrelationId = correlationIdSchema.safeParse(request.headers.get('x-correlation-id'))
  const correlationId = suppliedCorrelationId.success ? suppliedCorrelationId.data : randomUUID()

  try {
    const session = await requireSession(request)
    const rate = await consumeRateLimit({ subject: session.userId, operation: 'resource:update' })
    if (!rate.allowed) return jsonError(429, 'rate_limit_exceeded', correlationId)

    const { id } = paramsSchema.parse(await context.params)
    await authorize(session, { operation: 'resource:update', resourceId: id })
    const body = bodySchema.parse(await readRequestJson(request))

    const upstreamBase = new URL(process.env.YIQI_UPSTREAM_URL ?? '')
    const allowedHosts = new Set((process.env.YIQI_UPSTREAM_HOSTS ?? '').split(',').filter(Boolean))
    if (upstreamBase.protocol !== 'https:' || !allowedHosts.has(upstreamBase.hostname)) {
      throw new Error('upstream_not_allowed')
    }

    const response = await fetch(new URL(`/resources/${encodeURIComponent(id)}`, upstreamBase), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session.upstreamAccessToken}`,
        'Content-Type': 'application/json',
        'X-Correlation-Id': correlationId,
      },
      body: JSON.stringify(body),
      redirect: 'error',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })

    if (!response.ok) throw new Error(`upstream_status_${response.status}`)
    const result = upstreamSchema.parse(await readResponseJson(response))
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    const { status, reason } = classifyFailure(error)
    console.error(JSON.stringify({ event: 'resource_update_failed', correlationId, reason }))
    return jsonError(status, 'request_rejected', correlationId)
  }
}
