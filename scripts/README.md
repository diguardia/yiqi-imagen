# scripts/ — Automatizaciones del repo

Cada script tiene **una sola responsabilidad** y se ejecuta vía su alias en `package.json`.
No editar a mano los archivos que un script genera.

| Script | Comando npm | Responsabilidad | Genera / toca |
|--------|-------------|-----------------|---------------|
| `check-detail-navigation.js` | `npm test` · `npm run test:detail-navigation` | **Guard de calidad.** Escanea código (`.js/.jsx/.ts/.tsx`) buscando rutas de detalle inseguras: `/undefined`, `item.ID`, `dataset.id` sin validar, rutas armadas con campos de negocio. | Nada (solo lee y sale 0/1) |
| `check-consumer-css.js` | `npm run test:consumer-css -- <rutas>` | **Guard de estilos consumidores.** Detecta bloques `<style>`, `cssText` y estilos inline estáticos; acepta valores inline calculados en runtime. Sin argumentos revisa `app`, `src` y `pages`. | Nada (solo lee y sale 0/1) |
| `check-clases-ds.js` | `npm run test:clases-ds -- <repos>` | **Guard de contrato del DS.** Cruza las clases que un repo usa, declara y documenta contra el `styles.css` canónico. Falla si una clase usada no existe en ninguna hoja, o si un `.md` documenta un componente que el CSS no publica. | Nada (solo lee y sale 0/1) |

## Detalle por responsabilidad

### `check-detail-navigation.js` — guard de navegación a detalle
- **Tipo:** verificación / CI. No modifica archivos.
- **Qué hace:** recorre `src`, `app`, `components`, `pages`, `lib`, `services` (y archivos de código en la raíz), ignorando `node_modules`, `docs`, `fixtures`, `Fuentes`, `scripts`. Aplica patrones de riesgo y, si encuentra alguno, imprime archivo:línea + sugerencia y **sale con código 1**.
- **Cuándo correrlo:** antes de cada PR con UI de listados/detalle, y en CI.
- **Si falla:** corregir el mapeo/query para exponer `item.id`; no agregar fallbacks. Ver `docs/yiqi-api.md` (regla fuerte de ids).

### `check-consumer-css.js` — guard de CSS consumidor
- **Tipo:** verificación / CI. No modifica archivos.
- **Qué hace:** revisa HTML y código de UI en las rutas indicadas; rechaza CSS
  embebido y estilos inline estáticos.
- **Cuándo correrlo:** antes de cada PR que modifique una aplicación
  consumidora. Ejemplo: `npm run test:consumer-css -- app src components`.
- **Si falla:** usar una clase publicada en el `styles.css` canónico. Si la
  regla es sólo de comportamiento o integración, moverla a un adaptador `.css`
  pequeño y separado. Conservar inline únicamente el valor calculado.

### `check-clases-ds.js` — guard de contrato del DS
- **Tipo:** verificación / CI. No modifica archivos.
- **Por qué existe:** la auditoría del 11/08/2026 encontró `login-input` y
  `login-spinner` usadas por el componente React del login y definidas en
  ninguna hoja —los campos renderizaban sin estilo—, y `btn-secondary`
  documentada en el catálogo, inexistente en el CSS y usada en un informe que
  se le manda a clientes. La documentación no falla nunca; por eso puede mentir
  durante meses. Un test falla.
- **Qué hace:** para cada repo que le pases, recorre HTML, JSX/TSX, JS y CSS
  (incluidos los bloques `<style>` y el CSS que vive dentro de template
  literals) y clasifica cada clase:

  | Nivel | Tipo | Significa |
  |---|---|---|
  | error | `HUERFANA` | El marcado la pide y no existe en ninguna hoja. Se renderiza sin estilo. |
  | error | `FANTASMA` | Un `.md` la documenta como componente y el CSS canónico no la publica. |
  | aviso | `PISADA` | El DS ya la publica y el repo la redefine igual. Puede divergir sin que nadie se entere. |
  | aviso | `MUERTA` | Declarada y nunca usada. |
  | aviso | `GANCHO` | El código la busca pero ningún CSS la pinta. Normal si es un hook de comportamiento. |

- **Cuándo correrlo:** antes de publicar una versión de `styles.css`, y en el CI
  de cada consumidor.
- **Ejemplo:** `npm run test:clases-ds -- . ../www.yiqi ../mi-cuenta-yiqi --solo-errores`
- **Opciones:** `--ds <archivo>` (otra hoja canónica), `--json` (salida para CI),
  `--solo-errores`, `--sin-fallo` (inventariar sin romper el build).
- **Si falla:** definir la clase en `styles.css` si es un componente del DS, o
  corregir el marcado para usar la clase publicada. No agregar la definición
  suelta en el consumidor: eso convierte el error en una `PISADA`, que es el
  problema siguiente.
- **Falsos positivos:** crear `.ds-lint-ignore` en la raíz del repo consumidor,
  un patrón por línea (glob simple con `*`), `#` para comentarios.


## Regla para nuevos scripts
- Una responsabilidad por script; nombre que la describa.
- Si genera archivos, escribir un header "GENERADO — NO editar a mano" y documentarlo acá.
- Exponer un alias en `package.json` y agregar la fila en este README y en `scripts/INDEX.md`.
