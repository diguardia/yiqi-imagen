# YiQi Design System — Guía maestra v1.2.7.11

> Guía de referencia para implementación de UI en productos YiQi ERP. **La fuente única es este repo, `yiqi-imagen`**: `styles.css` (tokens + componentes, se publica al CDN), `yiqi-design-system.html` (catálogo), `examples/showcase.html` (showcase) y este documento. Casa única del DS desde el **11/06/2026**; `www.yiqi/` es solo el sitio y ya no aloja el Design System — lo consume del CDN como cualquier app.
> Este archivo reemplaza cualquier versión anterior de `yiqi-design.md`.

---

## 0. Identidad de marca

| Elemento | Valor |
|---|---|
| Nombre del producto | **YiQi** — Y mayúscula, i minúscula, Q mayúscula, i minúscula |
| ❌ Incorrecto | `yiqi` `YIQI` `YiQI` `Yiqi` |
| CTA canónica | **"Reserva tu demo"** |
| Copy | Español neutro — sin voseo ni regionalismos |

### Ortografía y sintaxis del copy

- Todo texto visible al usuario debe respetar ortografía en español (acentos, tildes diacríticas y puntuación).
- Evitar mayúsculas sostenidas en labels de UI salvo siglas (`POS`, `SLA`, `SKU`, `API`).
- Usar terminología consistente en todos los módulos:
  - "Facturación", "nota de débito", "nota de crédito", "órdenes", "proyección", "preparación".
- Si un indicador muestra fórmula o composición, redactar en lenguaje funcional claro y gramaticalmente correcto.

### Logo

- Siempre como **SVG inline** — nunca `<img src="logo.svg">` ni `<img src="logo.png">`
- **Dark mode / negativo:** letras `#f3f5f7` (= `--text` dark), símbolo Q `#00ccff`
- **Light mode / positivo:** letras `#17191c` (= `--text` light), símbolo Q `#009fc7`
- **Topbar universal:** letras `var(--text)`, símbolo Q `var(--cyan)`
- No rotar, deformar, recolorear ni aplicar efectos
- **Tamaño canónico en topbar:** `height: 39px; width: auto` — nunca tamaño fijo por ancho
- **Wordmark en displays estáticos:** sin animación — solo SVG inline sin `data-yiqi-logo`
- **Animación canónica (único eje aprobado):** `data-axis="y"` (flip vertical). Los ejes `x` y `z` están descartados.

### Logo iA Ready

- Siempre como **SVG inline** — nunca `<img src="iAready.svg">`
- Letras "iready" → `var(--text)` · letra "A" → `var(--cyan)`
- No rotar, deformar, recolorear ni aplicar efectos
- Uso habitual: footer, sección de certificaciones, landing de producto
- **Tamaño canónico:** `height: 32px; width: auto`
- Clases helper: `.iar { fill: var(--text) }` · `.iar-a { fill: var(--cyan) }`

```html
<style>.iar{fill:var(--text)}.iar-a{fill:var(--cyan)}</style>
<svg viewBox="0 0 256 68" xmlns="http://www.w3.org/2000/svg" aria-label="iA ready" style="height:32px;width:auto">
  <path class="iar" d="M225.626 67.89C224.75 67.89 224.239 67.452 224.677 66.576L229.933 54.02L216.063 19.491C215.771 18.688 216.209 18.25 217.012 18.25H227.159C227.743 18.25 228.327 18.542 228.546 19.126L235.846 39.712L243.219 19.126C243.438 18.542 244.022 18.25 244.606 18.25H254.753C255.556 18.25 255.921 18.688 255.629 19.491L236.722 67.014C236.503 67.598 235.919 67.89 235.335 67.89H225.626Z"/>
  <path class="iar" d="M190.294 54.896C180.439 54.896 173.65 46.7199 173.65 36.1349C173.65 25.6229 180.439 17.3739 190.294 17.3739C194.747 17.3739 197.886 18.688 200.222 21.243V2.99295C200.222 2.33595 200.733 1.82495 201.39 1.82495H211.391C212.048 1.82495 212.559 2.33595 212.559 2.99295V52.852C212.559 53.509 211.975 54.02 211.318 54.02H202.339C201.682 54.02 201.171 53.509 201.171 52.852L201.025 49.8589C198.616 52.9979 195.185 54.896 190.294 54.896ZM185.622 36.1349C185.622 40.8069 188.834 43.7999 193.068 43.7999C197.375 43.7999 200.368 40.734 200.368 36.062C200.368 31.463 197.375 28.4699 193.068 28.4699C188.834 28.4699 185.622 31.5359 185.622 36.1349Z"/>
  <path class="iar" d="M147.515 54.896C137.66 54.896 130.871 46.72 130.871 36.135C130.871 25.623 137.66 17.374 147.515 17.374C152.552 17.374 155.983 19.199 158.246 22.338L158.392 19.418C158.392 18.761 158.903 18.25 159.56 18.25H168.612C169.269 18.25 169.78 18.761 169.78 19.418V52.852C169.78 53.509 169.196 54.02 168.539 54.02H159.56C158.903 54.02 158.392 53.509 158.392 52.852L158.246 49.859C155.837 52.998 152.406 54.896 147.515 54.896ZM142.843 36.135C142.843 40.807 146.055 43.8 150.289 43.8C154.596 43.8 157.589 40.734 157.589 36.062C157.589 31.463 154.596 28.47 150.289 28.47C146.055 28.47 142.843 31.536 142.843 36.135Z"/>
  <path class="iar" d="M112.868 54.896C101.115 54.896 93.0117 47.012 93.0117 35.989C93.0117 25.477 100.385 17.374 111.554 17.374C122.504 17.374 128.855 25.331 128.855 34.529C128.855 38.398 127.906 40.807 124.329 40.807H104.984C106.298 44.092 109.437 45.333 113.89 45.333C115.934 45.333 118.27 45.26 121.263 43.654C121.847 43.362 122.212 43.508 122.577 44.092L125.935 48.764C126.227 49.202 126.3 49.786 125.57 50.443C122.577 53.509 117.978 54.896 112.868 54.896ZM104.765 32.412H117.978C117.248 28.616 114.62 27.375 111.627 27.375C108.488 27.375 105.714 28.762 104.765 32.412Z"/>
  <path class="iar" d="M69.2676 54.02C68.6106 54.02 68.0996 53.509 68.0996 52.852V19.418C68.0996 18.761 68.6106 18.25 69.2676 18.25H78.9036C79.4876 18.25 79.9256 18.542 79.9986 19.491L80.3636 24.309C81.5316 20.294 83.7216 17.374 87.8096 17.374C89.6346 17.374 90.5836 17.885 91.0946 18.323C91.6786 18.761 91.8246 19.272 91.8246 19.929V28.032C91.8246 28.908 91.3136 29.2 90.2916 28.981C89.5616 28.762 88.8316 28.616 87.5906 28.616C83.2836 28.616 80.3636 30.879 80.3636 36.427V52.852C80.3636 53.509 79.8526 54.02 79.1956 54.02H69.2676Z"/>
  <path class="iar-a" d="M17.7429 54.0199C16.9399 54.0199 16.5019 53.5089 16.7939 52.7789L33.5839 3.79593C33.8029 3.21192 34.3869 2.91992 34.9709 2.91992H45.9939C46.5779 2.91992 47.2349 3.21192 47.4539 3.79593L64.2439 52.7789C64.5359 53.5089 64.0979 54.0199 63.2949 54.0199H52.4179C51.8339 54.0199 51.3229 53.8009 51.1039 53.1439L49.2059 47.0119H31.7589L29.8609 53.1439C29.6419 53.8009 29.2039 54.0199 28.6199 54.0199H17.7429ZM35.2629 35.7699H45.7019L40.5189 19.0529L35.2629 35.7699Z"/>
  <path class="iar" d="M6.64301 13.213C2.774 13.213 0 10.293 0 6.57C0 2.92 2.774 0 6.64301 0C10.439 0 13.286 2.92 13.286 6.57C13.286 10.293 10.439 13.213 6.64301 13.213ZM0.438004 52.852V19.418C0.438004 18.761 0.949003 18.25 1.606 18.25H11.68C12.337 18.25 12.848 18.761 12.848 19.418V52.852C12.848 53.509 12.337 54.02 11.68 54.02H1.606C0.949003 54.02 0.438004 53.509 0.438004 52.852Z"/>
</svg>
```


---

## 1. CSS Custom Properties

### 1.1 Dark mode (`:root` — default)

```css
:root {
  /* Backgrounds */
  --bg:        #0a0a0b;
  --bg-elev:   #0f1013;
  --bg-elev-2: #14161b;
  --bg-soft:   #181b21;

  /* Borders */
  --line:        rgba(255,255,255,.08);
  --line-strong: rgba(255,255,255,.14);

  /* Text */
  --text:    #f3f5f7;
  --muted:   #908e8e;
  --muted-2: #7d7c82;  /* WCAG AA 4.6:1 */

  /* Brand — Cyan */
  --cyan:            #00ccff;
  --cyan-soft:       rgba(0,204,255,.10);
  --cyan-soft-2:     rgba(0,204,255,.16);
  --cyan-label:      rgba(0,204,255,.52);
  --cyan-night:      #0b7f9e;              /* barras de dato — ver §26 */
  --text-cyan-muted: rgba(0,195,240,.45);  /* subtítulos activos, labels acento */

  /* Semantic */
  --green:       #15d49c;
  --green-soft:  rgba(21,212,156,.10);
  --amber:       #ffb020;
  --amber-soft:  rgba(255,176,32,.10);
  --red:         #ff637d;
  --red-soft:    rgba(255,99,125,.10);
  --purple:      #a78bfa;
  --purple-soft: rgba(167,139,250,.12);
  /* App brand (Marketplace) — uno por app, NO cyan */
  --violet:       #8b5cf6;  --violet-soft:  rgba(139,92,246,.12);  --violet-soft-2:  rgba(139,92,246,.18);
  --orange:       #ff8a3d;  --orange-soft:  rgba(255,138,61,.12);  --orange-soft-2:  rgba(255,138,61,.18);
  --magenta:      #ff5da2;  --magenta-soft: rgba(255,93,162,.12);  --magenta-soft-2: rgba(255,93,162,.18);

  /* Focus glow */
  --glow: 0 0 0 3px rgba(0,204,255,.22);

  /* Typography */
  --sans:    "Inter", system-ui, sans-serif;
  --display: "Greycliff CF", "Plus Jakarta Sans", "Inter", system-ui, sans-serif;
  --mono:    "IBM Plex Mono", monospace;

  /* Font weights */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* Spacing (base 4px) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 32px;
  --space-8: 48px;

  /* Border radius */
  --radius-xs:   6px;
  --radius-sm:   10px;
  --radius:      14px;
  --radius-pill: 999px;

  /* Elevation / Shadows */
  --shadow-sm: 0 1px 3px rgba(0,18,28,.30);
  --shadow-md: 0 4px 14px rgba(0,20,30,.26);
  --shadow-lg: 0 12px 40px rgba(0,26,40,.34), 0 2px 12px rgba(0,204,255,.06);

  /* Transitions */
  --transition-fast: 120ms ease;
  --transition-base: 180ms ease;
  --transition-slow: 240ms ease;

  /* Layout */
  --sidebar-w:   240px;
  --topbar-h:    56px;
  --statusbar-h: 28px;   /* barra de estado inferior — ver §25 */

  /* Nav active border — borderless por defecto */
  --nav-item-active-border: transparent;
}
```

### 1.2 Light mode (`html[data-theme="light"]`)

