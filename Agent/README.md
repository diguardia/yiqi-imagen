# Agent/ - entrada para agentes

Este directorio enruta contexto. Las reglas obligatorias de implementacion viven en `../AGENTS.md` y no se duplican aqui.

## Orden obligatorio

1. Leer `../AGENTS.md`.
2. Clasificar la tarea.
3. Abrir solo la ruta necesaria de `INDEX.md`.
4. Aplicar el checklist correspondiente antes de cerrar.

## Regla para UI

Para React o Next.js, el agente debe consultar primero `../packages/ui/README.md` y los exports de `@yiqi/ui`.

Si el componente existe, se importa. No se usa un template, screenshot, catalogo HTML o Markdown para recrearlo.

Los templates de `../template/` quedan reservados para HTML/legacy o para casos donde `@yiqi/ui` no pueda ser consumido.

## Contexto minimo

No cargar toda la documentacion por defecto. Usar `INDEX.md` para encontrar solo las fuentes que cambian una decision de la tarea.

## Cierre

Informar que comandos o checklist se ejecutaron y que riesgo queda sin verificar. No almacenar secretos, credenciales, tokens, passwords ni logs sensibles como memoria de agente.
