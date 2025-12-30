// app/api/session/[sessionId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis, SESSION_TTL } from '@/app/lib/redis';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    
    // Get session from Redis
    const sessionData = await redis.get(`session:${sessionId}`);
    
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    
    const session = JSON.parse(sessionData as string);
    
    // Optional: Refresh TTL to keep active sessions alive
    await redis.expire(`session:${sessionId}`, SESSION_TTL);
    
    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}