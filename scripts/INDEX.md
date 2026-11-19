# scripts/ — Índice

Scripts de automatización del repo. Ejecutar vía los alias de `package.json`.

| Script | Comando npm | Qué hace |
|--------|-------------|----------|
| `check-detail-navigation.js` | `npm test` / `npm run test:detail-navigation` | Verifica la navegación de detalle |
| `check-consumer-css.js` | `npm test` / `npm run test:consumer-css -- <rutas>` | Impide CSS embebido y estilos inline estáticos en apps consumidoras |
| `check-radius.js` | `npm test` / `npm run test:radius` | Impide que un componente de `styles.css` elija su radio: solo roles `--radius-<rol>`, `0`, `50%` o `inherit` |
| `check-catalogo.js` | `npm test` / `npm run test:catalogo` | Catálogo y showcase sin estilos escritos a mano: ningún `style=""`, las muestras de §04 usan la clase real y una clase `cat-*` no pisa lo que declara una clase del DS (salvo `data-catalogo="motivo"`) |
| `canon/convertir.py` | `python3 scripts/canon/convertir.py cat-clases.css yiqi-design-system.html examples/showcase.html` | Pasa los `style=""` de las páginas a clases `cat-*` en `cat-clases.css` (19/11/2026). Ya se corrió: queda para cuando una demo nueva traiga estilos escritos a mano. `check-catalogo.js` no deja que vuelvan |
