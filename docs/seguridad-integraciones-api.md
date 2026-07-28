# Seguridad operacional para integraciones API

Complementa `docs/yiqi-api.md` con el foco puesto en **seguridad**. Aplica a toda app
que consuma la API YiQi.

Esta guía detalla el caso de integración. La política transversal, los controles
`SEC-APP` y los gates obligatorios están en `docs/seguridad-aplicaciones.md`.

## 1. Credenciales y secretos

- **Nunca** hardcodear usuario, contraseña, token ni `schemaId` en el código ni en el repo.
- Las credenciales viven en variables de entorno / secret manager del backend, fuera de control de versiones.
- `.env` y `.env.*` están en `.gitignore`; no commitearlos jamás.
- No loguear credenciales ni tokens, ni siquiera en logs de debug.

## 2. Manejo del token

- El token YiQi se obtiene con `POST /token` y se reutiliza como `Bearer` en `Authorization`.
- No existe refresh token en el contrato base: al expirar (`401`), limpiar sesión local y reautenticar.
- **Encapsular el token en el backend propio** cuando la arquitectura lo permita; evitar exponerlo al cliente/navegador.
- Si el token debe llegar al frontend, tratarlo como dato sensible: en memoria, no en `localStorage` persistente si se puede evitar.

## 3. Contexto de sesión confiable

- `userId`, `schemaId` y demás contexto salen de `GET /api/accountapi/GetLoginInformation`, no de UI libre ni parámetros editables por el usuario.
- `schemaId` para endpoints de negocio debe venir del login o de configuración controlada de backend; nunca de un input del usuario final.
- La configuración por ambiente no debe contradecir la respuesta de login.

## 4. Transporte y robustez

- Solo HTTPS hacia la API YiQi.
- `http-client` con timeout y parseo de errores remotos controlado.
- Manejar todo lo que no sea `2xx` como error explícito; no asumir estructura de payload sin normalizar.
- Validar campos requeridos antes de usarlos en lógica o UI.

## 5. Separación de responsabilidades (reduce superficie de error)

```text
services/
  http-client.ts   # transporte, headers base, timeout, errores remotos
  auth-service.ts  # login, getLoginInformation, cierre de sesión
  yiqi-api.ts      # funciones por endpoint de negocio
  mappers.ts       # payload remoto -> modelo interno -> DTO de UI
```

## 6. Logs sin fuga de datos

- Registrar contexto técnico suficiente en logs del **backend** (endpoint, código, correlación).
- No exponer detalle técnico ni datos sensibles al **usuario final** (ver `docs/politica-errores.md`).
- No incluir tokens, contraseñas ni PII en los logs.

## 7. Permisos y errores de autorización

- `401`: token inválido/ausente/expirado → limpiar sesión y reautenticar.
- `403`: autenticado sin permisos → informar la restricción, **no** reintentar a ciegas.
- No degradar la seguridad para "que funcione": si falta permiso, es un problema de rol/contrato, no de la UI.

## Checklist de seguridad para integraciones

- [ ] Sin credenciales/tokens en código ni en el repo.
- [ ] `.env` / `.env.*` ignorados por git.
- [ ] Token encapsulado en backend cuando es posible.
- [ ] `schemaId`/`userId` provienen de `GetLoginInformation`, no de UI.
- [ ] Solo HTTPS; timeouts y manejo de no-`2xx`.
- [ ] Logs técnicos en backend sin datos sensibles.
- [ ] `401`/`403` manejados sin reintentos ciegos.
