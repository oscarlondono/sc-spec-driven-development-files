# Requirements — Phase 2: Database Setup

## Context

This phase establishes the persistent data foundation for AgentClinic so later phases can define clinical domain models and booking workflows.

Guidance sources:
- `specs/mission.md`: preserve the satirical but structured clinic framing for future data entities.
- `specs/tech-stack.md`: use Prisma ORM with SQLite for local development and demo environments.

## Scope

Implement Phase 2 from the roadmap with roadmap-only scope:

- Install Prisma and required client package
- Configure SQLite as the datasource
- Initialize Prisma schema configuration
- Confirm `prisma db push` runs successfully

Also included for readiness:
- Generate Prisma Client successfully
- Keep repository health green (`pnpm validate`, `pnpm build`)

## Decisions

| Decision | Value | Reason |
| --- | --- | --- |
| Database engine | SQLite | Matches tech stack guidance for local/demo usage |
| SQLite path | `prisma/dev.db` | Standard Prisma local setup; explicit and predictable |
| Schema deployment mode | `prisma db push` only in this phase | Aligns with selected scope and keeps setup lightweight |
| Model definitions in this phase | None beyond Prisma baseline | Domain models belong to next roadmap phase |

## Out of Scope

- Defining `Agent`, `Ailment`, `Therapy`, or `Appointment` models
- Adding API routes or UI changes
- Introducing migration history workflow (`prisma migrate dev`) in this phase
- Seeding production-like data
