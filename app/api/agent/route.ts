import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    // Get n8n webhook URL from environment variable
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Forward to n8n webhook
    const startTime = Date.now();
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      console.error('n8n webhook error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to process request' },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Log metrics (basic)
    console.log('Agent request:', {
      messageLength: message.length,
      responseTime,
      timestamp: new Date().toISOString(),
    });

    // Return normalized response
    return NextResponse.json({
      reply: data.reply || data.response || data.output || 'Response received',
      agent: data.agent || 'AI Agent',
      success: true,
    });
    
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
