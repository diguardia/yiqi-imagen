# YiQi — Componentes del Panel Gerencial (Analytics Pro)

Referencia para **reusar estos componentes en futuras apps**. Documenta cada pieza con su
markup, clases CSS y API de JS. Basado en el panel `yiqi-panel-gerencial` y alineado al DS.

> **Regla de oro:** los componentes se **importan**, no se copian. Una copia vuelve a divergir.
> Ver "Arquitectura" más abajo.

---

## 1. Arquitectura (cómo lograr reuso real)

El catálogo visual documenta *cómo se ve*; no alcanza para que otra app *use* el componente.
Para reuso real hacen falta **tres capas, en una sola fuente**:

| Capa | Archivo | Qué contiene | Cómo la consume una app |
|------|---------|--------------|--------------------------|
| Tokens + CSS de componentes | `styles.css` | colores, tipografía, spacing, y las clases (`kpi-card`, `data-table`, barras, etc.) | `<link rel="stylesheet" href=".../styles.css">` |
| Comportamientos (JS) | `ds-components.js` *(a crear)* | tabla sortable, sparkline+toggle, KPI colapsable, modal de comparación, off-canvas, selector de esquema | `<script src=".../ds-components.js">` + init |
| Documentación viva | `yiqi-design-system.html` | preview + snippet + API de cada componente | consume las dos de arriba |

**Principios**
- Fuente única: **`yiqi-imagen`** (`diguardia/yiqi-imagen`), según `LEEME-FUENTE-DS.md`. Las apps importan del CDN, no copian.
- Tokens siempre vía `var(--token)`. Nunca hex hardcodeado.
- **Flat + borderless:** profundidad por fondo/sombra, nunca por borde. Sin degradés ni glows en datos.
- Acento único **cyan**. El neutral semántico va en `--muted` (gris), nunca azul.
- Cifras: **Plus Jakarta Sans 500** (`--kpi-num`), `tabular-nums`.

---

## 2. Tokens base

```
--bg / --bg-elev / --bg-elev-2 / --bg-soft     superficies (oscuro→claro)
--line / --line-strong                          divisores
--text / --muted / --muted-2                    texto (fuerte→tenue)
--cyan (+ --cyan-soft)                           acento de marca / datos
--green --amber --red (+ *-soft)                 semántica (ok / atención / crítico)
--display  Plus Jakarta Sans (titulares)
--sans     Inter (UI)
--mono     IBM Plex Mono (labels, tokens, badges)
--kpi-num  Plus Jakarta Sans (cifras de KPI, peso 500, tabular)
--radius-* / --shadow-* / --glow
```
Dark/light por `[data-theme="light"]`. Toda app debe respetar el toggle.

---

## 3. Componentes

### 3.1 KPI card
Tarjeta base de indicador. Borderless, cifra Plus Jakarta 500 centrada, chip de delta tonal,
"i" desplegable a la derecha, colapsable (sticky), y clickeable → modal de comparación.

```html
<article class="kpi-card" data-kpi-cmp="1" role="button" tabindex="0"
         data-kpi-title="Facturación total" data-kpi-current="2847391" data-kpi-prior="2619495"
         data-kpi-unit="currency" data-kpi-delta="+8,7% vs período anterior" data-kpi-sub="…">
  <div class="kpi-label">
    <span class="metric-label">Facturación total</span>
    <button type="button" class="kpi-help" aria-expanded="false">
      <span aria-hidden="true">i</span>
      <span class="kpi-help-pop" role="tooltip">Detalle del indicador…</span>
    </button>
    <button type="button" class="kpi-collapse" aria-expanded="true"><svg…chevron/></button>
  </div>
  <div class="kpi-body">
    <div class="kpi-value" data-count="2.84" data-prefix="$" data-suffix="M">$0M</div>
    <div class="kpi-delta is-positive">↑ +8,7% vs período anterior</div>
    <div class="kpi-note">Facturas + NDs − NCs del período.</div>
  </div>
</article>
```
- **Sin icono** (decisión canónica). Cifra `--text` (neutral), centrada; solo el chip lleva color.
- `.kpi-delta.is-positive|is-negative|is-neutral` → verde / rojo / **gris (muted)**. Nunca azul.
- `.kpi-help` despliega `.kpi-help-pop` al tocar (click/Esc), no `title`. JS: toggle `.is-open`.
- `.kpi-collapse` colapsa a una tira (oculta `.kpi-body`). Estado en `sessionStorage` por label.
- `data-kpi-*`: si hay delta de comparación, la card abre el **modal de comparación** (3.3).
- Count-up: `data-count` + `data-prefix`/`data-suffix`.

