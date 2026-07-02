# docs/ - Index

title: Documentation index
tags: documentation, design-system, api, testing, policies
description: Routes humans and agents to the document that matches the task.

Read this when:
- You need to choose the right document for a task.
- You are an agent and need to avoid loading unnecessary context.

Do not read this when:
- You already know the exact document needed.
- The task names a specific file to edit.

## Technical guides

| Document | Audience | Read when |
|-----------|-----------|---------------|
| `quickstart.md` | Dev | You only need to consume the DS from an app |
| `application-best-practices.md` | Dev / AI | App architecture and code conventions |
| `azure-nextjs-app-service.md` | Dev / DevOps | A Next.js app fails to start on Azure App Service |
| `copilot-global-guidelines.md` | AI / Copilot | Global guidance for coding agents |
| `testing-jest.md` | Dev | The target project uses Jest or needs Jest-specific guidance |
| `yiqi-api.md` | Dev / AI | YiQi API integration, auth, ids, and contracts |
| `yiqi-login.md` | Dev / AI | Login and session flow |
| `../template/INDEX.md` | Dev / AI | Approved copy/paste templates |

## Policies and checklists

| Document | Audience | Read when |
|-----------|-----------|---------------|
| `convenciones-documentacion.md` | All | Encoding, line endings, and documentation style |
| `seguridad-integraciones-api.md` | Dev / AI | Operational security for YiQi API consumers |
| `politica-errores.md` | Dev / AI | User-facing errors vs technical logs |
| `politica-dependencias.md` | Dev / Maintainer | npm, dependencies, and audit policy |
| `politica-fixtures.md` | Dev / AI | Fixture usage and update policy |
| `checklists-por-intencion.md` | Dev / AI | Choose the checklist for the change type |
| `pr-checklist.md` | Dev | Base checklist before opening a PR |
| `../Agent/tools/README.md` | AI | Reusable agent tools and mechanical repair procedures |
| `../Agent/project-rules.md` | AI | Project-specific constraints for derived projects |
| `../Agent/error-memory/errors/INDEX.md` | AI | Error memory routing for recurring failures |

## Scripts

See `../scripts/README.md` and `../scripts/INDEX.md`.
