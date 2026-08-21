'use client'

import { Tooltip } from 'radix-ui'
import type { ReactElement } from 'react'

export interface YiQiTooltipProps {
  label: string
  children: ReactElement
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function YiQiTooltip({ label, children, side = 'top' }: YiQiTooltipProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="yiqi-tooltip-content" side={side} sideOffset={6}>
          {label}
          <Tooltip.Arrow className="yiqi-tooltip-arrow" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
