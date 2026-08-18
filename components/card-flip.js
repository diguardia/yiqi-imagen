/* ============================================================
   YiQi DS · card-flip — la card gira y muestra el dorso
   ------------------------------------------------------------
   Canonico del DS. Se consume por CDN:
     <script src="https://diguardia.github.io/yiqi-imagen/components/card-flip.js" defer></script>

   Marcado:
     <div class="card ds-flip">
       <div class="ds-flip-in">
         <div class="ds-flip-cara"> … frente … </div>
         <div class="ds-flip-dorso"> … dorso … </div>
       </div>
     </div>

   En desktop gira con el mouse encima (puro CSS). En tactil no hay hover, asi
   que este script cablea el tap. Tambien gira con foco de teclado, para que
   el dorso no quede fuera del alcance de quien navega sin mouse.

   El dorso NO puede llevar el argumento de la card. Es contenido opcional —
   un dato, una prueba, un detalle: mucha gente no lo va a ver nunca, y una
   pieza que esconde su mensaje detras de una interaccion no comunica.

   Con prefers-reduced-motion no gira: hace crossfade. La informacion llega
   igual, sin el movimiento.
   DS v1.2.7.14 — 14/08/2026.
   ============================================================ */
(function () {
  'use strict';

  function iniciar() {
    var cards = document.querySelectorAll('.ds-flip');
    if (!cards.length) return;

    cards.forEach(function (card) {
      /* Alcanzable por teclado: el dorso es contenido, no decoracion. */
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

      function alternar() { card.classList.toggle('is-vuelta'); }

      card.addEventListener('click', function (ev) {
        /* Un link adentro de la card gana: el tap navega, no gira. */
        if (ev.target.closest('a, button')) return;
        alternar();
      });

      card.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        if (ev.target !== card) return;
        ev.preventDefault();
        alternar();
      });

      /* El foco de teclado muestra el dorso; al salir vuelve al frente. Sin
         esto, tabular por la pagina deja cards giradas atras. */
      card.addEventListener('focusout', function (ev) {
        if (card.contains(ev.relatedTarget)) return;
        card.classList.remove('is-vuelta');
      });
    });
  }

  if (document.readyState !== 'loading') iniciar();
  else document.addEventListener('DOMContentLoaded', iniciar);
})();
