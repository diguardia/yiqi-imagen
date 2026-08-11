import Link from 'next/link'
import { YiQiThemeCycle } from '@yiqi/ui/foundation'
import { YiQiButton } from '@yiqi/ui/primitives'
import { YiQiKpiCard, YiQiTrustStat } from '@yiqi/ui/data-display'
import { YiQiRuntimeBanner } from '@yiqi/ui/feedback'

export default function HomePage() {
  return (
    <main className="docs-page">
      <header className="docs-header">
        <div>
          <p className="docs-kicker">@yiqi/ui · React contracts</p>
          <h1 className="docs-title">YiQi UI</h1>
          <p className="docs-subtitle">La documentación deja de ser la implementación. Este catálogo renderiza los mismos componentes que deben consumir las apps.</p>
        </div>
        <YiQiThemeCycle />
      </header>

      <section className="docs-grid" aria-label="Componentes migrados">
        <Link className="docs-card" href="/components/"><h2>Mapa de componentes</h2><p>Foundation, primitives, authentication, layout, data display y feedback con entrypoints separados.</p></Link>
        <Link className="docs-card" href="/login/"><h2>Login</h2><p>Contrato reutilizable con estados, remember-user y submit configurable.</p></Link>
        <Link className="docs-card" href="/shell/"><h2>App shell</h2><p>Topbar, navegación desktop y drawer mobile basado en Radix Dialog.</p></Link>
      </section>

      <div className="docs-demo">
        <section className="docs-section">
          <h2>Primitivos</h2>
          <div className="docs-toolbar"><YiQiButton>Acción</YiQiButton><YiQiButton variant="primary">Primaria</YiQiButton><YiQiButton variant="ghost">Ghost</YiQiButton></div>
        </section>

        <section className="docs-section">
          <h2>KPIs</h2>
          <div className="yiqi-kpi-grid">
            <YiQiKpiCard label="Facturación" value="$ 4.284.900" meta="Fuente: ejemplo de catálogo" />
            <YiQiKpiCard label="Órdenes" value="231" tone="positive" meta="+8,0%" />
            <YiQiKpiCard label="Pendientes" value="14" tone="warning" meta="Dato de ejemplo" />
          </div>
        </section>

        <section className="docs-section">
          <h2>Estados</h2>
          <YiQiRuntimeBanner title="Modo de demostración" description="Este catálogo usa datos de ejemplo y no consulta APIs productivas." />
        </section>

        <section className="docs-section">
          <h2>Trust stats</h2>
          <div className="yiqi-trust-grid"><YiQiTrustStat value="99,9%" label="Disponibilidad" /><YiQiTrustStat value="24/7" label="Monitoreo" /><YiQiTrustStat value="3" label="Ambientes" /></div>
        </section>
      </div>
    </main>
  )
}
