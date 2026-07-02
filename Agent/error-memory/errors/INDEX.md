# Error memory index

title: Error memory index
tags: agent, error-memory, debugging, routing
description: Routes agents to the smallest relevant recurring-error note.

Read this when:
- A task hits a repeated error, failed verification, tooling problem, deploy issue, or wrong assumption.
- You need to decide where to record a final root cause and fix.

Do not read this when:
- The task has no error or repeated operational risk.
- You are tempted to load every error file before knowing the category.

## Rules

1. Read this index first.
2. Search the relevant category with `rg -n`.
3. Read the smallest useful section.
4. Store root cause and final fix, not raw logs.
5. Never store secrets, tokens, passwords, credentials, cookie values, or production customer data.
6. If a legacy error-memory file exists, migrate useful entries gradually into category files instead of duplicating everything.
7. When bootstrapping a derived project, copy this index and only the relevant
   category files before implementation starts, so known mistakes are available
   from the first task.

## Categories

Add category files only when there is a real recurring error class.

| File | Read when |
|------|-----------|
| `tooling-errors.md` | PowerShell, npm, Node, test runner, generated folder, lockfile, or local tooling failures. |
| `api-contract-errors.md` | API fields, schema ids, endpoint contracts, auth context, or data mapping assumptions fail. |
| `deploy-errors.md` | Build, packaging, CI, hosting, or generated deploy output fails. |
