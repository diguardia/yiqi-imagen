# Authentication errors

title: Authentication errors
tags: error-memory, authentication, session, oauth, mfa
description: Recurring identity, login, session and account-recovery failures.

Read this when:
- Login, logout, session rotation or revocation, MFA, OAuth/OIDC, or recovery behaves incorrectly.

Do not read this when:
- The user is authenticated but access to a resource is wrong; use `authorization-errors.md`.
- A secret may have leaked; use `secret-handling-errors.md`.

## Known patterns to document in derived projects

- Distinguish `401` identity failures from `403` authorization failures.
- Verify session rotation after authentication and revocation after logout.
- For OAuth/OIDC, verify PKCE S256, state, nonce and exact redirect URI matching as one transaction.
- Test recovery and fallback paths for MFA bypasses, not only the primary login path.
- Store only the root cause and sanitized evidence. Never store passwords, tokens, cookies or recovery codes.

