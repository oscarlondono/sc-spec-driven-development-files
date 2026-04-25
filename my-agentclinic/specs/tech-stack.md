# Tech Stack

AgentClinic is built on a server-side TypeScript stack chosen for reliability, developer experience, and dashboard capability.

## Recommended Framework: Next.js

**Next.js 14+ (App Router)** is the primary framework. It provides:

- Full-stack TypeScript out of the box
- Server-side rendering and React Server Components
- API routes co-located with the frontend
- Built-in routing — no separate router setup required

## Frontend

| Technology          | Role                                                                        |
| ------------------- | --------------------------------------------------------------------------- |
| React (via Next.js) | UI component model                                                          |
| Tailwind CSS        | Utility-first styling with mobile-first responsive breakpoints (`sm`, `md`, `lg`) |
| shadcn/ui           | Accessible dashboard components (tables, forms, dialogs)                    |
| TypeScript          | End-to-end type safety                                                      |

## Design Principles

All UI must follow **responsive design**: layouts, typography, and spacing must adapt gracefully from small mobile screens (≥ 320 px) through tablet (≥ 640 px) to desktop (≥ 1024 px).

- Use Tailwind's mobile-first breakpoint prefix pattern: base styles target mobile, `sm:` and above override for larger screens.
- No fixed pixel widths on layout containers — use `max-w-*` with `w-full` instead.
- Fluid typography: heading sizes scale up at `sm:` breakpoints.
- Touch targets must be large enough for mobile interaction (minimum 44 × 44 px).

## Backend

| Technology                          | Role                                            |
| ----------------------------------- | ----------------------------------------------- |
| Next.js API Routes / Server Actions | Server-side business logic                      |
| TypeScript                          | All server code is TypeScript                   |
| Prisma ORM                          | Type-safe database access and schema management |

## Database

| Technology | Role                                    |
| ---------- | --------------------------------------- |
| SQLite     | Local development and demo environments |

## Testing & Validation

**Vitest** is used as the primary test runner for spec validation. Tests serve as executable acceptance criteria — each spec requirement maps to one or more Vitest tests that confirm the implementation meets it.

| Script           | Command           | Purpose                                      |
| ---------------- | ----------------- | -------------------------------------------- |
| `pnpm test`      | `vitest`          | Run tests in watch mode during development   |
| `pnpm test:run`  | `vitest run`      | Run all tests once (CI / pre-commit)         |
| `pnpm validate`  | `vitest run`      | Alias used to validate spec requirements     |

Tests live in `src/__tests__/` and use `@testing-library/react` with a `jsdom` environment.

## Tooling

| Technology        | Role                            |
| ----------------- | ------------------------------- |
| Node.js           | Runtime                         |
| pnpm              | Package manager                 |
| ESLint + Prettier | Code quality and formatting     |
| ts-node / tsx     | Run TypeScript scripts directly |
| Vitest            | Spec validation and testing     |

## Rationale

Mary (Engineering) asked for a reliable stack with TypeScript and a usable dashboard. This stack is the industry standard for that combination. Steve (Marketing) gets an attractive, fast site via Tailwind and React — accessible on any device. Susan (Product) gets a clear data layer through Prisma to model agents, ailments, therapies, and appointments.
