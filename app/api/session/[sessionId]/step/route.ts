// app/api/session/[sessionId]/step/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getSession, pushStep } from '@/lib/sessionStore';
import { AGENTS } from '@/lib/agents';

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

    // Determine which agent to use (simple orchestration)
    const agentId = session.steps.length === 0 ? 'research' : 'research';
    const agent = AGENTS.find((a) => a.id === agentId);

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 500 }
      );
    }

    // Call n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL not configured' },
        { status: 500 }
      );
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        agentId,
        input,
        context: session.steps,
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error('n8n webhook failed');
    }

    const { output } = await n8nResponse.json();

    const step = {
      id: nanoid(),
      agentId,
      input,
      output,
      timestamp: Date.now(),
    };

    await pushStep(sessionId, step);

    return NextResponse.json({ step }, { status: 200 });
  } catch (error) {
    console.error('Error processing step:', error);
    return NextResponse.json(
      { error: 'Failed to process step' },
      { status: 500 }
    );
  }
}
