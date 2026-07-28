# Authorization errors

title: Authorization errors
tags: error-memory, authorization, access-control, tenant, object
description: Recurring server-side permission and resource-isolation failures.

Read this when:
- A user, role or tenant can access the wrong operation, object, field or real-time message.
- A permitted action is denied because the policy uses the wrong resource context.

Do not read this when:
- Identity or session verification failed before authorization; use `authentication-errors.md`.

## Known patterns to document in derived projects

- Enforce policy on the server for every operation and resource; hidden UI is not evidence.
- Include object and tenant context in the policy decision, not only a coarse role name.
- Add negative tests between users, roles and tenants whenever an authorization bug is fixed.
- Apply authorization to background jobs, exports and WebSocket messages as well as HTTP routes.
- Record synthetic actors and objects only. Never copy customer identifiers into error memory.

