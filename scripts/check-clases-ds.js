#!/usr/bin/env node
/**
 * check-clases-ds.js — guard de contrato entre el DS y sus consumidores.
 *
 * Responsabilidad unica: verificar que las clases CSS que un repo usa, declara
 * y documenta esten de acuerdo con el styles.css canonico.
 *
 * Nace de la auditoria del 11/08/2026, que encontro en produccion:
 *   · `login-input` y `login-spinner` usadas por el componente React del login
 *     y definidas en ninguna hoja: los campos renderizaban sin estilo.
 *   · `btn-secondary` documentada en el catalogo, inexistente en el CSS, y
 *     usada en un informe que se le manda a clientes.
 *   · 78 clases declaradas y nunca usadas en un solo entregable.
 * Los tres los detecta este script en segundos. La documentacion no falla
 * nunca; por eso puede mentir durante meses. Un test falla.
 *
 * Uso:
 *   node scripts/check-clases-ds.js <ruta-repo> [<ruta-repo> ...]
 *   node scripts/check-clases-ds.js ../www.yiqi ../mi-cuenta-yiqi
 *
 * Opciones:
 *   --ds <archivo>       hoja canonica (default: styles.css junto a este repo)
 *   --runtime <archivo>  runtime del DS (default: yiqi-runtime.js al lado de la hoja)
 *   --json           salida maquinal, para CI
 *   --solo-errores   omite los avisos, imprime unicamente lo que rompe
 *   --sin-fallo      siempre sale 0 (para inventariar sin romper el build)
 *
 * Sale 1 si hay errores. Los avisos no rompen el build.
 *
 * Silenciar un falso positivo: crear `.ds-lint-ignore` en la raiz del repo
 * consumidor, un patron por linea (glob simple con *). Las lineas que empiezan
 * con # son comentarios.
 *
 * Un .md que documenta una app y no el catalogo se declara fuera de alcance
 * poniendo `<!-- ds-lint: no-es-catalogo -->` en cualquier linea.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname, dirname, relative, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ_DS = resolve(AQUI, '..');

// ── Configuracion ──────────────────────────────────────────────────────────
const DIRS_SALTADOS = new Set([
  'node_modules', '.git', 'build', 'dist', '.next', '.docusaurus',
  'coverage', '_to_delete', '.cache', 'out', 'vendor',
]);
const EXT_TEXTO = new Set(['.html', '.htm', '.css', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx']);
const EXT_MARCADO = new Set(['.html', '.htm', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx']);

/**
 * Vocabularios que no son nuestros. Una clase de Tailwind o de Infima no
 * tiene por que estar en styles.css: no es un incumplimiento del contrato.
 */
const AJENAS = [
  // utilitarias tipo Tailwind / Bootstrap
  /^(sm|md|lg|xl|2xl|hover|focus|active|dark|group|peer|print|motion):/,
  /^(flex|grid|hidden|block|inline|inline-block|table|contents)$/,
  /^(text|bg|border|from|via|to|ring|divide|placeholder|caret|accent|fill|stroke)-/,
  /^(p|m|w|h|gap|space|inset|top|left|right|bottom|z|order|basis|grow|shrink)[trblxy]?-/,
  /^(rounded|shadow|opacity|blur|brightness|contrast|saturate|backdrop)-/,
  /^(font|leading|tracking|align|justify|items|self|content|place|whitespace|break)-/,
  /^(min|max|aspect|object|overflow|overscroll|columns|col|row)-/,
  /^(transition|duration|delay|ease|animate|transform|scale|rotate|translate|skew|origin)-/,
  /^(cursor|select|pointer|resize|list|appearance|outline|sr|not-sr)-/,
  /^(absolute|relative|fixed|sticky|static|visible|invisible|truncate|italic|underline|uppercase|lowercase|capitalize|antialiased|container)$/,
  // Docusaurus / Infima
  /^(navbar|menu|footer|pagination|breadcrumbs|dropdown|alert|badge|button|card|col|row|container|tabs|table-of|theme|markdown|admonition|codeBlock|clean-btn|screen-reader|docusaurus|main-wrapper|docSidebar|docMainContainer|skipToContent)/,
  // librerias de terceros habituales
  /^(swiper|slick|leaflet|chartjs|gm-|pac-|tally|calendly|grecaptcha)/,
  /^ph-/,               // Phosphor Icons
  /^fa-/, /^bi-/,       // Font Awesome / Bootstrap Icons
  // convenciones de estado y utilidades locales legitimas
  /^(is|has|js|no|u|t)-/,
  /^_/,
  /^[A-Z]/,             // componentes React usados como clase por error de parseo
];

