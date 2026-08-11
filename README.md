# YiQi Design System

Repositorio canonico del Design System YiQi.

Este repo contiene dos superficies de consumo distintas:

- `@yiqi/ui`: contrato ejecutable para aplicaciones React y Next.js.
- `styles.css` + templates legacy: compatibilidad para HTML, consumidores antiguos y migraciones.

No son dos fuentes equivalentes. Para React, manda `@yiqi/ui`.

## Por donde empezar

| Caso | Fuente |
|---|---|
| App React / Next.js | `packages/ui/README.md` |
| Catalogo ejecutable React | `apps/docs/` |
| Agente o Copilot | `AGENTS.md` y luego `Agent/INDEX.md` |
| HTML o consumidor legacy | `styles.css` y `template/INDEX.md` |
| Arquitectura de migracion | `docs/react-migration.md` |
| Guia funcional de login | `docs/yiqi-login.md` |
| Scripts y guards | `scripts/README.md` |

## Regla de consumo React

Si el componente existe en `@yiqi/ui`, se importa. No se copia su implementacion y no se reconstruye a partir de un screenshot, template, HTML o documento.

```tsx
import '@yiqi/ui/styles.css'
import { YiQiProvider } from '@yiqi/ui/foundation'
import { YiQiLogin } from '@yiqi/ui/authentication'

export default function LoginPage() {
  return (
    <YiQiProvider>
      <YiQiLogin appName="Mi app" onSubmit={async (input) => login(input)} />
    </YiQiProvider>
  )
}
```

La aplicacion aporta integracion, datos, rutas y copy mediante la API publica del componente. La estructura visual compartida pertenece al paquete.

## Regla de consumo legacy

Para HTML o proyectos que todavia no pueden consumir React:

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">
```

Los templates legacy se conservan para compatibilidad. No deben usarse para volver a implementar en React un componente que ya existe en `@yiqi/ui`.

## Estructura principal

```text
yiqi-imagen/
├── packages/ui/          # @yiqi/ui, contrato React
├── apps/docs/            # catalogo ejecutable
├── docs/                 # guias y politicas
├── Agent/                # router de contexto para agentes
├── template/             # compatibilidad legacy
├── scripts/              # guards y automatizaciones
├── styles.css            # contrato CSS legacy publicado al CDN
├── AGENTS.md             # reglas obligatorias para agentes
└── LEEME-FUENTE-DS.md    # mapa de fuentes canonicas
```

## Principio de una sola implementacion

- Un componente React compartido vive una sola vez en `packages/ui/src`.
- Los entrypoints agrupados solo reexportan; no mantienen copias.
- Un template React equivalente debe ser un adaptador de compatibilidad, no otra implementacion.
- Los documentos describen el contrato; no duplican JSX ni CSS salvo ejemplos minimos necesarios.
- Si falta una variante reusable, se agrega primero a `@yiqi/ui`.

## Calidad

La rama React valida automaticamente:

```bash
npm test
npm run build
npm run test:e2e
```

Los gates incluyen TypeScript, CSS consumidor, contrato de clases, redundancia UI, smoke tests, responsive, login, App Shell y checkpoints visuales.

## Documentacion

- `packages/ui/README.md`: API y reglas de consumo React.
- `docs/react-migration.md`: estrategia y estado de migracion.
- `docs/INDEX.md`: indice tecnico.
- `Agent/INDEX.md`: router para agentes.
- `template/INDEX.md`: inventario legacy y reemplazos React.
- `yiqi-design.md` y `execution.md`: referencia historica/visual durante la migracion. No pueden sobreescribir el contrato React.

## Versionado

El paquete React usa su propio `package.json`. Antes de publicarlo fuera del workspace se debe definir versionado semantico y politica de release. Hasta entonces, el workspace es la fuente de consumo para las apps de este repositorio.
