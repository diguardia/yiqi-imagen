'use client'

import { YiQiLogin } from '@yiqi/ui/authentication'

export default function LoginPage() {
  return (
    <YiQiLogin
      appName="Operaciones"
      description="Ingresa con tu usuario para continuar."
      onSubmit={async ({ username, password }) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        if (username === 'demo' && password === 'demo') return { ok: true }
        return { error: 'Usuario o contraseña incorrectos.' }
      }}
    />
  )
}
