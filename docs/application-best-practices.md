# Buenas practicas generales de aplicaciones YiQi

## Arquitectura

- Separar presentacion, dominio y acceso a datos.
- Minimizar dependencias cruzadas.
- Preferir TypeScript para nueva logica.
- Mantener side effects explicitos.

## UI React / Next.js

- Buscar primero el componente en `@yiqi/ui`.
- Importar componentes compartidos; no reconstruirlos localmente.
- La app aporta datos, rutas, callbacks, children y copy mediante la API publica.
- Si falta una capacidad reusable, agregarla primero al paquete.
- No copiar JSX, tokens o CSS compartido desde catalogos, templates o Markdown.
- Importar `@yiqi/ui/styles.css` una sola vez.
- Ejecutar los guards del proyecto, incluido `npm run test:ui-redundancy` cuando se modifica la superficie React.

## UI HTML / legacy

- Consumir `https://diguardia.github.io/yiqi-imagen/styles.css`.
- No copiar ni forkar la hoja completa.
- Mantener templates legacy solo donde el runtime no puede consumir el componente React equivalente.

## Redaccion de UI

- Texto visible con ortografia correcta en español.
- Terminologia funcional consistente.
- Evitar repetir el mismo concepto en titulo, ayuda, label y placeholder.
- Un placeholder debe aportar formato o ejemplo; no repetir el label.
- Reservar mayusculas para siglas cuando corresponda.

## Datos e indicadores

- Todo KPI real debe tener fuente verificable, formula/agregado y periodo.
- Un indicador derivado debe explicar composicion cuando sea relevante.
- Si la fuente no esta disponible, mostrar el estado como no disponible o dato de ejemplo.
- Normalizar contratos de datos antes de renderizar.
- Cambios de payload con impacto visual actualizan mapeo, tests y documentacion.

## Seguridad

- Cumplir `docs/seguridad-aplicaciones.md` y las politicas de integracion aplicables.
- No exponer secretos en cliente.
- Validar entradas y respuestas externas.
- Logs utiles para diagnostico sin datos sensibles.

## Performance

- Evitar renders y requests innecesarios.
- Cargar datos bajo demanda cuando aporte valor.
- Medir antes de optimizar.

## Entrega

- Build y tests relevantes en verde.
- Revisar regresiones de los flujos afectados.
- Registrar solo decisiones reutilizables; no duplicar instrucciones ya canonicas en varios README.
