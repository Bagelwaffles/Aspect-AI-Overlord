// app/api/session/start/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { setSession } from '@/lib/sessionStore';

export async function POST(request: NextRequest) {
  try {
    const sessionId = nanoid();
    
    const session = {
      sessionId,
      steps: [],
      createdAt: Date.now(),
      lastActivity: Date.now(),
    };
    
    await setSession(session);
    
    return NextResponse.json({ sessionId }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
