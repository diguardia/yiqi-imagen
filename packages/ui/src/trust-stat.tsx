import type { ReactNode } from 'react'

export interface YiQiTrustStatProps {
  value: ReactNode
  label: string
}

export function YiQiTrustStat({ value, label }: YiQiTrustStatProps) {
  return (
    <article className="yiqi-trust-stat">
      <div className="yiqi-trust-value">{value}</div>
      <div className="yiqi-trust-label">{label}</div>
    </article>
  )
}
