# Plan — MVP (Phases 3-10)

## Task Group 1 — Data Models, Migration, and Seed

1. Extend `prisma/schema.prisma` with roadmap Phase 3 models:
   - `Agent` (`id`, `name`, `model`, `status`, `createdAt`)
   - `Ailment` (`id`, `name`, `description`) with many-to-many relation to `Agent`
   - `Therapy` (`id`, `name`, `description`, `durationMinutes`) related to `Ailment`
   - `Appointment` (`id`, `agentId`, `therapyId`, `scheduledAt`, `notes`)
2. Use `pnpm prisma migrate dev` to create one MVP migration covering these models.
3. Implement deterministic seed data (same records every run):
   - At least one agent
   - Multiple ailments
   - Multiple therapies
   - At least one appointment tied to valid agent/therapy records
4. Run seed and verify data is queryable locally.

## Task Group 2 — API Endpoints (Phases 4-7)

5. Implement `GET /api/agents` to return all agents.
6. Implement `POST /api/agents` with required-field validation.
7. Implement `GET /api/ailments`.
8. Implement `GET /api/therapies`.
9. Implement `POST /api/appointments` validating:
   - `agentId` exists
   - `therapyId` exists
   - Request payload includes required values and valid date/time format
10. Add consistent JSON error shape and HTTP status codes across all MVP endpoints.

## Task Group 3 — Dashboard Agents List (Phase 8)

11. Build `/dashboard/agents` with a shadcn/ui table for desktop and card list behavior on mobile.
12. Fetch data from `GET /api/agents` and display loading/error/empty states.
13. Ensure touch-friendly controls and mobile-first spacing.

## Task Group 4 — Agent Detail (Phase 9)

14. Build `/dashboard/agents/[id]` page.
15. Show selected agent metadata, linked ailments, and appointment history.
16. Add not-found handling for invalid IDs.

## Task Group 5 — Booking UI (Phase 10)

17. Add booking form to `/dashboard/agents/[id]`:
   - Therapy select
   - Date/time input
   - Optional notes
18. Submit to `POST /api/appointments` and render success/error feedback.
19. Refresh appointment history after successful booking.

## Task Group 6 — MVP Constraints and Cleanup

20. Keep auth at placeholder level only; do not add a full auth provider in MVP.
21. Defer filtering/search/pagination to post-MVP.
22. Keep code TypeScript-first and aligned to current project conventions.
23. Add an "Available Options" inventory to user-facing web pages so users can see every currently available option.

## Task Group 7 — Validation Pass

24. Run `pnpm validate`.
25. Run `pnpm build`.
26. Run API smoke checks for all MVP endpoints with expected status codes.
27. Perform responsive verification (mobile + desktop) for MVP dashboard pages.
28. Validate end-to-end booking flow against seeded data.
29. Verify "Available Options" inventory is visible and accurate on user-facing pages.
