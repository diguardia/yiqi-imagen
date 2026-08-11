# template/INDEX.md

Catalogo de compatibilidad para templates YiQi.

## Regla de precedencia

Para React/Next.js, buscar primero el equivalente en `@yiqi/ui`. Si existe, importarlo y no copiar el template.

Los templates de esta carpeta quedan para:

- HTML o runtimes no React;
- consumidores legacy;
- migraciones temporales;
- casos sin componente equivalente en `@yiqi/ui`.

## Inventario

| Template | Estado React | Reemplazo preferido |
|---|---|---|
| `login/` | Deprecado como implementacion React | `@yiqi/ui/authentication` -> `YiQiLogin` |
| `app-shell/` | Legacy | `@yiqi/ui/layout` -> `YiQiAppShell` |
| `kpi-card/` | Legacy | `@yiqi/ui/data-display` -> `YiQiKpiCard` |
| `runtime-banner/` | Legacy | `@yiqi/ui/feedback` -> `YiQiRuntimeBanner` |
| `trust/` | Legacy | `@yiqi/ui/data-display` -> `YiQiTrustStat` |
| `analytics-pro-banner/` | Sin migrar | Mantener template actual hasta migracion |
| `email/` | Vigente | HTML email; no aplica React DS |
| `security/` | Vigente | Infraestructura, no componente visual |
| `shared/consume-styles.md` | Legacy | Reglas para consumidor HTML |

Un template que ya tiene reemplazo React no puede volver a crecer con logica propia. Debe delegar en el componente canonico o permanecer solo como referencia legacy.
