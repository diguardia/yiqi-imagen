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
        appName="Operaciones"
        navigation={navigation}
        account={<DemoAccount />}
        actions={<YiQiButton variant="ghost">Cerrar sesión</YiQiButton>}
      >
        <div className="yiqi-kpi-grid">
          <YiQiKpiCard label="Facturación" value="$ 4.284.900" meta="Últimos 30 días" />
          <YiQiKpiCard label="Órdenes" value="231" tone="positive" meta="+8,0%" />
          <YiQiKpiCard label="Pendientes" value="14" tone="warning" meta="Requieren revisión" />
        </div>
        <div className="docs-shell-stack">
          <YiQiRuntimeBanner title="Contrato AppShell" description="El drawer móvil mantiene navegación, cuenta, acciones y tema dentro del mismo shell." />
        </div>
      </YiQiAppShell>
    </div>
  )
}
