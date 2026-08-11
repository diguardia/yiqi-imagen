# Uso rapido del Design System YiQi

## React / Next.js

La ruta preferida es consumir `@yiqi/ui`.

```tsx
import '@yiqi/ui/styles.css'
import { YiQiProvider } from '@yiqi/ui/foundation'
import { YiQiButton } from '@yiqi/ui/primitives'

export default function Root({ children }) {
  return <YiQiProvider>{children}</YiQiProvider>
}
```

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
npm run test:e2e
```
