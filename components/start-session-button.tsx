// components/start-session-button.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function StartSessionButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartSession = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/session/start', {
        method: 'POST',
      });
      
      if (!res.ok) throw new Error('Failed to create session');
      
      const data = await res.json();
      router.push(`/session/${data.sessionId}`);
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Failed to start session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleStartSession} 
      disabled={loading}
      size="lg"
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
    >
      {loading ? 'Starting...' : 'Start Live Session'}
    </Button>
  );
}
