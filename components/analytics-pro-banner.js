/* ============================================================
   YiQi Analytics Pro Banner — Web Component
   Uso: <analytics-pro-banner></analytics-pro-banner>
        <analytics-pro-banner base="./" preview="examples/panel-gerencial.html"></analytics-pro-banner>
   DS v1.2.6 · rev 2
   Cambios v2:
   - Wide screen: contenido centrado con max-width 1180px
   - Mock con ancho fijo (540px) — no se estira en pantallas anchas
   - Jerarquía: título dominante, 1 sola CTA, chips integrados al mock
   - Dashboard mock más completo: 4 KPIs · chart con ejes · top categorías
   ============================================================ */

class AnalyticsProBanner extends HTMLElement {
  connectedCallback() {
    const base    = this.getAttribute('base')    || './';
    const preview = this.getAttribute('preview') || 'examples/panel-gerencial.html';
    const previewUrl = base + preview;

    /* ── Estilos (una sola vez) ── */
    if (!document.getElementById('analytics-pro-banner-styles')) {
      const style = document.createElement('style');
      style.id = 'analytics-pro-banner-styles';
      style.textContent = `
/* Host: cappea el frame en wide screen, centrado, con padding inline */
analytics-pro-banner {
  display: block;
  max-width: 1240px;
  margin: 24px auto 36px;
  padding-inline: clamp(20px, 4vw, 56px);
  box-sizing: border-box;
}

/* Banner shell — paleta NEGATIVA al tema del sistema.
   Trick: redeclarar tokens DS adentro del banner con los valores del tema opuesto.
   Todos los hijos que usan var(--bg-elev), var(--text), var(--cyan), etc.
   leen automáticamente los valores invertidos.
   container-type habilita @container queries — el stack del grid responde
   al ancho real del banner (no al viewport), crítico cuando vive dentro
   de un .ds-content u otro contenedor con max-width. */
.ds-pro-banner {
  container-type: inline-size;
  container-name: ds-pro;
  /* Default (página en dark) → banner muestra valores del tema LIGHT */
  --bg:          #f5f4f0;
  --bg-elev:     #eeece7;
  --bg-elev-2:   #e6e4df;
  --bg-soft:     rgba(0,0,0,.04);
  --line:        rgba(0,0,0,.08);
  --line-strong: rgba(0,0,0,.13);
  --text:        #17191c;
  --muted:       #586170;
  --muted-2:     #7f8896;
  --cyan:        #7c5cf0;
  --cyan-soft:   rgba(124,92,240,.12);
  --cyan-soft-2: rgba(124,92,240,.18);
  --green:       #0c9b6d;

  border-radius: var(--radius-xl, 20px);
  overflow: hidden;
  position: relative;
  isolation: isolate;
  background: linear-gradient(135deg, var(--bg-elev) 0%, var(--bg-elev-2) 60%, var(--bg) 100%);
  color: var(--text);
  box-shadow:
    0 1px 0 rgba(255,255,255,.5) inset,
    0 16px 36px rgba(16,36,54,.10),
    0 4px 12px rgba(16,36,54,.06);
}
html[data-theme="light"] .ds-pro-banner {
  /* Página en light → banner muestra valores del tema DARK.
     Elevaciones recalibradas para el banner negativo: los valores estándar
     del tema dark estaban demasiado juntos y los KPIs/secciones quedaban
     fundidos contra el mock. Acá los separo más para tener jerarquía. */
  --bg:          #08090c;
  --bg-elev:     #16181f;   /* cards y secciones dentro del mock */
  --bg-elev-2:   #22252c;   /* mock outer + topbar — claramente sobre el banner bg */
  --bg-soft:     rgba(255,255,255,.08);
  --line:        rgba(255,255,255,.14);
  --line-strong: rgba(255,255,255,.20);
  --text:        #f0f1f3;
  --muted:       #a4a8b0;
  --muted-2:     #767a83;
  --cyan:        #8b5cf6;
  --cyan-soft:   rgba(139,92,246,.14);
  --cyan-soft-2: rgba(139,92,246,.22);
  --green:       #00c48c;

  /* Sombra suave en página clara — menos negro, tinte cyan-blue suave.
     El banner es dark sobre fondo light, así que la sombra no necesita
     ser pesada: solo levantar el card del fondo sin manchar la página. */
  box-shadow:
    0 1px 0 rgba(255,255,255,.05) inset,
    0 18px 40px rgba(28,52,88,.10),
    0 4px 12px rgba(28,52,88,.06);
}

/* Capa 1 — radiales spotlight (depth-stack pattern v1.2.6).
   Página dark → banner light → tint cyan light (#7c5cf0).
   Página light → banner dark → tint cyan dark (#8b5cf6). */
.ds-pro-banner::before {
  content: ""; position: absolute; inset: 0; z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 55% 65% at 85% 50%, rgba(124,92,240,.12), transparent 70%),
    radial-gradient(ellipse 40% 50% at 15% 100%, rgba(124,92,240,.06), transparent 70%);
}
html[data-theme="light"] .ds-pro-banner::before {
  background:
    radial-gradient(ellipse 55% 65% at 85% 50%, rgba(139,92,246,.14), transparent 70%),
    radial-gradient(ellipse 40% 50% at 15% 100%, rgba(139,92,246,.08), transparent 70%);
}

/* Capa 2 — grilla con fade radial.
   En banner light (página dark) → grilla con líneas oscuras.
   En banner dark (página light) → grilla con líneas claras. */
.ds-pro-banner::after {
  content: ""; position: absolute; inset: 0; z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(0,0,0,.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.032) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, #000 0%, transparent 80%);
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, #000 0%, transparent 80%);
}
html[data-theme="light"] .ds-pro-banner::after {
  background:
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 44px 44px;
}

/* Contenedor — wide screen NO se estira, max 1180px centrado */
.ds-pro-banner-inner {
  position: relative; z-index: 1;
  max-width: 1180px; margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 540px;
  gap: clamp(28px, 4vw, 64px);
  padding: clamp(28px, 4vw, 52px);
  align-items: center;
}

/* ── COLUMNA IZQUIERDA — TEXTO ── */
.ds-pro-banner-left { min-width: 0; }

.ds-pro-kicker {
  display: inline-flex; align-items: center; gap: 6px;
  font: 700 10px var(--mono);
  letter-spacing: .14em; text-transform: uppercase;
  padding: 5px 10px;
  border-radius: var(--radius-pill);
  background: var(--cyan-soft);
  color: var(--cyan);
  margin-bottom: 18px;
}
.ds-pro-kicker::before {
  content: ""; width: 6px; height: 6px; border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 0 3px var(--cyan-soft);
}

.ds-pro-title {
  font: 800 clamp(30px, 3vw, 44px)/1.05 var(--display, var(--sans));
  letter-spacing: -.035em;
  margin: 0 0 14px;
  color: var(--text);
}
.ds-pro-title strong {
  font-weight: 800;
  color: var(--cyan);
}

.ds-pro-sub {
  font: 400 15px/1.6 var(--sans);
  color: var(--muted);
  margin: 0 0 28px;
  max-width: 460px;
}

/* Bullets verticales — más jerarquía que los chips antiguos */
.ds-pro-bullets {
  display: grid; gap: 10px;
  margin: 0 0 32px;
  max-width: 460px;
}
.ds-pro-bullet {
  display: grid; grid-template-columns: 22px 1fr; gap: 12px;
  align-items: start;
  font: 500 13px/1.5 var(--sans);
  color: var(--text);
}
.ds-pro-bullet svg {
  width: 18px; height: 18px; margin-top: 1px;
  stroke: var(--cyan); fill: none;
  stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round;
}
.ds-pro-bullet b { font-weight: 600; }
.ds-pro-bullet span { color: var(--muted); font-weight: 400; }

/* CTA principal — sigue spec DS btn-primary, sin shadow, sin translateY */
.ds-pro-cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 20px;
  border-radius: var(--radius);
  background: var(--cyan-soft);
  border: 1px solid rgba(139,92,246,.28);
  color: var(--cyan);
  font: 600 13px var(--sans);
  letter-spacing: -.005em;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--tr);
}
html[data-theme="light"] .ds-pro-cta {
  border-color: rgba(124,92,240,.28);
}
.ds-pro-cta:hover { background: var(--cyan-soft-2); }
.ds-pro-cta svg {
  width: 14px; height: 14px;
  stroke: currentColor; fill: none;
  stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round;
}

/* ── COLUMNA DERECHA — DASHBOARD MOCK ── */
.ds-pro-banner-right {
  width: 100%; max-width: 540px;
  justify-self: end;
}

.ds-pro-mock {
  position: relative;
  background: var(--bg-elev-2);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 0;
  overflow: hidden;
  box-shadow:
    0 1px 0 rgba(255,255,255,.045) inset,
    0 8px 24px rgba(0,26,40,.22),
    0 2px 8px rgba(139,92,246,.05);
}

html[data-theme="light"] .ds-pro-mock {
  box-shadow:
    0 1px 0 rgba(255,255,255,.6) inset,
    0 6px 18px rgba(16,36,54,.08),
    0 1px 4px rgba(124,92,240,.05);
}

/* Topbar del mock */
.ds-pro-mock-topbar {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 14px;
  border-bottom: 1px solid var(--line);
  background: var(--bg-elev);
}
.ds-pro-mock-dots {
  display: flex; gap: 5px; margin-right: 4px;
}
.ds-pro-mock-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--bg-soft);
}
.ds-pro-mock-title {
  flex: 1;
  font: 600 10px var(--mono);
  letter-spacing: .04em;
  color: var(--muted);
}
.ds-pro-mock-live {
  display: inline-flex; align-items: center; gap: 6px;
  font: 700 9px var(--mono);
  letter-spacing: .12em;
  color: var(--green);
}
.ds-pro-live-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: dsProLivePulse 1.6s ease-out infinite;
}
@keyframes dsProLivePulse {
  0%   { box-shadow: 0 0 0 0 currentColor; }
  70%  { box-shadow: 0 0 0 5px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

/* Contenido del mock */
.ds-pro-mock-body { padding: 16px; display: grid; gap: 14px; }

/* KPI strip — 4 columnas iguales */
.ds-pro-kpis {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
}
.ds-pro-kpi {
  padding: 10px 11px;
  background: var(--bg-elev);
  border-radius: var(--radius-sm);
}
.ds-pro-kpi-label {
  font: 700 8px var(--mono);
  letter-spacing: .10em; text-transform: uppercase;
  color: var(--muted-2);
  margin-bottom: 6px;
}
.ds-pro-kpi-value {
  font: 700 15px var(--mono);
  letter-spacing: -.015em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: var(--text);
}
.ds-pro-kpi-suffix { font-size: 10px; opacity: .55; margin-left: 1px; }
.ds-pro-kpi-delta {
  font: 600 9px var(--mono);
  color: var(--green);
  margin-top: 5px;
}
.ds-pro-kpi-delta.is-neutral { color: var(--muted-2); }

/* Chart block */
.ds-pro-mock-section {
  padding: 12px;
  background: var(--bg-elev);
  border-radius: var(--radius-sm);
}
.ds-pro-mock-section-head {
  display: flex; align-items: baseline; justify-content: space-between;
  margin-bottom: 8px;
}
.ds-pro-mock-section-title {
  font: 600 10px var(--mono);
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--muted);
}
.ds-pro-mock-section-meta {
  font: 600 9px var(--mono);
  color: var(--cyan);
}
.ds-pro-mock-chart {
  height: 92px;
  width: 100%;
  position: relative;
}
.ds-pro-mock-chart svg {
  display: block; width: 100%; height: 100%;
}

/* Bars row — top categorías */
.ds-pro-bars { display: grid; gap: 7px; }
.ds-pro-bar-row {
  display: grid;
  grid-template-columns: 92px 1fr 56px 36px;
  gap: 8px; align-items: center;
}
.ds-pro-bar-label {
  font: 500 11px var(--sans);
  color: var(--text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.ds-pro-bar-track {
  height: 5px; border-radius: var(--radius-pill);
  background: var(--bg-soft);
  overflow: hidden;
}
.ds-pro-bar-fill {
  display: block; height: 100%;
  background: var(--cyan);
  border-radius: inherit;
}
.ds-pro-bar-value {
  font: 600 10px var(--mono);
  font-variant-numeric: tabular-nums;
  color: var(--text);
  text-align: right;
}
.ds-pro-bar-delta {
  font: 600 9px var(--mono);
  color: var(--green);
  text-align: right;
}

/* Responsive — usando @container (mide el ancho REAL del banner, no del viewport).
   Crítico cuando el banner vive dentro de un contenedor con max-width
   (ej. .ds-content del DS) — el viewport puede ser ancho pero el banner queda angosto.

   Estrategia: NUNCA apilar el layout en desktop (queda siempre 2-col split).
   Cuando el banner se angosta, se compacta el mock — la columna del texto
   conserva espacio para que "YiQi Analytics Pro" entre en 2 líneas. */
@container ds-pro (max-width: 1100px) {
  .ds-pro-banner-inner {
    grid-template-columns: 1fr minmax(0, 380px);
    gap: 32px;
  }
  .ds-pro-banner-right { max-width: 380px; }
}

/* Solo en pantallas muy chicas (mobile) sí apilamos */
@container ds-pro (max-width: 640px) {
  .ds-pro-banner-inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .ds-pro-banner-right {
    order: -1;
    justify-self: stretch;
    max-width: 540px;
    margin: 0 auto;
  }
}
@media (max-width: 560px) {
  .ds-pro-banner { margin: 16px 16px 28px; }
  .ds-pro-kpis { grid-template-columns: 1fr 1fr; }
  .ds-pro-bar-row { grid-template-columns: 80px 1fr 50px 32px; }
}

/* ── Animaciones de entrada (se disparan al entrar en viewport) ── */
@media (prefers-reduced-motion: no-preference) {
  .ds-pro-spark-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
  .ds-pro-banner.is-playing .ds-pro-spark-line {
    animation: dsProDraw 1.4s cubic-bezier(.6,.04,.2,1) forwards;
  }
  .ds-pro-spark-end { opacity: 0; }
  .ds-pro-banner.is-playing .ds-pro-spark-end { animation: dsProFade .45s ease 1.15s forwards; }
  .ds-pro-spark-ring { opacity: 0; }
  .ds-pro-banner.is-playing .ds-pro-spark-ring { animation: dsProRing 2.4s ease-out 1.5s infinite; }

  .ds-pro-kpi { opacity: 0; transform: translateY(8px); }
  .ds-pro-banner.is-playing .ds-pro-kpi { animation: dsProUp .55s cubic-bezier(.22,1,.36,1) forwards; }
  .ds-pro-banner.is-playing .ds-pro-kpi:nth-child(1) { animation-delay: .05s; }
  .ds-pro-banner.is-playing .ds-pro-kpi:nth-child(2) { animation-delay: .13s; }
  .ds-pro-banner.is-playing .ds-pro-kpi:nth-child(3) { animation-delay: .21s; }
  .ds-pro-banner.is-playing .ds-pro-kpi:nth-child(4) { animation-delay: .29s; }

  .ds-pro-bar-fill { transform: scaleX(0); transform-origin: left center; }
  .ds-pro-banner.is-playing .ds-pro-bar-fill { animation: dsProBar .9s cubic-bezier(.22,1,.36,1) forwards; }
  .ds-pro-banner.is-playing .ds-pro-bar-row:nth-child(1) .ds-pro-bar-fill { animation-delay: .50s; }
  .ds-pro-banner.is-playing .ds-pro-bar-row:nth-child(2) .ds-pro-bar-fill { animation-delay: .62s; }
  .ds-pro-banner.is-playing .ds-pro-bar-row:nth-child(3) .ds-pro-bar-fill { animation-delay: .74s; }

  .ds-pro-bullet { opacity: 0; transform: translateY(6px); }
  .ds-pro-banner.is-playing .ds-pro-bullet { animation: dsProUp .5s cubic-bezier(.22,1,.36,1) forwards; }
  .ds-pro-banner.is-playing .ds-pro-bullet:nth-child(1) { animation-delay: .08s; }
  .ds-pro-banner.is-playing .ds-pro-bullet:nth-child(2) { animation-delay: .18s; }
  .ds-pro-banner.is-playing .ds-pro-bullet:nth-child(3) { animation-delay: .28s; }

  .ds-pro-check-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
  .ds-pro-banner.is-playing .ds-pro-bullet .ds-pro-check-line { animation: dsProDraw .45s ease forwards; }
  .ds-pro-banner.is-playing .ds-pro-bullet:nth-child(1) .ds-pro-check-line { animation-delay: .70s; }
  .ds-pro-banner.is-playing .ds-pro-bullet:nth-child(2) .ds-pro-check-line { animation-delay: 1.20s; }
  .ds-pro-banner.is-playing .ds-pro-bullet:nth-child(3) .ds-pro-check-line { animation-delay: 1.70s; }
}
@keyframes dsProDraw { to { stroke-dashoffset: 0; } }
@keyframes dsProFade { to { opacity: 1; } }
@keyframes dsProUp   { to { opacity: 1; transform: none; } }
@keyframes dsProBar  { to { transform: scaleX(1); } }
@keyframes dsProRing {
  0%   { r: 6;  opacity: .30; }
  70%  { r: 16; opacity: 0; }
  100% { r: 16; opacity: 0; }
}
`;
      document.head.appendChild(style);
    }

    /* ── HTML ── */
    this.innerHTML = `
<section class="ds-pro-banner" id="pro-banner" aria-labelledby="ds-pro-title">
  <div class="ds-pro-banner-inner">

    <!-- IZQUIERDA: copy + CTA -->
    <div class="ds-pro-banner-left">
      <span class="ds-pro-kicker">ADD-ON · PREMIUM</span>
      <h2 class="ds-pro-title" id="ds-pro-title">YiQi <strong>Analytics</strong> Pro</h2>
      <p class="ds-pro-sub">Panel gerencial con KPIs en tiempo real, cohortes y forecast de cashflow. Para directivos que toman decisiones con datos.</p>

      <ul class="ds-pro-bullets" aria-label="Lo que incluye">
        <li class="ds-pro-bullet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><polyline class="ds-pro-check-line" pathLength="1" points="4 12 9 17 20 6"/></svg>
          <span><b>23 KPIs out-of-the-box</b> — facturación, margen, conversión, cobranzas, stock</span>
        </li>
        <li class="ds-pro-bullet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><polyline class="ds-pro-check-line" pathLength="1" points="4 12 9 17 20 6"/></svg>
          <span><b>Drill-down + cohortes</b> — del KPI al ticket sin salir del panel</span>
        </li>
        <li class="ds-pro-bullet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><polyline class="ds-pro-check-line" pathLength="1" points="4 12 9 17 20 6"/></svg>
          <span><b>Forecast con IA</b> — proyección de cashflow a 90 días</span>
        </li>
      </ul>

      <a class="ds-pro-cta" href="https://calendly.com/javierperez/encuentro" target="_blank" rel="noopener">
        Quiero saber más
        <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>

    <!-- DERECHA: dashboard mock -->
    <div class="ds-pro-banner-right" aria-hidden="true">
      <div class="ds-pro-mock">
        <div class="ds-pro-mock-topbar">
          <div class="ds-pro-mock-dots">
            <span class="ds-pro-mock-dot"></span>
            <span class="ds-pro-mock-dot"></span>
            <span class="ds-pro-mock-dot"></span>
          </div>
          <span class="ds-pro-mock-title">analytics-pro · panel mensual</span>
          <span class="ds-pro-mock-live"><span class="ds-pro-live-dot"></span>LIVE</span>
        </div>

        <div class="ds-pro-mock-body">
          <!-- 4 KPIs strip -->
          <div class="ds-pro-kpis">
            <div class="ds-pro-kpi">
              <div class="ds-pro-kpi-label">INGRESOS</div>
              <div class="ds-pro-kpi-value"><span class="ds-pro-count" data-to="2.84" data-dec="2" data-prefix="$" data-delay="120">$2,84</span><span class="ds-pro-kpi-suffix">M</span></div>
              <div class="ds-pro-kpi-delta ds-pro-count" data-to="18.4" data-dec="1" data-prefix="↑ " data-suffix="%" data-delay="180">↑ 18,4%</div>
            </div>
            <div class="ds-pro-kpi">
              <div class="ds-pro-kpi-label">PEDIDOS</div>
              <div class="ds-pro-kpi-value"><span class="ds-pro-count" data-to="1247" data-dec="0" data-delay="200">1.247</span></div>
              <div class="ds-pro-kpi-delta ds-pro-count" data-to="6.2" data-dec="1" data-prefix="↑ " data-suffix="%" data-delay="260">↑ 6,2%</div>
            </div>
            <div class="ds-pro-kpi">
              <div class="ds-pro-kpi-label">MARGEN</div>
              <div class="ds-pro-kpi-value"><span class="ds-pro-count" data-to="24.1" data-dec="1" data-delay="280">24,1</span><span class="ds-pro-kpi-suffix">%</span></div>
              <div class="ds-pro-kpi-delta ds-pro-count" data-to="1.8" data-dec="1" data-prefix="↑ " data-suffix=" pp" data-delay="340">↑ 1,8 pp</div>
            </div>
            <div class="ds-pro-kpi">
              <div class="ds-pro-kpi-label">CONV.</div>
              <div class="ds-pro-kpi-value"><span class="ds-pro-count" data-to="68.3" data-dec="1" data-delay="360">68,3</span><span class="ds-pro-kpi-suffix">%</span></div>
              <div class="ds-pro-kpi-delta is-neutral ds-pro-count" data-to="0.1" data-dec="1" data-prefix="→ " data-suffix="%" data-delay="420">→ 0,1%</div>
            </div>
          </div>

          <!-- Chart -->
          <div class="ds-pro-mock-section">
            <div class="ds-pro-mock-section-head">
              <span class="ds-pro-mock-section-title">Ingresos · 30 días</span>
              <span class="ds-pro-mock-section-meta">Forecast Q2 · 84% confianza</span>
            </div>
            <div class="ds-pro-mock-chart" role="presentation">
              <svg viewBox="0 0 400 92" preserveAspectRatio="none">
                <!-- ejes -->
                <line x1="0" y1="23" x2="400" y2="23" stroke="currentColor" stroke-opacity=".08"/>
                <line x1="0" y1="46" x2="400" y2="46" stroke="currentColor" stroke-opacity=".08"/>
                <line x1="0" y1="69" x2="400" y2="69" stroke="currentColor" stroke-opacity=".08"/>
                <!-- línea -->
                <path class="ds-pro-spark-line" pathLength="1"
                      d="M0,76 L40,70 L80,58 L120,64 L160,46 L200,52 L240,32 L280,38 L320,22 L360,26 L400,12"
                      stroke="var(--cyan)" stroke-width="2" fill="none"
                      stroke-linecap="round" stroke-linejoin="round"/>
                <!-- punto final -->
                <circle class="ds-pro-spark-ring" cx="400" cy="12" r="6" fill="var(--cyan)" fill-opacity=".18"/>
                <circle class="ds-pro-spark-end" cx="400" cy="12" r="3" fill="var(--cyan)"/>
              </svg>
            </div>
          </div>

          <!-- Top categorías -->
          <div class="ds-pro-mock-section">
            <div class="ds-pro-mock-section-head">
              <span class="ds-pro-mock-section-title">Top categorías</span>
              <span class="ds-pro-mock-section-meta">MTD</span>
            </div>
            <div class="ds-pro-bars">
              <div class="ds-pro-bar-row">
                <span class="ds-pro-bar-label">Indumentaria</span>
                <span class="ds-pro-bar-track"><span class="ds-pro-bar-fill" style="width:92%"></span></span>
                <span class="ds-pro-bar-value ds-pro-count" data-to="1.21" data-dec="2" data-prefix="$" data-suffix="M" data-delay="650">$1,21M</span>
                <span class="ds-pro-bar-delta">↑12%</span>
              </div>
              <div class="ds-pro-bar-row">
                <span class="ds-pro-bar-label">Calzado</span>
                <span class="ds-pro-bar-track"><span class="ds-pro-bar-fill" style="width:64%"></span></span>
                <span class="ds-pro-bar-value ds-pro-count" data-to="842" data-dec="0" data-prefix="$" data-suffix="K" data-delay="760">$842K</span>
                <span class="ds-pro-bar-delta">↑8%</span>
              </div>
              <div class="ds-pro-bar-row">
                <span class="ds-pro-bar-label">Accesorios</span>
                <span class="ds-pro-bar-track"><span class="ds-pro-bar-fill" style="width:38%"></span></span>
                <span class="ds-pro-bar-value ds-pro-count" data-to="418" data-dec="0" data-prefix="$" data-suffix="K" data-delay="870">$418K</span>
                <span class="ds-pro-bar-delta">↑4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>`;

    /* ── Lógica ── */
    /* CTA: si la página tiene openPreview() (ej. el DS example), lo usa como takeover.
       Si no, navega al link normalmente. */
    const cta = this.querySelector('[data-pro-preview]');
    if (cta && typeof window.openPreview === 'function') {
      cta.addEventListener('click', (e) => {
        e.preventDefault();
        window.openPreview(previewUrl, 'YiQi Analytics Pro');
      });
    }

    /* Dispara las animaciones de entrada al hacerse visible (una sola vez) */
    const bannerEl = this.querySelector('.ds-pro-banner');
    if (bannerEl) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nf = (n, dec) => new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: dec, maximumFractionDigits: dec
      }).format(n);
      const render = (el, n) =>
        el.textContent = (el.dataset.prefix || '') + nf(n, +(el.dataset.dec || 0)) + (el.dataset.suffix || '');

      const counts = bannerEl.querySelectorAll('.ds-pro-count');
      /* Arranque en 0 (sin flash) salvo reduced-motion, que deja el valor final */
      if (!reduce) counts.forEach(el => render(el, 0));

      const countUp = (el) => {
        const to    = parseFloat(el.dataset.to);
        const dur   = 1100;
        const delay = parseInt(el.dataset.delay || '0', 10);
        let start   = null;
        const step = (now) => {
          if (start === null) start = now + delay;
          let t = (now - start) / dur;
          if (t < 0) { requestAnimationFrame(step); return; }
          if (t > 1) t = 1;
          const e = 1 - Math.pow(1 - t, 3);
          render(el, to * e);
          if (t < 1) requestAnimationFrame(step);
          else render(el, to);
        };
        requestAnimationFrame(step);
      };

      const play = () => {
        bannerEl.classList.add('is-playing');
        if (!reduce) counts.forEach(countUp);
      };

      if (!('IntersectionObserver' in window)) {
        play();
      } else {
        const io = new IntersectionObserver((entries, obs) => {
          entries.forEach(en => {
            if (en.isIntersecting) { play(); obs.disconnect(); }
          });
        }, { threshold: 0.35 });
        io.observe(bannerEl);
      }
    }
  }
}

if (!customElements.get('analytics-pro-banner')) {
  customElements.define('analytics-pro-banner', AnalyticsProBanner);
}
