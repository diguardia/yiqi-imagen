'use client'

import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { YiQiButton } from './button'
import { YiQiCheckbox } from './checkbox'
import { YiQiInput } from './input'
import { YiQiLogo } from './logo'

export interface YiQiLoginInput {
  username: string
  password: string
  remember: boolean
}

export type YiQiLoginResult = void | { ok?: boolean; error?: string }

export interface YiQiLoginProps {
  appName?: string
  description?: string
  submitLabel?: string
  rememberLabel?: string
  forgotPasswordLabel?: string
  forgotPasswordMessage?: string
  footerHref?: string
  footerLabel?: string
  rememberStorageKey?: string
  onSubmit: (input: YiQiLoginInput) => Promise<YiQiLoginResult> | YiQiLoginResult
  onForgotPassword?: () => void
}

export function YiQiLogin({
  appName = 'YiQi',
  description = 'Ingresa con tu usuario YiQi para abrir la aplicación.',
  submitLabel = 'Iniciar sesión',
  rememberLabel = 'Recordar usuario',
  forgotPasswordLabel = '¿Olvidaste tu contraseña?',
  forgotPasswordMessage = 'Para restablecer tu clave, contacta a tu administrador YiQi.',
  footerHref = 'https://www.yiqi.com.ar',
  footerLabel = 'www.yiqi.com.ar',
  rememberStorageKey = 'yiqi-last-user',
  onSubmit,
  onForgotPassword,
}: YiQiLoginProps) {
  const usernameId = useId()
  const passwordId = useId()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(rememberStorageKey)
    if (!saved) return
    setUsername(saved)
    setRemember(true)
  }, [rememberStorageKey])

  const status = useMemo(() => {
    if (loading) return { state: 'loading', message: 'Iniciando sesión…' }
    if (error) return { state: 'error', message: error }
    if (info) return { state: 'info', message: info }
    return { state: 'idle', message: ' ' }
  }, [error, info, loading])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setInfo('')

    const cleanUsername = username.trim()
    if (!cleanUsername || !password) {
      setError('Ingresa usuario y contraseña para iniciar sesión.')
      return
    }

    if (remember) window.localStorage.setItem(rememberStorageKey, cleanUsername)
    else window.localStorage.removeItem(rememberStorageKey)

    setLoading(true)
    try {
      const result = await onSubmit({ username: cleanUsername, password, remember })
      if (result?.error) setError(result.error)
    } catch {
      setError('No pudimos iniciar sesión. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = () => {
    setError('')
    if (onForgotPassword) onForgotPassword()
    else setInfo(forgotPasswordMessage)
  }

  return (
    <main className="yiqi-root yiqi-login-screen">
      <section className="yiqi-login-stage" aria-label="Inicio de sesión YiQi">
        <div className="yiqi-login-brand">
          <YiQiLogo className="yiqi-login-logo" />
          <p className="yiqi-login-description"><strong>{appName}.</strong> {description}</p>
        </div>

        <p className="yiqi-login-status" data-state={status.state} role="status" aria-live="polite">
          {status.message}
        </p>

        <form className="yiqi-login-card" onSubmit={submit} autoComplete="on">
          <div className="yiqi-login-form">
            <YiQiInput
              id={usernameId}
              label="Usuario o correo electrónico"
              name="username"
              autoComplete="username"
              placeholder="usuario@empresa.com"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={loading}
            />
            <YiQiInput
              id={passwordId}
              label="Contraseña"
              name="password"
              autoComplete="current-password"
              placeholder="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
              action={
                <button
                  className="yiqi-icon-button"
                  type="button"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                  disabled={loading}
                >
                  {showPassword ? '×' : '◉'}
                </button>
              }
            />
          </div>

          <YiQiCheckbox label={rememberLabel} checked={remember} onCheckedChange={setRemember} disabled={loading} />
          <YiQiButton type="submit" variant="primary" disabled={loading}>{submitLabel}</YiQiButton>
          <button className="yiqi-login-hint" type="button" onClick={forgotPassword}>{forgotPasswordLabel}</button>
        </form>

        <a className="yiqi-login-footer" href={footerHref} target="_blank" rel="noreferrer">{footerLabel}</a>
      </section>
    </main>
  )
}
