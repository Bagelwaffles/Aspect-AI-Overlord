// In-memory session store
export interface AgentSession {
  id: string;
  agentKey: string;
  status: 'active' | 'waiting' | 'completed' | 'error';
  currentStep: number;
  steps: Array<{
    stepNumber: number;
    status: 'pending' | 'running' | 'completed' | 'error';
    input?: any;
    output?: any;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const sessions = new Map<string, AgentSession>();

export function createSession(id: string, agentKey: string): AgentSession {
  const session: AgentSession = {
    id,
    agentKey,
    status: 'active',
    currentStep: 1,
    steps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  sessions.set(id, session);
  return session;
}

export function getSession(id: string): AgentSession | undefined {
  return sessions.get(id);
}

export function updateSession(id: string, updates: Partial<AgentSession>): AgentSession | undefined {
  const session = sessions.get(id);
  if (!session) return undefined;
  
  const updated = { ...session, ...updates, updatedAt: new Date() };
  sessions.set(id, updated);
  return updated;
}

export function deleteSession(id: string): boolean {
  return sessions.delete(id);
}

export function getAllSessions(): AgentSession[] {
  return Array.from(sessions.values());

// Generic setSession for API compatibility
export async function setSession(session: any): Promise<void> {
  const id = session.sessionId || session.id;
  if (!id) throw new Error('Session must have an id or sessionId');
  sessions.set(id, session as AgentSession);
}
}
