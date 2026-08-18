'use client'

import { Dialog } from 'radix-ui'
import { useEffect, useState, type ReactNode } from 'react'
import { YiQiLogo } from '../foundation/logo'
import { YiQiThemeCycle } from '../foundation/theme-cycle'

export interface YiQiNavItem {
  href: string
  label: string
  active?: boolean
}

export interface YiQiAppShellProps {
  appName: string
  navigation: YiQiNavItem[]
  children: ReactNode
  account?: ReactNode
  actions?: ReactNode
}

function Navigation({ items, onNavigate }: { items: YiQiNavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="yiqi-nav" aria-label="Navegación principal">
      {items.map((item) => (
        <a
          key={`${item.href}-${item.label}`}
          className="yiqi-nav-link"
          data-active={item.active || undefined}
          href={item.href}
          aria-current={item.active ? 'page' : undefined}
          onClick={onNavigate}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

function useMobileShell() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 980px)')
    const sync = () => setIsMobile(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return isMobile
}

export function YiQiAppShell({ appName, navigation, children, account, actions }: YiQiAppShellProps) {
  const isMobile = useMobileShell()
  const [navigationOpen, setNavigationOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) setNavigationOpen(false)
  }, [isMobile])

  return (
    <div className="yiqi-root yiqi-shell">
      <header className="yiqi-topbar">
        <div className="yiqi-topbar-left">
          <YiQiLogo className="yiqi-topbar-logo" />
          <span className="yiqi-app-pill">{appName}</span>
        </div>

        <div className="yiqi-topbar-right">
          {!isMobile && account ? <div className="yiqi-desktop-only">{account}</div> : null}
          {!isMobile && actions ? <div className="yiqi-desktop-only">{actions}</div> : null}
          {!isMobile ? <div className="yiqi-desktop-only"><YiQiThemeCycle /></div> : null}

          <Dialog.Root open={navigationOpen} onOpenChange={setNavigationOpen}>
            <Dialog.Trigger asChild>
              <button className="yiqi-icon-button yiqi-mobile-menu" type="button" aria-label="Abrir menú">☰</button>
            </Dialog.Trigger>
            <Dialog.Portal forceMount>
              <Dialog.Overlay forceMount className="yiqi-dialog-overlay" />
              <Dialog.Content forceMount className="yiqi-dialog-content">
                <Dialog.Title className="yiqi-dialog-title">{appName}</Dialog.Title>
                <Dialog.Description className="yiqi-sr-only">Navegación de la aplicación</Dialog.Description>
                <Dialog.Close asChild>
                  <button className="yiqi-icon-button yiqi-dialog-close" type="button" aria-label="Cerrar menú">×</button>
                </Dialog.Close>
                <Navigation items={navigation} onNavigate={() => setNavigationOpen(false)} />
                <div className="yiqi-dialog-tools">
                  {isMobile ? account : null}
                  {isMobile ? actions : null}
                  <YiQiThemeCycle />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>

      <div className="yiqi-shell-body">
        <aside className="yiqi-sidebar"><Navigation items={navigation} /></aside>
        <main className="yiqi-content">{children}</main>
      </div>
    </div>
  )
}
