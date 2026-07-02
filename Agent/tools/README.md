# Agent/tools - Reusable agent tools

title: Agent tools index
tags: agent, tools, scripts, mechanical-repair, mojibake
description: Documents reusable tools and procedures agents should use before repeating manual work.

Read this when:
- A task involves mojibake, encoding, formatting, repeated edits, generated files, or fragile transformations.
- A previous manual fix could become a repeatable tool.

Do not read this when:
- The task is a one-line edit in a named file.
- The relevant script is already documented in `../scripts/README.md`.

## Rules

1. Prefer a repeatable tool for mojibake, encoding repairs, bulk edits, index generation, and fragile transformations.
2. If a tool fails, fix the tool or document the unsupported case. Do not keep repeating a broken manual workaround.
3. Keep tools small and single-purpose.
4. Document every reusable tool with objective, inputs, outputs, touched files, risks, and an example command.
5. Do not store secrets, credentials, tokens, or production data in tools or examples.

## Where to put tools

| Tool type | Location | Notes |
|-----------|----------|-------|
| Repository script used by humans or CI | `scripts/` | Add an npm alias when useful and update `scripts/README.md`. |
| Agent-only procedure or checklist | `Agent/tools/` | Keep it short and route from `Agent/INDEX.md`. |
| One-off exploratory command | Do not commit | Promote it to a documented tool only if it prevents repeated errors. |

## Tool documentation template

```md
## Tool name

Objective:
Inputs:
Outputs:
Touched files:
Risks:
Example:
```

## Current reusable tools

| Tool | Location | Use |
|------|----------|-----|
| Detail navigation guard | `../scripts/check-detail-navigation.js` | Detects unsafe detail routes such as `undefined`, `item.ID`, or business fields used as ids. |

## Mojibake repair guidance

For encoding repairs, first inspect with UTF-8 validation from `../docs/convenciones-documentacion.md`.
If a bulk repair is needed, create a script that:

- reads files as bytes;
- converts only the intended encoding case;
- writes UTF-8 without BOM;
- leaves unrelated files unchanged;
- can be rerun safely;
- prints a summary of changed files.

Run the script, inspect the diff, and adjust the script until the result is correct.
