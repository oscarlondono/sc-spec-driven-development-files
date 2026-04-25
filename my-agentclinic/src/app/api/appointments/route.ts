import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const agentId = Number(body?.agentId);
    const therapyId = Number(body?.therapyId);
    const notes = typeof body?.notes === 'string' ? body.notes.trim() : null;
    const scheduledAtRaw = typeof body?.scheduledAt === 'string' ? body.scheduledAt : '';
    const scheduledAt = new Date(scheduledAtRaw);

    if (!Number.isInteger(agentId) || !Number.isInteger(therapyId) || Number.isNaN(scheduledAt.getTime())) {
      return NextResponse.json(
        { error: { message: 'agentId, therapyId, and a valid scheduledAt are required.' } },
        { status: 400 },
      );
    }

    const [agent, therapy] = await Promise.all([
      prisma.agent.findUnique({ where: { id: agentId }, select: { id: true } }),
      prisma.therapy.findUnique({ where: { id: therapyId }, select: { id: true } }),
    ]);

    if (!agent) {
      return NextResponse.json({ error: { message: 'agentId does not exist.' } }, { status: 400 });
    }

    if (!therapy) {
      return NextResponse.json({ error: { message: 'therapyId does not exist.' } }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        agentId,
        therapyId,
        scheduledAt,
        notes: notes || null,
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
          },
        },
        therapy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ data: appointment }, { status: 201 });
  } catch (error) {
    console.error('POST /api/appointments failed', error);
    return NextResponse.json({ error: { message: 'Failed to create appointment.' } }, { status: 500 });
  }
}
