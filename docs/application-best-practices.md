# Buenas Prácticas Generales de Aplicaciones YiQi

## Arquitectura

- Separar capa de presentación, dominio y acceso a datos.
- Minimizar dependencias cruzadas entre módulos.
- Favorecer funciones puras y componentes reutilizables.

## Calidad de código

- Código legible antes que ingenioso.
- Nombres explícitos para funciones y variables.
- Preferir TypeScript como lenguaje por defecto para nueva lógica de negocio, integraciones y estado.
- Si un módulo legacy sigue en JavaScript, favorecer migraciones incrementales a TypeScript durante cambios sustanciales.
- Evitar side effects ocultos.
- Manejar errores con contexto útil.

## Redacción de UI

- Todo texto visible al usuario debe mantener ortografía y sintaxis correctas en español (incluyendo tildes).
- Mantener terminología funcional consistente entre pantallas e indicadores.
- Reservar MAYÚSCULAS para siglas técnicas o de negocio (API, POS, SLA, SKU).
- Redactar en español neutro latinoamericano, sin voseo ni regionalismos.

## Aplicaciones orientadas a datos e indicadores

- Todo KPI o indicador visible debe declarar origen validable en el propio componente o en su ayuda contextual.
- Formato mínimo recomendado de origen: modulo + campo(s) + agregado o formula + periodo.
- La fuente visible al usuario debe expresarse en lenguaje funcional (negocio), no como ruta técnica cruda.
- Si el indicador es derivado, debe explicar formula, unidad y criterios de calculo de forma entendible.
- Si el indicador representa una cuenta, debe exponer composicion: componentes incluidos, exclusiones y filtros relevantes.
- Si una fuente no esta disponible o llega incompleta, el indicador debe quedar como no disponible; no inventar valores locales.
- Cuando exista degradacion a mock o fallback, se debe explicitar el estado para evitar confundir dato real con dato de ejemplo.
- Todo indicador debe mostrar contexto temporal (periodo y/o fecha de corte) para evitar lecturas ambiguas.
- El contrato de datos debe validarse y normalizarse antes de renderizar indicadores.
- Los cambios de payload que afecten indicadores deben actualizar en el mismo cambio: mapeo, tests y documentacion.

## Checklist minimo por indicador

- [ ] Fuente funcional declarada y verificable.
- [ ] Formula o regla de calculo explicada (si aplica).
- [ ] Composicion de cuenta aclarada (si aplica).
- [ ] Periodo o fecha de corte visible.
- [ ] Estado no disponible/fallback correctamente comunicado.
- [ ] Cobertura de test para camino feliz y error path.

## Seguridad

- Cumplir la política transversal y los gates de `docs/seguridad-aplicaciones.md`.
- No exponer secretos en cliente.
- Validar entradas y salidas.
- Sanitizar datos visibles al usuario cuando corresponda.

## Performance

- Evitar renders innecesarios.
- Cargar datos bajo demanda cuando aplique.
- Medir antes de optimizar.

## Observabilidad

- Logs útiles para diagnóstico (sin datos sensibles).
- Mensajes de error consistentes y accionables.

## Entrega

- Cada funcionalidad debe cerrar con build + tests verdes.
- Registrar decisiones relevantes en README/ADR breve.
- En apps Next.js desplegadas en Azure App Service, si falla el arranque revisar primero el artifact (`.next/BUILD_ID`), la subida de archivos ocultos y el uso de Webpack documentados en `docs/azure-nextjs-app-service.md`.
