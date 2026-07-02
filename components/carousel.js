/* ============================================================
   YiQi Carousel — autoplay LOOP INFINITO + scramble de títulos
   Track: <div data-carousel data-carousel-dots=".dots" data-carousel-interval="5000">
   - Clona el primer slide y salta sin animación al inicio (loop sin costura).
   - Al activarse un slide, hace scramble de sus [data-scramble] (mismo motor que la home).
   - Pausa en hover, respeta prefers-reduced-motion, sincroniza con scroll manual.
   ============================================================ */
(function(){
  var CH = 'ABCDEFGHIJKLMNOPQQQQQQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function rnd(){ return CH[Math.floor(Math.random()*CH.length)]; }

  function scrambleNode(node, delay){
    var isText = node.nodeType === 3;
    var FINAL = isText ? node.nodeValue : node.textContent;
    function setv(v){ if(isText) node.nodeValue = v; else node.textContent = v; }
    var total = Math.max(20, Math.min(54, FINAL.length * 1.4));
    function resolveAt(i){ return Math.floor((i / FINAL.length) * total * 0.72); }
    var frame = 0;
    function tick(){
      var out = '';
      for(var i=0;i<FINAL.length;i++){
        if(FINAL[i] === ' '){ out += ' '; continue; }
        out += (frame >= resolveAt(i) + 5) ? FINAL[i] : rnd();
      }
      setv(out); frame++;
      if(frame <= total) node._rf = requestAnimationFrame(tick); else setv(FINAL);
    }
    clearTimeout(node._st); if(node._rf) cancelAnimationFrame(node._rf);
    node._st = setTimeout(function(){ node._rf = requestAnimationFrame(tick); }, delay);
  }
  function scrambleEl(el){
    // fijar altura para que el scramble no empuje lo de abajo (como la home)
    el.style.height = el.offsetHeight + 'px'; el.style.overflow = 'hidden';
    var nodes = [].slice.call(el.childNodes), d = 0;
    nodes.forEach(function(node){
      if(node.nodeType === 3 && !node.nodeValue.trim()) return;
      if(node.nodeType === 3 || node.nodeType === 1){ scrambleNode(node, d); d += 90; }
    });
    clearTimeout(el._h);
    el._h = setTimeout(function(){ el.style.height = ''; el.style.overflow = ''; }, d + 1300);
  }
  function playSlide(slide){
    if(!slide || reduce) return;
    var els = slide.querySelectorAll('[data-anim]');
    for(var k=0;k<els.length;k++){ var el = els[k]; el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); }
  }
  function activate(slide){ scrambleSlide(slide); playSlide(slide); }
  function scrambleSlide(slide){
    if(!slide || reduce) return;
    var els = slide.querySelectorAll('[data-scramble]');
    for(var k=0;k<els.length;k++) scrambleEl(els[k]);
  }

  function init(track){
    if(track.__carousel) return; track.__carousel = true;
    var real = Array.prototype.slice.call(track.children);
    if(real.length < 2) return;
    var n = real.length;
    var interval = parseInt(track.getAttribute('data-carousel-interval') || '5000', 10);

    var clone = real[0].cloneNode(true);
    clone.setAttribute('data-clone', ''); clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);

    var dots = [];
    var dsel = track.getAttribute('data-carousel-dots');
    if(dsel){ var dc = document.querySelector(dsel); if(dc) dots = Array.prototype.slice.call(dc.children); }

    var i = 0, paused = false, tm = null, jumping = false, st = null;
    function leftOf(el){ return el.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft; }
    function mark(){ for(var k=0;k<dots.length;k++) dots[k].classList.toggle('active', k === (i % n)); }
    function go(idx){
      i = idx;
      if(i === n) jumping = true;
      track.scrollTo({ left: leftOf(track.children[i]), behavior: 'smooth' });
      mark();
      if(i === n){
        setTimeout(function(){ track.scrollTo({ left: 0, behavior: 'auto' }); i = 0; jumping = false; mark(); }, 700);
      }
    }
    function next(){ go(i + 1); }
    function stop(){ if(tm){ clearInterval(tm); tm = null; } }
    function start(){ stop(); if(reduce) return; tm = setInterval(function(){ if(!paused && document.visibilityState === 'visible') next(); }, interval); }
    track.addEventListener('mouseenter', function(){ paused = true; });
    track.addEventListener('mouseleave', function(){ paused = false; });
    for(var k=0;k<dots.length;k++){ (function(idx){ dots[idx].addEventListener('click', function(){ go(idx); }); })(k); }
    var lastScrambled = -1;
    track.addEventListener('scroll', function(){
      clearTimeout(st);
      st = setTimeout(function(){
        var ch = track.children, best = 0, bd = 1e9;
        for(var k=0;k<ch.length;k++){ var d = Math.abs(leftOf(ch[k]) - track.scrollLeft); if(d < bd){ bd = d; best = k; } }
        if(best !== lastScrambled){ activate(ch[best]); lastScrambled = best; }
        if(!jumping){ i = best >= n ? 0 : best; mark(); lastScrambled = best; }
      }, 120);
    }, { passive: true });
    mark(); activate(track.children[0]); lastScrambled = 0; start();
  }
  function observeStandalone(){
    if(!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el = e.target;            // .ab-shell (data-anim)
        scrambleSlide(el);            // scramblea [data-scramble] interno
        if(!reduce){ el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); }
      });
    }, { threshold: 0.35 });
    var anims = document.querySelectorAll('[data-anim]');
    for(var k=0;k<anims.length;k++){ if(!anims[k].closest('[data-carousel]')) io.observe(anims[k]); }
  }
  function boot(){ var els = document.querySelectorAll('[data-carousel]'); for(var k=0;k<els.length;k++) init(els[k]); observeStandalone(); }
  if(document.readyState !== 'loading') setTimeout(boot, 0);
  else document.addEventListener('DOMContentLoaded', function(){ setTimeout(boot, 0); });
})();
