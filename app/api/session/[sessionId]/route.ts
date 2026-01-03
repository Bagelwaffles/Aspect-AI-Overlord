export const runtime = "nodejs";

export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/redis';

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;

    const sessionData = await redis.get(`session:${sessionId}`);
    
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(JSON.parse(sessionData as string));
  } catch (error) {
const hasUrl = !!process.env.UPSTASH_REDIS_REST_URL;
    const hasToken = !!process.env.UPSTASH_REDIS_REST_TOKEN;
    console.error('Redis GET diagnostic:', { hasUrl, hasToken, message: error.message });
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
