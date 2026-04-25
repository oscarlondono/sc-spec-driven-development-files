# Roadmap

Each phase is a single, deployable unit of work. Phases are ordered by dependency — each one builds on the previous.

## Cross-Phase UX Requirement

- The web UI must present all currently available user options (navigation actions and supported API options) in an obvious, human-readable way.

## Phase 1 — Project Scaffold

- Initialize Next.js 14 project with TypeScript and App Router
- Configure Tailwind CSS with mobile-first responsive design
- Install and configure shadcn/ui
- Set up ESLint and Prettier
- Install and configure Vitest for spec validation (`pnpm validate`)
- Confirm `pnpm dev` runs without errors

## Phase 2 — Database Setup

- Install Prisma and configure SQLite as the data source
- Initialize Prisma schema file
- Confirm `prisma db push` runs successfully

## Phase 3 — Data Models

- Define `Agent` model in Prisma schema (id, name, model, status, createdAt)
- Define `Ailment` model (id, name, description); relate to `Agent` (many-to-many)
- Define `Therapy` model (id, name, description, durationMinutes); relate to `Ailment`
- Define `Appointment` model (id, agentId, therapyId, scheduledAt, notes)
- Run a single migration covering all four models
- Seed one example agent, sample ailments, and sample therapies

## Phase 4 — API: List Agents

- Create `GET /api/agents` route returning all agents
- Add basic error handling

## Phase 5 — API: Create Agent

- Create `POST /api/agents` route
- Validate required fields

## Phase 6 — API: Ailments and Therapies

- Create `GET /api/ailments` route
- Create `GET /api/therapies` route

## Phase 7 — API: Book Appointment

- Create `POST /api/appointments` route
- Validate agent and therapy exist before inserting

## Phase 8 — Dashboard: Agents List Page

- Build `/dashboard/agents` page with shadcn/ui table
- Fetch and display all agents
- Responsive layout: table collapses to card list on mobile

## Phase 9 — Dashboard: Agent Detail Page

- Build `/dashboard/agents/[id]` page
- Show agent's ailments and appointment history

## Phase 10 — Dashboard: Book Appointment UI

- Add booking form to agent detail page
- Select therapy, pick date/time, submit

## Phase 11 — Dashboard: Staff View

- Build `/dashboard` home with summary stats (total agents, upcoming appointments)
- Responsive stat cards: single column on mobile, multi-column grid on tablet and above
- Accessible to staff only (basic auth or session placeholder)

## Phase 12 — Public Landing Page

- Build `/` homepage with clinic name, tagline, and a call-to-action
- Styled with Tailwind to meet Steve's "attractive modern browser" requirement
