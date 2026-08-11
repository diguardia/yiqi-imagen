# YiQi Design System — Master Recipe + Prompt v1.2.7.6

La fuente de verdad del estilo es `styles.css`, publicado en
`https://diguardia.github.io/yiqi-imagen/styles.css`. Este documento **no la
reemplaza ni la resume**: es la receta para consumirla en:
- Generación de UI con IA
- Implementación manual
- Estandarización cross-producto

**Ante cualquier diferencia entre este documento y `styles.css`, manda la hoja.**

---

## 0 · Modo de uso

Este documento es ejecutable. Cumple 3 funciones:

1. Design System (tokens, componentes, reglas)
2. Receta estructural (qué construir)
3. Prompt operativo (cómo generarlo con IA)

**Regla:** no inventar estilos fuera de lo que publica `styles.css`. Este
documento define qué construir y con qué piezas; los valores los define la hoja.

---

## 1 · Prompt Maestro (usar directamente con IA)

Vas a actuar como un experto en UI implementando estrictamente el YiQi Design System v1.2.7.

**Contexto obligatorio:**
- La fuente de verdad del estilo es `styles.css` del CDN; este documento es la receta
- No inferir estilos fuera de lo que la hoja publica
- Logo YiQi siempre SVG inline (nunca `<img>`)

**Objetivo:** generar un HTML interactivo autocontenido siguiendo esta receta y el DS.

**Reglas estrictas:**
- Solo usar variables CSS (no colores hardcodeados)
- Tipografía: Plus Jakarta Sans (`--display`) → títulos · Inter (`--sans`) → UI · IBM Plex Mono (`--mono`) → datos
- Spacing múltiplos de 4
- **Filosofía borderless:** cards, panels, KPIs, badges y tags sin `border` — profundidad solo con `box-shadow: var(--shadow-sm)`
- **Excepción borderless:** inputs, selects, textareas y checkboxes sí llevan `border: 1px solid var(--line)`
- **Fondo sin grilla** — solo 2 radiales cyan + `var(--bg)`. Sin `background-size` de grid
- `data-theme="system"` en `<html>` — nunca "dark" ni "light" hardcodeado
- Toggle 3 pasos: Oscuro / Sistema / Claro — usar `setTheme(v)`, no `toggleTheme()`
- Responsive obligatorio (≤ 980px)
- Todo KPI visible debe declarar origen validable: modulo + campo(s) + agregado/formula + periodo
- Si un KPI es derivado o una cuenta compuesta, la ayuda contextual debe explicar formula/composicion en lenguaje funcional
- Si no hay fuente real disponible, el KPI debe mostrarse como "No disponible" o "Dato de ejemplo" (nunca como real)

**Output:**
- 1 archivo HTML completo con `<head>` incluido
- Sin errores · Sin dependencias rotas
- No explicar nada · No texto fuera del HTML

---

## 2 · Receta estructural (Informe estándar)

**Layout base:**
- Topbar sticky (56px)
- Sidebar con navegación (240px)
- Contenido principal centrado · max-width: 1100px

**Secciones obligatorias:**
1. Contexto
2. Resumen (KPIs)
3. Distribución (donut charts)
4. Histórico (línea 12 meses)
5. Análisis (insights + embeds)
6. Detalle (tabla)

**Componentes obligatorios:**

Topbar:
- Logo YiQi (SVG inline)
- Cliente + Período
- Toggle 3 pasos (Oscuro / Sistema / Claro)
- CTA: "Reserva tu demo"

Sidebar:
- Scroll-spy
- Navegación por secciones

KPI cards (borderless — box-shadow únicamente):
- accent-cyan · accent-green · accent-amber · accent-muted
- cada card KPI debe incluir linea de fuente o ayuda contextual auditable

Charts: Chart.js con colores desde CSS vars

Tabla: sortable + filtrable + estado vacío

---

## 3 · Contrato de datos

Excel requerido. Columnas obligatorias:

| Columna | Tipo |
|---|---|
| titulo | string |
| sprint | YYYYMM |
| BL | string |
| sector | string |
| tipo | bug \| mejora \| soporte |
| estado | creado \| en_progreso \| resuelto |
| esfuerzo | number |

