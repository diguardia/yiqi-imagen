/* apps-apilado.js — Cards de apps apiladas al scrollear, solo en mobile (<=620px).
   Envuelve cada .app-card de la grilla [data-apilado] en un .stk sticky y, al
   scrollear, achica y oscurece las que van quedando tapadas. Se mide el .stk
   (sin transformar) y se transforma la card de adentro, para no medir lo que se
   mueve. Con "reducir movimiento" se apilan sin achicarse. Estilos en
   apps-apilado.css. Seba, 24/10/2026. */
(function () {
  var PEEK = 10, MAXD = 3, GAP = 20;
  var mq = matchMedia('(max-width: 620px)');
  var rm = matchMedia('(prefers-reduced-motion: reduce)');

  function init(grid) {
    if (grid.classList.contains('apps-apilado')) return;
    Array.prototype.slice.call(grid.children).forEach(function (card) {
      if (!card.classList.contains('app-card')) return;
      var w = document.createElement('div'); w.className = 'stk';
      grid.insertBefore(w, card); w.appendChild(card);
    });
    grid.classList.add('apps-apilado');
    var all = Array.prototype.slice.call(grid.querySelectorAll(':scope > .stk'));
    var items = all;
    /* Celular (17/11/2026, Seba): las más nuevas arriba, apiladas solo las
       primeras SHOW; el resto va a un carrusel que abre «Ver las N apps».
       La fecha es «Actualizada» de cada ficha (components/apps-data.js). */
    var SHOW = 4;
    var byId = window.YIQI_APP_BY_ID || {};
    function fecha(stk) {
      var el = stk.querySelector('[data-href]'), h = el ? el.getAttribute('data-href') : '';
      var m = /id=([^&]+)/.exec(h || ''), a = m && byId[decodeURIComponent(m[1])];
      if (!a) { /* las apps «En desarrollo» no tienen link: se buscan por nombre */
        var nm = stk.querySelector('h3, .app-name'), t = nm ? nm.textContent.trim() : '';
        for (var k in byId) { if (byId[k].name === t) { a = byId[k]; break; } }
      }
      var d = a && a.details ? a.details.filter(function (r) { return r[0] === 'Actualizada'; })[0] : null;
      var f = d && /(\d{2})\/(\d{2})\/(\d{4})/.exec(d[1]);
      return f ? +(f[3] + f[2] + f[1]) : 0;
    }
    /* 17/11/2026 (Seba): primero las disponibles y después las que están en
       desarrollo u homologación; dentro de cada grupo, las más nuevas arriba. */
    function disponible(stk) { return stk.querySelector('.app-card--soon') ? 0 : 1; }
    var nuevas = all.slice().sort(function (x, y) { return (disponible(y) - disponible(x)) || (fecha(y) - fecha(x)); });
    var more = document.createElement('div'); more.className = 'stk-more';
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn btn-secondary stk-more-btn';
    btn.textContent = 'Ver las ' + all.length + ' apps';
    /* 17/11/2026 (Seba): «Ver las N apps» ya no abre un carrusel: el apilado
       sigue hacia abajo con todas (lógica vertical). Con data-apilado-boton="externo"
       el botón propio no se muestra y lo dispara otro elemento con el evento
       «apilado:todas» sobre la grilla (la barra de la solapa Apps de la home). */
    var abierta = false, externo = grid.getAttribute('data-apilado-boton') === 'externo';
    more.appendChild(btn);
    grid.parentNode.insertBefore(more, grid.nextSibling);
    function abrir() { if (abierta) return; abierta = true; onResize(); grid.dispatchEvent(new CustomEvent('apilado:abierta')); }
    btn.addEventListener('click', abrir);
    grid.addEventListener('apilado:todas', abrir);
    grid.apiladoCerrado = function () { return mq.matches && !abierta && all.length > SHOW; };
    function ordenar() {
      if (mq.matches) {
        nuevas.forEach(function (it, i) { grid.appendChild(it); it.hidden = !abierta && i >= SHOW; });
        items = abierta ? nuevas.slice() : nuevas.slice(0, SHOW);
        more.hidden = externo || abierta || all.length <= SHOW;
      } else {
        all.forEach(function (it) { grid.appendChild(it); it.hidden = false; });
        items = all; more.hidden = true;
      }
    }
    ordenar();
    var T = 110, raf = 0;

    function measure() {
      var h = document.querySelector('site-header');
      var hh = h ? h.getBoundingClientRect().height : 56;
      T = Math.round(hh + 14 + PEEK * MAXD);
      grid.style.setProperty('--stk-top', T + 'px');
    }
    function reset() {
      all.forEach(function (it) { var c = it.firstElementChild; c.style.transform = ''; c.style.filter = ''; c.style.opacity = ''; });
    }
    function frame() {
      raf = 0;
      if (!mq.matches) { reset(); return; }
      var p = items.map(function (it, i) {
        if (i === 0) return 0;
        var H = items[i - 1].offsetHeight + GAP;
        return Math.max(0, Math.min(1, 1 - (it.getBoundingClientRect().top - T) / H));
      });
      items.forEach(function (it, i) {
        var d = 0; for (var j = i + 1; j < items.length; j++) d += p[j];
        var c = it.firstElementChild;
        if (rm.matches) { c.style.transform = ''; c.style.filter = ''; return; }
        var dd = Math.min(d, MAXD);
        c.style.transform = dd > 0.001 ? 'translateY(' + (-PEEK * dd).toFixed(2) + 'px) scale(' + (1 - 0.05 * dd).toFixed(4) + ')' : '';
        c.style.filter = d > 0.001 ? 'brightness(' + (1 - 0.1 * Math.min(d, 1)).toFixed(3) + ')' : '';
        c.style.opacity = d > MAXD ? String(Math.max(0, 1 - (d - MAXD))) : '';
      });
    }
    function req() { if (!raf) raf = requestAnimationFrame(frame); }
    function onResize() { ordenar(); reset(); measure(); req(); }
    measure(); frame();
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', onResize);
    mq.addEventListener('change', onResize);
    rm.addEventListener('change', req);
    setTimeout(onResize, 400); /* el site-header termina de pintar después */
  }

  function go() { document.querySelectorAll('.app-grid-featured[data-apilado]').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
