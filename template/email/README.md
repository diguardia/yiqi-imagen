# Email base template

Template modelo para mails transaccionales y de campaña de YiQi (Mailchimp).
Base sobre la cual se trabaja el diseño de cada envío.

## Files

| File | Purpose |
|------|---------|
| `html/email-base.html` | Esqueleto de mail 600px con placeholders `{{ }}` y merge tags de Mailchimp. |

## Excepción del DS: estilos inline

A diferencia del resto de los templates, este **NO consume `styles.css` del CDN**.
Los clientes de correo eliminan las hojas de estilo externas y no soportan
variables CSS, así que el template usa **estilos inline con los hex canónicos
horneados** y dark mode vía `@media (prefers-color-scheme: dark)`. Mantener los
valores en sync con `styles.css`.

## Tokens canónicos (claro / oscuro)

| Uso | Claro | Oscuro |
|-----|-------|--------|
| Fondo (`--bg`) | `#eeece7` | `#0a0a0b` |
| Texto (`--text`) | `#17191c` | `#f3f5f7` |
| Muted (`--muted`) | `#5e5a57` | `#908e8e` |
| Cyan / kicker / links / CTA fill (`--cyan`) | `#009fc7` | `#00ccff` |
| Fondo tonal de callout (`--bg-soft`) | `#ece9e2` | `#181b21` |
| Chip de alerta (`--amber`) | `#ffb020` | `#ffb020` |
| Texto sobre chip alerta (`--text-on-amber`) | `#1a0d00` | `#1a0d00` |
| Tinta sobre CTA | `#ffffff` | `#06222b` |

## Reglas aplicadas

- **Título (H1) en Inter, nunca mono.** El mono (IBM Plex Mono) es solo para
  kickers, labels y chips.
- **CTA sólido canónico:** fondo `var(--cyan)`; texto blanco en claro y tinta
  oscura `#06222b` en oscuro (sobre el cyan brillante el blanco no contrasta).
- **Callout/destacado:** permitido pero **borderless con fondo tonal**. Prohibido
  el borde de un solo lado (`border-left`/`border-top`).
- **Chip:** neutro por defecto; variante `chip-alert` (ámbar) para deadlines o avisos.
- **Imagen hero:** módulo opcional (se muestra a 600px, esquinas redondeadas `14px`) tras el tagline. Archivo sugerido: 1200px de ancho (2x retina), relación ~1.9:1 (1200×630) o 3:2 (1200×800). Quitar la fila entera si no se usa.

## Pendientes de DS

- No existe token para tinta sobre cyan sólido. Candidato: `--ink-on-cyan`
  (`#06222b`). Definir antes de formalizar el componente en el catálogo visual.
