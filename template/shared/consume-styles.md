# Consume YiQi styles

title: Consume YiQi styles from templates
tags: templates, styles, cdn, design-system
description: Shared rule for using template markup without copying the full CSS.

Read this when:
- You copy any template from this repository into another project.
- You need to know whether to copy CSS or reference the Design System.

Do not read this when:
- You are editing the canonical `styles.css` source in this repository.

## Golden rule

Templates provide reusable markup and project wiring. Visual styles must come
from the canonical stylesheet:

```html
<link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css">
```

This repository is the source of the visual language. A consuming project should
reference the stylesheet URL, copy template structure, and keep the canonical
class names. That lets future DS updates apply without copying CSS again.

In Next.js, load it once from `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YiQi App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="system">
      <head>
        <link rel="stylesheet" href="https://diguardia.github.io/yiqi-imagen/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## What to copy

- Copy HTML or TSX structure from the selected template.
- Adapt text, routes, data, ids, event handlers, and API calls.
- Keep canonical class names such as `login-card`, `kpi-card`, `app-shell`,
  `btn`, and `btn-primary`.

## What not to copy

- Do not copy the full content of `styles.css` into another project.
- Do not duplicate token blocks such as `:root` and `html[data-theme="light"]`.
- Do not fork the DS CSS into per-project files.
- Do not recreate shared visual component CSS inside the consuming app.

## Adapter CSS

Adapter CSS is allowed only for small behavior rules that are not part of the
global Design System yet, such as a password-eye button or a template-only
preview wrapper. If the rule is visual and reusable, move it to canonical
`styles.css` instead of keeping it in a template.

If a published stylesheet does not yet include a new reusable class, document
that dependency and update this repository before relying on the class in a
derived project.
