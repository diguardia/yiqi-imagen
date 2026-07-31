/**
 * YiQi Runtime — v1.2.7
 * Utilidades JS compartidas para entregables HTML standalone.
 *
 * Uso:  <script src="/system/sdk/yiqi-runtime.js"></script>
 * API:  window.YiQi  (disponible globalmente)
 *
 * Módulos:
 *   YiQi.setTheme(v)          — toggle 3 pasos: 'dark' | 'system' | 'light'
 *   YiQi.getTheme()           — preferencia guardada
 *   YiQi.resolveTheme(v)      — resuelve 'system' al tema real del OS
 *   YiQi.toast(msg, type?)    — notificación flotante
 *   YiQi.initSortable(el)     — tabla HTML sorteable por columna
 *   YiQi.initScrollSpy(opts)  — nav activo por scroll
 *   YiQi.fmt.currency(n)      — $ 1.234.567,89 (ARS)
 *   YiQi.fmt.number(n)        — 1.234.567
 *   YiQi.fmt.percent(n)       — 12,3 %
 *   YiQi.fmt.date(d)          — 30/04/2026
 *   YiQi.fmt.dateShort(d)     — 30 abr
 *
 * © 2026 YiQi S.A. — DS v1.2.7
 */

(function (global) {
  'use strict';

  /* ── CONSTANTES ─────────────────────────────────────────── */
  var STORAGE_KEY = 'yiqi-theme';
  var _mq = window.matchMedia('(prefers-color-scheme: dark)');

  /* ══════════════════════════════════════════════════════════
     1. TEMA — 3 pasos: Oscuro · Sistema · Claro
     ══════════════════════════════════════════════════════════ */

  /**
   * Resuelve 'system' al tema real según el OS.
   * 'dark' y 'light' pasan directo.
   */
  function resolveTheme(v) {
    return v === 'system' ? (_mq.matches ? 'dark' : 'light') : v;
  }

  /** Aplica data-theme al <html>. */
  function applyTheme(v) {
    document.documentElement.dataset.theme = resolveTheme(v);
  }

  /** Marca el botón activo en el toggle (.theme-opt[data-val]). */
  function updateThemeSwitch(v) {
    document.querySelectorAll('.theme-opt').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.val === v);
    });
  }

  /**
   * Cambia el tema, lo persiste y actualiza el switch.
   * @param {'dark'|'system'|'light'} v
   */
  function setTheme(v) {
    localStorage.setItem(STORAGE_KEY, v);
    applyTheme(v);
    updateThemeSwitch(v);
  }

  /** Devuelve la preferencia guardada ('system' por defecto). */
  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'system';
  }

  /* Reacciona a cambios del OS cuando la preferencia es 'system'. */
  _mq.addEventListener('change', function () {
    if (getTheme() === 'system') applyTheme('system');
  });

  /* Inicialización inmediata — evita flash de tema incorrecto. */
  (function () {
    var saved = getTheme();
    applyTheme(saved);
    document.addEventListener('DOMContentLoaded', function () {
      updateThemeSwitch(saved);
    });
  })();


  /* ══════════════════════════════════════════════════════════
     2. TOAST — notificación flotante
     ══════════════════════════════════════════════════════════ */

  var _toastContainer = null;


  /* ── Drawer de navegación (mobile) ─────────────────────────────
     Conecta .nav-hamburger + .sidebar + .nav-overlay. Idempotente. */
  function initNavDrawer(root) {
    var scope  = root || document;
    var btn    = scope.querySelector('.nav-hamburger');
    var side   = scope.querySelector('.sidebar');
    var scrim  = scope.querySelector('.nav-overlay');
    var close  = scope.querySelector('.nav-close');
    if (!btn || !side || !scrim || btn.dataset.navDrawer) return;
    btn.dataset.navDrawer = '1';

    function set(open) {
      side.classList.toggle('is-open', open);
      scrim.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () {
      set(!side.classList.contains('is-open'));
    });
    scrim.addEventListener('click', function () { set(false); });
    if (close) close.addEventListener('click', function () { set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') set(false);
    });
    side.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link')) set(false);
    });
    return set;
  }

  document.addEventListener('DOMContentLoaded', function () { initNavDrawer(); });

  function _ensureToastContainer() {
    if (_toastContainer) return _toastContainer;
    _toastContainer = document.createElement('div');
    _toastContainer.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'right:24px',
      'z-index:9999',
      'display:flex',
      'flex-direction:column',
      'gap:8px',
      'pointer-events:none'
    ].join(';');
    document.body.appendChild(_toastContainer);
    return _toastContainer;
  }

  var _TOAST_COLORS = {
    success: { text: 'var(--green)',  border: 'rgba(0, 196, 140, 0.28)',  bg: 'rgba(0, 196, 140, 0.10)' },
    error:   { text: 'var(--red)',    border: 'rgba(242, 95, 92, 0.28)',   bg: 'rgba(242, 95, 92, 0.10)' },
    warning: { text: 'var(--amber)',  border: 'rgba(246, 166, 35, 0.28)',  bg: 'rgba(246, 166, 35, 0.10)' },
    info:    { text: 'var(--cyan)',   border: 'rgba(0, 204, 255, 0.24)',   bg: 'rgba(0, 204, 255, 0.08)' },
  };

  /**
   * Muestra una notificación flotante.
   * @param {string}  msg              Texto del toast.
   * @param {'success'|'error'|'warning'|'info'} [type='info']
   * @param {number}  [duration=3000]  Ms antes de desaparecer.
   */
  function toast(msg, type, duration) {
    type     = type     || 'info';
    duration = duration || 3000;

    var c = _TOAST_COLORS[type] || _TOAST_COLORS.info;
    var el = document.createElement('div');

    el.style.cssText = [
      'pointer-events:auto',
      'padding:10px 14px',
      'border-radius:var(--radius, 10px)',
      'border:1px solid ' + c.border,
      'background:' + c.bg,
      'color:' + c.text,
      'font:500 13px var(--sans, Inter, sans-serif)',
      'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)',
      'box-shadow:var(--shadow-md, 0 8px 24px rgba(0,0,0,.18))',
      'max-width:320px',
      'opacity:0',
      'transform:translateY(8px)',
      'transition:opacity 180ms ease, transform 180ms ease'
    ].join(';');

    el.textContent = msg;
    _ensureToastContainer().appendChild(el);

    /* Entrada */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });

    /* Salida */
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(function () { el.remove(); }, 200);
    }, duration);
  }


  /* ══════════════════════════════════════════════════════════
     3. SORTABLE TABLE — tabla ordenable por columna
     ══════════════════════════════════════════════════════════ */

  /**
   * Hace sorteable cualquier tabla HTML por sus encabezados.
   * Los <th> deben tener data-col="nombre" para ser clicables.
   * @param {HTMLElement} tableEl  El elemento <table>.
   */
  function initSortable(tableEl) {
    if (!tableEl) return;

    var headers = tableEl.querySelectorAll('th[data-col]');
    var tbody   = tableEl.querySelector('tbody');
    if (!headers.length || !tbody) return;

    var sortCol = -1;
    var sortAsc = true;

    headers.forEach(function (th, col) {
      th.style.cursor = 'pointer';
      th.style.userSelect = 'none';

      /* Icono de orden */
      var icon = document.createElement('span');
      icon.className = 'sort-icon';
      icon.style.cssText = 'margin-left:5px;opacity:.4;font-size:10px;font-style:normal;';
      icon.textContent = '↕';
      th.appendChild(icon);

      th.addEventListener('click', function () {
        sortAsc = sortCol === col ? !sortAsc : true;
        sortCol = col;

        /* Actualiza clases e íconos */
        headers.forEach(function (h) {
          h.classList.remove('sort-asc', 'sort-desc');
          h.querySelector('.sort-icon').textContent = '↕';
          h.querySelector('.sort-icon').style.opacity = '.4';
        });
        th.classList.add(sortAsc ? 'sort-asc' : 'sort-desc');
        icon.textContent = sortAsc ? '↑' : '↓';
        icon.style.opacity = '1';

        /* Ordena filas */
        var rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort(function (a, b) {
          var aVal = (a.cells[col] ? a.cells[col].textContent : '').trim();
          var bVal = (b.cells[col] ? b.cells[col].textContent : '').trim();
          var aNum = parseFloat(aVal.replace(/[^0-9,.-]/g, '').replace(',', '.'));
          var bNum = parseFloat(bVal.replace(/[^0-9,.-]/g, '').replace(',', '.'));
          var cmp  = !isNaN(aNum) && !isNaN(bNum)
            ? aNum - bNum
            : aVal.localeCompare(bVal, 'es', { numeric: true });
          return sortAsc ? cmp : -cmp;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      });
    });
  }


  /* ══════════════════════════════════════════════════════════
     4. SCROLL SPY — nav activo por sección visible
     ══════════════════════════════════════════════════════════ */

  /**
   * Marca el nav item activo según la sección visible en pantalla.
   * @param {{
   *   sections:  string|NodeList,  — selector CSS o NodeList de secciones
   *   navItems:  string|NodeList,  — selector CSS o NodeList de links
   *   activeClass?: string,        — clase a agregar (default: 'active')
   *   threshold?: number,          — 0–1, fracción visible para activar (default: 0.25)
   * }} opts
   */
  function initScrollSpy(opts) {
    opts = opts || {};
    var activeClass = opts.activeClass || 'active';
    var threshold   = opts.threshold   != null ? opts.threshold : 0.25;

    var sections = typeof opts.sections === 'string'
      ? document.querySelectorAll(opts.sections)
      : opts.sections;
    var navItems = typeof opts.navItems === 'string'
      ? document.querySelectorAll(opts.navItems)
      : opts.navItems;

    if (!sections || !sections.length || !navItems || !navItems.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navItems.forEach(function (item) {
          var href = item.getAttribute('href') || item.dataset.section || '';
          item.classList.toggle(activeClass, href === '#' + id);
        });
      });
    }, { threshold: threshold });

    sections.forEach(function (sec) { observer.observe(sec); });

    return observer; /* por si se quiere desconectar luego */
  }


  /* ══════════════════════════════════════════════════════════
     5. FORMATTERS — números, moneda, fechas
     ══════════════════════════════════════════════════════════ */

  var _fmtCurrency = new Intl.NumberFormat('es-AR', {
    style:    'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  var _fmtNumber = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  var _fmtPercent = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  var _fmtDate = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

  var _fmtDateShort = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric', month: 'short',
  });

  var fmt = {
    /** $ 1.234.567 */
    currency: function (n) {
      if (n == null || isNaN(n)) return '—';
      return _fmtCurrency.format(n);
    },
    /** 1.234.567 */
    number: function (n) {
      if (n == null || isNaN(n)) return '—';
      return _fmtNumber.format(n);
    },
    /** 12,3 % */
    percent: function (n) {
      if (n == null || isNaN(n)) return '—';
      return _fmtPercent.format(n) + ' %';
    },
    /** 30/04/2026 */
    date: function (d) {
      if (!d) return '—';
      var dt = d instanceof Date ? d : new Date(d);
      return isNaN(dt) ? String(d) : _fmtDate.format(dt);
    },
    /** 30 abr */
    dateShort: function (d) {
      if (!d) return '—';
      var dt = d instanceof Date ? d : new Date(d);
      return isNaN(dt) ? String(d) : _fmtDateShort.format(dt);
    },
  };


  /* ══════════════════════════════════════════════════════════
     EXPORTAR API GLOBAL
     ══════════════════════════════════════════════════════════ */


  /* ═══════════════════════════════════════════════════════════════════════
     LOGO YiQi — animacion (v1.2.7.9)
     Promovido desde el catalogo, donde vivia inline y duplicado en dos
     archivos mientras cada app copiaba el suyo o lo dejaba estatico.
     Es el primer componente del DS con comportamiento distribuible: la
     conducta viaja por el CDN igual que el CSS.

     Uso:
       1. El SVG lleva data-yiqi-logo y las clases de parte
          (.yq-y .yq-i1s .yq-q .yq-i2s .yq-i1d .yq-i2d, mas .yql/.yqs/.anim).
          El marcado canonico esta en el catalogo, seccion 08 - Logo.
       2. Cargar este archivo. Los logos presentes se animan solos al cargar.
       3. Para repetir:  YiQi.logo.play(svg, { force:true })
          data-axis="y" | "x" | "z" cambia el giro de la Q.
     Respeta prefers-reduced-motion salvo force:true.
     ═══════════════════════════════════════════════════════════════════════ */
  var LogoAPI = (function (global) {
  'use strict';
    if (global.YiQiLogo) return global.YiQiLogo;
  const PARTS = { all:'yq-all', y:'yq-y', i1s:'yq-i1s', i2s:'yq-i2s', q:'yq-q', i1d:'yq-i1d', i2d:'yq-i2d' };
  const T = { body:520, qDur:820, yDelay:0, i1sDelay:90, i2sDelay:160, qDelay:260, dotGap1:90, dotGap2:170 };
  const reduceMotion = () => global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (svg, cls) => svg.querySelector('.' + cls);
  function qFrames(axis) {
    if (axis === 'z') {
      return { easing:'cubic-bezier(.18,.7,.2,1)', frames:[
        { opacity:0, transform:'rotate(360deg) scale(.3)',  offset:0 },
        { opacity:1, transform:'rotate(10deg) scale(1.05)', offset:.72 },
        { opacity:1, transform:'rotate(0deg) scale(1)',     offset:1 } ]};
    }
    const f = axis === 'x' ? (a,b)=>'scaleX('+b+') scaleY('+a+')' : (a,b)=>'scaleX('+a+') scaleY('+b+')';
    return { easing:'cubic-bezier(.45,.02,.25,1)', frames:[
      { opacity:0,   transform:f(.82,.82),  offset:0   },
      { opacity:1,   transform:f(1,.84),    offset:.12 },
      { opacity:.30, transform:f(0,.88),    offset:.32 },
      { opacity:1,   transform:f(-.92,.92), offset:.5  },
      { opacity:.30, transform:f(0,.96),    offset:.7  },
      { opacity:1,   transform:f(1.05,1),   offset:.88 },
      { opacity:1,   transform:f(1,1),      offset:1   } ]};
  }
  function clear(svg){ Object.values(PARTS).forEach(c=>{ const el=$(svg,c); if(el) el.getAnimations().forEach(a=>a.cancel()); }); }
  function reset(svg){ clear(svg); Object.values(PARTS).forEach(c=>{ const el=$(svg,c); if(el){ el.style.opacity=''; el.style.transform=''; } }); }
  function play(svg, opts){
    opts = opts || {};
    const axis = (opts.axis || svg.dataset.axis || 'y').toLowerCase();
    const rate = opts.rate != null ? +opts.rate : 1;
    const k = 1 / rate;
    clear(svg);
    if (reduceMotion() && !opts.force) { reset(svg); return; }
    const ease = 'cubic-bezier(.22,1,.36,1)';
    const A = (c, frames, o) => $(svg,c) && $(svg,c).animate(frames, Object.assign({fill:'both'}, o));
    const rise = [{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}];
    A(PARTS.y,   rise, {duration:T.body*k, delay:T.yDelay*k,   easing:ease});
    A(PARTS.i1s, rise, {duration:T.body*k, delay:T.i1sDelay*k, easing:ease});
    A(PARTS.i2s, rise, {duration:T.body*k, delay:T.i2sDelay*k, easing:ease});
    const qf = qFrames(axis);
    A(PARTS.q,   qf.frames, {duration:T.qDur*k, delay:T.qDelay*k, easing:qf.easing});
    A(PARTS.i1d, qf.frames, {duration:T.qDur*k, delay:(T.qDelay+T.dotGap1)*k, easing:qf.easing});
    A(PARTS.i2d, qf.frames, {duration:T.qDur*k, delay:(T.qDelay+T.dotGap2)*k, easing:qf.easing});
  }
    /* autoInit sirve para HTML estatico. En una SPA —React, Vue— el script
       corre antes de que el framework monte: no encuentra ningun logo y no
       pasa nada. Por eso init() es publico: la app lo llama despues del
       primer render. Es idempotente. */
    function init(root){ (root || document).querySelectorAll('[data-yiqi-logo]').forEach(function(svg){ play(svg); }); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ init(); });
    else init();
    global.YiQiLogo = { play: play, reset: reset, init: init };
    return global.YiQiLogo;
  }(window));

  global.YiQi = {
    /* Tema */
    setTheme:     setTheme,
    getTheme:     getTheme,
    resolveTheme: resolveTheme,
    applyTheme:   applyTheme,

    /* UI */
    toast:          toast,
    initSortable:   initSortable,
    initNavDrawer:  initNavDrawer,
    initScrollSpy:  initScrollSpy,

    /* Formato */
    fmt: fmt,

    /* Logo animado */
    logo: LogoAPI,

    /* Meta */
    version: '1.2.7.9',
  };

}(window));
