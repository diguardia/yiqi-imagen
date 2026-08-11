import { expect, test } from '@playwright/test'

const routes = ['/', '/components/', '/login/', '/shell/', '/compat-login/'] as const

for (const route of routes) {
  test(`${route} loads without runtime or same-origin request failures`, async ({ page }) => {
    const pageErrors: string[] = []
    const consoleErrors: string[] = []
    const requestFailures: string[] = []
    const badResponses: string[] = []

    page.on('pageerror', (error) => pageErrors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('requestfailed', (request) => {
      const url = new URL(request.url())
      const intentionalHeadAbort = request.method() === 'HEAD' && request.failure()?.errorText === 'net::ERR_ABORTED'
      if (url.origin === 'http://127.0.0.1:3000' && !intentionalHeadAbort) {
        requestFailures.push(`${request.method()} ${url.pathname}: ${request.failure()?.errorText ?? 'failed'}`)
      }
    })
    page.on('response', (response) => {
      const url = new URL(response.url())
      if (url.origin === 'http://127.0.0.1:3000' && response.status() >= 400) {
        badResponses.push(`${response.status()} ${url.pathname}`)
      }
    })

    const response = await page.goto(route, { waitUntil: 'networkidle' })
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('body')).toBeVisible()
    expect(pageErrors).toEqual([])
    expect(consoleErrors).toEqual([])
    expect(requestFailures).toEqual([])
    expect(badResponses).toEqual([])
  })
}

test('brand logo renders as inline SVG in the critical app surfaces', async ({ page }) => {
  await page.goto('/login/')
  await expect(page.locator('svg.yiqi-login-logo')).toBeVisible()

  await page.goto('/shell/')
  await expect(page.locator('svg.yiqi-topbar-logo')).toBeVisible()
})
