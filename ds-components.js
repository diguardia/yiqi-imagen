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

  // Tablas: click en <th> ordena. UNICA implementacion del DS (v1.2.8.83):
  // YiQi.initSortable() del runtime delega aca.
  // - Tres pasos por encabezado: ascendente, descendente y vuelta al orden de
  //   la vista. El orden por defecto no se pierde: es el de las filas tal como
  //   llegaron, y aria-sort vuelve a "none".
  // - Numeros en es-AR: "10.857" es diez mil; "175,73" lleva decimales; "$ 12.418.300".
  //   Columna .num (o data-type="num"), o cuando las dos celdas son numeros.
  // - Fechas d/m/aaaa, con hora opcional, se comparan como fechas, no como texto.
  // - data-sort en la celda ordena por algo distinto de lo que muestra (v1.2.8.8).
  //   Sin data-sort ni texto, se usa el title / aria-label de lo que tenga
  //   adentro: asi el punto de estado (.col-status) ordena por el nombre del estado.
  // - No ordenan: el encabezado con casilla de seleccion y los vacios que no
  //   sean .col-status.
  // - Enter y barra desde el teclado; publica aria-sort (lo leen el lector de
  //   pantalla y las flechas del CSS).
  var FECHA = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ ,]+(\d{1,2}):(\d{2}))?$/;
  function sortValue(td) {
    if (!td) return "";
    var raw = td.getAttribute("data-sort");
    if (raw !== null) return raw.trim();
    var text = td.textContent.trim();
    if (text) return text;
    var marked = td.querySelector("[title], [aria-label]");
    return marked ? (marked.getAttribute("title") || marked.getAttribute("aria-label") || "").trim() : "";
  }
  function asDate(v) {
    var m = FECHA.exec(v);
    return m ? new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)).getTime() : null;
  }
  function asNumber(v) {
    var clean = String(v).replace(/[$\s%]/g, "").replace(/\./g, "").replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(clean) ? parseFloat(clean) : null;
  }
  function compareValues(a, b, isNum) {
    var da = asDate(a), db = asDate(b);
    if (da !== null && db !== null) return da - db;
    var na = asNumber(a), nb = asNumber(b);
    if (na !== null && nb !== null) return na - nb;
    if (isNum) return (na || 0) - (nb || 0);
    return a.localeCompare(b, "es", { numeric: true, sensitivity: "base" });
  }
  function initSortableTable(table) {
    if (!table || table.getAttribute("data-ds-sortable") === "on") return;
    var tbody = table.querySelector("tbody");
    if (!tbody) return;
    table.setAttribute("data-ds-sortable", "on");
    Array.prototype.forEach.call(tbody.rows, function (r, i) { r.setAttribute("data-ds-order", i); });
    var headRow = table.tHead ? table.tHead.rows[0] : table.querySelector("tr");
    if (!headRow) return;
    var headers = Array.prototype.slice.call(headRow.cells);
    headers.forEach(function (th, index) {
      if (th.tagName !== "TH" || th.querySelector("input, select, button")) return;
      var isStatus = th.classList.contains("col-status");
      if (!th.textContent.trim() && !isStatus) return;
      if (isStatus && !th.getAttribute("aria-label")) th.setAttribute("aria-label", "Estado");
      if (isStatus && !th.title) th.title = "Ordenar por estado";
      var isNum = th.classList.contains("num") || th.getAttribute("data-type") === "num";
      if (!th.hasAttribute("tabindex")) th.tabIndex = 0;
      th.setAttribute("aria-sort", "none");
      var ordenar = function () {
        var now = th.getAttribute("aria-sort");
        var next = now === "ascending" ? "descending" : now === "descending" ? "none" : "ascending";
        headers.forEach(function (h) {
          if (h !== th && h.hasAttribute("aria-sort")) { h.setAttribute("aria-sort", "none"); h.classList.remove("sorted-asc", "sorted-desc"); }
        });
        var rows = Array.prototype.slice.call(tbody.rows);
        // filas agregadas despues de iniciar: toman su lugar actual como orden de la vista
        rows.forEach(function (r, i) { if (!r.hasAttribute("data-ds-order")) r.setAttribute("data-ds-order", 100000 + i); });
        rows.sort(function (a, b) {
          if (next === "none") return a.getAttribute("data-ds-order") - b.getAttribute("data-ds-order");
          var cmp = compareValues(sortValue(a.cells[index]), sortValue(b.cells[index]), isNum);
          return next === "ascending" ? cmp : -cmp;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
        th.setAttribute("aria-sort", next);
        th.classList.toggle("sorted-asc", next === "ascending");
        th.classList.toggle("sorted-desc", next === "descending");
      };
      th.addEventListener("click", ordenar);
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ordenar(); }
      });
    });
  }
  function initSortableTables() {
    document.querySelectorAll(".data-table").forEach(initSortableTable);
  }

  var YiQiDS = {
    initTooltips: initTooltips,
    initResponsiveTools: initResponsiveTools,
    initSortableTables: initSortableTables,
    initSortableTable: initSortableTable,
    initAll: function () { initTooltips(); initResponsiveTools(); initSortableTables(); }
  };
  window.YiQiDS = YiQiDS;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", YiQiDS.initAll);
  } else {
    YiQiDS.initAll();
  }
})();