```css
html[data-theme="light"] {
  /* Backgrounds */
  --bg:        #eeece7;
  --bg-elev:   #f6f4ef;
  --bg-elev-2: #ffffff;
  --bg-soft:   #ece9e2;

  /* Borders */
  --line:        rgba(0,0,0,.08);
  --line-strong: rgba(0,0,0,.13);

  /* Text */
  --text:    #17191c;
  --muted:   #5e5a57;
  --muted-2: #636875;  /* WCAG AA 4.8:1 */

  /* Brand — Cyan (shifted para fondo claro) */
  --cyan:            #009fc7;
  --cyan-soft:       rgba(0,159,199,.1);
  --cyan-soft-2:     rgba(0,159,199,.16);
  --cyan-label:      rgba(0,159,199,.52);
  --cyan-night:      var(--cyan);          /* en claro no baja: el cyan ya viene apagado */
  --text-cyan-muted: rgba(0,140,175,.48);

  /* Semantic */
  --green:       #0c9b6d;
  --green-soft:  rgba(12,155,109,.10);
  --amber:       #c78000;
  --amber-soft:  rgba(199,128,0,.10);
  --red:         #d4485e;
  --red-soft:    rgba(212,72,94,.10);
  --purple:      #7c3aed;
  --purple-soft: rgba(124,58,237,.12);
  --violet:       #7c3aed;  --violet-soft:  rgba(124,58,237,.10);  --violet-soft-2:  rgba(124,58,237,.16);
  --orange:       #e07628;  --orange-soft:  rgba(224,118,40,.10);  --orange-soft-2:  rgba(224,118,40,.16);
  --magenta:      #d6336c;  --magenta-soft: rgba(214,51,108,.10);  --magenta-soft-2: rgba(214,51,108,.16);

  /* Shadows (más suaves en fondo claro) */
  --shadow-sm: 0 1px 3px rgba(16,36,54,.06);
  --shadow-md: 0 4px 14px rgba(16,36,54,.08);
  --shadow-lg: 0 8px 24px rgba(0,80,110,.09), 0 1px 4px rgba(0,80,110,.05);
}
```

---

## 2. Tipografía

### Imports (en `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Regla de uso

- **Greycliff CF Heavy (`--display`)** → títulos de página, hero headlines, headings grandes (fallback: Plus Jakarta Sans)
- **Inter (`--sans`)** → todo el texto de interfaz: body, labels, botones, nav
- **IBM Plex Mono (`--mono`)** → tokens, badges, kickers, valores numéricos, IDs, atajos de teclado

### Escala tipográfica

La escala display se pide **siempre con su clase**. La etiqueta desnuda entrega Inter, no Greycliff.

```css
.ds-title-hero    { font: 700 40px/1.05 var(--display); letter-spacing: -0.028em; }
.ds-title-page    { font: 700 30px/1.1  var(--display); letter-spacing: -0.028em; }
.ds-title-section { font: 700 24px/1.15 var(--display); letter-spacing: -0.024em; }
```

**Greycliff CF se publica con el CDN.** Cuatro pesos en `woff2`, ~30K cada uno, declarados con cuatro `@font-face` en `styles.css` y servidos desde `fonts/`:

| Peso | Archivo |
|---|---|
| 500 · Medium | `fonts/Greycliff-CF-Medium.woff2` |
| 600 · Demi-Bold | `fonts/Greycliff-CF-Demi-Bold.woff2` |
| 700 · Bold | `fonts/Greycliff-CF-Bold.woff2` |
| 800 · Heavy | `fonts/Greycliff-CF-Heavy.woff2` |

**Corregido el 30/07/2026.** Antes el canónico **no cargaba la fuente**: no tenía ningún `@font-face` y confiaba en que Greycliff estuviera instalada en la máquina. El único `@font-face` vivía en `site.css` (chrome del catálogo) y apuntaba a `system/fonts/`, una carpeta que no existe en este repo. Cualquier app que consumiera `styles.css` mostraba Plus Jakarta Sans.

**Las tres clases display bajaron de 800 a 700.** El Heavy se empastaba a 24px; el Bold mantiene la presencia de título y respira. Cambiar el peso de una clase es una línea, y los cuatro pesos están disponibles.


| Uso | Clase | Fuente | Tamaño | Peso | Letter-spacing |
|---|---|---|---|---|---|
| Hero title | `.ds-title-hero` | `--display` | 40px | 700 | -0.028em |
| Placeholder title | `.ds-title-page` | `--display` | 30px | 700 | -0.028em |
| Section hero | `.ds-title-section` | `--display` | 24px | 700 | -0.024em |
| Subtítulo / card heading | — | `--sans` | 16–20px | 600 | -0.02em |
| Panel title | — | `--sans` | 14px | 700 | — |
| Body / celdas | — | `--sans` | 13–14px | 400 | — |
| Label / meta | — | `--sans` | 12px | 500 | — |
| KPI value · cifras | `.kpi-value` | `--kpi-num` | clamp(32–42px) | 500 | -0.02em · `tabular-nums` |
| Kicker / section label | `.brand-kicker` `.section-kicker` `.panel-kicker` | `--mono` | 10px | 700 | .15em, uppercase, color cyan |
| Delta de KPI | `.kpi-delta` | `--mono` | 11px | 600 | .02em |
| Atajo de teclado | `.ds-input-shortcut` | `--mono` | 10px | 600 | — |
| Label de sección del nav | `.nav-label` | `--mono` | 9px | 700 | .15em, uppercase |
| Texto de badge y tag | `.badge` `.tag` | `--mono` | 10px | 700 | — |

Los valores de la columna **Clase** son los que la clase entrega de verdad, medidos sobre `styles.css`. Antes esta tabla describía la escala Mono con rangos (`10–13px`, `.10em–.16em`) que no correspondían a ningún selector: el KPI figuraba como 28px/700 cuando `.kpi-value` es `clamp(32–42px)`/500.

Dos filas estaban mal planteadas y se corrigieron: `Label de sección del nav` decía 10px/.12em cuando `.nav-label` es 9px/.15em; e `ID / código` no era un rol tipográfico suelto sino la tipografía interna de `.badge` y `.tag`, así que ahora se llama por lo que es.

**Duplicación abierta:** `.nav-label` (9px, `.15em`, `var(--nav-label-color)`) y `.nav-lbl` (9px, `.14em`, `var(--muted-2)`, con padding propio) cumplen el mismo rol con `.01em` de diferencia. `.nav-label` se usa 13 veces en el catálogo; `.nav-lbl`, 2 en el catálogo y 9 en el showcase. Unificarlas toca 24 usos — sin resolver.

### Etiquetas HTML sin clase

Las escalas de arriba se piden con una clase o con estilo propio. Estas reglas **no se piden**: `styles.css` las aplica a toda etiqueta del documento, tenga clase del sistema o no. Es lo que entrega el canónico si escribís la etiqueta sola.

**El DS no le impone tamaño a ninguna etiqueta.** La única regla es el reseteo de margen; todo lo demás es el default del navegador.

| Etiqueta | Tamaño | Peso | Letter-spacing |
|---|---|---|---|
| `<h1>` | 32px | 700 | normal |
| `<h2>` | 24px | 700 | normal |
| `<h3>` | 18.7px | 700 | normal |
| `<p>` | 16px | 400 | normal |
| `<h4>` | 13.3px | 700 | normal |

```css
h1, h2, h3, h4, p { margin: 0; }
```

Todas heredan `font-family: var(--sans)` y `line-height: 1.4` de `html`.

`h1`, `h2`, `h3` y `h4` **ya no llevan tamaño impuesto**. `h1` y `h2` eran `font-size: 30px; letter-spacing: -0.04em`, y el `h2` además `max-width: 12ch`, que recortaba cualquier título de más de doce caracteres en un sitio que adoptara el DS. Medido al sacarlas: de 98 headings entre catálogo y showcase, **solo 3 cambiaron de render** — las dos muestras de esta sección y `.recovery-title`, que perdió un `letter-spacing` que heredaba sin declararlo. El `max-width` limitaba 78 títulos y no hacía envolver a ninguno: estaba inerte adentro y rompía afuera.

`h3` (18px) y `h4` (15px) se sacaron después, por simetría: costaron 9 elementos que perdieron el tracking de -0.02em y un `<h3>` sin clase del showcase que pasó de 18 a 18.72px. El alto de catálogo y showcase quedó idéntico.

**Las etiquetas entregan Inter, no Greycliff.** La familia viene de `html { font-family: var(--sans) }`. La escala display de la tabla anterior **no se obtiene con `<h1>`**.

**Anti-patrón:** apoyarse en la etiqueta desnuda para maquetar. El tamaño y el recorte del `<h2>` están pensados para el contexto del sistema, no para texto arbitrario.

> Documentado en el catálogo: **04 · Tipografía**, bloque *"Etiquetas HTML sin clase"*.

### Interlinea (line-height) — escala canónica

**Default del sistema: `1.4` (compact)** — aplica al `body` base.

| Nombre | Valor | Uso |
|---|---|---|
| tight | `1.1` | Títulos display, hero headlines |
| snug | `1.35` | Subtítulos, headings de panel |
| **compact** *(default)* | **`1.4`** | **Body UI, descripciones, app-desc, bajadas** |
| normal | `1.55` | Texto de ayuda, prose más largo |
| relaxed | `1.7` | Notas al pie, tooltips |
| loose | `2.0` | Código mono, logs |

```css
body { line-height: 1.4; }  /* compact — default del sistema */
```

**Anti-patrón:** usar `1.6` o `1.7` en texto de interfaz estándar — se ve con demasiado aire.

---

### Nota / callout — `.ds-note`

Bloque de aclaración dentro de una sección. **Borderless:** se separa por fondo elevado, nunca por borde ni franja lateral (§3). El tono es opcional y va **solo en el fondo** — el texto no cambia de color.

```css
.ds-note {
  background: var(--bg-elev);
  border-radius: var(--radius);
  padding: 14px 16px;
  font: 400 13px/1.55 var(--sans);
  color: var(--muted);
}
.ds-note strong { color: var(--text); font-weight: 600; }
.ds-note + .ds-note { margin-top: 9px; }
.ds-note--info  { background: var(--cyan-soft); }
.ds-note--warn  { background: var(--amber-soft); }
.ds-note--alert { background: var(--red-soft); }
```

```html
<div class="ds-note ds-note--warn">
  <strong>Atención.</strong> Condición de uso del componente.
</div>
```

| Variante | Fondo | Para qué |
|---|---|---|
| `.ds-note` | `--bg-elev` | Explicación de contexto. El default. |
| `.ds-note--info` | `--cyan-soft` | Referencia cruzada o decisión ya tomada. |
| `.ds-note--warn` | `--amber-soft` | Advertencia o condición de uso. |
| `.ds-note--alert` | `--red-soft` | Anti-patrón del sistema. |

**Contraste medido:** el texto `--muted` da entre 5,13:1 y 6,21:1 sobre los cuatro fondos, en los dos temas.

**Anti-patrones:** poner botones o links de acción dentro de una nota — la nota explica, no pide (para eso está el runtime banner). Y usar el mismo tono en todas las notas de una sección: si todo es ámbar, no hay jerarquía.

> Documentado en el catálogo: **64 · Nota / callout**, ancla `#ds-note`.

---

## 3. Filosofía borderless *(nuevo en v1.2.5)*

**Regla:** los elementos de display van **sin borde** siempre que sea posible. La profundidad se logra con elevación de fondo y `box-shadow`.

```
borde visible → solo en controles interactivos (input, select, textarea, switch, checkbox, search)
sin borde     → cards, panels, KPIs, badges, tags, nav items, modales, accordions, icon cards
```

```css
/* ✅ Correcto — card borderless */
.card {
  background: var(--bg-elev);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);   /* profundidad por sombra */
}

/* ✅ Correcto — input con borde (control interactivo) */
.input {
  border: 1px solid var(--line);
}

/* ❌ Incorrecto */
.card { border: 1px solid var(--line); }
.badge { border: 1px solid var(--line); }
```

### No permitido — borde de un solo lado

Callouts, notas y cards con borde en **un solo lado** (`border-left` o `border-top` de acento) quedan **prohibidos**: rompen el sistema flat & borderless y combinan mal con esquinas redondeadas. El énfasis se logra con **fondo tonal** (`--amber-soft`, `--cyan-soft`, etc.), nunca con bordes parciales.

```css
/* ❌ No permitido — acento lateral */
.callout { border-left: 3px solid var(--amber); border-radius: var(--radius-lg); }

/* ✅ Correcto — fondo tonal borderless */
.callout { background: var(--amber-soft); border-radius: var(--radius-lg); }
```

---

## 4. Token `--text-cyan-muted` *(nuevo en v1.2.5)*

Usar en: subtítulos, estado activo de módulos, labels secundarios con acento cyan.

**Nunca** en CTAs ni texto principal.

