import { expect, test } from '@playwright/test'

test.describe('regresiones funcionales', () => {
  test('KPI conserva metadata numerica cero', async ({ page }) => {
    await page.goto('/components/')
    await expect(page.getByTestId('kpi-meta-cero').locator('.yiqi-kpi-meta')).toHaveText('0')
  })

  test('los estilos React no contaminan elementos ni tokens genericos del consumidor', async ({ page }) => {
    await page.goto('/components/')

    const isolation = await page.evaluate(() => {
      const probe = document.createElement('div')
      document.body.appendChild(probe)
      const boxSizing = getComputedStyle(probe).boxSizing
      probe.remove()

      const root = getComputedStyle(document.documentElement)
      return {
        boxSizing,
        bg: root.getPropertyValue('--bg').trim(),
        text: root.getPropertyValue('--text').trim(),
        cyan: root.getPropertyValue('--cyan').trim(),
      }
    })

    expect(isolation).toEqual({ boxSizing: 'content-box', bg: '', text: '', cyan: '' })
  })

  test('el adaptador de login conserva defaults y marca animada legacy', async ({ page }) => {
    await page.goto('/compat-login/')

    await expect(page.getByRole('region', { name: 'Inicio de sesion YiQi', exact: true })).toBeVisible()
    await expect(page.getByText('Ingresa con tu usuario YiQi para abrir la aplicacion.', { exact: false })).toBeVisible()
    await expect(page.getByLabel('Usuario o correo electronico', { exact: true })).toHaveAttribute('placeholder', 'usuario@empresa.com')
    await expect(page.getByLabel('Contrasena', { exact: true })).toHaveAttribute('placeholder', 'Contrasena')
    const remember = page.getByRole('checkbox', { name: 'Mantener sesion iniciada', exact: true })
    await expect(remember).toBeVisible()
    await expect(page.getByRole('button', { name: 'Olvidaste tu clave?', exact: true })).toBeVisible()
    const showPassword = page.getByRole('button', { name: 'Mostrar contrasena', exact: true })
    await expect(showPassword).toBeVisible()
    await expect(showPassword.locator('.yiqi-login-eye-icon')).toHaveCSS('width', '18px')
    await expect(page.locator('svg.yiqi-login-logo .yq-q')).toHaveCount(1)

    await remember.click()
    await expect(remember).toBeChecked()
    const rememberValue = await page.locator('form').evaluate((form) => new FormData(form as HTMLFormElement).get('remember'))
    expect(rememberValue).toBe('on')

    await page.getByRole('button', { name: 'Iniciar sesion', exact: true }).click()
    await expect(page.getByRole('status')).toHaveText('Ingresa usuario y clave para iniciar sesion.')
  })

  test('el tema guardado se aplica antes de hidratar React', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.addInitScript(() => window.localStorage.setItem('yiqi-theme', 'light'))
    await page.route('**/_next/static/**/*.js', (route) => route.abort())

    const response = await page.goto('/shell/', { waitUntil: 'domcontentloaded' })
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('el label de recordar usuario mantiene el toggle funcional', async ({ page }) => {
    await page.goto('/login/')

    const checkbox = page.getByRole('checkbox', { name: 'Recordar usuario', exact: true })
    await expect(checkbox).not.toBeChecked()

    await page.getByText('Recordar usuario', { exact: true }).click()
    await expect(checkbox).toBeChecked()

    await page.getByText('Recordar usuario', { exact: true }).click()
    await expect(checkbox).not.toBeChecked()
  })

  test('mostrar y ocultar contrasena conserva el valor ingresado', async ({ page }) => {
    await page.goto('/login/')

    const password = page.getByLabel('Contraseña', { exact: true })
    await password.fill('secreto-temporal')
    await expect(password).toHaveAttribute('type', 'password')

    await page.getByRole('button', { name: 'Mostrar contraseña', exact: true }).click()
    await expect(password).toHaveAttribute('type', 'text')
    await expect(password).toHaveValue('secreto-temporal')

    await page.getByRole('button', { name: 'Ocultar contraseña', exact: true }).click()
    await expect(password).toHaveAttribute('type', 'password')
    await expect(password).toHaveValue('secreto-temporal')
  })

  test('el fallback de olvido de contrasena sigue siendo funcional', async ({ page }) => {
    await page.goto('/login/')

    await page.getByRole('button', { name: '¿Olvidaste tu contraseña?', exact: true }).click()
    await expect(page.getByRole('status')).toContainText('Para restablecer tu clave, contacta a tu administrador YiQi.')
  })

  test('el estado loading bloquea un segundo submit sin bloquear recuperacion', async ({ page }) => {
    await page.goto('/login/')

    await page.getByLabel('Usuario o correo electrónico', { exact: true }).fill('incorrecto')
    await page.getByLabel('Contraseña', { exact: true }).fill('incorrecta')

    const submit = page.getByRole('button', { name: 'Iniciar sesión', exact: true })
    const forgotPassword = page.getByRole('button', { name: '¿Olvidaste tu contraseña?', exact: true })
    await submit.click()

    await expect(submit).toBeDisabled()
    await expect(submit.locator('.yiqi-login-spinner')).toBeVisible()
    await expect(forgotPassword).toBeEnabled()
    await expect(page.getByRole('status')).toContainText('Iniciando sesión')
    await expect(page.getByRole('status')).toContainText('Demo: usa demo / demo')
    await expect(submit).toBeEnabled()
  })

  test('el tema conserva persistencia y el ciclo oscuro sistema claro', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.addInitScript(() => window.localStorage.setItem('yiqi-theme', 'dark'))
    await page.goto('/shell/')

    const html = page.locator('html')
    const darkButton = page.getByRole('button', { name: 'Tema actual: Oscuro. Cambiar a Sistema', exact: true })

    await expect(html).toHaveAttribute('data-theme', 'dark')
    await darkButton.click()

    await expect(page.getByRole('button', { name: 'Tema actual: Sistema. Cambiar a Claro', exact: true })).toBeVisible()
    await expect.poll(async () => page.evaluate(() => window.localStorage.getItem('yiqi-theme'))).toBe('system')
    await expect(html).toHaveAttribute('data-theme', 'light')

    await page.getByRole('button', { name: 'Tema actual: Sistema. Cambiar a Claro', exact: true }).click()
    await expect.poll(async () => page.evaluate(() => window.localStorage.getItem('yiqi-theme'))).toBe('light')
    await expect(html).toHaveAttribute('data-theme', 'light')

    await page.getByRole('button', { name: 'Tema actual: Claro. Cambiar a Oscuro', exact: true }).click()
    await expect.poll(async () => page.evaluate(() => window.localStorage.getItem('yiqi-theme'))).toBe('dark')
    await expect(html).toHaveAttribute('data-theme', 'dark')
  })

  test('el shell conserva navegacion activa cuenta y accion en desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/shell/')

    const activeLink = page.getByRole('link', { name: 'Resumen', exact: true }).first()
    await expect(activeLink).toHaveAttribute('aria-current', 'page')
    await expect(activeLink).toHaveAttribute('href', '/shell')
    await expect(page.getByText('Nombre y Apellido', { exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cerrar sesión', exact: true })).toBeVisible()
  })
})
