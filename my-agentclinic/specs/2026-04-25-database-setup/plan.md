# Plan — Phase 2: Database Setup

## Task Group 1 — Install Prisma

1. Add Prisma tooling dependencies:
   - `prisma` as a dev dependency
   - `@prisma/client` as a runtime dependency
2. Confirm Prisma CLI is available via pnpm scripts or `pnpm prisma`.

## Task Group 2 — Initialize Prisma for SQLite

3. Run `pnpm prisma init` (or equivalent) to scaffold Prisma config.
4. Configure datasource as SQLite with database URL pointing to `prisma/dev.db`.
5. Ensure generated Prisma files are in expected project locations (`prisma/` and `node_modules/.prisma`).

## Task Group 3 — Create Initial Schema Baseline

6. Create or update `prisma/schema.prisma` with generator and datasource blocks.
7. Keep this phase scoped to baseline database setup only:
   - No domain models yet (those are handled in the next roadmap phase).

## Task Group 4 — Push Schema to Database

8. Run `pnpm prisma db push`.
9. Confirm SQLite database file is created/updated at `prisma/dev.db`.

## Task Group 5 — Generate Prisma Client

10. Run `pnpm prisma generate`.
11. Confirm Prisma Client generation completes without errors.

## Task Group 6 — Project Health Checks

12. Run `pnpm validate` to ensure existing test suite still passes.
13. Run `pnpm build` to ensure TypeScript and Next.js build remain healthy.
14. Verify no unexpected regressions in current app behavior.
