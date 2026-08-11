# Resumen interno: login

Leer este resumen cuando una tarea toque login visual React o `template/login/`.

## Fuente actual

El login React canonico es `YiQiLogin` desde `@yiqi/ui/authentication`.

`template/login/yiqi-login-template.tsx` es un adaptador de compatibilidad deprecado. No contiene una implementacion propia y no debe volver a incorporar formulario, storage, loading, validaciones, iconos o estilos paralelos.

## Regla para agentes

- App React nueva: importar `YiQiLogin`.
- Adaptar mediante props y `onSubmit`.
- Si falta una capacidad reusable, extender `YiQiLogin` en `packages/ui`.
- No copiar el template a una app React.
- No reconstruir el login desde preview, screenshot, Markdown o HTML legacy.

## Contratos relevantes

- Remember-user puede persistir solo el username.
- Password, tokens y secretos no se guardan en `localStorage`.
- Label y placeholder no deben repetir exactamente el mismo copy.
- El flujo funcional de autenticacion se documenta en `docs/yiqi-login.md`.

## Verificacion

- `npm run test:ui-redundancy`
- `npm test`
- `npm run build`
- `npm run test:e2e`

Ultima revision: 2026-08-11.
