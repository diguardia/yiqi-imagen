import { expect, test } from '@playwright/test'

const routes = ['/', '/app/', '/components/', '/components/button/', '/components/runtime-banner/', '/migrar/', '/login/', '/shell/', '/compat-login/'] as const

for (const route of routes) {
  test(`${route} loads without runtime or same-origin request failures`, async ({ page }) => {
    const pageErrors: string[] = []
    const consoleErrors: string[] = []
    const requestFailures: string[] = []
    const badResponses: string[] = []

    page.on('pageerror', (error) => pageErrors.push(error.message))
    page.on('console', (message) => {
      const location = message.location()
      const playwrightSandboxProbe = location.url === 'about:srcdoc'
        && message.text().startsWith("Blocked script execution in 'about:srcdoc'")
      if (message.type() === 'error' && !playwrightSandboxProbe) consoleErrors.push(message.text())
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

test('docs portal comparte marca y navegacion en sus superficies', async ({ page }) => {
  for (const route of ['/', '/components/', '/components/button/', '/migrar/'] as const) {
    await page.goto(route)
    await expect(page.locator('.docs-site-header')).toBeVisible()
    await expect(page.locator('svg.docs-brand-logo')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Navegación del Design System' })).toBeVisible()
  }

  await page.goto('/components/')
  await expect(page.getByRole('link', { name: 'Componentes', exact: true })).toHaveAttribute('aria-current', 'page')

  await page.goto('/migrar/')
  await expect(page.getByRole('link', { name: 'Migración', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('component detail exposes canonical navigation, API and copy feedback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/components/button/')

  await expect(page.getByRole('heading', { name: 'YiQiButton', level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Button', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.getByRole('table', { name: 'Props públicas de YiQiButton' })).toBeVisible()

  const importSnippet = page.getByTestId('snippet-import')
  await importSnippet.getByRole('button', { name: 'Copiar' }).click()
  await expect(importSnippet.getByRole('button', { name: 'Copiado' })).toBeVisible()
  await expect(importSnippet).toContainText("import { YiQiButton } from '@yiqi/ui/primitives'")

  await page.goto('/components/runtime-banner/')
  await expect(page.getByRole('link', { name: 'RuntimeBanner', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'RuntimeBanner', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('brand logo renders as inline SVG in the critical app surfaces', async ({ page }) => {
  await page.goto('/login/')
  await expect(page.locator('svg.yiqi-login-logo')).toBeVisible()

  await page.goto('/shell/')
  await expect(page.locator('svg.yiqi-topbar-logo')).toBeVisible()

  await page.goto('/')
  await expect(page.locator('svg.docs-brand-logo')).toBeVisible()
})

test('reference app no expone scaffolding de documentacion', async ({ page }) => {
  await page.goto('/app/')

  await expect(page.locator('.yiqi-app-name')).toHaveText('Operaciones')
  await expect(page.getByText('Cuenta de ejemplo', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Aplicación de referencia', { exact: true })).toHaveCount(0)
  await expect(page.getByText('3 Ambientes', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('navigation', { name: 'Navegación principal' }).first().getByRole('link', { name: 'Componentes' })).toHaveCount(0)
  await expect(page.getByRole('navigation', { name: 'Navegación principal' }).first().getByRole('link', { name: 'Migrar HTML/CSS' })).toHaveCount(0)
})

test('migration workbench previews legacy markup and detects React contracts', async ({ page }) => {
  await page.goto('/migrar/')

  await page.getByLabel('HTML legacy').fill(`
    <main>
      <button type="button">Guardar</button>
      <input type="checkbox" />
      <script>window.parent.__yiqiMigrationUnsafe = true</script>
    </main>
  `)

  await expect(page.getByTestId('migration-YiQiButton')).toContainText('YiQiButton')
  await expect(page.getByTestId('migration-YiQiCheckbox')).toContainText('YiQiCheckbox')

  const preview = page.frameLocator('[data-testid="migration-preview"]')
  await expect(preview.getByRole('button', { name: 'Guardar' })).toBeVisible()
  await expect.poll(() => page.evaluate(() => (window as typeof window & { __yiqiMigrationUnsafe?: boolean }).__yiqiMigrationUnsafe)).toBeUndefined()
})
