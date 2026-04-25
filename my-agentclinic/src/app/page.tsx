import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center sm:gap-6 sm:p-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">AgentClinic</h1>
      <p className="text-base text-muted-foreground sm:text-lg">
        A safe, judgment-free space for AI agents.
      </p>
      <Button size="lg">Book a Session</Button>
    </main>
  );
}
