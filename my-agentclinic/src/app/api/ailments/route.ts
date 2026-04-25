import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const ailments = await prisma.ailment.findMany({
      include: {
        therapies: {
          select: {
            id: true,
            name: true,
            durationMinutes: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ data: ailments });
  } catch (error) {
    console.error('GET /api/ailments failed', error);
    return NextResponse.json({ error: { message: 'Failed to load ailments.' } }, { status: 500 });
  }
}
