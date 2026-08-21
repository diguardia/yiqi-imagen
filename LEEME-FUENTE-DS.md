# Fuente canonica del Design System YiQi

El repositorio `diguardia/yiqi-imagen` es la casa unica del Design System YiQi.

Dentro del repo hay fuentes canonicas distintas segun el tipo de consumidor.

## React / Next.js

La fuente ejecutable es `packages/ui/src/**`, publicada mediante los entrypoints de `@yiqi/ui`.

Orden de precedencia:

1. Codigo y tipos de `@yiqi/ui`.
2. Ejemplos ejecutables de `apps/docs`.
3. CSS y templates legacy.
4. Markdown historico o explicativo.

Una app React no debe reconstruir componentes desde `styles.css`, HTML, screenshots o Markdown si el componente ya existe en `@yiqi/ui`.

## HTML / legacy

`styles.css` sigue siendo la fuente canonica de estilos para consumidores HTML y proyectos que aun no migraron a React. Se publica en:

`https://diguardia.github.io/yiqi-imagen/styles.css`

Los templates legacy permanecen disponibles mientras existan consumidores reales.

## Documentacion

- `AGENTS.md`: reglas obligatorias para agentes.
- `packages/ui/README.md`: consumo React.
- `docs/react-migration.md`: estrategia de migracion.
- `yiqi-design.md` y `execution.md`: referencia visual e historica; no sobreescriben un contrato React existente.
- `version.json`: version del DS legacy legible por maquina.

## Regla de cambio

Si una necesidad es reutilizable entre aplicaciones React, se implementa primero en `@yiqi/ui`. Si solo afecta a un consumidor legacy, se mantiene dentro de la capa legacy correspondiente sin duplicar una implementacion React existente.
