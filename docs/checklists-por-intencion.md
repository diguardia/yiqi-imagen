# Checklists por intención de cambio

Antes de implementar, **clasificá la intención** del cambio y seguí solo el checklist
correspondiente. Esto evita revisar todo en cada PR. El `docs/pr-checklist.md` es la base
transversal; estos son los focos por caso.

Regla obligatoria de cierre:

Esta regla aplica principalmente a proyectos derivados, apps y desarrollos que usen esta
documentacion como base. En este repo de empaquetado del DS, aplicarla cuando la tarea
tenga impacto equivalente o agregue conocimiento reutilizable.

- El agente debe indicar que checklist uso. Si no uso ninguno, debe explicar por que
  la tarea era trivial, local o sin riesgo de regresion.
- Al final de cada tarea, elegir el checklist que corresponda segun el tema.
- Si ningun checklist aplica, crear un checklist breve para esa tarea concreta.
- Revisar errores, regresiones, verificaciones y documentacion antes de cerrar.
- Si la tarea toca una pagina, flujo, grupo de componentes o tema relevante, crear o actualizar un resumen interno en `Agent/summaries/`.
- Informar al usuario en lenguaje simple que checklist se uso, que se verifico y que queda pendiente.
- Escribir nuevos checklists operativos en ASCII para evitar problemas de lectura por agentes y personas.

Cuando usar un checklist:

- Cuando cambia comportamiento, UI, API, datos, deploy, auth, scripts, dependencias o documentacion operativa.
- Cuando puede haber regresion visible o tecnica.
- Cuando hubo un error, una suposicion incorrecta o una verificacion fallida.
- Cuando la tarea crea conocimiento reutilizable para futuros agentes.

Cuando no usar checklist completo:

- Typos o copy menor en un archivo nombrado por el usuario.
- Cambios mecanicos de una sola linea sin impacto en comportamiento.
- Lectura o analisis sin cambios. En ese caso, informar que no hubo checklist de cierre porque no se modifico nada.

## 1. Cambio trivial (typo, copy, 1 línea en archivo ya nombrado)
- [ ] El cambio es realmente acotado (no toca lógica ni contratos).
- [ ] Sin necesidad de leer documentación de fondo.
- [ ] Build/lint no se rompen.
- [ ] El commit queda aislado del resto de cambios no relacionados.

## 2. Nueva UI de listado / detalle
- [ ] Navegación a detalle con `item.id` (ver `docs/yiqi-api.md`).
- [ ] Click en fila navega; botones secundarios cortan propagación.
- [ ] `npm run test:detail-navigation` pasa.
- [ ] E2E que hace click en fila y verifica la URL final.
- [ ] Estados vacíos / "Dato de ejemplo" cuando no hay fuente real.
- [ ] Revisión de regresión sobre navegación existente, filtros, paginado, loading/error y responsive.

## 3. Consumir un endpoint nuevo de la API YiQi
- [ ] Documentado: qué devuelve, qué ids aporta, qué campos consume, si requiere `schemaId`/`userId`.
- [ ] Mapeo payload remoto -> modelo interno -> DTO de UI.
- [ ] Manejo de `401/403/409/5xx` (ver `docs/politica-errores.md`).
- [ ] Seguridad: sin secretos en código, contexto desde login (ver `docs/seguridad-integraciones-api.md`).
- [ ] Fixture de referencia actualizado si aplica (ver `docs/politica-fixtures.md`).
- [ ] Revisión de regresión sobre endpoints ya consumidos, autenticación, schemaId/userId y normalización existente.

## 4. Cambios de estilos / tokens / componentes del DS
- [ ] El cambio del DS se hace **acá** (`yiqi-imagen` es la fuente única; ver `LEEME-FUENTE-DS.md`).
- [ ] `styles.css` es canónico en este repo (fuente única de tokens + componentes): se edita acá (no se regenera desde otro lado).
- [ ] `version.json` coherente con la versión del DS.
- [ ] Tokens YiQi usados; filosofía borderless respetada.
- [ ] Revisión de regresión visual en componentes existentes y temas dark/light.

## 5. KPIs / indicadores
- [ ] Cada KPI declara fuente validable (módulo + campo(s) + fórmula + período).
- [ ] KPIs derivados explican fórmula y unidad.
- [ ] Cambio de payload con impacto en KPIs: mapeo + tests + doc.

## 6. Deploy (Azure App Service + Next.js)
- [ ] Artifact incluye `.next/BUILD_ID`.
- [ ] `actions/upload-artifact@v4` con `include-hidden-files: true` y exclusiones de `.git`/`.env`.
- [ ] Next.js 16: `next build --webpack` en build y fallback.
- [ ] El paquete de deploy no incluye carpetas generadas innecesarias, caches, perfiles temporales ni `node_modules` si no corresponde.

## 7. Solo documentación
- [ ] Encoding UTF-8 / LF (ver `docs/convenciones-documentacion.md`).
- [ ] Español neutro; marca escrita **YiQi**.
- [ ] Índices actualizados si se agregó/quitó un archivo (`docs/INDEX.md`, etc.).

## 8. Herramientas y automatizaciones
- [ ] En proyectos derivados o activos, si el cambio repara un problema repetible, evaluar crear o actualizar una herramienta en `scripts/` o `Agent/tools/`.
- [ ] Si la herramienta falla, corregir la herramienta o documentar el caso no cubierto; no dejar el procedimiento roto.
- [ ] Documentar objetivo, entrada, salida, riesgos y ejemplo de uso.
- [ ] Carpetas generadas por herramientas o QA visual quedan ignoradas por Git y excluidas de lint/test cuando no son fuente.

## 9. Higiene de commits y ramas
- [ ] Un commit por intención de cambio; evitar commits gigantes con cambios mezclados.
- [ ] La rama describe el trabajo, sin nombres de agentes.
- [ ] No agregar agentes como coautores salvo pedido explícito del equipo.
- [ ] En proyectos activos, recomendar Husky/lint-staged o equivalente para bloquear commits con lint/test/formato roto.

## 10. Checklist puntual de tarea
- [ ] Si la tarea no encaja en los checklists anteriores, se creo un checklist breve para esta tarea.
- [ ] El checklist puntual cubre objetivo, archivos tocados, regresiones posibles, comandos de verificacion y riesgos.
- [ ] El resultado del checklist fue informado al usuario en lenguaje simple.

## 11. Resumen interno por pagina o tema
- [ ] En proyectos derivados o apps activas, si la tarea toca una pagina, flujo, grupo de componentes o tema relevante, existe un resumen interno en `Agent/summaries/`.
- [ ] El resumen indica objetivo, archivos principales, contratos, decisiones, riesgos y verificaciones utiles.
- [ ] El resumen fue actualizado si el cambio modifico comportamiento, estructura, contrato o criterio de revision.
- [ ] El resumen esta escrito para lectura rapida y en ASCII.

## 12. Reglas operativas del proyecto
- [ ] En proyectos derivados, existe `Agent/project-rules.md` si hay restricciones de schema, entorno, credenciales, API o acciones que requieren aprobacion.
- [ ] Las reglas operativas no contienen secretos, tokens, passwords ni datos productivos.
- [ ] Antes de consultar APIs reales, se revisaron los limites de schema, entorno y safe probes del proyecto.

## 13. Error memory
- [ ] Si hubo un error repetible o una suposicion incorrecta, se reviso `Agent/error-memory/errors/INDEX.md`.
- [ ] Si se registro un error, se guardo causa raiz y fix final, no logs crudos.
- [ ] Si existe memoria legacy, se migro solo la entrada util al archivo de categoria correspondiente.
