import Link from 'next/link'
import { YiQiLogo, YiQiThemeCycle } from '@yiqi/ui/foundation'

export function DocsSiteHeader() {
  return (
    <header className="docs-site-header">
      <div className="docs-site-header-inner">
        <a className="docs-skip-link" href="#contenido">Saltar al contenido</a>
        <Link className="docs-brand" href="/" prefetch={false}>
          <YiQiLogo className="docs-brand-logo" />
          <span className="docs-brand-divider" aria-hidden="true" />
          <span className="docs-brand-product">UI Docs</span>
        </Link>
        <p className="docs-header-context">Componentes y contratos para productos YiQi</p>
        <div className="docs-site-tools">
          <YiQiThemeCycle />
        </div>
      </div>
    </header>
  )
}