```css
/* ✅ Uso correcto */
.section-kicker    { color: var(--text-cyan-muted); }
.module-open-title { color: var(--text-cyan-muted); }
.nav-item.active   { color: var(--text-cyan-muted); }

/* ❌ Incorrecto — usar --cyan directo para estados activos */
.nav-item.active { color: var(--cyan); }
```

---

## 5. Fondo de pantalla *(actualizado en v1.2.5)*

Dos variantes según el contexto del entregable:

| Variante | Cuándo usarla |
|---|---|
| **Solo radiales** | Dashboard, informe, panel gerencial — cualquier app funcional |
| **Radiales + grilla** | Landing, propuesta comercial (leads), sitio web (www.yiqi.com.ar) |

### Variante A — Solo radiales (dashboards e informes)

```css
body {
  background:
    radial-gradient(circle at 72% 8%,  rgba(0,204,255,.07), transparent 28%),
    radial-gradient(circle at 12% 60%, rgba(0,204,255,.04), transparent 22%),
    var(--bg);
}
html[data-theme="light"] body {
  background:
    radial-gradient(circle at 72% 8%,  rgba(0,159,199,.06), transparent 28%),
    radial-gradient(circle at 12% 60%, rgba(0,159,199,.04), transparent 22%),
    var(--bg);
}
```

### Variante B — Radiales + grilla (landing, leads, web)

```css
body {
  background:
    radial-gradient(circle at 72% 8%,  rgba(0,204,255,.07), transparent 28%),
    radial-gradient(circle at 12% 60%, rgba(0,204,255,.04), transparent 22%),
    linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px),
    var(--bg);
  background-size: auto, auto, 52px 52px, 52px 52px, auto;
}
html[data-theme="light"] body {
  background:
    radial-gradient(circle at 72% 8%,  rgba(0,159,199,.06), transparent 28%),
    radial-gradient(circle at 12% 60%, rgba(0,159,199,.04), transparent 22%),
    linear-gradient(rgba(0,0,0,.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.032) 1px, transparent 1px),
    var(--bg);
  background-size: auto, auto, 52px 52px, 52px 52px, auto;
}
```


### Scrollbars *(global)*

Barras de scroll con **track oscuro** y **thumb sutil**, definidas en `styles.css`. Aplican a toda la página y a cualquier contenedor scrolleable; usan tokens, así que se adaptan a dark/light.

```css
* { scrollbar-width: thin; scrollbar-color: var(--line-strong) var(--bg); }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--line-strong); border-radius: var(--radius-pill); border: 2px solid var(--bg); }
::-webkit-scrollbar-thumb:hover { background: var(--muted-2); }
```

## 6. Layout shell

### Estructura base

```
topbar sticky (56px, z-index: 99)
  └─ SVG logo inline + version pill + toggle 3 pasos + hamburger mobile
sidebar (240px, sticky top: 56px)
  └─ off-canvas en mobile (breakpoint: 980px)
main content
  └─ padding: 36–40px desktop / 20–22px mobile
  └─ max-width: 1100px
```

### Topbar

```css
.topbar {
  position: sticky; top: 0; z-index: 99;
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 0 28px; height: var(--topbar-h);
  background: rgba(12,12,14,.82);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--line);  /* excepción: separador estructural */
}
html[data-theme="light"] .topbar {
  background: rgba(238,236,231,.88);
}
```

### Sidebar

```css
.sidebar {
  width: var(--sidebar-w);
  position: sticky; top: var(--topbar-h);
  height: calc(100vh - var(--topbar-h));
  overflow-y: auto;
  border-right: 1px solid var(--line);  /* excepción: separador estructural */
  padding: 24px 16px;
}
```

### HTML mínimo

```html
<html data-theme="system" lang="es">
<body>
  <header class="topbar">...</header>
  <div class="app-layout">
    <nav class="sidebar">...</nav>
    <main class="content">
      <div class="kpi-grid">...</div>
      <div class="panel">...</div>
    </main>
  </div>
</body>
```

### Sidebar colapsable (rail)

El sidebar puede colapsar a un **rail de solo iconos** (240px → 68px). El botón al pie (`.sidebar-collapse`) alterna `.app-shell.nav-collapsed`; las etiquetas se ocultan (sr-only) y reaparecen como **tooltip** por `title`. Estado persistido en `localStorage['yiqi-nav-collapsed']`.

```css
:root { --sidebar-w-collapsed: 68px; }

.sidebar { display: flex; flex-direction: column; }   /* el toggle va al pie con margin-top:auto */

.sidebar-collapse {                     /* botón al pie */
  width: 30px; height: 30px; margin: auto 0 0 auto;
  position: sticky; bottom: 0;
  background: transparent; border: 1px solid var(--line);
  border-radius: var(--radius-sm); color: var(--muted); cursor: pointer;
}
.sidebar-collapse svg { transition: transform .18s ease; }

.app-shell.nav-collapsed { grid-template-columns: var(--sidebar-w-collapsed) minmax(0,1fr); }
.nav-collapsed .sidebar-collapse svg { transform: rotate(180deg); }
.nav-collapsed .nav-lbl { visibility: hidden; height: 6px; padding: 0; }
.nav-collapsed .nav-link { justify-content: center; padding: 8px; gap: 0; position: relative; }
.nav-collapsed .nav-link span:not(.n-ico) {   /* etiqueta → sr-only */
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); white-space: nowrap;
}
.nav-collapsed .nav-link::after {             /* tooltip con la etiqueta */
  content: attr(title);
  position: absolute; left: calc(100% + 12px); top: 50%;
  transform: translateY(-50%);
  background: var(--bg-elev-2); color: var(--text);
  border: 1px solid var(--line-strong); border-radius: var(--radius-sm);
  padding: 5px 10px; font: 500 12px var(--sans); white-space: nowrap;
  box-shadow: var(--shadow-md); opacity: 0; pointer-events: none;
}
.nav-collapsed .nav-link:hover::after,
.nav-collapsed .nav-link:focus-visible::after { opacity: 1; }
```

```html
<div class="app-shell">
  <nav class="sidebar">
    <div class="nav">
      <span class="nav-lbl">Informe</span>
      <a class="nav-link is-active" href="#..." title="Planificación">
        <span class="n-ico"><svg>…</svg></span><span>Planificación</span>
      </a>
    </div>
    <button class="sidebar-collapse" onclick="toggleCollapse()" aria-expanded="true" title="Colapsar menú">
      <svg>…chevron…</svg>
    </button>
  </nav>
  <main class="content"> … </main>
</div>
```

```js
function applyCollapse(c){
  document.querySelector('.app-shell').classList.toggle('nav-collapsed', c);
  var b = document.querySelector('.sidebar-collapse');
  b.setAttribute('aria-expanded', String(!c));
  b.title = c ? 'Expandir menú' : 'Colapsar menú';
}
function toggleCollapse(){
  var c = !document.querySelector('.app-shell').classList.contains('nav-collapsed');
  applyCollapse(c);
  localStorage.setItem('yiqi-nav-collapsed', c ? '1' : '0');
}
applyCollapse(localStorage.getItem('yiqi-nav-collapsed') === '1');
```

**Reglas.** El `border-right` del `.sidebar` y el borde del botón son bordes completos estructurales (permitidos, no acento de un lado). Activo del ítem por fondo tonal `--cyan-soft`. En `≤ 960px` el rail no aplica: el sidebar entra como drawer off-canvas.

---

---

## 6.9 Orden de apilamiento — z-index

Toda superposición del sistema usa esta escala. **Antes de inventar un `z-index`, buscar acá dónde entra.** Un número nuevo fuera de la tabla es un síntoma: significa que el componente está peleando con otro en vez de ocupar su lugar.

| z-index | Qué | Clases |
|---|---|---|
| **200** | Modal y tooltip del rail colapsado | `.sc-modal`, `.nav-collapsed .nav-link::after` |
| **120** | Toasts | `.pr-toasts` |
| **115** | **Drawer mobile** | `.sidebar` en `≤980px` |
| **110** | **Backdrop del drawer** | `.nav-overlay` en `≤980px` |
| **~100** | Topbar de la app | *la declara cada app; el canónico no la fija* |
| **97** | Statusbar · sidebar en peek | `.statusbar`, `.nav-collapsed.nav-peek .sidebar` |
| **96** | Sidebar colapsado | `.nav-collapsed .sidebar` |
| **60** | Popovers y menús | `.kpi-help-pop` |
| **40** | Navegación pegajosa | `.tab-nav` |
| **20** | Menú de esquema | `.schema-menu` |
| **5** | Menú de fila | `.pr-menu` |

**El drawer va por encima de la topbar, no por debajo.** En celular ocupa la pantalla entera: si la topbar lo tapa, el botón de cerrar queda inalcanzable y el drawer se ve recortado. Por eso el drawer está en 115 y su backdrop en 110, por encima del 100 que suelen usar las topbars fijas.

**Corregido el 30/07/2026.** El drawer estaba en 90 y el backdrop en 80 — por debajo de cualquier topbar `fixed`. Apareció al migrar Mi Cuenta, cuya topbar es `z-index: 100`: el drawer entraba desde la derecha pero quedaba cortado bajo el header y su `.nav-close` no recibía clicks.

**Pendiente:** el canónico **no declara `position` ni `z-index` en `.topbar`**, así que cada app lo inventa. Y los 15 valores de la tabla se eligieron de a uno, sin escala. Publicarlos como tokens (`--z-drawer`, `--z-overlay`, `--z-topbar`…) es la salida, pero renumerar exige barrer catálogo, showcase, Analytics Pro y Mi Cuenta buscando solapamientos. Sin resolver.

---

## 7. Responsive

### Breakpoints

| Breakpoint | Comportamiento |
|---|---|
| `> 1200px` | 3–4 columnas KPIs completos |
| `≤ 1200px` | Grids 3 col → 2 col |
| `≤ 980px` | Sidebar off-canvas, layout 1 columna |
| `≤ 640px` | Espaciados reducidos |
| `≤ 420px` | Mobile pequeño — stacks totales |

### Mobile frame fix (obligatorio)

```css
html, body { overflow-x: clip; }  /* clip en lugar de hidden — no rompe position:sticky */
.app-layout, .content, .card, .panel,
.kpi-grid, .table-wrap { min-width: 0; }
img, svg { max-width: 100%; }
```

### Menú mobile

El botón hamburguesa es **`.nav-hamburger`** (36×36). Va **a la derecha** del topbar (`.topbar-r`), nunca a la izquierda. Solo visible en **`≤ 980px`**; abre el sidebar como drawer off-canvas **desde la derecha** (mismo lado que el botón), con `.nav-overlay` de backdrop y `.nav-close` para cerrarlo desde adentro.

```html
<button class="nav-hamburger" aria-label="Abrir navegación" aria-expanded="false">…</button>
<div class="nav-overlay"></div>
<aside class="sidebar">
  <button class="nav-close" aria-label="Cerrar navegación">…</button>
  …
</aside>
```

**Corregido el 30/07/2026.** Esta sección decía `.mobile-btn` y `≤ 960px`. Ninguna de las dos cosas era cierta: `.mobile-btn` **nunca existió en `styles.css`** y el breakpoint publicado siempre fue 980px. El error hizo que Mi Cuenta implementara el botón a mano, siguiendo la documentación. Las tres clases canónicas son `.nav-hamburger`, `.nav-overlay` y `.nav-close`.

---

---

## 8. Componentes clave

### Botones

```css
.btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 10px 16px; border-radius: var(--radius);
  border: none; font: 600 13px var(--sans);
  transition: all var(--transition-base); cursor: pointer;
}
.btn-primary   { background: var(--cyan-soft-2); color: var(--cyan); }
.btn-secondary { background: var(--bg-elev-2);   color: var(--text); }
.btn-ghost     { background: var(--bg-elev-2);   color: var(--muted); }
.btn-danger    { background: var(--red-soft);     color: var(--red); }

/* Tamaños y ancho */
.btn-sm   { padding: 7px 12px;  font-size: 12px; }
.btn-lg   { padding: 13px 20px; font-size: 14px; }
.btn-xl   { padding: 16px 32px; font-size: 15px; }
.btn-full { width: 100%; justify-content: center; }
```

### Badges / Tags / Pills — sin borde

