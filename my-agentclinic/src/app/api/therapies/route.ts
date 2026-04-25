import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const therapies = await prisma.therapy.findMany({
      include: {
        ailments: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ data: therapies });
  } catch (error) {
    console.error('GET /api/therapies failed', error);
    return NextResponse.json({ error: { message: 'Failed to load therapies.' } }, { status: 500 });
  }
}
