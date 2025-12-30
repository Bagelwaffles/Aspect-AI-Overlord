// app/api/session/start/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis, SESSION_TTL } from '@/app/lib/redis';

export async function POST(request: NextRequest) {
  try {
    const sessionId = nanoid();
    
    // Create session using the proper AgentSession structure
        const session = {
      id: sessionId,
      status: 'default' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Store in Redis with TTL
    await redis.setex(`session:${sessionId}`, SESSION_TTL, JSON.stringify(session));

    // Trigger n8n workflow - AWAIT to ensure it completes
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
 fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            action: 'general',
            payload: {}
          })
        });
      } catch (err) {
        console.error('Failed to trigger n8n:', err);
      }
    }
    
    return NextResponse.json({ sessionId }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
