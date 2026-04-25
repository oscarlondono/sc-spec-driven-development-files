# Roadmap

Each phase is a single, deployable unit of work. Phases are ordered by dependency — each one builds on the previous.

## Phase 1 — Project Scaffold

- Initialize Next.js 14 project with TypeScript and App Router
- Configure Tailwind CSS
- Install and configure shadcn/ui
- Set up ESLint and Prettier
- Install and configure Vitest for spec validation (`pnpm validate`)
- Confirm `pnpm dev` runs without errors

## Phase 2 — Database Setup

- Install Prisma and configure SQLite as the data source
- Initialize Prisma schema file
- Confirm `prisma db push` runs successfully

## Phase 3 — Agent Model

- Define `Agent` model in Prisma schema (id, name, model, status, createdAt)
- Run migration
- Seed one example agent

## Phase 4 — Ailment Model

- Define `Ailment` model (id, name, description)
- Relate `Ailment` to `Agent` (many-to-many)
- Run migration and seed sample ailments

## Phase 5 — Therapy Model

- Define `Therapy` model (id, name, description, durationMinutes)
- Relate `Therapy` to `Ailment`
- Run migration and seed sample therapies

## Phase 6 — Appointment Model

- Define `Appointment` model (id, agentId, therapyId, scheduledAt, notes)
- Run migration

## Phase 7 — API: List Agents

- Create `GET /api/agents` route returning all agents
- Add basic error handling

## Phase 8 — API: Create Agent

- Create `POST /api/agents` route
- Validate required fields

## Phase 9 — API: Ailments and Therapies

- Create `GET /api/ailments` route
- Create `GET /api/therapies` route

## Phase 10 — API: Book Appointment

- Create `POST /api/appointments` route
- Validate agent and therapy exist before inserting

## Phase 11 — Dashboard: Agents List Page

- Build `/dashboard/agents` page with shadcn/ui table
- Fetch and display all agents

## Phase 12 — Dashboard: Agent Detail Page

- Build `/dashboard/agents/[id]` page
- Show agent's ailments and appointment history

## Phase 13 — Dashboard: Book Appointment UI

- Add booking form to agent detail page
- Select therapy, pick date/time, submit

## Phase 14 — Dashboard: Staff View

- Build `/dashboard` home with summary stats (total agents, upcoming appointments)
- Accessible to staff only (basic auth or session placeholder)

## Phase 15 — Public Landing Page

- Build `/` homepage with clinic name, tagline, and a call-to-action
- Styled with Tailwind to meet Steve's "attractive modern browser" requirement
