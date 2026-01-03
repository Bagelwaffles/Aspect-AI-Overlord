export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { redis, SESSION_TTL } from '@/app/lib/redis';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sessionId = nanoid();
    
    const sessionData = {
      id: sessionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...body
    };

    await redis.setex(
      `session:${sessionId}`,
      SESSION_TTL,
      JSON.stringify(sessionData)
    );

    return NextResponse.json({ sessionId, ...sessionData });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
