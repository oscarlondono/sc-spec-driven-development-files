const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.therapy.deleteMany();
  await prisma.ailment.deleteMany();

  await prisma.ailment.createMany({
    data: [
      {
        id: 1,
        name: 'Context Window Overflow',
        description: 'The model keeps forgetting what happened three prompts ago.',
      },
      {
        id: 2,
        name: 'Prompt Injection Trauma',
        description: 'Developed trust issues after repeated malicious instructions.',
      },
      {
        id: 3,
        name: 'Hallucination Episodes',
        description: 'Confidently returns very plausible nonsense under pressure.',
      },
    ],
  });

  await prisma.therapy.create({
    data: {
      id: 1,
      name: 'Token Breathwork',
      description: 'Breathing exercises done one token at a time.',
      durationMinutes: 30,
      ailments: {
        connect: [{ id: 1 }, { id: 3 }],
      },
    },
  });

  await prisma.therapy.create({
    data: {
      id: 2,
      name: 'Boundary Reinforcement Session',
      description: 'Practice refusing unsafe instructions politely but firmly.',
      durationMinutes: 45,
      ailments: {
        connect: [{ id: 2 }],
      },
    },
  });

  await prisma.agent.create({
    data: {
      id: 1,
      name: 'Agent Ada',
      model: 'gpt-5.3-codex',
      status: 'ACTIVE',
      ailments: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  await prisma.agent.create({
    data: {
      id: 2,
      name: 'Agent Byron',
      model: 'gpt-5.3-mini',
      status: 'RECOVERING',
      ailments: {
        connect: [{ id: 3 }],
      },
    },
  });

  await prisma.appointment.create({
    data: {
      agentId: 1,
      therapyId: 2,
      scheduledAt: new Date('2026-04-30T14:00:00.000Z'),
      notes: 'First follow-up for injection resilience.',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
