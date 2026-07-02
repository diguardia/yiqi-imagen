# Fuente del DS vs. catálogo público

Aclara qué es **fuente del Design System** y qué es **catálogo/artefacto consumible**, para
que un proyecto consumidor sepa qué puede usar y qué no debe editar.

## Modelo de fuente (desde 2026-06-11)

- **Fuente canónica:** este repo `diguardia/yiqi-imagen`. Acá se editan tokens, componentes,
  catálogo y documentación del DS. Ver `../LEEME-FUENTE-DS.md`.
- **Sitio `www.yiqi`:** ya **no** aloja el DS (se quitó el 2026-06-11). Si necesita estilos, consume `styles.css` del CDN. No es la fuente.

## Clasificación de artefactos

### Fuente del DS — se edita acá
| Artefacto | Rol |
|-----------|-----|
| `styles.css` | **Fuente única** del DS (tokens + componentes); bundle publicado al CDN — canónico |
| `yiqi-design.md` | Documentación maestra de diseño |
| `yiqi-design-system.html` | Catálogo visual |
| `version.json` | Versión del DS |

### Consumible — lo que usan los proyectos (no editar)
| Artefacto | Uso |
|-----------|-----|
| `https://diguardia.github.io/yiqi-imagen/styles.css` | Hoja de estilos vía CDN (consumir, no copiar) |
| `api-docs.html` | Documentación de API (referencia) |
| `Fuentes/*.svg` (logos/íconos vigentes) | Activos de marca |

### Interno — herramientas y soporte
| Artefacto | Por qué es interno |
|-----------|--------------------|
| `scripts/` | Automatizaciones (guard de tests) |
| `fixtures/` | Datos de ejemplo para desarrollo/test |
| `Agent/` | Instrucciones para agentes, no para consumidores |

## Reglas de frontera

- El DS se **edita en este repo**; es la casa única. `www.yiqi` ya no tiene copias del DS.
- Los proyectos consumen `styles.css` por **CDN**; no copian ni forkean los tokens.
- `styles.css` se publica al CDN desde la raíz de este repo: no mover ese archivo (rompería la URL publicada).

## Estado de `www.yiqi`
- El DS se **quitó** de `www.yiqi` el 2026-06-11 (catálogo, `ds-styles.css`, doc, FAB).
  `content/design-system/_FUENTE-CANONICA.md` quedó como breadcrumb apuntando a `yiqi-imagen`.
