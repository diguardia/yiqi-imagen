# Checklists por intencion de cambio

Este archivo agrega foco segun la tarea. El checklist transversal vive en `pr-checklist.md`; no repetir aqui todas sus reglas.

## 1. Cambio trivial

- [ ] El cambio es local y no altera contratos o comportamiento.
- [ ] No se cargaron documentos innecesarios.
- [ ] El archivo afectado sigue compilando o validando como antes.

## 2. UI React / componente del DS

- [ ] Se reviso primero `@yiqi/ui` para evitar crear un duplicado.
- [ ] El componente compartido tiene una sola implementacion canonica.
- [ ] El catalogo usa el mismo entrypoint publico que una app real.
- [ ] No hay label/placeholder ni bloques de copy redundantes sin funcion distinta.
- [ ] No se duplico logica de tema, storage, loading o validacion.
- [ ] `npm run test:ui-redundancy` pasa.
- [ ] `npm test`, build y E2E relevantes pasan.
- [ ] Se revisaron dark/light y responsive si cambia presentacion.

## 3. Migracion legacy a React

- [ ] Se creo o extendio el componente en `@yiqi/ui`.
- [ ] El consumidor ya importa el componente en vez de copiar markup.
- [ ] El template React paralelo fue convertido en adaptador, deprecado o retirado.
- [ ] El legacy HTML se conserva solo si tiene consumidores o utilidad de migracion.
- [ ] No se elimino compatibilidad sin evidencia de que ya no se usa.

## 4. Listado / detalle

- [ ] Navegacion usa el id canonico documentado.
- [ ] Acciones secundarias no disparan la navegacion de la fila.
- [ ] `npm run test:detail-navigation` pasa.
- [ ] E2E valida la URL final cuando corresponde.

## 5. API nueva o contrato modificado

- [ ] Campos, ids y contexto requerido estan documentados.
- [ ] Payload remoto se normaliza antes de llegar a UI.
- [ ] Errores HTTP relevantes estan manejados.
- [ ] Seguridad de integracion revisada.
- [ ] Fixtures o tests se actualizan si aplica.

## 6. Login / sesion

- [ ] React usa `YiQiLogin` y no una copia local.
- [ ] Flujo funcional sigue `docs/yiqi-login.md`.
- [ ] Passwords, tokens y secretos no quedan en storage inseguro.
- [ ] Loading evita doble submit.
- [ ] Logout limpia el contexto correspondiente.

## 7. KPI / indicador

- [ ] Fuente real verificable.
- [ ] Formula/agregado y periodo identificables.
- [ ] Datos simulados marcados como ejemplo o no disponibles.
- [ ] Cambio de payload incluye mapeo y tests.

## 8. Dependencias / tooling

- [ ] Se justifico la dependencia nueva o se reutilizo una existente.
- [ ] Se prefirio una libreria madura antes que rehacer un primitive complejo.
- [ ] Audit y build pasan.
- [ ] Scripts nuevos tienen una sola responsabilidad y alias npm.

## 9. Documentacion

- [ ] La fuente correcta tiene precedencia clara.
- [ ] No se copio la misma regla en multiples archivos si puede referenciarse.
- [ ] Indices o routers se actualizaron si cambia donde debe empezar un agente.
- [ ] Comentarios operativos nuevos estan en español ASCII.
- [ ] Copy visible conserva ortografia correcta.

## 10. Seguridad / deploy

Usar los documentos especificos del dominio:

- `seguridad-aplicaciones.md`
- `seguridad-integraciones-api.md`
- `azure-nextjs-app-service.md`
- `politica-dependencias.md`

No duplicar sus controles completos en este checklist.

## Cierre

- [ ] Se uso este checklist y el transversal de `pr-checklist.md` cuando corresponde.
- [ ] Se informaron verificaciones realizadas y riesgos pendientes.
- [ ] Si hubo una falla repetible, se actualizo error-memory sin copiar logs sensibles.
