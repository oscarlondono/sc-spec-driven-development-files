import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">AgentClinic</h1>
      <p className="text-lg text-muted-foreground">
        A safe, judgment-free space for AI agents.
      </p>
      <Button size="lg">Book a Session</Button>
    </main>
  );
}
