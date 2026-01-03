export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { redis, SESSION_TTL } from '@/app/lib/redis';

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    const body = await request.json();
    const { input } = body;

    if (!input?.trim()) {
      return NextResponse.json(
        { error: 'Input required' },
        { status: 400 }
      );
    }

    // Get existing session
    const sessionKey = `session:${sessionId}`;
    const existingSession = await redis.get(sessionKey);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Parse session data
    const sessionData = typeof existingSession === 'string'
      ? JSON.parse(existingSession)
      : existingSession;

    // Update session to in_progress status
    const updatedSession = {
      ...sessionData,
      status: 'in_progress',
      activeAgent: 'router',
      updatedAt: new Date().toISOString(),
      events: [
        ...(sessionData.events || []),
        {
          timestamp: new Date().toISOString(),
          message: 'Started processing request',
          agent: 'router'
        }
      ]
    };

    // Save updated session with TTL refresh
    await redis.setex(
      sessionKey,
      SESSION_TTL,
      JSON.stringify(updatedSession)
    );

    // Send to n8n webhook
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      try {
        await fetch(n8nUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            action: 'general',
            input: input.trim(),
            callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.aspectmarketingsolutions.app'}/api/callback`
          })
        });
      } catch (error) {
        console.error('Failed to send to n8n:', error);
        // Don't fail the request if n8n is unavailable
      }
    }

    // Return 202 Accepted immediately
    return NextResponse.json(
      { success: true, sessionId, status: 'in_progress' },
      { status: 202 }
    );
  } catch (error) {
    console.error('Step error:', error);
    return NextResponse.json(
      { error: 'Failed to process step' },
      { status: 500 }
    );
  }
}
