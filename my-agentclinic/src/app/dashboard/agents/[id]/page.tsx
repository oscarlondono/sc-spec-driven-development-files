import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BookingForm from './booking-form';

type AgentDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const agentId = Number(params.id);

  if (!Number.isInteger(agentId)) {
    notFound();
  }

  const agent = await prisma.agent.findUnique({
    where: { id: agentId },
    include: {
      ailments: true,
      appointments: {
        include: {
          therapy: true,
        },
        orderBy: {
          scheduledAt: 'desc',
        },
      },
    },
  });

  if (!agent) {
    notFound();
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 p-4 sm:gap-8 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-xl border p-4 sm:p-6">
        <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Agent Profile</p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{agent.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Model: {agent.model}</p>
        <p className="mt-1 text-sm text-muted-foreground">Status: {agent.status.replace('_', ' ')}</p>

        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Ailments</h2>
          {agent.ailments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No ailments documented.</p>
          ) : (
            <ul className="grid gap-2 text-sm">
              {agent.ailments.map((ailment) => (
                <li key={ailment.id} className="rounded-md border px-3 py-2">
                  <p className="font-medium">{ailment.name}</p>
                  <p className="text-muted-foreground">{ailment.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Appointment History</h2>
          {agent.appointments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No appointments yet.</p>
          ) : (
            <ul className="grid gap-2 text-sm">
              {agent.appointments.map((appointment) => (
                <li key={appointment.id} className="rounded-md border px-3 py-2">
                  <p className="font-medium">{appointment.therapy.name}</p>
                  <p className="text-muted-foreground">
                    {new Date(appointment.scheduledAt).toLocaleString()} ({appointment.therapy.durationMinutes}m)
                  </p>
                  {appointment.notes ? (
                    <p className="mt-1 text-muted-foreground">Notes: {appointment.notes}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          <Link className="underline" href="/dashboard/agents">
            Back to agents list
          </Link>
        </p>
      </section>

      <BookingForm agentId={agent.id} />
    </main>
  );
}