// ── Utilidades ─────────────────────────────────────────────────────────────
const sinComentarios = (s) => s.replace(/\/\*[\s\S]*?\*\//g, ' ');
/* Una clase de verdad: arranca con letra, tiene al menos 3 caracteres y no
   termina en guion. Los fragmentos que deja una interpolacion a medias
   (`.on-`, `.t`, `.cls`) caen por aca y no ensucian el informe. */
const ES_CLASE = (c) => /^[a-zA-Z][\w-]*$/.test(c) && c.length >= 3 && !c.endsWith('-');

function* recorrer(dir) {
  let entradas;
  try { entradas = readdirSync(dir); } catch { return; }
  for (const nombre of entradas) {
    if (DIRS_SALTADOS.has(nombre)) continue;
    const p = join(dir, nombre);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) yield* recorrer(p);
    else yield p;
  }
}

/** Clases que el marcado pide. Cubre HTML, JSX y los patrones de template. */
function clasesUsadas(texto) {
  const out = new Set();
  const meter = (v) => v.split(/\s+/).forEach((c) => { if (ES_CLASE(c)) out.add(c); });

  for (const m of texto.matchAll(/\bclass(?:Name)?="([^"{}]*)"/g)) meter(m[1]);
  for (const m of texto.matchAll(/\bclass(?:Name)?='([^'{}]*)'/g)) meter(m[1]);
  // template literals: `card ${abierto ? 'open' : ''}`
  for (const m of texto.matchAll(/\bclass(?:Name)?=\{`([^`]*)`\}/g)) meter(m[1].replace(/\$\{[^}]*\}/g, ' '));
  for (const m of texto.matchAll(/\bclass="([^"]*\$\{[^"]*)"/g)) meter(m[1].replace(/\$\{[^}]*\}/g, ' '));
  // classList.add('x','y') / toggle('x', cond)
  for (const m of texto.matchAll(/classList\.(?:add|remove|toggle|contains|replace)\(([^)]*)\)/g)) {
    for (const s of m[1].matchAll(/['"]([\w-]+)['"]/g)) if (ES_CLASE(s[1])) out.add(s[1]);
  }
  for (const m of texto.matchAll(/querySelector(?:All)?\(\s*['"]\.([\w-]+)/g)) {
    if (ES_CLASE(m[1])) out.add(m[1]);
  }
  return out;
}

/**
 * Clases que el codigo busca o alterna. Existen para que el JS las encuentre,
 * no para pintar nada: que no tengan CSS es lo normal, no un defecto. Se
 * reportan como aviso, nunca como error.
 */
function ganchosDeJs(texto) {
  const out = new Set();
  for (const m of texto.matchAll(/classList\.(?:add|remove|toggle|contains|replace)\(([^)]*)\)/g)) {
    for (const s of m[1].matchAll(/['"]([\w-]+)['"]/g)) if (ES_CLASE(s[1])) out.add(s[1]);
  }
  for (const m of texto.matchAll(/querySelector(?:All)?\(\s*['"]\.([\w-]+)/g)) if (ES_CLASE(m[1])) out.add(m[1]);
  for (const m of texto.matchAll(/getElementsByClassName\(\s*['"]([\w-]+)/g)) if (ES_CLASE(m[1])) out.add(m[1]);
  for (const m of texto.matchAll(/closest\(\s*['"]\.([\w-]+)/g)) if (ES_CLASE(m[1])) out.add(m[1]);
  return out;
}

/** Todo lo que en el repo tenga forma de CSS: hojas, <style>, y strings de CSS. */
function trozosCss(ruta, texto) {
  if (extname(ruta) === '.css') return [texto];
  const out = [];
  for (const m of texto.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) out.push(m[1]);
  const pareceCss = (s) => /\.[a-zA-Z][\w-]*[^{}]*\{[^{}]*[:;]/.test(s);
  for (const m of texto.matchAll(/`([^`]{40,})`/g)) if (pareceCss(m[1])) out.push(m[1]);
  // arrays de strings de CSS: ['.x{...}', '.y{...}'].join('\n')
  for (const m of texto.matchAll(/['"]([^'"\n]{20,})['"]/g)) if (pareceCss(m[1])) out.push(m[1]);
  return out;
}

const SELECTOR_CLASE = /\.([a-zA-Z][\w-]*)(?=[^{}]*\{[^{}]*[:;])/g;
function clasesDeclaradas(css) {
  const out = new Set();
  for (const m of sinComentarios(css).matchAll(SELECTOR_CLASE)) out.add(m[1]);
  return out;
}

/* En un .md, un punto seguido de una palabra casi siempre es una extension o
   un dotfile, no un componente. Sin este filtro el informe se llena de
   `.gitignore`, `.env` y `.svg`, y deja de tomarse en serio. */
const NO_ES_COMPONENTE = new Set([
  'gitignore', 'gitattributes', 'dockerignore', 'editorconfig', 'nvmrc', 'npmrc',
  'nojekyll', 'env', 'git', 'github', 'vscode', 'claude', 'next', 'cache',
  'json', 'html', 'htm', 'css', 'scss', 'less', 'js', 'mjs', 'cjs', 'ts', 'tsx',
  'jsx', 'md', 'mdx', 'yml', 'yaml', 'toml', 'lock', 'txt', 'xml', 'svg', 'png',
  'jpg', 'jpeg', 'webp', 'gif', 'ico', 'pdf', 'woff', 'woff2', 'ttf', 'otf',
  'sh', 'py', 'rb', 'go', 'java', 'sql', 'csv', 'zip', 'gz', 'tar', 'map',
  'test', 'spec', 'min', 'd', 'com', 'ar', 'net', 'org', 'io', 'dev', 'app',
  // dotfiles con guion: el filtro de "tiene que llevar guion" no los agarra
  'node-version', 'ds-lint-ignore', 'well-known', 'eslintrc-json', 'babelrc-json',
]);

/* Placeholders de la documentacion en castellano: `.mi-clase`, `.mi-tabla`.
   Son ejemplos, no componentes. */
const ES_PLACEHOLDER = (c) => /^mi-/.test(c) || /^(tu|su)-/.test(c);

/**
 * Clases que un .md presenta como componentes.
 * La forma `.algo` solo cuenta si lleva guion: los componentes del DS son
 * `btn-secondary`, `card-kicker`, `kpi-block`. Una palabra suelta despues de
 * un punto es, casi siempre, una extension. Las de una sola palabra se aceptan
 * unicamente cuando vienen dentro de un `class="..."`, donde no hay ambiguedad.
 */
function clasesDocumentadas(md) {
  const out = new Set();
  let cod = [...md.matchAll(/```[\s\S]*?```/g), ...md.matchAll(/`([^`\n]+)`/g)]
    .map((m) => m[1] ?? m[0]).join('\n');
  /* Un doc que dice "no hay .btn-secondary" o "deprecada: .sc-input" no esta
     prometiendo el componente: esta advirtiendo. Se sacan los comentarios de
     CSS y las lineas en negativo antes de buscar, o el guard termina
     reportando como fantasma justo a la frase que aclara que no existe. */
  cod = cod.replace(/\/\*[\s\S]*?\*\//g, ' ');
  cod = cod.split('\n')
    .filter((l) => !/(\bno (hay|existe|publica|usar|se publica)\b|nunca existi|deprecad|obsolet|renombrad|reemplazad|\bya no\b|dej[oó] de|incorrecto|❌|el can[oó]nico usa|en cambio usa)/i.test(l))
    .join('\n');
  for (const m of cod.matchAll(/(?:^|[\s"'(<{;,])\.([a-z][\w-]*-[\w-]+)(?=[\s"'){};,:.]|$)/gm)) {
    if (!NO_ES_COMPONENTE.has(m[1]) && !ES_PLACEHOLDER(m[1]) && ES_CLASE(m[1])) out.add(m[1]);
  }
  for (const m of cod.matchAll(/\bclass(?:Name)?="([^"]+)"/g)) {
    m[1].split(/\s+/).forEach((c) => { if (ES_CLASE(c) && !NO_ES_COMPONENTE.has(c) && !ES_PLACEHOLDER(c)) out.add(c); });
  }
  return out;
}

function patronesIgnorados(raiz) {
  const f = join(raiz, '.ds-lint-ignore');
  if (!existsSync(f)) return [];
  return readFileSync(f, 'utf8').split('\n')
    .map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
    .map((l) => new RegExp('^' + l.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'));
}

const esAjena = (c, extra) => AJENAS.some((r) => r.test(c)) || extra.some((r) => r.test(c));

// ── Analisis de un repo ────────────────────────────────────────────────────
function analizar(raiz, publicadas) {
  const ignorar = patronesIgnorados(raiz);
  const usadas = new Map();      // clase -> primer archivo:linea
  const declaradas = new Map();
  const documentadas = new Map();
  const ganchos = new Set();
  let nArchivos = 0;
  let usaCssModules = false;

  for (const ruta of recorrer(raiz)) {
    const ext = extname(ruta);
    const rel = relative(raiz, ruta);
    if (ext === '.md') {
      let t; try { t = readFileSync(ruta, 'utf8'); } catch { continue; }
      /* Un .md que documenta una app consumidora —no el catalogo del DS— usa
         legitimamente clases que la hoja no publica. Se declara a si mismo
         fuera de alcance con <!-- ds-lint: no-es-catalogo --> en cualquier
         linea. El alcance viaja con el archivo, no en una lista aparte. */
      if (/<!--\s*ds-lint:\s*no-es-catalogo\s*-->/.test(t)) continue;
      for (const c of clasesDocumentadas(t)) if (!documentadas.has(c)) documentadas.set(c, rel);
      continue;
    }
    if (!EXT_TEXTO.has(ext)) continue;
    if (basename(ruta).includes('.module.')) usaCssModules = true;
    let t; try { t = readFileSync(ruta, 'utf8'); } catch { continue; }
    nArchivos++;

    if (EXT_MARCADO.has(ext)) {
      for (const c of ganchosDeJs(t)) ganchos.add(c);
      for (const c of clasesUsadas(t)) {
        if (!usadas.has(c)) {
          const i = t.indexOf(c);
          usadas.set(c, `${rel}:${t.slice(0, i).split('\n').length}`);
        }
      }
    }
    for (const trozo of trozosCss(ruta, t)) {
      for (const c of clasesDeclaradas(trozo)) if (!declaradas.has(c)) declaradas.set(c, rel);
    }
  }

  const vivo = (c) => !esAjena(c, ignorar);
  const errores = [];
  const avisos = [];

  // HUERFANA — el marcado pide una clase que no existe en ningun lado.
  for (const [c, donde] of usadas) {
    if (!vivo(c) || publicadas.has(c) || declaradas.has(c)) continue;
    if (ganchos.has(c)) {
      avisos.push({ tipo: 'GANCHO', clase: c, donde,
        nota: 'el codigo la busca pero ningun CSS la pinta; si era decorativa, falta el estilo' });
    } else {
      errores.push({ tipo: 'HUERFANA', clase: c, donde,
        nota: 'usada en el marcado y definida en ninguna hoja: el elemento renderiza sin estilo' });
    }
  }
  // FANTASMA — un .md la presenta como componente y el DS no la publica.
  for (const [c, donde] of documentadas) {
    if (!vivo(c) || publicadas.has(c) || declaradas.has(c)) continue;
    if (!usadas.has(c)) {
      errores.push({ tipo: 'FANTASMA', clase: c, donde,
        nota: 'documentada como componente y ausente del CSS canonico' });
    }
  }
  // PISADA — el DS la publica y el repo la redefine igual.
  for (const [c, donde] of declaradas) {
    if (!vivo(c) || !publicadas.has(c) || !usadas.has(c)) continue;
    avisos.push({ tipo: 'PISADA', clase: c, donde,
      nota: 'el DS ya la publica; la copia local puede divergir sin que nadie se entere' });
  }
  // MUERTA — declarada y nunca usada.
  for (const [c, donde] of declaradas) {
    if (!vivo(c) || usadas.has(c) || publicadas.has(c)) continue;
    avisos.push({ tipo: 'MUERTA', clase: c, donde, nota: 'declarada y nunca usada' });
  }

  return { raiz, nArchivos, usaCssModules,
    conteos: { usadas: usadas.size, declaradas: declaradas.size, documentadas: documentadas.size },
    errores: errores.sort((a, b) => a.clase.localeCompare(b.clase)),
    avisos: avisos.sort((a, b) => a.tipo.localeCompare(b.tipo) || a.clase.localeCompare(b.clase)) };
}

// ── CLI ────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const valor = (n, def) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : def; };
const rutas = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--ds');

const archivoDs = resolve(valor('--ds', join(RAIZ_DS, 'styles.css')));
if (!existsSync(archivoDs)) {
  console.error(`No encuentro la hoja canonica: ${archivoDs}\nPasala con --ds <archivo>.`);
  process.exit(2);
}
const publicadas = clasesDeclaradas(readFileSync(archivoDs, 'utf8'));

/* El DS publica dos contratos, no uno: el de estilo (styles.css) y el de
   comportamiento (yiqi-runtime.js). Las clases de parte del logo
   —.yq-y, .yq-q, .yq-i1s…— no llevan CSS a proposito: existen para que el
   runtime las encuentre. Sin leer el runtime, el guard las marcaba como
   huerfanas en los 6 repos y el informe empezaba con 28 falsos positivos. */
const archivoRuntime = resolve(valor('--runtime', join(dirname(archivoDs), 'yiqi-runtime.js')));
if (existsSync(archivoRuntime)) {
  const rt = readFileSync(archivoRuntime, 'utf8');
  for (const m of rt.matchAll(/['"]([a-z][\w-]*-[\w-]+)['"]/g)) {
    if (/^yq-|^yiqi-|^ds-|^login-|^sb-|^theme-/.test(m[1])) publicadas.add(m[1]);
  }
  for (const m of rt.matchAll(/querySelector(?:All)?\(\s*['"`]\.([\w-]+)/g)) publicadas.add(m[1]);
  for (const m of rt.matchAll(/classList\.(?:add|remove|toggle)\(\s*['"]([\w-]+)/g)) publicadas.add(m[1]);
}

if (rutas.length === 0) {
  console.error('Uso: node scripts/check-clases-ds.js <ruta-repo> [<ruta-repo> ...]');
  process.exit(2);
}

const C = process.stdout.isTTY
  ? { rojo: '\x1b[31m', ama: '\x1b[33m', gris: '\x1b[90m', neg: '\x1b[1m', fin: '\x1b[0m' }
  : { rojo: '', ama: '', gris: '', neg: '', fin: '' };

const informes = rutas.map((r) => analizar(resolve(r), publicadas));

if (flag('--json')) {
  console.log(JSON.stringify({ ds: archivoDs, publicadas: publicadas.size, informes }, null, 2));
} else {
  console.log(`${C.neg}Contrato DS · ${publicadas.size} clases publicadas en ${relative(process.cwd(), archivoDs) || archivoDs}${C.fin}\n`);
  for (const inf of informes) {
    const nombre = basename(inf.raiz);
    console.log(`${C.neg}${nombre}${C.fin} ${C.gris}— ${inf.nArchivos} archivos · ${inf.conteos.usadas} clases usadas · ${inf.conteos.declaradas} declaradas${C.fin}`);
    if (inf.usaCssModules) {
      console.log(`  ${C.gris}(usa CSS Modules: las clases con hash no se pueden cruzar, el conteo va corto)${C.fin}`);
    }
    for (const e of inf.errores) {
      console.log(`  ${C.rojo}ERROR${C.fin}  ${e.tipo.padEnd(9)} .${e.clase}`);
      console.log(`         ${C.gris}${e.donde} — ${e.nota}${C.fin}`);
    }
    if (!flag('--solo-errores')) {
      for (const a of inf.avisos) {
        console.log(`  ${C.ama}aviso${C.fin}  ${a.tipo.padEnd(9)} .${a.clase} ${C.gris}(${a.donde})${C.fin}`);
      }
    }
    if (!inf.errores.length) console.log(`  ${C.gris}sin errores${C.fin}`);
    console.log();
  }
  const nE = informes.reduce((n, i) => n + i.errores.length, 0);
  const nA = informes.reduce((n, i) => n + i.avisos.length, 0);
  console.log(`${C.neg}${nE} error(es), ${nA} aviso(s).${C.fin}`);
  if (nE) console.log(`${C.gris}Un ERROR significa que algo se renderiza sin el estilo que promete. Los avisos no rompen el build.${C.fin}`);
}

const hayErrores = informes.some((i) => i.errores.length > 0);
process.exit(hayErrores && !flag('--sin-fallo') ? 1 : 0);
