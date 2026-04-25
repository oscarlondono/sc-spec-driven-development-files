# Plan — Phase 2: Database Setup

## Task Group 1 — Install Prisma

1. Add Prisma tooling dependencies:
   - `prisma` as a dev dependency
   - `@prisma/client` as a runtime dependency
2. Confirm Prisma CLI is available via pnpm scripts or `pnpm prisma`.

## Task Group 2 — Initialize Prisma for SQLite

3. Run `pnpm prisma init --datasource-provider sqlite` (or create `prisma/schema.prisma` manually) to scaffold Prisma config.
4. Configure datasource as SQLite with database URL pointing to `prisma/dev.db`.
5. Create `.env` at the project root with `DATABASE_URL="file:./dev.db"`.
6. Add `.env`, `.env.local`, `prisma/dev.db`, `prisma/dev.db-journal`, `prisma/dev.db-wal`, and `prisma/dev.db-shm` to `.gitignore`.
7. Create `.env.example` at the project root documenting the required variable: `DATABASE_URL="file:./dev.db"`.
8. Ensure generated Prisma files are in expected project locations (`prisma/schema.prisma` and `node_modules/@prisma/client`).

## Task Group 3 — Create Initial Schema Baseline

9. Create or update `prisma/schema.prisma` with generator and datasource blocks.
10. Keep this phase scoped to baseline database setup only:
    - No domain models yet (those are handled in the next roadmap phase).

## Task Group 4 — Push Schema to Database

11. Run `pnpm prisma db push`.
12. Confirm SQLite database file is created/updated at `prisma/dev.db`.

## Task Group 5 — Generate Prisma Client

13. Run `pnpm prisma generate`.
14. Confirm Prisma Client generation completes without errors (client written to `node_modules/@prisma/client`).

## Task Group 6 — Project Health Checks

15. Run `pnpm validate` to ensure existing test suite still passes.
16. Run `pnpm build` to ensure TypeScript and Next.js build remain healthy.
17. Verify no unexpected regressions in current app behavior.
18. Confirm existing web UI still surfaces all currently available user options.
