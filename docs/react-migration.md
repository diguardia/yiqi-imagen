# Migracion del Design System a React

## Objetivo

Eliminar la necesidad de reinterpretar HTML, CSS y Markdown en cada proyecto. Para React/Next.js, el contrato pasa a ser un paquete ejecutable: `@yiqi/ui`.

La migracion es incremental para no romper consumidores legacy.

## Arquitectura

```text
yiqi-imagen/
├── packages/ui/          # componentes, tipos, tokens y estilos React
├── apps/docs/            # catalogo ejecutable
├── template/             # compatibilidad legacy
├── styles.css            # contrato CSS legacy
└── AGENTS.md             # reglas obligatorias de consumo
```

## Precedencia

1. `packages/ui/src/**` y tipos publicos.
2. `packages/ui/README.md` y `apps/docs/**`.
3. `styles.css` y templates legacy.
4. Markdown historico.

Un `.md`, screenshot o HTML no puede redefinir un componente React ya publicado.

## Regla de migracion

Una migracion de un componente se considera real cuando:

- existe una unica implementacion en `packages/ui/src`;
- el consumidor importa el componente;
- el template React equivalente fue eliminado, deprecado o convertido en adaptador;
- no queda una copia local de JSX/CSS en la app;
- el catalogo ejecutable usa el mismo entrypoint publico que una aplicacion;
- tests y checkpoints visuales pasan.

## Estado actual

Migrados a contrato React:

- Foundation: Provider, ThemeCycle y Logo.
- Primitives: Button, Input y Checkbox.
- Authentication: Login.
- Layout: AppShell.
- Data display: KpiCard y TrustStat.
- Feedback: RuntimeBanner.

Los componentes estan agrupados fisicamente y tienen entrypoints publicos por responsabilidad.

## Redundancia

La migracion no debe crear una segunda fuente. Cuando aparece un componente React canonico, cualquier template React previo debe dejar de contener logica paralela.

El login legacy React ya no debe mantener su propio formulario, estados, storage, iconos y validaciones: su funcion durante la transicion es delegar en `YiQiLogin`.

`npm run test:ui-redundancy` falla ante componentes YiQi definidos mas de una vez dentro de la superficie React o inputs con el mismo texto literal en `label` y `placeholder`.

## Librerias externas

No rehacer primitives complejos que una libreria madura resuelve mejor. Radix se usa internamente cuando corresponde para accesibilidad y comportamiento.

La API YiQi debe esconder ese detalle para que un cambio de primitive no obligue a modificar apps consumidoras.

## Legacy

Se conserva por ahora:

- catalogo HTML y showcase;
- templates HTML;
- Web Components promocionales;
- email HTML;
- templates de seguridad/deploy.

Se deprecan como fuente para React los templates que ya tienen equivalente en `@yiqi/ui`.

## Proximos pasos

1. Aprobar y congelar baselines visuales del Login y AppShell.
2. Migrar los componentes interactivos restantes.
3. Trasladar gradualmente el showcase util al catalogo Next.js.
4. Usar una app real como consumidor piloto.
5. Definir publicacion y versionado semantico de `@yiqi/ui`.
6. Retirar legacy solo cuando no tenga consumidores.

## Gate

```bash
npm test
npm run build
npm run test:e2e
```

La deuda legacy detectada se informa por separado para no confundir errores historicos con regresiones nuevas.
