#!/usr/bin/env node
/**
 * check-catalogo.js — guard del catalogo contra el CSS.
 *
 * Responsabilidad unica: que una muestra del catalogo no copie a mano lo que
 * ya define styles.css. Una muestra escrita con style="..." no se entera
 * cuando el componente cambia, y el catalogo queda atras sin que nadie lo vea.
 *
 * Nace del 19/11/2026: la muestra del kicker en §04 seguia en mono, 10 px y
 * mayusculas cuatro meses despues de que el CSS lo pasara a sans 12 en caja
 * normal (v1.2.7.15), y una pagina del sitio lo copio de ahi. La del badge
 * tambien estaba atras.
 *
 * Tres controles, sobre el catalogo y el showcase:
 *  1. Nada escrito a mano: ningun style="" fuera de <pre>, <code>, <script> y
 *     <style>. El acomodo de una demo va en una clase de cat-clases.css
 *     (19/11/2026, Seba: «quiero que sea todo canon»).
 *  2. Tipografia (§04): cada .wf-sample muestra la clase de su fila.
 *  3. Pisadas: un elemento con una clase del DS no puede pisar, con una clase
 *     cat-*, una propiedad que esa clase ya declara (color, fondo, radio,
 *     letra...). La demo tiene que verse como el componente, no como una copia.
 *
 * Una pisada a proposito (un estado forzado para mostrarlo, el marco de una
 * demo, una variante que el DS todavia no tiene) se marca en el elemento con
 * data-catalogo="motivo". El motivo queda escrito al lado de la excepcion.
 *
 * Uso:
 *   node scripts/check-catalogo.js [pagina.html ...] [--css styles.css] [--json]
 *   (default: yiqi-design-system.html y examples/showcase.html)
 * Sale 1 si hay errores.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const json = args.includes('--json');
const iCss = args.indexOf('--css');
const cssPath = iCss > -1 ? args[iCss + 1] : path.join(__dirname, '..', 'styles.css');
const raiz = path.join(__dirname, '..');
let paginas = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--css');
if (!paginas.length) paginas = [path.join(raiz, 'yiqi-design-system.html'), path.join(raiz, 'examples', 'showcase.html')];
// clases cat-* -> propiedad que declaran
const catDeclara = new Map();
const catPath = path.join(raiz, 'cat-clases.css');
if (fs.existsSync(catPath)) {
  for (const x of fs.readFileSync(catPath, 'utf8').matchAll(/\.(cat-[a-zA-Z0-9-]+)(?::not\(#cat\))*\s*\{([^}]*)\}/g)) {
    catDeclara.set(x[1], [...x[2].matchAll(/([a-z-]+)\s*:/g)].map((y) => y[1]));
  }
}

// Propiedades que hacen al "look" de un componente. El layout de la demo
// (margenes, anchos, grillas, posicion) queda libre: eso es andamiaje.
const LOOK = new Set(['font', 'font-family', 'font-size', 'font-weight', 'letter-spacing',
  'text-transform', 'color', 'background', 'background-color', 'border-radius', 'box-shadow', 'border']);
const TEXTO = new Set(['font', 'font-family', 'font-size', 'font-weight', 'letter-spacing', 'text-transform', 'color']);

// ── CSS: clase -> propiedades que declara su regla base (selector exacto ".clase") ──
const css = fs.readFileSync(cssPath, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const declara = new Map();
const reRegla = /([^{}]+)\{([^{}]*)\}/g;
let m;
while ((m = reRegla.exec(css))) {
  const props = [...m[2].matchAll(/([a-z-]+)\s*:/g)].map((x) => x[1]).filter((p) => LOOK.has(p));
  if (!props.length) continue;
  for (const sel of m[1].split(',').map((s) => s.trim())) {
    const c = /^\.([a-zA-Z0-9_-]+)$/.exec(sel);
    if (!c) continue;
    const set = declara.get(c[1]) || new Set();
    props.forEach((p) => set.add(p));
    declara.set(c[1], set);
  }
}
const normaliza = (p) => (p.startsWith('font') && p !== 'font' ? 'font' : p.startsWith('background') ? 'background' : p);
const pisa = (inline, clase) => {
  const d = declara.get(clase);
  if (!d) return [];
  const dn = new Set([...d].map(normaliza));
  return inline.filter((p) => d.has(p) || dn.has(normaliza(p)));
};

const errores = [];
for (const htmlPath of paginas) {
  const nombre = path.relative(raiz, htmlPath);
  const fuente = fs.readFileSync(htmlPath, 'utf8');
  const html = fuente.replace(/<(pre|code|script|style|textarea)\b[\s\S]*?<\/\1>/gi, (b) => b.replace(/[^\n]/g, ' '));
  const linea = (i) => html.slice(0, i).split('\n').length;
  const reTag = /<([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>/g;
  while ((m = reTag.exec(html))) {
    const attrs = m[2];
    // Control 1: nada escrito a mano
    if (/\sstyle="/.test(attrs)) {
      errores.push({ archivo: nombre, linea: linea(m.index), tipo: 'style-a-mano', clase: m[1], props: ['style=""'] });
      continue;
    }
    // Control 3: una clase cat-* no pisa lo que declara una clase del DS
    const cl = /\sclass="([^"]*)"/.exec(attrs);
    if (!cl || /\sdata-catalogo="[^"]+"/.test(attrs)) continue; // pisada a proposito, con su motivo
    const clases = cl[1].split(/\s+/).filter(Boolean);
    const inline = clases.filter((c) => catDeclara.has(c)).flatMap((c) => catDeclara.get(c)).filter((p) => LOOK.has(p));
    if (!inline.length) continue;
    for (const clase of clases.filter((c) => !c.startsWith('cat-') && c !== 'wf-sample')) {
      const p = pisa(inline, clase);
      if (p.length) errores.push({ archivo: nombre, linea: linea(m.index), tipo: 'pisada', clase, props: p });
    }
  }
  // Control 2: filas de la escala tipografica
  const reFila = /<div class="wf-row">([\s\S]*?)<div class="wf-sample"([^>]*)>([\s\S]*?)<\/div>\s*<\/div>/g;
  while ((m = reFila.exec(html))) {
    const pastillas = [...m[1].matchAll(/>\.([a-zA-Z0-9_-]+)<\/span>/g)].map((x) => x[1]);
    if (!pastillas.length) continue;
    const usaClase = pastillas.some((c) => new RegExp('class="[^"]*\\b' + c + '\\b').test(m[3]));
    if (!usaClase) errores.push({ archivo: nombre, linea: linea(m.index), tipo: 'muestra-tipografica', clase: pastillas[0], props: ['no usa la clase'] });
  }
}

errores.sort((a, b) => a.linea - b.linea);
if (json) {
  console.log(JSON.stringify({ paginas: paginas.map((p) => path.relative(raiz, p)), errores }, null, 2));
} else if (!errores.length) {
  console.log('Check-catalogo: OK (' + paginas.map((p) => path.relative(raiz, p)).join(', ') + ')');
} else {
  for (const e of errores) console.log(`${e.archivo}:${e.linea}  ${e.tipo}  ${e.clase}  ${e.props.join(', ')}`);
  console.log(`\n${errores.length} error(es): estilos escritos a mano o muestras que copian lo que define styles.css.`);
}
process.exit(errores.length ? 1 : 0);
