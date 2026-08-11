# Migración del Design System a React

## Objetivo

YiQi Imagen deja de depender de que cada desarrollador o agente interprete HTML, CSS y Markdown para reconstruir componentes. La nueva dirección es un paquete ejecutable `@yiqi/ui`, consumido por aplicaciones React/Next.js.

La migración es incremental para no romper consumidores existentes. `styles.css`, los templates HTML y el catálogo estático siguen disponibles durante la transición, pero dejan de ser la primera opción para nuevas aplicaciones.

## Arquitectura

```text
yiqi-imagen/
├── packages/
│   └── ui/                 # @yiqi/ui: contratos React + tokens
├── apps/
│   └── docs/               # catálogo ejecutable Next.js
├── template/               # compatibilidad legacy durante migración
├── styles.css              # compatibilidad legacy durante migración
└── AGENTS.md               # reglas cortas para agentes
```

## Principio de precedencia

Cuando dos fuentes difieren, manda este orden:

1. Código y tipos de `@yiqi/ui`.
2. Ejemplos ejecutables de `apps/docs`.
3. CSS y templates legacy.
4. Markdown explicativo.

Un documento `.md` no debe poder cambiar silenciosamente el contrato de un componente.

## Uso de librerías existentes

No se rehacen comportamientos complejos que ya resuelve una librería madura. La primera base elegida es Radix Primitives mediante el paquete `radix-ui`.

Radix se usa para comportamiento y accesibilidad, no para cambiar la identidad visual de YiQi. Los tokens y la representación visual siguen perteneciendo a `@yiqi/ui`.

Casos recomendados para Radix:

- Dialog / drawer
- DropdownMenu
- Tooltip
- Checkbox
- Select
- Popover
- Tabs
- AlertDialog

## Contratos migrados en la primera etapa

- `YiQiProvider`
- `YiQiThemeCycle`
- `YiQiLogo`
- `YiQiButton`
- `YiQiInput`
- `YiQiCheckbox`
- `YiQiLogin`
- `YiQiAppShell`
- `YiQiKpiCard`
- `YiQiRuntimeBanner`
- `YiQiTrustStat`

## Qué queda legacy por ahora

- El catálogo HTML grande y showcase existentes.
- Web Components promocionales existentes.
- Templates de email, porque el email HTML tiene restricciones propias.
- Templates de seguridad/deploy, porque no son componentes visuales React.

Estos elementos no se borran en esta etapa para mantener compatibilidad y permitir revisión visual comparativa.

## Regla para nuevas apps

Una aplicación nueva debe instalar/consumir `@yiqi/ui` y conectar sus props. No debe copiar HTML del catálogo, volver a escribir el login o traducir componentes YiQi a Tailwind.

Tailwind puede seguir usándose para layout o necesidades propias de una aplicación, pero no reemplaza componentes que ya existen en `@yiqi/ui`.

## Estrategia de migración restante

1. Validar visualmente Login y App Shell contra las referencias actuales.
2. Migrar componentes interactivos restantes a React + Radix.
3. Convertir el catálogo estático en páginas del catálogo Next.js.
4. Agregar screenshots automatizados con Playwright.
5. Publicar `@yiqi/ui` con versionado semántico.
6. Migrar una app real como consumidor piloto.
7. Deprecar y finalmente retirar templates HTML equivalentes cuando ya no tengan consumidores.

## Gate de aceptación

Una migración se considera completa cuando:

- la app consume el componente desde `@yiqi/ui`;
- no mantiene una copia visual local del mismo componente;
- TypeScript compila;
- Next.js build finaliza correctamente;
- responsive se valida en desktop y mobile;
- el baseline visual automatizado no presenta diferencias no aprobadas.
