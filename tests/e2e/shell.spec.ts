import { expect, test } from '@playwright/test'

test.describe('YiQiAppShell', () => {
  test('desktop keeps sidebar navigation visible and avoids horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/shell')

    await expect(page.locator('.yiqi-sidebar')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Navegación principal' }).first()).toBeVisible()
    await expect(page.getByText('Nombre y Apellido', { exact: true })).toBeVisible()
    const logout = page.getByRole('button', { name: 'Cerrar sesión', exact: true })
    await expect(logout).toBeVisible()
    await expect(logout).toHaveAttribute('type', 'button')
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeHidden()
    await expect(page.locator('.yiqi-app-name')).toHaveText('Operaciones')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })

  test('mobile conserva navegacion cuenta y acciones dentro del drawer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/shell')

    await expect(page.locator('.yiqi-sidebar')).toBeHidden()
    const trigger = page.getByRole('button', { name: 'Abrir menú' })
    await expect(trigger).toBeVisible()
    await trigger.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('link', { name: 'Resumen' })).toBeVisible()
    await expect(dialog.getByText('Nombre y Apellido', { exact: true })).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Cerrar sesión', exact: true })).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Cerrar menú' })).toBeVisible()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)

    await dialog.getByRole('button', { name: 'Cerrar menú' }).click()
    await expect(dialog).toBeHidden()
  })

  test('mobile expone tooltip en la accion compacta del menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/shell')

    const trigger = page.getByRole('button', { name: 'Abrir menú' })
    await trigger.hover()
    await expect(page.getByRole('tooltip')).toHaveText('Abrir menú')
  })

  test('mobile conserva estado interno al cerrar y volver a abrir el drawer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/shell')

    await page.getByRole('button', { name: 'Abrir menú' }).click()
    const dialog = page.getByRole('dialog')
    const accountState = dialog.getByRole('button', { name: 'Incrementar estado de cuenta' })

    await expect(accountState).toHaveText('Estado 0')
    await accountState.click()
    await expect(accountState).toHaveText('Estado 1')

    await dialog.getByRole('button', { name: 'Cerrar menú' }).click()
    await expect(dialog).toBeHidden()

    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await expect(dialog.getByRole('button', { name: 'Incrementar estado de cuenta' })).toHaveText('Estado 1')
  })

  test('mobile cierra el drawer al elegir una ruta de navegacion', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/shell')

    await page.getByRole('button', { name: 'Abrir menú' }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await dialog.getByRole('link', { name: 'Análisis', exact: true }).click()
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL(/#analisis$/)
  })

  test('cierra el drawer abierto cuando el viewport vuelve a desktop', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/shell')

    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.setViewportSize({ width: 1280, height: 900 })

    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(page.locator('.yiqi-sidebar')).toBeVisible()
    await expect(page.getByText('Nombre y Apellido', { exact: true })).toBeVisible()
  })
})
