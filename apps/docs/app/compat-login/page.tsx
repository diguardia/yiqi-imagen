'use client'

import { YiQiLoginTemplate } from '../../../../template/login/yiqi-login-template'

export default function CompatLoginPage() {
  return (
    <YiQiLoginTemplate
      onSubmit={async () => {
        await new Promise((resolve) => setTimeout(resolve, 250))
        return { ok: true }
      }}
    />
  )
}
