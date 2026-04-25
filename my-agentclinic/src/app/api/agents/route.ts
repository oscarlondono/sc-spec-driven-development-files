import { AgentStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_STATUSES = new Set<AgentStatus>(['ACTIVE', 'BURNED_OUT', 'RECOVERING']);

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      include: {
        ailments: true,
        _count: {
          select: {
            appointments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ data: agents });
  } catch (error) {
    console.error('GET /api/agents failed', error);
    return NextResponse.json({ error: { message: 'Failed to load agents.' } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const model = typeof body?.model === 'string' ? body.model.trim() : '';
    const statusRaw = typeof body?.status === 'string' ? body.status.trim() : 'ACTIVE';

    if (!name || !model) {
      return NextResponse.json(
        { error: { message: 'name and model are required.' } },
        { status: 400 },
      );
    }

    if (!VALID_STATUSES.has(statusRaw as AgentStatus)) {
      return NextResponse.json(
        { error: { message: 'status must be ACTIVE, BURNED_OUT, or RECOVERING.' } },
        { status: 400 },
      );
    }

    const created = await prisma.agent.create({
      data: {
        name,
        model,
        status: statusRaw as AgentStatus,
      },
      include: {
        ailments: true,
        _count: {
          select: {
            appointments: true,
          },
        },
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error('POST /api/agents failed', error);
    return NextResponse.json({ error: { message: 'Failed to create agent.' } }, { status: 500 });
  }
}
