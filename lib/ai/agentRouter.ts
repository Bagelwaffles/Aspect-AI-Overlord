// lib/ai/agentRouter.ts
// Server-only. Routes user intent to one of the 13 registered agents (or n8n).
// Uses OpenRouter in jsonMode so the response is always parseable JSON.

import { openRouterChat, OpenRouterMessage } from "@/lib/openrouter";
import { AGENT_REGISTRY } from "@/lib/agents/registry";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RouterInput {
  text?: string;
  messages?: OpenRouterMessage[];
}

export interface RouterOutput {
  agent_slug: string;
  confidence: number;
  intent_summary: string;
  payload: Record<string, unknown>;
  needs_clarification: boolean;
  clarifying_questions: string[];
}

// ---------------------------------------------------------------------------
// Allowed slugs (derived from registry + special n8n route)
// ---------------------------------------------------------------------------

export const ALLOWED_SLUGS: string[] = [
  ...AGENT_REGISTRY.map((a) => a.slug),
  "n8n",
];

// ---------------------------------------------------------------------------
// Router system prompt
// ---------------------------------------------------------------------------

function buildSystemPrompt(allowedSlugs: string[]): string {
  return `You are the routing brain for a SaaS called Aspect Marketing Solutions.
Your job is to choose exactly one destination agent for each user request.

You MUST output ONLY valid JSON (no markdown, no extra text) that matches this schema:

{
  "agent_slug": string,
  "confidence": number,
  "intent_summary": string,
  "payload": object,
  "needs_clarification": boolean,
  "clarifying_questions": string[]
}

Rules:
- agent_slug MUST be exactly one of the allowed slugs provided.
- confidence MUST be between 0 and 1.
- If you are missing required inputs OR the request is ambiguous, set needs_clarification=true, set confidence < 0.75, and ask 1-3 clarifying_questions.
- intent_summary must be a single short sentence.
- payload must contain any structured fields that will help execution (e.g. store, product_title, offer_type, platform, video_url, audience, goals, constraints).

Routing guidance:
- Use "content-plan" for content calendars/ideas/planning.
- Use "funnel-offer" for offers, pricing, positioning, hooks.
- Use "funnel-pages" for landing/sales page copy.
- Use "funnel-emails" for email sequences.
- Use "shopify-store-builder" for Shopify store setup/build tasks.
- Use "shopify-seo-optimizer" for Shopify SEO tasks.
- Use "store-product" for product creation tasks.
- Use "analytics" for analytics/reporting tasks.
- Use affiliate-* agents for affiliate program tasks.
- Use "onboarding" for onboarding/how-to questions about the product.
- Use "router" ONLY if the user is asking what to do or which agent to use.
- Use "n8n" ONLY when the request requires external automation/tools (uploads, scheduled jobs, multi-step workflows, YouTube upload pipeline, content_engine/video_factory).

Allowed agent slugs (you MUST pick exactly one):
${allowedSlugs.join(", ")}`;
}

// ---------------------------------------------------------------------------
// Output validator / sanitiser
// ---------------------------------------------------------------------------

function validateRouterOutput(raw: unknown): RouterOutput {
  const fallback: RouterOutput = {
    agent_slug: "router",
    confidence: 0,
    intent_summary: "Could not determine intent",
    payload: {},
    needs_clarification: true,
    clarifying_questions: ["Could you describe what you'd like help with?"],
  };

  if (!raw || typeof raw !== "object") return fallback;
  const r = raw as Record<string, unknown>;

  const slug =
    typeof r.agent_slug === "string" && ALLOWED_SLUGS.includes(r.agent_slug)
      ? r.agent_slug
      : fallback.agent_slug;

  const rawConf = typeof r.confidence === "number" ? r.confidence : NaN;
  const confidence = Number.isFinite(rawConf)
    ? Math.min(1, Math.max(0, rawConf))
    : 0;

  const intent_summary =
    typeof r.intent_summary === "string" && r.intent_summary.trim()
      ? r.intent_summary.trim()
      : fallback.intent_summary;

  const payload =
    r.payload && typeof r.payload === "object" && !Array.isArray(r.payload)
      ? (r.payload as Record<string, unknown>)
      : {};

  const needs_clarification =
    typeof r.needs_clarification === "boolean"
      ? r.needs_clarification
      : confidence < 0.75;

  const clarifying_questions = Array.isArray(r.clarifying_questions)
    ? (r.clarifying_questions as unknown[])
        .filter((q) => typeof q === "string")
        .slice(0, 3)
    : [];

  return {
    agent_slug: slug,
    confidence,
    intent_summary,
    payload,
    needs_clarification,
    clarifying_questions,
  };
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function routeToAgent(input: RouterInput): Promise<RouterOutput> {
  const systemPrompt = buildSystemPrompt(ALLOWED_SLUGS);

  // Build the message array
  let messages: OpenRouterMessage[];

  if (input.messages && input.messages.length > 0) {
    // Prepend system prompt if caller supplied messages
    const hasSystem = input.messages[0]?.role === "system";
    messages = hasSystem
      ? input.messages
      : [{ role: "system", content: systemPrompt }, ...input.messages];
  } else if (typeof input.text === "string" && input.text.trim()) {
    messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: input.text.trim() },
    ];
  } else {
    // Nothing to route
    return {
      agent_slug: "router",
      confidence: 0,
      intent_summary: "No input provided",
      payload: {},
      needs_clarification: true,
      clarifying_questions: ["What would you like help with today?"],
    };
  }

  try {
    const result = await openRouterChat({ messages, jsonMode: true });

    let parsed: unknown;
    try {
      parsed = JSON.parse(result.content);
    } catch {
      console.error("[agentRouter] Failed to parse OpenRouter JSON response", result.content);
      parsed = null;
    }

    return validateRouterOutput(parsed);
  } catch (err) {
    console.error("[agentRouter] OpenRouter call failed:", err);
    return {
      agent_slug: "router",
      confidence: 0,
      intent_summary: "Routing failed due to an upstream error",
      payload: {},
      needs_clarification: true,
      clarifying_questions: ["What would you like help with?"],
    };
  }
}
