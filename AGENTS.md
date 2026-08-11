# YiQi UI agent contract

For new YiQi applications, React components are the implementation contract.

## Source precedence

1. `packages/ui/src/**` — executable component and token contract.
2. `apps/docs/**` — executable examples of those components.
3. `styles.css` and legacy HTML — compatibility layer while migration is in progress.
4. Markdown design documents — rationale and guidance only; they must not override executable code.

## Component groups

Use the smallest public entrypoint that matches the responsibility:

- `@yiqi/ui/foundation` — provider, theme and brand assets.
- `@yiqi/ui/primitives` — basic controls such as button, input and checkbox.
- `@yiqi/ui/authentication` — login and future authentication UI.
- `@yiqi/ui/layout` — app shell and structural layouts.
- `@yiqi/ui/data-display` — KPIs and read-only metrics.
- `@yiqi/ui/feedback` — banners, states and user feedback.

The root `@yiqi/ui` entrypoint remains valid for compatibility, but new application code should prefer grouped imports.

## Mandatory rules

- Use `@yiqi/ui` before creating a YiQi component locally.
- Use `YiQiLogin` for a standard YiQi authentication screen.
- Use `YiQiAppShell` for the standard topbar/sidebar/mobile shell.
- Use assets/components exported by `@yiqi/ui`; do not redraw the YiQi logo.
- Do not translate an existing YiQi component into Tailwind, CSS-in-JS or custom HTML.
- Radix Primitives may be used inside `@yiqi/ui` for accessible behavior. Prefer the `radix-ui` package and reuse existing primitives instead of rebuilding focus management, dialogs, menus, tooltips or selection controls.
- Project-specific code should connect data, routes and behavior through component props.
- If a required reusable visual component is missing, treat it as a Design System gap and add it to `@yiqi/ui` first.
- A new component gets one primary group. Do not export the same component from multiple groups to make discovery easier.

## Verification

Before closing a UI change:

```bash
npm install
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The CI workflow runs these gates and uploads visual checkpoints for login and app shell in desktop/mobile themes.

Legacy documentation remains available during migration but must not be used to recreate a component that already exists in `@yiqi/ui`.