Opcionales: prioridad · responsable · fecha_creacion · fecha_cierre

---

## 4 · Core JS obligatorio

```js
/* ── Theme system DS v1.2.7.6 ── */
function resolveTheme() {
  const s = localStorage.getItem('yiqi-theme') || 'system';
  return s === 'system'
    ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : s;
}
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  const s = localStorage.getItem('yiqi-theme') || 'system';
  document.querySelectorAll('.theme-opt').forEach((b, i) =>
    b.classList.toggle('active', ['dark','system','light'][i] === s));
}
function setTheme(v) {
  localStorage.setItem('yiqi-theme', v);
  applyTheme(v === 'system' ? resolveTheme() : v);
  document.querySelectorAll('.theme-opt').forEach((b, i) =>
    b.classList.toggle('active', ['dark','system','light'][i] === v));
}
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
  if ((localStorage.getItem('yiqi-theme') || 'system') === 'system') applyTheme(resolveTheme());
});

function initSidebar() {}
function initScrollSpy() {}
function initTableSorting() {}
function initTableFiltering() {}
function renderCharts() {}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(resolveTheme());
  initSidebar();
  initScrollSpy();
  initTableSorting();
  initTableFiltering();
  renderCharts();
});
```

---

## 5 · Responsive

| Breakpoint | Comportamiento |
|---|---|
| > 980px | Sidebar fijo · layout completo |
| ≤ 980px | Sidebar off-canvas · hamburger |
| ≤ 640px | Grids 1 col · espaciados reducidos |
| ≤ 420px | Mobile pequeño — stacks totales |

Mobile fix obligatorio:
```css
html, body { overflow-x: hidden; }
.app-layout, .content, .card, .panel,
.kpi-grid, .table-wrap { min-width: 0; }
img, svg { max-width: 100%; }
```

---

## 6 · Layout shell (HTML mínimo)

```html
<html data-theme="system" lang="es">
<head>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <header class="topbar">
    <!-- SVG logo + toggle 3 pasos -->
  </header>
  <div class="app-layout">
    <nav class="sidebar"><!-- scroll-spy --></nav>
    <main class="content">
      <div class="kpi-grid"><!-- cards borderless --></div>
    </main>
  </div>
</body>
```

---

## 7 · Fondo de pantalla

Elegir variante según el contexto del entregable:

**Dashboards, informes, panel gerencial — solo radiales:**
```css
body {
  background:
    radial-gradient(circle at 72% 8%, rgba(0,204,255,.07), transparent 28%),
    radial-gradient(circle at 12% 60%, rgba(0,204,255,.04), transparent 22%),
    var(--bg);
}
html[data-theme="light"] body {
  background:
    radial-gradient(circle at 72% 8%, rgba(0,159,199,.06), transparent 28%),
    radial-gradient(circle at 12% 60%, rgba(0,159,199,.04), transparent 22%),
    var(--bg);
}
```

**Landing, leads, sitio web — radiales + grilla:**
```css
body {
  background:
    radial-gradient(circle at 72% 8%, rgba(0,204,255,.07), transparent 28%),
    radial-gradient(circle at 12% 60%, rgba(0,204,255,.04), transparent 22%),
    linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px),
    var(--bg);
  background-size: auto, auto, 52px 52px, 52px 52px, auto;
}
html[data-theme="light"] body {
  background:
    radial-gradient(circle at 72% 8%, rgba(0,159,199,.06), transparent 28%),
    radial-gradient(circle at 12% 60%, rgba(0,159,199,.04), transparent 22%),
    linear-gradient(rgba(0,0,0,.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.032) 1px, transparent 1px),
    var(--bg);
  background-size: auto, auto, 52px 52px, 52px 52px, auto;
}
```


## 8 · Tokens

> **Bloque generado desde `styles.css`.** No editarlo a mano: es copia literal de los
> `:root` del canónico. Si algo tiene que cambiar, se cambia en `styles.css` y se
> regenera esta sección. Antes de v1.2.7.6 estaba escrito a mano y **los valores no
> coincidian** con el canónico (`--bg` decia `#0c0c0e` en vez de `#0a0a0b`, entre otros):
> todo lo generado con este prompt salia con colores que no eran los del sistema.

