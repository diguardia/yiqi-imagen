# Estandar de Login YiQi

## Alcance

Este documento define el flujo funcional y de seguridad del login. La implementacion visual React no vive aqui: para React/Next.js se consume `YiQiLogin` desde `@yiqi/ui/authentication`.

No copiar markup de este documento ni usar `template/login` como implementacion nueva en React.

## Uso React

```tsx
import { YiQiLogin } from '@yiqi/ui/authentication'

<YiQiLogin
  appName="Mi app"
  onSubmit={async ({ username, password, remember }) => {
    return authenticate({ username, password, remember })
  }}
/>
```

Copy, errores externos, loading, labels y placeholders se configuran por props cuando la API publica lo permite. Si falta una capacidad reusable, se extiende el componente canonico.

## Copy

- Un label debe identificar el campo sin depender del placeholder.
- No repetir exactamente el label como placeholder.
- El placeholder solo se usa si aporta formato o ejemplo.
- Los errores deben ser claros y no exponer detalles tecnicos sensibles.

## Flujo oficial YiQi

Una autenticacion real debe completar:

1. `POST /token`
2. `GET /api/accountapi/GetLoginInformation`
3. crear o actualizar la sesion interna de la aplicacion

`GetLoginInformation` es el healthcheck post-login y la fuente primaria para identidad y contexto operativo.

## Datos minimos de sesion

Normalizar al menos:

- `userId`
- `userName`
- `schemaId`
- `schemaName`
- `host`

La UI no debe resolver estos datos desde inputs libres o configuracion manual.

## Backend recomendado

Centralizar en backend o proxy propio:

- solicitud de token;
- llamada a `GetLoginInformation`;
- headers y errores;
- normalizacion de respuesta;
- emision de la sesion interna.

No hardcodear secretos ni credenciales en frontend.

## Persistencia

El cliente puede recordar solo informacion de experiencia que sea necesaria y no sensible. El componente canonico de login puede recordar el username cuando el usuario lo solicita.

No persistir en `localStorage`:

- passwords;
- access tokens o refresh tokens salvo una arquitectura expresamente aprobada;
- API keys;
- secretos;
- payloads completos de YiQi sin necesidad.

## Estados

El flujo debe contemplar como minimo:

- idle;
- loading;
- error;
- success.

Durante loading se bloquea el doble submit. En error se mantiene el login visible. En success, la aplicacion controla la navegacion o cambio de sesion.

## Logout

1. invalidar la sesion interna;
2. limpiar storage relacionado con autenticacion;
3. volver al estado no autenticado;
4. no dejar restos de contexto autenticado en memoria o UI.

## Checklist

- [ ] La app React usa `YiQiLogin` y no una copia local.
- [ ] No se repite label como placeholder.
- [ ] `POST /token` se completa con `GetLoginInformation`.
- [ ] `userId` y `schemaId` salen del contexto oficial.
- [ ] No hay secretos hardcodeados.
- [ ] Passwords y tokens no quedan en storage inseguro.
- [ ] Loading evita doble submit.
- [ ] Errores son accionables y no filtran detalles tecnicos.
- [ ] Logout limpia la sesion.
- [ ] Responsive y E2E pasan.
