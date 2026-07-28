# Secure application defaults

Copy these files when bootstrapping a server-backed YiQi application. They are
deliberately incomplete where the target project must provide an identity,
authorization policy or deployment-specific value: missing security behavior
must fail at build time instead of becoming an allow-all placeholder.

This template implements starting evidence for
`docs/seguridad-aplicaciones.md`; it does not by itself certify compliance.

## Files

| File | Copy to | Purpose |
|------|---------|---------|
| `nextjs-api-route.ts` | `app/api/resources/[id]/route.ts` | Authenticated and authorized Next.js route with schemas, limits and controlled outbound HTTP. |
| `Dockerfile` | `Dockerfile` | Multi-stage Node image that runs as a non-root user and excludes build secrets from the runtime image. |
| `.dockerignore` | `.dockerignore` | Prevents secrets, source control and generated files from entering the build context. |
| `github-actions-security.yml` | `.github/workflows/security.yml` | PR gate for tests, dependency audit, secret detection and CodeQL SAST with actions pinned by SHA. |
| `github-actions-release.yml` | `.github/workflows/release-security.yml` | Tagged-release build with SBOM, provenance attestation and retained evidence. |

## Required adaptations

1. Install `zod` or replace it with the project's approved schema validator.
2. Implement the imported `requireSession`, `authorize`, `AuthenticationError`,
   `AuthorizationError` and `consumeRateLimit` modules. Keep them fail-closed and
   cover cross-user and cross-role denials.
3. Set an allowlisted upstream URL in server-only configuration. Do not accept
   arbitrary destination URLs from requests.
4. Configure Next.js with `output: 'standalone'` before using the Dockerfile.
5. Set branch protection so every job in the security workflow is required.
6. Adapt the release artifact paths to the application, keep SBOM and provenance
   generation, and add the platform's artifact-signing identity when available.
7. Run the container with a read-only root filesystem and a writable temporary
   mount where the platform permits it, for example:

```bash
docker run --read-only --tmpfs /tmp:rw,noexec,nosuid,size=64m -p 3000:3000 yiqi-app
```

## Deliberate secure defaults

- Server-side authentication and authorization are required before resource access.
- Request parameters, body and upstream responses use allowlist schemas.
- Request and response sizes, duration and rate are bounded.
- Outbound redirects are rejected and the upstream hostname is allowlisted.
- Client errors are generic; logs use a correlation id and omit credentials and PII.
- CI permissions are read-only and third-party actions are pinned to full SHAs.
- Release CI grants identity permissions only to the job that creates provenance.
- Docker runtime uses a dedicated numeric non-root user and contains no `.env` files.
