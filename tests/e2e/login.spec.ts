import { expect, test } from '@playwright/test'

test.describe('YiQiLogin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login/')
  })

  test('renders the canonical fields without horizontal overflow', async ({ page }) => {
    await expect(page.getByLabel('Usuario o correo electrónico', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Contraseña', { exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Mostrar contraseña', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Iniciar sesión', exact: true })).toBeVisible()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })

  test('shows a functional error state for invalid demo credentials', async ({ page }) => {
    await page.getByLabel('Usuario o correo electrónico', { exact: true }).fill('incorrecto')
    await page.getByLabel('Contraseña', { exact: true }).fill('incorrecta')
    await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click()

    await expect(page.getByRole('status')).toContainText('Demo: usa demo / demo')
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
})
