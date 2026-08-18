import { YiQiAppShell } from '@yiqi/ui/layout'
import { YiQiButton } from '@yiqi/ui/primitives'
import { YiQiKpiCard } from '@yiqi/ui/data-display'
import { YiQiRuntimeBanner } from '@yiqi/ui/feedback'
import { DemoAccount } from './demo-account'

const navigation = [
  { href: '/shell', label: 'Resumen', active: true },
  { href: '#analisis', label: 'Análisis' },
  { href: '#documentos', label: 'Documentos' },
]

export default function ShellPage() {
  return (
    <div className="docs-shell-demo">
      <YiQiAppShell
        appName="Mi app"
        navigation={navigation}
        account={<DemoAccount />}
        actions={<YiQiButton variant="ghost">Cerrar sesión</YiQiButton>}
      >
        <div className="yiqi-kpi-grid">
          <YiQiKpiCard label="Facturación" value="$ 4.284.900" meta="Dato de ejemplo" />
          <YiQiKpiCard label="Órdenes" value="231" tone="positive" meta="+8,0%" />
          <YiQiKpiCard label="Pendientes" value="14" tone="warning" meta="Dato de ejemplo" />
        </div>
        <div className="docs-shell-stack">
          <YiQiRuntimeBanner title="Shell React" description="El drawer móvil usa Radix Dialog; las apps ya no deben copiar el HTML del shell." />
        </div>
      </YiQiAppShell>
    </div>
  )
}
