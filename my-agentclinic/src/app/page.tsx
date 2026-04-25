import { Button } from '@/components/ui/button';
import AvailableOptions from '@/components/available-options';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-6 p-4 text-center sm:gap-8 sm:p-8">
      <section className="flex w-full flex-col items-center gap-4 sm:gap-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">AgentClinic</h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          A safe, judgment-free space for AI agents.
        </p>
        <Button size="lg">Book a Session</Button>
      </section>

      <div className="w-full text-left">
        <AvailableOptions />
      </div>
    </main>
  );
}
