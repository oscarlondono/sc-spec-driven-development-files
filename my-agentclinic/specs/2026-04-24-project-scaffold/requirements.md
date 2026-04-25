# Requirements — Phase 1: Project Scaffold

## Context

AgentClinic is a satirical wellness platform for AI agents, built as a teaching tool for spec-driven development with AI coding agents. The project is currently an empty TypeScript stub with no framework in place.

This phase establishes the full development foundation so that every subsequent phase can build on a stable, typed, and styled baseline.

See [mission.md](../mission.md) for product context and [tech-stack.md](../tech-stack.md) for rationale behind the chosen technologies.

## Scope

Implement everything listed in **Phase 1 — Project Scaffold** of the roadmap:

- Initialize a Next.js 14 project with TypeScript and App Router
- Configure Tailwind CSS
- Install and configure shadcn/ui
- Set up ESLint and Prettier
- Install and configure Vitest with jsdom for spec validation and component testing
- Build a minimal AgentClinic home page (`/`) with the clinic name, tagline, and a placeholder CTA button
- Confirm `pnpm dev` runs without errors

No features, data models, API routes, or pages beyond the minimal home page are in scope for this phase.

## Decisions

| Decision               | Value                                            | Reason                                              |
| ---------------------- | ------------------------------------------------ | --------------------------------------------------- |
| Node version           | 20 LTS                                           | Stability; matches course prerequisites             |
| Package manager        | pnpm 9                                           | Specified in tech-stack; fast, disk-efficient       |
| TypeScript mode        | `strict: true`                                   | Aligned with tech-stack end-to-end type safety goal |
| Directory layout       | `src/`                                           | Keeps app code separate from config files           |
| shadcn/ui theme        | zinc                                             | Neutral, professional look for dashboard use        |
| shadcn/ui import paths | `src/components`, `src/lib/utils`                | shadcn/ui defaults; no custom aliasing needed       |
| Prettier config        | semi, singleQuote, tabWidth 2, trailingComma es5 | Standard readable TypeScript style                  |
| Test runner            | Vitest 2.x                                       | Vite-native, fast, TypeScript-first; used as executable spec validation via `pnpm validate` |
| Test environment       | jsdom 24.x                                       | Enables DOM assertions for React component tests; v24 avoids ESM conflicts on Node 22 |
| Component testing      | @testing-library/react + @testing-library/jest-dom | Standard React testing utilities; jest-dom adds DOM matchers |

## Out of Scope

- Any Prisma or database configuration (Phase 2)
- Any data models (Phases 3–6)
- Any API routes (Phases 7–10)
- Dashboard pages (Phases 11–14)
- Authentication or session management
- Functional routing or interactivity on the home page CTA button
