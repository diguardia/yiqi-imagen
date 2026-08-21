import type { ReactNode } from 'react'

export type YiQiTone = 'neutral' | 'positive' | 'warning' | 'danger'

export interface YiQiKpiCardProps {
  label: string
  value: ReactNode
  meta?: ReactNode
  tone?: YiQiTone
}

export function YiQiKpiCard({ label, value, meta, tone = 'neutral' }: YiQiKpiCardProps) {
  const toneClass = tone === 'neutral' ? '' : `yiqi-tone--${tone}`
  const hasMeta = meta !== undefined && meta !== null && meta !== false

  return (
    <article className="yiqi-kpi-card">
      <div className="yiqi-kpi-label">{label}</div>
      <div className={`yiqi-kpi-value ${toneClass}`.trim()}>{value}</div>
      {hasMeta ? <div className="yiqi-kpi-meta">{meta}</div> : null}
    </article>
  )
}
