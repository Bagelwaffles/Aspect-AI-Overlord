// app/api/runs/route.ts
// GET  /api/runs        → list last 50 runs for the signed-in user
// POST /api/runs        → save a completed run
// DELETE /api/runs?id=  → delete a single run

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { neon } from '@neondatabase/serverless';

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not configured');
  return neon(url);
}

// ---------------------------------------------------------------------------
// GET – list runs
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const email = session.user.email;

  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = Math.min(parseInt(limitParam ?? '50', 10) || 50, 200);

  try {
    const sql = db();
    const rows = await sql`
      SELECT id, agent_slug, run_mode, prompt, response, via, model, created_at
      FROM agent_runs
      WHERE user_email = ${email}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return NextResponse.json({ ok: true, runs: rows });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'db_error';
    console.error('[api/runs] GET error:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST – save a run
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const email = session.user.email;

  let body: {
    agent_slug: string;
    run_mode: string;
    prompt: string;
    response: unknown;
    via: string;
    model?: string | null;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.agent_slug || !body.prompt || !body.response) {
    return NextResponse.json(
      { ok: false, error: 'Missing required fields: agent_slug, prompt, response' },
      { status: 400 }
    );
  }

  try {
    const sql = db();
    const rows = await sql`
      INSERT INTO agent_runs (user_email, agent_slug, run_mode, prompt, response, via, model)
      VALUES (
        ${email},
        ${body.agent_slug},
        ${body.run_mode ?? 'execute'},
        ${body.prompt},
        ${JSON.stringify(body.response)},
        ${body.via ?? 'local'},
        ${body.model ?? null}
      )
      RETURNING id, created_at
    `;
    return NextResponse.json({ ok: true, id: rows[0].id, created_at: rows[0].created_at });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'db_error';
    console.error('[api/runs] POST error:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// DELETE – remove a run
// ---------------------------------------------------------------------------
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const email = session.user.email;
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing id query param' }, { status: 400 });
  }

  try {
    const sql = db();
    await sql`
      DELETE FROM agent_runs
      WHERE id = ${id} AND user_email = ${email}
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'db_error';
    console.error('[api/runs] DELETE error:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
