// lib/openrouter.ts
// Server-only OpenRouter chat client. Never import this from browser code.

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterOptions {
  messages: OpenRouterMessage[];
  jsonMode?: boolean;
  model?: string;
  fallbackModels?: string[];
  temperature?: number;
  maxTokens?: number;
}

export interface OpenRouterResult {
  model: string;
  content: string;
  raw: unknown;
}

function getEnvList(key: string): string[] {
  const val = process.env[key];
  if (!val) return [];
  return val
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function callModel(
  model: string,
  messages: OpenRouterMessage[],
  options: {
    jsonMode?: boolean;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<OpenRouterResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const siteUrl = process.env.OPENROUTER_SITE_URL;
  if (siteUrl) headers["HTTP-Referer"] = siteUrl;

  const appName = process.env.OPENROUTER_APP_NAME;
  if (appName) headers["X-Title"] = appName;

  const body: Record<string, unknown> = {
    model,
    messages,
  };

  if (options.temperature !== undefined) body.temperature = options.temperature;
  if (options.maxTokens !== undefined) body.max_tokens = options.maxTokens;
  if (options.jsonMode) body.response_format = { type: "json_object" };

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    throw new Error(
      `OpenRouter error (${res.status}) for model "${model}": ${errorText}`
    );
  }

  const data = await res.json();
  const content: string =
    data?.choices?.[0]?.message?.content ?? "";

  return { model, content, raw: data };
}

/**
 * Calls OpenRouter with automatic model fallback.
 * Model priority:
 *   1. options.model (caller override)
 *   2. OPENROUTER_MODEL env var
 *   3. "openai/gpt-4o-mini" (hard default)
 *
 * Fallback list: options.fallbackModels ?? OPENROUTER_FALLBACK_MODELS env var (comma-separated)
 */
export async function openRouterChat(
  options: OpenRouterOptions
): Promise<OpenRouterResult> {
  const primaryModel =
    options.model ??
    process.env.OPENROUTER_MODEL ??
    "openai/gpt-4o-mini";

  const fallbacks =
    options.fallbackModels?.length
      ? options.fallbackModels
      : getEnvList("OPENROUTER_FALLBACK_MODELS");

  const modelQueue = [primaryModel, ...fallbacks];

  let lastError: Error | null = null;

  for (const model of modelQueue) {
    try {
      return await callModel(model, options.messages, {
        jsonMode: options.jsonMode,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
      });
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(
        `[openrouter] Model "${model}" failed: ${lastError.message}`
      );
    }
  }

  throw lastError ?? new Error("All OpenRouter models failed");
}
