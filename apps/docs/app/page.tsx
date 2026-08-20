import Link from 'next/link'
import { YiQiThemeCycle } from '@yiqi/ui/foundation'

export default function HomePage() {
  return (
    <main className="docs-page">
      <header className="docs-header">
        <div>
          <p className="docs-kicker">@yiqi/ui · React contracts</p>
          <h1 className="docs-title">YiQi UI</h1>
          <p className="docs-subtitle">Next.js separa la aplicación de referencia, el catálogo de componentes y las herramientas de migración. Cada superficie consume los contratos públicos del Design System.</p>
        </div>
        <YiQiThemeCycle />
      </header>

      <section className="docs-surface-grid" aria-label="Superficies del Design System">
        <Link prefetch={false} className="docs-surface-card docs-surface-card--primary" href="/app/">
          <span className="docs-surface-kind">Aplicación</span>
          <h2>Ver una app real</h2>
          <p>Composición completa con AppShell, KPIs, estados y métricas usando únicamente contratos React publicados.</p>
        </Link>
        <Link prefetch={false} className="docs-surface-card" href="/components/">
          <span className="docs-surface-kind">Referencia</span>
          <h2>Componentes</h2>
          <p>Mapa por responsabilidad y entrypoint para encontrar rápidamente qué importar desde <code>@yiqi/ui</code>.</p>
        </Link>
        <Link prefetch={false} className="docs-surface-card" href="/migrar/">
          <span className="docs-surface-kind">Migración</span>
          <h2>HTML/CSS → React</h2>
          <p>Banco de trabajo para visualizar una pantalla legacy y detectar equivalencias con componentes React.</p>
        </Link>
        <Link prefetch={false} className="docs-surface-card" href="/login/">
          <span className="docs-surface-kind">Contrato</span>
          <h2>Login</h2>
          <p>Ejemplo ejecutable del contrato de autenticación reutilizable.</p>
        </Link>
        <Link prefetch={false} className="docs-surface-card" href="/shell/">
          <span className="docs-surface-kind">Contrato</span>
          <h2>App shell</h2>
          <p>Topbar, navegación desktop y drawer mobile del layout canónico.</p>
        </Link>
      </section>
    </main>
  )
}
