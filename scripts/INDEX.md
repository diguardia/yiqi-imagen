# scripts/ — Índice

Scripts de automatización del repo. Ejecutar vía los alias de `package.json`.

| Script | Comando npm | Qué hace |
|--------|-------------|----------|
| `check-detail-navigation.js` | `npm test` / `npm run test:detail-navigation` | Verifica la navegación de detalle |
| `check-consumer-css.js` | `npm test` / `npm run test:consumer-css -- <rutas>` | Impide CSS embebido y estilos inline estáticos en apps consumidoras |
| `check-radius.js` | `npm test` / `npm run test:radius` | Impide que un componente de `styles.css` elija su radio: solo roles `--radius-<rol>`, `0`, `50%` o `inherit` |
