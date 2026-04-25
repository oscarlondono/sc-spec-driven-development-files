# AgentClinic

A satirical wellness platform for AI agents — built as a spec-driven development teaching project.

## Getting Started

**Prerequisites:** Node.js 20 LTS or 22.11+ · pnpm 9

```bash
# 1. Install dependencies (also generates the Prisma Client via postinstall)
pnpm install

# 2. Set up environment variables
cp .env.example .env

# 3. Push the database schema
pnpm db:push

# 4. Start the dev server
pnpm dev
```

The app runs at `http://localhost:3000`.

### Useful scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm validate` | Run all spec tests |
| `pnpm db:push` | Apply schema to local SQLite DB |
| `pnpm db:generate` | Regenerate Prisma Client |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.