```css
.badge {
  display: inline-flex; align-items: center;
  padding: 3px 9px; border-radius: var(--radius-pill);
  font: 600 11px var(--mono); letter-spacing: .04em;
  /* sin border — borderless philosophy */
}
.badge-cyan   { background: var(--cyan-soft);   color: var(--cyan); }
.badge-green  { background: var(--green-soft);  color: var(--green); }
.badge-amber  { background: var(--amber-soft);  color: var(--amber); }
.badge-red    { background: var(--red-soft);    color: var(--red); }
.badge-purple { background: var(--purple-soft); color: var(--purple); }
```

### Feature tags — `.tag`

Etiquetas de capacidad del producto. Usan `cyan-soft` background sin dot. Para módulos, funcionalidades, atributos.

```html
<span class="tag">Facturación</span>
<span class="tag">Real-time</span>
<a href="#modulos" class="tag">Stock</a>
```

```css
.tag {
  display: inline-flex; align-items: center;
  padding: 5px 10px; border-radius: var(--radius-pill);
  background: var(--cyan-soft); color: var(--cyan);
  font: 700 10px var(--mono); text-decoration: none;
}
@media (hover: hover) { a.tag:hover { background: var(--cyan); color: #fff; } }
```

**Diferencia con `.badge`:** el badge es para estados (activo, pendiente, error) y lleva dot. El `.tag` es para atributos de producto/módulo, sin dot.

---

### Cards / KPIs — sin borde

```css
.card {
  padding: 20px;
  border-radius: var(--radius);
  background: var(--bg-elev);
  box-shadow: var(--shadow-sm);   /* profundidad por sombra, no por borde */
}
.card-kicker {
  font: 700 10px var(--mono); letter-spacing: .12em;
  text-transform: uppercase; color: var(--muted-2);
}
.kpi-value {
  font: 700 28px var(--display); letter-spacing: -.03em;
  color: var(--text); margin-top: 8px;
}
.kpi-delta-positive { color: var(--green); }
.kpi-delta-negative { color: var(--red); }
```

### Grilla de KPIs — estirada o modulada *(nuevo en v1.2.7.11)*

`.kpi-grid` reparte todo el ancho disponible entre cuatro columnas. Sirve cuando hay
métricas suficientes para llenarlas. Con pocas, cada card se infla: **tres cards en una
página de 1440 px dan 428 px cada una** para mostrar un número de un dígito.

`.kpi-grid-auto` es la variante modulada: **módulo de 150 px**, las cards se apoyan a la
izquierda y bajan de línea si no entran. Los anchos posibles son 150, 312, 474 — múltiplos
del módulo más el gap, nunca un número suelto.

```css
.kpi-grid-auto {
  grid-template-columns: repeat(auto-fill, 150px);
  justify-content: start;
}
.kpi-card-w2 { grid-column: span 2; }
```

```html
<div class="kpi-grid kpi-grid-auto">
  <div class="kpi-card kpi-card-w2">…</div>   <!-- valor que no debe cortarse -->
  <div class="kpi-card">…</div>
  <div class="kpi-card">…</div>
</div>
```

**Reglas**

- El módulo es **150 px y no menos**. Es el más chico que mantiene la etiqueta en una
  línea: por debajo se parte en dos y la fila crece de 110 a 126 px de alto — más angosta
  pero más alta, que no es una mejora.
- `.kpi-card-w2` es **manual**. Se pone en la card que lleva un importe o una fecha con
  hora, para que el ancho doble sea una decisión de quien arma el tablero y no un efecto
  del largo del texto.
- La variante **se suma** a `.kpi-grid`, no la reemplaza: el `gap` y los breakpoints
  siguen valiendo.
- Cuándo usar cada una: **estirada** con seis o más métricas que llenan el ancho;
  **modulada** con pocas, o cuando los valores son cortos.

### Inputs — excepción borderless

```css
.input {
  width: 100%; padding: 9px 12px;
  border: 1px solid var(--line);  /* controles interactivos sí llevan borde */
  border-radius: var(--radius-sm);
  background: var(--bg-elev-2); color: var(--text);
  font: 400 14px var(--sans);
  transition: border-color 160ms, box-shadow 160ms;
  outline: none;
}
.input:focus {
  border-color: var(--cyan);
  box-shadow: var(--glow);
}
```

### Módulos accordion — sin borde, profundidad por sombra

```css
.module-card {
  background: var(--bg-elev);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.module-card[open],
.module-card.open {
  box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(0,195,240,.12);
}
```

### Panel

```css
.panel {
  background: var(--bg-elev);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: var(--space-5);
  display: flex; flex-direction: column; gap: var(--space-4);
}
```

### Tablas

```css
.table-wrap { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; font-size: 13px; }
.table th {
  font: 600 11px var(--mono); letter-spacing: .06em;
  text-transform: uppercase; color: var(--muted-2);
  padding: 8px 12px; border-bottom: 1px solid var(--line); text-align: left;
}
.table td {
  padding: 11px 12px; color: var(--muted);
  border-bottom: 1px solid var(--line);
}
.table tr:last-child td { border-bottom: none; }
.table tr:hover td { background: var(--bg-soft); }
```

### Celda de dos niveles — `.product-title` / `.product-sku`

Identificador y descripción apilados dentro de **una sola celda**, no en dos columnas.

```css
.product-title { font-weight: 600; }
.product-sku   { display: block; margin-top: 2px; font-size: 11px;
                 color: var(--muted-2); font-family: var(--mono); }
```

```html
<td>
  <strong class="product-title">A-0004-00012847</strong>
  <span class="product-sku">Abono mensual julio</span>
</td>
```

El `display: block` de `.product-sku` **es parte del componente**. Sin él, el `<span>` renderiza inline, el `margin-top` no aplica y la descripción queda pegada al identificador en la misma línea. Fue un defecto real: la regla existía desde antes con el `margin-top` pero sin el `display`, y salió a la luz cuando Mi Cuenta se volvió el primer consumidor de estas dos clases (30/07/2026).

**Anti-patrón:** separar el código y la descripción en columnas distintas. Duplica el ancho de la tabla y rompe el apilado en mobile.

> Documentado en el catálogo: **16 · Tablas**, ancla `#product-meta`.

---

### Nav item

```css
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: var(--radius-sm);
  font: 500 13px var(--sans); color: var(--muted);
  transition: all var(--transition-base);
}
.nav-item:hover  { background: var(--bg-soft); color: var(--text); }
.nav-item.active {
  background: var(--cyan-soft);
  color: var(--text-cyan-muted);    /* nunca --cyan directo */
  border-left: 2px solid var(--nav-item-active-border);  /* transparent — borderless */
}
```

---


### Load progress

Barra de carga con porcentaje. Aparece mientras la app se conecta al backend o carga datos pesados.

```html
<div class="load-progress">
  <div class="load-progress-track">
    <div class="load-progress-fill" style="width: 65%"></div>
  </div>
  <div class="load-progress-meta">
    <span>Conectando con el servidor...</span>
    <strong>65%</strong>
  </div>
</div>
```

- Fill: degradado `var(--cyan)` → `var(--green)`, animado con `transition: width 0.35s ease`
- Estado completo: `width: 100%`

---

### Session warning

Aviso inline no crítico. Para alertas de sesión, límites de uso, o información de contexto que requiere atención sin interrumpir el flujo.

```html
<p class="session-warning">
  Tu sesión expira en 10 minutos. Guardá tu trabajo antes de continuar.
</p>
```

- Color ámbar (`var(--amber)`) con fondo y borde sutiles
- Max-width 52ch — nunca ocupa todo el ancho

---

### Runtime banner

Banner de estado que ocupa el ancho completo de un panel. Dos variantes según el estado de conexión.

```html
<!-- Datos de prueba (mock) -->
<div class="runtime-banner" data-state="mock">
  <div>
    <span>Modo demo</span>
    <strong>Datos de ejemplo activos</strong>
    <p>Conectá tu empresa para ver datos reales.</p>
  </div>
  <button class="btn btn-primary">Conectar</button>
</div>

<!-- Error de conexión -->
<div class="runtime-banner" data-state="error">
  <div>
    <span>Sin conexión</span>
    <strong>No se pudo alcanzar el servidor</strong>
    <p>Revisa tu conexión o intenta más tarde.</p>
  </div>
</div>
```

- `data-state="mock"` → borde cyan + glow (app corriendo con datos de prueba)
- `data-state="error"` → borde rojo (fallo de conexión)
- Sin `data-state` → neutro, solo fondo oscuro semitransparente

---

### Skeleton / Shimmer

Placeholders animados que reemplazan el contenido mientras carga. Evitan el efecto de "pantalla en blanco" y comunican que algo viene.

```html
<div class="card skeleton-card">
  <div class="skeleton-line skeleton-label" style="margin-bottom:10px"></div>
  <div class="skeleton-line skeleton-value" style="margin-bottom:14px"></div>
  <div class="skeleton-line skeleton-text"></div>
  <div class="skeleton-line skeleton-text" style="width:80%;margin-top:6px"></div>
</div>
```

Clases de tamaño disponibles:

| Clase | Ancho | Alto | Uso |
|---|---|---|---|
| `.skeleton-label` | 42% | 12px | Etiqueta / kicker |
| `.skeleton-value` | 70% | 28px | Valor numérico grande |
| `.skeleton-text` | 100% | 12px | Línea de texto |

- Animación: `yiqi-shimmer` — barrido horizontal de luz de 1.4s
- Se adapta al modo claro automáticamente

---

### Coherence badge

Badge de estado para tablas de coherencia contable — compara totales entre comprobantes (pedidos, remitos, facturas, cobranzas) y marca si están alineados.

```html
<!-- Datos coherentes -->
<span class="coherence-badge is-good">98,2%</span>

<!-- Diferencia detectada -->
<span class="coherence-badge is-alert">87,4%</span>
```

- `.is-good` → verde, diferencia < umbral aceptable
- `.is-alert` → ámbar, diferencia supera el umbral


### Toggle switch — borderless

```html
<label class="switch-label">
  <div class="switch-track on"><div class="switch-thumb"></div></div>
  <span class="switch-text">Notificaciones por email</span>
</label>
<label class="switch-label">
  <div class="switch-track"><div class="switch-thumb"></div></div>
  <span class="switch-text" style="color:var(--muted)">Modo mantenimiento</span>
</label>
```

```css
.switch-label { display:flex; align-items:center; gap:12px; cursor:pointer; user-select:none; }
.switch-track {
  position:relative; width:40px; height:22px; flex-shrink:0;
  background:var(--bg-soft);
  border-radius:999px;
  box-shadow:var(--shadow-sm);   /* profundidad por sombra, no borde */
  transition:background 200ms ease;
}
.switch-track.on { background:var(--cyan); }
.switch-thumb {
  position:absolute; top:3px; left:3px;
  width:16px; height:16px;
  background:var(--text); border-radius:50%;
  box-shadow:0 1px 4px rgba(0,0,0,.28);
  transition:transform 200ms cubic-bezier(.4,0,.2,1), background 200ms ease;
}
.switch-track.on .switch-thumb { transform:translateX(18px); background:#fff; }
.switch-text { font:500 13px var(--sans); color:var(--text); }
```

- **Filosofía:** borderless — el track usa `box-shadow` en lugar de `border`
- Estado on: `var(--cyan)` como fondo, thumb blanco
- Estado off: `var(--bg-soft)`, thumb en `var(--text)`

### Checkbox — borderless

```html
<label class="checkbox-label">
  <div class="checkbox checked">
    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
  </div>
  Importar datos al guardar
</label>
<label class="checkbox-label">
  <div class="checkbox"></div>
  <span style="color:var(--muted)">Enviar notificación al proveedor</span>
</label>
```

```css
.checkbox-label { display:flex; align-items:center; gap:10px; cursor:pointer; user-select:none; font:500 13px var(--sans); color:var(--text); }
.checkbox {
  width:18px; height:18px; flex-shrink:0;
  background:var(--bg-soft);
  border-radius:var(--radius-sm);
  box-shadow:var(--shadow-sm);   /* profundidad por sombra, no borde */
  display:grid; place-items:center;
  transition:background 180ms ease, box-shadow 180ms ease;
}
.checkbox.checked { background:var(--cyan); box-shadow:none; }
.checkbox svg {
  width:11px; height:11px; fill:none; stroke:#fff;
  stroke-width:2.5; stroke-linecap:round; stroke-linejoin:round;
  opacity:0; transition:opacity 150ms ease;
}
.checkbox.checked svg { opacity:1; }
```

