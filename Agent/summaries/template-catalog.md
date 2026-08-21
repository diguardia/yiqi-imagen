# Resumen interno: catalogo y templates

Este resumen describe la relacion entre el catalogo ejecutable, `@yiqi/ui` y la capa legacy.

## React

- `packages/ui/src` contiene la implementacion canonica.
- `apps/docs` renderiza los mismos componentes que debe consumir una app.
- El catalogo ayuda a descubrir componentes; no es una fuente para copiar JSX.
- Si un componente ya existe en `@yiqi/ui`, un template equivalente queda legacy y no puede convertirse en una segunda implementacion.

## HTML / legacy

- `styles.css` sigue siendo el contrato visual publicado para consumidores HTML.
- `template/` conserva unidades legacy mientras existan consumidores o hasta completar la migracion.
- No copiar el stylesheet completo a otro proyecto.

## Regla de extraccion

Al migrar una pieza legacy a React:

1. crear una unica API en `@yiqi/ui`;
2. mostrarla en `apps/docs` usando el entrypoint publico;
3. convertir el template React paralelo en adaptador o deprecarlo;
4. agregar tests y guard de regresion;
5. retirar legacy solo cuando no tenga consumidores.

## Riesgos

- documentacion vieja que vuelva a recomendar copy/paste React;
- dos implementaciones del mismo componente;
- estilos compartidos copiados en una app;
- catalogo que use una implementacion distinta de la publicada.

Ver `AGENTS.md`, `packages/ui/README.md` y `docs/react-migration.md` para las reglas vigentes.

Ultima revision: 2026-08-11.
