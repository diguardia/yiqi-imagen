# Secret handling errors

title: Secret handling errors
tags: error-memory, secrets, credentials, tokens, logs
description: Recurring exposure and unsafe storage of credentials or sensitive authentication material.

Read this when:
- A secret appears in source, history, logs, fixtures, build output, images or client storage.
- A default credential or weak password-storage scheme is discovered.

Do not read this when:
- Login logic fails without disclosure; use `authentication-errors.md`.

## Immediate response

1. Stop further disclosure and identify the affected systems without copying the value.
2. Revoke or rotate the credential; deleting it from the current file is not sufficient.
3. Remove the value from artifacts and history using the repository's approved incident process.
4. Add a local detection rule or regression test without embedding the real secret.
5. Record owner, impact, root cause and final fix using redacted or synthetic evidence only.

## Known patterns to document in derived projects

- Secret scanners complement, but do not replace, review of generated artifacts and container layers.
- `.gitignore` prevents new untracked files; it does not remove an already committed secret.
- Passwords require Argon2id or bcrypt with reviewed parameters; encryption or reversible encoding is not password hashing.

