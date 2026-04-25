# Validation — Phase 1: Project Scaffold

This phase is considered **complete and merge-ready** when all checks below pass.

## 1. Dev Server Starts

```
pnpm dev
```

- Server starts at `http://localhost:3000` with no terminal errors.
- No red error overlay in the browser.

## 2. Manual curl Check

With the dev server running:

```
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expected response: **200**

## 3. TypeScript Build Passes

```
pnpm build
```

- Completes with no TypeScript errors.
- No `Type error:` lines in the output.

## 4. ESLint Passes

```
pnpm lint
```

- Exits with code 0.
- Zero errors, zero warnings.

## 5. Prettier Format Check Passes

```
pnpm format:check
```

- Exits with code 0 (all files already formatted).

## 6. Spec Validation Passes

```
pnpm validate
```

- Exits with code 0.
- All tests in `src/__tests__/` pass.
- `pnpm validate` is an alias for `vitest run` and is the canonical command for confirming spec requirements are met.

## 7. shadcn/ui Component Resolves

- A `<Button>` from shadcn/ui is visible on the home page without import errors or console warnings.

## 8. Minimal Home Page Content

- `http://localhost:3000` displays the heading **AgentClinic**.
- The tagline _"A safe, judgment-free space for AI agents."_ is visible on the page.
- A **Book a Session** button is present and renders without errors.
- No default Next.js placeholder content (logo, links to docs) remains.

## 9. Responsive Layout

- Resize the browser from 320 px to 1440 px — no horizontal scrollbar appears.
- The heading, tagline, and button remain legible and centered at all widths.
- Heading uses `text-2xl` at mobile width and `text-4xl` at `sm` breakpoint (640 px+).
- Padding is tighter on mobile (`p-4`) and increases at `sm` (`p-8`).

## Merge Checklist

- [ ] All 9 checks above pass locally
- [ ] `pnpm validate` exits with code 0
- [ ] `pnpm dev` curl returns 200
- [ ] No uncommitted changes (`git status` is clean)
- [ ] Branch is up to date with `main`
