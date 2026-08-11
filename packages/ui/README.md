# @yiqi/ui

Paquete React del Design System YiQi.

La regla de consumo es simple: si un componente existe aquí, las aplicaciones deben importarlo en lugar de reconstruirlo desde HTML, CSS, Tailwind o prompts.

## Uso

```tsx
import '@yiqi/ui/styles.css'
import { YiQiProvider, YiQiLogin } from '@yiqi/ui'

export default function Page() {
  return (
    <YiQiProvider>
      <YiQiLogin
        appName="Mi app"
        onSubmit={async ({ username, password }) => {
          // conectar con la ruta de autenticación del proyecto
        }}
      />
    </YiQiProvider>
  )
}
```

## Componentes iniciales

- `YiQiProvider`
- `YiQiThemeCycle`
- `YiQiLogo`
- `YiQiButton`
- `YiQiInput`
- `YiQiCheckbox`
- `YiQiLogin`
- `YiQiAppShell`
- `YiQiKpiCard`
- `YiQiRuntimeBanner`
- `YiQiTrustStat`

## Radix

El paquete usa Radix Primitives para comportamiento accesible cuando corresponde. Radix es una dependencia interna de la implementación; una app consumidora no debe conocer qué primitive utiliza cada componente YiQi.

Esto permite cambiar o actualizar la implementación interna sin modificar el contrato público de `@yiqi/ui`.

## CSS

Importar una sola vez:

```tsx
import '@yiqi/ui/styles.css'
```

Los tokens nuevos están namespaced con `--yiqi-*`. Durante la transición se mantienen aliases de compatibilidad para las variables históricas más importantes.

## Regla de extensión

Si una app necesita una variante recurrente, agregar la prop o el componente aquí primero. Evitar overrides privados que provoquen diferencias entre aplicaciones.
