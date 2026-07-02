# scripts/ — Automatizaciones del repo

Cada script tiene **una sola responsabilidad** y se ejecuta vía su alias en `package.json`.
No editar a mano los archivos que un script genera.

| Script | Comando npm | Responsabilidad | Genera / toca |
|--------|-------------|-----------------|---------------|
| `check-detail-navigation.js` | `npm test` · `npm run test:detail-navigation` | **Guard de calidad.** Escanea código (`.js/.jsx/.ts/.tsx`) buscando rutas de detalle inseguras: `/undefined`, `item.ID`, `dataset.id` sin validar, rutas armadas con campos de negocio. | Nada (solo lee y sale 0/1) |

## Detalle por responsabilidad

### `check-detail-navigation.js` — guard de navegación a detalle
- **Tipo:** verificación / CI. No modifica archivos.
- **Qué hace:** recorre `src`, `app`, `components`, `pages`, `lib`, `services` (y archivos de código en la raíz), ignorando `node_modules`, `docs`, `fixtures`, `Fuentes`, `scripts`. Aplica patrones de riesgo y, si encuentra alguno, imprime archivo:línea + sugerencia y **sale con código 1**.
- **Cuándo correrlo:** antes de cada PR con UI de listados/detalle, y en CI.
- **Si falla:** corregir el mapeo/query para exponer `item.id`; no agregar fallbacks. Ver `docs/yiqi-api.md` (regla fuerte de ids).

## Regla para nuevos scripts
- Una responsabilidad por script; nombre que la describa.
- Si genera archivos, escribir un header "GENERADO — NO editar a mano" y documentarlo acá.
- Exponer un alias en `package.json` y agregar la fila en este README y en `scripts/INDEX.md`.
