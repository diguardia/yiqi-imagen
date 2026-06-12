'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { YiQiLogoAnimated } from './yiqi-logo-animated'

export type LoginResult = void | { ok?: boolean; error?: string }

export interface LoginInput {
  username: string
  password: string
  remember: boolean
}

export interface YiQiLoginTemplateProps {
  appName?: string
  description?: string
  usernameLabel?: string
  passwordLabel?: string
  usernamePlaceholder?: string
  passwordPlaceholder?: string
  rememberLabel?: string
  submitLabel?: string
  forgotPasswordLabel?: string
  forgotPasswordMessage?: string
  footerHref?: string
  footerLabel?: string
  rememberStorageKey?: string
  initialUsername?: string
  isLoading?: boolean
  error?: string
  onSubmit: (input: LoginInput) => Promise<LoginResult> | LoginResult
  onForgotPassword?: () => void
}

const DEFAULT_REMEMBER_KEY = 'yiqi-last-user'

export function YiQiLoginTemplate({
  appName = 'YiQi',
  description = 'Ingresa con tu usuario YiQi para abrir la aplicacion.',
  usernameLabel = 'Usuario o correo electronico',
  passwordLabel = 'Contrasena',
  usernamePlaceholder = 'usuario@empresa.com',
  passwordPlaceholder = 'Contrasena',
  rememberLabel = 'Mantener sesion iniciada',
  submitLabel = 'Iniciar sesion',
  forgotPasswordLabel = 'Olvidaste tu clave?',
  forgotPasswordMessage = 'Para restablecer tu clave, contacta a tu administrador YiQi.',
  footerHref = 'https://www.yiqi.com.ar',
  footerLabel = 'www.yiqi.com.ar',
  rememberStorageKey = DEFAULT_REMEMBER_KEY,
  initialUsername = '',
  isLoading: controlledLoading = false,
  error: externalError = '',
  onSubmit,
  onForgotPassword,
}: YiQiLoginTemplateProps) {
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
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(rememberStorageKey)
    if (saved) {
      setUsername(saved)
      setRemember(true)
    }
  }, [rememberStorageKey])

  const status = useMemo(() => {
    if (isLoading) return { state: 'loading', message: 'Iniciando sesion...' }
    if (visibleError) return { state: 'error', message: visibleError }
    if (info) return { state: 'info', message: info }
    return { state: 'idle', message: '' }
  }, [info, isLoading, visibleError])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLocalError('')
    setInfo('')

    const cleanUsername = username.trim()
    if (!cleanUsername || !password) {
      setLocalError('Ingresa usuario y clave para iniciar sesion.')
      return
    }

    if (typeof window !== 'undefined') {
      if (remember) window.localStorage.setItem(rememberStorageKey, cleanUsername)
      else window.localStorage.removeItem(rememberStorageKey)
    }

    setIsSubmitting(true)
    try {
      const result = await onSubmit({ username: cleanUsername, password, remember })
      if (result && result.error) setLocalError(result.error)
    } catch {
      setLocalError('No pudimos iniciar sesion. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPassword = () => {
    setLocalError('')
    if (onForgotPassword) {
      onForgotPassword()
      return
    }
    setInfo(forgotPasswordMessage)
  }

  return (
    <main className="login-screen">
      <section className="login-stage" aria-label="Inicio de sesion YiQi">
        <div className="login-brand">
          <YiQiLogoAnimated className="yiqi-login-logo" loop={2600} />
          <p className="yiqi-login-description">
            <strong>{appName}.</strong> {description}
          </p>
        </div>

        <p
          data-state={status.state}
          aria-live="polite"
          role="status"
          className="auth-status"
        >
          {status.message || ' '}
        </p>

        <div className="login-gate">
          <form className="login-card" onSubmit={handleSubmit} autoComplete="on">
            <div className="login-form">
              <label style={{ display: 'grid', gap: 5 }}>
                <span className="login-label">{usernameLabel}</span>
                <input
                  className="login-input"
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder={usernamePlaceholder}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  disabled={isLoading}
                />
              </label>

              <label style={{ display: 'grid', gap: 5 }}>
                <span className="login-label">{passwordLabel}</span>
                <span className="login-password">
                  <input
                    className="login-input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    placeholder={passwordPlaceholder}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    className="login-eye"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                    aria-pressed={showPassword}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </span>
              </label>
            </div>

            <label className="login-remember">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                disabled={isLoading}
              />
              <span>{rememberLabel}</span>
            </label>

            <button className="btn btn-primary login-submit" type="submit" disabled={isLoading}>
              {isLoading ? <SpinnerIcon /> : null}
              <span>{submitLabel}</span>
            </button>

            <button className="login-hint" type="button" onClick={handleForgotPassword}>
              {forgotPasswordLabel}
            </button>
          </form>
        </div>

        <a className="login-footer" href={footerHref} target="_blank" rel="noreferrer">
          {footerLabel}
        </a>
      </section>
    </main>
  )
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.1 12s3.2-6 9.9-6 9.9 6 9.9 6-3.2 6-9.9 6-9.9-6-9.9-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.7 5.2A10.3 10.3 0 0 1 12 5c6.7 0 9.9 7 9.9 7a17 17 0 0 1-3.2 4.1" />
      <path d="M6.6 6.8A16.5 16.5 0 0 0 2.1 12s3.2 7 9.9 7c1.8 0 3.3-.5 4.6-1.2" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="login-spinner" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  )
}
