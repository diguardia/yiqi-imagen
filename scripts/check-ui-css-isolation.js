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

function splitSelectorList(selector) {
  const selectors = []
  let start = 0
  let roundDepth = 0
  let squareDepth = 0

  for (let index = 0; index < selector.length; index += 1) {
    const character = selector[index]
    if (character === '(') roundDepth += 1
    else if (character === ')') roundDepth = Math.max(0, roundDepth - 1)
    else if (character === '[') squareDepth += 1
    else if (character === ']') squareDepth = Math.max(0, squareDepth - 1)
    else if (character === ',' && roundDepth === 0 && squareDepth === 0) {
      selectors.push(selector.slice(start, index).trim())
      start = index + 1
    }
  }

  selectors.push(selector.slice(start).trim())
  return selectors.filter(Boolean)
}

function globalUniversalSelectors(source) {
  const selectors = []
  const blockPattern = /([^{}]+)\{/g

  for (const match of source.matchAll(blockPattern)) {
    const prelude = match[1].trim()
    if (!prelude || prelude.startsWith('@')) continue

    const unsafe = splitSelectorList(prelude).filter((selector) =>
      selector.includes('*') && !selector.includes('yiqi-'),
    )

    if (unsafe.length) {
      const line = source.slice(0, match.index).split(/\r?\n/).length
      selectors.push({ line, selectors: unsafe })
    }
  }

  return selectors
}

function inspect(source, file) {
  const errors = []
  const lines = source.split(/\r?\n/)

  for (const violation of globalUniversalSelectors(source)) {
    errors.push(`${file}:${violation.line} usa un selector universal global (${violation.selectors.join(', ')}); debe quedar aislado a clases YiQi.`)
  }

  lines.forEach((line, index) => {
    if (/\[\s*data-theme(?:\s*=|\s*\])/.test(line)) {
      errors.push(`${file}:${index + 1} usa el atributo generico data-theme; el runtime React debe usar data-yiqi-theme.`)
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
  const bad = [
    '* { box-sizing:border-box }',
    'html * { margin:0 }',
    '.yiqi-root *, body > * { min-width:0 }',
    ':root { --bg: red; }',
    'html[data-theme="dark"] { --yiqi-bg: black; }',
  ].join('\n')
  const good = [
    '.yiqi-root, .yiqi-root * { box-sizing:border-box }',
    ':where([class^="yiqi-"], [class*=" yiqi-"]) * { min-width:0 }',
    ':root { --yiqi-bg: red; }',
    'html[data-yiqi-theme="dark"] { --yiqi-bg: black; }',
  ].join('\n')

  if (inspect(bad, '<self-check>').length !== 5) {
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
