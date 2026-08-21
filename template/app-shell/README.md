# App shell legacy template

Este template HTML se conserva para consumidores no React y migraciones.

## React / Next.js

No copiar este HTML. Usar:

```tsx
import { YiQiAppShell } from '@yiqi/ui/layout'
```

La navegacion, cuenta, acciones y contenido se conectan mediante la API publica del componente. Si falta una capacidad compartida, se extiende `YiQiAppShell` en `@yiqi/ui`.

## HTML / legacy

El archivo `html/app-shell.html` sigue siendo valido para runtimes que no pueden consumir React.

Cargar:

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">
<script src="https://diguardia.github.io/yiqi-imagen/yiqi-runtime.js"></script>
```

Mantener clases canonicas y no crear un fork local del stylesheet.

![App shell preview](./assets/app-shell-preview.png)
