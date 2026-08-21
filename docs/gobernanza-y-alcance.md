# Gobernanza y alcance del Design System

Este documento define donde existe flexibilidad y donde no.

## 1. Componentes compartidos React

Los componentes publicados por `@yiqi/ui` son contratos, no referencias visuales.

Cuando existe un componente canonico:

- la app lo importa;
- puede configurar solamente la API publica del componente;
- no puede mantener un fork local equivalente;
- no puede reconstruirlo con Tailwind, CSS-in-JS, HTML propio o un template legacy;
- si necesita una variante reusable, la variante se agrega primero a `@yiqi/ui`.

Esta parte no es flexible porque dos implementaciones del mismo componente generan drift y regresiones.

## 2. UI de dominio

Una aplicacion si puede crear UI propia cuando representa una necesidad especifica de su dominio y no duplica un componente YiQi existente.

Ejemplos:

- una grilla operativa propia del modulo;
- una vista de dependencias;
- un editor de reglas de negocio;
- composicion de componentes YiQi para un flujo particular.

Si ese patron empieza a repetirse entre aplicaciones, debe evaluarse su promocion a `@yiqi/ui`.

## 3. HTML y legacy

`styles.css` sigue siendo la fuente visual canonica para consumidores HTML y proyectos legacy. Se consume desde el CDN y no se forkea por proyecto.

Los templates legacy son compatibles con esa superficie, pero no tienen precedencia sobre un componente React existente.

## 4. Reglas obligatorias

- Sin secretos o credenciales versionadas.
- Build y tests relevantes en verde.
- Marca escrita YiQi.
- Copy visible en español correcto.
- En React, reutilizar `@yiqi/ui` antes de crear un componente compartido.
- Sin duplicacion evitable de implementaciones ni copy visible.
- `npm run test:ui-redundancy` en cambios de la superficie React.
- IDs y contratos API segun `docs/yiqi-api.md`.
- Encoding y line endings segun `docs/convenciones-documentacion.md`.

## 5. Reglas adaptables

- estructura interna de una app;
- arquitectura de servicios mientras mantenga responsabilidades claras;
- composicion de pantallas;
- componentes exclusivos del dominio;
- microcopy pasado mediante APIs publicas cuando el componente lo permite.

Una desviacion no puede usarse para crear una segunda version de un componente compartido.

## 6. Cambio de estas reglas

La gobernanza se modifica en este repositorio mediante PR. Una aplicacion individual no redefine unilateralmente el contrato compartido.
