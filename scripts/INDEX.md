# scripts/ - indice

| Script | Comando npm | Que valida |
|---|---|---|
| `check-detail-navigation.js` | `npm run test:detail-navigation` | Navegacion a detalle e ids canonicos |
| `check-consumer-css.js` | `npm run test:consumer-css -- <rutas>` | CSS consumidor e inline styles |
| `check-clases-ds.js` | `npm run test:clases-ds -- <repos>` | Contrato de clases del DS |
| `check-ui-css-isolation.js` | `npm run test:ui-css-isolation` | Namespace CSS, universales globales y atributo de tema React sin contaminar al consumidor |
| `check-ui-redundancy.js` | `npm run test:ui-redundancy` | Implementaciones React y copy de campos duplicados |
| `check-production-audit.js` | `npm run audit:production` | Politica de vulnerabilidades productivas, forma valida del reporte y `via` auditable |
| `serve-static.js` | `npm run test:static-server` | Servidor Node para exports estaticos y politica basica de rutas/MIME |

Ver `README.md` para alcance y criterio de fallo.
