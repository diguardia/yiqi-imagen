# PR Checklist - YiQi

Checklist base de Pull Request. Para checklists enfocados según el tipo de cambio,
ver `docs/checklists-por-intencion.md`.

## Calidad técnica

- [ ] Build exitoso
- [ ] Lint sin errores criticos
- [ ] Tests relevantes agregados/actualizados con el runner configurado
- [ ] Comandos de verificacion declarados en el proyecto ejecutados correctamente
- [ ] Revisión de regresiones realizada: flujos existentes afectados, contratos, rutas, estados vacíos y errores.
- [ ] Si el proyecto usa hooks, pre-commit ejecutado correctamente; si no usa hooks, evaluar Husky/lint-staged o equivalente para proyectos activos.
- [ ] Checklist de cierre aplicado segun el tipo de tarea; si no existia uno adecuado, se creo un checklist puntual.
- [ ] Resumen interno en `Agent/summaries/` creado o actualizado si el cambio toca una pagina, flujo, componente o tema recurrente.
- [ ] Reglas operativas del proyecto revisadas si hay schema, entorno, credenciales, API real o acciones con aprobacion requerida.
- [ ] Error memory actualizado si hubo una falla repetible o una suposicion incorrecta.
- [ ] El resumen al usuario indica en lenguaje simple que se verifico, que riesgo queda y que no se pudo verificar.

## Gate de seguridad

- [ ] Controles `SEC-APP` aplicables revisados según `docs/seguridad-aplicaciones.md`, con evidencia o justificación de no aplicabilidad.
- [ ] SAST, análisis de dependencias y detección de secretos ejecutados en este PR.
- [ ] No hay hallazgos críticos abiertos; un hallazgo crítico bloquea merge y deploy.
- [ ] Los hallazgos altos están resueltos o tienen una excepción formal vigente con responsable, justificación, mitigación y vencimiento.
- [ ] Los falsos positivos están documentados con alcance y evidencia, sin silenciamientos globales.
- [ ] La revisión automática fue complementada con revisión humana y pruebas negativas de los flujos sensibles modificados.

## API

- [ ] Contratos OpenAPI respetados
- [ ] Errores HTTP manejados
- [ ] Normalizacion de payloads aplicada
- [ ] Navegacion a detalle usa `item.id` documentado en fixture/OpenAPI, sin `ID` ni fallbacks de nombres alternativos

## UI/UX

- [ ] Tokens YiQi usados (sin hardcode innecesario)
- [ ] Tipografia y estilo alineados
- [ ] Responsive <= 980px validado
- [ ] Copy en espanol neutro
- [ ] Listados navegan con click en fila; botones secundarios cortan propagacion del click

## Indicadores y datos

- [ ] Cada KPI visible declara fuente validable (modulo + campo(s) + agregado/formula + periodo)
- [ ] KPIs derivados explican formula y unidad de calculo
- [ ] Indicadores de cuenta explican composicion (incluye/excluye)
- [ ] Estados "No disponible" o "Dato de ejemplo" informados cuando no hay fuente real
- [ ] Cambio de payload con impacto en KPIs incluye mapeo + tests + documentacion actualizada

## Mantenibilidad

- [ ] Tipos/interfaces claros
- [ ] Sin duplicacion evitable
- [ ] Documentacion actualizada si aplica
- [ ] `npm run test:detail-navigation` ejecutado si hay UI con listados o detalle
- [ ] El cambio está separado en commits pequeños por intención; no mezclar cambios no relacionados.
- [ ] La rama y los commits describen el trabajo, sin nombres de agentes ni coautores artificiales.

## Deploy Azure + Next.js

- [ ] Si aplica Azure App Service + Next.js: artifact incluye `.next/BUILD_ID`.
- [ ] Si se usa `actions/upload-artifact@v4`: `include-hidden-files: true` y exclusiones explícitas de `.git`, `.git/**`, `.env`, `.env.*`.
- [ ] Si aplica Next.js 16 en Azure: `next build --webpack` en build y fallback, con log `Production build not found. Running next build --webpack before start...`.
- [ ] Carpetas generadas (`.next`, `deploy`, coverage, perfiles temporales de QA) no contaminan lint/test ni el paquete final salvo que sean requeridas.