- **Filosofía:** borderless — unchecked usa `box-shadow`, nunca `border`
- Checked: `var(--cyan)` + checkmark SVG blanco inline

### Search Input

Componente de búsqueda borderless. Implementado en `site.css`.

```html
<div class="search-wrap">
  <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
  <input class="search-input" type="text" placeholder="Buscar…">
  <button class="search-clear" aria-label="Limpiar">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" width="14" height="14">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>
  <kbd class="search-kbd">⌘K</kbd>  <!-- opcional -->
</div>
```

```css
.search-wrap  { position: relative; display: block; }
.search-icon  { position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
                width: 15px; height: 15px; color: var(--muted-2); pointer-events: none; }
.search-input { width: 100%; height: 44px; padding: 0 40px;
                background: var(--bg-elev-2); border: 1px solid transparent;
                border-radius: var(--radius); color: var(--text);
                font: 400 13px var(--sans); outline: none; caret-color: var(--cyan); }
.search-input::placeholder { color: var(--muted-2); }
.search-input:focus { border-color: rgba(0,204,255,.3);
                      box-shadow: 0 0 0 3px var(--cyan-soft); }
.search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
                background: none; border: none; cursor: pointer;
                color: var(--muted-2); display: none; }
.search-clear.visible { display: block; }
.search-kbd   { position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
                font: 500 10px var(--mono); color: var(--muted-2);
                background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
                border-radius: 4px; padding: 1px 5px; pointer-events: none; }
.search-kbd.hidden { opacity: 0; }
/* Sin ícono izquierdo */
.search-input--no-icon { padding-left: 14px; }
```

- `search-clear` se muestra/oculta con `.visible` según si hay texto
- `search-kbd` se oculta con `.hidden` cuando el input tiene foco
- Sin borde por defecto, focus ring cyan

### Selector de período / rango

Filtro de rango temporal del topbar (Analytics Pro y paneles). Input compuesto: un solo botón activo a la vez. Documentado en catálogo §27 (Panel Gerencial) y showcase (Primitivos).

```css
/* Borderless — cápsula sin borde ni divisores (filosofía §04) */
.range-filter {
  display: inline-flex; align-items: center; gap: 2px;
  padding: 2px;
  border-radius: var(--radius-pill);
  background: var(--bg-elev-2);
}
.range-btn {
  padding: 6px 14px;
  font: 500 13px var(--sans); color: var(--muted);
  background: transparent; border: none;
  border-radius: var(--radius-pill);     /* pill, sin divisores */
}
.range-btn:hover         { background: var(--bg-soft); color: var(--text); }
.range-btn.is-active     { background: var(--cyan-soft); color: var(--cyan); font-weight: 600; }
.range-btn:focus-visible { outline: 2px solid var(--cyan-a28); outline-offset: -2px; }
```

```html
<div class="range-filter" role="group" aria-label="Período de análisis">
  <button class="range-btn is-active" type="button" data-range="last_7_days">Ult. 7 días</button>
  <button class="range-btn" type="button" data-range="current_month">Mes en curso</button>
  <button class="range-btn" type="button" data-range="last_30_days">Ult. 30 días</button>
</div>
```

- Un solo `.is-active` a la vez; la app togglea según `data-range`
- `role="group"` + `aria-label` en el contenedor; cada botón es `type="button"`
- **Borderless**: sin borde ni divisores; activo como pill `--cyan-soft` (filosofía §04)
- En el topbar se aplica `flex-wrap:nowrap` para que no rompa en 2 filas

---

### Botón de cerrar / icon button

Botón de ícono **borderless** (`.close-btn`) para cerrar menús, drawers y diálogos. Canónico en `styles.css` (y espejado en `site.css` para la web). Reemplaza las copias locales `.ds-nav-x`, `.sc-drawer-x`, `.mobile-nav-close`.

```css
.close-btn {
  display: grid; place-items: center; width: 38px; height: 38px;
  border: none; border-radius: var(--radius-sm);
  background: transparent; color: var(--muted); cursor: pointer;
}
.close-btn:hover         { color: var(--text); background: var(--bg-soft); }
.close-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cyan-soft); }
```

- Solo apariencia; el **posicionamiento** es contextual (absoluto en el nav, flex-end en el drawer)
- Documentado en catálogo §10 (Botones) → ancla `#close-btn`

---

### Alert badge

Badge rojo (`.alert-badge-dot`) sobre un ícono contenedor (`.alert-badge`) para notificaciones/alertas. Canónico en `styles.css`. Documentado en catálogo §10 → ancla `#alert-badge`.

```html
<button class="alert-badge" aria-label="Alertas (3)">
  <svg>…campana…</svg>
  <span class="alert-badge-dot">3</span>
</button>
```

---

### Favorito (star toggle)

Estrella de favorito **borderless** (`.fav-star`): outline en reposo, **ámbar relleno** al marcar (`.is-active`). No es una alerta — no lleva badge. Canónico en `styles.css`, catálogo §11 → ancla `#fav-star`.

```html
<button class="fav-star" type="button" aria-pressed="false" aria-label="Marcar como favorito">
  <svg>…estrella…</svg>
</button>
```

- Toggle por JS: alterna `.is-active` + `aria-pressed`
- Borderless, foco accesible (ring `--cyan-soft`)

---

### Avatar / Tag / Tooltip *(canónicos en styles.css)*

**Avatar** (`.avatar`): círculo con **iniciales multicolor** (`.avatar--cyan|green|amber|red|blue`) y soporte de **imagen** (SVG) que cae a iniciales si falla:

```html
<span class="avatar avatar--green">
  <img src="…avatar.svg" alt="" onerror="this.remove()"> LR
</span>
```

- Imagen: **DiceBear `notionists`** — SVG vectorial por seed-URL (`api.dicebear.com/9.x/notionists/svg?seed=`). Para self-host real: guardar el `.svg` en `assets/` o inline-arlo en el markup (cero dependencia de CDN).
- Tamaños: `.avatar--sm` (30px) / base 36px / `.avatar--lg` (44px). Borderless.

**Tag** (`.tag`): pill borderless mono, `--cyan-soft`. **Tooltip** (`.tooltip-box` / `--elev`): caja borderless. Documentados en catálogo §22 → ancla `#avatar`.

---

### Inputs — canónico `.ds-input`

Familia canónica en `styles.css`: `.ds-input`, `.ds-select`, `.ds-textarea`, con `.ds-input-wrap` + `.ds-input-icon` + `.ds-input-shortcut` (⌘K) y estado `.err` (fondo `--red-soft`). Borderless. Reposo **recessed** (`--bg`, contrasta dentro de cards `bg-elev-2`); **foco** se aclara a `--bg-soft` (sin ring); error con fondo `--red-soft`. Se usa `background-color` (no shorthand) para no pisar el chevron del `.ds-select`.

```html
<div class="ds-input-wrap">
  <svg class="ds-input-icon">…</svg>
  <input class="ds-input" placeholder="Buscar…">
  <kbd class="ds-input-shortcut">⌘K</kbd>
</div>
<input class="ds-input err">
```

- Deprecadas: `.input` (estaba en `ds-doc.css`) y `.sc-input` (showcase) — son la misma cosa con otro nombre.
- El buscador de tablas (`.table-toolbar-search`) usa este primitivo: `.ds-input-wrap` + `.ds-input-icon` + `.ds-input` (solo aporta `min-width`).

---

---

### Banner de apps (Marketplace) *(nuevo en v1.2.7)*

Banner promocional por app del Marketplace. Web component `<app-banner app="…">` (`ana | prov | inv | pos | pick | cons`), con variante `variant="vertical"`. Paleta invertida (tarjeta clara) como el banner de Analytics Pro; gradiente sutil con el acento. **El acento es 100% por token, uno por app, NUNCA cyan** (el cyan es la marca madre YiQi, presente solo en el logo del lockup).

| App | Acento (token) | Estado |
|---|---|---|
| Analytics Pro | `--violet` | Disponible |
| Front de Proveedores OCR | `--orange` | En desarrollo |
| Inventariado Mobile | `--green` | En desarrollo |
| YiQi POS | `--amber` | Disponible |
| Picking List | `--magenta` | En desarrollo |
| Consulta de pedidos | `--blue` | En desarrollo |

```html
<script src="components/app-banner.js" defer></script>
<app-banner app="inv"></app-banner>
<app-banner app="ana" variant="vertical"></app-banner>
```

Reglas:
- Acento vía `var(--<token>)`; el logo YiQi usa `var(--cyan)`/`var(--text)` (paleta invertida del banner). Cero color suelto en el componente.
- **CTA de color de app** (`.mb-cta` / `--accent`): fondo = color de la app; **tinta legible** `--accent-ink` (clara sobre acentos oscuros como violeta, oscura sobre los claros). Aplica a todas las apps (ficha, banner y bundles).
- Lleva ícono de la app + lockup "Homologado por YiQi" + slot de ilustración (imagen Gemini), a altura completa.
- Analytics Pro tiene **dos versiones**: el banner premium (`<analytics-pro-banner>`) y esta variante unificada.
- Catálogo: §30 · Web → "Banners de apps" (`#app-banners`).

## 9. Iconografía

**HTML standalone:** usar **SVG stroke inline**. El CDN de Phosphor puede fallar offline.

```html
<!-- Ejemplo SVG inline (recomendado para standalone) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
     width="16" height="16">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>
</svg>
```

**Next.js:** Phosphor Icons sigue siendo válido.

```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
```

| Ícono Phosphor | Módulo |
|---|---|
| `ph-house` | Inicio / Dashboard |
| `ph-chart-line-up` | Reportes / Analytics |
| `ph-shopping-cart` | Compras |
| `ph-package` | Inventario |
| `ph-receipt` | Facturación |
| `ph-users` | CRM / Clientes |
| `ph-gear-six` | Configuración |
| `ph-bell` | Notificaciones |
| `ph-magnifying-glass` | Búsqueda |

---

## 10. Principios UX

YiQi Design no es estética. Es diseño de **superficies de decisión sobre datos de negocio**.

**Pregunta central:** ¿Qué tiene que decidir el usuario ahora?

**Arquitectura de pantalla (orden obligatorio):**
1. Contexto — Hero card
2. Estado — KPIs
3. Dirección — Tendencias / gráficos
4. Diagnóstico — Tabla de detalle
5. Acción — CTA / decisión

**Regla:** arriba → decisión / abajo → explicación.

**Touch behavior:** envolver `:hover` en `@media (hover: hover)` para evitar el "doble tap" en móvil. Agregar `touch-action: manipulation` en elementos clickeables (divs con onclick, cards accordion, etc.).

```css
@media (hover: hover) {
  .card:hover { background: var(--cyan-soft-2); }
}
.card { touch-action: manipulation; cursor: pointer; }
```

**Anti-patrón:** títulos bicolor (texto + `em` en cyan) — recurso genérico sobreusado. Usar siempre `var(--text)` en títulos.

**Color semántico:** cyan = foco/acción · green = positivo · amber = alerta · red = crítico · muted = secundario.

---

## 11. Toggle de tema — 3 pasos *(actualizado en v1.2.7.3)*

El toggle tiene tres estados: **Oscuro / Sistema / Claro**. `Sistema` es el default — respeta la preferencia del sistema operativo del usuario.

**v1.2.7.3 — borderless.** El contenedor `.theme-toggle` va sin fondo ni sombra: los tres íconos quedan sueltos sobre la barra. El estado activo se marca con `--cyan-soft` y texto `--cyan`, no con un fondo gris. Unifica el toggle de topbar con el del sidebar (`.sb-theme-switch`), que ya usaba cyan.

```html
<html data-theme="system" lang="es">

<!-- Segmented control en topbar -->
<div class="theme-toggle" role="group" aria-label="Tema">
  <button class="theme-opt" onclick="setTheme('dark')">Oscuro</button>
  <button class="theme-opt" onclick="setTheme('system')">Sistema</button>
  <button class="theme-opt" onclick="setTheme('light')">Claro</button>
</div>
```

```js
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
applyTheme(resolveTheme());
```

> ⚠️ `toggleTheme()` binario está **deprecated** desde v1.2.5. Usar `setTheme(v)`.

