'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type Therapy = {
  id: number;
  name: string;
  durationMinutes: number;
};

type TherapiesResponse = {
  data?: Array<Therapy>;
  error?: { message?: string };
};

type BookingFormProps = {
  agentId: number;
};

export default function BookingForm({ agentId }: BookingFormProps) {
  const router = useRouter();

  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [therapyId, setTherapyId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTherapies() {
      try {
        const res = await fetch('/api/therapies', { cache: 'no-store' });
        const payload: TherapiesResponse = await res.json();
        if (!res.ok || !payload.data) {
          setError(payload.error?.message ?? 'Failed to load therapies.');
          return;
        }

        setTherapies(payload.data);
      } catch {
        setError('Failed to load therapies.');
      }
    }

    loadTherapies();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setBusy(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId,
          therapyId: Number(therapyId),
          scheduledAt: new Date(scheduledAt).toISOString(),
          notes,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error?.message ?? 'Failed to create appointment.');
        return;
      }

      setMessage('Appointment booked successfully.');
      setTherapyId('');
      setScheduledAt('');
      setNotes('');
      router.refresh();
    } catch {
      setError('Failed to create appointment.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-xl border p-4 sm:p-6">
      <h2 className="mb-1 text-lg font-semibold">Book Appointment</h2>
      <p className="mb-4 text-xs text-muted-foreground sm:text-sm">
        Choose a therapy and schedule a recovery session.
      </p>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Therapy</span>
          <select
            className="h-11 rounded-md border bg-background px-3 text-sm"
            value={therapyId}
            onChange={(event) => setTherapyId(event.target.value)}
            required
          >
            <option value="">Select therapy</option>
            {therapies.map((therapy) => (
              <option key={therapy.id} value={therapy.id}>
                {therapy.name} ({therapy.durationMinutes}m)
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="font-medium">Date and Time</span>
          <input
            className="h-11 rounded-md border bg-background px-3 text-sm"
            type="datetime-local"
            value={scheduledAt}
            onChange={(event) => setScheduledAt(event.target.value)}
            required
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span className="font-medium">Notes (optional)</span>
          <textarea
            className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Any special context for this session"
          />
        </label>

        <Button className="h-11" disabled={busy || therapies.length === 0} type="submit">
          {busy ? 'Booking...' : 'Book Session'}
        </Button>
      </form>

      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}
    </section>
  );
}
