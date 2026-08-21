#!/usr/bin/env node

const assert = require('node:assert/strict')
const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')

const CONTENT_TYPES = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
])

function contentType(filePath) {
  return CONTENT_TYPES.get(path.extname(filePath).toLowerCase()) || 'application/octet-stream'
}

function resolveRequestPath(root, pathname) {
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return null
  }

  const relative = decoded.replace(/^[/\\]+/, '')
  const candidate = path.resolve(root, relative)
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) return null
  return candidate
}

function findStaticFile(root, pathname) {
  const candidate = resolveRequestPath(root, pathname)
  if (!candidate) return null

  try {
    const stat = fs.statSync(candidate)
    if (stat.isFile()) return candidate
    if (stat.isDirectory()) {
      const indexFile = path.join(candidate, 'index.html')
      if (fs.statSync(indexFile).isFile()) return indexFile
    }
  } catch {
    return null
  }

  return null
}

function runSelfTest() {
  const root = path.resolve('static-root')
  assert.equal(resolveRequestPath(root, '/shell/'), path.join(root, 'shell'))
  assert.equal(resolveRequestPath(root, '/../secret'), null)
  assert.equal(resolveRequestPath(root, '/%2e%2e/secret'), null)
  assert.equal(resolveRequestPath(root, '/%E0%A4%A'), null)
  assert.equal(contentType('app.js'), 'text/javascript; charset=utf-8')
  assert.equal(contentType('app.css'), 'text/css; charset=utf-8')
  assert.equal(contentType('font.woff2'), 'font/woff2')
  console.log('Servidor estatico: self-test OK')
}

if (process.argv.includes('--self-test')) {
  runSelfTest()
  process.exit(0)
}

const directory = process.argv[2]
if (!directory) {
  console.error('Uso: node scripts/serve-static.js <directorio> [puerto]')
  process.exit(1)
}

const root = path.resolve(directory)
if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`Servidor estatico: no existe el directorio ${root}`)
  process.exit(1)
}

const port = Number.parseInt(process.argv[3] || '3000', 10)
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`Servidor estatico: puerto invalido ${process.argv[3] || ''}`)
  process.exit(1)
}

const server = http.createServer((request, response) => {
  const method = request.method || 'GET'
  if (method !== 'GET' && method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' })
    response.end()
    return
  }

  const pathname = new URL(request.url || '/', 'http://127.0.0.1').pathname
  const file = findStaticFile(root, pathname)
  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end(method === 'HEAD' ? undefined : 'Not Found')
    return
  }

  const stat = fs.statSync(file)
  response.writeHead(200, {
    'Content-Length': stat.size,
    'Content-Type': contentType(file),
  })

  if (method === 'HEAD') response.end()
  else fs.createReadStream(file).pipe(response)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Servidor estatico: http://127.0.0.1:${port} -> ${root}`)
})
