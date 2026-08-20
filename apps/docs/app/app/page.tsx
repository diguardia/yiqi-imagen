import { YiQiKpiCard } from '@yiqi/ui/data-display'
import { YiQiRuntimeBanner } from '@yiqi/ui/feedback'
import { YiQiAppShell } from '@yiqi/ui/layout'

const navigation = [
  { href: '/app/', label: 'Vista general', active: true },
  { href: '#indicadores', label: 'Indicadores' },
  { href: '#estado', label: 'Estado' },
] as const

export default function ApplicationPreviewPage() {
  return (
    <YiQiAppShell appName="Operaciones" navigation={[...navigation]}>
      <div className="docs-app-stack">
        <header className="docs-app-heading">
          <h1>Vista general</h1>
        </header>

        <section id="indicadores" aria-labelledby="app-kpis-title">
          <h2 id="app-kpis-title" className="docs-section-title">Indicadores</h2>
          <div className="yiqi-kpi-grid">
            <YiQiKpiCard label="Facturación" value="$ 4.284.900" meta="Últimos 30 días" />
            <YiQiKpiCard label="Órdenes" value="231" tone="positive" meta="+8,0%" />
            <YiQiKpiCard label="Pendientes" value="14" tone="warning" meta="Requieren revisión" />
          </div>
        </section>

        <section id="estado" aria-labelledby="app-health-title">
          <h2 id="app-health-title" className="docs-section-title">Estado operativo</h2>
          <YiQiRuntimeBanner title="Servicios disponibles" description="No hay incidencias activas." />
        </section>
      </div>
    </YiQiAppShell>
  )
}
