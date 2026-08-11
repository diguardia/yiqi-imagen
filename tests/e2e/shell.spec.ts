import { expect, test } from '@playwright/test'

test.describe('YiQiAppShell', () => {
  test('desktop keeps sidebar navigation visible and avoids horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/shell')

    await expect(page.locator('.yiqi-sidebar')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Navegación principal' }).first()).toBeVisible()
    await expect(page.getByText('Nombre y Apellido', { exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cerrar sesión', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeHidden()

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
})
