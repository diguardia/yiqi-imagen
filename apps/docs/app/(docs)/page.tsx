import Link from 'next/link'
import { YiQiKpiCard } from '@yiqi/ui/data-display'
import { YiQiRuntimeBanner } from '@yiqi/ui/feedback'

export default function HomePage() {
  return (
    <main className="docs-page docs-home">
      <section className="docs-hero" aria-labelledby="docs-home-title">
        <div className="docs-hero-copy">
          <p className="docs-kicker">@yiqi/ui</p>
          <h1 id="docs-home-title" className="docs-title">Design System YiQi para React</h1>
          <p className="docs-subtitle">Componentes reutilizables, contratos públicos y superficies de referencia para construir interfaces YiQi consistentes.</p>
          <div className="docs-hero-actions">
            <Link className="docs-cta docs-cta--primary" href="/components/" prefetch={false}>Explorar componentes</Link>
            <Link className="docs-cta" href="/app/" prefetch={false}>Ver aplicación</Link>
          </div>
        </div>

        <section className="docs-hero-preview" aria-labelledby="docs-flow-title">
          <div className="docs-flow-heading">
            <span className="docs-flow-signal" aria-hidden="true" />
            <div>
              <p className="docs-kicker">Sistema en ejecución</p>
              <h2 id="docs-flow-title">Una interfaz, un contrato</h2>
            </div>
          </div>
          <div className="docs-flow-stage">
            <span className="docs-flow-index">01</span>
            <YiQiKpiCard label="Facturación" value="$ 4.284.900" tone="positive" meta="+8,0% este período" />
          </div>
          <div className="docs-flow-stage">
            <span className="docs-flow-index">02</span>
            <YiQiRuntimeBanner title="Servicios disponibles" description="Sin incidencias activas." />
          </div>
        </section>
      </section>

      <section className="docs-home-migration" aria-labelledby="docs-migration-entry-title">
        <div className="docs-home-migration-copy">
          <p className="docs-kicker">HTML/CSS → React</p>
          <h2 id="docs-migration-entry-title">Migración sin perder el contexto visual</h2>
          <p>El banco de migración permite inspeccionar una pantalla existente y detectar equivalencias con contratos publicados.</p>
        </div>
        <Link className="docs-inline-link" href="/migrar/" prefetch={false}>Migrar una pantalla →</Link>
      </section>
    </main>
  )
}
