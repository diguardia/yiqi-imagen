import { expect, test } from '@playwright/test'

async function forceTheme(page: import('@playwright/test').Page, theme: 'dark' | 'light') {
  await page.addInitScript((value) => window.localStorage.setItem('yiqi-theme', value), theme)
}

async function assertNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(1)
}

test('captures docs portal desktop in dark and light themes', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  await forceTheme(page, 'dark')
  await page.goto('/')
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('docs-home-desktop-dark.png'), fullPage: true })

  await page.evaluate(() => window.localStorage.setItem('yiqi-theme', 'light'))
  await page.reload()
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('docs-home-desktop-light.png'), fullPage: true })
})

test('captures component catalog and migration on narrow viewports', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await forceTheme(page, 'dark')

  await page.goto('/components/')
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('components-mobile-dark.png'), fullPage: true })

  await page.goto('/migrar/')
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('migration-mobile-dark.png'), fullPage: true })
})

test('captures reference app desktop and mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await forceTheme(page, 'light')
  await page.goto('/app/')
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('app-desktop-light.png'), fullPage: true })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('app-mobile-light.png'), fullPage: true })
})

test('captures login desktop in dark and light themes', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 900 })

  await forceTheme(page, 'dark')
  await page.goto('/login')
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('login-desktop-dark.png'), fullPage: true })

  await page.evaluate(() => window.localStorage.setItem('yiqi-theme', 'light'))
  await page.reload()
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('login-desktop-light.png'), fullPage: true })
})

test('captures login on the approved narrow viewport', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 520, height: 844 })
  await forceTheme(page, 'light')
  await page.goto('/login')

  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible()
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('login-mobile-light.png'), fullPage: true })
})

test('captures app shell desktop and mobile drawer', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await forceTheme(page, 'dark')
  await page.goto('/shell')
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('shell-desktop-dark.png'), fullPage: true })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await assertNoHorizontalOverflow(page)
  await page.screenshot({ path: testInfo.outputPath('shell-mobile-drawer-dark.png'), fullPage: true })
})
