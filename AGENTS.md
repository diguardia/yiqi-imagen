# Contrato para agentes de YiQi UI

Este archivo define reglas obligatorias para agentes y desarrolladores que modifican o consumen el Design System.

## Precedencia fija

Para una aplicacion React o Next.js, la precedencia es:

1. `packages/ui/src/**` y los tipos publicos de `@yiqi/ui`.
2. `packages/ui/README.md` y `apps/docs/**` como ejemplos ejecutables.
3. `styles.css`, HTML y templates legacy solo para consumidores no React o migraciones.
4. Markdown historico como contexto y razonamiento, nunca como implementacion ejecutable.

Si dos fuentes se contradicen, gana la fuente con mayor precedencia.

## Regla principal: consumir, no reinterpretar

Antes de crear UI, buscar si el componente ya existe en `@yiqi/ui`.

Si existe:

- importarlo desde su entrypoint publico;
- configurar datos, copy, rutas y comportamiento mediante props o children;
- no copiar su JSX a la aplicacion;
- no reconstruirlo con HTML, Tailwind, CSS-in-JS o clases locales;
- no usar screenshots, Markdown o templates como base para rehacerlo;
- no crear una segunda implementacion con otro nombre.

Ejemplo correcto:

```tsx
import { YiQiLogin } from '@yiqi/ui/authentication'

<YiQiLogin appName="Mi app" onSubmit={login} />
```

Ejemplo incorrecto:

```tsx
// No copiar el markup del login ni crear un LoginYiQiLocal equivalente.
```

Si falta una variante reutilizable, primero se extiende `@yiqi/ui`. La app consumidora no debe resolver un hueco compartido con una copia privada.

## Grupos publicos

- `@yiqi/ui/foundation`
- `@yiqi/ui/primitives`
- `@yiqi/ui/authentication`
- `@yiqi/ui/layout`
- `@yiqi/ui/data-display`
- `@yiqi/ui/feedback`

El entrypoint raiz sigue disponible por compatibilidad, pero el codigo nuevo debe preferir el grupo correspondiente.

## Reglas contra redundancia

- Un componente YiQi tiene una sola implementacion canonica.
- Un componente pertenece a un solo grupo principal.
- No duplicar texto visible para explicar el mismo concepto.
- Un input no debe repetir el mismo texto en `label` y `placeholder`.
- No repetir titulo, subtitulo o ayuda si no agrega informacion nueva.
- No mantener dos copias de la misma logica de tema, storage, loading o validacion.
- Un template React equivalente a un componente publicado debe ser un adaptador o quedar deprecado; no otra implementacion.

Ejecutar `npm run test:ui-redundancy` antes de cerrar cambios de UI.

## Legacy

Los templates HTML y `styles.css` siguen siendo validos para consumidores legacy o no React. No se eliminan hasta confirmar que no tienen consumidores.

Para React, un template legacy nunca tiene prioridad sobre `@yiqi/ui`.

## Librerias externas

Dentro de `@yiqi/ui`, usar primitives maduras cuando eviten rehacer comportamiento accesible. Radix es la primera opcion actual para dialog, checkbox, select, tooltip, popover, tabs y patrones similares.

La aplicacion consumidora no debe depender de que primitive interno usa un componente YiQi.

## Convencion de cambios

- Commits nuevos: español ASCII.
- Comentarios de codigo y comentarios de PR nuevos: español ASCII.
- Copy visible al usuario: español correcto, con tildes y puntuacion cuando corresponda.

## Gate minimo

Antes de cerrar un cambio:

```bash
npm test
npm run build
npm run test:e2e
```

El CI agrega audit de dependencias, guards de CSS/clases y checkpoints visuales.
