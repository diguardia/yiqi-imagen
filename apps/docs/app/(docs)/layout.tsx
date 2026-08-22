import type { ReactNode } from 'react'
import { DocsSiteHeader } from './site-header'
import { DocsSiteSidebar } from './site-sidebar'

export default function DocsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="docs-site">
      <DocsSiteHeader />
      <div className="docs-site-frame">
        <DocsSiteSidebar />
        <div className="docs-site-content" id="contenido">{children}</div>
      </div>
    </div>
  )
}
