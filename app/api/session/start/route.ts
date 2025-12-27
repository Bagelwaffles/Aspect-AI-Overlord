// app/api/session/start/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { createSession } from '@/lib/sessionStore';

export async function POST(request: NextRequest) {
  try {
    const sessionId = nanoid();
    
    // Create session using the proper AgentSession structure
    const session = createSession(sessionId, 'default');
    
    return NextResponse.json({ sessionId }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