---

## 12. Uso semántico del color

| Color | Token | Uso |
|---|---|---|
| Cyan | `--cyan` | CTA, links, foco, acción principal |
| Cyan muted | `--text-cyan-muted` | Subtítulos activos, kickers, labels acento |
| Green | `--green` | Éxito, positivo, incremento |
| Amber | `--amber` | Advertencia, instalación, acción secundaria |
| Red | `--red` | Error, peligro, decremento, eliminación |
| Indigo | `--indigo` | Acento — `created` en barra de coherencia + categorías decorativas (reemplaza al viejo `--purple`) |
| Muted | `--muted` | Texto secundario, estados neutrales |

**Regla:** el color es semántico, nunca decorativo. No hardcodear hex — siempre tokens.

> **Excepción documentada — `--text-white`:** el contador de `.alert-badge-dot` (campanita) usa `color: var(--text-white)` (#ffffff fijo) porque va sobre el rojo sólido y no debe adaptarse al tema. Es la única utilidad de blanco constante; no se usa para texto general.

> **Excepción documentada — `--text-on-amber`:** texto oscuro fijo (`#1a0d00`) para chips/badges ámbar (mejor contraste que blanco sobre ámbar). Constante en ambos temas, igual que `--text-white`.

---

## 13. Reglas críticas de implementación

1. **Tokens siempre** — nunca hardcodear colores (`background: #000`, `fill="#17191c"`, etc.)
2. **Logo SVG inline** — nunca `<img>`. Símbolo Q adaptado por tema vía `var(--cyan)`.
3. **Borderless philosophy** — elementos de display sin borde; profundidad con `box-shadow: var(--shadow-sm)`. Excepción: inputs, selects, textareas, switches, checkboxes.
4. **Fondo sin grilla** — solo 2 radiales cyan. Sin `background-size` de grilla.
5. **`data-theme="system"` como default** — nunca `"dark"` ni `"light"` hardcodeado.
6. **Toggle 3 pasos** — `setTheme(v)` con `"dark" | "system" | "light"`. No `toggleTheme()`.
7. **`--text-cyan-muted`** — para estados activos y labels con acento. Nunca `var(--cyan)` directo en texto de estado.
8. **Greycliff CF Heavy** (`var(--display)`, fallback Plus Jakarta) en títulos y heroes; cifras en `--mono`/`--kpi-num` (IBM Plex Mono).
9. **SVG inline para íconos** en HTML standalone — no Phosphor CDN sin fallback.
10. **Spacing múltiplos de 4** — sin valores arbitrarios.
11. **Archivos self-contained** — fuentes y scripts embebidos o desde CDN confiable.
12. **Convención de nombres** — `[proyecto]-v1_0_0.html` (puntos → guiones bajos).
13. **Trazabilidad obligatoria de KPIs** — cada indicador visible debe incluir origen validable: módulo + campo(s) + agregado/fórmula + periodo.
14. **Composición de cuentas visible** — cuando un indicador represente una cuenta o total compuesto, debe aclarar qué incluye, qué excluye y con qué criterio.
15. **No inventar datos faltantes** — si la fuente no está disponible, mostrar estado "No disponible" o "Dato de ejemplo" explícitamente.

---

## 14. Checklist antes de deploy

- [ ] `data-theme="system"` en `<html>` como estado inicial
- [ ] Variables CSS completas en `:root` y `html[data-theme="light"]`
- [ ] Token `--text-cyan-muted` declarado en ambos modos
- [ ] Logo YiQi en SVG inline (nunca `<img>`)
- [ ] Fuentes Plus Jakarta Sans + Inter + IBM Plex Mono cargadas
- [ ] `overflow-x: clip` en `html, body` — no `hidden` (rompe `position: sticky`)
- [ ] `min-width: 0` en todos los containers del grid
- [ ] Toggle 3 pasos: `setTheme()` + `resolveTheme()` + listener `prefers-color-scheme`
- [ ] Cards, panels, badges sin `border` — profundidad por `box-shadow`
- [ ] Fondo con solo 2 radiales cyan (sin grilla `background-size`)
- [ ] Colores hardcodeados reemplazados por custom properties
- [ ] CTA canónica: **"Reserva tu demo"** (sin voseo)
- [ ] Nombre de marca: **YiQi**
- [ ] Footer con versión DS: `· DS v1.2.7`
- [ ] Todo KPI visible muestra fuente validable (módulo + campo(s) + agregado/fórmula + periodo)
- [ ] KPIs derivados o cuentas compuestas incluyen fórmula/composición en ayuda contextual
- [ ] KPIs sin fuente disponible se muestran como no disponibles o demo, nunca como reales

---

## 15. Dependencias estándar

```html
<!-- Fuentes -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Iconos (solo Next.js — en standalone usar SVG inline) -->
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">

<!-- Charts (cuando aplique) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

---

---

## 16. Patrón — Tabla de implementación

Combina un **timeline de 4 pasos numerados** con una **infografía de plazos por fases**. Se usa en propuestas e informes para comunicar el proceso de puesta en marcha.

### Clases

Prefijo `impl-` en todas las clases para evitar colisiones.

| Clase | Elemento |
|---|---|
| `.impl-timeline` | Grid de 4 columnas para los pasos |
| `.impl-tl-step` | Contenedor de cada paso (nodo + contenido) |
| `.impl-tl-node` | Círculo numerado en `var(--cyan)` |
| `.impl-tl-content` | Título + descripción centrados bajo el nodo |
| `.impl-plazos-card` | Card de plazos con barra + detalle |
| `.impl-plazos-bar` | Barra de 3 fases: cyan · green · amber |
| `.impl-plazos-phases` | Grid de 3 columnas con descripción por fase |
| `.impl-plazos-note` | Nota al pie con íconos y lista de aclaraciones |

### Tokens usados

`--bg-elev-2` · `--radius-lg` · `--shadow-sm` · `--cyan` · `--green` · `--amber` · `--mono` · `--display` · `--line`

### Fases de la barra (colores)

| Fase | Color | Semanas orientativas |
|---|---|---|
| Configuración | `--cyan` (25%) | Sem 1–3 |
| Módulos e integraciones | `--green` (42%) | Sem 4–8 |
| Ajuste · Go live | `--amber` (33%) | Sem 9–12 |

### Reglas

- El total de semanas se destaca con `font-size: 18px` en `var(--text)`, antecedido por el número en negrita.
- La nota al pie usa flex con ícono SVG inline alineado al tope + lista con `›` en `var(--cyan)`.
- Responsive: en `≤ 760px` el timeline pasa a 2 columnas; en `≤ 480px` a 1 columna y la línea conectora desaparece.

---

## 17. Patrón — Contador animado

Función `runCounters()` que anima cifras de `0` al valor destino con easing cúbico en 900 ms. Sin dependencias. Activación por `IntersectionObserver`.

### Atributos HTML

| Atributo | Tipo | Descripción |
|---|---|---|
| `data-count` | number | Valor destino. Requerido. |
| `data-prefix` | string | Texto antes de la cifra. Ej: `$` |
| `data-suffix` | string | Texto después de la cifra. Ej: `%`, ` ped.` |

### Función canónica

```js
function runCounters(root = document) {
  root.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isInt  = Number.isInteger(target);
    const dur    = 900;
    let start = null;
    function fmt(v) {
      return isInt
        ? prefix + Math.round(v) + suffix
        : prefix + v.toFixed(1).replace('.', ',') + suffix;
    }
    el.textContent = fmt(0);
    function step(ts) {
      if (!start) start = ts;
      const p    = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      el.textContent = fmt(ease * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// Activación por IntersectionObserver
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { runCounters(e.target); io.unobserve(e.target); } });
}, { threshold: 0.3 });
document.querySelectorAll('.kpi-block').forEach(b => io.observe(b));
```

### Reglas

- Siempre inicializar los elementos en `0` antes de que el usuario los vea (evitar flash del valor final).
- Decimales: usar coma como separador decimal (`toFixed(1).replace('.', ',')`).
- Activar por `IntersectionObserver` cuando la cifra está fuera del viewport inicial.
- Tipografía canónica para cifras: `IBM Plex Mono`, `font-variant-numeric: tabular-nums`.

---

## 18. Patrón — Pantalla de acceso (Login) *(nuevo en v1.2.7)*

Login centrado para apps YiQi (ERP, Analytics Pro). Card única, sin recuadros superfluos.

### Estructura
- **Logo animado** (≤260px) en loop (ver "Logo animado en loop" abajo).
- Línea de marca en una sola línea, muted: `Analytics Pro. Tu negocio en 5 segundos.`
- **Slot de estado** (`.auth-status`) con altura reservada (no desplaza la card al aparecer).
- **Card** (`background: var(--bg-elev-2)`, `border: 1px solid var(--line)`, `radius-xl`) con el formulario.
- **Footer**: `www.yiqi.com.ar` (link centrado).

### Terminología canónica
`Usuario o correo electrónico` · `Contraseña` · `Mantener sesión iniciada` · `Iniciar sesión` · `¿Olvidaste tu contraseña?`

### Formulario
- Campo contraseña con botón **ojo** (`#i-eye` / `#i-eye-slash`) para mostrar/ocultar.
- **Mantener sesión iniciada**: checkbox `accent-color: var(--cyan)` (persiste el usuario).
- **¿Olvidaste tu contraseña?**: link muted, **dentro de la card, debajo del botón, alineado a la izquierda** (`justify-self: start`).

### Estado de acceso sin reflow
El mensaje (validando / error / éxito) aparece **sin mover la card**: reservar espacio con `min-height` y alternar `visibility`, nunca `display`.

```css
.auth-status { min-height: 18px; text-align: center; border: none; background: none; }
.auth-status[data-state="idle"]    { visibility: hidden; }
.auth-status[data-state="loading"] { color: var(--cyan); }
.auth-status[data-state="success"] { color: var(--green); }
.auth-status[data-state="error"]   { color: var(--red); }
```

### Override de autofill
El navegador pinta los campos autocompletados de celeste; forzar tokens DS:

```css
input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--text);
  -webkit-box-shadow: 0 0 0 1000px var(--bg-elev) inset;
  caret-color: var(--text);
  transition: background-color 9999s ease-in-out 0s;
}
```

### Logo animado en loop *(nuevo en v1.2.7)*
Variante del motor `YiQiLogo` (§0): animar **solo el flip de la Q y los dos puntos** (sin el "rise" de las letras), en loop, con `data-loop="<gapMs>"`:

```html
<svg data-yiqi-logo data-axis="y" data-loop="2600" ...> … </svg>
```

- Reproduce el flip al cargar y lo repite cada `~1450ms + gap`.
- Respeta `prefers-reduced-motion` (no loopea).

### Tamaño del logo — token `--login-logo-w` *(nuevo en v1.2.7)*

El ancho del logo en la pantalla de acceso es **260px**, tokenizado (no hardcodear el valor):

```css
.yiqi-login-logo { width: var(--login-logo-w); }   /* --login-logo-w: 260px */
```

Definido en `styles.css` junto al resto de tokens `--login-*`.

## 19. Patrón — Aplicaciones (App shell) *(nuevo en v1.2.7)*

Marco común para todas las apps YiQi del marketplace: **topbar + sidebar + área de contenido**. Se toma del DS; cada app solo construye lo de adentro. Las apps comparten tokens, paleta, radios y sombras con la web; lo que cambia es intencional, no deriva.

### Anatomía del shell

| Parte | Clase | Notas |
|-------|-------|-------|
| Barra superior | `.topbar` | Sticky, alto 56px, fondo translúcido + `backdrop-filter: blur(16px)`, borde inferior `--line`. |
| Pill de producto | `.t-pill` | Mono 10px mayúsculas, borde `--line`, fondo `--bg-elev-2`, color `--muted`. |
| Chip de cuenta | `.account-chip` | Avatar inicial + usuario (`--muted`) + esquema (`--text`) en sans. |
| Selector de esquema | `.schema-toggle` | Botón `aria-haspopup` con menú de esquemas borderless (apps multi-esquema). |
| Actualizar | `.btn-refresh` | Botón **solo ícono** (`ph-arrows-clockwise`), pill `--cyan-soft-2`/`--cyan`; re-renderiza la vista. |
| Cerrar sesión | `.btn-exit` | Pill `--bg-elev-2`/`--muted`; hover `--red`. |
| Contenedor lateral | `.sidebar` | Sticky, altura `100vh − topbar`, scroll propio, flex column. |
| Item de navegación | `.nav-item` | Alto 40px, sans 13px. Activo: fondo `--cyan-soft`, texto `--cyan`. |

