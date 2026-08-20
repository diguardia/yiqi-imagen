'use client'

import { useEffect, useState } from 'react'
import { YiQiButton, YiQiTextarea } from '@yiqi/ui/primitives'

const EXAMPLE_HTML = `<main class="dashboard">
  <header class="topbar">
    <h1>Operaciones</h1>
  </header>
  <section class="kpi-grid">
    <article class="kpi-card">
      <span>Órdenes</span>
      <strong>231</strong>
    </article>
  </section>
  <form>
    <label for="email">Email</label>
    <input id="email" type="email" />
    <button type="submit">Continuar</button>
  </form>
</main>`

const EXAMPLE_CSS = `.dashboard { padding: 24px; font-family: system-ui, sans-serif; }
.topbar { display: flex; align-items: center; justify-content: space-between; }
.kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.kpi-card { padding: 18px; border-radius: 12px; background: #f4f4f5; }
form { display: grid; gap: 10px; max-width: 320px; margin-top: 24px; }`

type Detection = {
  component: string
  importPath: string
  count: number
  reason: string
}

type MigrationAnalysis = {
  elements: number
  classes: number
  inlineStyles: number
  detections: Detection[]
}

const EMPTY_ANALYSIS: MigrationAnalysis = {
  elements: 0,
  classes: 0,
  inlineStyles: 0,
  detections: [],
}

function addDetection(detections: Detection[], detection: Detection | null) {
  if (detection && detection.count > 0) detections.push(detection)
}

function analyzeHtml(source: string): MigrationAnalysis {
  const document = new DOMParser().parseFromString(source, 'text/html')
  const elements = [...document.body.querySelectorAll('*')]
  const classes = new Set(elements.flatMap((element) => [...element.classList]))
  const inlineStyles = elements.filter((element) => element.hasAttribute('style')).length
  const detections: Detection[] = []

  const buttons = document.body.querySelectorAll('button, input[type="button"], input[type="submit"]').length
  addDetection(detections, buttons ? {
    component: 'YiQiButton',
    importPath: '@yiqi/ui/primitives',
    count: buttons,
    reason: 'Acciones y submits detectados.',
  } : null)

  const textInputs = document.body.querySelectorAll('input:not([type="checkbox"]):not([type="button"]):not([type="submit"]):not([type="hidden"])').length
  addDetection(detections, textInputs ? {
    component: 'YiQiInput',
    importPath: '@yiqi/ui/primitives',
    count: textInputs,
    reason: 'Campos de entrada detectados.',
  } : null)

  const textareas = document.body.querySelectorAll('textarea').length
  addDetection(detections, textareas ? {
    component: 'YiQiTextarea',
    importPath: '@yiqi/ui/primitives',
    count: textareas,
    reason: 'Campos multilínea detectados.',
  } : null)

  const checkboxes = document.body.querySelectorAll('input[type="checkbox"]').length
  addDetection(detections, checkboxes ? {
    component: 'YiQiCheckbox',
    importPath: '@yiqi/ui/primitives',
    count: checkboxes,
    reason: 'Checkboxes detectados.',
  } : null)

  const hasLogin = Boolean(document.body.querySelector('form input[type="password"]'))
  addDetection(detections, hasLogin ? {
    component: 'YiQiLogin',
    importPath: '@yiqi/ui/authentication',
    count: 1,
    reason: 'Formulario con contraseña: revisar si corresponde al contrato de autenticación.',
  } : null)

  const shellSignals = document.body.querySelectorAll('nav, aside').length
  addDetection(detections, shellSignals ? {
    component: 'YiQiAppShell',
    importPath: '@yiqi/ui/layout',
    count: shellSignals,
    reason: 'Navegación o sidebar detectados: evaluar composición con el shell canónico.',
  } : null)

  const kpis = document.body.querySelectorAll('[class*="kpi" i], [data-kpi]').length
  addDetection(detections, kpis ? {
    component: 'YiQiKpiCard',
    importPath: '@yiqi/ui/data-display',
    count: kpis,
    reason: 'Clases o atributos asociados a KPIs detectados.',
  } : null)

  const banners = document.body.querySelectorAll('[class*="banner" i], [role="status"], [role="alert"]').length
  addDetection(detections, banners ? {
    component: 'YiQiRuntimeBanner',
    importPath: '@yiqi/ui/feedback',
    count: banners,
    reason: 'Banners o estados visibles detectados.',
  } : null)

  return {
    elements: elements.length,
    classes: classes.size,
    inlineStyles,
    detections,
  }
}

function isSafeLocalReference(value: string) {
  const normalized = value.trim().toLowerCase()
  return normalized === '' || normalized.startsWith('#') || normalized.startsWith('data:') || normalized.startsWith('blob:')
}

