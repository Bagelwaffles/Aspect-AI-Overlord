// app/api/ai/route.ts
// Server-side OpenRouter inference endpoint. POST /api/ai
// Never called from the browser directly — auth/rate-limit layers can be added here.

export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  openRouterChat,
  OpenRouterMessage,
} from "@/lib/openrouter";

interface AiRequestBody {
  messages?: OpenRouterMessage[];
  text?: string;
  jsonMode?: boolean;
  model?: string;
  fallbackModels?: string[];
  temperature?: number;
  maxTokens?: number;
}

export async function POST(req: NextRequest) {
  let body: AiRequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Build message array
  let messages: OpenRouterMessage[] = [];

  if (body.messages && body.messages.length > 0) {
    messages = body.messages;
  } else if (typeof body.text === "string" && body.text.trim()) {
    messages = [{ role: "user", content: body.text.trim() }];
  } else {
    return NextResponse.json(
      { ok: false, error: "Provide either 'messages' or 'text' in the request body" },
      { status: 400 }
    );
  }

  try {
    const result = await openRouterChat({
      messages,
      jsonMode: body.jsonMode,
      model: body.model,
      fallbackModels: body.fallbackModels,
      temperature: body.temperature,
      maxTokens: body.maxTokens,
    });

    return NextResponse.json({
      ok: true,
      model: result.model,
      content: result.content,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error from OpenRouter";
    console.error("[api/ai] OpenRouter call failed:", message);

    return NextResponse.json(
      { ok: false, error: message },
      { status: 502 }
    );
  }
}
