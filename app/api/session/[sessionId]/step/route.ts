// app/api/session/[sessionId]/step/route.ts
// ASYNC VERSION: Returns immediately, n8n calls back with updates

import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from '@/lib/sessionStore';

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    const { input } = await request.json();

    if (!input) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Mark session as processing
    await updateSession(sessionId, {
      status: 'processing',
      lastActivity: Date.now(),
    });

    // Call n8n webhook ASYNC (fire and forget)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL not configured' },
        { status: 500 }
      );
    }

    // Construct callback URL
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const callbackUrl = `${protocol}://${host}/api/session/update`;

    // Fire and forget - n8n will call us back
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        input,
        callbackUrl,
        context: session.steps || [],
      }),
    }).catch((error) => {
      console.error('Failed to trigger n8n workflow:', error);
    });

    // Return immediately with accepted status
    return NextResponse.json(
      { 
        ok: true,
        message: 'Request accepted. Processing asynchronously.',
        sessionId 
      },
      { status: 202 } // 202 Accepted
    );
  } catch (error) {
    console.error('Error processing step:', error);
    return NextResponse.json(
      { error: 'Failed to process step' },
      { status: 500 }
    );
  }
}
