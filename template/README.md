# Template catalog

Catalog of approved copy/paste templates for YiQi projects.

Use this folder when a project needs a starting point that should keep the YiQi
visual language without forcing a full application architecture.

For agents: these templates are legitimate implementation sources. Copy the
matching template first, then adapt project copy, routes, data wiring, and
integration details. Do not redesign an equivalent component from scratch when a
template already covers the requested use case.

Golden rule: templates copy structure, not the full Design System stylesheet.
Every consuming project must load the canonical CSS from this repository:

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">
```

## Rules

- Templates are starting points, not mandatory architecture.
- Agents should copy/paste the matching template before inventing new structure.
- Copy HTML/TSX and small adapter code only.
- Do not copy the full `styles.css` into another project.
- Reference the published stylesheet from this repository so future DS updates
  apply without copying CSS again.
- If reusable visual CSS is missing, add it to this repository first instead of
  creating a project-only fork.
- Keep canonical class names so future DS updates apply automatically.
- Keep project-specific copy configurable.
- Do not include credentials, tokens, customer data, or private implementation details.
- Prefer small files that can be copied independently.
- Each template must include a README, usage notes, and a visual preview when possible.

## Available templates

| Template | Use when |
|----------|----------|
| `login/` | A Next.js app needs the standard YiQi login screen with logo, status slot, remember-user behavior, and configurable project copy. |
| `app-shell/` | A YiQi app needs the standard application frame. |
| `kpi-card/` | A project needs canonical KPI cards. |
| `runtime-banner/` | A view needs mock/error/unavailable runtime state. |
| `trust/` | A section needs trust metrics. |
| `analytics-pro-banner/` | A web page needs the Analytics Pro promo banner. |
