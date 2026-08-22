export type ComponentGroupId = 'foundation' | 'primitives' | 'authentication' | 'layout' | 'data-display' | 'feedback'

export interface ComponentApiRow {
  name: string
  type: string
  defaultValue?: string
  description: string
}

export interface ComponentDoc {
  id: string
  name: string
  group: ComponentGroupId
  summary: string
  importStatement: string
  usage: string
  api: ComponentApiRow[]
  variants: string[]
  accessibility: string[]
}

export const componentGroups = [
  { id: 'foundation', label: 'Foundation', importPath: '@yiqi/ui/foundation' },
  { id: 'primitives', label: 'Primitives', importPath: '@yiqi/ui/primitives' },
  { id: 'authentication', label: 'Authentication', importPath: '@yiqi/ui/authentication' },
  { id: 'layout', label: 'Layout', importPath: '@yiqi/ui/layout' },
  { id: 'data-display', label: 'Data display', importPath: '@yiqi/ui/data-display' },
  { id: 'feedback', label: 'Feedback', importPath: '@yiqi/ui/feedback' },
] as const

export const componentDocs: ComponentDoc[] = [
  {
    id: 'logo',
    name: 'YiQiLogo',
    group: 'foundation',
    summary: 'Marca vectorial YiQi que hereda el color de texto y conserva el acento cyan del sistema.',
    importStatement: "import { YiQiLogo } from '@yiqi/ui/foundation'",
    usage: '<YiQiLogo title="YiQi Operaciones" className="app-logo" />',
    api: [
      { name: 'title', type: 'string', defaultValue: '"YiQi"', description: 'Nombre accesible del gráfico.' },
      { name: '…svgProps', type: 'SVGProps<SVGSVGElement>', description: 'Atributos nativos del elemento SVG.' },
    ],
    variants: ['Color heredado desde currentColor', 'Acento cyan resuelto por el tema', 'Tamaño controlado por CSS o atributos SVG'],
    accessibility: ['Se expone como imagen con role="img".', 'title define el nombre accesible; debe describir la marca en su contexto.'],
  },
  {
    id: 'provider',
    name: 'YiQiProvider',
    group: 'foundation',
    summary: 'Contexto raíz para apariencia YiQi y primitives globales compartidos por la aplicación.',
    importStatement: "import { YiQiProvider } from '@yiqi/ui/foundation'",
    usage: '<YiQiProvider defaultTheme="system">\n  <App />\n</YiQiProvider>',
    api: [
      { name: 'children', type: 'ReactNode', description: 'Árbol de la aplicación que consume el contexto.' },
      { name: 'defaultTheme', type: "'dark' | 'system' | 'light'", defaultValue: '"system"', description: 'Preferencia inicial cuando no existe una guardada.' },
    ],
    variants: ['Tema oscuro', 'Tema del sistema', 'Tema claro'],
    accessibility: ['Centraliza el Provider de tooltips para que los controles compactos mantengan explicación visible.', 'No agrega estructura visual ni altera la semántica de sus children.'],
  },
  {
    id: 'theme-cycle',
    name: 'YiQiThemeCycle',
    group: 'foundation',
    summary: 'Control compacto que recorre oscuro, sistema y claro usando el estado del Provider.',
    importStatement: "import { YiQiThemeCycle } from '@yiqi/ui/foundation'",
    usage: '<YiQiThemeCycle />',
    api: [],
    variants: ['Oscuro → Sistema', 'Sistema → Claro', 'Claro → Oscuro'],
    accessibility: ['El nombre accesible anuncia el tema actual y el próximo valor.', 'Usa un button nativo y conserva foco visible.'],
  },
  {
    id: 'theme-script',
    name: 'YiQiThemeScript',
    group: 'foundation',
    summary: 'Bootstrap SSR que aplica la apariencia guardada antes de hidratar React y evita un flash de tema incorrecto.',
    importStatement: "import { YiQiThemeScript } from '@yiqi/ui/foundation'",
    usage: '<head>\n  <YiQiThemeScript defaultTheme="system" />\n</head>',
    api: [
      { name: 'defaultTheme', type: "'dark' | 'system' | 'light'", defaultValue: '"system"', description: 'Fallback usado cuando storage no contiene una preferencia válida.' },
      { name: 'nonce', type: 'string', description: 'Nonce opcional para una política CSP que lo requiera.' },
    ],
    variants: ['Preferencia guardada', 'Fallback del producto', 'Resolución de prefers-color-scheme'],
    accessibility: ['No produce contenido visual ni entra al árbol de accesibilidad.', 'Debe acompañar al Provider en aplicaciones con SSR.'],
  },
  {
    id: 'button',
    name: 'YiQiButton',
    group: 'primitives',
    summary: 'Acción base con jerarquías visuales explícitas y todos los atributos del botón nativo.',
    importStatement: "import { YiQiButton } from '@yiqi/ui/primitives'",
    usage: '<YiQiButton variant="primary">Guardar cambios</YiQiButton>',
    api: [
      { name: 'variant', type: "'default' | 'primary' | 'ghost'", defaultValue: '"default"', description: 'Jerarquía visual de la acción.' },
      { name: 'type', type: "'button' | 'submit' | 'reset'", defaultValue: '"button"', description: 'Tipo nativo; evita submits accidentales por defecto.' },
      { name: '…buttonProps', type: 'ButtonHTMLAttributes<HTMLButtonElement>', description: 'Atributos, eventos y estados nativos.' },
    ],
    variants: ['Default para acciones secundarias', 'Primary para la acción principal', 'Ghost para utilidades de bajo énfasis', 'Disabled mediante el atributo nativo'],
    accessibility: ['Renderiza un button nativo.', 'El foco visible, disabled y el nombre accesible provienen del contenido y atributos estándar.'],
  },
  {
    id: 'input',
    name: 'YiQiInput',
    group: 'primitives',
    summary: 'Campo de una línea con label asociado, ref y un slot opcional para una acción local.',
    importStatement: "import { YiQiInput } from '@yiqi/ui/primitives'",
    usage: '<YiQiInput\n  label="Correo"\n  type="email"\n  placeholder="nombre@empresa.com"\n/>',
    api: [
      { name: 'label', type: 'string', description: 'Etiqueta visible asociada al input.' },
      { name: 'action', type: 'ReactNode', description: 'Control local ubicado dentro del campo.' },
      { name: 'ref', type: 'Ref<HTMLInputElement>', description: 'Referencia al input nativo.' },
      { name: '…inputProps', type: 'InputHTMLAttributes<HTMLInputElement>', description: 'Tipos, validación, autocompletado, eventos y estados nativos.' },
    ],
    variants: ['Con o sin etiqueta visible', 'Con acción local', 'Tipos input nativos', 'Disabled y required nativos'],
    accessibility: ['La etiqueta usa htmlFor y un id estable generado cuando no se proporciona uno.', 'La acción debe tener nombre accesible propio y no reemplaza la etiqueta del campo.'],
  },
  {
    id: 'textarea',
    name: 'YiQiTextarea',
    group: 'primitives',
    summary: 'Campo multilínea que comparte la gramática visual y el contrato accesible de formularios YiQi.',
    importStatement: "import { YiQiTextarea } from '@yiqi/ui/primitives'",
    usage: '<YiQiTextarea label="Notas" rows={4} />',
    api: [
      { name: 'label', type: 'string', description: 'Etiqueta visible asociada al textarea.' },
      { name: 'ref', type: 'Ref<HTMLTextAreaElement>', description: 'Referencia al elemento nativo.' },
      { name: '…textareaProps', type: 'TextareaHTMLAttributes<HTMLTextAreaElement>', description: 'Atributos, eventos y estados nativos.' },
    ],
    variants: ['Con o sin etiqueta visible', 'Altura inicial mediante rows', 'Controlled o uncontrolled', 'Disabled y required nativos'],
    accessibility: ['La etiqueta se asocia mediante htmlFor e id estable.', 'Conserva semántica y navegación de un textarea nativo.'],
  },
  {
    id: 'checkbox',
    name: 'YiQiCheckbox',
    group: 'primitives',
    summary: 'Selección binaria accesible con estado controlado o inicial, construida sobre un primitive Radix.',
    importStatement: "import { YiQiCheckbox } from '@yiqi/ui/primitives'",
    usage: '<YiQiCheckbox\n  label="Incluir pendientes"\n  defaultChecked\n/>',
    api: [
      { name: 'label', type: 'string', description: 'Texto obligatorio que etiqueta toda la fila interactiva.' },
      { name: 'checked', type: 'boolean', description: 'Estado controlado.' },
      { name: 'defaultChecked', type: 'boolean', description: 'Estado inicial no controlado.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Deshabilita interacción y comunica el estado.' },
      { name: 'name', type: 'string', description: 'Nombre usado al participar de un formulario.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Notifica cambios como boolean estricto.' },
    ],
    variants: ['Unchecked', 'Checked', 'Disabled', 'Controlled o uncontrolled'],
    accessibility: ['Toda la fila es una label activable.', 'El primitive mantiene estado, teclado y atributos accesibles sincronizados.'],
  },
  {
    id: 'tooltip',
    name: 'YiQiTooltip',
    group: 'primitives',
    summary: 'Explicación contextual accesible para un único control o elemento interactivo.',
    importStatement: "import { YiQiTooltip } from '@yiqi/ui/primitives'",
    usage: '<YiQiTooltip label="Volver al inicio" side="bottom">\n  <button aria-label="Volver al inicio">…</button>\n</YiQiTooltip>',
    api: [
      { name: 'label', type: 'string', description: 'Explicación visible del trigger.' },
      { name: 'children', type: 'ReactElement', description: 'Único elemento usado como trigger.' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: '"top"', description: 'Lado preferido; Radix resuelve colisiones.' },
    ],
    variants: ['Top', 'Right', 'Bottom', 'Left'],
    accessibility: ['El trigger sigue siendo el elemento hijo mediante asChild.', 'Un control icon-only conserva además su propio aria-label; el tooltip no lo sustituye.'],
  },
  {
    id: 'login',
    name: 'YiQiLogin',
    group: 'authentication',
    summary: 'Pantalla canónica de acceso con validación, loading, remember, errores y visibilidad de contraseña.',
    importStatement: "import { YiQiLogin } from '@yiqi/ui/authentication'",
    usage: '<YiQiLogin\n  appName="Operaciones"\n  onSubmit={async ({ username, password }) => {\n    await authenticate(username, password)\n  }}\n/>',
    api: [
      { name: 'onSubmit', type: '(input: YiQiLoginInput) => Promise<YiQiLoginResult> | YiQiLoginResult', description: 'Integración obligatoria con autenticación.' },
      { name: 'appName', type: 'string', defaultValue: '"YiQi"', description: 'Nombre del producto consumidor.' },
      { name: 'description', type: 'string', description: 'Contexto breve del acceso.' },
      { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Estado loading controlado externamente.' },
      { name: 'error', type: 'string', description: 'Error controlado externamente.' },
      { name: 'initialUsername', type: 'string', defaultValue: '""', description: 'Usuario inicial cuando no se recupera storage.' },
      { name: 'onForgotPassword', type: '() => void', description: 'Acción personalizada para recuperación.' },
      { name: 'logo', type: 'ReactNode', description: 'Marca alternativa cuando el producto la requiere.' },
      { name: 'copy y storage', type: 'string props', description: 'Labels, mensajes, footer y rememberStorageKey configurables.' },
    ],
    variants: ['Idle', 'Validación local', 'Loading interno o controlado', 'Error interno o externo', 'Usuario recordado'],
    accessibility: ['Labels asociados y autocomplete para usuario y contraseña.', 'Los cambios de loading, error e información usan un único status live.', 'El control de contraseña mantiene aria-pressed y nombre dinámico.'],
  },
  {
    id: 'app-shell',
    name: 'YiQiAppShell',
    group: 'layout',
    summary: 'Shell de aplicación con topbar, navegación lateral, utilidades y drawer responsive.',
    importStatement: "import { YiQiAppShell } from '@yiqi/ui/layout'",
    usage: '<YiQiAppShell\n  appName="Operaciones"\n  navigation={[{ href: "/", label: "Inicio", active: true }]}\n>\n  <Dashboard />\n</YiQiAppShell>',
    api: [
      { name: 'appName', type: 'string', description: 'Identidad de la aplicación.' },
      { name: 'navigation', type: 'YiQiNavItem[]', description: 'Destinos con href, label y active opcional.' },
      { name: 'children', type: 'ReactNode', description: 'Contenido principal.' },
      { name: 'account', type: 'ReactNode', description: 'Controles de cuenta; el estado durable debe vivir fuera del slot.' },
      { name: 'actions', type: 'ReactNode', description: 'Acciones globales de la aplicación.' },
    ],
    variants: ['Sidebar desktop', 'Drawer mobile', 'Slots account y actions opcionales'],
    accessibility: ['La navegación activa usa aria-current="page".', 'El drawer tiene título, descripción, cierre y nombres accesibles.', 'El cambio de viewport preserva el contrato, aunque los slots pueden remontarse.'],
  },
  {
    id: 'kpi-card',
    name: 'YiQiKpiCard',
    group: 'data-display',
    summary: 'Indicador numérico con etiqueta, valor, metadata opcional y tonos semánticos.',
    importStatement: "import { YiQiKpiCard } from '@yiqi/ui/data-display'",
    usage: '<YiQiKpiCard\n  label="Órdenes"\n  value="231"\n  meta="+8,0%"\n  tone="positive"\n/>',
    api: [
      { name: 'label', type: 'string', description: 'Nombre de la métrica.' },
      { name: 'value', type: 'ReactNode', description: 'Valor principal.' },
      { name: 'meta', type: 'ReactNode', description: 'Contexto opcional; 0 se conserva como valor válido.' },
      { name: 'tone', type: "'neutral' | 'positive' | 'warning' | 'danger'", defaultValue: '"neutral"', description: 'Tono semántico aplicado al valor.' },
    ],
    variants: ['Neutral', 'Positive', 'Warning', 'Danger', 'Con o sin metadata'],
    accessibility: ['Usa una estructura article legible en orden etiqueta, valor y metadata.', 'El tono complementa el contenido; no debe ser la única fuente de significado.'],
  },
  {
    id: 'trust-stat',
    name: 'YiQiTrustStat',
    group: 'data-display',
    summary: 'Métrica compacta para disponibilidad, confianza o atributos resumidos.',
    importStatement: "import { YiQiTrustStat } from '@yiqi/ui/data-display'",
    usage: '<YiQiTrustStat value="99,9%" label="Disponibilidad" />',
    api: [
      { name: 'value', type: 'ReactNode', description: 'Valor destacado.' },
      { name: 'label', type: 'string', description: 'Contexto textual del valor.' },
    ],
    variants: ['Valores porcentuales', 'Valores numéricos', 'Disponibilidad o cobertura'],
    accessibility: ['Usa article y conserva juntos el valor y su etiqueta.', 'No comunica tendencia ni delta: esas capacidades todavía no forman parte del contrato.'],
  },
  {
    id: 'runtime-banner',
    name: 'YiQiRuntimeBanner',
    group: 'feedback',
    summary: 'Mensaje contextual persistente con jerarquías neutral, warning y danger y una acción opcional.',
    importStatement: "import { YiQiRuntimeBanner } from '@yiqi/ui/feedback'",
    usage: '<YiQiRuntimeBanner\n  title="Revisión pendiente"\n  description="Hay elementos que necesitan verificación."\n  tone="warning"\n/>',
    api: [
      { name: 'title', type: 'string', description: 'Resumen del estado.' },
      { name: 'description', type: 'string', description: 'Detalle que ayuda a comprender o resolver.' },
      { name: 'tone', type: "'neutral' | 'warning' | 'danger'", defaultValue: '"neutral"', description: 'Severidad semántica.' },
      { name: 'action', type: 'ReactNode', description: 'Acción local opcional.' },
    ],
    variants: ['Neutral como status', 'Warning como status', 'Danger como alert', 'Con acción local'],
    accessibility: ['Neutral y warning usan role="status"; danger usa role="alert".', 'La acción pertenece al banner y debe describir directamente su consecuencia.'],
  },
]

export function getComponentDoc(id: string) {
  return componentDocs.find((component) => component.id === id)
}

export function getComponentGroup(id: ComponentGroupId) {
  return componentGroups.find((group) => group.id === id)!
}
