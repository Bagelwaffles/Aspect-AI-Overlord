// app/api/agents/route.ts
// Authenticated agent router endpoint. POST /api/agents
// Auth gate → route via LLM → entitlement check → execute or proxy to n8n.

export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { routeToAgent, ALLOWED_SLUGS } from "@/lib/ai/agentRouter";
import { userHasEntitlement } from "@/lib/entitlements";
import { OpenRouterMessage } from "@/lib/openrouter";

// ---------------------------------------------------------------------------
// Agents that are always free (no entitlement check required)
// ---------------------------------------------------------------------------
const FREE_SLUGS = new Set(["router", "onboarding"]);

// ---------------------------------------------------------------------------
// Request body
// ---------------------------------------------------------------------------
interface AgentsRequestBody {
  text?: string;
  messages?: OpenRouterMessage[];
  forceAgentSlug?: string;
  runMode?: "route_only" | "execute";
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  // 1. Auth gate
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const email = session.user.email;

  // 2. Parse body
  let body: AgentsRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const runMode = body.runMode ?? "execute";

  // 3. Determine agent slug — either forced or via LLM routing
  let agentSlug: string;
  let routeResult: Awaited<ReturnType<typeof routeToAgent>> | null = null;

  if (
    typeof body.forceAgentSlug === "string" &&
    ALLOWED_SLUGS.includes(body.forceAgentSlug)
  ) {
    // Caller bypasses LLM router and picks the agent directly
    agentSlug = body.forceAgentSlug;
  } else {
    // Route via LLM
    if (!body.text && (!body.messages || body.messages.length === 0)) {
      return NextResponse.json(
        { ok: false, error: "Provide 'text', 'messages', or 'forceAgentSlug'" },
        { status: 400 }
      );
    }

    routeResult = await routeToAgent({
      text: body.text,
      messages: body.messages,
    });

    // 4. Low-confidence / clarification needed → return early
    if (routeResult.needs_clarification || routeResult.confidence < 0.75) {
      return NextResponse.json({
        ok: false,
        action: "needs_clarification",
        agent_slug: routeResult.agent_slug,
        confidence: routeResult.confidence,
        intent_summary: routeResult.intent_summary,
        clarifying_questions: routeResult.clarifying_questions,
      });
    }

    agentSlug = routeResult.agent_slug;
  }

  // 5. If route_only mode, return the routing decision without executing
  if (runMode === "route_only") {
    return NextResponse.json({
      ok: true,
      action: "routed",
      agent_slug: agentSlug,
      confidence: routeResult?.confidence ?? 1,
      intent_summary: routeResult?.intent_summary ?? "Forced route",
      payload: routeResult?.payload ?? {},
    });
  }

  // 6. Entitlement check (skip for free slugs)
  if (!FREE_SLUGS.has(agentSlug) && agentSlug !== "n8n") {
    const entitled = await userHasEntitlement(email, agentSlug);
    if (!entitled) {
      return NextResponse.json(
        {
          ok: false,
          error: "not_entitled",
          agent_slug: agentSlug,
          message: `You do not have access to the ${agentSlug} agent. Please upgrade your plan.`,
        },
        { status: 403 }
      );
    }
  }

  // 7a. n8n route — proxy to canonical public webhook endpoint
  if (agentSlug === "n8n") {
    const n8nUrl = process.env.N8N_TOOLS_INVOKE_URL;
    const n8nKey = process.env.N8N_MCP_KEY;

    if (!n8nUrl) {
      return NextResponse.json(
        { ok: false, error: "N8N_TOOLS_INVOKE_URL is not configured" },
        { status: 502 }
      );
    }

    const payload = routeResult?.payload ?? {};
    const userText = body.text ?? "";

    try {
      const n8nRes = await fetch(n8nUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(n8nKey ? { "x-mcp-key": n8nKey } : {}),
        },
        body: JSON.stringify({
          text: userText,
          payload,
          user: { email },
          source: "overlord",
        }),
      });

      const n8nData = await n8nRes.json().catch(() => ({ raw: true }));

      if (!n8nRes.ok) {
        return NextResponse.json(
          { ok: false, error: "n8n gateway returned an error", detail: n8nData },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        via: "n8n",
        agent_slug: "n8n",
        payload,
        result: n8nData,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown n8n error";
      console.error("[api/agents] n8n fetch failed:", message);
      return NextResponse.json(
        { ok: false, error: message },
        { status: 502 }
      );
    }
  }

  // 7b. Local agent execution (stub — replace with real agent calls)
  return NextResponse.json({
    ok: true,
    via: "local",
    agent_slug: agentSlug,
    payload: routeResult?.payload ?? {},
    message: "Execution stub — wire real agent logic here",
  });
}
