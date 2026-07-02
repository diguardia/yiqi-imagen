# Gobernanza y alcance del Design System

Define **cuánto impone** el DS y **cuánto deja a criterio** de cada proyecto. Resuelve la
tensión entre consistencia (todos iguales) y flexibilidad (cada app adapta).

## 1. Alcance del Design System (flexibilidad de uso)

El DS YiQi es una **base flexible**, no un molde rígido.

- **Es la base recomendada** para toda app/landing/dashboard YiQi: tokens, componentes y patrones.
- **Se puede extender:** un proyecto puede agregar componentes propios y variantes, siempre que respeten los tokens y la filosofía visual (borderless, dark/light, tipografía).
- **Límites que no se tocan** (para no romper coherencia de marca ni el CDN):
  - Tokens de color/tipografía/geometría base (se editan en la fuente `yiqi-imagen`, no por proyecto).
  - `styles.css`: **fuente única** de tokens y componentes (se edita en `yiqi-imagen`); los proyectos la consumen por CDN, no la editan ni la forkean (ver `LEEME-FUENTE-DS.md`).
- **Lo adaptable por proyecto:** composición de pantallas, layout específico, componentes nuevos de dominio, microcopy.

Regla práctica: *consumí el DS por CDN, extendé encima, no forkees los tokens.*

## 2. Reglas obligatorias vs. recomendadas

No todo pesa igual. Se distinguen dos niveles:

### Obligatorias (bloquean un PR)
- Sin secretos/credenciales en el código ni en el repo.
- Seguridad de integraciones API (ver `seguridad-integraciones-api.md`).
- Navegación a detalle con `item.id` (ver `yiqi-api.md`); `npm run test:detail-navigation` en verde si hay listados/detalle.
- Encoding UTF-8 / LF (ver `convenciones-documentacion.md`).
- Build sin errores y lint sin errores críticos.
- Copy en español neutro; marca escrita **YiQi**.

### Recomendadas (adaptables por proyecto, justificar si se desvían)
- Estructura de carpetas de referencia (ver §3).
- Runner de testing y umbrales de cobertura (ver `testing-jest.md`).
- Convenciones de estilo de código y patrones de arquitectura más allá del mínimo.
- Uso de TypeScript como default (recomendado fuerte, no bloqueante en legacy JS).

Si un proyecto se desvía de una recomendada, basta dejarlo explicado en el PR.

## 3. Arquitectura de referencia (no obligatoria)

La estructura `services/http-client · auth-service · yiqi-api · mappers` documentada en
`yiqi-api.md` es una **referencia recomendada**, no un estándar impuesto.

- **Aplica especialmente** a apps nuevas que consumen la API YiQi.
- **No obliga** a apps existentes ni a proyectos con otra arquitectura ya establecida.
- El objetivo es la **separación de responsabilidades** (transporte / auth / negocio / mapeo), no la forma exacta de las carpetas. Cualquier estructura que logre esa separación es válida.

## 4. Cómo cambiar estas reglas

Estas definiciones son de equipo. Para cambiar qué es obligatorio vs. recomendado, o el
alcance del DS, proponerlo en un PR sobre este documento y acordarlo; no cambiarlo de forma
unilateral en un proyecto.
