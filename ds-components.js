/*!
 * YiQi DS — Componentes reutilizables (comportamientos)
 * Auto-inicializa al cargar. Expone window.YiQiDS para init manual.
 * Reusable en cualquier app YiQi: <script src=".../ds-components.js" defer></script>
 */
(function () {
  "use strict";

  // Tooltip "i": despliega/cierra el popover al tocar (click / Esc). No usa title.
  function initTooltips() {
    document.addEventListener("click", function (event) {
      var target = event.target instanceof Element ? event.target : null;
      var help = target ? target.closest(".kpi-help") : null;
      document.querySelectorAll(".kpi-help.is-open").forEach(function (el) {
        if (el !== help) { el.classList.remove("is-open"); el.setAttribute("aria-expanded", "false"); }
      });
      if (help) {
        event.preventDefault();
        event.stopPropagation();
        var open = help.classList.toggle("is-open");
        help.setAttribute("aria-expanded", open ? "true" : "false");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        document.querySelectorAll(".kpi-help.is-open").forEach(function (el) {
          el.classList.remove("is-open");
          el.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // Mobile/tablet (<=980): mueve los controles del header al drawer (#sidebar-tools).
  // Mueve los nodos (no duplica) → conserva ids y listeners.
  function initResponsiveTools() {
    var mq = window.matchMedia("(max-width: 980px)");
    var topbarC = document.querySelector(".topbar-c");
    var topbarR = document.querySelector(".topbar-r");
    var tools = document.querySelector("#sidebar-tools");
    var accountChip = document.querySelector("#account-chip");
    var rangeFilter = document.querySelector("#range-filter");
    var refreshBtn = document.querySelector("#refresh-button");
    var logoutBtn = document.querySelector("#logout-button");
    if (!topbarC || !topbarR || !tools) return;
    function apply() {
      if (mq.matches) {
        [accountChip, rangeFilter, refreshBtn, logoutBtn].forEach(function (el) { if (el) tools.appendChild(el); });
      } else {
        if (accountChip) topbarC.appendChild(accountChip);
        if (rangeFilter) topbarC.appendChild(rangeFilter);
        if (refreshBtn) topbarR.appendChild(refreshBtn);
        if (logoutBtn) topbarR.appendChild(logoutBtn);
      }
    }
    apply();
    mq.addEventListener("change", apply);
  }

  // Tablas .data-table: click en <th> ordena. Columnas .num = numéricas; resto alfabético.
  // v1.2.8.8 — una celda puede traer data-sort para ordenar por algo distinto de lo
  // que muestra: un chip de color ordena por su color, una fase por su lugar en el
  // circuito y no por la inicial. Además el th es foco de teclado (Enter / barra) y
  // publica aria-sort, que es lo que lee un lector de pantalla.
  function initSortableTables() {
    var toNum = function (raw) {
      return Number(String(raw).replace(/[^\d,-]/g, "").replace(/\./g, "").replace(",", ".")) || 0;
    };
    var val = function (td) {
      if (!td) return "";
      var raw = td.getAttribute("data-sort");
      return (raw === null ? td.textContent : raw).trim();
    };
    document.querySelectorAll(".data-table").forEach(function (table) {
      var tbody = table.querySelector("tbody");
      if (!tbody) return;
      var headers = Array.prototype.slice.call(table.querySelectorAll("th"));
      headers.forEach(function (th, index) {
        var dir = "asc";
        var isNum = th.classList.contains("num") || th.getAttribute("data-type") === "num";
        if (!th.hasAttribute("tabindex")) th.tabIndex = 0;
        th.setAttribute("aria-sort", "none");
        var ordenar = function () {
          headers.forEach(function (h) {
            if (h !== th) { h.classList.remove("sorted-asc", "sorted-desc"); h.setAttribute("aria-sort", "none"); }
          });
          var rows = Array.prototype.slice.call(tbody.querySelectorAll("tr"));
          rows.sort(function (a, b) {
            var av = val(a.children[index]), bv = val(b.children[index]);
            var cmp = isNum ? toNum(av) - toNum(bv) : av.localeCompare(bv, "es");
            return dir === "asc" ? cmp : -cmp;
          });
          rows.forEach(function (r) { tbody.appendChild(r); });
          th.classList.toggle("sorted-asc", dir === "asc");
          th.classList.toggle("sorted-desc", dir === "desc");
          th.setAttribute("aria-sort", dir === "asc" ? "ascending" : "descending");
          dir = dir === "asc" ? "desc" : "asc";
        };
        th.addEventListener("click", ordenar);
        th.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ordenar(); }
        });
      });
    });
  }

  var YiQiDS = {
    initTooltips: initTooltips,
    initResponsiveTools: initResponsiveTools,
    initSortableTables: initSortableTables,
    initAll: function () { initTooltips(); initResponsiveTools(); initSortableTables(); }
  };
  window.YiQiDS = YiQiDS;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", YiQiDS.initAll);
  } else {
    YiQiDS.initAll();
  }
})();
