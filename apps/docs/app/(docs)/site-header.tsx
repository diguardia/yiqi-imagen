'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { YiQiLogo, YiQiThemeCycle } from '@yiqi/ui/foundation'

const navigation = [
  { href: '/components/', text: 'Componentes' },
  { href: '/app/', text: 'Aplicación' },
  { href: '/migrar/', text: 'Migración' },
] as const

function normalizePath(value: string) {
  return value !== '/' && value.endsWith('/') ? value.slice(0, -1) : value
}

export function DocsSiteHeader() {
  const pathname = usePathname()
  const currentPath = normalizePath(pathname)

  return (
    <header className="docs-site-header">
      <div className="docs-site-header-inner">
        <Link className="docs-brand" href="/" prefetch={false} aria-current={currentPath === '/' ? 'page' : undefined}>
          <YiQiLogo className="docs-brand-logo" />
          <span className="docs-brand-divider" aria-hidden="true" />
          <span className="docs-brand-product">UI</span>
        </Link>

        <nav className="docs-site-nav" aria-label="Navegación del Design System">
          {navigation.map((item) => {
            const current = currentPath === normalizePath(item.href)
            return (
              <Link
                key={item.href}
                className="docs-site-link"
                data-current={current || undefined}
                aria-current={current ? 'page' : undefined}
                href={item.href}
                prefetch={false}
              >
                {item.text}
              </Link>
            )
          })}
        </nav>

        <div className="docs-site-tools">
          <YiQiThemeCycle />
        </div>
      </div>
    </header>
  )
}
