# YiQi Design System — imagen-1

Repositorio de **empaquetado y publicación al CDN** de la hoja de estilos de consumo del
Design System YiQi, más la documentación de componentes y las guías de implementación.

![Version](https://img.shields.io/badge/version-1.2.7-00ccff?style=flat-square)
![Status](https://img.shields.io/badge/status-stable-green?style=flat-square)
![License](https://img.shields.io/badge/license-proprietary-blue?style=flat-square)

> ✅ **Fuente única del DS:** este repositorio **`yiqi-imagen`** (`diguardia/yiqi-imagen`) — ver [`LEEME-FUENTE-DS.md`](./LEEME-FUENTE-DS.md). Acá vive **todo** el Design System: tokens, componentes, catálogo, documentación y templates. Las apps consumen `styles.css` desde el CDN publicado. El catálogo es de uso interno del equipo (no es una página pública).

---

## ¿Por dónde empiezo? (según quién seas)

| Si sos… | Empezá por | Para |
|---------|-----------|------|
| 🧑‍💻 **Desarrollador que consume el DS** | [`docs/quickstart.md`](./docs/quickstart.md) + `styles.css` vía CDN | Incorporar estilos a tu app |
| 🎨 **Quien implementa UI con el DS** | [`yiqi-design.md`](./yiqi-design.md) y [`execution.md`](./execution.md) | Componentes, tokens, patrones, checklist |
| 🧩 **Quien necesita un template** | [`template/INDEX.md`](./template/INDEX.md) | Copiar pantallas o módulos base aprobados |
| 🤖 **Agente de IA / Copilot** | [`Agent/README.md`](./Agent/README.md) → [`Agent/INDEX.md`](./Agent/INDEX.md) | Router de contexto: leer solo lo necesario |
| 🛠️ **Mantenedor del repo** | [`LEEME-FUENTE-DS.md`](./LEEME-FUENTE-DS.md) + [`scripts/INDEX.md`](./scripts/INDEX.md) | Fuente única y publicación |
| 📚 **Buscás un documento puntual** | [`docs/INDEX.md`](./docs/INDEX.md) | Índice de guías técnicas |

---

## Mapa del repositorio

```
yiqi-imagen-1/
├── README.md                     # Este archivo (puerta de entrada)
├── LEEME-FUENTE-DS.md            # ✅ Este repo es la fuente del DS
├── version.json                  # { ds_version: "1.2.7" }
│
├── styles.css                    # ★ Hoja de estilos de consumo (CDN)
├── yiqi-design.md                # ★ Guía maestra de diseño v1.2.7
├── execution.md                  # ★ Guía de ejecución v1.2.7
├── api-docs.html                 # Documentación de API (HTML interactivo)
│
├── Agent/                        # 🤖 Instrucciones para agentes de IA
│   ├── README.md                 #    Entrada corta
│   └── INDEX.md                  #    Router de documentación
│
├── docs/        → docs/INDEX.md       # Guías técnicas para el equipo
├── template/    → template/INDEX.md   # Templates copy/paste para proyectos
├── Fuentes/     → Fuentes/INDEX.md    # Logos, íconos y archivo histórico
├── fixtures/    → fixtures/INDEX.md   # Datos JSON de ejemplo
└── scripts/     → scripts/INDEX.md    # Automatizaciones (test)
```

Cada carpeta tiene su propio `INDEX.md` con una tabla de contenido legible por humanos y agentes.

---

## Archivos principales

| Archivo | Para quién | Propósito |
|---------|-----------|-----------|
| `styles.css` | Desarrollador | Hoja de estilos completa — consumir vía CDN (no copiar) |
| `yiqi-design.md` | IA / Claude | Guía maestra de componentes y patrones v1.2.7 |
| `execution.md` | IA / Claude | Checklist de implementación paso a paso |
| `template/` | Dev / IA | Templates reutilizables por pantalla o módulo |
| `version.json` | CI / scripts | Versión legible por máquina |

---

## Uso rápido

Ver [`docs/quickstart.md`](./docs/quickstart.md).

---

## Templates reutilizables

La carpeta [`template/`](./template/INDEX.md) contiene componentes aprobados para
copiar y pegar en proyectos nuevos o existentes. Un agente debe usar estos
templates como base legitima antes de inventar una pantalla equivalente desde
cero. La adaptacion esperada es conectar datos, rutas, copy del proyecto y
detalles de integracion; no rehacer la estructura visual si el template cubre el
caso de uso.

Los templates copian estructura, no el stylesheet completo. Todo proyecto
consumidor debe cargar:

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">
```

Asi, cualquier mejora futura del DS publicada en este repo puede reflejarse en
los proyectos que conservan las clases canonicas.

Para login Next.js, empezar por [`template/login/README.md`](./template/login/README.md).

Cuando este repo se use para iniciar o guiar otro proyecto, el agente tambien
debe importar el indice de errores de [`Agent/error-memory/errors/INDEX.md`](./Agent/error-memory/errors/INDEX.md)
y solo las categorias relevantes. Eso evita repetir errores conocidos desde la
primera tarea sin copiar logs, secretos ni historial innecesario.

---

## Tokens principales — v1.2.7

### Backgrounds
```css
/* Dark */
--bg: #0c0c0e          /* Superficie base */
--bg-elev: #111114     /* Cards y paneles */
--bg-elev-2: #18181c   /* Modales, dropdowns */
--bg-soft: rgba(255,255,255,.04)

/* Light */
--bg: #f5f4f0
--bg-elev: #eeece7
--bg-elev-2: #e6e4df
--bg-soft: rgba(0,0,0,.04)
```

### Tipografía y semántica
```css
--text: #f0f1f3        /* Texto principal */
--muted: #8a8d94       /* Texto secundario */
--muted-2: #5a5d66     /* Texto terciario */

--cyan:   #00ccff      /* Acento principal */
--green:  #00c48c      /* Success */
--amber:  #f6a623      /* Warning */
--red:    #f25f5c      /* Danger */
--purple: #a78bfa      /* Secundario */
```

### Geometría
```css
--radius: 10px    --radius-sm: 7px    --radius-xs: 5px
--sidebar-w: 240px    --topbar-h: 56px
```

---

## Filosofía borderless

Los elementos de display usan `box-shadow` en lugar de `border`. El único `border` aceptable es en inputs en estado de foco (`--glow`).

```css
/* ✅ Correcto */
box-shadow: 0 0 0 1px var(--border);

/* ❌ Evitar */
border: 1px solid var(--border);
```

---

## Documentación de referencia

Índice completo en [`docs/INDEX.md`](./docs/INDEX.md). Atajos:

| Documento | Contenido |
|-----------|-----------|
| `yiqi-design.md` | Componentes, tokens, patrones, layout |
| `execution.md` | Pasos de implementación, checklist, anti-patrones |
| `docs/yiqi-api.md` | API endpoints y autenticación |
| `docs/yiqi-login.md` | Flujo de login y sesión |
| `docs/application-best-practices.md` | Convenciones de código |
| `docs/azure-nextjs-app-service.md` | Diagnóstico Azure App Service + Next.js |
| `docs/copilot-global-guidelines.md` | Guías para IA/Copilot |
| `docs/pr-checklist.md` | Checklist de Pull Request |
| `docs/testing-jest.md` | Testing cuando Jest está configurado |
| `docs/convenciones-documentacion.md` | Encoding (UTF-8/LF) y estilo documental |

---

## Versionado

```
MAJOR.MINOR.PATCH
1.2.7
│ │ └─ Bug fixes / refinamientos (retrocompatible)
│ └─── Nuevos componentes / features (retrocompatible)
└───── Cambios breaking (requiere migración)
```

| Versión | Estado | Cambios principales |
|---------|--------|-------------------|
| **1.2.7** | ✅ Estable | Sección Aplicaciones (kit de apps), inputs borderless, consolidación fuente única |
| 1.2.6 | 🏛️ | Greycliff CF display, tokens sincronizados con el sitio |
| 1.2.5 | 🏛️ | Tokens corregidos, borderless, toggle 3 estados, yiqi-runtime.js |
| 1.2.4 | 🏛️ Archive | Mobile fix, Phosphor icons, tabla sortable |

---

**Última actualización:** Junio 2026
**Versión DS:** 1.2.7
**Estado:** ✅ Stable
