'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const primaryNavigation = [
  { href: '/', text: 'Introducción' },
  { href: '/components/', text: 'Componentes' },
  { href: '/app/', text: 'Aplicación' },
  { href: '/migrar/', text: 'Migración' },
] as const

const componentNavigation = [
  { href: '/components/#foundation-title', text: 'Foundation' },
  { href: '/components/#primitives-title', text: 'Primitives' },
  { href: '/components/#authentication-title', text: 'Authentication' },
  { href: '/components/#layout-title', text: 'Layout' },
  { href: '/components/#data-display-title', text: 'Data display' },
  { href: '/components/#feedback-title', text: 'Feedback' },
] as const

function normalizePath(value: string) {
  return value !== '/' && value.endsWith('/') ? value.slice(0, -1) : value
}

export function DocsSiteSidebar() {
  const currentPath = normalizePath(usePathname())

  return (
    <aside className="docs-sidebar" aria-label="Índice de documentación">
      <nav className="docs-sidebar-nav" aria-label="Navegación del Design System">
        <div className="docs-sidebar-group">
          <p className="docs-sidebar-label">Documentación</p>
          {primaryNavigation.map((item) => {
            const current = currentPath === normalizePath(item.href)
            return (
              <Link
                key={item.href}
                className="docs-sidebar-link"
                data-current={current || undefined}
                aria-current={current ? 'page' : undefined}
                href={item.href}
                prefetch={false}
              >
                {item.text}
              </Link>
            )
          })}
        </div>

        <div className="docs-sidebar-group docs-sidebar-components">
          <p className="docs-sidebar-label">Biblioteca</p>
          {componentNavigation.map((item) => (
            <Link className="docs-sidebar-link docs-sidebar-link--subtle" href={item.href} key={item.href} prefetch={false}>
              {item.text}
            </Link>
          ))}
        </div>
      </nav>

      <p className="docs-sidebar-foot"><span aria-hidden="true" /> React · Next.js</p>
    </aside>
  )
}
