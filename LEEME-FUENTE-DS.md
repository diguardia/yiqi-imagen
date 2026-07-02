# Fuente del Design System: este repo (`yiqi-imagen`)

**Fuente canónica del DS:** este repositorio **`yiqi-imagen`** (`diguardia/yiqi-imagen`).
A partir del **2026-06-11**, las actualizaciones del Design System (tokens, componentes,
catálogo, documentación, templates) se hacen **acá**. Es la casa única del DS.

Archivos canónicos en este repo:
- `styles.css` — **fuente única** del DS (tokens + componentes); el catálogo la usa y se publica al CDN.
- `yiqi-design.md` — documentación maestra de diseño.
- `yiqi-design-system.html` — catálogo visual.
- `version.json` — versión legible por máquina.

## Consumo

Las apps consumen el bundle publicado al CDN:
`https://diguardia.github.io/yiqi-imagen/styles.css`

El **catálogo** (`yiqi-design-system.html`) es de uso **interno del equipo**, no una página pública.

## Relación con `www.yiqi`

`www.yiqi` (el sitio) ya **no** aloja el DS: el 2026-06-11 se quitaron de ese repo el catálogo,
`ds-styles.css`, la documentación y el FAB. Si necesita estilos, consume `styles.css` del CDN
como cualquier app.

_Cambio de fuente definido el 2026-06-11: `yiqi-imagen` pasa a ser la fuente del DS._
