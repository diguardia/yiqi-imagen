# PR Checklist - YiQi

Usar junto con `docs/checklists-por-intencion.md` cuando aplique.

## Calidad tecnica

- [ ] Build exitoso.
- [ ] Tests relevantes ejecutados.
- [ ] Regresiones de flujos, rutas, estados y responsive revisadas.
- [ ] Cambios separados por intencion.
- [ ] Commits y comentarios nuevos en español ASCII.
- [ ] Documentacion actualizada solo donde cambia una decision real.

## UI React / Next.js

- [ ] Se busco primero el componente en `@yiqi/ui`.
- [ ] Si existe, se importa desde su entrypoint publico y no hay copia local equivalente.
- [ ] La app no reconstruye el componente desde template, screenshot, HTML, Tailwind o Markdown.
- [ ] Si faltaba una variante reusable, se agrego primero a `@yiqi/ui`.
- [ ] `@yiqi/ui/styles.css` se importa una sola vez donde corresponda.
- [ ] No hay CSS visual compartido duplicado en el consumidor.
- [ ] No hay textos visibles redundantes sin funcion distinta.
- [ ] Ningun input repite exactamente el mismo texto en label y placeholder.
- [ ] `npm run test:ui-redundancy` pasa.
- [ ] `npm run test:consumer-css:react` pasa cuando se toca la superficie React del DS.
- [ ] Responsive y accesibilidad de los flujos afectados fueron validados.
- [ ] Checkpoints visuales fueron revisados si cambia presentacion.

## UI HTML / legacy

- [ ] El consumidor usa `styles.css` publicado y no una copia local completa.
- [ ] No se agrego una segunda implementacion React en un template legacy.
- [ ] Si ya existe reemplazo en `@yiqi/ui`, el template se mantiene congelado, adaptador o deprecado.

## API

- [ ] Contratos documentados respetados.
- [ ] Navegacion a detalle usa el id canonico.
- [ ] Errores HTTP y normalizacion de payloads revisados.
- [ ] No se agregaron fallbacks ambiguos para ocultar contratos incorrectos.

## Auth y seguridad

- [ ] Sin secretos, passwords, tokens ni credenciales hardcodeadas o versionadas.
- [ ] Controles aplicables de `docs/seguridad-aplicaciones.md` revisados.
- [ ] Dependencias auditadas segun la politica del proyecto.
- [ ] Login real completa el flujo funcional documentado en `docs/yiqi-login.md`.
- [ ] Passwords y secretos no quedan en storage inseguro.
- [ ] Logout limpia el contexto de sesion correspondiente.

## Datos e indicadores

- [ ] Cada KPI real tiene fuente, formula/agregado y periodo identificables.
- [ ] Datos simulados se muestran como ejemplo o no disponibles.
- [ ] Cambios de payload con impacto visual incluyen mapeo y pruebas.

## Mantenibilidad

- [ ] Sin implementaciones duplicadas del mismo componente.
- [ ] Sin logica repetida de tema, storage, loading o validacion cuando puede tener una unica fuente.
- [ ] Tipos e interfaces publicas son claras.
- [ ] El catalogo ejecutable consume el mismo entrypoint que una app real.
- [ ] Un template React equivalente delega en el componente canonico o esta deprecado.

## Cierre

- [ ] `npm test` pasa.
- [ ] `npm run build` pasa.
- [ ] `npm run test:e2e` pasa cuando aplica a la rama/proyecto.
- [ ] Se informaron riesgos o deuda legacy que siguen fuera del alcance del cambio.