### Dark (`:root`)

```css
:root {
  /* ════════════════════════════════════════════════════════════
     YiQi Design System — TOKENS (copia de referencia)
     La fuente es el :root de styles.css. Esto es una copia para poder leer
     el documento sin la hoja al lado, y por eso puede quedar atrasada: al
     11/08/2026 tenia dos valores viejos de la v1.2.7.9 (--font-display
     seguia listando Greycliff CF y --kpi-num decia IBM Plex Mono).
     No redefinir :root en paginas; consumir estos tokens via var().
     ════════════════════════════════════════════════════════════ */
  /* Backgrounds */
  --bg:          #0a0a0b;
  --bg-elev:     #0f1013;
  --bg-elev-2:   #14161b;
  --card-bg:     #14161b;
  --bg-soft:     #181b21;
  /* Bordes */
  --line:        rgba(255,255,255,.08);
  --line-strong: rgba(255,255,255,.14);
  /* Texto */
  --text:        #f3f5f7;
  --muted:       #908e8e;
  --muted-2:     #7d7c82;
  --text-white:  #ffffff;  /* excepción: texto fijo sobre chips de color sólido (no adapta a tema) */
  --text-on-amber: #1a0d00;  /* excepción: texto oscuro fijo sobre chips ámbar */
  /* Marca */
  --cyan:        #00ccff;
  --accent-rgb:  0,204,255;
  --cyan-soft:   rgba(0,204,255,.10);
  --cyan-soft-2: rgba(0,204,255,.16);
  --accent:      var(--cyan);
  --accent-ink:  var(--text-white);
  --cyan-label:  rgba(0,204,255,.52);
  --cyan-night:  #0b7f9e;   /* cyan apagado para barras de dato (§56, embudo, franja) */
  --text-cyan-muted: rgba(0,195,240,.62);
  --gridline:    rgba(0,204,255,.16);
  /* Semánticos */
  --green:  #15d49c;  --green-soft:  rgba(21,212,156,.10);
  --amber:  #ffb020;  --amber-soft:  rgba(255,176,32,.10);
  --red:    #ff637d;  --red-soft:    rgba(255,99,125,.10);
  --blue:   #4d9fff;  --blue-soft:   rgba(77,159,255,.10);
  --indigo: #6366f1;  --indigo-soft: rgba(99,102,241,.12);
  --warm:   #b5a090;  --warm-soft:   rgba(181,160,144,.10);
  /* App brand (Marketplace) — uno por app, NO cyan */
  --violet:  #8b5cf6;  --violet-soft:  rgba(139,92,246,.12);  --violet-soft-2:  rgba(139,92,246,.18);
  --orange:  #ff8a3d;  --orange-soft:  rgba(255,138,61,.12);  --orange-soft-2:  rgba(255,138,61,.18);
  --magenta: #ff5da2;  --magenta-soft: rgba(255,93,162,.12);  --magenta-soft-2: rgba(255,93,162,.18);
  /* tints tokenizados (sync panel) */
  --amber-a08: rgba(255, 176, 32, 0.08);
  --amber-a12: rgba(255, 176, 32, 0.12);
  --amber-a20: rgba(255, 176, 32, 0.20);
  --amber-a25: rgba(255, 176, 32, 0.25);
  --amber-a28: rgba(255, 176, 32, 0.28);
  --cyan-a12: rgba(0, 204, 255, 0.12);
  --cyan-a18: rgba(0, 204, 255, 0.18);
  --cyan-a22: rgba(0,204,255,0.22);
  --cyan-a24: rgba(0, 204, 255, 0.24);
  --cyan-a25: rgba(0, 204, 255, 0.25);
  --cyan-a28: rgba(0,204,255,0.28);
  --cyan-a38: rgba(0, 204, 255, 0.38);
  --green-a08: rgba(21, 212, 156, 0.08);
  --green-a12: rgba(21, 212, 156, 0.12);
  --green-a25: rgba(21, 212, 156, 0.25);
  --green-a28: rgba(21, 212, 156, 0.28);
  --red-a28: rgba(255, 99, 125, 0.28);
  --red-a30: rgba(255, 99, 125, 0.30);
  --cyan-chart-bar: rgba(0, 204, 255, 0.55);
  --cyan-chart-line: rgba(0, 204, 255, 0.16);
  /* Efectos — sombras navy/cyan suaves (no negro de desplazamiento) */
  --focus-ring: 0 0 0 2px var(--bg), 0 0 0 4px var(--cyan-night);   /* WCAG 1.4.11: 3:1 minimo */
  --glow:      var(--focus-ring);   /* alias historico: no usar en codigo nuevo */
  --shadow-sm: 0 1px 3px rgba(0,18,28,.30);
  --shadow-md: 0 4px 14px rgba(0,20,30,.26);
  --shadow-lg: 0 12px 40px rgba(0,26,40,.34), 0 2px 12px rgba(0,204,255,.06);
  --shadow:    var(--shadow-lg);   /* alias de conveniencia */
  /* Tipografía */
  --font-display: "Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, sans-serif;
  --display: var(--font-display);
  --sans:    "Inter", ui-sans-serif, system-ui, sans-serif;
  --mono:    "IBM Plex Mono", ui-monospace, monospace;
  --kpi-num: var(--display);  /* v1.2.7.6: cifras en mono, coincide con el spec de tipografía */
  /* Layout */
  --topbar-h:  56px;
  --statusbar-h: 28px;   /* barra de estado inferior (§44) */
  --sidebar-w: 240px;
  --sidebar-w-collapsed: 68px;
  --page-px:   28px;
  /* Radios */
  --radius-xs:   6px;
  --radius-sm:   10px;
  --radius:      14px;
  --radius-md:   16px;
  --radius-lg:   18px;
  --radius-xl:   24px;
  --radius-pill: 999px;
  --tr: 180ms ease;
  /* Escala tipográfica */
  --fs-section-hero: 24px;
  --fs-panel-title:  14px;
  --fs-module-title: 13px;
  --fs-body:         13px;
  --fs-meta:         12px;
  --fs-caption:      11px;
  --fs-placeholder-title: 30px;
  /* Piso de fuente para campos en pantalla tactil. Safari en iOS hace zoom
     automatico al enfocar un campo con menos de 16px y no lo revierte. No es
     una preferencia de diseno: es el umbral del navegador. */
  --fs-input-touch:  16px;
}
```