El área de contenido es lo único propio de cada app. El footer del shell muestra `© <año> YiQi S.A.` y la versión del DS.

## 20. Patrón — Animación de gráficos *(nuevo en v1.2.7)*

Animaciones de entrada consistentes para todos los charts (Chart.js 4.4.0). Los gráficos leen `--cyan` vía `getComputedStyle` y se adaptan al tema.

```js
// Patrón canónico — pegar en options{} de cualquier chart
const chartAnim = {
  duration: 900,               // 900 barras · 1000 línea · 1000 donut
  easing:   'easeOutQuart'
};

// Respetar prefers-reduced-motion
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) chartAnim.duration = 0;

// Uso en new Chart()
options: {
  animation: chartAnim,
  // ...
}
```

Regla: toda animación debe anularse (`duration: 0`) cuando el usuario pidió `prefers-reduced-motion: reduce`.

## 21. Componente — Banner Analytics Pro *(nuevo en v1.2.7)*

Componente promocional **para la web** (no es una app): banner de difusión de Analytics Pro con mock de dashboard (4 KPIs, chart con ejes, top categorías) y una sola CTA. Implementado como web component self-contained.

```html
<!-- Cargar el componente una vez -->
<script src="components/analytics-pro-banner.js" defer></script>

<!-- Usar -->
<analytics-pro-banner base="./"></analytics-pro-banner>
```

- `base`: prefijo de rutas (por defecto `./`).
- `preview` (opcional): ruta a un preview; si falta, el banner igual renderiza su mock inline.
- Centrado, `max-width` ~1240px; el mock no se estira en pantallas anchas.
- Requiere Chart.js disponible en la página.


## 22. Patrón — Enlace cruzado (`ds-xref`) *(nuevo)*

Afordance **meta** para navegar entre el catálogo y el showcase ("Ver fuente" / "Ver en vivo"). Es metalenguaje de documentación, **no** un componente de producto: por eso es deliberadamente distinto del `.btn`.

### Anatomía

- Sin caja: `inline-flex`, `border:none`, `background:transparent`.
- `font:600 12.5px var(--sans)`, color `var(--muted-2)`, ícono `ph-arrow-square-out` (14px).
- Hover/focus: color `var(--cyan)` + `background:var(--cyan-soft)`; focus-visible con ring `0 0 0 3px var(--cyan-soft)`.

### Reglas

- Usar **solo** para saltar entre superficies de documentación (catálogo ↔ showcase). Nunca como CTA de producto.
- Viaja pegado al título del componente; no compite con el contenido.
- 100% tokens existentes; definido una sola vez en `styles.css` (fuente única).
- Catálogo: §34. Deep-link al showcase con `?tab=<vista>&card=<id>`.


## 22b. `ds-doc.css` = solo chrome del catálogo *(limpieza)*

`ds-doc.css` ya **no re-declara** componentes canónicos. Se eliminaron las copias de `.btn`, `.badge`, `.switch-track/thumb/label/text`, `.checkbox*`, `.card-accent` y la familia `.input` (todos viven en `styles.css`). Esto evita *drift* y override accidental — p. ej. el toggle del catálogo recupera su versión borderless.

`ds-doc.css` conserva únicamente lo propio del catálogo: navegación, helpers de demo (`.ph-tag`, `.card-kicker/value/delta`) y posicionamiento de chrome. Regla: si un componente se usa fuera del catálogo, su fuente es `styles.css`; `ds-doc.css` no lo redefine.

## 23. Primitivos interactivos en el catálogo (§33–§18) *(nuevo)*

Los primitivos que vivían solo en el showcase ahora tienen **fuente canónica** en el catálogo, con demo en vivo y CSS en `styles.css` (fuente única de componentes):

| Primitivo | Sección catálogo | Clases | JS (data-attr) |
|---|---|---|---|
| Slider | §33 `#prim-slider` | `.pr-slider`, `.pr-slider-val` | readout por id |
| Tabs | §36 `#prim-tabs` | `.pr-tabbar`, `.pr-tabbtn`, `.pr-tabpanel`; variante `.pr-tabbar--flat` (estilo Nav item: sin track, `radius-sm`) | `[data-pr-tabs]` |
| Dialog | §37 `#prim-dialog` | `.sc-modal*` | `[data-pr-dialog]` / `[data-pr-dialog-close]` |
| Dropdown | §38 `#prim-dropdown` | `.pr-pop-wrap`, `.pr-menu*` | `[data-pr-menu]` |
| Popover | §39 `#prim-popover` | `.pr-menu.pr-pop` | `[data-pr-menu]` |
| Toast | §18 `#prim-toast` | `.pr-toasts`, `.pr-toast` | `[data-pr-toast]` + host `#prToasts` |

Tres primitivos más se documentan en secciones existentes: **Switch/Check → §12 Inputs**, **Tooltip → §22 Varios**, **Accordion → §15 Navegación**.

### Enlace cruzado

Cada primitivo está unido a su demo con el afordance `.ds-xref` (§26) en los dos sentidos: "Ver fuente" (showcase → catálogo) y "Ver en vivo" (catálogo → showcase, con deep-link `?tab=primitivos&card=<id>` que abre la vista y centra la card).


## 24. Aplicaciones — Picking (propuesta) *(nuevo)*

Vocabulario de primitivos para la app de picking (lector de códigos + flujo de depósito). Catálogo **§29 · Aplicaciones** (`#apps-picking`); demo en el showcase (tab Mockups, `#card-picking`); enlazados en ambos sentidos con `.ds-xref`. **Datos simulados**, no toca producción — banner `DATOS SIMULADOS · PROPUESTA · NO MODIFICA YIQI`. 100% tokenizado (`var()` + `color-mix`).

### Primitivos propuestos

- **Flujo**: progress card (barra + % + ítems), status chips (pendiente / en proceso / completado), result state (éxito / error / not-found), key-value list, callout de ubicación.
- **Escaneo**: scanner viewport (marco `var(--cyan)`) con **barra de scan fija** en `var(--red)` y brillo claro que recorre en horizontal (`.pk-scanline` + `@keyframes pk-sheen`); al confirmar un scan pasa a estado `.is-added` → barra y contorno en `var(--green)` y aparece el pill **“Agregado”** (`.pk-added-pill`). Además: stepper de zoom, input group.
- **Estructura**: icon buttons, avatar chip, section header + contador, truncate "Leer más", list item card, banner / notice persistente.
- **Estados**: skeleton, empty state, error de cámara.
- **Finalización**: pantalla de cierre del flujo (`.pk-done`) cuando todos los scans están completos.

Es una **propuesta visual**: nombres de clase, props y JS se formalizan cuando llegue el funcional de la app.

### Pantalla de finalización (`.pk-done`)

Hero de cierre del flujo de picking: se muestra cuando todos los artículos pendientes fueron procesados. **Borderless** — separa por fondo (`--bg-elev`) y sombra (`--shadow-lg`), nunca por borde de acento. El ícono reusa el idioma de éxito del DS (`--green-soft` / `--green`); el aviso superior es el primitivo `.pr-toast` (no se redefine). El título usa `--display` por ser un hero de cierre. CTA = botón primario del DS. Catálogo: **§38 · Picking → Finalización** (`#pk-done`); demo en el showcase (`#card-picking`).

```css
.pk-done{
  display:flex; flex-direction:column; align-items:center; text-align:center;
  gap:14px; max-width:380px; margin:0 auto; padding:36px 28px;
  background:var(--bg-elev); border-radius:var(--radius-md); box-shadow:var(--shadow-lg);
  animation:hfIn .3s ease;
}
.pk-done-icon{
  width:72px; height:72px; border-radius:50%;
  background:var(--green-soft); color:var(--green);
  display:grid; place-items:center; margin-bottom:2px;
}
.pk-done-kicker{ font:700 10px var(--mono); letter-spacing:.14em; text-transform:uppercase; color:var(--green); margin:0; }
.pk-done-title{ font:600 26px/1.2 var(--display); letter-spacing:-.02em; color:var(--text); margin:0; }
.pk-done-sub{ font:400 13px/1.4 var(--sans); color:var(--muted); max-width:300px; margin:0; }
.pk-done .btn{ width:100%; justify-content:center; margin-top:8px; }
```

```html
<div class="pk-done">
  <div class="pk-done-icon"><i class="ph ph-check"></i></div>
  <p class="pk-done-kicker">Scans completos</p>
  <h3 class="pk-done-title">Picking List terminada</h3>
  <p class="pk-done-sub">Todos los artículos pendientes fueron procesados.</p>
  <button class="btn btn-primary" type="button">Volver a Picking Lists</button>
</div>
```

**Reglas**: solo tokens (cero hex); sin borde de acento ni franja lateral; `--display` solo en el título (hero); dark/light vía tokens; el toast de confirmación es la variante `.pr-toast.is-success` (ver abajo), no un componente nuevo.

### Toast · variante success (`.pr-toast.is-success`)

Variante tonal del primitivo de toast (§26) para confirmaciones de peso, como el cierre del flujo de picking. Fondo `--green-soft`, texto e ícono `--green`, **sin ring** (borderless, separa por fondo). Botón de cierre opcional `.pr-toast-close`. No altera el toast neutro ni el comportamiento de stack del primitivo; la posición la define la app. Pantalla compuesta (toast + `.pk-done`) en el showcase: `#card-picking-done`.

```css
.pr-toast.is-success{ align-items:flex-start; background:var(--green-soft); box-shadow:var(--shadow-lg); }
.pr-toast.is-success .ph{ color:var(--green); }
.pr-toast.is-success strong{ color:var(--green); }
.pr-toast.is-success span{ color:var(--green); opacity:.8; }
.pr-toast-close{ flex-shrink:0; margin-left:auto; width:22px; height:22px; display:grid; place-items:center; border:none; border-radius:var(--radius-sm); background:none; color:var(--muted); opacity:.65; cursor:pointer; font-size:13px; transition:opacity .15s; }
.pr-toast-close:hover{ opacity:1; }
.pr-toast.is-success .pr-toast-close{ color:var(--green); }
```

```html
<div class="pr-toast is-success show">
  <i class="ph ph-check-circle-fill"></i>
  <strong>Picking List terminada. Todos los scans están completos.</strong>
  <button class="pr-toast-close" type="button" aria-label="Cerrar">&times;</button>
</div>
```


---

## 25. Kit de panel *(nuevo en v1.2.7.5)*

Nueve componentes promovidos desde **Analytics Pro**, que los tenía como CSS local. Catálogo **§52–§60** (grupo *Kit de panel*); un ejemplo de cada uno en el showcase, pestaña **Analytics Pro**. En `styles.css` son las secciones **§44–§52** — el catálogo y el CSS numeran distinto.

| Catálogo | CSS | Componente | Clase raíz |
|---|---|---|---|
| §52 | §44 | Statusbar | `.statusbar` + `.ldot` |
| §53 | §45 | Herramientas del sidebar | `.sidebar-tools` |
| §54 | §46 | Navegación en tabs | `.app-shell.nav-tabs`, `.tab-item`, `.btn-layout` |
| §55 | §47 | Fuente de datos | `.src-item` / `.src-card` |
| §56 | §48 | Ranking con barra | `.branch-list` |
| §57 | §49 | Watchlist tonal | `.wl-bar`, `.tone-*` |
| §58 | §50 | Card clickeable | `.kpi-clickable` / `.card-clickable` |
| §59 | §51 | Sin dato | `.kpi-na`, `.trend-empty` |
| §60 | §52 | Carrusel de KPIs | `.more-kpis` |

### Statusbar

Barra de estado fija al pie, alto `--statusbar-h` (28px), fondo `--bg-elev`, `--shadow-sm`. **Borderless.** Se oculta bajo 980px. El layout tiene que descontarla:

```css
.sidebar { height: calc(100vh - var(--topbar-h) - var(--statusbar-h)); }
.content { padding-bottom: calc(40px + var(--statusbar-h)); }
```

