# Tooling errors

title: Tooling errors
tags: error-memory, tooling, powershell, npm, generated-files
description: Recurring local tooling failures and final fixes.

Read this when:
- PowerShell, npm, Node, Jest, lint, generated folders, lockfiles, screenshots, or local tools fail.

Do not read this when:
- The failure is an API contract, business logic, or deploy-host issue.

## Known patterns to document in derived projects

- Dynamic route paths with brackets may require literal path handling in PowerShell.
- Windows npm background processes may require `npm.cmd`.
- Generated folders such as `.next`, `deploy`, coverage, temporary browser profiles, or QA folders should be ignored by lint/test when they are not source.
- Keep a single package manager lockfile. Do not mix `package-lock.json`, `pnpm-lock.yaml`, and `yarn.lock`.
- If a script fails in a repeatable way, fix the script or document the unsupported case.

## 2026-06-11 - Headless screenshot read too early

Root cause: Chrome headless reported the screenshot after PowerShell tried to
read the file in the same command, so `Get-Item` failed even though the PNG was
written moments later.

Final fix: separate screenshot capture from file inspection, or add a short wait
and existence retry before reading the generated image.