### 3.2 Estado "sin datos" (discreto)
Cuando el valor es "Fuente no disponible" / "Próximamente" / "No hay información disponible":
sin icono, sin valor grande, sin duplicado — solo label + texto 13px gris.

```html
<article class="kpi-card kpi-card-na">
  <div class="kpi-label"><span class="metric-label">Clientes recurrentes</span> …i…</div>
  <div class="kpi-na">Fuente no disponible</div>
</article>
```
Mismo patrón en pulse / highlight / watchlist (`.pulse-na`, `.highlight-na`, `.watchlist-na`).

### 3.3 Modal de comparación de período
Al tocar un KPI con valor + delta. Chart de 2 barras (anterior vs actual) + cards 2×2
(Actual / Anterior / Δ absoluto / Δ relativo) + tabla Período/Valor/Δ + nota. El período
anterior se **deriva del delta declarado** (no es un dato extra): si delta = +8,7% → anterior = actual ÷ 1,087.
- El toggle línea/barra va **dentro del frame del gráfico**, arriba a la derecha.
- Valores secundarios en mono tabular; deltas con color por signo.

### 3.4 Tabla (`.data-table`)
Estilo DS: header `--bg-elev` mono 700 `.12em` muted-2, hover gris neutro, última fila sin borde.
**Frame transparente** (el card es la tabla, no el panel). **Sortable**. Sin side-scroll.

```html
<article class="panel panel-wide">           <!-- :has(.data-table) → transparente, sin sombra -->
  <div class="panel-header">…título…</div>
  <div class="table-wrap">                    <!-- card: bg-elev-2, radius, sin sombra -->
    <table class="data-table">
      <thead><tr>
        <th>Producto</th>
        <th class="num">Unidades</th><th class="num">Facturación</th><th class="num">Margen</th>
      </tr></thead>
      <tbody>
        <tr>
          <td><div class="product-title">…</div><div class="product-sku">…</div></td>
          <td class="num" data-label="Unidades">70</td>
          <td class="num" data-label="Facturación">$ 700.000</td>
          <td class="num" data-label="Margen">17,4%</td>
        </tr>
      </tbody>
    </table>
  </div>
</article>
```
- `.num` → columna numérica: **mono tabular, alineada a la derecha**.
- 1ª columna envuelve (`white-space: normal`); las `.num` quedan nowrap → **sin scroll horizontal**.
- **Mobile (≤640):** la tabla se apila como tarjetas (thead oculto, cada `.num` muestra su `data-label`).
- **Sortable:** click en header ordena (numérico si `.num`, alfabético si no). Indicador ↕ / ↑ / ↓.
  JS: `setupSortableTables()` recorre `.data-table`.

### 3.5 Gráficos (Chart.js 4.4.0)
**Sparkline de facturación** (cockpit "Facturación total" y tendencia "Facturación diaria"):
canvas Chart.js, área línea suave o barras, **toggle dentro del frame**, tooltips con monto.
Por defecto **barras** (dato diario = discreto). Colores vía `getComputedStyle` (respeta tema).

```html
<div class="trend-chart"><canvas id="…-canvas"></canvas></div>
<div class="spark-toggle"><button data-spark-trend="line">…</button>
                          <button class="is-active" data-spark-trend="bar">…</button></div>
```
- Línea: `borderColor #00ccff, fill rgba(0,204,255,.14), tension .4, pointRadius 0`.
- Barras: `backgroundColor rgba(0,204,255,.5), borderRadius 4`.
- Cyan sólido siempre. Sin degradés ni glow.