El bloque izquierdo trunca con elipsis (solo `.statusbar-desc`); el derecho nunca se recorta. El punto de estado `.ldot` con `-g` / `-a` / `-r` es reutilizable fuera de la barra.

### Al canonizar se limpiaron cuatro cosas

Lo que venía de Analytics Pro no entró tal cual:

- `.watchlist-card.tone-* .metric-icon` perdió el `border-color` — el acento va por **fondo tonal**, no por borde (§3).
- `.kpi-clickable` perdió `transition: border-color`, que no tenía efecto: la card no lleva borde.
- `.tab-nav` tenía `padding` declarado dos veces; quedó uno.
- `#runtime-description` (un ID de la app) pasó a la clase `.statusbar-desc`.

### Qué NO se promovió

- **`.login-input` y familia** — traen `border: 1px solid var(--line)` y chocan con `.ds-input` borderless. Sin resolver: o la app usa `.ds-input`, o el DS acepta un input con borde.
- **`styles-cockpit.css` y `styles-chart-modal.css`** de Analytics Pro (~115 bloques) — son una vista específica del producto, no biblioteca.

---

## 26. Token `--cyan-night` *(nuevo en v1.2.7.5)*

Relleno de las **barras de dato**: embudo, franja horaria y ranking de sucursal. El `--cyan` pleno compite con el verde de estado cuando hay varias barras juntas; el noche baja el volumen sin salirse de la marca.

**En modo claro vale `var(--cyan)`** — ahí el cyan ya viene apagado y bajarlo más lo dejaba pesando como si fuera texto. Es el mismo token con distinto valor por tema, así que los componentes no se enteran.

```css
/* ✅ Uso correcto — relleno de barra de dato */
.funnel-fill      { background: var(--cyan-night); }
.hourly-bar-fill  { background: var(--cyan-night); }
.branch-fill      { background: var(--cyan-night); }

/* ❌ Incorrecto — acentos, texto y estados siguen con --cyan */
.nav-link.is-active { color: var(--cyan-night); }
```

### Altura de barras

Las tres barras horizontales están unificadas en un mismo bloque del canónico y **se cambian juntas**:

| Barra | Alto | Clase |
|---|---|---|
| Dato (embudo, franja, sucursal) | **4px** | `.funnel-track`, `.hourly-bar-track`, `.branch-bar` |
| Watchlist | 6px | `.wl-bar` |
| Carga en la topbar | 2px | `.load-progress--topline` |

---

## 27. Foco por teclado *(nuevo en v1.2.7.6)*

**Anillo separado, y nada más.** El componente no cambia de fondo al enfocarse: el anillo ya dice "estás acá", y dos señales para lo mismo se leen como dos estados distintos.

```css
.ds-input:focus-visible,
.ds-select:focus-visible,
.ds-textarea:focus-visible,
.btn:focus-visible,
.kpi-clickable:focus-visible,
.card-clickable:focus-visible {
  outline: 2px solid var(--cyan-night);
  outline-offset: 2px;
}
```

| Regla | Valor | Por qué |
|---|---|---|
| Color | `--cyan-night` | El mismo cyan apagado de las barras de dato. **4.1:1** en oscuro, **3.1:1** en claro. |
| Grosor | 2px | |
| Separación | `outline-offset: 2px` | Sin el aire, el anillo se lee como **borde del componente** en vez de como estado — y contra el borde de `.btn-primary` se ve doble. |
| Fondo | No cambia | Antes `.ds-input:focus` pasaba a `--bg-soft`: redundante y confuso. |
| Disparador | `:focus-visible` | El anillo aparece al navegar con teclado, no al hacer clic. |

**Mínimo obligatorio: 3:1** (WCAG 2.2 §1.4.11, indicadores no textuales). Medido sobre la card, lo que había antes no llegaba: solo cambio de fondo **1.53:1**, `--focus-ring` al 22% **1.53:1**, `outline` en `--cyan-a38` **2.35:1**. Un foco que no se ve es un formulario inoperable sin mouse.

**Alcance:** es el anillo de todo el sistema. Campos, `.btn`, cards clickeables, `.nav-hamburger`, `.nav-close`, `.close-btn`, `.fav-star`, `.sidebar-collapse`, `.ds-xref`, `.kpi-help`, `.kpi-collapse` y el checkbox de `.login-remember`. Antes cada uno lo resolvia por su cuenta con `box-shadow: 0 0 0 3px var(--cyan-soft)` (~1.2:1).

**Excepcion — controles dentro de un segmentado.** `.range-btn`, `.pr-tabbtn` y `.schema-option` llevan el mismo anillo con `outline-offset: -2px`: con offset positivo se saldria de la pildora contenedora.

### Guiar el próximo paso ≠ marcar el foco

El anillo es **reactivo**: dice dónde estás. Guiar hacia adelante es comportamiento, no estilo:

- `autofocus` en el primer campo vacío.
- `tabindex="-1"` en controles auxiliares que no van en el recorrido (el ojo de mostrar contraseña).
- `autocomplete` correcto, para que el navegador ofrezca la credencial guardada.
- Al fallar, devolver el foco al campo del error en lugar de dejarlo en el botón.

---

## 28. Recuperar contraseña *(nuevo en v1.2.7.6)*

Segunda card del login, en la **misma caja**. Catálogo: **36 · Login → Recuperar contraseña** (`#login-recovery`).

```css
.login-card.is-card-hidden { visibility: hidden; pointer-events: none; }
.login-copy      { margin: 0; font-size: 13px; color: var(--muted); }
.recovery-title  { margin: 0; font-size: 20px; font-weight: 700; color: var(--text); }
.recovery-msg    { margin: 0; font-size: 12px; color: var(--green); }
.recovery-msg[data-state="error"] { color: var(--red); }
.recovery-actions { display: flex; gap: 10px; margin-top: 6px; }
.recovery-actions .btn { flex: 1; margin-top: 0; }
.btn-back        { background: var(--bg-soft); color: var(--text); }
```

**La alternancia va por `visibility`, no por `display`.** Con `display:none` la caja cambia de alto al conmutar entre login y recuperación, y el formulario salta.

---

## 29. Sidebar — controles, hover-peek y fijado *(nuevo en v1.2.7.6)*

Promovido desde `informes-yiqi/comercial.html`. El rail (`.nav-collapsed`) ya estaba canonizado; esto agrega lo que le faltaba. Catálogo: **34 · Shell → Controles, hover-peek y fijado** (`#sidebar-peek`).

| Comportamiento | Clase | Regla |
|---|---|---|
| Controles al pie | `.sidebar-ctrls` | Sticky abajo. En rail pasan a columna. Ocultos bajo 980px. |
| Fijar | `.sb-lock` + `.nav-locked` | Candado; fijado muestra `.ico-locked` en `--cyan` y cancela el peek. |
| Flecha | `.sb-arrow` | Rota 180° en rail. |
| Hover-peek | `.nav-peek` | El sidebar se despliega **como overlay** (`z-index: 97` + `--shadow-lg`): no empuja el contenido. |
| Tooltip | `.nav-link::after` | `attr(title)` en hover y en `:focus-visible`. Oculto en peek. |

**Nombres:** `comercial.html` usa `.ds-layout`, `.nav-section-label`, `.nav-icon` y `.sidebar-theme`. El canónico usa `.app-shell`, `.nav-lbl`, `.n-ico` y `.sb-theme-switch`. Se promovió con los nombres canónicos; **comercial tiene que renombrar** para consumirlo.

---

## 30. Navegación móvil *(nuevo en v1.2.7.10)*

Catálogo **§67 · `#nav-movil`**. El chrome de una app del ERP en el teléfono: cómo se
**navega**, no cómo se muestra el dato. Cinco componentes nuevos.

**Dos patrones de navegación móvil NO entran acá porque ya existen:**

| patrón | dónde vive | clase |
|---|---|---|
| Menú de tres puntos | §24 · Dropdown | `.pr-menu` · `.pr-menu-item` · `.pr-menu-sep` |
| Menú lateral | §35 · Kit base | `.sidebar` + `.nav-overlay` + `.nav-close` |

**Ojo con `.pr-tabbar`:** es un segmented control horizontal, no una barra inferior.
La barra de cinco destinos es `.ds-bottomnav`. No son variantes del mismo componente
aunque en castellano las dos se digan «tabs».

### Reglas

- **`.ds-applist`** — grid de módulos. `.is-active` en **uno solo**: si se colorean
  varios, ninguno es el activo.
- **`.ds-bottomnav`** — hasta **cinco** destinos de primer nivel. Es navegación, no
  acciones: lo que se *hace* va en el FAB. Reserva el indicador de home con
  `env(safe-area-inset-bottom)`.
- **`.ds-fab`** — **una sola por pantalla**. Es el único relleno cyan sólido del
  sistema; con dos, ninguno es el primario. Distinto de `.llm-fab`, que es el botón
  del asistente. Al expandir con `.ds-fab-actions`, la etiqueta va **afuera**, a la
  izquierda: adentro no entra, y truncarla deja el ícono solo.
- **`.ds-sheet`** — `.ds-sheet-grab` es obligatoria: sin manija el usuario no sabe
  que la puede arrastrar. La acción destructiva va última, con `.is-danger`.
- **`.ds-appbar`** — la vuelta atrás **siempre** a la izquierda: es donde el pulgar
  la busca y donde la pone el sistema operativo. El título trunca con elipsis; el
  contexto va en `--mono` debajo.

### CSS

```css
.ds-applist        { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px }
.ds-applist-item   { display:grid; justify-items:center; gap:6px; text-decoration:none }
.ds-applist-ico    { width:44px; height:44px; border-radius:var(--radius);
                     background:var(--bg-elev-2); color:var(--muted) }
.ds-applist-item.is-active .ds-applist-ico { background:var(--cyan-soft); color:var(--cyan) }

.ds-bottomnav      { display:grid; grid-auto-flow:column; grid-auto-columns:1fr;
                     padding:9px 6px calc(9px + env(safe-area-inset-bottom,12px));
                     background:var(--bg-elev) }
.ds-bottomnav-item.is-active { color:var(--cyan) }

.ds-fab            { position:absolute; right:16px; bottom:16px; width:52px; height:52px;
                     border-radius:var(--radius-pill); background:var(--cyan);
                     color:var(--accent-ink); box-shadow:var(--shadow-md) }

.ds-sheet          { border-radius:var(--radius-lg) var(--radius-lg) 0 0;
                     background:var(--bg-elev); box-shadow:var(--shadow-lg) }
.ds-sheet-grab     { width:36px; height:4px; background:var(--line-strong); margin:0 auto 12px }
.ds-sheet-item.is-danger { color:var(--red) }

.ds-appbar         { display:flex; align-items:center; gap:12px; padding:11px 14px;
                     background:var(--bg-elev) }
.ds-appbar-t strong{ font:600 14px var(--sans); letter-spacing:-.02em;
                     white-space:nowrap; overflow:hidden; text-overflow:ellipsis }
```

### HTML

```html
<nav class="ds-bottomnav" aria-label="Navegación principal">
  <a class="ds-bottomnav-item is-active" href="#" aria-current="page">
    <i class="ph ph-house"></i><span>Inicio</span>
  </a>
</nav>

<button class="ds-fab" type="button" aria-label="Nueva venta"><i class="ph ph-plus"></i></button>

<div class="ds-sheet" role="dialog" aria-label="Acciones">
  <div class="ds-sheet-grab"></div>
  <h3 class="ds-sheet-title">OV #4821</h3>
  <button class="ds-sheet-item" type="button"><i class="ph ph-eye"></i>Ver detalle</button>
  <button class="ds-sheet-item is-danger" type="button"><i class="ph ph-trash"></i>Anular</button>
</div>

<header class="ds-appbar">
  <button class="ds-appbar-back" type="button" aria-label="Volver"><i class="ph ph-caret-left"></i></button>
  <div class="ds-appbar-t"><strong>Órdenes de venta</strong><span>1.247 · Mes en curso</span></div>
  <div class="ds-appbar-actions"><button type="button" aria-label="Buscar"><i class="ph ph-magnifying-glass"></i></button></div>
</header>
```


---

*YiQi ERP · Design System v1.2.7.11 · Última actualización: 04/08/2026*
*Reemplaza todas las versiones anteriores de yiqi-design.md*
