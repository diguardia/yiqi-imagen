'use client'

import {
  YiQiLogin,
  type YiQiLoginInput,
  type YiQiLoginProps,
  type YiQiLoginResult,
} from '@yiqi/ui/authentication'
import { YiQiLogoAnimated } from './yiqi-logo-animated'

export type LoginInput = YiQiLoginInput
export type LoginResult = YiQiLoginResult
export type YiQiLoginTemplateProps = YiQiLoginProps

/** @deprecated Usar YiQiLogin desde @yiqi/ui/authentication. */
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
  validationMessage = 'Ingresa usuario y clave para iniciar sesion.',
  loadingMessage = 'Iniciando sesion...',
  submitErrorMessage = 'No pudimos iniciar sesion. Intenta nuevamente.',
  sectionAriaLabel = 'Inicio de sesion YiQi',
  showPasswordLabel = 'Mostrar contrasena',
  hidePasswordLabel = 'Ocultar contrasena',
  logo = <YiQiLogoAnimated className="yiqi-login-logo" loop={2600} />,
  ...props
}: YiQiLoginTemplateProps) {
  return (
    <YiQiLogin
      {...props}
      appName={appName}
      description={description}
      usernameLabel={usernameLabel}
      passwordLabel={passwordLabel}
      usernamePlaceholder={usernamePlaceholder}
      passwordPlaceholder={passwordPlaceholder}
      rememberLabel={rememberLabel}
      submitLabel={submitLabel}
      forgotPasswordLabel={forgotPasswordLabel}
      forgotPasswordMessage={forgotPasswordMessage}
      validationMessage={validationMessage}
      loadingMessage={loadingMessage}
      submitErrorMessage={submitErrorMessage}
      sectionAriaLabel={sectionAriaLabel}
      showPasswordLabel={showPasswordLabel}
      hidePasswordLabel={hidePasswordLabel}
      logo={logo}
    />
  )
}
