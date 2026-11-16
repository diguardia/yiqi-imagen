#!/usr/bin/env node
/**
 * check-radius.js — guard de radios del DS.
 *
 * Responsabilidad unica: que ningun componente de styles.css elija su radio.
 * Cada `border-radius` usa un rol (--radius-control, --radius-card, ...), y
 * los roles se definen una sola vez en :root sobre la escala.
 *
 * Nace del inventario del 16/11/2026: 198 declaraciones, 7 pasos de escala y
 * ninguna regla de cual usar. Los controles usaban 6 radios distintos y las
 * superficies 9; una pieza nueva de header salio con tres. Con roles, cambiar
 * el criterio es cambiar una linea, y una pieza nueva no puede inventar el suyo.
 *
 * Uso:
 *   node scripts/check-radius.js [archivo.css ...]   (default: styles.css)
 *   --json   salida maquinal, para CI
 *
 * Permitido en un border-radius: var(--radius-<rol>), 0, 50%, inherit.
 * Sale 1 si hay errores.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROLES = ['panel', 'card', 'block', 'item', 'detail', 'hairline', 'button', 'field', 'popover', 'control', 'track'];
const ESCALA = ['2xs', 'xs', 'sm', '', 'md', 'lg', 'xl', 'pill'];
const LIBRES = new Set(['0', '50%', 'inherit']);

const args = process.argv.slice(2);
const json = args.includes('--json');
const archivos = args.filter((a) => !a.startsWith('--'));
if (!archivos.length) archivos.push(path.join(__dirname, '..', 'styles.css'));

const errores = [];
for (const archivo of archivos) {
  const fuente = fs.readFileSync(archivo, 'utf8');
  // Los comentarios se blanquean conservando los saltos de linea, para que el numero de linea siga valiendo.
  const css = fuente.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
  const linea = (i) => css.slice(0, i).split('\n').length;

  // 1. Cada rol esta definido, una vez, y apunta a la escala.
  for (const rol of ROLES) {
    const defs = [...css.matchAll(new RegExp(`--radius-${rol}\\s*:\\s*([^;]+);`, 'g'))];
    if (defs.length === 0) errores.push({ archivo, linea: 0, motivo: `falta definir el rol --radius-${rol}` });
    if (defs.length > 1) errores.push({ archivo, linea: linea(defs[1].index), motivo: `--radius-${rol} esta definido ${defs.length} veces` });
    for (const d of defs) {
      const v = d[1].trim();
      const ok = ESCALA.some((e) => v === `var(--radius${e ? '-' + e : ''})`);
      if (!ok) errores.push({ archivo, linea: linea(d.index), motivo: `--radius-${rol} vale "${v}": un rol apunta a un paso de la escala` });
    }
  }

  // 2. Ningun border-radius (ni sus variantes por esquina) usa otra cosa que roles.
  const decl = /(border(?:-[a-z]+)*-radius)\s*:\s*([^;}]+)/g;
  for (const m of css.matchAll(decl)) {
    const valor = m[2].replace(/!important/g, '').trim();
    const partes = valor.match(/var\([^)]*\)|[^\s/]+/g) || [];
    for (const p of partes) {
      if (LIBRES.has(p)) continue;
      const r = /^var\(--radius-([a-z0-9]+)\)$/.exec(p);
      if (r && ROLES.includes(r[1])) continue;
      const pista = r || /^var\(--radius\)$/.test(p)
        ? 'es un paso de la escala: usar el rol que corresponda'
        : 'valor a mano: usar el rol que corresponda';
      errores.push({ archivo, linea: linea(m.index), motivo: `${m[1]}: ${valor}  →  "${p}" ${pista}` });
    }
  }
}

if (json) {
  console.log(JSON.stringify({ errores }, null, 2));
} else if (errores.length) {
  console.error(`check-radius: ${errores.length} error(es)\n`);
  for (const e of errores) console.error(`  ${path.basename(e.archivo)}:${e.linea}  ${e.motivo}`);
  console.error(`\nRoles: ${ROLES.map((r) => '--radius-' + r).join(', ')}. Tambien valen 0, 50% e inherit.`);
} else {
  console.log(`check-radius: OK (${archivos.map((a) => path.basename(a)).join(', ')})`);
}
process.exit(errores.length ? 1 : 0);
