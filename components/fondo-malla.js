/* ============================================================
   YiQi DS · Fondo de malla — wireframe 3D que rota con el scroll
   ------------------------------------------------------------
   Canonico del DS. Se consume por CDN, no se copia al proyecto:
     <script src="https://diguardia.github.io/yiqi-imagen/components/fondo-malla.js" defer></script>
   Incluir el script ES el opt-in: la pagina que no lo pide no lo tiene.
   Los estilos del canvas viven en styles.css (.fondo-malla); aca solo esta
   la geometria. Hereda --cyan del contexto, asi que en una landing de
   partner toma el acento del partner sin configurar nada.

   Pensado para las landings de integraciones. Es una esfera de nodos unidos por
   aristas, proyectada en perspectiva sobre un canvas 2D. La rotacion no
   corre sola: la maneja la posicion del scroll, asi que el movimiento es
   del visitante y no un loop que gira solo detras del texto.

   Sin Three.js a proposito. Estas paginas reciben los clics pagados y el
   informe de peso del 06/08 midio que el 37 % se va en 3 segundos o menos;
   sumarles ~145 KB de motor 3D para un elemento que vive al 38 % de opacidad
   detras del contenido no se paga. Esto son ~5 KB y hace lo mismo a esa
   opacidad: proyeccion de puntos con dos matrices de rotacion.

   Capas: va en z-index -1, arriba del fondo del body y debajo de todo el
   contenido. Las secciones con fondo propio (.section-mid, .section-dark,
   .section-brand) lo tapan por completo — la malla se ve en el hero y en las
   secciones transparentes, que es donde tiene aire para leerse.

   Respeta prefers-reduced-motion: dibuja igual, pero fijo.
   DS v1.2.7.13 — 14/08/2026.
   ============================================================ */
(function () {
  'use strict';

  var GIROS      = 1.6;    // vueltas en Y a lo largo de toda la pagina
  var INCLINA    = 0.55;   // recorrido en X, en radianes
  var UMBRAL     = 0.86;   // producto punto minimo para unir dos nodos
  var SUAVIZADO  = 0.12;   // lerp por frame hacia la rotacion objetivo

  function iniciar() {
    /* Por defecto se monta fijo detras de toda la pagina. Si existe un
       [data-fondo-malla] se monta adentro de esa caja — es lo que usa la
       demo del catalogo, y sirve para acotar la malla a una seccion. */
    var caja = document.querySelector('[data-fondo-malla]');
    var lienzo = document.createElement('canvas');
    lienzo.className = 'fondo-malla' + (caja ? ' fondo-malla-en-caja' : '');
    lienzo.setAttribute('aria-hidden', 'true');
    if (caja) caja.appendChild(lienzo);
    else document.body.insertBefore(lienzo, document.body.firstChild);

    var ctx = lienzo.getContext('2d');
    if (!ctx) { lienzo.remove(); return; }

    var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ancho = 0, alto = 0, dpr = 1;
    var nodos = [], aristas = [];
    var rotY = 0, rotX = 0, metaY = 0, metaX = 0;
    var corriendo = false;

    /* Esfera de Fibonacci: reparto parejo, sin polos apelmazados. */
    function construir(n) {
      nodos = []; aristas = [];
      var phi = Math.PI * (3 - Math.sqrt(5));
      for (var i = 0; i < n; i++) {
        var y = 1 - (i / (n - 1)) * 2;
        var r = Math.sqrt(Math.max(0, 1 - y * y));
        var t = phi * i;
        nodos.push({ x: Math.cos(t) * r, y: y, z: Math.sin(t) * r });
      }
      for (var a = 0; a < n; a++) {
        for (var b = a + 1; b < n; b++) {
          var d = nodos[a].x * nodos[b].x + nodos[a].y * nodos[b].y + nodos[a].z * nodos[b].z;
          if (d > UMBRAL) aristas.push([a, b]);
        }
      }
    }

    function medir() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = caja ? caja.clientWidth : window.innerWidth;
      alto = caja ? caja.clientHeight : window.innerHeight;
      lienzo.width = Math.round(ancho * dpr);
      lienzo.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function color() {
      var c = getComputedStyle(caja || document.body).getPropertyValue('--cyan').trim();
      return c || '#00c8e0';
    }

    function avance() {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return 0;
      var p = window.scrollY / total;
      return p < 0 ? 0 : p > 1 ? 1 : p;
    }

    function pintar() {
      ctx.clearRect(0, 0, ancho, alto);

      var cy = Math.cos(rotY), sy = Math.sin(rotY);
      var cx = Math.cos(rotX), sx = Math.sin(rotX);
      var radio = Math.min(ancho, alto) * 0.44;
      var dist = 3.2;
      var ox = ancho * 0.5, oy = alto * 0.5;

      var pts = new Array(nodos.length);
      for (var i = 0; i < nodos.length; i++) {
        var n = nodos[i];
        var x1 = n.x * cy + n.z * sy;
        var z1 = n.z * cy - n.x * sy;
        var y2 = n.y * cx - z1 * sx;
        var z2 = z1 * cx + n.y * sx;
        var f = dist / (dist + z2);
        pts[i] = { x: ox + x1 * radio * f, y: oy + y2 * radio * f, p: (z2 + 1) / 2, f: f };
      }

      var tinte = color();

      ctx.strokeStyle = tinte;
      ctx.lineWidth = 1;
      for (var e = 0; e < aristas.length; e++) {
        var A = pts[aristas[e][0]], B = pts[aristas[e][1]];
        ctx.globalAlpha = 0.10 + (1 - (A.p + B.p) / 2) * 0.42;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      ctx.fillStyle = tinte;
      for (var k = 0; k < pts.length; k++) {
        var P = pts[k];
        ctx.globalAlpha = 0.22 + (1 - P.p) * 0.62;
        ctx.beginPath();
        ctx.arc(P.x, P.y, 1.5 * P.f, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function marco() {
      rotY += (metaY - rotY) * SUAVIZADO;
      rotX += (metaX - rotX) * SUAVIZADO;
      pintar();
      if (Math.abs(metaY - rotY) > 0.0006 || Math.abs(metaX - rotX) > 0.0006) {
        requestAnimationFrame(marco);
      } else {
        rotY = metaY; rotX = metaX;
        pintar();
        corriendo = false;
      }
    }

    function apuntar(inmediato) {
      var p = avance();
      metaY = -0.6 + p * Math.PI * 2 * GIROS;
      metaX = -0.32 + p * INCLINA;
      if (quieto || inmediato) { rotY = metaY; rotX = metaX; pintar(); return; }
      if (!corriendo) { corriendo = true; requestAnimationFrame(marco); }
    }

    medir();
    construir(ancho < 720 ? 42 : 64);
    apuntar(true);

    if (!quieto) {
      window.addEventListener('scroll', function () { apuntar(false); }, { passive: true });
    }

    var reloj = null;
    window.addEventListener('resize', function () {
      clearTimeout(reloj);
      reloj = setTimeout(function () {
        var antes = nodos.length;
        medir();
        var ahora = ancho < 720 ? 42 : 64;
        if (ahora !== antes) construir(ahora);
        apuntar(true);
      }, 160);
    });

    /* El tema cambia --cyan: hay que repintar, no solo reencuadrar. */
    new MutationObserver(function () { pintar(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState !== 'loading') iniciar();
  else document.addEventListener('DOMContentLoaded', iniciar);
})();
