#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const REPO_ROOT = path.resolve(__dirname, '..')
const UI_CSS_ROOT = path.join(REPO_ROOT, 'packages', 'ui', 'src')

function cssFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return cssFiles(fullPath)
    return entry.isFile() && entry.name.endsWith('.css') ? [fullPath] : []
  })
}

function inspect(source, file) {
  const errors = []
  const lines = source.split(/\r?\n/)

  lines.forEach((line, index) => {
    if (/^\s*\*\s*\{/.test(line)) {
      errors.push(`${file}:${index + 1} usa un selector universal global; debe quedar aislado a clases YiQi.`)
    }

    for (const customProperty of line.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) {
      if (!customProperty[1].startsWith('--yiqi-')) {
        errors.push(`${file}:${index + 1} publica la variable global generica ${customProperty[1]}; usar namespace --yiqi-.`)
      }
    }
  })

  return errors
}

function selfCheck() {
  const bad = '* { box-sizing:border-box }\n:root { --bg: red; }'
  const good = '.yiqi-root, .yiqi-root * { box-sizing:border-box }\n:root { --yiqi-bg: red; }'

  if (inspect(bad, '<self-check>').length !== 2) {
    throw new Error('CSS isolation guard no detecto sus casos de control.')
  }
  if (inspect(good, '<self-check>').length !== 0) {
    throw new Error('CSS isolation guard rechazo CSS YiQi correctamente namespaced.')
  }
}

selfCheck()
const errors = cssFiles(UI_CSS_ROOT).flatMap((file) =>
  inspect(fs.readFileSync(file, 'utf8'), path.relative(REPO_ROOT, file).replaceAll('\\', '/')),
)

if (errors.length) {
  console.error('Guard de aislamiento CSS: FALLA')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log('Guard de aislamiento CSS: OK')