### Light (`html[data-theme="light"]`)

```css
html[data-theme="light"] {
  --bg:          #eeece7;
  --bg-elev:     #f6f4ef;
  --bg-elev-2:   #ffffff;
  --card-bg:     #f9f7f2;
  --bg-soft:     #ece9e2;
  --line:        rgba(0,0,0,.08);
  --line-strong: rgba(0,0,0,.13);
  --text:        #17191c;
  --muted:       #5e5a57;
  --muted-2:     #636875;
  --cyan:        #009fc7;
  --accent-rgb:  0,159,199;
  --cyan-soft:   rgba(0,159,199,.10);
  --cyan-soft-2: rgba(0,159,199,.14);
  --cyan-label:  rgba(0,159,199,.58);
  --cyan-night:  var(--cyan);   /* en claro el cyan ya viene apagado: no hace falta bajarlo mas */
  --text-cyan-muted: rgba(0,140,175,.58);
  --gridline:    rgba(0,159,199,.18);
  --green:  #0c9b6d;  --green-soft:  rgba(12,155,109,.10);
  --amber:  #c78000;  --amber-soft:  rgba(199,128,0,.10);
  --red:    #d4485e;  --red-soft:    rgba(212,72,94,.10);
  --blue:   #4d9fff;  --blue-soft:   rgba(77,159,255,.10);
  --indigo: #4f46e5;  --indigo-soft: rgba(79,70,229,.12);
  --warm:   #8b7260;  --warm-soft:   rgba(139,114,96,.10);
  --violet:  #7c3aed;  --violet-soft:  rgba(124,58,237,.10);  --violet-soft-2:  rgba(124,58,237,.16);
  --orange:  #e07628;  --orange-soft:  rgba(224,118,40,.10);  --orange-soft-2:  rgba(224,118,40,.16);
  --magenta: #d6336c;  --magenta-soft: rgba(214,51,108,.10);  --magenta-soft-2: rgba(214,51,108,.16);
  /* tints tokenizados (sync panel) */
  --amber-a08: rgba(199, 128, 0, 0.08);
  --amber-a12: rgba(199, 128, 0, 0.12);
  --amber-a20: rgba(199, 128, 0, 0.20);
  --amber-a25: rgba(199, 128, 0, 0.25);
  --amber-a28: rgba(199, 128, 0, 0.28);
  --cyan-a12: rgba(0, 159, 199, 0.12);
  --cyan-a18: rgba(0, 159, 199, 0.18);
  --cyan-a22: rgba(0, 159, 199, 0.22);
  --cyan-a24: rgba(0, 159, 199, 0.24);
  --cyan-a25: rgba(0, 159, 199, 0.25);
  --cyan-a28: rgba(0, 159, 199, 0.28);
  --cyan-a38: rgba(0, 159, 199, 0.38);
  --green-a08: rgba(12, 155, 109, 0.08);
  --green-a12: rgba(12, 155, 109, 0.12);
  --green-a25: rgba(12, 155, 109, 0.25);
  --green-a28: rgba(12, 155, 109, 0.28);
  --red-a28: rgba(212, 72, 94, 0.28);
  --red-a30: rgba(212, 72, 94, 0.30);
  --cyan-chart-bar: rgba(0, 159, 199, 0.55);
  --cyan-chart-line: rgba(0, 159, 199, 0.16);
  --focus-ring: 0 0 0 2px var(--bg), 0 0 0 4px var(--cyan-night);   /* WCAG 1.4.11: 3:1 minimo */
  --glow:      var(--focus-ring);   /* alias historico */
  --shadow-sm: 0 1px 3px rgba(16,36,54,.06);
  --shadow-md: 0 4px 14px rgba(16,36,54,.08);
  --shadow-lg: 0 8px 24px rgba(0,80,110,.09), 0 1px 4px rgba(0,80,110,.05);
}
```

