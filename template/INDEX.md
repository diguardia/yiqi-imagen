# template/INDEX.md

Catalogo de compatibilidad para templates YiQi.

## Regla de precedencia

Para React/Next.js, buscar primero el equivalente en `@yiqi/ui`. Si existe, importarlo y no copiar el template.

Que exista un componente React no implica automaticamente paridad completa con todas las variantes legacy. Antes de retirar una capacidad, validar la columna de estado de este inventario.

Los templates de esta carpeta quedan para:

- HTML o runtimes no React;
- consumidores legacy;
- migraciones temporales;
- casos sin componente equivalente en `@yiqi/ui`;
- referencia de capacidades que todavia no tienen paridad React.

## Inventario

| Template | Estado React | Reemplazo preferido |
|---|---|---|
| `login/` | Migrado; template React solo adaptador | `@yiqi/ui/authentication` -> `YiQiLogin` |
| `app-shell/` | Paridad estructural; controles especializados aun se conectan por slots | `@yiqi/ui/layout` -> `YiQiAppShell` |
| `kpi-card/` | Paridad parcial | `@yiqi/ui/data-display` -> `YiQiKpiCard` |
| `runtime-banner/` | Paridad parcial | `@yiqi/ui/feedback` -> `YiQiRuntimeBanner` |
| `trust/` | Paridad parcial | `@yiqi/ui/data-display` -> `YiQiTrustStat` |
| `analytics-pro-banner/` | Sin migrar | Mantener template actual hasta migracion |
| `email/` | Vigente | HTML email; no aplica React DS |
| `security/` | Vigente | Infraestructura, no componente visual |
| `shared/consume-styles.md` | Legacy | Reglas para consumidor HTML |

## Regla anti-regresion durante una migracion

Si una pantalla legacy usa una capacidad que el componente React todavia no expone, no omitirla y no recrearla localmente.

Orden obligatorio:

1. identificar la capacidad faltante;
2. extender el componente canonico en `@yiqi/ui`;
3. agregar una prueba de regresion para esa capacidad;
4. migrar la pantalla consumidora;
5. solo entonces considerar deprecada esa variante legacy.

Ejemplos de paridad todavia incompleta:

- KPI: delta/nota estructurados y comportamiento de count-up del template legacy;
- Trust: delta y variantes de composicion cards/grid/inline;
- Runtime Banner: estados legacy con kicker explicito como demo/error;
- App Shell: account/schema/range/actions deben conservar funcionalidad al conectarse a los slots React.

Un template que ya tiene reemplazo React no puede volver a crecer con logica paralela. Debe servir como compatibilidad o referencia de paridad hasta que la capacidad este cubierta por el componente canonico.
