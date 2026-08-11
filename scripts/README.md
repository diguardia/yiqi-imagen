# scripts/ - automatizaciones del repo

Cada script tiene una responsabilidad concreta y un alias en `package.json`.

| Script | Comando | Responsabilidad |
|---|---|---|
| `check-detail-navigation.js` | `npm run test:detail-navigation` | Detecta navegacion de detalle armada con ids inseguros o legacy |
| `check-consumer-css.js` | `npm run test:consumer-css -- <rutas>` | Impide CSS visual embebido y estilos inline estaticos en consumidores |
| `check-clases-ds.js` | `npm run test:clases-ds -- <repos>` | Cruza clases usadas, declaradas y documentadas contra el contrato CSS |
| `check-ui-redundancy.js` | `npm run test:ui-redundancy` | Detecta componentes YiQi definidos mas de una vez y label/placeholder literales duplicados |

## check-ui-redundancy.js

Este guard protege errores que suelen aparecer cuando una pantalla se replica manualmente:

- dos implementaciones exportadas con el mismo nombre `YiQi*` dentro de la superficie React;
- un `YiQiInput` con el mismo texto literal en `label` y `placeholder`.

No intenta decidir si dos frases diferentes son semanticamente redundantes. Esa parte sigue requiriendo revision de copy y QA visual.

Si falla, no se agrega una excepcion para conservar la duplicacion. Se elimina la segunda implementacion o se corrige el copy.

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
