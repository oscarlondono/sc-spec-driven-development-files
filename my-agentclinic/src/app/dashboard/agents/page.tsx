'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import AvailableOptions from '@/components/available-options';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Agent = {
  id: number;
  name: string;
  model: string;
  status: 'ACTIVE' | 'BURNED_OUT' | 'RECOVERING';
  ailments: Array<{ id: number; name: string }>;
  _count: { appointments: number };
};

type ApiResponse = {
  data?: Agent[];
  error?: { message?: string };
};

const statusStyles: Record<Agent['status'], string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-800',
  BURNED_OUT: 'bg-rose-100 text-rose-800',
  RECOVERING: 'bg-amber-100 text-amber-800',
};

export default function AgentsDashboardPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAgents() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/agents', { cache: 'no-store' });
        const payload: ApiResponse = await res.json();

        if (!res.ok || !payload.data) {
          setError(payload.error?.message ?? 'Unable to load agents.');
          setAgents([]);
          return;
        }

        setAgents(payload.data);
      } catch {
        setError('Unable to load agents.');
        setAgents([]);
      } finally {
        setLoading(false);
      }
    }

    loadAgents();
  }, []);

  const totalAppointments = useMemo(
    () => agents.reduce((sum, agent) => sum + agent._count.appointments, 0),
    [agents],
  );

  return (
    <main className="mx-auto w-full max-w-6xl p-4 sm:p-8">
      <header className="mb-6 flex flex-col gap-2 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Agent Roster</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Track agent wellness and jump directly into booking workflows.
        </p>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Agents: <span className="font-medium text-foreground">{agents.length}</span> · Appointments:{' '}
          <span className="font-medium text-foreground">{totalAppointments}</span>
        </p>
      </header>

      <div className="mb-6 sm:mb-8">
        <AvailableOptions />
      </div>

      {loading ? (
        <p className="rounded-lg border p-6 text-sm text-muted-foreground">Loading agents...</p>
      ) : error ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">{error}</p>
      ) : agents.length === 0 ? (
        <p className="rounded-lg border p-6 text-sm text-muted-foreground">
          No agents found. Seed data or create an agent via the API to begin.
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:hidden">
            {agents.map((agent) => (
              <article key={agent.id} className="rounded-xl border p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{agent.name}</h2>
                    <p className="text-xs text-muted-foreground">{agent.model}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[agent.status]}`}>
                    {agent.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="mb-3 text-xs text-muted-foreground">
                  Ailments: {agent.ailments.map((a) => a.name).join(', ') || 'None'}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Appointments: {agent._count.appointments}
                  </p>
                  <Link
                    className={cn(buttonVariants({ size: 'sm' }))}
                    href={`/dashboard/agents/${agent.id}`}
                  >
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-xl border sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Ailments</th>
                  <th className="px-4 py-3">Appointments</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{agent.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{agent.model}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[agent.status]}`}>
                        {agent.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {agent.ailments.map((a) => a.name).join(', ') || 'None'}
                    </td>
                    <td className="px-4 py-3">{agent._count.appointments}</td>
                    <td className="px-4 py-3">
                      <Link
                        className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
                        href={`/dashboard/agents/${agent.id}`}
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
