'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { componentDocs, componentGroups } from './components/component-catalog'

const primaryNavigation = [
  { href: '/', text: 'Introducción' },
  { href: '/components/', text: 'Componentes' },
  { href: '/app/', text: 'Aplicación' },
  { href: '/migrar/', text: 'Migración' },
] as const

function normalizePath(value: string) {
  return value !== '/' && value.endsWith('/') ? value.slice(0, -1) : value
}

export function DocsSiteSidebar() {
  const currentPath = normalizePath(usePathname())
  const currentComponentRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 981px)').matches) return
    currentComponentRef.current?.scrollIntoView({ block: 'nearest' })
  }, [currentPath])

  return (
    <aside className="docs-sidebar" aria-label="Índice de documentación">
      <nav className="docs-sidebar-nav" aria-label="Navegación del Design System">
        <div className="docs-sidebar-group">
          <p className="docs-sidebar-label">Documentación</p>
          {primaryNavigation.map((item) => {
            const current = currentPath === normalizePath(item.href)
            const section = item.href === '/components/' && currentPath.startsWith('/components/')
            return (
              <Link
                key={item.href}
                className="docs-sidebar-link"
                data-current={current || undefined}
                data-section={section || undefined}
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
          {componentGroups.map((group) => (
            <div className="docs-sidebar-library-group" key={group.id}>
              <p className="docs-sidebar-subheading">{group.label}</p>
              {componentDocs.filter((component) => component.group === group.id).map((component) => {
                const href = `/components/${component.id}/`
                const current = currentPath === normalizePath(href)
                return (
                  <Link
                    ref={current ? currentComponentRef : undefined}
                    className="docs-sidebar-link docs-sidebar-link--subtle"
                    data-current={current || undefined}
                    aria-current={current ? 'page' : undefined}
                    href={href}
                    key={component.id}
                    prefetch={false}
                  >
                    {component.name.replace('YiQi', '')}
                  </Link>
                )
              })}
            </div>
          ))}
        </div>
      </nav>

      <p className="docs-sidebar-foot"><span aria-hidden="true" /> React · Next.js</p>
    </aside>
  )
}
