import Link from 'next/link';

type AvailableOptionsProps = {
  agentId?: number;
};

export default function AvailableOptions({ agentId }: AvailableOptionsProps) {
  const agentPath = agentId ? `/dashboard/agents/${agentId}` : '/dashboard/agents/:id';

  return (
    <section className="rounded-xl border bg-muted/20 p-4 sm:p-6">
      <h2 className="text-lg font-semibold">Available Options</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        This panel lists every currently available option in the product UI and API.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Web UI Options
          </h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link className="underline" href="/">
                View homepage
              </Link>
            </li>
            <li>
              <Link className="underline" href="/dashboard/agents">
                Browse agent roster
              </Link>
            </li>
            <li>
              {agentId ? (
                <Link className="underline" href={agentPath}>
                  Open current agent detail and booking form
                </Link>
              ) : (
                <span>
                  Open an agent detail page from the roster (pattern: <code>{agentPath}</code>)
                </span>
              )}
            </li>
            <li>
              <span>Book an appointment from an agent detail page.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            API Options
          </h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <code>GET /api/agents</code> - List agents
            </li>
            <li>
              <code>POST /api/agents</code> - Create agent
            </li>
            <li>
              <code>GET /api/ailments</code> - List ailments
            </li>
            <li>
              <code>GET /api/therapies</code> - List therapies
            </li>
            <li>
              <code>POST /api/appointments</code> - Book appointment
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}