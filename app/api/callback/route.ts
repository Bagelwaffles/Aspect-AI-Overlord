export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/redis';

export async function POST(request: Request) {
  try {
    // Verify the callback secret
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.N8N_CALLBACK_SECRET;
    
    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the callback data from n8n
    const body = await request.json();
    const { sessionId, response, status } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Get the existing session
    const sessionKey = `session:${sessionId}`;
    const existingSession = await redis.get(sessionKey);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Parse existing session
    const sessionData = typeof existingSession === 'string' 
      ? JSON.parse(existingSession) 
      : existingSession;

    // Update session with n8n response
    const updatedSession = {
      ...sessionData,
      aiResponse: response,
      status: status || 'completed',
      updatedAt: new Date().toISOString()
    };

    // Save updated session back to Redis
    await redis.set(sessionKey, JSON.stringify(updatedSession));

    return NextResponse.json({ 
      success: true,
      sessionId 
    });
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json(
      { error: 'Failed to process callback' },
      { status: 500 }
    );
  }
}
