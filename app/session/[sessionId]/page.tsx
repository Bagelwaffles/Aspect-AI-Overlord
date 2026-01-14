// app/session/[sessionId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Session, SessionEvent } from '@/lib/sessionStore';
import { AGENTS } from '@/lib/agents';

export default function SessionPage() {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  
  const [session, setSession] = useState<Session | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const [selectedAgent, setSelectedAgent] = useState<string>('');

  // Poll for session updates every 2 seconds
  useEffect(() => {
    if (!sessionId) return;
    
    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/session/${sessionId}`);
        if (!res.ok) throw new Error('Session not found');
        const data = await res.json();
        setSession(data.session);
      } catch (err) {
        setError('Failed to load session');
      }
    };
    
    fetchSession(); // Initial fetch
    const interval = setInterval(fetchSession, 2000); // Poll every 2s
    
    return () => clearInterval(interval);
  }, [sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/session/${sessionId}/step`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim(), agentId: selectedAgent }),      });
      
      if (!res.ok) throw new Error('Failed to process step');
      
      setInput('');
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const getAgentName = (agentId: string) => {
    const agent = AGENTS.find(a => a.id === agentId);
    return agent?.name || agentId;
  };

  if (error && !session) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  const isProcessing = session?.status === 'processing';
  const hasOutput = session?.output;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Live Session</h1>
          {session?.activeAgent && (
            <p className="text-sm text-gray-600 mt-1">
              Active Agent: <span className="font-semibold">{getAgentName(session.activeAgent)}</span>
            </p>
          )}
          {isProcessing && (
            <div className="mt-2 flex items-center gap-2 text-blue-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              Processing...
            </div>
          )}
        </div>
        
        {/* Live Events Feed */}
        {session?.events && session.events.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="font-semibold mb-3">Live Updates</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {session.events.map((event) => (
                <div key={event.id} className="flex items-start gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                    event.status === 'done' ? 'bg-green-500' :
                    event.status === 'error' ? 'bg-red-500' :
                    'bg-blue-500 animate-pulse'
                  }`} />
                  <div>
                    <span className="font-medium text-gray-700">{getAgentName(event.agent)}:</span>
                    <span className="ml-1 text-gray-600">{event.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Final Output */}
        {hasOutput && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg shadow-md p-6 mb-4">
            <h2 className="font-bold text-lg mb-3 text-green-800">Response</h2>
            <div className="text-gray-800 whitespace-pre-wrap">
              {session.output}
            </div>
          </div>
        )}
        
        {/* Error Display */}
        {session?.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-semibold">Error:</p>
            <p className="text-red-700">{session.error}</p>
          </div>
        )}
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex gap-2">
                    <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an agent...</option>
          {AGENTS.map(agent => (
            <option key={agent.id} value={agent.id}>{agent.name}</option>
          ))}
        </select>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading || isProcessing}
            />
            <button
              type="submit"
              disabled={loading || isProcessing || !input.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
