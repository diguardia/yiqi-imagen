# @yiqi/ui

Paquete React del Design System YiQi.

La regla de consumo es simple: si un componente existe aqui, las aplicaciones deben importarlo en lugar de reconstruirlo desde HTML, CSS, Tailwind o prompts.

## Uso rapido

```tsx
import '@yiqi/ui/styles.css'
import { YiQiProvider } from '@yiqi/ui/foundation'
import { YiQiLogin } from '@yiqi/ui/authentication'

export default function Page() {
  return (
    <YiQiProvider>
      <YiQiLogin
        appName="Mi app"
        onSubmit={async ({ username, password }) => {
          // conectar con la ruta de autenticacion del proyecto
        }}
      />
    </YiQiProvider>
  )
}
```

## Grupos de componentes

| Grupo | Import | Componentes actuales |
|---|---|---|
| Foundation | `@yiqi/ui/foundation` | `YiQiProvider`, `YiQiThemeCycle`, `YiQiLogo` |
| Primitives | `@yiqi/ui/primitives` | `YiQiButton`, `YiQiInput`, `YiQiCheckbox` |
| Authentication | `@yiqi/ui/authentication` | `YiQiLogin` |
| Layout | `@yiqi/ui/layout` | `YiQiAppShell` |
| Data display | `@yiqi/ui/data-display` | `YiQiKpiCard`, `YiQiTrustStat` |
| Feedback | `@yiqi/ui/feedback` | `YiQiRuntimeBanner` |

El entrypoint raiz `@yiqi/ui` sigue exportando todo para compatibilidad y prototipos pequenos. En codigo de aplicacion se prefieren los entrypoints agrupados porque hacen explicita la responsabilidad del componente.

## Regla de ubicacion

Un componente tiene una sola categoria principal. Si una familia crece, se crea una carpeta propia dentro de esa categoria. No se duplica el mismo componente en varios grupos; el catalogo debe resolver el descubrimiento.

## Radix

El paquete usa Radix Primitives para comportamiento accesible cuando corresponde. Radix es una dependencia interna de la implementacion; una app consumidora no debe conocer que primitive utiliza cada componente YiQi.

Esto permite cambiar o actualizar la implementacion interna sin modificar el contrato publico de `@yiqi/ui`.

## CSS

Importar una sola vez:

```tsx
import '@yiqi/ui/styles.css'
```

Los tokens nuevos estan namespaced con `--yiqi-*`. Durante la transicion se mantienen aliases de compatibilidad para las variables historicas mas importantes.

## Regla de extension

Si una app necesita una variante recurrente, agregar la prop o el componente aqui primero. Evitar overrides privados que provoquen diferencias entre aplicaciones.

## Gate minimo

Todo cambio en un componente debe pasar:

- guards legacy del repositorio
- guard de CSS consumidor sobre `packages/ui/src` y `apps/docs/app`
- TypeScript typecheck
- build de `@yiqi/ui` y Next.js
- pruebas E2E de los flujos afectados
- captura visual automatica de las pantallas criticas
