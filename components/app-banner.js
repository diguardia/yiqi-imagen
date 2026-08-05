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
    ana:{accent:'violet', icon:'ana', state:'live', id:'yiqi-analytics-pro', img:'img/apps/yiqi-analytics-pro-horiz.webp', title:'YiQi <em>Analytics</em> Pro',
      tag:'Tablero gerencial con KPIs en tiempo real e IA: ventas, stock, finanzas y márgenes por canal.',
      b:[['Tablero en vivo','KPIs y forecast al instante'],['Por canal','márgenes comparables'],['Con IA','proyección de cashflow']], cta:'Conocer la app'},
    prov:{accent:'orange', icon:'prov', state:'live', id:'front-de-proveedores-ocr', img:'img/apps/front-de-proveedores-ocr-horiz.webp', title:'Front de <em>Proveedores</em> OCR',
      tag:'Portal de autogestión para proveedores: carga de facturas y órdenes de compra con OCR, integrado a YiQi.',
      b:[['Carga con OCR','facturas y OC sin tipeo'],['Autogestión','estados y comprobantes online'],['Integrado a YiQi','cae en Compras']], cta:'Conocer la app'},
    inv:{accent:'magenta', icon:'inv', state:'dev', id:'inventariado-mobile', img:'img/apps/inventariado-mobile-horiz.webp', title:'Inventariado <em>Mobile</em>',
      tag:'Releva y controla el stock de tus depósitos desde el celular, sincronizado con YiQi en tiempo real.',
      b:[['Escaneo sin hardware','la cámara como lector'],['Sync en tiempo real','impacta en el stock'],['Diferencias','faltantes y sobrantes']], cta:'Conocer la app'},
    pos:{accent:'amber', icon:'pos', state:'live', id:'yiqi-pos', img:'img/apps/yiqi-pos-horiz.webp', title:'YiQi <em>POS</em>',
      tag:'Punto de venta para Windows y Android: modo offline, multi-caja, medios de pago e impresión fiscal, integrado al ERP.',
      b:[['Funciona offline','vendes sin internet'],['Multi-caja y turnos','cierres y arqueos'],['Impresión fiscal','Epson y Hasar']], cta:'Conocer la app'},
    pick:{accent:'green', icon:'pick', state:'dev', id:'picking-list', img:'img/apps/picking-list-horiz.webp', title:'Picking <em>List</em>',
      tag:'Listas de preparación para depósito: arma el picking de varios pedidos y controla la salida de mercadería.',
      b:[['Picking multi-pedido','preparas varios a la vez'],['Por ubicación','recorrido optimizado'],['Control de salida','remitos y etiquetas']], cta:'Conocer la app'},
    cons:{accent:'blue', icon:'cons', state:'live', id:'consulta-de-pedidos', img:'img/apps/consulta-de-pedidos-horiz.webp', title:'Consulta de <em>pedidos</em>',
      tag:'Búsqueda y seguimiento ágil de pedidos por estado, canal y cliente, sincronizado con YiQi en tiempo real.',
      b:[['Búsqueda al instante','por estado, canal o cliente'],['Seguimiento en vivo','del pedido a la entrega'],['Sincronizado','datos reales de YiQi']], cta:'Conocer la app'}
  };
  const STATE = { live:['Disponible','ab-st-live'], dev:['En desarrollo','ab-st-dev'], soon:['Próximamente','ab-st-dev'] };
  const IAREADY = `<svg class="ab-iaready-svg" aria-label="iAready" viewBox="0 0 256 68" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M225.626 67.89C224.75 67.89 224.239 67.452 224.677 66.576L229.933 54.02L216.063 19.491C215.771 18.688 216.209 18.25 217.012 18.25H227.159C227.743 18.25 228.327 18.542 228.546 19.126L235.846 39.712L243.219 19.126C243.438 18.542 244.022 18.25 244.606 18.25H254.753C255.556 18.25 255.921 18.688 255.629 19.491L236.722 67.014C236.503 67.598 235.919 67.89 235.335 67.89H225.626Z" fill="currentColor"/> <path d="M190.294 54.896C180.439 54.896 173.65 46.7199 173.65 36.1349C173.65 25.6229 180.439 17.3739 190.294 17.3739C194.747 17.3739 197.886 18.688 200.222 21.243V2.99295C200.222 2.33595 200.733 1.82495 201.39 1.82495H211.391C212.048 1.82495 212.559 2.33595 212.559 2.99295V52.852C212.559 53.509 211.975 54.02 211.318 54.02H202.339C201.682 54.02 201.171 53.509 201.171 52.852L201.025 49.8589C198.616 52.9979 195.185 54.896 190.294 54.896ZM185.622 36.1349C185.622 40.8069 188.834 43.7999 193.068 43.7999C197.375 43.7999 200.368 40.734 200.368 36.062C200.368 31.463 197.375 28.4699 193.068 28.4699C188.834 28.4699 185.622 31.5359 185.622 36.1349Z" fill="currentColor"/> <path d="M147.515 54.896C137.66 54.896 130.871 46.72 130.871 36.135C130.871 25.623 137.66 17.374 147.515 17.374C152.552 17.374 155.983 19.199 158.246 22.338L158.392 19.418C158.392 18.761 158.903 18.25 159.56 18.25H168.612C169.269 18.25 169.78 18.761 169.78 19.418V52.852C169.78 53.509 169.196 54.02 168.539 54.02H159.56C158.903 54.02 158.392 53.509 158.392 52.852L158.246 49.859C155.837 52.998 152.406 54.896 147.515 54.896ZM142.843 36.135C142.843 40.807 146.055 43.8 150.289 43.8C154.596 43.8 157.589 40.734 157.589 36.062C157.589 31.463 154.596 28.47 150.289 28.47C146.055 28.47 142.843 31.536 142.843 36.135Z" fill="currentColor"/> <path d="M112.868 54.896C101.115 54.896 93.0117 47.012 93.0117 35.989C93.0117 25.477 100.385 17.374 111.554 17.374C122.504 17.374 128.855 25.331 128.855 34.529C128.855 38.398 127.906 40.807 124.329 40.807H104.984C106.298 44.092 109.437 45.333 113.89 45.333C115.934 45.333 118.27 45.26 121.263 43.654C121.847 43.362 122.212 43.508 122.577 44.092L125.935 48.764C126.227 49.202 126.3 49.786 125.57 50.443C122.577 53.509 117.978 54.896 112.868 54.896ZM104.765 32.412H117.978C117.248 28.616 114.62 27.375 111.627 27.375C108.488 27.375 105.714 28.762 104.765 32.412Z" fill="currentColor"/> <path d="M69.2676 54.02C68.6106 54.02 68.0996 53.509 68.0996 52.852V19.418C68.0996 18.761 68.6106 18.25 69.2676 18.25H78.9036C79.4876 18.25 79.9256 18.542 79.9986 19.491L80.3636 24.309C81.5316 20.294 83.7216 17.374 87.8096 17.374C89.6346 17.374 90.5836 17.885 91.0946 18.323C91.6786 18.761 91.8246 19.272 91.8246 19.929V28.032C91.8246 28.908 91.3136 29.2 90.2916 28.981C89.5616 28.762 88.8316 28.616 87.5906 28.616C83.2836 28.616 80.3636 30.879 80.3636 36.427V52.852C80.3636 53.509 79.8526 54.02 79.1956 54.02H69.2676Z" fill="currentColor"/> <path d="M17.7429 54.0199C16.9399 54.0199 16.5019 53.5089 16.7939 52.7789L33.5839 3.79593C33.8029 3.21192 34.3869 2.91992 34.9709 2.91992H45.9939C46.5779 2.91992 47.2349 3.21192 47.4539 3.79593L64.2439 52.7789C64.5359 53.5089 64.0979 54.0199 63.2949 54.0199H52.4179C51.8339 54.0199 51.3229 53.8009 51.1039 53.1439L49.2059 47.0119H31.7589L29.8609 53.1439C29.6419 53.8009 29.2039 54.0199 28.6199 54.0199H17.7429ZM35.2629 35.7699H45.7019L40.5189 19.0529L35.2629 35.7699Z" fill="var(--cyan)"/> <path d="M6.64301 13.213C2.774 13.213 0 10.293 0 6.57C0 2.92 2.774 0 6.64301 0C10.439 0 13.286 2.92 13.286 6.57C13.286 10.293 10.439 13.213 6.64301 13.213ZM0.438004 52.852V19.418C0.438004 18.761 0.949003 18.25 1.606 18.25H11.68C12.337 18.25 12.848 18.761 12.848 19.418V52.852C12.848 53.509 12.337 54.02 11.68 54.02H1.606C0.949003 54.02 0.438004 53.509 0.438004 52.852Z" fill="currentColor"/> </svg>`;
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
.ab-iaready{display:inline-flex;align-items:center;color:var(--text);margin-right:6px}
.ab-iaready-svg{height:14px;width:auto;display:block}
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
.ab-cta{text-decoration:none;display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 22px;border-radius:var(--radius-sm,12px);border:none;background:var(--accent);color:var(--accent-ink,var(--text));font:700 14px var(--sans);cursor:pointer;transition:filter .18s}
.ab-cta:hover{filter:brightness(1.05)}
.ab-illus{position:relative;min-height:300px;align-self:stretch;border-radius:var(--radius-md,16px);overflow:hidden;display:grid;place-items:center;background:linear-gradient(135deg,var(--accent-soft-2),transparent 72%),#fff;border:1.5px dashed var(--accent-soft-2)}
.ab-illus.has-img{border:none;place-items:stretch}
.ab-illus-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.ab-illus.has-img .ab-illus-wm,.ab-illus.has-img .ab-illus-tag{display:none}
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
        <div class="ab-yqmark"><a class="ab-iaready" href="https://www.yiqi.com.ar/ia-ready.html" aria-label="iAready">${IAREADY}</a><span class="lbl">Homologado por</span>${YQ}</div>
        <div class="ab-grid">
          <div>
            <span class="ab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${g}</svg></span>
            <span class="ab-badge ${scls}"><span class="dot"></span>${slabel}</span>
            <h3 class="ab-title" data-scramble>${c.title}</h3>
            <p class="ab-sub">${c.tag}</p>
            <div class="ab-list">${bullets}</div>
            <a class="ab-cta" href="app.html?id=${c.id}">${c.cta} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
          </div>
          <div class="ab-illus${c.img?' has-img':''}" role="img" aria-label="${c.title.replace(/<[^>]+>/g,'')}">
            ${c.img ? `<img class="ab-illus-img" src="${c.img}" alt="" loading="lazy" onerror="this.parentElement.classList.remove('has-img');this.remove()">` : ``}
            <svg class="ab-illus-wm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${g}</svg>
            <span class="ab-illus-tag">Imagen de la app<br><b>se genera con Gemini</b></span>
          </div>
        </div>
      </div>`;
    }
  }
  if(!customElements.get('app-banner')) customElements.define('app-banner', AppBanner);
})();
