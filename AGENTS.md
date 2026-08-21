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

## Bootstrap obligatorio de tema en React con SSR

En Next.js u otro runtime con render del lado servidor, importar `YiQiThemeScript` junto con `YiQiProvider`.

```tsx
import { YiQiProvider, YiQiThemeScript } from '@yiqi/ui/foundation'
```

`YiQiThemeScript` va en el `<head>` y el Provider envuelve la aplicacion. No copiar ni recrear la lectura de `yiqi-theme` en cada proyecto.

Esto evita que una preferencia guardada se aplique recien despues de hidratar React.

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

## Regla contra regresiones de paridad

Que exista un componente React no significa que todas las variantes legacy ya tengan paridad.

Antes de migrar una pantalla legacy:

1. revisar `template/INDEX.md`;
2. identificar las capacidades que realmente usa la pantalla;
3. si falta una capacidad en React, extender primero `@yiqi/ui`;
4. agregar una prueba de regresion funcional;
5. no omitir la capacidad y no recrearla localmente.

## Registro obligatorio de regresiones en GitHub

Toda regresion detectada, correccion aplicada o validacion nueva debe quedar registrada directamente en GitHub sobre la rama activa del trabajo.

- No dejar fixes, resultados de pruebas o conclusiones de regresion solamente en chat, notas locales o artefactos temporales.
- Mantener la misma rama y el mismo PR mientras el trabajo siga perteneciendo al mismo alcance, salvo instruccion explicita en contrario.
- Una regresion confirmada debe quedar respaldada por un cambio de codigo o contrato y, cuando sea reproducible, por una prueba o guard que falle sin el fix.
- Despues de validar, actualizar el PR con el head validado, el resultado del gate y cualquier riesgo o deuda que siga pendiente.
- Si cambia el resultado de una validacion anterior, corregir el texto del PR; no conservar cifras o afirmaciones obsoletas.
- No marcar el PR como listo, no habilitar auto-merge y no mergear sin una instruccion explicita.

La conversacion puede resumir el trabajo, pero GitHub es el registro operativo de los cambios y de su validacion.

## Legacy

Los templates HTML y `styles.css` siguen siendo validos para consumidores legacy o no React. No se eliminan hasta confirmar que no tienen consumidores y que la paridad necesaria esta cubierta.

Para React, un template legacy nunca tiene prioridad sobre `@yiqi/ui`.

## Librerias externas

Dentro de `@yiqi/ui`, usar primitives maduras cuando eviten rehacer comportamiento accesible. Radix es la primera opcion actual para dialog, checkbox, select, tooltip, popover, tabs y patrones similares.

La aplicacion consumidora no debe depender de que primitive interno usa un componente YiQi.

## Convencion de cambios

- Commits nuevos: espanol ASCII.
- Comentarios de codigo y comentarios de PR nuevos: espanol ASCII.
- Copy visible al usuario: espanol correcto, con tildes y puntuacion cuando corresponda.

## Gate minimo

Antes de cerrar un cambio:

```bash
npm test
npm run build
npm run test:regresion:e2e
```

El criterio bloqueante es regresion funcional, contratos y compilacion. QA visual o pixel-diff pueden usarse como apoyo, pero no son requisito de aprobacion.
