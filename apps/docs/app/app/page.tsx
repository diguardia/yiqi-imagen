import { YiQiKpiCard, YiQiTrustStat } from '@yiqi/ui/data-display'
import { YiQiRuntimeBanner } from '@yiqi/ui/feedback'
import { YiQiAppShell } from '@yiqi/ui/layout'

const navigation = [
  { href: '/app/', label: 'Vista general', active: true },
  { href: '/components/', label: 'Componentes' },
  { href: '/migrar/', label: 'Migrar HTML/CSS' },
] as const

export default function ApplicationPreviewPage() {
  return (
    <YiQiAppShell
      appName="YiQi Operaciones"
      navigation={[...navigation]}
      account={<span className="docs-account">Cuenta de ejemplo</span>}
    >
      <div className="docs-app-stack">
        <header className="docs-app-heading">
          <div>
            <p className="docs-kicker">Aplicación de referencia</p>
            <h1>Vista general</h1>
            <p>Una superficie real de Next.js que consume el mismo <code>@yiqi/ui</code> que debe usar cualquier aplicación.</p>
          </div>
        </header>

        <section aria-labelledby="app-kpis-title">
          <h2 id="app-kpis-title" className="docs-section-title">Indicadores</h2>
          <div className="yiqi-kpi-grid">
            <YiQiKpiCard label="Facturación" value="$ 4.284.900" meta="Últimos 30 días" />
            <YiQiKpiCard label="Órdenes" value="231" tone="positive" meta="+8,0%" />
            <YiQiKpiCard label="Pendientes" value="14" tone="warning" meta="Requieren revisión" />
          </div>
        </section>

        <section aria-labelledby="app-health-title">
          <h2 id="app-health-title" className="docs-section-title">Estado operativo</h2>
          <YiQiRuntimeBanner
            title="Servicios disponibles"
            description="Esta pantalla usa datos locales de ejemplo para validar composición y contratos visuales."
          />
        </section>

        <section aria-labelledby="app-trust-title">
          <h2 id="app-trust-title" className="docs-section-title">Plataforma</h2>
          <div className="yiqi-trust-grid">
            <YiQiTrustStat value="99,9%" label="Disponibilidad" />
            <YiQiTrustStat value="24/7" label="Monitoreo" />
            <YiQiTrustStat value="3" label="Ambientes" />
          </div>
        </section>
      </div>
    </YiQiAppShell>
  )
}
