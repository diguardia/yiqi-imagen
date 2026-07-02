# Estándar de Login YiQi

## Objetivo

Definir un patrón común de autenticación para todas las aplicaciones YiQi, de modo que el acceso, la experiencia visual y el manejo técnico de sesión sean consistentes y usen el flujo oficial de seguridad.

## Estructura de pantalla

- El login y la aplicación autenticada deben ser dos pantallas distintas.
- Si la app usa una sola página HTML, se deben renderizar en contenedores separados y mostrar solo uno a la vez.
- No mezclar sidebar, topbar ni contenido del dashboard con la pantalla de acceso cuando no hay sesión.
- El estado visual esperado es:
  - sin sesión: solo pantalla de login
  - autenticando: login visible con estado de carga
  - con sesión: solo aplicación autenticada

## Layout visual

- Usar una tarjeta de acceso centrada y sobria.
- Tipografía UI: Inter.
- Tipografía de datos o etiquetas técnicas: IBM Plex Mono.
- Usar tokens YiQi existentes; evitar colores hardcodeados por pantalla.
- CTA principal con color de token primario.
- Copy en espanol neutro, breve y accionable.
- Responsive validado en `<= 980px`.

## Template reutilizable

Para apps Next.js, usar como punto de partida el template aprobado en
`template/login/`. El template contiene componente, logo animado, preview visual
y CSS adaptador minimo. Los estilos visuales deben venir de `styles.css` de este
repositorio, no de una copia local del stylesheet completo.

Usar el template cuando:

- la app necesita login YiQi estandar;
- el proyecto todavia no tiene una pantalla de acceso propia;
- se busca mantener consistencia visual entre apps.

No usarlo como obligacion cuando:

- la app ya tiene un flujo de auth propio validado;
- el login requiere una experiencia distinta por producto;
- solo se necesita ajustar copy o conectar backend.

El copy especifico del proyecto debe pasarse por props. El template no debe
mencionar pedidos, facturas u otro modulo salvo que el proyecto lo configure.

## Campos y copy base

- Título recomendado: `Iniciar sesión`.
- Campo usuario: label `Usuario`.
- Campo password: label `Clave`.
- Botón principal: `Entrar` o `Iniciar sesión`.
- Mensaje idle recomendado: `Ingresa con tu usuario YiQi para abrir la aplicacion.`
- Mensajes de error: claros, sin detalles técnicos sensibles.

## Flujo oficial YiQi

El patrón correcto de login YiQi no termina en la obtención del token. La secuencia oficial es:

1. `POST /token`
2. `GET /api/accountapi/GetLoginInformation`
3. crear o actualizar la sesión interna de la app

Este segundo paso no es opcional en una implementación real. `GetLoginInformation` actúa como healthcheck canónico post-login y es la fuente primaria para resolver identidad y contexto de sesión.

## Datos minimos que deben salir de GetLoginInformation

La app debe asumir que de `GET /api/accountapi/GetLoginInformation` salen, como minimo, estos datos de trabajo:

- `userId`
- `userName`
- `schemaId`
- `schemaName`
- `host`

Con eso se resuelve la identidad autenticada y el esquema operativo base de la sesión.

## Backend propio recomendado

- No enviar credenciales a servicios no controlados por backend propio.
- El frontend no debe hardcodear secretos ni credenciales.
- Se recomienda backend o proxy propio para:
  - solicitar token
  - ejecutar `GetLoginInformation`
  - centralizar headers y errores
  - normalizar respuestas
  - emitir una sesión interna de aplicación desacoplada del contrato crudo de YiQi

## Que persistir y que no persistir

El backend propio puede persistir:

- sesión interna de la aplicación
- token YiQi solo si la arquitectura lo requiere y en almacenamiento controlado del servidor
- datos minimos normalizados de identidad para reconstruir contexto

El cliente no debe persistir:

- credenciales del usuario
- secretos de integracion
- payloads completos e innecesarios de YiQi
- cualquier dato sensible que no sea estrictamente necesario para reanudar la sesión local

En cliente, persistir solo lo mínimo para sostener la experiencia. Si la sesión persistida es inválida, limpiar storage y volver a login sin dejar UI intermedia inconsistente.

## Respuesta normalizada minima

Un backend propio puede exponer una respuesta de sesión simplificada como esta:

```json
{
  "user": {
    "id": 123,
    "username": "ana",
    "schemaId": 45
  }
}
```

La app no deberia depender de la forma cruda del endpoint remoto si puede consumir una normalizacion estable.

## Manejo de estado

- Modelar al menos estos estados:
  - `idle`
  - `loading`
  - `success`
  - `error`
- Durante `loading`:
  - deshabilitar submit
  - evitar doble envio
  - mostrar feedback visible
- En `error`:
  - mantener visible el login
  - preservar el campo usuario si mejora la experiencia
  - mostrar mensaje accionable en espanol neutro
- En `success`:
  - ocultar completamente la pantalla de login
  - mostrar solo la aplicacion autenticada

## Regla de identidad operativa

Si la app necesita conocer el responsable actual, debe usar el `userId` obtenido de `GetLoginInformation`. No corresponde resolver ese dato desde una variable manual, input libre o configuracion editable por UI.

## Logout minimo

El logout minimo debe:

1. invalidar la sesión interna de la app
2. limpiar storage local relacionado con autenticacion
3. volver a la pantalla de login

La navegacion posterior al logout no debe dejar restos de contexto autenticado en memoria ni en la UI.

## Implementacion sugerida

1. `services/http-client`: wrapper HTTP con timeout y error base.
2. `services/auth`: `login`, `getLoginInformation`, `logout` y manejo de sesión.
3. `state/auth-controller`: coordinacion de estados de autenticacion.
4. `ui/render-auth`: render de pantalla de acceso y mensajes.
5. `main`: bootstrap de sesion persistida y cambio de pantalla.

## Checklist minimo

- [ ] Login y app autenticada no se muestran juntas.
- [ ] El flujo implementado usa `POST /token` seguido de `GET /api/accountapi/GetLoginInformation`.
- [ ] `userId` y `schemaId` salen de `GetLoginInformation`.
- [ ] Errores HTTP de login tienen mensaje de usuario claro.
- [ ] Sin secretos hardcodeados en cliente.
- [ ] Estados `idle/loading/success/error` implementados.
- [ ] Logout limpia sesion y storage local.
- [ ] Responsive del login validado.
- [ ] Copy en espanol neutro.
- [ ] Tests o validaciones del flujo de login ajustados.
