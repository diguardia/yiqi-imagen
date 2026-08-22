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

Una migracion de un componente se considera completa cuando:

- existe una unica implementacion en `packages/ui/src`;
- el consumidor importa el componente;
- el template React equivalente fue eliminado, deprecado o convertido en adaptador;
- no queda una copia local de JSX/CSS en la app;
- el catalogo ejecutable usa el mismo entrypoint publico que una aplicacion;
- las capacidades funcionales usadas por los consumidores legacy tienen equivalente React o una decision explicita de retiro;
- las pruebas de regresion funcional pasan.

Que exista un componente React base no alcanza para declarar paridad completa.

## Estado actual

Paridad React suficiente para consumo canonico actual:

- Foundation: Provider, ThemeCycle y Logo.
- Primitives: Button, Input y Checkbox.
- Authentication: Login.

Contrato React disponible con paridad todavia parcial respecto de todas las variantes legacy:

- Layout: AppShell. La estructura y drawer estan cubiertos; controles especializados de cuenta/esquema/rango siguen entrando por slots.
- Data display: KpiCard. Falta formalizar capacidades legacy como delta/nota estructurados y count-up cuando sean necesarias.
- Data display: TrustStat. Faltan delta y variantes de composicion cards/grid/inline.
- Feedback: RuntimeBanner. Faltan estados legacy con kicker explicito como demo/error si un consumidor los necesita.

Los componentes estan agrupados fisicamente y tienen entrypoints publicos por responsabilidad.

El catalogo Next.js funciona como portal de documentacion: comparte un shell con navegacion lateral en desktop, rail navegable en mobile, estados de tema y superficies ejecutables para componentes, aplicacion y migracion. La portada usa los mismos componentes publicos para mostrar como se ensamblan dentro de una interfaz YiQi.

Los 14 componentes publicos tienen una ruta estatica individual derivada de su `id` canonico. Cada detalle incluye preview, import y ejemplo copiables, API, variantes, accesibilidad y navegacion anterior/siguiente. El sidebar deriva su estado actual de la URL y mantiene visible el componente activo en desktop.

## Regla anti-regresion de paridad

Si una pantalla legacy usa una capacidad no expuesta por el componente React:

1. no eliminarla;
2. no reconstruirla localmente en la app;
3. extender primero `@yiqi/ui`;
4. agregar una prueba de regresion funcional;
5. migrar la pantalla despues de validar esa capacidad.

El inventario de `template/INDEX.md` indica que reemplazos tienen paridad parcial.

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

Un template legacy solo se considera reemplazado por completo cuando sus capacidades usadas tienen paridad funcional o existe una decision explicita de retiro.

## Proximos pasos

1. Completar la paridad funcional de los componentes React parciales segun demanda real.
2. Migrar los componentes interactivos restantes.
3. Agregar busqueda del catalogo cuando el inventario crezca y lo justifique.
4. Usar una app real como consumidor piloto.
5. Definir publicacion y versionado semantico de `@yiqi/ui`.
6. Retirar legacy solo cuando no tenga consumidores y la paridad necesaria este validada.

## Gate

```bash
npm test
npm run build
npm run test:regresion:e2e
```

La aprobacion se basa en contratos, compilacion y regresion funcional. QA visual o pixel-diff no son requisito de aprobacion.

La deuda legacy detectada se informa por separado para no confundir errores historicos con regresiones nuevas.
