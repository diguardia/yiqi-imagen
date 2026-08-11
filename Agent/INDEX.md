# Agent/INDEX.md - router de documentacion

Leer solo las filas que correspondan a la tarea.

## Rutas

| Tipo de tarea | Leer | No usar como fuente principal |
|---|---|---|
| UI React / Next.js | `../AGENTS.md`, `../packages/ui/README.md`, exports de `@yiqi/ui` | templates HTML, screenshots, Markdown historico |
| Migracion React | `../docs/react-migration.md`, `../packages/ui/README.md` | recrear componentes desde legacy |
| Login React | `../packages/ui/README.md`, `../docs/yiqi-login.md` | `../template/login/` como implementacion nueva |
| UI HTML / legacy | `../LEEME-FUENTE-DS.md`, `../template/INDEX.md`, `../styles.css` | `@yiqi/ui` si el runtime no es React |
| API | `../docs/yiqi-api.md` | documentacion visual no relacionada |
| Seguridad de API | `../docs/seguridad-integraciones-api.md` | docs visuales |
| Seguridad de aplicaciones | `../docs/seguridad-aplicaciones.md` | docs no relacionadas |
| Errores de usuario | `../docs/politica-errores.md` | logs crudos como copy |
| Dependencias | `../docs/politica-dependencias.md` | guias UI |
| Tests | comandos existentes del repo y docs especificas del runner | agregar frameworks sin necesidad |
| Scripts | `../scripts/README.md` | docs UI |
| PR | `../docs/pr-checklist.md` | docs no relacionadas |
| Encoding / documentacion | `../docs/convenciones-documentacion.md` | docs funcionales |
| Error recurrente | `error-memory/errors/INDEX.md` | leer todo error-memory |
| Reglas del proyecto derivado | `project-rules.md` si existe | asumir restricciones |

## Regla de bootstrap para proyectos derivados

Para una app React nueva:

1. Consumir `@yiqi/ui`.
2. Importar `@yiqi/ui/styles.css` una vez.
3. Importar componentes desde su grupo publico.
4. Conectar props, datos, rutas y callbacks.
5. No copiar JSX/CSS del componente al proyecto.
6. Si falta una capacidad reusable, agregarla a `@yiqi/ui` primero.

Para una app HTML o legacy, usar `styles.css` y el template correspondiente.

## Antes de cerrar

- Ejecutar el checklist adecuado.
- Si se toco UI React, correr `npm run test:ui-redundancy` ademas de los gates normales.
- No actualizar documentacion que no cambie una decision real.
