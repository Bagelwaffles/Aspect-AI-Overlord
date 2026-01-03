'use client'

import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'

export default function Home() {
  const router = useRouter()

  const handleStartSession = async () => {
    try {
      const response = await fetch('/api/session/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      
      if (!response.ok) {
        throw new Error('Failed to create session')
      }
      
      const { sessionId } = await response.json()
      router.push(`/session/${sessionId}`)
    } catch (error) {
      console.error('Error starting session:', error)
    }
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aspect Marketing Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI Agent Platform
          </p>
          <button
            onClick={handleStartSession}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start New Session
          </button>
        </div>
      </div>
    </div>
  )
}
