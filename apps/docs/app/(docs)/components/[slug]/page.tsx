import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CodeSnippet, ComponentPreview } from '../component-detail-client'
import { componentDocs, getComponentDoc, getComponentGroup } from '../component-catalog'

const previewLabel = 'Preview'
const apiLabel = 'API reference'
const accessibilityLabel = 'Accesibilidad'
const onThisPageLabel = 'En esta página'
const typeLabel = 'Tipo'
const defaultLabel = 'Default'
const descriptionLabel = 'Descripción'

interface ComponentDetailPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return componentDocs.map(({ id }) => ({ slug: id }))
}

export async function generateMetadata({ params }: ComponentDetailPageProps): Promise<Metadata> {
  const component = getComponentDoc((await params).slug)
  if (!component) return {}
  return {
    title: `${component.name} · YiQi UI`,
    description: component.summary,
  }
}

export default async function ComponentDetailPage({ params }: ComponentDetailPageProps) {
  const component = getComponentDoc((await params).slug)
  if (!component) notFound()

  const group = getComponentGroup(component.group)
  const currentIndex = componentDocs.findIndex(({ id }) => id === component.id)
  const previous = componentDocs[currentIndex - 1]
  const next = componentDocs[currentIndex + 1]

  return (
    <main className="docs-page docs-detail-page">
      <header className="docs-page-heading docs-detail-heading">
        <div>
          <p className="docs-kicker">{group.label} · {group.importPath}</p>
          <h1 className="docs-title">{component.name}</h1>
          <p className="docs-subtitle">{component.summary}</p>
        </div>
        <Link className="docs-inline-link docs-back-link" href="/components/" prefetch={false}>← Todos los componentes</Link>
      </header>

      <div className="docs-detail-layout">
        <div className="docs-detail-main">
          <section className="docs-detail-section" id="preview" aria-labelledby="preview-title">
            <div className="docs-detail-section-heading">
              <p className="docs-section-index">01</p>
              <div><h2 id="preview-title">{previewLabel}</h2><p>El componente real, renderizado desde su entrypoint público.</p></div>
            </div>
            <div className="docs-detail-preview"><ComponentPreview id={component.id} /></div>
          </section>

          <section className="docs-detail-section" id="uso" aria-labelledby="usage-title">
            <div className="docs-detail-section-heading">
              <p className="docs-section-index">02</p>
              <div><h2 id="usage-title">Uso</h2><p>Importa el contrato canónico; la aplicación aporta datos y comportamiento.</p></div>
            </div>
            <CodeSnippet code={component.importStatement} label="Import" />
            <CodeSnippet code={component.usage} label="Ejemplo" />
          </section>

          <section className="docs-detail-section" id="api" aria-labelledby="api-title">
            <div className="docs-detail-section-heading">
              <p className="docs-section-index">03</p>
              <div><h2 id="api-title">{apiLabel}</h2><p>Props públicas expuestas por {component.name}.</p></div>
            </div>
            {component.api.length ? (
              <div className="docs-api-table-wrap">
                <table className="docs-api-table">
                  <caption>Props públicas de {component.name}</caption>
                  <thead><tr><th>Prop</th><th>{typeLabel}</th><th>{defaultLabel}</th><th>{descriptionLabel}</th></tr></thead>
                  <tbody>
                    {component.api.map((row) => (
                      <tr key={row.name}>
                        <th scope="row"><code>{row.name}</code></th>
                        <td data-label={typeLabel}><code>{row.type}</code></td>
                        <td data-label={defaultLabel}>{row.defaultValue ? <code>{row.defaultValue}</code> : <span aria-label="Sin valor por defecto">—</span>}</td>
                        <td data-label={descriptionLabel}>{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="docs-empty-contract">Este componente no expone props propias.</p>}
          </section>

          <section className="docs-detail-section" id="variantes" aria-labelledby="variants-title">
            <div className="docs-detail-section-heading">
              <p className="docs-section-index">04</p>
              <div><h2 id="variants-title">Variantes y estados</h2><p>Capacidades que forman parte del contrato actual.</p></div>
            </div>
            <ul className="docs-detail-list">
              {component.variants.map((variant) => <li key={variant}>{variant}</li>)}
            </ul>
          </section>

          <section className="docs-detail-section" id="accesibilidad" aria-labelledby="accessibility-title">
            <div className="docs-detail-section-heading">
              <p className="docs-section-index">05</p>
              <div><h2 id="accessibility-title">{accessibilityLabel}</h2><p>Semántica y comportamiento que el consumidor debe conservar.</p></div>
            </div>
            <ul className="docs-detail-list docs-detail-list--accent">
              {component.accessibility.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <nav className="docs-detail-pagination" aria-label="Componentes anterior y siguiente">
            {previous ? (
              <Link href={`/components/${previous.id}/`} prefetch={false}>
                <span>Anterior</span>
                <strong>← {previous.name}</strong>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/components/${next.id}/`} prefetch={false}>
                <span>Siguiente</span>
                <strong>{next.name} →</strong>
              </Link>
            ) : <span />}
          </nav>
        </div>

        <aside className="docs-detail-toc" aria-label={onThisPageLabel}>
          <p>{onThisPageLabel}</p>
          <a href="#preview">{previewLabel}</a>
          <a href="#uso">Uso</a>
          <a href="#api">{apiLabel}</a>
          <a href="#variantes">Variantes</a>
          <a href="#accesibilidad">{accessibilityLabel}</a>
        </aside>
      </div>
    </main>
  )
}
