import type { ReactNode } from 'react'
import { DocsSiteHeader } from './site-header'

export default function DocsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="docs-site">
      <DocsSiteHeader />
      <div className="docs-site-content">{children}</div>
    </div>
  )
}
