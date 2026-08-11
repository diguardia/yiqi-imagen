# @yiqi/ui

Paquete React del Design System YiQi.

La regla de consumo es directa: si un componente existe aqui, la aplicacion lo importa. No copia su JSX, no reconstruye su CSS y no lo vuelve a implementar con otro nombre.

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
        onSubmit={async ({ username, password }) => authenticate(username, password)}
      />
    </YiQiProvider>
  )
}
```

La app consumidora se limita a datos, copy, rutas, callbacks y children expuestos por la API publica.

## Grupos

| Grupo | Import | Responsabilidad |
|---|---|---|
| Foundation | `@yiqi/ui/foundation` | Provider, tema y marca |
| Primitives | `@yiqi/ui/primitives` | Button, Input y Checkbox |
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
npm run test:e2e
```

El CI tambien ejecuta audit de dependencias y guarda checkpoints visuales.
