# Plan — Phase 1: Project Scaffold

## Task Group 1 — Initialize Next.js Project

1. Run `pnpm create next-app@14` with the following options:
   - TypeScript: yes
   - App Router: yes
   - `src/` directory layout: yes
   - Tailwind CSS: yes
   - ESLint: yes
   - Import alias: no (default `@/*`)
2. Confirm the project installs cleanly under pnpm 9 with Node 20 LTS.
3. Rename or remove any placeholder content in `src/app/page.tsx`.

## Task Group 2 — Configure shadcn/ui

4. Run `pnpm dlx shadcn@latest init` inside the project.
   - Choose **zinc** as the base color theme.
   - Accept default paths (`src/components`, `src/lib/utils`).
5. Add the `Button` component as a scaffold smoke test:
   ```
   pnpm dlx shadcn@latest add button
   ```
6. Import and render `<Button>` somewhere on the home page to confirm the component resolves.

## Task Group 3 — Code Quality Tooling

7. Install Prettier as a dev dependency:
   ```
   pnpm add -D prettier
   ```
8. Add a `.prettierrc` config file (semi: true, singleQuote: true, tabWidth: 2, trailingComma: "es5").
9. Add `format` and `format:check` scripts to `package.json`.
10. Verify ESLint config (`eslint.config.mjs` or `.eslintrc.json`) is present and parses cleanly.

## Task Group 4 — Vitest Setup

11. Install Vitest and supporting packages as dev dependencies:
    ```
    pnpm add -D vitest@^2.1.0 @vitejs/plugin-react @vitest/ui jsdom@24 @testing-library/react @testing-library/jest-dom
    ```
12. Create `vitest.config.ts` at the project root with:
    - `@vitejs/plugin-react` plugin
    - `environment: 'jsdom'`
    - `globals: true`
    - `@/*` path alias mirroring `tsconfig.json`
13. Add `"test": "vitest"`, `"test:run": "vitest run"`, and `"validate": "vitest run"` scripts to `package.json`. The `validate` script is the canonical command used to confirm spec requirements are met.
14. Add `"types": ["vitest/globals"]` to `compilerOptions` in `tsconfig.json`.
15. Write a smoke test at `src/__tests__/home.test.tsx` confirming the home page renders the heading, tagline, and CTA button.
16. Run `pnpm validate` — confirm all tests pass and the spec requirements are satisfied.

## Task Group 5 — TypeScript Strict Mode

17. Open `tsconfig.json` and confirm `"strict": true` is set.
18. Run `pnpm build` — fix any TS errors before moving on.

## Task Group 6 — Minimal AgentClinic Home Page

19. Replace the default Next.js content in `src/app/page.tsx` with a minimal branded page containing:
    - The clinic name **AgentClinic** as an `<h1>`.
    - The tagline from the mission: _"A safe, judgment-free space for AI agents."_
    - A single shadcn/ui `<Button>` labelled **Book a Session** (non-functional placeholder).
    - An **Available Options** panel listing all currently available user options in the web UI.
20. Style using Tailwind utility classes — centered layout, readable typography. No custom CSS files.
    - Follow mobile-first responsive design: base styles target mobile, `sm:` breakpoints scale up for tablet and desktop.
    - Heading: `text-2xl sm:text-4xl` — readable on small screens, larger on wide screens.
    - Body text: `text-base sm:text-lg`.
    - Padding: `p-4 sm:p-8` — tighter on small screens, more generous on large.
21. Confirm the page renders correctly in the browser with no console errors.

## Task Group 7 — Smoke Test

22. Run `pnpm dev` and confirm the dev server starts at `http://localhost:3000` with no console errors.
23. Run a manual curl check: `(Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing).StatusCode` → expect `200`.
24. Stop the dev server. Phase is complete.
