# Fuentes y artefactos del Design System

Este repositorio es la casa unica del Design System YiQi. La fuente concreta depende del runtime consumidor.

## React / Next.js

Fuente ejecutable:

- `packages/ui/src/**`
- entrypoints publicos de `@yiqi/ui`
- `apps/docs/**` como catalogo ejecutable del mismo contrato

Una aplicacion React consume el paquete. No usa `styles.css`, templates o Markdown para reconstruir un componente que el paquete ya publica.

## HTML / legacy

Fuente visual:

- `styles.css`
- URL publicada: `https://diguardia.github.io/yiqi-imagen/styles.css`
- templates legacy cuando corresponda

Los proyectos HTML consumen la hoja publicada; no copian ni forkean tokens compartidos.

## Documentacion

| Artefacto | Rol |
|---|---|
| `AGENTS.md` | reglas obligatorias para agentes |
| `packages/ui/README.md` | consumo y extension React |
| `docs/react-migration.md` | estrategia de migracion |
| `LEEME-FUENTE-DS.md` | mapa corto de precedencia |
| `yiqi-design.md` / `execution.md` | referencia visual e historica durante la migracion |
| `version.json` | version legacy legible por maquina |

## Catalogos

- `apps/docs`: catalogo ejecutable React.
- `yiqi-design-system.html` y `examples/showcase.html`: catalogo/showcase legacy interno.

Un catalogo demuestra el contrato; no autoriza a copiar una implementacion paralela.

## Frontera con otros repositorios

`diguardia/www.yiqi` no es fuente del Design System. Si necesita UI compartida, debe consumir la superficie apropiada desde este repositorio.
