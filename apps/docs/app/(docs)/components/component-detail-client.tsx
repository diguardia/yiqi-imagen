'use client'

import Link from 'next/link'
import { useState } from 'react'
import { YiQiLogo, YiQiThemeCycle } from '@yiqi/ui/foundation'
import { YiQiButton, YiQiCheckbox, YiQiInput, YiQiTextarea, YiQiTooltip } from '@yiqi/ui/primitives'
import { YiQiKpiCard, YiQiTrustStat } from '@yiqi/ui/data-display'
import { YiQiRuntimeBanner } from '@yiqi/ui/feedback'

const tooltipPreviewLabel = 'Ayuda contextual'

export function CodeSnippet({ code, label }: { code: string; label: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  const copy = async () => {
    setStatus(await copyText(code) ? 'copied' : 'error')
  }

  const buttonLabel = status === 'copied' ? 'Copiado' : status === 'error' ? 'Reintentar' : 'Copiar'

  return (
    <div className="docs-code-block" data-testid={`snippet-${label.toLowerCase()}`}>
      <div className="docs-code-toolbar">
        <span>{label}</span>
        <YiQiButton className="docs-copy-button" variant="ghost" onClick={copy}>{buttonLabel}</YiQiButton>
      </div>
      <pre tabIndex={0}><code>{code}</code></pre>
      <span className="docs-sr-status" aria-live="polite">
        {status === 'copied' ? 'Código copiado al portapapeles.' : status === 'error' ? 'No se pudo copiar el código.' : ''}
      </span>
    </div>
  )
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.readOnly = true
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.append(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    textarea.remove()
    return copied
  }
}

export function ComponentPreview({ id }: { id: string }) {
  switch (id) {
    case 'logo':
      return <YiQiLogo className="docs-detail-logo" title="YiQi" />
    case 'provider':
      return <ContractFlow items={['Preferencia', 'YiQiProvider', 'Aplicación']} />
    case 'theme-cycle':
      return <YiQiThemeCycle />
    case 'theme-script':
      return <ContractFlow items={['Storage', 'Tema resuelto', 'Primer render']} />
    case 'button':
      return (
        <div className="docs-detail-row">
          <YiQiButton>Default</YiQiButton>
          <YiQiButton variant="primary">Primary</YiQiButton>
          <YiQiButton variant="ghost">Ghost</YiQiButton>
          <YiQiButton disabled>Disabled</YiQiButton>
        </div>
      )
    case 'input':
      return (
        <div className="docs-detail-form">
          <YiQiInput label="Correo" type="email" placeholder="nombre@empresa.com" />
          <YiQiInput label="Código" defaultValue="YQ-2048" disabled />
        </div>
      )
    case 'textarea':
      return <div className="docs-detail-form"><YiQiTextarea label="Notas" defaultValue="Resumen breve de la operación." rows={4} /></div>
    case 'checkbox':
      return (
        <div className="docs-detail-stack">
          <YiQiCheckbox label="Incluir pendientes" defaultChecked />
          <YiQiCheckbox label="Enviar una copia" />
          <YiQiCheckbox label="Opción no disponible" disabled />
        </div>
      )
    case 'tooltip':
      return (
        <div className="docs-detail-row">
          <YiQiTooltip label={tooltipPreviewLabel} side="top">
            <button className="yiqi-icon-button docs-help-trigger" type="button" aria-label={tooltipPreviewLabel}>?</button>
          </YiQiTooltip>
          <span className="docs-preview-hint">Pasa el cursor o enfoca el control</span>
        </div>
      )
    case 'login':
      return (
        <div className="docs-launch-preview">
          <span className="docs-launch-index">01</span>
          <div><strong>Flujo completo</strong><p>Validación, carga, error, remember y recuperación.</p></div>
          <Link className="docs-cta docs-cta--primary" href="/login/" prefetch={false}>Abrir login</Link>
        </div>
      )
    case 'app-shell':
      return (
        <div className="docs-launch-preview">
          <span className="docs-launch-index">02</span>
          <div><strong>Composición responsive</strong><p>Sidebar desktop y drawer mobile con los mismos destinos.</p></div>
          <Link className="docs-cta docs-cta--primary" href="/shell/" prefetch={false}>Abrir shell</Link>
        </div>
      )
    case 'kpi-card':
      return (
        <div className="yiqi-kpi-grid docs-detail-data-grid">
          <YiQiKpiCard label="Facturación" value="$ 4.284.900" meta="Últimos 30 días" />
          <YiQiKpiCard label="Órdenes" value="231" meta="+8,0%" tone="positive" />
          <YiQiKpiCard label="Pendientes" value="14" meta="Revisión requerida" tone="warning" />
          <YiQiKpiCard label="Alertas" value="2" meta="Atención" tone="danger" />
        </div>
      )
    case 'trust-stat':
      return (
        <div className="yiqi-trust-grid docs-detail-data-grid">
          <YiQiTrustStat value="99,9%" label="Disponibilidad" />
          <YiQiTrustStat value="24/7" label="Monitoreo" />
          <YiQiTrustStat value="8" label="Servicios" />
        </div>
      )
    case 'runtime-banner':
      return (
        <div className="docs-detail-stack docs-detail-banners">
          <YiQiRuntimeBanner title="Operación estable" description="No hay eventos que requieran atención." />
          <YiQiRuntimeBanner title="Revisión pendiente" description="Hay elementos que necesitan verificación manual." tone="warning" action={<YiQiButton>Revisar</YiQiButton>} />
          <YiQiRuntimeBanner title="Servicio interrumpido" description="La operación no puede continuar." tone="danger" />
        </div>
      )
    default:
      return null
  }
}

function ContractFlow({ items }: { items: string[] }) {
  return (
    <ol className="docs-contract-flow">
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </li>
      ))}
    </ol>
  )
}