function sanitizeHtml(source: string) {
  const document = new DOMParser().parseFromString(source, 'text/html')
  document.querySelectorAll('script, style, iframe, object, embed, base, link, meta').forEach((element) => element.remove())

  for (const element of document.body.querySelectorAll('*')) {
    for (const attribute of [...element.attributes]) {
      const name = attribute.name.toLowerCase()
      if (name.startsWith('on')) {
        element.removeAttribute(attribute.name)
        continue
      }
      if (['src', 'href', 'action', 'formaction', 'poster', 'srcset'].includes(name) && !isSafeLocalReference(attribute.value)) {
        element.removeAttribute(attribute.name)
      }
    }
  }

  return document.body.innerHTML
}

function escapeStyle(css: string) {
  return css.replace(/<\/style/gi, '<\\/style')
}

function buildPreview(source: string, css: string) {
  const safeHtml = sanitizeHtml(source)
  const safeCss = escapeStyle(css)
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:" />
  <style>html,body{margin:0;min-height:100%;}body{padding:20px;box-sizing:border-box;}*,*::before,*::after{box-sizing:border-box;}${safeCss}</style>
</head>
<body>${safeHtml}</body>
</html>`
}

function MigrationMap({ analysis }: { analysis: MigrationAnalysis }) {
  if (analysis.detections.length === 0) {
    return <p className="docs-migration-empty">Todavía no se detectaron equivalencias directas con componentes publicados.</p>
  }

  return (
    <div className="docs-migration-detections">
      {analysis.detections.map((detection) => (
        <article className="docs-migration-detection" key={detection.component} data-testid={`migration-${detection.component}`}>
          <div>
            <strong>{detection.component}</strong>
            <code>{detection.importPath}</code>
          </div>
          <span>{detection.count}</span>
          <p>{detection.reason}</p>
        </article>
      ))}
    </div>
  )
}

export default function MigrationWorkbenchPage() {
  const [html, setHtml] = useState(EXAMPLE_HTML)
  const [css, setCss] = useState(EXAMPLE_CSS)
  const [preview, setPreview] = useState('')
  const [analysis, setAnalysis] = useState<MigrationAnalysis>(EMPTY_ANALYSIS)

  useEffect(() => {
    setPreview(buildPreview(html, css))
    setAnalysis(analyzeHtml(html))
  }, [html, css])

  const resetExample = () => {
    setHtml(EXAMPLE_HTML)
    setCss(EXAMPLE_CSS)
  }

  return (
    <main className="docs-page docs-migration-page">
      <header className="docs-header">
        <div>
          <p className="docs-kicker">HTML/CSS → React</p>
          <h1 className="docs-title">Banco de migración</h1>
          <p className="docs-subtitle">Pegá una pantalla legacy para verla sin salir de Next.js y detectar qué partes ya deben reemplazarse por contratos de <code>@yiqi/ui</code>.</p>
        </div>
        <YiQiButton variant="ghost" onClick={resetExample}>Restablecer ejemplo</YiQiButton>
      </header>

      <div className="docs-migration-workspace">
        <section className="docs-migration-source" aria-labelledby="migration-source-title">
          <div className="docs-migration-section-heading">
            <h2 id="migration-source-title">Fuente legacy</h2>
            <span>Se procesa localmente en el navegador.</span>
          </div>
          <YiQiTextarea
            label="HTML legacy"
            className="docs-migration-textarea"
            value={html}
            onChange={(event) => setHtml(event.currentTarget.value)}
            spellCheck={false}
            rows={18}
          />
          <YiQiTextarea
            label="CSS legacy"
            className="docs-migration-textarea"
            value={css}
            onChange={(event) => setCss(event.currentTarget.value)}
            spellCheck={false}
            rows={14}
          />
        </section>

        <section className="docs-migration-preview-panel" aria-labelledby="migration-preview-title">
          <div className="docs-migration-section-heading">
            <h2 id="migration-preview-title">Vista previa aislada</h2>
            <span>Scripts y recursos externos quedan bloqueados.</span>
          </div>
          <iframe
            className="docs-migration-preview"
            data-testid="migration-preview"
            title="Vista previa aislada"
            sandbox=""
            referrerPolicy="no-referrer"
            srcDoc={preview}
          />
        </section>
      </div>

      <section className="docs-migration-analysis" aria-labelledby="migration-analysis-title">
        <div className="docs-migration-section-heading">
          <h2 id="migration-analysis-title">Mapa de migración</h2>
          <span>{analysis.elements} elementos · {analysis.classes} clases · {analysis.inlineStyles} estilos inline</span>
        </div>
        <MigrationMap analysis={analysis} />
      </section>
    </main>
  )
}
