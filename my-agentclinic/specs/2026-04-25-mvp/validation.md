# Validation — MVP (Phases 3-10)

This MVP is complete and merge-ready when all checks below pass.

## 1. Test Suite Passes

```bash
pnpm validate
```

- Command exits with code 0.
- Existing tests remain green.
- MVP-related tests (if added) pass consistently.

## 2. Build Passes

```bash
pnpm build
```

- Command exits with code 0.
- No TypeScript or Next.js build errors.

## 3. Database + Seed Validation Passes

```bash
pnpm prisma migrate dev
pnpm prisma db seed
```

- Migration applies successfully.
- Seed runs successfully with deterministic records.
- Seeded records are queryable through Prisma/API routes.

## 4. API Smoke Checks Pass

Run request-level checks (scripted or manual) for MVP endpoints:

- `GET /api/agents` returns `200` with JSON array.
- `POST /api/agents` returns `201` for valid payload and validation error code for invalid payload.
- `GET /api/ailments` returns `200`.
- `GET /api/therapies` returns `200`.
- `POST /api/appointments` returns success for valid `agentId`/`therapyId`, and validation error code for invalid IDs.

## 5. Dashboard Rendering + Responsiveness Passes

- `/dashboard/agents` renders agent data and handles empty/error states.
- `/dashboard/agents/[id]` renders details and appointment history.
- Booking form is usable on both mobile and desktop.
- No horizontal overflow at 320 px and no broken layout at desktop widths.

## 6. End-to-End Booking Flow Passes

Starting from seeded data:

1. Open an agent detail page.
2. Submit a booking via the form.
3. Receive success feedback.
4. Confirm appointment appears in the updated appointment history.

## 7. Available Options Inventory Is Visible and Accurate

- User-facing pages include an "Available Options" section.
- Section lists all currently supported user options (web UI actions and API options).
- Listed options match the actual behavior implemented in this MVP.

## Merge Checklist

- [ ] `pnpm validate` passes
- [ ] `pnpm build` passes
- [ ] `pnpm prisma migrate dev` passes
- [ ] `pnpm prisma db seed` passes
- [ ] API smoke checks pass for all MVP endpoints
- [ ] Responsive checks pass on mobile and desktop
- [ ] End-to-end booking flow works against seeded data
- [ ] Available Options inventory is visible and accurate on user-facing pages
- [ ] Scope remains limited to roadmap Phases 3-10
