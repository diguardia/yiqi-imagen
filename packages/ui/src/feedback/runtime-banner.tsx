import type { ReactNode } from 'react'

export interface YiQiRuntimeBannerProps {
  title: string
  description: string
  tone?: 'neutral' | 'warning' | 'danger'
  action?: ReactNode
}

export function YiQiRuntimeBanner({ title, description, tone = 'neutral', action }: YiQiRuntimeBannerProps) {
  return (
    <aside className="yiqi-runtime-banner" data-tone={tone} role={tone === 'danger' ? 'alert' : 'status'}>
      <div className="yiqi-runtime-copy">
        <p className="yiqi-runtime-title">{title}</p>
        <p className="yiqi-runtime-description">{description}</p>
      </div>
      {action}
    </aside>
  )
}
