// app/api/session/[sessionId]/step/route.ts
// ASYNC VERSION: Returns immediately, triggers n8n async

import { NextRequest, NextResponse } from 'next/server';
import { redis, SESSION_TTL } from '@/app/lib/redis';

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    const { input } = await request.json();

    // Get session from Redis
    const sessionData = await redis.get(`session:${sessionId}`);
    
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    
    const session = JSON.parse(sessionData as string);

    // Update session with user input
    const updates = {
      ...session,
      userInput: input,
      status: 'processing' as const,
      updatedAt: new Date().toISOString(),
    };

    // Save to Redis with refreshed TTL
    await redis.setex(`session:${sessionId}`, SESSION_TTL, JSON.stringify(updates));

    // Trigger n8n workflow asynchronously (don't await)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userInput: input,
        }),
      }).catch(err => console.error('n8n webhook error:', err));
    }

    return NextResponse.json({ success: true, session: updates });
  } catch (error) {
    console.error('Error in step route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}