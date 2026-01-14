import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/redis';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    const body = await request.json();
    const { snapshot } = body;

    if (!snapshot) {
      return NextResponse.json(
        { error: 'Snapshot data is required' },
        { status: 400 }
      );
    }

    // Store snapshot in Redis with the session data
    const sessionKey = `session:${sessionId}`;
    const sessionData = await redis.get(sessionKey);
    
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Update session with snapshot
    const updatedSession = {
      ...sessionData,
      snapshot,
      updatedAt: new Date().toISOString()
    };

    await redis.set(sessionKey, JSON.stringify(updatedSession));

    return NextResponse.json({
      success: true,
      message: 'Snapshot updated successfully'
    });
  } catch (error) {
    console.error('Error updating snapshot:', error);
    return NextResponse.json(
      { error: 'Failed to update snapshot' },
      { status: 500 }
    );
  }
}
