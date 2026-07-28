const fs = require('node:fs')
const path = require('node:path')

const CODE_EXTENSIONS = new Set(['.html', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte'])
const IGNORED_DIRECTORIES = new Set([
  '.git',
  '.next',
  'coverage',
  'dist',
  'build',
  'node_modules',
])
const DEFAULT_ROOTS = ['app', 'src', 'pages']

const checks = [
  {
    id: 'embedded-style-block',
    pattern: /<style(?:\s|>)/i,
    message: 'Mover el bloque <style> a una hoja separada; el CSS visual debe venir del styles.css canónico.',
  },
  {
    id: 'static-html-inline-style',
    pattern: /\bstyle\s*=\s*["'][^"'{}]*["']/i,
    message: 'Reemplazar el style inline estático por una clase canónica.',
  },
  {
    id: 'static-jsx-inline-style',
    pattern: /\bstyle\s*=\s*\{\{\s*(?:[\w$-]+\s*:\s*(?:['"`][^'"`$]*['"`]|-?\d+(?:\.\d+)?)(?:\s*,\s*)?)+\s*\}\}/i,
    message: 'Reservar style={{...}} para valores calculados en runtime; usar una clase para constantes.',
  },
  {
    id: 'embedded-css-text',
    pattern: /\.style\.cssText\s*=|setAttribute\s*\(\s*['"]style['"]/i,
    message: 'No embeber CSS visual en cadenas; usar clases canónicas o un adaptador separado.',
  },
  {
    id: 'runtime-style-injection',
    pattern: /createElement\s*\(\s*['"]style['"]\s*\)|\bstyle\.textContent\s*=/i,
    message: 'No inyectar hojas visuales desde JavaScript; publicar las reglas reutilizables en styles.css.',
  },
  {
    id: 'visual-css-in-js',
    pattern: /\bstyled(?:\.[a-z][\w-]*|\s*\()[^;\n]*`|\bcss\s*`/i,
    message: 'No usar CSS-in-JS visual en una app consumidora; usar clases del styles.css canónico.',
  },
]

function collectFiles(target, files) {
  if (!fs.existsSync(target)) return
  const stat = fs.statSync(target)
  if (stat.isFile()) {
    if (CODE_EXTENSIONS.has(path.extname(target).toLowerCase())) files.push(target)
    return
  }

  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue
    collectFiles(path.join(target, entry.name), files)
  }
}

function inspectSource(source, file) {
  const findings = []
  const lines = source.split(/\r?\n/)

  lines.forEach((line, index) => {
    for (const check of checks) {
      if (check.pattern.test(line)) {
        findings.push({
          file,
          line: index + 1,
          id: check.id,
          message: check.message,
        })
      }
    }
  })

  return findings
}

function inspectFile(file) {
  return inspectSource(fs.readFileSync(file, 'utf8'), file)
}

function runSelfCheck() {
  const staticCases = [
    '<style>.card { color: red }</style>',
    '<div style="display:grid;gap:12px"></div>',
    "<div style={{ display: 'grid', gap: 12 }} />",
    "element.style.cssText = 'display:grid'",
    "const style = document.createElement('style')",
    'const Card = styled.div`color: red;`',
  ]
  const dynamicCases = [
    '<div className="load-progress-fill" style={{ width: `${progress}%` }} />',
    '<div style={computedStyle} />',
    '<div style="width:{{ progress }}%"></div>',
  ]

  for (const source of staticCases) {
    if (inspectSource(source, '<self-check>').length === 0) {
      throw new Error(`Consumer CSS guard no detectó un caso estático: ${source}`)
    }
  }
  for (const source of dynamicCases) {
    if (inspectSource(source, '<self-check>').length !== 0) {
      throw new Error(`Consumer CSS guard rechazó un caso dinámico permitido: ${source}`)
    }
  }
}

function main() {
  runSelfCheck()
  const requestedRoots = process.argv.slice(2)
  const roots = requestedRoots.length > 0 ? requestedRoots : DEFAULT_ROOTS
  const files = []

  roots.forEach((root) => collectFiles(path.resolve(root), files))
  const findings = files.flatMap(inspectFile)

  if (findings.length === 0) {
    console.log(`Consumer CSS guard: OK (${files.length} archivos revisados).`)
    return
  }

  console.error('Consumer CSS guard encontró CSS embebido o estilos inline estáticos:\n')
  for (const finding of findings) {
    console.error(
      `${path.relative(process.cwd(), finding.file)}:${finding.line} [${finding.id}] ${finding.message}`,
    )
  }
  process.exitCode = 1
}

main()
