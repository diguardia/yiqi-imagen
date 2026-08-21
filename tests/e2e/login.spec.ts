import { expect, test } from '@playwright/test'

test.describe('YiQiLogin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login/')
  })

  test('renders the canonical fields without duplicated field copy or horizontal overflow', async ({ page }) => {
    await expect(page.getByLabel('Usuario o correo electrónico', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Contraseña', { exact: true })).toBeVisible()
    const passwordVisibility = page.getByRole('button', { name: 'Mostrar contraseña', exact: true })
    await expect(passwordVisibility).toBeVisible()
    await expect(page.getByRole('button', { name: 'Iniciar sesión', exact: true })).toBeVisible()

    await passwordVisibility.hover()
    await expect(page.getByRole('tooltip')).toHaveText('Mostrar contraseña')

    const duplicatedFieldCopy = await page.locator('input[id]').evaluateAll((inputs) => inputs.flatMap((input) => {
      const label = document.querySelector(`label[for="${input.id}"]`)?.textContent?.trim()
      const placeholder = input.getAttribute('placeholder')?.trim()
      return label && placeholder && label.toLocaleLowerCase('es') === placeholder.toLocaleLowerCase('es')
        ? [{ label, placeholder }]
        : []
    }))
    expect(duplicatedFieldCopy).toEqual([])

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })

  test('shows a functional error state for invalid credentials', async ({ page }) => {
    await page.getByLabel('Usuario o correo electrónico', { exact: true }).fill('incorrecto')
    await page.getByLabel('Contraseña', { exact: true }).fill('incorrecta')
    await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click()

    await expect(page.getByRole('status')).toContainText('Usuario o contraseña incorrectos.')
  })

  test('remember-user persists only the username, never the password', async ({ page }) => {
    await page.getByLabel('Usuario o correo electrónico', { exact: true }).fill('demo')
    await page.getByLabel('Contraseña', { exact: true }).fill('demo')
    await page.getByRole('checkbox', { name: 'Recordar usuario', exact: true }).click()
    await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click()

    await expect.poll(async () => page.evaluate(() => window.localStorage.getItem('yiqi-last-user'))).toBe('demo')

    const storageValues = await page.evaluate(() => Object.values(window.localStorage))
    expect(storageValues).not.toContain('demo:demo')
    expect(await page.evaluate(() => window.localStorage.getItem('password'))).toBeNull()

    await page.reload()
    await expect(page.getByLabel('Usuario o correo electrónico', { exact: true })).toHaveValue('demo')
    await expect(page.getByLabel('Contraseña', { exact: true })).toHaveValue('')
  })

  test('mounts and submits when localStorage is blocked', async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => { throw new DOMException('Storage bloqueado', 'SecurityError') }
      Storage.prototype.setItem = () => { throw new DOMException('Storage bloqueado', 'SecurityError') }
      Storage.prototype.removeItem = () => { throw new DOMException('Storage bloqueado', 'SecurityError') }
    })
    await page.reload()

    const username = page.getByLabel('Usuario o correo electrónico', { exact: true })
    const password = page.getByLabel('Contraseña', { exact: true })
    const submit = page.getByRole('button', { name: 'Iniciar sesión', exact: true })
    const remember = page.getByRole('checkbox', { name: 'Recordar usuario', exact: true })

    await expect(username).toBeVisible()
    await username.fill('incorrecto')
    await password.fill('incorrecta')

    await submit.click()
    await expect(page.getByRole('status')).toContainText('Usuario o contraseña incorrectos.')

    await remember.click()
    await submit.click()
    await expect(page.getByRole('status')).toContainText('Usuario o contraseña incorrectos.')
  })
})
