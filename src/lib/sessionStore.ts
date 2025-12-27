// src/lib/sessionStore.ts
// Abstract session storage with KV fallback

import { kv } from '@vercel/kv';

export interface SessionStep {
  id: string;
  agentId: string;
  input: string;
  output: string;
  timestamp: number;
}

export interface SessionEvent {
  id: string;
  agent: string;
  message: string;
  status: 'started' | 'in_progress' | 'done' | 'error';
  timestamp: number;
}

export interface Session {
  sessionId: string;
  steps: SessionStep[];
  events?: SessionEvent[]; // Live step events from n8n
  activeAgent?: string; // Current agent processing
  output?: string; // Final output from n8n
  status?: 'idle' | 'processing' | 'completed' | 'error';
  error?: string; // Error message if failed
  createdAt: number;
  lastActivity: number;
}

const SESSION_TTL = 60 * 60 * 24; // 24 hours

export async function getSession(sessionId: string): Promise<Session | null> {
  try {
    const session = await kv.get<Session>(`session:${sessionId}`);
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function setSession(session: Session): Promise<void> {
  try {
    await kv.set(`session:${session.sessionId}`, session, { ex: SESSION_TTL });
  } catch (error) {
    console.error('Error setting session:', error);
    throw error;
  }
}

export async function updateSession(
  sessionId: string,
  updates: Partial<Session>
): Promise<void> {
  try {
    const session = await getSession(sessionId);
    if (!session) throw new Error('Session not found');
    
    const updated = { ...session, ...updates, lastActivity: Date.now() };
    await setSession(updated);
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
}

export async function pushStep(
  sessionId: string,
  step: SessionStep
): Promise<void> {
  try {
    const session = await getSession(sessionId);
    if (!session) throw new Error('Session not found');
    
    session.steps.push(step);
    session.lastActivity = Date.now();
    await setSession(session);
  } catch (error) {
    console.error('Error pushing step:', error);
    throw error;
  }
}
