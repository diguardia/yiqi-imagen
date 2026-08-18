/* ============================================================
   YiQi DS · fx-entrada — entradas al aparecer en pantalla
   ------------------------------------------------------------
   Canonico del DS. Se consume por CDN:
     <script src="https://diguardia.github.io/yiqi-imagen/components/fx-entrada.js" defer></script>

   Dos efectos, un solo archivo y un solo observador:

   .ds-fx-lineas  — titulo que sube linea por linea.
   .ds-fx-pasos   — secuencia 1-2-3 que se arma en orden: cada numero
                    aterriza con un halo del acento, entra su texto, y
                    recien despues se dibuja la linea hacia el siguiente.
                    El orden es el mensaje: si los tres aparecen juntos,
                    la seccion deja de decir "primero esto, despues esto".

   Para .ds-fx-lineas se aplica la clase en el titulo. El script parte el
   texto por los <br> que ya tiene el marcado — no adivina donde cortar, usa
   el corte que escribio quien redacto el titulo — y sube cada linea desde
   abajo con un escalonado corto.

   Se dispara cuando el titulo entra en viewport, una sola vez. No hay estado
   que revertir: un titulo que se re-anima al volver a pasar marea.

   Para .ds-fx-pasos la clase va en el contenedor: cada hijo directo es un
   paso, su primer elemento es el numero y el resto es el cuerpo. El script
   solo marca y numera; la coreografia esta en styles.css.

   Con prefers-reduced-motion no anima: muestra y se va. Y si el script no
   llega a correr, todo se ve igual — la clase sola no esconde nada, el
   estado inicial lo pone .ds-fx-listo, que agrega este archivo. Contenido
   invisible por un 404 de CDN no es un riesgo aceptable.
   DS v1.2.7.14 — 14/08/2026.
   ============================================================ */
(function () {
  'use strict';

  function partir(el) {
    var partes = el.innerHTML.split(/<br\s*\/?>/i);
    if (partes.length < 2) partes = [el.innerHTML];
    el.innerHTML = partes.map(function (linea, i) {
      return '<span class="ds-fx-linea"><span style="--i:' + i + '">' +
             linea + '</span></span>';
    }).join('');
  }

  function numerar(cont) {
    var pasos = Array.prototype.filter.call(cont.children, function (n) {
      return n.nodeType === 1;
    });
    pasos.forEach(function (paso, i) {
      paso.classList.add('ds-fx-paso');
      paso.style.setProperty('--i', i);
      var hijos = Array.prototype.filter.call(paso.children, function (n) {
        return n.nodeType === 1;
      });
      hijos.forEach(function (h, j) {
        h.classList.add(j === 0 ? 'ds-fx-nodo' : 'ds-fx-cuerpo');
      });
    });
  }

  function iniciar() {
    var piezas = document.querySelectorAll('.ds-fx-lineas, .ds-fx-pasos');
    if (!piezas.length) return;

    var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    piezas.forEach(function (el) {
      if (el.classList.contains('ds-fx-lineas')) { if (!quieto) partir(el); }
      else numerar(el);
      if (quieto) el.classList.add('ds-fx-on');
      else el.classList.add('ds-fx-listo');
    });
    if (quieto) return;

    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('ds-fx-on');
        io.unobserve(en.target);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });

    piezas.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState !== 'loading') iniciar();
  else document.addEventListener('DOMContentLoaded', iniciar);
})();
