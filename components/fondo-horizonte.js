/* ============================================================
   YiQi DS · Fondo de horizonte — grilla en fuga con luz cyan
   ------------------------------------------------------------
   Canonico del DS. Se consume por CDN, no se copia al proyecto:
     <script src="https://diguardia.github.io/yiqi-imagen/components/fondo-horizonte.js" defer></script>
   Incluir el script ES el opt-in. Los estilos del canvas viven en
   styles.css (.fondo-horizonte); aca solo esta la geometria.

   Un plano cuadriculado en perspectiva que se desplaza hacia el visitante,
   con la luz de horizonte del manifiesto sobre la linea de fuga. A diferencia
   de .fondo-malla, este NO depende del scroll: avanza por tiempo. Esta hecho
   para paginas de una sola pantalla, donde no hay scroll que manejar la
   animacion — la de en construccion es el caso.

   Canvas 2D, sin librerias: la fuga es y = horizonte + K/z, con z bajando
   con el reloj. ~4 KB.

   Respeta prefers-reduced-motion: dibuja el plano, pero quieto.
   DS v1.2.7.14 — 14/08/2026.
   ============================================================ */
(function () {
  'use strict';

  var PASO    = 9000;  // ms que tarda la grilla en avanzar una linea
  var LINEAS  = 26;    // lineas de profundidad
  var COLS    = 15;    // lineas de fuga a cada lado del centro

  function iniciar() {
    var caja = document.querySelector('[data-fondo-horizonte]');
    var lienzo = document.createElement('canvas');
    lienzo.className = 'fondo-horizonte' + (caja ? ' fondo-horizonte-en-caja' : '');
    lienzo.setAttribute('aria-hidden', 'true');
    if (caja) caja.appendChild(lienzo);
    else document.body.insertBefore(lienzo, document.body.firstChild);

    /* Misma guarda que .fondo-malla: si styles.css todavia no trae la clase,
       el canvas quedaria como un bloque suelto arriba del contenido. */
    if (getComputedStyle(lienzo).position !== (caja ? 'absolute' : 'fixed')) {
      lienzo.remove();
      return;
    }

    var ctx = lienzo.getContext('2d');
    if (!ctx) { lienzo.remove(); return; }

    var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ancho = 0, alto = 0, dpr = 1, inicio = performance.now();

    function medir() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = caja ? caja.clientWidth : window.innerWidth;
      alto = caja ? caja.clientHeight : window.innerHeight;
      lienzo.width = Math.round(ancho * dpr);
      lienzo.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function color() {
      return getComputedStyle(caja || document.body).getPropertyValue('--cyan').trim() || '#00c8e0';
    }

    function pintar(t) {
      ctx.clearRect(0, 0, ancho, alto);

      var cx = ancho / 2;
      var y0 = alto * 0.56;          // linea de horizonte
      var suelo = alto - y0;         // alto del plano visible
      var K = suelo * 0.34;
      var frac = quieto ? 0 : ((t - inicio) % PASO) / PASO;
      var tinte = color();

      /* Luz de horizonte: lo unico calido de la escena. */
      var luz = ctx.createRadialGradient(cx, y0, 0, cx, y0, Math.max(ancho, alto) * 0.42);
      luz.addColorStop(0, tinte);
      luz.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.14;
      ctx.fillStyle = luz;
      ctx.fillRect(0, 0, ancho, alto);

      ctx.strokeStyle = tinte;
      ctx.lineWidth = 1;

      /* Lineas de fuga: del punto de fuga al borde inferior. */
      var pasoAbajo = ancho / COLS;
      for (var j = -COLS; j <= COLS; j++) {
        ctx.globalAlpha = 0.13;
        ctx.beginPath();
        ctx.moveTo(cx, y0);
        ctx.lineTo(cx + j * pasoAbajo, alto);
        ctx.stroke();
      }

      /* Lineas de profundidad: nacen en el horizonte y barren hacia abajo.
         El desfase por reloj es lo que da el avance. */
      for (var i = 1; i <= LINEAS; i++) {
        var z = i - frac;
        var y = y0 + K / z;
        if (y > alto || y < y0) continue;
        var p = (y - y0) / suelo;                    // 0 en el horizonte, 1 abajo
        ctx.globalAlpha = 0.05 + Math.min(p * 1.5, 1) * 0.22;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ancho, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }

    function marco(t) {
      pintar(t);
      if (!quieto) requestAnimationFrame(marco);
    }

    medir();
    requestAnimationFrame(marco);

    var reloj = null;
    window.addEventListener('resize', function () {
      clearTimeout(reloj);
      reloj = setTimeout(function () { medir(); pintar(performance.now()); }, 160);
    });

    new MutationObserver(function () { pintar(performance.now()); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState !== 'loading') iniciar();
  else document.addEventListener('DOMContentLoaded', iniciar);
})();
