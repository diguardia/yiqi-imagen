# template/INDEX.md

title: Template catalog index
tags: templates, login, nextjs, design-system
description: Routes users and agents to approved reusable templates.

Read this when:
- You need a copy/paste template for a YiQi project.
- You want to avoid redesigning a common screen or flow from scratch.

Do not read this when:
- You are only consuming `styles.css` from the CDN.
- The task is unrelated to UI templates.

## Templates

| Template | Files | Read when |
|----------|-------|-----------|
| `shared/consume-styles.md` | Style consumption rule | Any template is copied into another project. |
| `login/` | Next.js and HTML login templates | A Next.js project needs a reusable YiQi login page. |
| `app-shell/` | HTML app shell template | A YiQi app needs sidebar, topbar, and content layout. |
| `kpi-card/` | HTML KPI cards | A project needs KPI cards with canonical DS classes. |
| `runtime-banner/` | HTML runtime banners | A project needs mock/error/unavailable state banners. |
| `trust/` | HTML trust stat variants | A project needs trust metrics in inline, card, or grid form. |
| `analytics-pro-banner/` | HTML host for web component | A page needs the canonical Analytics Pro promo banner. |
