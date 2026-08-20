# @yiqi/ui

Paquete React del Design System YiQi.

La regla de consumo es directa: si un componente existe aqui, la aplicacion lo importa. No copia su JSX, no reconstruye su CSS y no lo vuelve a implementar con otro nombre.

## Uso rapido

Importar los estilos una sola vez y montar el Provider en el layout raiz.

En aplicaciones con render del lado servidor, incluir tambien `YiQiThemeScript` en el `<head>`. Este script aplica `yiqi-theme` antes de hidratar React y evita arrancar con un tema distinto al guardado por el usuario.

```tsx
import '@yiqi/ui/styles.css'
import { YiQiProvider, YiQiThemeScript } from '@yiqi/ui/foundation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-yiqi-theme="dark" suppressHydrationWarning>
      <head>
        <YiQiThemeScript />
      </head>
      <body>
        <YiQiProvider>{children}</YiQiProvider>
      </body>
    </html>
  )
}
```

El atributo de runtime del paquete es `data-yiqi-theme`. No usa ni sobrescribe el atributo generico `data-theme`, que queda disponible para el sistema de tema propio de la aplicacion consumidora.

Luego consumir componentes desde su grupo publico:

```tsx
import { YiQiLogin } from '@yiqi/ui/authentication'

<YiQiLogin
  appName="Mi app"
  onSubmit={async ({ username, password }) => authenticate(username, password)}
/>
```

La app consumidora se limita a datos, copy, rutas, callbacks y children expuestos por la API publica del componente.

## Grupos

| Grupo | Import | Responsabilidad |
|---|---|---|
| Foundation | `@yiqi/ui/foundation` | Provider, bootstrap de tema y marca |
| Primitives | `@yiqi/ui/primitives` | Button, Input, Textarea y Checkbox |
| Authentication | `@yiqi/ui/authentication` | Login y autenticacion visual |
| Layout | `@yiqi/ui/layout` | App Shell y estructura |
| Data display | `@yiqi/ui/data-display` | KPIs y metricas de lectura |
| Feedback | `@yiqi/ui/feedback` | Banners y estados |

El entrypoint raiz `@yiqi/ui` se conserva por compatibilidad. Codigo nuevo debe preferir el grupo correspondiente.

## Contrato de extension

Si una app necesita una capacidad reusable que el componente no expone:

1. extender la API del componente en este paquete;
2. cubrir la variante en el catalogo ejecutable;
3. agregar o ajustar tests;
4. consumir la nueva prop desde la app.

No resolver una necesidad compartida con un fork local del componente.

## Regla de una sola implementacion

- Un componente tiene un unico archivo de implementacion canonica.
- Los `index.ts` solo reexportan.
- Un componente pertenece a un solo grupo principal.
- Los templates React legacy equivalentes deben delegar en este paquete o quedar deprecados.
- No duplicar logica de tema, storage, loading, validacion o accesibilidad entre componentes.

## Copy visible

- Un concepto visible debe aparecer una sola vez salvo que la repeticion tenga una funcion distinta.
- No repetir el mismo texto como `label` y `placeholder`.
- El placeholder debe aportar formato o ejemplo; si no aporta informacion, se omite.
- No repetir titulo y descripcion con el mismo mensaje.

`npm run test:ui-redundancy` protege las duplicaciones mecanicamente detectables.

## AppShell

`account` y `actions` sirven para controles de cuenta y acciones de la aplicacion. En mobile permanecen montados mientras el drawer se abre y se cierra, por lo que conservan su estado interno durante ese ciclo.

Al cambiar entre desktop y mobile esos slots pueden volver a montarse porque cambian de ubicacion. Si un estado debe sobrevivir al cambio de viewport, mantenerlo controlado fuera del slot y pasar solo el valor y los callbacks necesarios.

No usar `account` o `actions` como dueños del estado global de la aplicacion.

## Primitives externas

Radix puede usarse internamente para comportamiento accesible. Esa dependencia es un detalle interno: la app no debe acoplarse al primitive que usa YiQi.

## CSS

Importar una sola vez:

```tsx
import '@yiqi/ui/styles.css'
```

No copiar `styles.css`, `tokens.css` ni reglas visuales del paquete a la aplicacion.

## Gate minimo

```bash
npm test
npm run build
npm run test:regresion:e2e
```

El criterio bloqueante es regresion funcional, contratos y compilacion. QA visual puede usarse como apoyo, pero no es requisito de aprobacion.
