import { YiQiKpiCard } from '@yiqi/ui/data-display'

const groups = [
  {
    name: 'Foundation',
    importPath: '@yiqi/ui/foundation',
    components: [
      ['YiQiProvider', 'Tema y contexto base del Design System.'],
      ['YiQiThemeScript', 'Aplica la preferencia de tema antes de hidratar React.'],
      ['YiQiThemeCycle', 'Control canonico de tema.'],
      ['YiQiLogo', 'Logo YiQi como componente React.'],
    ],
  },
  {
    name: 'Primitives',
    importPath: '@yiqi/ui/primitives',
    components: [
      ['YiQiButton', 'Botones y variantes base.'],
      ['YiQiInput', 'Campo de entrada con label y accion opcional.'],
      ['YiQiCheckbox', 'Checkbox accesible basado en Radix.'],
    ],
  },
  {
    name: 'Authentication',
    importPath: '@yiqi/ui/authentication',
    components: [
      ['YiQiLogin', 'Pantalla canonica de inicio de sesion YiQi.'],
    ],
  },
  {
    name: 'Layout',
    importPath: '@yiqi/ui/layout',
    components: [
      ['YiQiAppShell', 'Topbar, sidebar y drawer mobile.'],
    ],
  },
  {
    name: 'Data display',
    importPath: '@yiqi/ui/data-display',
    components: [
      ['YiQiKpiCard', 'Indicador numerico con metadata y tono.'],
      ['YiQiTrustStat', 'Metrica compacta para confianza o disponibilidad.'],
    ],
  },
  {
    name: 'Feedback',
    importPath: '@yiqi/ui/feedback',
    components: [
      ['YiQiRuntimeBanner', 'Estado de runtime, demo, warning o error.'],
    ],
  },
] as const

export default function ComponentsPage() {
  return (
    <main className="docs-page">
      <header className="docs-header">
        <div>
          <p className="docs-kicker">@yiqi/ui · component map</p>
          <h1 className="docs-title">Componentes por grupo</h1>
          <p className="docs-subtitle">Cada componente tiene una responsabilidad principal y un entrypoint estable. El dev puede importar solo el grupo que necesita sin recorrer toda la implementacion.</p>
        </div>
      </header>

      <div className="docs-group-list">
        {groups.map((group) => (
          <section className="docs-group" key={group.name}>
            <div className="docs-group-heading">
              <h2>{group.name}</h2>
              <code>{group.importPath}</code>
            </div>
            <div className="docs-component-list">
              {group.components.map(([name, description]) => (
                <article className="docs-component" key={name}>
                  <strong>{name}</strong>
                  <span>{description}</span>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="docs-group">
        <div className="docs-group-heading">
          <h2>Casos de contrato</h2>
          <code>regresiones</code>
        </div>
        <div data-testid="kpi-meta-cero">
          <YiQiKpiCard label="Metadata numerica cero" value="Valor de prueba" meta={0} />
        </div>
      </section>
    </main>
  )
}
