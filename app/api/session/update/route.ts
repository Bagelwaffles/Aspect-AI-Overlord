// app/api/session/update/route.ts
// Secure callback endpoint for n8n async updates

import { NextRequest, NextResponse } from 'next/server';
import { redis, SESSION_TTL } from '@/app/lib/redis';

// Standard event types from n8n
interface CallbackEvent {
  sessionId: string;
  activeAgent?: string;
  agent: string;
  step?: string;
  output?: string;
  error?: string;
  status: 'started' | 'in_progress' | 'done' | 'error';
}

export async function POST(request: NextRequest) {
  try {
    // Security: Verify callback secret
    const callbackSecret = request.headers.get('x-ams-callback-secret');
    const expectedSecret = process.env.N8N_CALLBACK_SECRET;
    
    if (!expectedSecret || callbackSecret !== expectedSecret) {
      console.error('Unauthorized callback attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const event: CallbackEvent = await request.json();
    
    // Validate required fields
    if (!event.sessionId || !event.agent || !event.status) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, agent, status' },
        { status: 400 }
      );
    }

    // Get current session
        // Get session from Redis
    const sessionData = await redis.get(`session:${event.sessionId}`);
    if (!sessionData) {
            return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    const session = JSON.parse(sessionData);
      );
    }

    // Update session based on event type
    const updates: any = {
      lastActivity: Date.now(),
    };

    // Track active agent
    if (event.activeAgent) {
      updates.activeAgent = event.activeAgent;
    }

    // Add step event to session history
    if (event.step) {
      const stepEvent = {
        id: `evt_${Date.now()}`,
        agent: event.agent,
        message: event.step,
        status: event.status,
        timestamp: Date.now(),
      };
      updates.events = [...(session.events || []), stepEvent];
    }

    // Handle final output
    if (event.output) {
      updates.output = event.output;
      updates.status = 'completed';
    }

    // Handle error
    if (event.error) {
      updates.error = event.error;
      updates.status = 'error';
    }

    // Persist updates
        // Persist updates to Redis
    const updatedSession = { ...session, ...updates };
    await redis.setex(`session:${event.sessionId}`, SESSION_TTL, JSON.stringify(updatedSession));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing callback:', error);
    return NextResponse.json(
      { error: 'Failed to process callback' },
      { status: 500 }
    );
  }
}
