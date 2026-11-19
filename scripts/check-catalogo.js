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
 * Dos controles:
 *  1. Tipografia (§04): cada .wf-sample muestra la clase de su fila, sin
 *     estilos de texto escritos a mano.
 *  2. Pisadas: un elemento con una clase del DS no puede pisar con style=""
 *     una propiedad que esa clase ya declara (color, fondo, radio, letra...).
 *     La demo tiene que verse como el componente, no como una copia.
 *
 * Una pisada a proposito (un estado forzado para mostrarlo, el marco de una
 * demo, una variante que el DS todavia no tiene) se marca en el elemento con
 * data-catalogo="motivo". El motivo queda escrito al lado de la excepcion.
 *
 * Uso:
 *   node scripts/check-catalogo.js [catalogo.html] [--css styles.css] [--json]
 * Sale 1 si hay errores.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const json = args.includes('--json');
const iCss = args.indexOf('--css');
const cssPath = iCss > -1 ? args[iCss + 1] : path.join(__dirname, '..', 'styles.css');
const htmlPath = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--css')
  || path.join(__dirname, '..', 'yiqi-design-system.html');

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

// ── HTML: etiquetas con class y style, fuera de <pre>, <code>, <script> y <style> ──
const fuente = fs.readFileSync(htmlPath, 'utf8');
const html = fuente.replace(/<(pre|code|script|style|textarea)\b[\s\S]*?<\/\1>/gi, (b) => b.replace(/[^\n]/g, ' '));
const linea = (i) => html.slice(0, i).split('\n').length;
const errores = [];

const reTag = /<([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>/g;
while ((m = reTag.exec(html))) {
  const attrs = m[2];
  const st = /\sstyle="([^"]*)"/.exec(attrs);
  const cl = /\sclass="([^"]*)"/.exec(attrs);
  if (!st || !cl) continue;
  if (/\sdata-catalogo="[^"]+"/.test(attrs)) continue; // pisada a proposito, con su motivo
  const inline = [...st[1].matchAll(/([a-z-]+)\s*:/g)].map((x) => x[1]).filter((p) => LOOK.has(p));
  if (!inline.length) continue;
  for (const clase of cl[1].split(/\s+/).filter(Boolean)) {
    if (clase === 'wf-sample') continue; // lo cubre el control 1
    const p = pisa(inline, clase);
    if (p.length) errores.push({ linea: linea(m.index), tipo: 'pisada', clase, props: p });
  }
}

// ── Control 1: filas de la escala tipografica ──
const reFila = /<div class="wf-row">([\s\S]*?)<div class="wf-sample"([^>]*)>([\s\S]*?)<\/div>\s*<\/div>/g;
while ((m = reFila.exec(html))) {
  const pastillas = [...m[1].matchAll(/>\.([a-zA-Z0-9_-]+)<\/span>/g)].map((x) => x[1]);
  if (!pastillas.length) continue;
  const st = /style="([^"]*)"/.exec(m[2]);
  const texto = st ? [...st[1].matchAll(/([a-z-]+)\s*:/g)].map((x) => x[1]).filter((p) => TEXTO.has(p)) : [];
  const usaClase = pastillas.some((c) => new RegExp('class="[^"]*\\b' + c + '\\b').test(m[3]) || new RegExp('class="[^"]*\\b' + c + '\\b').test(m[2]));
  if (texto.length || !usaClase) {
    errores.push({ linea: linea(m.index), tipo: 'muestra-tipografica', clase: pastillas[0],
      props: texto.length ? texto : ['no usa la clase'] });
  }
}

errores.sort((a, b) => a.linea - b.linea);
if (json) {
  console.log(JSON.stringify({ archivo: path.basename(htmlPath), errores }, null, 2));
} else if (!errores.length) {
  console.log('Check-catalogo: OK (' + path.basename(htmlPath) + ')');
} else {
  for (const e of errores) {
    console.log(`${path.basename(htmlPath)}:${e.linea}  ${e.tipo}  .${e.clase}  ${e.props.join(', ')}`);
  }
  console.log(`\n${errores.length} muestra(s) copian a mano lo que define styles.css.`);
}
process.exit(errores.length ? 1 : 0);
