'use client'

import { useState } from 'react'
import { YiQiButton } from '@yiqi/ui/primitives'

export function DemoAccount() {
  const [value, setValue] = useState(0)

  return (
    <div>
      <span>Nombre y Apellido</span>
      <YiQiButton
        variant="ghost"
        aria-label="Incrementar estado de cuenta"
        onClick={() => setValue((current) => current + 1)}
      >
        Estado {value}
      </YiQiButton>
    </div>
  )
}
