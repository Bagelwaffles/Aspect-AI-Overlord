// app/session/[sessionId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Session, SessionStep } from '@/lib/sessionStore';

export default function SessionPage() {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  
  const [session, setSession] = useState<Session | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch session data
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
    
    fetchSession();
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
        body: JSON.stringify({ input: input.trim() }),
      });
      
      if (!res.ok) throw new Error('Failed to process step');
      
      const data = await res.json();
      setSession(prev => prev ? {
        ...prev,
        steps: [...prev.steps, data.step],
        lastActivity: Date.now()
      } : null);
      
      setInput('');
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  if (error && !session) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Live Session</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {session?.steps.length === 0 && (
            <p className="text-gray-500 italic">No messages yet. Start the conversation!</p>
          )}
          
          {session?.steps.map((step, idx) => (
            <div key={step.id} className="border-b pb-4 last:border-b-0">
              <div className="mb-2">
                <span className="font-semibold text-blue-600">You:</span>
                <p className="mt-1">{step.input}</p>
              </div>
              <div>
                <span className="font-semibold text-green-600">Agent:</span>
                <p className="mt-1">{step.output}</p>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
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
