# UI regression errors

title: UI regression errors
tags: error-memory, ui, radix, accessibility, playwright, responsive
description: Recurring frontend regression causes and their final fixes.

Read this when:
- React or Radix content is visible but missing from the accessibility tree.
- Playwright role locators cannot find elements that exist in the DOM.
- Responsive pages pass visually but still have document-level overflow.

Do not read this when:
- The failure is backend-only, authentication-specific, or a generic local tooling problem.

## 2026-08-21 - Closed force-mounted Radix Dialog hid the application

Root cause: a modal Radix Dialog kept its portal and content force-mounted while closed. The visible shell remained in the DOM, but Radix hid the application from the accessibility tree. Role locators then failed even though `aria-label` attributes were present.

Final fix: use a stable non-modal Dialog root for the navigation drawer when its force-mounted subtree must preserve local slot state. Keep explicit accessible names, Tooltip behavior, Escape dismissal, and responsive close behavior covered by E2E tests.

## 2026-08-21 - Playwright init script touched the DOM too early

Root cause: a `page.addInitScript` callback accessed `document.documentElement` before the root element existed. The callback threw before seeding local storage, so theme bootstrap tests exercised fallback state instead of stored preference.

Final fix: seed storage first. If a consumer-owned root attribute is part of the test, set it from a one-time `DOMContentLoaded` listener.

## 2026-08-21 - Width 100 percent overflowed with local padding

Root cause: documentation cards used `width: 100%` with padding and borders under content-box sizing. The island looked close to correct but extended past its grid track on narrow viewports.

Final fix: assign `box-sizing: border-box` to the explicit-width owner and verify document `scrollWidth` at narrow widths.

## 2026-08-21 - Sequential assertions missed one loading frame

Root cause: an E2E test checked spinner, disabled action, enabled recovery, and live status one after another. Under parallel load, the valid transient state ended before the last assertion started, so the test contradicted its own same-frame contract.

Final fix: assert all projections of the same transient loading state concurrently, then assert the final error or result state after that group resolves.