---

## 9 · Tipografía

- **Plus Jakarta Sans (`--display`)** → títulos, heroes, headings grandes
- **Inter (`--sans`)** → UI, body, labels, botones
- **IBM Plex Mono (`--mono`)** → kickers, badges, datos, IDs

KPI value: `font: 700 28px/1 var(--display); letter-spacing: -.03em;`

---

## 10 · Componentes base

Valores tomados del canónico. Si difieren de `styles.css`, manda `styles.css`.

```css
/* Card — borderless: separa por fondo, no por borde */
.card {
  padding: 20px;
  border-radius: var(--radius);
  background: var(--bg-elev);
  box-shadow: var(--shadow-sm);
}

/* Botón — el primario lleva borde tonal por decisión de marca */
.btn         { border: 1px solid transparent; background: var(--bg-elev-2); color: var(--text); }
.btn-primary { background: var(--cyan-soft); border-color: var(--cyan-a28); color: var(--cyan); }
.btn-ghost   { background: transparent; border-color: transparent; color: var(--muted); }

/* Input — BORDERLESS. Se marca por fondo, no por borde. */
.ds-input {
  background-color: var(--bg);
  border: 1px solid transparent;
  border-radius: 14px;
  height: 40px;
  padding: 0 14px;
}

/* Foco — anillo separado, y nada más. No cambia el fondo. */
.ds-input:focus-visible,
.ds-select:focus-visible,
.ds-textarea:focus-visible,
.btn:focus-visible,
.card-clickable:focus-visible {
  outline: 2px solid var(--cyan-night);
  outline-offset: 2px;
}
/* Dentro de un segmentado (.range-btn, .tab-item en píldora): offset -2px */

/* Table headers */
.data-table th::after  { content: " ↕"; color: var(--muted-2); }
.data-table th.sorted-asc::after  { content: " ↑"; color: var(--cyan); }
.data-table th.sorted-desc::after { content: " ↓"; color: var(--cyan); }

/* Badge — sin borde */
.badge      { border: none; background: var(--bg-elev-2); color: var(--muted); }
.badge-cyan { background: var(--cyan-soft); color: var(--cyan); }

/* Barras de dato — 4px, relleno en --cyan-night */
.funnel-track, .hourly-bar-track, .branch-bar { height: 4px; border-radius: var(--radius-pill); }
.funnel-fill, .hourly-bar-fill, .branch-fill  { background: var(--cyan-night); }
```

