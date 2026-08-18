#!/usr/bin/env node

const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const ROOT = path.resolve(__dirname, '..')
const EXPECTED_NEXT = '16.2.12'
const ALLOWED_PACKAGES = new Set(['next', 'postcss', 'sharp'])
const ALLOWED_ADVISORIES = new Set([
  'https://github.com/advisories/GHSA-qx2v-qp2m-jg93',
  'https://github.com/advisories/GHSA-6g55-p6wh-862q',
  'https://github.com/advisories/GHSA-r28c-9q8g-f849',
  'https://github.com/advisories/GHSA-fxqj-rqcc-2cmp',
  'https://github.com/advisories/GHSA-f88m-g3jw-g9cj',
])

function fail(message, details = []) {
  console.error(`Audit productivo: FALLA\n${message}`)
  details.forEach((detail) => console.error(`- ${detail}`))
  process.exit(1)
}

function getAuditVulnerabilities(report) {
  if (!report || typeof report !== 'object' || Array.isArray(report)) {
    throw new Error('npm audit devolvio una estructura JSON invalida.')
  }

  if (report.error) {
    const detail = typeof report.error === 'string'
      ? report.error
      : report.error.summary || report.error.message || report.error.code || 'sin detalle'
    throw new Error(`npm audit reporto un error: ${detail}`)
  }

  if (!Object.prototype.hasOwnProperty.call(report, 'vulnerabilities')
    || !report.vulnerabilities
    || typeof report.vulnerabilities !== 'object'
    || Array.isArray(report.vulnerabilities)) {
    throw new Error('npm audit no incluyo un mapa vulnerabilities valido.')
  }

  return report.vulnerabilities
}

function runSelfTest() {
  assert.deepEqual(getAuditVulnerabilities({ vulnerabilities: {} }), {})
  assert.throws(
    () => getAuditVulnerabilities({ error: { code: 'EAI_AGAIN' } }),
    /npm audit reporto un error/,
  )
  assert.throws(
    () => getAuditVulnerabilities({ metadata: {} }),
    /vulnerabilities valido/,
  )
  assert.throws(
    () => getAuditVulnerabilities({ vulnerabilities: null }),
    /vulnerabilities valido/,
  )
  console.log('Politica de audit productivo: OK')
}

if (process.argv.includes('--self-test')) {
  runSelfTest()
  process.exit(0)
}

const nextPackagePath = path.join(ROOT, 'node_modules', 'next', 'package.json')
if (!fs.existsSync(nextPackagePath)) fail('No se encontro node_modules/next/package.json. Ejecutar npm install/npm ci primero.')

const nextVersion = JSON.parse(fs.readFileSync(nextPackagePath, 'utf8')).version
if (nextVersion !== EXPECTED_NEXT) {
  fail(`La excepcion temporal solo esta revisada para next@${EXPECTED_NEXT}; se encontro next@${nextVersion}.`)
}

const result = spawnSync('npm', ['audit', '--omit=dev', '--json'], {
  cwd: ROOT,
  encoding: 'utf8',
  shell: process.platform === 'win32',
})

const raw = result.stdout || result.stderr
let report
try {
  report = JSON.parse(raw)
} catch {
  fail('npm audit no devolvio JSON valido.', [raw.slice(0, 500)])
}

let vulnerabilities
try {
  vulnerabilities = getAuditVulnerabilities(report)
} catch (error) {
  fail('npm audit no devolvio un reporte utilizable.', [
    error instanceof Error ? error.message : String(error),
    `codigo de salida: ${result.status ?? 'sin codigo'}`,
  ])
}

const highOrCritical = Object.entries(vulnerabilities).filter(([, vulnerability]) =>
  vulnerability && (vulnerability.severity === 'high' || vulnerability.severity === 'critical'),
)

if (highOrCritical.length === 0) {
  console.log('Audit productivo: OK (sin vulnerabilidades high/critical).')
  process.exit(0)
}

const unexpected = []
for (const [packageName, vulnerability] of highOrCritical) {
  if (!ALLOWED_PACKAGES.has(packageName)) {
    unexpected.push(`${packageName}: paquete high/critical no contemplado`)
    continue
  }

  for (const via of vulnerability.via || []) {
    if (typeof via === 'string') {
      if (!ALLOWED_PACKAGES.has(via)) unexpected.push(`${packageName}: dependencia vulnerable inesperada ${via}`)
      continue
    }

    const url = via && via.url
    if (!url || !ALLOWED_ADVISORIES.has(url)) {
      unexpected.push(`${packageName}: advisory inesperado ${url || via.title || 'sin identificador'}`)
    }
  }
}

if (unexpected.length) {
  fail('Aparecieron vulnerabilidades productivas high/critical fuera de la excepcion upstream revisada.', unexpected)
}

console.warn(`Audit productivo: EXCEPCION TEMPORAL conocida para next@${EXPECTED_NEXT}.`)
console.warn('Solo se toleran los advisories PostCSS/Sharp enumerados en scripts/check-production-audit.js.')
console.warn('Cualquier paquete o advisory high/critical adicional hace fallar el gate.')
