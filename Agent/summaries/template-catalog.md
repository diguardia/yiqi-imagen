# Template catalog extraction

title: Template catalog extraction
tags: templates, design-system, catalog, styles
description: Internal summary for templates extracted from yiqi-design-system.html.

Read this when:
- A task changes `template/`.
- A task extracts a component from `yiqi-design-system.html`.
- A task changes how projects consume DS template styles.

Do not read this when:
- The task only edits API docs or unrelated repository policy.

## Current rule

Templates copy reusable structure and small behavior adapters. They must not copy
the full Design System stylesheet into consuming projects.

Consuming projects load the canonical stylesheet:

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">
```

## Source relationship

- `yiqi-design-system.html` remains the human visual catalog.
- `template/` contains smaller copy/paste units extracted from the catalog.
- Reusable visual CSS belongs in `styles.css` and `ds-styles.css`.
- Template CSS is allowed only for adapter behavior that is not reusable DS
  styling yet.

## Extracted modules

- `template/login/`
- `template/app-shell/`
- `template/kpi-card/`
- `template/runtime-banner/`
- `template/trust/`
- `template/analytics-pro-banner/`

## Verification

- Run repo tests.
- Run TypeScript checks for TSX templates.
- Generate or update Markdown preview screenshots after visual changes.
- Search templates for duplicated token blocks before publishing.

## Last reviewed

2026-06-12
