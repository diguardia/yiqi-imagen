const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const repoRoot = path.resolve(__dirname, "..")
const codeExtensions = new Set([".js", ".jsx", ".ts", ".tsx"])
const ignoredDirs = new Set([".git", "node_modules", "fixtures", "docs", "Fuentes", "scripts"])
const sourceRootNames = ["src", "app", "components", "pages", "lib", "services"]
const workspaceContainers = ["apps", "packages"]

const patterns = [
  {
    name: "literal /undefined in route",
    regex: /\/undefined\b/,
    hint: "No navegues a rutas con segmentos undefined; valida item.id antes de construir la URL.",
  },
  {
    name: "item.ID as detail id",
    regex: /\bitem\.ID\b/,
    hint: "Usa item.id. Si no viene, corregi el query/smartie.",
  },
  {
    name: "dataset.id without explicit validation",
    regex: /\bdataset\.id\b(?![\s\S]{0,120}(?:if\s*\(|assert|throw|return|Number\.isFinite|parseInt|Number\())/,
    hint: "Valida dataset.id antes de navegar o evita dataset para ids de detalle.",
  },
  {
    name: "multiple id fallback with legacy uppercase ID",
    regex: /\b(?:id|detailId|entityId)\s*=\s*[^;\n]*(?:\?\?|\|\|)[^;\n]*\.ID\b/,
    hint: "No uses fallbacks multiples para ids; el contrato debe exponer item.id.",
  },
  {
    name: "multiple id fallback with business field",
    regex: /\b(?:id|detailId|entityId)\s*=\s*[^;\n]*(?:\?\?|\|\|)[^;\n]*(?:codigo|code|numero|number|nombre|name|slug)\b/i,
    hint: "No uses fallbacks multiples para ids; el contrato debe exponer item.id.",
  },
  {
    name: "route built with legacy uppercase ID",
    regex: /\b(?:router\.push|navigate|href\s*=)\s*\(?[^;\n]*\.ID\b/,
    hint: "Las rutas de detalle deben construirse con item.id, no con item.ID.",
  },
  {
    name: "route built with business field",
    regex: /\b(?:router\.push|navigate|href\s*=)\s*\(?[^;\n]*(?:codigo|code|numero|number|nombre|name|slug)\b/i,
    hint: "Las rutas de detalle deben construirse con item.id, no con campos de negocio.",
  },
]

function matchingPatterns(source) {
  return patterns.filter((pattern) => pattern.regex.test(source))
}

function isDirectory(target) {
  try {
    return fs.statSync(target).isDirectory()
  } catch {
    return false
  }
}

function projectSourceRoots(projectRoot) {
  return sourceRootNames
    .map((name) => path.join(projectRoot, name))
    .filter(isDirectory)
}

function discoverRoots(root) {
  const roots = [...projectSourceRoots(root)]

  for (const containerName of workspaceContainers) {
    const container = path.join(root, containerName)
    if (!isDirectory(container)) continue

    for (const entry of fs.readdirSync(container, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      roots.push(...projectSourceRoots(path.join(container, entry.name)))
    }
  }

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.isFile() && codeExtensions.has(path.extname(entry.name))) {
      roots.push(path.join(root, entry.name))
    }
  }

  return [...new Set(roots)]
}

function runSelfCheck() {
  const canonicalCases = [
    'href="app.html?id=${c.id}"',
    'router.push(`/items/${item.id}`)',
    'navigate(`/orders/${row.id}`)',
  ]
  const invalidCases = [
    'href="app.html?id=${c.ID}"',
    'router.push(`/items/${item.slug}`)',
    'router.push(`/items/${slug}`)',
    'const detailId = item.id || item.codigo',
    'const detailId = item.id || codigo',
  ]

  for (const source of canonicalCases) {
    const matches = matchingPatterns(source)
    if (matches.length > 0) {
      throw new Error(`Detail navigation guard rechazo un caso canonico: ${source} -> ${matches.map((item) => item.name).join(', ')}`)
    }
  }

  for (const source of invalidCases) {
    if (matchingPatterns(source).length === 0) {
      throw new Error(`Detail navigation guard no detecto un caso invalido: ${source}`)
    }
  }

  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'yiqi-detail-navigation-'))
  try {
    fs.mkdirSync(path.join(tempRoot, 'app'), { recursive: true })
    fs.mkdirSync(path.join(tempRoot, 'apps', 'docs', 'app'), { recursive: true })
    fs.mkdirSync(path.join(tempRoot, 'packages', 'ui', 'src'), { recursive: true })

    const roots = discoverRoots(tempRoot).map((root) => path.relative(tempRoot, root).replaceAll('\\', '/'))
    for (const expected of ['app', 'apps/docs/app', 'packages/ui/src']) {
      if (!roots.includes(expected)) {
        throw new Error(`Detail navigation guard no descubrio el root monorepo ${expected}`)
      }
    }
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true })
  }
}

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        walk(path.join(directory, entry.name), files)
      }
      continue
    }

    if (codeExtensions.has(path.extname(entry.name))) {
      files.push(path.join(directory, entry.name))
    }
  }

  return files
}

runSelfCheck()

const roots = discoverRoots(repoRoot)
const files = roots.flatMap((root) => {
  const stat = fs.statSync(root)
  return stat.isDirectory() ? walk(root) : [root]
})

const violations = []

for (const file of files) {
  const content = fs.readFileSync(file, "utf8")
  const lines = content.split(/\r?\n/)

  for (const pattern of patterns) {
    lines.forEach((line, index) => {
      if (pattern.regex.test(line)) {
        violations.push({
          file: path.relative(repoRoot, file),
          line: index + 1,
          pattern: pattern.name,
          hint: pattern.hint,
          text: line.trim(),
        })
      }
    })
  }
}

if (violations.length > 0) {
  console.error("Detail navigation guard failed:\n")
  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line} ${violation.pattern}`)
    console.error(`  ${violation.text}`)
    console.error(`  ${violation.hint}\n`)
  }
  process.exit(1)
}

console.log(`Detail navigation guard passed (${files.length} files scanned across ${roots.length} source roots).`)