### 3.6 Filas de barra (franja / embudo)
Layout reutilizable: label+sub | barra proporcional | valor a la derecha.

```html
<div class="hourly-row">
  <div class="hourly-meta"><div class="hourly-range">10-12</div><div class="hourly-detail">28 pedidos</div></div>
  <div class="hourly-bar-track"><div class="hourly-bar-fill" style="width:31%"></div></div>
  <div class="hourly-share">31% del flujo</div>
</div>
```
- Track **borderless** (`--bg-soft`, sin sombra inset 3D). Fill **cyan sólido**.
- Mobile: 2 filas (meta+valor arriba, barra abajo) — grid-areas.
- **Embudo operativo** reusa este mismo patrón (etapa + count + barra proporcional + %).

### 3.7 Barras de canales / sucursal
`.channel-bar` / `.bb-bar` (track borderless bg-soft) + `.channel-fill` / `.branch-fill` (cyan sólido).
`.progress-fill` ídem. Todas planas, sin degradé.

### 3.8 Stat cards (highlight / watchlist / summary)
Tres variantes del mismo lenguaje: **borderless** (`--bg-elev-2` + `--shadow-sm`), sin icono,
cifra `--kpi-num` 500 tabular neutral, en grilla. El panel contenedor va **transparente**
(`.panel:has(.summary-grid)` / `:has(.highlight-cards)` / `:has(.watchlist-grid)`).
- Watchlist: el tono lo lleva el **icono** (cyan/green/amber), sin anillo ni borde.

### 3.9 Selector de esquema
Chip de cuenta con toggle "Esquema ▾" → menú de opciones. **Borderless** (sin borde en las opciones;
activo = fondo verde tenue, hover = cyan tenue). En el drawer (mobile) se despliega **inline sin scroll**.

```html
<div class="account-chip"><div class="account-user-block">…</div>
  <button class="schema-toggle">…Febo ▾</button>
  <div class="schema-menu"><!-- .schema-option (.is-active) por esquema --></div>
</div>
```

### 3.10 Header + Sidebar responsive (drawer)
- Desktop: header full-width (logo + chip de cuenta + período + acciones); sidebar fijo.
- **Tablet/mobile (≤980):** header = logo + **☰ a la derecha**; sidebar **off-canvas desde la derecha**.
  Los controles (chip, período, Actualizar, Cerrar sesión) se **mueven al drawer** vía
  `setupResponsiveTools()` (matchMedia 980) — se mueven, no se duplican (conservan id/listeners).
- Período en el drawer = segmentado **vertical** (3 opciones full-width).

### 3.11 Semáforo (`.signal-list`)
Lista de señales: punto de estado + título + descripción.
- Punto: `.signal.signal-green|amber|red`, **plano** (sin glow), color default `--muted-2` si no hay tono.
- Grilla `auto 1fr` (punto | contenido), alineado al top.

### 3.12 Backlog
Cards de áreas pendientes. **Borderless**, con **pill de estado** (Planeado / En desarrollo / Próximo).

---

## 4. Versionado y consumo
- `version.json` en el repo del DS. Cada app fija una versión.
- Futuras apps: `<link>` a `styles.css` (fuente única) + `<script>` a `ds-components.js` + init de los que apliquen
  (`setupSortableTables()`, sparklines, `setupResponsiveTools()`, tooltips "i", colapso).
- **No copiar** estos archivos a la app. Importar.

## 5. Pendiente (para completar el reuso)
- [x] **`ds-components.js` creado** (v1): tooltip "i", tablas sortables, mover-controles-al-drawer. Expone `window.YiQiDS`, auto-init. Falta v2: charts/modal/comparación (dependen de datos → necesitan API de inyección).
- [ ] Migrar el panel a consumir `styles.css` por CDN (fuente única).
- [ ] Consolidar hacia la fuente única (**`yiqi-imagen`**) y retirar las copias divergentes (incluida la de `www.yiqi`).
- [ ] Conectar a datos reales: Embudo operativo y Backlog (hoy hardcodeados).
