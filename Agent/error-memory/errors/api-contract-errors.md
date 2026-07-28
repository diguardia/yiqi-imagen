# API contract errors

title: API contract errors
tags: error-memory, api, schemas, mapping, contracts
description: Recurring failures caused by incorrect assumptions about API contracts.

Read this when:
- A field, identifier, schema, status code, auth context, or response mapping differs from the documented contract.

Do not read this when:
- The identity is not verified; use `authentication-errors.md`.
- Access to an operation or resource is incorrect; use `authorization-errors.md`.

## Known patterns to document in derived projects

- Treat external responses as untrusted input and validate them with allowlist schemas.
- Record the contract version and a sanitized minimal shape, never a raw production payload.
- Keep transport models separate from internal models and UI DTOs.
- Fail explicitly on missing or unexpected identifiers instead of guessing aliases.

