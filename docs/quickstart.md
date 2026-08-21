# Uso rapido del Design System YiQi

## React / Next.js

La ruta preferida es consumir `@yiqi/ui`.

```tsx
import '@yiqi/ui/styles.css'
import { YiQiProvider, YiQiThemeScript } from '@yiqi/ui/foundation'

export default function RootLayout({ children }) {
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

`YiQiThemeScript` aplica la preferencia `yiqi-theme` antes de hidratar React. El runtime usa `data-yiqi-theme` y no modifica el atributo generico `data-theme` del consumidor. No recrear esa logica localmente.

Para componentes y reglas de extension, ver `../packages/ui/README.md`.

Regla: si un componente existe en el paquete, importarlo. No copiar su implementacion ni recrearla con HTML/Tailwind/CSS local.

## HTML / legacy

Si el proyecto no usa React, consumir la hoja publicada:

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">
```

No copiar el stylesheet completo al proyecto.

## CSS local

En consumidores React, el CSS visual compartido pertenece a `@yiqi/ui`. El CSS local se limita a necesidades propias de la aplicacion que no forman parte de un componente reusable.

Los estilos inline se reservan para valores calculados en runtime:

```tsx
<div className="load-progress-fill" style={{ width: `${progress}%` }} />
```

Una constante visual debe resolverse con la API del componente o dentro del Design System, no mediante un override privado.

## Antes de cerrar

Para cambios de UI en este repo:

```bash
npm test
npm run build
npm run test:regresion:e2e
```
