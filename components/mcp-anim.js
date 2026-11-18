/* Animación del MCP de YiQi (componente <yiqi-mcp-anim>, Shadow DOM: sus estilos no chocan con site.css).
   Fuente de diseño: mcp-animacion.html. Requiere en la página las fuentes Inter, IBM Plex Mono y Lora. */
(function(){
const CSS=`
:host{display:block;--bg:#F0EEE6;--grid:rgba(20,20,19,.045);--wire:#c9c5b8;--ink:#141413;--mut:#87867f;--soft:#b0aea5;--line:#e8e6dc;--card:#FAF9F5;--acc:#c15f3c;--acc2:#d97757;--q:#009fc7}
*{box-sizing:border-box;margin:0}
.mcp-anim{position:relative;width:100%;max-width:1180px;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:40px 8px;
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:40px 40px}
.wires{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.wires path{fill:none;stroke:var(--wire);stroke-width:1.2;stroke-dasharray:2 3}
.pulse{filter:blur(.3px)}
/* módulos */
.mods{display:flex;flex-direction:column;gap:44px;position:relative;z-index:1}
.mod{display:flex;align-items:center;gap:12px}
.mod-ico{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;color:#fff;position:relative;flex:none;transition:transform .3s}
.mod-ico svg{width:22px;height:22px}
.mod-ico::after{content:"";position:absolute;inset:-6px;border-radius:16px;border:2px solid currentColor;opacity:0;transform:scale(.85);transition:.35s}
.mod.on .mod-ico{transform:scale(1.06)}
.mod.on .mod-ico::after{opacity:.35;transform:scale(1);border-color:var(--c)}
.mod-txt{display:flex;flex-direction:column;gap:6px}
.mod-name{font:600 13px Inter;color:var(--ink)}
.tags{display:flex;gap:6px}
.tag{font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.06em;color:#6b6a64;background:rgba(20,20,19,.06);padding:3px 6px;border-radius:4px;border:1px solid transparent;transition:.25s}
.tag.on{color:var(--c);border-color:var(--c);background:#fff}
/* núcleo */
.core{position:relative;z-index:1;width:200px;height:200px;flex:none;display:grid;grid-template:repeat(4,1fr)/repeat(4,1fr);border:1px solid #d6d3c8;background:rgba(255,255,255,.35)}
.core i{border:1px solid rgba(20,20,19,.05)}
.core-lbl{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center}
.core-lbl svg{width:38px;height:42px}
.core-lbl b{font:600 12px 'IBM Plex Mono',monospace;letter-spacing:.12em;line-height:1.5;white-space:nowrap}
.core::before{content:"";position:absolute;inset:-1px;box-shadow:0 0 0 0 rgba(0,159,199,0);transition:box-shadow .4s}
.core.on::before{box-shadow:0 0 0 6px rgba(0,159,199,.12),0 0 40px rgba(0,159,199,.25)}
/* chat */
.chat{position:relative;z-index:1;width:360px;height:440px;flex:none;background:var(--card);border-radius:24px;border:1px solid #e3e0d5;box-shadow:0 24px 50px -24px rgba(20,20,19,.25);display:flex;flex-direction:column;overflow:hidden}
.chat-hd{display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:1px solid var(--line)}
.chat-hd svg{width:18px;height:18px;color:var(--acc2)}
.chat-hd b{font:500 14px Inter}
.chat-hd small{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--soft)}
.chat-hd small::before{content:"";width:6px;height:6px;border-radius:50%;background:#788c5d}
.chat-bd{flex:1;position:relative;overflow:hidden;-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 18px,#000 calc(100% - 18px),transparent 100%);mask-image:linear-gradient(to bottom,transparent 0,#000 18px,#000 calc(100% - 18px),transparent 100%)}
.track{position:absolute;left:0;right:0;top:0;padding:18px 18px 10px;transition:transform .7s cubic-bezier(.65,0,.35,1)}
.blk{display:flex;flex-direction:column;gap:12px;padding-bottom:22px}
.bub{opacity:0;transform:translateY(28px);transition:opacity .35s,transform .5s cubic-bezier(.2,.8,.2,1)}
.bub.show{opacity:1;transform:none}
.skel{background:#fff;border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:10px;opacity:0;transform:translateY(8px);transition:.35s}
.skel.show{opacity:1;transform:none}.skel.gone{opacity:0;height:0;padding:0;margin:-6px 0;overflow:hidden}
.skel i{display:block;height:8px;border-radius:4px;background:linear-gradient(90deg,#efede6 25%,#f8f7f2 50%,#efede6 75%);background-size:200% 100%;animation:sh 1.2s linear infinite}
.skel i:nth-child(2){width:80%}.skel i:nth-child(3){width:60%}.skel i:nth-child(4){width:72%}
@keyframes sh{to{background-position:-200% 0}}
.res{display:none}.res.show{display:block}
.bub{align-self:flex-end;max-width:85%;background:var(--line);border-radius:16px;padding:9px 14px;font:13px/1.45 Lora,serif;min-height:38px}
.status{display:flex;align-items:center;gap:7px;font-size:10.5px;color:var(--mut);border:1px solid var(--line);border-radius:999px;padding:5px 11px 5px 7px;align-self:flex-start;opacity:0;transform:translateY(4px);transition:.3s}
.status.show{opacity:1;transform:none}
.status .q{width:14px;height:14px}
.dots::after{content:"…";animation:d 1s steps(3) infinite;display:inline-block;width:1em;overflow:hidden;vertical-align:bottom}
@keyframes d{0%{width:0}100%{width:1em}}
.status.done .dots::after{animation:none;content:"";width:0}
.status.done::after{content:"";width:6px;height:6px;border-radius:50%;background:#788c5d}
.ans{font:13.5px/1.45 Lora,serif;opacity:0;transition:.35s}
.ans.show{opacity:1}
.res{background:#fff;border-radius:14px;padding:10px 12px 4px;animation:up .45s cubic-bezier(.2,.8,.2,1) both}
@keyframes up{from{opacity:0;transform:translateY(10px)}}
.res-hd{display:flex;align-items:center;gap:6px;font-size:10px;color:var(--soft);padding-bottom:6px}
.res-hd .q{width:12px;height:12px}
.row{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid #f0eee6;opacity:0;transform:translateX(-4px);transition:.3s}
.res.show .row{opacity:1;transform:none}
.res.show .row:nth-child(3){transition-delay:.12s}.res.show .row:nth-child(4){transition-delay:.24s}.res.show .row:nth-child(5){transition-delay:.36s}
.av{width:18px;height:18px;border-radius:50%;background:var(--line);flex:none}
.bars{flex:1;display:flex;flex-direction:column;gap:5px}
.bar{height:6px;border-radius:3px;background:#d1cfc5}.bar.s{height:5px;background:var(--line)}
.pill{border-radius:999px;padding:4px 6px;background:rgba(193,95,60,.13)}.pill i{display:block;height:6px;border-radius:3px;background:var(--acc2)}
.pill.am{background:rgba(217,160,40,.15)}.pill.am i{background:#d9a028}
.hbar{height:8px;border-radius:4px}
.dot{width:8px;height:8px;border-radius:50%;flex:none}
.prev{font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.06em;color:var(--mut)}
.btns{display:flex;gap:8px;justify-content:flex-end;padding:10px 0 8px;border-top:1px solid #f0eee6}
.btn{font:600 11px Inter;border-radius:999px;padding:6px 12px;border:1px solid var(--line);color:var(--mut);background:#fff;transition:.25s}
.btn.ok{background:var(--acc);border-color:var(--acc);color:#fff}
.btn.ok.press{transform:scale(.94);filter:brightness(.9)}
.done-msg{display:flex;align-items:center;gap:6px;font-size:11px;color:#3f6b2f;padding:2px 0 8px;opacity:0;transition:.3s}.done-msg.show{opacity:1}
.chat-ft{margin:0 14px 14px;border:1px solid var(--line);background:#fff;border-radius:999px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 6px 6px 16px;font:12px Lora,serif;color:var(--soft);transition:border-color .2s}
.chat-ft.typing{border-color:#d6d3c8;color:var(--ink)}
#inp{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#inp.cur::after{content:"";display:inline-block;width:1px;height:13px;background:var(--ink);margin-left:1px;vertical-align:-2px;animation:bl .8s steps(1) infinite}
@keyframes bl{50%{opacity:0}}
#send.press{transform:scale(.85)}
#send{transition:transform .15s;flex:none;width:28px;height:28px;border-radius:50%;background:var(--acc2);display:grid;place-items:center;color:#fff}
/* mobile */
@media (max-width:760px){
  .mcp-anim{flex-direction:column;gap:36px;padding:28px 0}
  .mods{flex-direction:row;gap:0;width:100%;justify-content:space-around}
  .mod{flex-direction:column;gap:8px}
  .mod-txt{align-items:center}
  .tags{display:none}
  .mod-name{font-size:11px}
  .mod-act{font:600 9px 'IBM Plex Mono',monospace;letter-spacing:.06em;color:var(--c);height:12px;opacity:0;transition:.25s}
  .mod.on .mod-act{opacity:1}
  .core{width:140px;height:140px}
  .core-lbl svg{width:28px;height:32px}.core-lbl b{font-size:10px}
  .chat{width:100%;max-width:360px;height:420px}
}
@media (min-width:761px){.mod-act{display:none}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;
const HTML=`<div class="mcp-anim" id="mcpAnim" aria-label="Animación: tu asistente de IA consulta YiQi ERP a través del MCP">
  <svg class="wires" id="wires" aria-hidden="true"></svg>
  <div class="mods" id="mods"></div>
  <div class="core" id="core"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    <div class="core-lbl"><svg viewBox="46.5 15.5 29 31" style="overflow:visible"><path class="qp" fill="#009fc7" d="M57.91,44.78v-2.66c-2.18-.53-4.21-1.66-5.92-3.36-4.97-4.97-5.09-13.02-.03-18.08,5.09-5.090,13.14-4.97,18.11,0s5.09,13.02,0,18.11c-1.78,1.780-3.94,2.93-6.22,3.46v2.51c0,.35-.18.53-.58.53h-4.82c-.3,0-.55-.2-.55-.5ZM56.28,34.47c.5.5,1.05.9,1.65,1.2v-3.36c0-.35.18-.53.53-.53h4.87c.25,0,.53.18.53.53v3.36c.63-.33,1.23-.78,1.780-1.33,2.73-2.73,2.78-6.75.15-9.38s-6.67-2.61-9.41.13c-2.710,2.710-2.73,6.75-.1,9.38Z"/></svg><b>MCP DE YIQI</b></div>
  </div>
  <div class="chat" id="chat">
    <div class="chat-hd"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5l2.2 8.3 8.3 2.2-8.3 2.2L12 22.5l-2.2-8.3L1.5 12l8.3-2.2z"/></svg><div><b>Asistente de IA</b><small>en línea</small></div></div>
    <div class="chat-bd" id="bd"><div class="track" id="track"></div></div>
    <div class="chat-ft" id="ft"><span id="inp">Pregunta lo que quieras…</span><span id="send"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span></div>
  </div>
</div>`;
class YiqiMcpAnim extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;const root=this.attachShadow({mode:'open'});root.innerHTML='<style>'+CSS+'</style>'+HTML;run(root);}}
function run(root){
const Q='<svg class="q" viewBox="46.5 15.5 29 31" style="overflow:visible"><path fill="#009fc7" d="'+root.querySelector('.qp').getAttribute('d')+'"/></svg>';
const MODS=[
 {id:'ventas',name:'Ventas',c:'#7c3aed',ico:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>'},
 {id:'compras',name:'Compras',c:'#ea580c',ico:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h12L22 7H6.2"/>'},
 {id:'stock',name:'Stock',c:'#0c9b6d',ico:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>'},
 {id:'finanzas',name:'Finanzas',c:'#009fc7',ico:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>'}];
const TAGS=['CONSULTA','BORRADOR','ESTADO'];
const R=(a,b,w,am)=>'<div class="row"><span class="av"></span><span class="bars"><span class="bar" style="width:'+a+'%"></span><span class="bar s" style="width:'+b+'%"></span></span><span class="pill'+(am?' am':'')+'"><i style="width:'+w+'px"></i></span></div>';
const CYCLES=[
 {m:3,t:0,q:'¿Qué facturas están vencidas?',a:'Encontré 3 facturas vencidas:',r:()=>R(72,44,30)+R(58,50,40)+R(66,38,24)},
 {m:0,t:0,q:'¿Cuánto vendí este mes por canal?',a:'Así vienen tus ventas del mes, por canal:',r:()=>[['#7c3aed',88],['#009fc7',64],['#0c9b6d',46],['#d97757',28]].map(x=>'<div class="row"><span class="dot" style="background:'+x[0]+'"></span><span class="bars"><span class="hbar" style="width:'+x[1]+'%;background:'+x[0]+';opacity:.75"></span></span></div>').join('')},
 {m:2,t:0,q:'¿Qué pedidos faltan entregar?',a:'Hay 3 pedidos pendientes de entrega:',r:()=>R(64,40,22,1)+R(70,46,22,1)+R(52,36,22,1)},
 {m:1,t:1,q:'Crea un borrador de orden de compra con lo que falta reponer.',a:'Preparé esta vista previa. ¿La confirmo?',r:()=>'<div class="prev" style="padding:2px 0 6px">VISTA PREVIA · ORDEN DE COMPRA</div>'+R(70,42,26)+R(56,48,34)+'<div class="btns"><span class="btn">Cancelar</span><span class="btn ok">Confirmar</span></div><div class="done-msg">✓ Creada como borrador en YiQi ERP</div>',wr:1}];
const host=root.getElementById('mcpAnim'),modsEl=root.getElementById('mods'),core=root.getElementById('core'),chat=root.getElementById('chat'),bd=root.getElementById('bd'),svg=root.getElementById('wires');
modsEl.innerHTML=MODS.map(m=>'<div class="mod" style="--c:'+m.c+'" data-id="'+m.id+'"><div class="mod-ico" style="background:'+m.c+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+m.ico+'</svg></div><div class="mod-txt"><span class="mod-name">'+m.name+'</span><span class="tags">'+TAGS.map(t=>'<span class="tag">'+t+'</span>').join('')+'</span><span class="mod-act"></span></div></div>').join('');
const modNodes=[...modsEl.children];
let paths=[];const NS='http://www.w3.org/2000/svg';
const mobile=()=>matchMedia('(max-width:760px)').matches;
function rel(el){const h=host.getBoundingClientRect(),r=el.getBoundingClientRect();return{l:r.left-h.left,t:r.top-h.top,r:r.right-h.left,b:r.bottom-h.top,cx:(r.left+r.right)/2-h.left,cy:(r.top+r.bottom)/2-h.top}}
function layout(){
 svg.innerHTML='';paths=[];const c=rel(core),ch=rel(chat);const d=[];
 if(!mobile()){
  const trunk=c.l-Math.max(40,(c.l-rel(modNodes[0]).r)*.35);
  modNodes.forEach((n,i)=>{const tg=rel(n.querySelector('.tags')),y=rel(n.querySelector('.mod-ico')).cy;d.push('M'+tg.r+' '+y+'H'+trunk);
   paths[i]={a:[[ch.l,c.cy],[c.r,c.cy]],s:[[[c.r,c.cy],[c.r,c.t],[c.l,c.t],[c.l,c.cy]],[[c.r,c.cy],[c.r,c.b],[c.l,c.b],[c.l,c.cy]]],b:[[c.l,c.cy],[trunk,c.cy],[trunk,y],[tg.r+4,y]]};});
  const ys=modNodes.map(n=>rel(n.querySelector('.mod-ico')).cy);d.push('M'+trunk+' '+Math.min(...ys)+'V'+Math.max(...ys));
  d.push('M'+trunk+' '+c.cy+'H'+c.l);d.push('M'+c.r+' '+c.cy+'H'+ch.l);
 }else{
  const bus=(rel(modsEl).b+c.t)/2;
  modNodes.forEach((n,i)=>{const m=rel(n);d.push('M'+m.cx+' '+m.b+'V'+bus);paths[i]={a:[[c.cx,ch.t],[c.cx,c.b]],s:[[[c.cx,c.b],[c.l,c.b],[c.l,c.t],[c.cx,c.t]],[[c.cx,c.b],[c.r,c.b],[c.r,c.t],[c.cx,c.t]]],b:[[c.cx,c.t],[c.cx,bus],[m.cx,bus],[m.cx,m.b+4]]};});
  const xs=modNodes.map(n=>rel(n).cx);d.push('M'+Math.min(...xs)+' '+bus+'H'+Math.max(...xs));d.push('M'+c.cx+' '+bus+'V'+c.t);d.push('M'+c.cx+' '+c.b+'V'+ch.t);
 }
 const p=document.createElementNS(NS,'path');p.setAttribute('d',d.join(''));svg.appendChild(p);
 for(let k=0;k<2;k++){const glow=document.createElementNS(NS,'circle');glow.setAttribute('r',12);glow.style.opacity=0;glow.setAttribute('class','glow');svg.appendChild(glow);
  const g=document.createElementNS(NS,'circle');g.setAttribute('r',5);g.setAttribute('class','pulse');g.style.opacity=0;svg.appendChild(g);}
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function travel(lines,ms,color){return new Promise(res=>{const dots=[...svg.querySelectorAll('.pulse')],glows=[...svg.querySelectorAll('.glow')];if(!dots.length)return res();
 const L=lines.map(pts=>{const segs=[];let t=0;for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);segs.push(l);t+=l;}return{pts,segs,t};});
 dots.forEach((d,k)=>{const on=k<lines.length;d.setAttribute('fill',color);glows[k].setAttribute('fill',color);d.style.opacity=on?1:0;glows[k].style.opacity=on?.2:0;});
 const t0=performance.now();(function f(now){let k=Math.min(1,(now-t0)/ms);const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
  L.forEach((ln,j)=>{let s=e*ln.t,i=0;while(i<ln.segs.length-1&&s>ln.segs[i]){s-=ln.segs[i];i++;}const a=ln.pts[i],b=ln.pts[i+1],u=ln.segs[i]?s/ln.segs[i]:0;
   const x=a[0]+(b[0]-a[0])*u,y=a[1]+(b[1]-a[1])*u;dots[j].setAttribute('cx',x);dots[j].setAttribute('cy',y);glows[j].setAttribute('cx',x);glows[j].setAttribute('cy',y);});
  if(k<1)requestAnimationFrame(f);else res();})(t0);});}
function hide(){svg.querySelectorAll('.pulse,.glow').forEach(d=>d.style.opacity=0);}
const rev=p=>p.slice().reverse();
const track=root.getElementById('track'),ft=root.getElementById('ft'),inp=root.getElementById('inp'),send=root.getElementById('send');
const PH='Pregunta lo que quieras…';
async function typeIn(txt){ft.classList.add('typing');inp.classList.add('cur');for(let i=1;i<=txt.length;i++){inp.textContent=txt.slice(0,i);await wait(26);}await wait(300);inp.classList.remove('cur');}
function block(cy){const b=document.createElement('div');b.className='blk';
 b.innerHTML='<div class="bub"></div><div class="status">'+Q+'<span class="dots">Consultando YiQi ERP</span></div><div class="skel"><i></i><i></i><i></i><i></i></div><div class="ans">'+cy.a+'</div><div class="res"><div class="res-hd">'+Q+'desde YiQi ERP</div>'+cy.r()+'</div>';
 b.querySelector('.bub').textContent=cy.q;track.appendChild(b);while(track.children.length>2){const f=track.firstElementChild;track.style.transition='none';const h=f.offsetHeight;f.remove();const cur=parseFloat((track.style.transform.match(/-?[\d.]+/)||[0])[0]);track.style.transform='translateY('+(cur+h)+'px)';track.offsetHeight;track.style.transition='';}
 return b;}
function scrollTo(b){track.style.transform='translateY('+(18-b.offsetTop)+'px)';}
function setOn(i,t){modNodes.forEach((n,j)=>{n.classList.toggle('on',j===i);n.querySelectorAll('.tag').forEach((g,k)=>g.classList.toggle('on',j===i&&k===t));n.querySelector('.mod-act').textContent=j===i?TAGS[t]:'';});}
async function cycle(cy){
 await typeIn(cy.q);
 send.classList.add('press');await wait(140);send.classList.remove('press');
 inp.textContent=PH;ft.classList.remove('typing');
 const b=block(cy);scrollTo(b);await wait(80);b.querySelector('.bub').classList.add('show');await wait(450);
 b.querySelector('.status').classList.add('show');await wait(200);b.querySelector('.skel').classList.add('show');await wait(250);
 const col=MODS[cy.m].c,pts=paths[cy.m];
 await travel([pts.a],300,'#009fc7');core.classList.add('on');
 await travel(pts.s,380,'#009fc7');
 await travel([pts.b],450,col);hide();setOn(cy.m,cy.t);await wait(500);
 await travel([rev(pts.b)],450,col);
 await travel(pts.s.map(rev),380,'#009fc7');
 await travel([rev(pts.a)],300,'#009fc7');hide();core.classList.remove('on');
 const st=b.querySelector('.status');st.classList.add('done');st.innerHTML=Q+'Consultó YiQi ERP';
 b.querySelector('.skel').classList.add('gone');b.querySelector('.ans').classList.add('show');await wait(200);b.querySelector('.res').classList.add('show');
 if(cy.wr){await wait(1300);const ok=b.querySelector('.btn.ok');ok.classList.add('press');await wait(220);ok.classList.remove('press');b.querySelector('.done-msg').classList.add('show');}
 await wait(cy.wr?1800:2400);setOn(-1,-1);
}
layout();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(layout,120);});
if(matchMedia('(prefers-reduced-motion: reduce)').matches){const b=block(CYCLES[0]);b.querySelectorAll('.bub,.status,.ans,.res').forEach(e=>e.classList.add('show'));b.querySelector('.skel').classList.add('gone');setOn(3,0);return;}
document.fonts.ready.then(async()=>{layout();let i=0;for(;;){await cycle(CYCLES[i%CYCLES.length]);i++;}});
}
customElements.define('yiqi-mcp-anim',YiqiMcpAnim);
})();
