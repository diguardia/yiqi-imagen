#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const REPO_ROOT = path.resolve(__dirname, '..')
const SOURCE_ROOT = path.join(REPO_ROOT, 'packages', 'ui', 'src')
const DOCS_ROOT = path.join(REPO_ROOT, 'apps', 'docs', 'app')
const ROOTS = [SOURCE_ROOT, DOCS_ROOT]
const MIN_COPY_LENGTH = 4

function walk(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    return entry.isFile() && /\.(tsx|jsx)$/.test(entry.name) ? [fullPath] : []
  })
}

function normalizeCopy(value) {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('es')
}

function lineFor(source, index) {
  return source.slice(0, index).split('\n').length
}

function addVisibleCopy(copies, rawValue, sourceType, index) {
  const value = rawValue.trim().replace(/\s+/g, ' ')
  if (value.length < MIN_COPY_LENGTH) return
  if (!/[\p{L}\p{N}]/u.test(value)) return

  const normalized = normalizeCopy(value)
  const list = copies.get(normalized) ?? []
  list.push({ value, sourceType, index })
  copies.set(normalized, list)
}

const files = ROOTS.flatMap(walk)
const componentDefinitions = new Map()
const errors = []

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  const relativePath = path.relative(REPO_ROOT, file).replaceAll('\\', '/')
  const visibleCopies = new Map()

  for (const match of source.matchAll(/export\s+(?:function|const)\s+(YiQi[A-Z][A-Za-z0-9_]*)/g)) {
    const name = match[1]
    const previous = componentDefinitions.get(name)
    if (previous) {
      errors.push(`${relativePath}:${lineFor(source, match.index)} duplica el componente ${name}; ya existe en ${previous}`)
    } else {
      componentDefinitions.set(name, `${relativePath}:${lineFor(source, match.index)}`)
    }
  }

  for (const match of source.matchAll(/<YiQiInput\b([\s\S]*?)(?:\/>|>)/g)) {
    const attributes = match[1]
    const label = attributes.match(/\blabel\s*=\s*["']([^"']+)["']/)
    const placeholder = attributes.match(/\bplaceholder\s*=\s*["']([^"']+)["']/)
    if (!label || !placeholder) continue
    if (normalizeCopy(label[1]) !== normalizeCopy(placeholder[1])) continue

    errors.push(
      `${relativePath}:${lineFor(source, match.index)} repite el mismo texto visible en label y placeholder: "${label[1]}"`,
    )
  }

  for (const match of source.matchAll(/\b(label|placeholder|title|description|helperText|caption|hint|message)\s*=\s*["']([^"']+)["']/g)) {
    addVisibleCopy(visibleCopies, match[2], `prop ${match[1]}`, match.index)
  }

  for (const match of source.matchAll(/\b([A-Za-z][A-Za-z0-9]*(?:Label|Placeholder|Title|Description|Message|Hint|Caption))\s*=\s*["']([^"']+)["']/g)) {
    addVisibleCopy(visibleCopies, match[2], `default ${match[1]}`, match.index)
  }

  for (const match of source.matchAll(/>([^<>{}\n]+)</g)) {
    addVisibleCopy(visibleCopies, match[1], 'texto JSX', match.index)
  }

  for (const occurrences of visibleCopies.values()) {
    if (occurrences.length < 2) continue

    const uniquePositions = new Map(occurrences.map((item) => [`${item.index}:${item.sourceType}`, item]))
    const repeated = [...uniquePositions.values()]
    if (repeated.length < 2) continue

    const positions = repeated
      .map((item) => `${item.sourceType} linea ${lineFor(source, item.index)}`)
      .join(', ')

    errors.push(`${relativePath} repite el texto visible "${repeated[0].value}" (${positions})`)
  }
}

if (errors.length) {
  console.error('Guard de redundancia UI: FALLA')
  for (const error of errors) console.error(`- ${error}`)
  console.error('\nRegla: una implementacion por componente y una sola aparicion por concepto visible, salvo funcion distinta.')
  process.exit(1)
}

console.log(`Guard de redundancia UI: OK (${files.length} archivos, ${componentDefinitions.size} componentes YiQi).`)