**Reglas que no se negocian:**

- **Borderless por defecto.** La profundidad se construye con elevación de fondo y `box-shadow`. El input **no** es excepción: antes de v1.2.7.6 este documento decía que sí, y era falso.
- **Borde de un solo lado: prohibido.** Nada de `border-left` de acento en callouts, notas o cards.
- **El estado activo se marca con fondo tonal** (`--cyan-soft`), nunca con anillo.
- **El anillo de color es solo para foco**, y con `:focus-visible` (teclado), nunca `:focus`.
- **Contraste del foco ≥ 3:1** (WCAG 2.2 §1.4.11).

### Kit de panel (v1.2.7.5)

Para dashboards y paneles gerenciales, el canónico ya trae: `.statusbar` + `.ldot`, `.sidebar-tools`, navegación en tabs (`.app-shell.nav-tabs` / `.tab-item` / `.btn-layout`), acordeón de fuente de datos (`.src-*`), ranking con barra (`.branch-list`), watchlist tonal (`.wl-bar` / `.tone-*`), card clickeable, estados sin dato (`.kpi-na`, `.trend-empty`) y carrusel de KPIs (`.more-kpis`). **No reimplementarlos.**

---

## 11 · Charts

- type: doughnut · cutout: 68% · legend custom
- Colores desde CSS vars (nunca hex hardcodeado)
- `sortDonutDesc()` para ordenamiento automático descendente

---

## 12 · Branding

- Nombre: **YiQi**
- CTA: **"Reserva tu demo"**
- Español neutro — sin voseo ni regionalismos
- Logo SVG inline obligatorio (nunca `<img>`)

---

## 13 · Versionado

Incluir en footer:

```
© 2026 YiQi S.A. · [Nombre entregable] · DS v1.2.7.6
```

---

## 14 · Dependencias

**Modo estándar:**
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

**Iconos** (solo Next.js — en HTML standalone usar SVG inline):
```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
```

---

## 15 · Output contract

El HTML final debe:
- Renderizar correctamente
- Ser responsive
- No tener errores JS
- Mantener consistencia visual DS
- Ser reutilizable para cualquier cliente

---

## 16 · Convención de archivo

`[nombre]-v1_0_0.html` (puntos → guiones bajos)

---

## 17 · Regla crítica final

Si algo no está definido:
→ NO inventar
→ Usar criterio mínimo basado en este documento

---

*YiQi ERP · Design System v1.2.7.6 · Master Recipe · 29/07/2026*


---

## 18 · YiQi Runtime (JS compartido)

Incluir en el `<head>` de cualquier entregable HTML standalone:

```html
<script src="/system/sdk/yiqi-runtime.js"></script>
```

Reemplaza el bloque de JS que antes se copiaba en cada archivo. API global:

```js
// Tema
YiQi.setTheme('dark' | 'system' | 'light')  // persiste en localStorage
YiQi.getTheme()                              // devuelve preferencia guardada

// Toast
YiQi.toast('Guardado', 'success')            // types: success | error | warning | info
YiQi.toast('Error al cargar', 'error', 5000) // duration en ms (default 3000)

// Tabla sorteable
YiQi.initSortable(document.querySelector('.mi-tabla'))
// Los <th> deben tener data-col="nombre"

// ScrollSpy (nav activo por sección)
YiQi.initScrollSpy({
  sections:  '.section',     // selector o NodeList
  navItems:  '.nav-item',    // selector o NodeList
  threshold: 0.25            // opcional
})

// Formatters
YiQi.fmt.currency(1500000)   // → $ 1.500.000
YiQi.fmt.number(12345)       // → 12.345
YiQi.fmt.percent(12.3)       // → 12,3 %
YiQi.fmt.date('2026-04-30')  // → 30/04/2026
YiQi.fmt.dateShort(new Date) // → 30 abr
```

El tema se inicializa automáticamente al cargar el script (sin esperar DOMContentLoaded),
eliminando el flash de tema incorrecto.
