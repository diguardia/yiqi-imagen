/* ============================================================
   YiQi App Banner — Web Component
   Uso: <app-banner app="inv"></app-banner>
        apps: ana | prov | inv | pos | pick | cons
   Banner promocional por app del Marketplace. Acento 100%% por token
   (var(--violet|--orange|--green|--amber|--magenta|--blue)); paleta
   invertida (tarjeta clara) como <analytics-pro-banner>.
   El cyan del logo YiQi es marca madre, NO el acento de la app.
   ============================================================ */
(function(){
  const GL = {
    ana:'<path d="M3 3v18h18"/><polyline points="7 13 11 9 14 12 20 6"/>',
    prov:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8M8 9h2"/>',
    inv:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16"/><path d="M12 13l2 2 4-4"/>',
    pos:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    pick:'<path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><rect x="9" y="2.5" width="6" height="4" rx="1"/><path d="M8.5 13.5l2 2 4-4"/>',
    cons:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'
  };
  const APPS = {
    ana:{accent:'violet', icon:'ana', state:'live', title:'YiQi <em>Analytics</em> Pro',
      tag:'Tablero gerencial con KPIs en tiempo real e IA: ventas, stock, finanzas y márgenes por canal.',
      b:[['Tablero en vivo','KPIs y forecast al instante'],['Por canal','márgenes comparables'],['Con IA','proyección de cashflow']], cta:'Ver app'},
    prov:{accent:'orange', icon:'prov', state:'dev', title:'Front de <em>Proveedores</em> OCR',
      tag:'Portal de autogestión para proveedores: carga de facturas y órdenes de compra con OCR, integrado a YiQi.',
      b:[['Carga con OCR','facturas y OC sin tipeo'],['Autogestión','estados y comprobantes online'],['Integrado a YiQi','cae en Compras']], cta:'Ver app'},
    inv:{accent:'green', icon:'inv', state:'dev', title:'Inventariado <em>Mobile</em>',
      tag:'Relevá y controlá el stock de tus depósitos desde el celular, sincronizado con YiQi en tiempo real.',
      b:[['Escaneo sin hardware','la cámara como lector'],['Sync en tiempo real','impacta en el stock'],['Diferencias','faltantes y sobrantes']], cta:'Ver app'},
    pos:{accent:'amber', icon:'pos', state:'live', title:'YiQi <em>POS</em>',
      tag:'Punto de venta para Windows: modo offline, multi-caja, medios de pago e impresión fiscal, integrado al ERP.',
      b:[['Funciona offline','vendés sin internet'],['Multi-caja y turnos','cierres y arqueos'],['Impresión fiscal','Epson y Hasar']], cta:'Ver app'},
    pick:{accent:'magenta', icon:'pick', state:'dev', title:'Picking <em>List</em>',
      tag:'Listas de preparación para depósito: armá el picking de varios pedidos y controlá la salida de mercadería.',
      b:[['Picking multi-pedido','preparás varios a la vez'],['Por ubicación','recorrido optimizado'],['Control de salida','remitos y etiquetas']], cta:'Ver app'},
    cons:{accent:'blue', icon:'cons', state:'dev', title:'Consulta de <em>pedidos</em>',
      tag:'Búsqueda y seguimiento ágil de pedidos por estado, canal y cliente, sincronizado con YiQi en tiempo real.',
      b:[['Búsqueda al instante','por estado, canal o cliente'],['Seguimiento en vivo','del pedido a la entrega'],['Sincronizado','datos reales de YiQi']], cta:'Ver app'}
  };
  const STATE = { live:['Disponible','ab-st-live'], dev:['En desarrollo','ab-st-dev'], soon:['Próximamente','ab-st-dev'] };
  const YQ = `<svg class="ab-yq" aria-label="YiQi" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 65"> <rect fill="none" width="100" height="65"/> <g> <path fill="var(--text)" d="M20.44,48.34l2.57-6.15-6.79-16.91c-.14-.39.07-.61.46-.61h4.97c.29,0,.57.14.68.43l3.58,10.08,3.61-10.08c.11-.29.39-.43.68-.43h4.97c.39,0,.57.21.43.61l-9.26,23.27c-.11.29-.39.43-.68.43h-4.75c-.43,0-.68-.21-.47-.64Z"/> <path fill="var(--text)" d="M38.5,18.99c0-1.77,1.35-3.19,3.23-3.19s3.23,1.42,3.23,3.19-1.38,3.23-3.23,3.23-3.23-1.42-3.23-3.23ZM38.72,25.24c0-.32.25-.57.57-.57h4.89c.32,0,.57.25.57.57v16.24c0,.32-.25.57-.57.57h-4.89c-.32,0-.57-.25-.57-.57v-16.24Z"/> <path fill="var(--cyan)" d="M57.91,44.78v-2.66c-2.18-.53-4.21-1.66-5.92-3.36-4.97-4.97-5.09-13.02-.03-18.08,5.09-5.09,13.14-4.97,18.11,0s5.09,13.02,0,18.11c-1.78,1.78-3.94,2.93-6.22,3.46v2.51c0,.35-.18.53-.58.53h-4.82c-.3,0-.55-.2-.55-.5ZM56.28,34.47c.5.5,1.05.9,1.65,1.2v-3.36c0-.35.18-.53.53-.53h4.87c.25,0,.53.18.53.53v3.36c.63-.33,1.23-.78,1.78-1.33,2.73-2.73,2.78-6.75.15-9.38s-6.67-2.61-9.41.13c-2.71,2.71-2.73,6.75-.1,9.38Z"/> <path fill="var(--text)" d="M77.22,18.99c0-1.77,1.35-3.19,3.23-3.19s3.23,1.42,3.23,3.19-1.38,3.23-3.23,3.23-3.23-1.42-3.23-3.23ZM77.44,25.24c0-.32.25-.57.57-.57h4.89c.32,0,.57.25.57.57v16.24c0,.32-.25.57-.57.57h-4.89c-.32,0-.57-.25-.57-.57v-16.24Z"/> </g> </svg>`;

  if(!document.getElementById('app-banner-styles')){
    const st=document.createElement('style'); st.id='app-banner-styles';
    st.textContent = `
app-banner{display:block;max-width:1080px;margin:24px auto;padding-inline:clamp(16px,4vw,24px);box-sizing:border-box}
.ab-shell{position:relative;overflow:hidden;border-radius:var(--radius-xl,24px);--bg:#f5f4f0;--bg-elev:#eeece7;--bg-elev-2:#e6e4df;--line:rgba(0,0,0,.08);--line-strong:rgba(0,0,0,.13);--text:#17191c;--muted:#586170;--muted-2:#7f8896;--cyan:#009fc7;background:linear-gradient(135deg,#f6f4ef,#eeece7);color:var(--text);border:1px solid rgba(0,0,0,.06)}
.ab-shell::before{content:"";position:absolute;inset:0;background:radial-gradient(120% 120% at 88% 0%,var(--accent-soft-2),transparent 55%);pointer-events:none}
/* Tema claro → banner OSCURO (paleta negativa = contraste con la página) */
html[data-theme="light"] .ab-shell{--bg:#0a0a0b;--bg-elev:#0f1013;--bg-elev-2:#14161b;--line:rgba(255,255,255,.08);--line-strong:rgba(255,255,255,.14);--text:#f3f5f7;--muted:#908e8e;--muted-2:#7d7c82;--cyan:#00ccff;background:linear-gradient(135deg,#14161b,#0f1013);border-color:rgba(255,255,255,.08)}
html[data-theme="light"] .ab-illus{background:linear-gradient(135deg,var(--accent-soft-2),transparent 72%),#14161b}
.ab-grid{position:relative;display:grid;grid-template-columns:1fr 440px;gap:36px;align-items:stretch;padding:58px 44px 44px}
.ab-yqmark{position:absolute;top:22px;right:26px;display:flex;align-items:center;gap:9px;z-index:2}
.ab-yqmark .lbl{font:600 9px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted-2)}
.ab-yq{height:30px;width:auto}
.ab-icon{width:54px;height:54px;border-radius:14px;display:grid;place-items:center;background:var(--accent-soft);border:1px solid var(--accent-soft-2);color:var(--accent);margin-bottom:16px}
.ab-icon svg{width:28px;height:28px}
.ab-badge{display:inline-flex;align-items:center;gap:7px;font:700 10px var(--mono);letter-spacing:.12em;text-transform:uppercase;border-radius:var(--radius-pill,999px);padding:5px 11px;margin-bottom:16px}
.ab-badge .dot{width:6px;height:6px;border-radius:50%}
.ab-st-dev{color:var(--accent);background:var(--accent-soft)} .ab-st-dev .dot{background:var(--accent)}
.ab-st-live{color:var(--green);background:var(--green-soft)} .ab-st-live .dot{background:var(--green)}
.ab-title{font:800 36px/1.06 var(--display);letter-spacing:-.025em;margin-bottom:12px}
.ab-title em{color:var(--accent);font-style:normal}
.ab-sub{font:400 15px/1.5 var(--sans);color:var(--muted);max-width:42ch;margin-bottom:20px}
.ab-list{display:flex;flex-direction:column;gap:9px;margin-bottom:24px}
.ab-li{display:flex;gap:10px;align-items:flex-start;font:500 13.5px/1.4 var(--sans);color:var(--text)}
.ab-li svg{color:var(--accent);flex-shrink:0;margin-top:1px}
@keyframes abLiIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes abChk{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.ab-shell.play .ab-li{animation:abLiIn .5s cubic-bezier(.22,1,.36,1) both}
.ab-shell.play .ab-li:nth-child(1){animation-delay:0s}.ab-shell.play .ab-li:nth-child(2){animation-delay:.55s}.ab-shell.play .ab-li:nth-child(3){animation-delay:1.10s}
.ab-shell.play .ab-li svg polyline{stroke-dasharray:1;stroke-dashoffset:1;animation:abChk .4s ease both}
.ab-shell.play .ab-li:nth-child(1) svg polyline{animation-delay:.12s}.ab-shell.play .ab-li:nth-child(2) svg polyline{animation-delay:.67s}.ab-shell.play .ab-li:nth-child(3) svg polyline{animation-delay:1.22s}.ab-li b{font-weight:600}
.ab-cta{display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 22px;border-radius:var(--radius-sm,12px);border:none;background:var(--accent);color:var(--accent-ink,var(--text));font:700 14px var(--sans);cursor:pointer;transition:filter .18s}
.ab-cta:hover{filter:brightness(1.05)}
.ab-illus{position:relative;min-height:300px;align-self:stretch;border-radius:var(--radius-md,16px);overflow:hidden;display:grid;place-items:center;background:linear-gradient(135deg,var(--accent-soft-2),transparent 72%),#fff;border:1.5px dashed var(--accent-soft-2)}
.ab-illus-wm{width:118px;height:118px;color:var(--accent);opacity:.30}
.ab-illus-tag{position:absolute;bottom:16px;font:500 11px var(--mono);color:var(--muted-2);text-align:center;line-height:1.6}
.ab-illus-tag b{color:var(--accent);font-weight:700}
app-banner[variant="vertical"]{max-width:420px;padding-inline:0;margin:0;display:flex}
app-banner[variant="vertical"] .ab-shell{width:100%;display:flex;flex-direction:column}
.ab-vertical .ab-grid{grid-template-columns:1fr;gap:22px;padding:54px 30px 30px;flex:1;align-content:start}
.ab-vertical .ab-illus{order:-1;aspect-ratio:16/10;min-height:0;align-self:auto}
.ab-vertical .ab-title{font-size:30px}
.ab-vertical .ab-sub{max-width:none}
@media(max-width:840px){.ab-grid{grid-template-columns:1fr;gap:26px;padding:52px 24px 24px}.ab-illus{min-height:220px}.ab-yqmark{top:16px;right:16px}}`;
    document.head.appendChild(st);
  }

  class AppBanner extends HTMLElement{
    connectedCallback(){
      const key=this.getAttribute('app')||'inv';
      const c=APPS[key]||APPS.inv;
      this.style.setProperty('--accent', `var(--${c.accent})`);
      this.style.setProperty('--accent-soft', `var(--${c.accent}-soft)`);
      this.style.setProperty('--accent-soft-2', `var(--${c.accent}-soft-2, var(--${c.accent}-soft))`);
      this.style.setProperty('--accent-ink', '#ffffff');
      const [slabel,scls]=STATE[c.state]||STATE.dev;
      const g=GL[c.icon]||GL.inv;
      const vcls=(this.getAttribute('variant')==='vertical')?' ab-vertical':'';
      const bullets=c.b.map(([t,d])=>`<div class="ab-li"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polyline points="4 12 9 17 20 6" pathLength="1"/></svg><span><b>${t}</b> — ${d}</span></div>`).join('');
      this.innerHTML=`<div class="ab-shell${vcls}" data-anim>
        <div class="ab-yqmark"><span class="lbl">Homologado por</span>${YQ}</div>
        <div class="ab-grid">
          <div>
            <span class="ab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${g}</svg></span>
            <span class="ab-badge ${scls}"><span class="dot"></span>${slabel}</span>
            <h3 class="ab-title" data-scramble>${c.title}</h3>
            <p class="ab-sub">${c.tag}</p>
            <div class="ab-list">${bullets}</div>
            <button class="ab-cta">${c.cta} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
          </div>
          <div class="ab-illus" role="img" aria-label="Ilustración de ${c.title.replace(/<[^>]+>/g,'')} (placeholder)">
            <svg class="ab-illus-wm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${g}</svg>
            <span class="ab-illus-tag">Imagen de la app<br><b>se genera con Gemini</b></span>
          </div>
        </div>
      </div>`;
    }
  }
  if(!customElements.get('app-banner')) customElements.define('app-banner', AppBanner);
})();
