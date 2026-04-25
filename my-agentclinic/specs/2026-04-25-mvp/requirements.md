# Requirements — MVP (Phases 3-10)

## Context

This MVP delivers the first complete staff-usable workflow for AgentClinic: model core clinical data, expose booking APIs, and provide dashboard pages that let staff view agents and book appointments.

Guidance sources:
- `specs/mission.md`: preserve the satirical clinic framing while keeping data and workflow clear.
- `specs/tech-stack.md`: implement with Next.js + TypeScript, Prisma + SQLite, Tailwind + shadcn/ui, and mobile-first responsive behavior.
- Existing feature specs under `specs/2026-04-24-project-scaffold/` and `specs/2026-04-25-database-setup/` for formatting and process conventions.

## Scope

This MVP includes roadmap Phases 3 through 10:

- Phase 3: Data models, one migration, deterministic seed data
- Phase 4: `GET /api/agents`
- Phase 5: `POST /api/agents`
- Phase 6: `GET /api/ailments` and `GET /api/therapies`
- Phase 7: `POST /api/appointments`
- Phase 8: `/dashboard/agents` list page
- Phase 9: `/dashboard/agents/[id]` detail page
- Phase 10: Booking UI on agent detail page

The MVP outcome is an end-to-end booking flow backed by persisted data and staff-facing UI.

The MVP web UI must make all currently available user options discoverable via explicit on-page options inventory sections.

## Decisions

| Decision | Value | Reason |
| --- | --- | --- |
| Schema evolution method | `prisma migrate dev` | Preserve migration history for MVP model changes |
| Database runtime | SQLite | Matches local/demo target and existing project setup |
| Seed strategy | Deterministic seed data | Enables repeatable demos and validation |
| Access control in MVP | Placeholder staff access only | Keeps MVP focused on core workflow, avoids auth-provider overhead |
| Advanced list UX | Defer filtering/search/pagination | Prioritize functional end-to-end flow first |
| Responsive baseline | Mobile-first for all dashboard pages | Matches tech-stack design principles and device targets |
| Options visibility | Show all currently available options in the web UI | Users should always see available actions without guessing |

## Out of Scope

- Full authentication/authorization provider integration
- Advanced table filtering/search/pagination
- Staff summary home (`/dashboard`, roadmap Phase 11)
- Public landing page overhaul (`/`, roadmap Phase 12)
- Non-MVP analytics/reporting features
