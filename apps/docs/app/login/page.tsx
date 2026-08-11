'use client'

import { YiQiLogin } from '@yiqi/ui/authentication'

export default function LoginPage() {
  return (
    <YiQiLogin
      appName="Demo YiQi"
      description="Este es el componente canónico de acceso para nuevas aplicaciones."
      onSubmit={async ({ username, password }) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        if (username === 'demo' && password === 'demo') return { ok: true }
        return { error: 'Demo: usa demo / demo para validar el estado exitoso.' }
      }}
    />
  )
}
