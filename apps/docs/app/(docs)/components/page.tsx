'use client'

import Link from 'next/link'
import { YiQiLogo, YiQiThemeCycle } from '@yiqi/ui/foundation'
import { YiQiButton, YiQiCheckbox, YiQiInput, YiQiTextarea, YiQiTooltip } from '@yiqi/ui/primitives'
import { YiQiKpiCard, YiQiTrustStat } from '@yiqi/ui/data-display'
import { YiQiRuntimeBanner } from '@yiqi/ui/feedback'

const tooltipActionText = 'Volver al inicio'

export default function ComponentsPage() {
  return (
    <main className="docs-page">
      <header className="docs-page-heading">
        <div>
          <p className="docs-kicker">@yiqi/ui · catálogo</p>
          <h1 className="docs-title">Componentes</h1>
          <p className="docs-subtitle">Referencia visual y contractual de los entrypoints públicos del paquete React.</p>
        </div>
      </header>

      <div className="docs-component-sections">
        <section className="docs-component-section" aria-labelledby="foundation-title">
          <div className="docs-component-section-heading">
            <h2 id="foundation-title">Foundation</h2>
            <code>@yiqi/ui/foundation</code>
          </div>
          <div className="docs-example-grid">
            <article className="docs-component-example">
              <div className="docs-component-copy">
                <h3>YiQiLogo</h3>
                <p>Marca vectorial con color adaptable al tema y acento cyan.</p>
              </div>
              <div className="docs-example-preview docs-example-preview--brand">
                <YiQiLogo className="docs-catalog-logo" />
              </div>
            </article>
            <article className="docs-component-example">
              <div className="docs-component-copy">
                <h3>YiQiThemeCycle</h3>
                <p>Preferencia de apariencia con estados oscuro, sistema y claro.</p>
              </div>
              <div className="docs-example-preview">
                <YiQiThemeCycle />
              </div>
            </article>
          </div>
          <div className="docs-contract-grid">
            <article className="docs-contract-card">
              <strong>YiQiProvider</strong>
              <span>Contexto compartido para preferencia de tema y primitives globales.</span>
            </article>
            <article className="docs-contract-card">
              <strong>YiQiThemeScript</strong>
              <span>Bootstrap SSR que resuelve la apariencia antes de hidratar la aplicación.</span>
            </article>
          </div>
        </section>

        <section className="docs-component-section" aria-labelledby="primitives-title">
          <div className="docs-component-section-heading">
            <h2 id="primitives-title">Primitives</h2>
            <code>@yiqi/ui/primitives</code>
          </div>
          <div className="docs-example-grid">
            <article className="docs-component-example">
              <div className="docs-component-copy">
                <h3>YiQiButton</h3>
                <p>Acciones base con jerarquías default, primary y ghost.</p>
              </div>
              <div className="docs-example-preview docs-example-actions">
                <YiQiButton>Default</YiQiButton>
                <YiQiButton variant="primary">Primary</YiQiButton>
                <YiQiButton variant="ghost">Ghost</YiQiButton>
                <YiQiButton disabled>Deshabilitado</YiQiButton>
              </div>
            </article>

            <article className="docs-component-example">
              <div className="docs-component-copy">
                <h3>YiQiInput</h3>
                <p>Entrada etiquetada con atributos nativos y acción opcional.</p>
              </div>
              <div className="docs-example-preview">
                <YiQiInput label="Correo" placeholder="nombre@empresa.com" />
              </div>
            </article>

            <article className="docs-component-example">
              <div className="docs-component-copy">
                <h3>YiQiTextarea</h3>
                <p>Campo multilínea que conserva el contrato visual de formularios.</p>
              </div>
              <div className="docs-example-preview">
                <YiQiTextarea label="Notas" defaultValue="Resumen breve de la operación." rows={4} />
              </div>
            </article>

            <article className="docs-component-example">
              <div className="docs-component-copy">
                <h3>YiQiCheckbox</h3>
                <p>Selección binaria accesible con estado controlado o inicial.</p>
              </div>
              <div className="docs-example-preview docs-checkbox-stack">
                <YiQiCheckbox label="Incluir pendientes" defaultChecked />
                <YiQiCheckbox label="Opción no disponible" disabled />
              </div>
            </article>

            <article className="docs-component-example">
              <div className="docs-component-copy">
                <h3>YiQiTooltip</h3>
                <p>Etiqueta contextual para controles compactos que conservan su nombre accesible.</p>
              </div>
              <div className="docs-example-preview">
                <YiQiTooltip label={tooltipActionText}>
                  <Link className="yiqi-icon-button" href="/" aria-label={tooltipActionText} prefetch={false}>
                    <HomeIcon />
                  </Link>
                </YiQiTooltip>
              </div>
            </article>
          </div>
        </section>

        <section className="docs-component-section" aria-labelledby="authentication-title">
          <div className="docs-component-section-heading">
            <h2 id="authentication-title">Authentication</h2>
            <code>@yiqi/ui/authentication</code>
          </div>
          <article className="docs-component-example docs-component-example--wide">
            <div className="docs-component-copy">
              <h3>YiQiLogin</h3>
              <p>Pantalla canónica de acceso, con validación, loading, remember y visibilidad de contraseña.</p>
            </div>
            <div className="docs-component-actions">
              <span>Credenciales del ejemplo: <code>demo / demo</code></span>
              <Link className="docs-cta" href="/login/" prefetch={false}>Abrir ejemplo de login</Link>
            </div>
          </article>
        </section>

        <section className="docs-component-section" aria-labelledby="layout-title">
          <div className="docs-component-section-heading">
            <h2 id="layout-title">Layout</h2>
            <code>@yiqi/ui/layout</code>
          </div>
          <article className="docs-component-example docs-component-example--wide">
            <div className="docs-component-copy">
              <h3>YiQiAppShell</h3>
              <p>Topbar, identidad de aplicación, navegación lateral y drawer responsive.</p>
            </div>
            <div className="docs-component-actions">
              <Link className="docs-cta" href="/shell/" prefetch={false}>Abrir shell</Link>
              <Link className="docs-inline-link" href="/app/" prefetch={false}>Ver aplicación completa →</Link>
            </div>
          </article>
        </section>

        <section className="docs-component-section" aria-labelledby="data-display-title">
          <div className="docs-component-section-heading">
            <h2 id="data-display-title">Data display</h2>
            <code>@yiqi/ui/data-display</code>
          </div>
          <article className="docs-component-example docs-component-example--wide">
            <div className="docs-component-copy">
              <h3>YiQiKpiCard</h3>
              <p>Indicador numérico con metadata opcional y tonos semánticos.</p>
            </div>
            <div className="yiqi-kpi-grid">
              <YiQiKpiCard label="Facturación" value="$ 4.284.900" meta="Últimos 30 días" />
              <YiQiKpiCard label="Órdenes" value="231" tone="positive" meta="+8,0%" />
              <YiQiKpiCard label="Pendientes" value="14" tone="warning" meta="Revisión requerida" />
            </div>
            <div data-testid="kpi-meta-cero" className="docs-contract-case">
              <YiQiKpiCard label="Alertas" value="12" tone="danger" meta={0} />
              <p>Caso de contrato: <code>meta={'{0}'}</code> se conserva como valor válido.</p>
            </div>
          </article>

          <article className="docs-component-example docs-component-example--wide">
            <div className="docs-component-copy">
              <h3>YiQiTrustStat</h3>
              <p>Métrica compacta para datos de confianza o disponibilidad.</p>
            </div>
            <div className="yiqi-trust-grid">
              <YiQiTrustStat value="99,9%" label="Disponibilidad" />
              <YiQiTrustStat value="24/7" label="Monitoreo" />
              <YiQiTrustStat value="8" label="Servicios" />
            </div>
          </article>
        </section>

        <section className="docs-component-section" aria-labelledby="feedback-title">
          <div className="docs-component-section-heading">
            <h2 id="feedback-title">Feedback</h2>
            <code>@yiqi/ui/feedback</code>
          </div>
          <article className="docs-component-example docs-component-example--wide">
            <div className="docs-component-copy">
              <h3>YiQiRuntimeBanner</h3>
              <p>Estado contextual con tratamientos neutral, warning y danger.</p>
            </div>
            <div className="docs-feedback-stack">
              <YiQiRuntimeBanner title="Operación estable" description="No hay eventos que requieran atención." />
              <YiQiRuntimeBanner title="Revisión pendiente" description="Hay elementos que necesitan una verificación manual." tone="warning" />
              <YiQiRuntimeBanner title="Servicio interrumpido" description="La operación no puede continuar hasta recuperar la dependencia." tone="danger" />
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}

function HomeIcon() {
  return (
    <svg className="docs-catalog-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4Z" />
    </svg>
  )
}
