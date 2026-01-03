export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import { redis, SESSION_TTL } from '@/app/lib/redis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, ...updates } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const existing = await redis.get(`session:${sessionId}`);
    if (!existing) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const existingData = JSON.parse(existing as string);
    const updated = {
      ...existingData,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await redis.setex(
      `session:${sessionId}`,
      SESSION_TTL,
      JSON.stringify(updated)
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}
