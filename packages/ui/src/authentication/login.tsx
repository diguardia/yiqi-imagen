'use client'

import { useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { YiQiButton } from '../primitives/button'
import { YiQiCheckbox } from '../primitives/checkbox'
import { YiQiInput } from '../primitives/input'
import { YiQiLogo } from '../foundation/logo'

export interface YiQiLoginInput {
  username: string
  password: string
  remember: boolean
}

export type YiQiLoginResult = void | { ok?: boolean; error?: string }

export interface YiQiLoginProps {
  appName?: string
  description?: string
  usernameLabel?: string
  passwordLabel?: string
  usernamePlaceholder?: string
  passwordPlaceholder?: string
  submitLabel?: string
  rememberLabel?: string
  forgotPasswordLabel?: string
  forgotPasswordMessage?: string
  validationMessage?: string
  loadingMessage?: string
  submitErrorMessage?: string
  sectionAriaLabel?: string
  showPasswordLabel?: string
  hidePasswordLabel?: string
  footerHref?: string
  footerLabel?: string
  rememberStorageKey?: string
  initialUsername?: string
  isLoading?: boolean
  error?: string
  logo?: ReactNode
  onSubmit: (input: YiQiLoginInput) => Promise<YiQiLoginResult> | YiQiLoginResult
  onForgotPassword?: () => void
}

export function YiQiLogin({
  appName = 'YiQi',
  description = 'Ingresa con tu usuario para abrir la aplicación.',
  usernameLabel = 'Usuario o correo electrónico',
  passwordLabel = 'Contraseña',
  usernamePlaceholder = 'usuario@empresa.com',
  passwordPlaceholder,
  submitLabel = 'Iniciar sesión',
  rememberLabel = 'Recordar usuario',
  forgotPasswordLabel = '¿Olvidaste tu contraseña?',
  forgotPasswordMessage = 'Para restablecer tu clave, contacta a tu administrador YiQi.',
  validationMessage = 'Ingresa usuario y contraseña para iniciar sesión.',
  loadingMessage = 'Iniciando sesión…',
  submitErrorMessage = 'No pudimos iniciar sesión. Intenta nuevamente.',
  sectionAriaLabel = 'Inicio de sesión YiQi',
  showPasswordLabel = 'Mostrar contraseña',
  hidePasswordLabel = 'Ocultar contraseña',
  footerHref = 'https://www.yiqi.com.ar',
  footerLabel = 'www.yiqi.com.ar',
  rememberStorageKey = 'yiqi-last-user',
  initialUsername = '',
  isLoading: controlledLoading = false,
  error: externalError = '',
  logo,
  onSubmit,
  onForgotPassword,
}: YiQiLoginProps) {
  const usernameId = useId()
  const passwordId = useId()
  const [username, setUsername] = useState(initialUsername)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')
  const [info, setInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLoading = controlledLoading || isSubmitting
  const visibleError = externalError || localError

  useEffect(() => {
    const saved = window.localStorage.getItem(rememberStorageKey)
    if (!saved) return
    setUsername(saved)
    setRemember(true)
  }, [rememberStorageKey])

  const status = useMemo(() => {
    if (isLoading) return { state: 'loading', message: loadingMessage }
    if (visibleError) return { state: 'error', message: visibleError }
    if (info) return { state: 'info', message: info }
    return { state: 'idle', message: ' ' }
  }, [info, isLoading, loadingMessage, visibleError])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLocalError('')
    setInfo('')

    const cleanUsername = username.trim()
    if (!cleanUsername || !password) {
      setLocalError(validationMessage)
      return
    }

    if (remember) window.localStorage.setItem(rememberStorageKey, cleanUsername)
    else window.localStorage.removeItem(rememberStorageKey)

    setIsSubmitting(true)
    try {
      const result = await onSubmit({ username: cleanUsername, password, remember })
      if (result?.error) setLocalError(result.error)
    } catch {
      setLocalError(submitErrorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const forgotPassword = () => {
    setLocalError('')
    if (onForgotPassword) onForgotPassword()
    else setInfo(forgotPasswordMessage)
  }

  return (
    <main className="yiqi-root yiqi-login-screen">
      <section className="yiqi-login-stage" aria-label={sectionAriaLabel}>
        <div className="yiqi-login-brand">
          {logo ?? <YiQiLogo className="yiqi-login-logo" />}
          <p className="yiqi-login-description"><strong>{appName}.</strong> {description}</p>
        </div>

        <p className="yiqi-login-status" data-state={status.state} role="status" aria-live="polite">
          {status.message}
        </p>

        <form className="yiqi-login-card" onSubmit={submit} autoComplete="on">
          <div className="yiqi-login-form">
            <YiQiInput
              id={usernameId}
              label={usernameLabel}
              name="username"
              autoComplete="username"
              placeholder={usernamePlaceholder}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={isLoading}
            />
            <YiQiInput
              id={passwordId}
              label={passwordLabel}
              name="password"
              autoComplete="current-password"
              placeholder={passwordPlaceholder}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
              action={
                <button
                  className="yiqi-icon-button"
                  type="button"
                  aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                  disabled={isLoading}
                >
                  {showPassword ? '×' : '◉'}
                </button>
              }
            />
          </div>

          <YiQiCheckbox label={rememberLabel} checked={remember} onCheckedChange={setRemember} disabled={isLoading} />
          <YiQiButton type="submit" variant="primary" disabled={isLoading}>{submitLabel}</YiQiButton>
          <button className="yiqi-login-hint" type="button" onClick={forgotPassword}>{forgotPasswordLabel}</button>
        </form>

        <a className="yiqi-login-footer" href={footerHref} target="_blank" rel="noreferrer">{footerLabel}</a>
      </section>
    </main>
  )
}
