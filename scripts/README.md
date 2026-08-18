# scripts/ - automatizaciones del repo

Cada script tiene una responsabilidad concreta y un alias en `package.json`.

| Script | Comando | Responsabilidad |
|---|---|---|
| `check-detail-navigation.js` | `npm run test:detail-navigation` | Detecta navegacion de detalle armada con ids inseguros o legacy |
| `check-consumer-css.js` | `npm run test:consumer-css -- <rutas>` | Impide CSS visual embebido y estilos inline estaticos en consumidores |
| `check-clases-ds.js` | `npm run test:clases-ds -- <repos>` | Cruza clases usadas, declaradas y documentadas contra el contrato CSS |
| `check-ui-css-isolation.js` | `npm run test:ui-css-isolation` | Impide selectores universales globales, variables CSS sin namespace y el atributo generico `data-theme` dentro del paquete React |
| `check-ui-redundancy.js` | `npm run test:ui-redundancy` | Detecta componentes YiQi definidos mas de una vez y label/placeholder literales duplicados |
| `check-production-audit.js` | `npm run audit:production` | Audita dependencias productivas y permite solo advisories upstream explicitamente enumerados; falla tambien si npm audit devuelve error o un reporte incompleto |

## check-ui-redundancy.js

Este guard protege errores que suelen aparecer cuando una pantalla se replica manualmente:

- dos implementaciones exportadas con el mismo nombre `YiQi*` dentro de la superficie React;
- un `YiQiInput` con el mismo texto literal en `label` y `placeholder`.

No intenta decidir si dos frases diferentes son semanticamente redundantes. Esa parte sigue requiriendo revision de copy y QA visual.

Si falla, no se agrega una excepcion para conservar la duplicacion. Se elimina la segunda implementacion o se corrige el copy.

## Aislamiento CSS React

`npm run test:ui-css-isolation` exige namespace `--yiqi-*`, evita el selector universal global y reserva `data-yiqi-theme` para el tema React. El paquete no debe seleccionar ni depender de `data-theme`, porque ese atributo puede pertenecer a la aplicacion consumidora.

## Audit productivo

`npm run audit:production` ejecuta la politica de excepciones de seguridad del repo. Un resultado de `npm audit` solo es aceptable si contiene un mapa `vulnerabilities` valido; errores de red, respuestas de error o JSON con forma inesperada hacen fallar el gate en lugar de interpretarse como cero vulnerabilidades.

`npm run test:production-audit-policy` ejecuta el self-test sin red del parser y queda incluido en `npm test` para impedir que esa validacion vuelva a aceptar silenciosamente reportes incompletos.

## Contrato CSS legacy

`check-clases-ds.js` sigue siendo util para inventariar deuda legacy. En la rama React se separan dos usos:

- `test:clases-ds:react`: bloqueante para `packages/ui`;
- `test:clases-ds:legacy`: inventario visible, sin bloquear deuda preexistente.

## Regla para nuevos scripts

- Una responsabilidad por script.
- Sin modificar archivos salvo que el nombre y la documentacion indiquen que es un generador.
- Exponer alias en `package.json`.
- Agregar una fila en este README y `scripts/INDEX.md`.
- Comentarios nuevos en español ASCII.
