#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const REPO_ROOT = path.resolve(__dirname, '..')
const SOURCE_ROOT = path.join(REPO_ROOT, 'packages', 'ui', 'src')
const DOCS_ROOT = path.join(REPO_ROOT, 'apps', 'docs', 'app')
const ROOTS = [SOURCE_ROOT, DOCS_ROOT]

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

const files = ROOTS.flatMap(walk)
const componentDefinitions = new Map()
const errors = []

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  const relativePath = path.relative(REPO_ROOT, file).replaceAll('\\', '/')

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
}

if (errors.length) {
  console.error('Guard de redundancia UI: FALLA')
  for (const error of errors) console.error(`- ${error}`)
  console.error('\nRegla: un componente tiene una sola implementacion y un campo no repite su label como placeholder.')
  process.exit(1)
}

console.log(`Guard de redundancia UI: OK (${files.length} archivos, ${componentDefinitions.size} componentes YiQi).`)
