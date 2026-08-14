/* ============================================================
   YiQi DS · fx-lineas — entrada de un titulo, linea por linea
   ------------------------------------------------------------
   Canonico del DS. Se consume por CDN:
     <script src="https://diguardia.github.io/yiqi-imagen/components/fx-lineas.js" defer></script>
   Se aplica poniendo la clase .ds-fx-lineas en el titulo. El script parte el
   texto por los <br> que ya tiene el marcado — no adivina donde cortar, usa
   el corte que escribio quien redacto el titulo — y sube cada linea desde
   abajo con un escalonado corto.

   Se dispara cuando el titulo entra en viewport, una sola vez. No hay estado
   que revertir: un titulo que se re-anima al volver a pasar marea.

   Con prefers-reduced-motion no anima: muestra el titulo y se va. Y si el
   script no llega a correr, el titulo se ve igual — la clase sola no esconde
   nada, el estado inicial lo pone este archivo. Un titulo invisible por un
   404 de CDN no es un riesgo aceptable.
   DS v1.2.7.14 — 14/08/2026.
   ============================================================ */
(function () {
  'use strict';

  function partir(el) {
    var partes = el.innerHTML.split(/<br\s*\/?>/i);
    if (partes.length < 2) partes = [el.innerHTML];
    el.innerHTML = partes.map(function (linea, i) {
      return '<span class="ds-fx-linea"><span style="transition-delay:' +
             (i * 90) + 'ms">' + linea + '</span></span>';
    }).join('');
  }

  function iniciar() {
    var titulos = document.querySelectorAll('.ds-fx-lineas');
    if (!titulos.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      titulos.forEach(function (el) { el.classList.add('ds-fx-on'); });
      return;
    }

    titulos.forEach(function (el) {
      partir(el);
      el.classList.add('ds-fx-listo');
    });

    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('ds-fx-on');
        io.unobserve(en.target);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });

    titulos.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState !== 'loading') iniciar();
  else document.addEventListener('DOMContentLoaded', iniciar);
})();
