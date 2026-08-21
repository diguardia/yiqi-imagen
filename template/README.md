# Catalogo de templates legacy

Esta carpeta existe para compatibilidad, migraciones y consumidores que no pueden usar `@yiqi/ui`.

## Regla para React / Next.js

Antes de abrir un template, buscar el componente en `@yiqi/ui`.

Si existe:

- importarlo desde su entrypoint publico;
- conectar props, datos, rutas y callbacks;
- no copiar el TSX/HTML del template;
- no agregar una segunda implementacion local;
- no usar el template como base visual para reconstruir el componente.

Los reemplazos actuales estan listados en `INDEX.md`.

## Regla para HTML / legacy

Los consumidores que no usan React pueden seguir usando los templates aprobados y cargar la hoja canonica legacy:

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">
```

No copiar el stylesheet completo ni forkar tokens compartidos.

## Reglas de mantenimiento

- Un template con equivalente en `@yiqi/ui` queda congelado como legacy o se convierte en adaptador; no vuelve a incorporar logica paralela.
- Un template sin equivalente React puede mantenerse hasta su migracion.
- Copy especifico del proyecto debe seguir siendo configurable.
- No incluir credenciales, tokens, customer data ni informacion sensible.
- Email y templates de infraestructura tienen restricciones propias y no se consideran componentes React.

Para nuevas aplicaciones React, la fuente de consumo es `../packages/ui/README.md`.
