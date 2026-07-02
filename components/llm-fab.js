/* ============================================================
   YiQi LLM FAB — Web Component
   Uso: <llm-fab base="./"></llm-fab>  (base = ruta a la raíz del repo)
   Carga yiqi-design.md + execution.md (en la raíz de yiqi-imagen) y los copia al clipboard.
   DS v1.2.5
   ============================================================ */

class LlmFab extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('base') || './';

    /* ── Inyectar estilos (una sola vez) ── */
    if (!document.getElementById('llm-fab-styles')) {
      const style = document.createElement('style');
      style.id = 'llm-fab-styles';
      style.textContent = `
.llm-fab {
  position: fixed; bottom: 24px; right: 24px; z-index: 200;
  display: grid; place-items: center;
  width: 40px; height: 40px;
  background: var(--bg-elev-2); border: 1px solid var(--line-strong);
  border-radius: var(--radius-pill);
  color: var(--muted);
  cursor: pointer;
  transition: color var(--tr,180ms ease), border-color var(--tr,180ms ease),
              background var(--tr,180ms ease);
}
.llm-fab:hover {
  color: var(--cyan); border-color: rgba(0,204,255,.28);
  background: var(--bg-soft);
}
.llm-fab.copied  { color: var(--green); border-color: rgba(21,212,156,.28); background: var(--green-soft,rgba(21,212,156,.08)); }
.llm-fab.errored { color: var(--red,#f25f5c); border-color: rgba(242,95,92,.28); background: var(--red-soft,rgba(242,95,92,.08)); }
.llm-fab svg { width: 15px; height: 15px; flex-shrink: 0; }
@media (max-width: 640px) {
  .llm-fab { bottom: 16px; right: 16px; width: 36px; height: 36px; }
}`;
      document.head.appendChild(style);
    }

    /* ── HTML ── */
    const COPY_ICON = `<svg id="llmFabIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>`;
    const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`;
    const ERROR_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>`;

    this.innerHTML = `<button class="llm-fab" aria-label="Copiar contexto del DS para LLMs" title="Copy for LLMs">${COPY_ICON}</button>`;

    /* ── Lógica ── */
    const btn = this.querySelector('.llm-fab');
    const icon = this.querySelector('#llmFabIcon');

    const setIcon = (svg) => { btn.innerHTML = svg; };
    const reset   = () => {
      btn.classList.remove('copied', 'errored');
      setIcon(COPY_ICON);
    };

    btn.addEventListener('click', async () => {
      try {
        const [design, execution] = await Promise.all([
          fetch(base + 'yiqi-design.md').then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }),
          fetch(base + 'execution.md').then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }),
        ]);
        const full = design + '\n\n---\n\n' + execution;
        await navigator.clipboard.writeText(full);
        btn.classList.add('copied');
        setIcon(CHECK_ICON);
        setTimeout(reset, 2200);
      } catch (err) {
        console.error('[llm-fab]', err);
        btn.classList.add('errored');
        setIcon(ERROR_ICON);
        setTimeout(reset, 3000);
      }
    });
  }
}

customElements.define('llm-fab', LlmFab);
