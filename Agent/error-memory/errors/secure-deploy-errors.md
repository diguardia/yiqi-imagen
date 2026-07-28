# Secure deploy errors

title: Secure deploy errors
tags: error-memory, deploy, ci, containers, supply-chain
description: Recurring failures in security gates, release pipelines and production hardening.

Read this when:
- SAST, dependency analysis, secret detection, DAST or a penetration test blocks a release.
- CI permissions, action pinning, containers, SBOM, provenance or artifact signing are incorrect.
- Debug endpoints, mock data or internal documentation are reachable in production.

Do not read this when:
- The failure is only a local tool invocation; use `tooling-errors.md`.

## Known patterns to document in derived projects

- An open critical finding blocks deploy. Do not bypass or rename the required check.
- A high finding must be fixed before merge or have a formal unexpired exception with owner, justification and mitigation.
- Document false positives with local scope and evidence; never disable a scanner or rule globally for one result.
- Pin CI actions to immutable SHAs and grant each job only its required permissions.
- Run containers as non-root, keep secrets outside images and prefer a read-only root filesystem.
- Verify that release evidence includes SBOM and provenance and that production excludes debug, mocks and internal docs.

