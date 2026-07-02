# Agent/INDEX.md - Documentation router

title: Agent documentation router
tags: agent, llm, routing, context
description: Routes agents to task-specific documentation while keeping context small.

Read only the rows that match your task.

## Golden routing method

The agent must use this router before editing unless the task is a truly trivial
known-file edit. The goal is not to read more; the goal is to read the right
small set of docs.

Use a route when:
- The task touches that domain.
- The task can break that domain.
- The task needs a checklist, tool, summary, project rule, or error-memory note.

Do not use a route when:
- The task does not touch that domain.
- The user named one exact file and the change is local to that file.
- Reading the route would only add background context with no decision impact.

Before closing, state the route or checklist used. If none applied, state that
the task was trivial or file-local.

## 1. Classify the task

| Task type | Read | Do not read |
|---------------|----------|-------------|
| Trivial change (typo, one line, named file) | Only the file to edit | Everything else |
| Choose checklist for a change | `../docs/checklists-por-intencion.md` | Unrelated docs |
| Close any task | Matching checklist from `../docs/checklists-por-intencion.md`; create a short task-specific checklist if none fits | Unrelated docs |
| Update internal task memory | `summaries/README.md` | Full source tree |
| Check project-specific constraints | `project-rules.md` when present | Full source tree |
| Use or update error memory | `error-memory/errors/INDEX.md` first | Every error file |
| Bootstrap a derived project | `README.md`, `error-memory/errors/INDEX.md`, `../template/INDEX.md` | Full source tree |
| Styles, tokens, or components | `../LEEME-FUENTE-DS.md` first | API/login docs |
| Implement UI with the DS | `../yiqi-design.md`, `../execution.md` | API/login docs |
| Consume DS styles in another project | `../template/shared/consume-styles.md`, `../LEEME-FUENTE-DS.md` | Full catalog unless changing a visual component |
| API integration | `../docs/yiqi-api.md` | DS docs |
| API integration security | `../docs/seguridad-integraciones-api.md` | Unrelated docs |
| Error handling or messages | `../docs/politica-errores.md` | Unrelated docs |
| Login or session | `../docs/yiqi-login.md` | Unrelated docs |
| Login template | `../template/login/README.md`, `../template/shared/consume-styles.md`, `../template/INDEX.md` | API docs unless wiring auth behavior |
| Template extraction or catalog split | `summaries/template-catalog.md`, `../template/INDEX.md`, `../template/shared/consume-styles.md`, `../yiqi-design-system.html` only for the specific component section | Full catalog unless extracting multiple templates |
| Fixtures or sample data | `../docs/politica-fixtures.md`, `../fixtures/INDEX.md` | Unrelated docs |
| Dependencies, packages, or audit | `../docs/politica-dependencias.md` | Unrelated docs |
| Open a PR | `../docs/pr-checklist.md` | Unrelated docs |
| Testing | Existing repo test commands; `../docs/testing-jest.md` only for Jest-specific work | Jest docs when Jest is not configured |
| Reusable tools or mechanical repairs | `tools/README.md`, `../scripts/README.md` | Unrelated docs |
| Deploy or Azure | `../docs/azure-nextjs-app-service.md` | Unrelated docs |
| Repository scripts | `../scripts/README.md` | Unrelated docs |
| Code conventions | `../docs/application-best-practices.md`, `../docs/copilot-global-guidelines.md` | Unrelated docs |
| Encoding or doc style | `../docs/convenciones-documentacion.md` | Unrelated docs |

## 2. Folder indexes

- Technical docs and policies: `../docs/INDEX.md`
- Brand assets: `../Fuentes/INDEX.md`
- Sample data: `../fixtures/INDEX.md`
- Scripts: `../scripts/INDEX.md`
- Templates: `../template/INDEX.md`
- Agent tools: `tools/README.md`
- Internal summaries: `summaries/README.md`
- Error memory: `error-memory/errors/INDEX.md`
- Project constraints: `project-rules.md`

## 3. Before finishing

- If your change modifies reusable knowledge, update the relevant document.
- If it does not, do not touch documentation.
- Verify UTF-8 and LF according to `../docs/convenciones-documentacion.md`.

## 4. Derived project bootstrap

When this repository is used to start or guide another project:

1. Create or update that project's agent docs first.
2. Import this `Agent/error-memory/errors/INDEX.md` and only the relevant error
   category files, so known recurring mistakes are available before the first
   implementation task.
3. Link `../template/INDEX.md` as the source of approved copy/paste templates.
4. Use the matching template as the first implementation path, then adapt copy,
   routes, API wiring, and project-specific behavior.
5. Load the canonical stylesheet from
   `https://diguardia.github.io/yiqi-imagen/styles.css`; do not copy or fork the
   full Design System CSS into the derived project.
6. If the derived project needs a reusable visual rule that is missing from the
   stylesheet, add it to this repository first and document the template impact.
7. Do not import secrets, raw logs, production credentials, customer data, or
   unrelated history.
