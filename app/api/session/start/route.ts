// app/api/session/start/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { createSession } from '@/lib/sessionStore';

export async function POST(request: NextRequest) {
  try {
    const sessionId = nanoid();
    
    // Create session using the proper AgentSession structure
    const session = createSession(sessionId, 'default');

    // Trigger n8n workflow asynchronously
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          action: 'general',
          payload: {}
        })
      }).catch(err => console.error('Failed to trigger n8n:', err));
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
