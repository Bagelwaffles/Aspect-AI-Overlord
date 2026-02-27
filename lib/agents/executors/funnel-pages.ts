import { openRouterChat, type OpenRouterMessage } from "@/lib/openrouter";

export type FunnelPagesInput = {
  page_type?: "landing" | "sales" | "waitlist" | "book_call";
  offer_name?: string;
  target_audience?: string;
  core_promise?: string;
  benefits?: string[];
  features?: string[];
  proof?: string[];
  faq?: string[];
  tone?: "direct" | "friendly" | "luxury" | "urgent" | "playful";
};

export type FunnelPagesOutput = {
  headline: string;
  subheadline: string;
  hero_bullets: string[];
  sections: { title: string; body: string }[];
  testimonials: { name: string; quote: string }[];
  faq: { q: string; a: string }[];
  cta: { primary: string; secondary: string };
};

function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function strArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
}

function validatePagesOutput(raw: unknown): FunnelPagesOutput {
  if (!isObj(raw)) throw new Error("Invalid output: not an object");
  const cta = isObj(raw.cta) ? raw.cta : {};

  const sections = Array.isArray(raw.sections)
    ? raw.sections
        .filter(isObj)
        .map((s) => ({ title: str(s.title), body: str(s.body) }))
        .filter((s) => s.title && s.body)
    : [];

  const testimonials = Array.isArray(raw.testimonials)
    ? raw.testimonials
        .filter(isObj)
        .map((t) => ({ name: str(t.name), quote: str(t.quote) }))
        .filter((t) => t.quote)
    : [];

  const faq = Array.isArray(raw.faq)
    ? raw.faq
        .filter(isObj)
        .map((f) => ({ q: str(f.q), a: str(f.a) }))
        .filter((f) => f.q && f.a)
    : [];

  const out: FunnelPagesOutput = {
    headline: str(raw.headline),
    subheadline: str(raw.subheadline),
    hero_bullets: strArr(raw.hero_bullets),
    sections,
    testimonials,
    faq,
    cta: { primary: str(cta.primary), secondary: str(cta.secondary) },
  };

  if (!out.headline) throw new Error("Invalid output: missing headline");
  if (out.hero_bullets.length < 3)
    throw new Error("Invalid output: need at least 3 hero_bullets");
  if (out.sections.length < 4)
    throw new Error("Invalid output: need at least 4 sections");
  if (!out.cta.primary) throw new Error("Invalid output: missing cta.primary");

  return out;
}

export async function runFunnelPages(
  input: FunnelPagesInput,
  opts?: { model?: string; temperature?: number }
): Promise<{ model: string; output: FunnelPagesOutput; raw: unknown }> {
  const system: OpenRouterMessage = {
    role: "system",
    content:
      'You are the "Funnel Pages Generator" for Aspect Marketing Solutions.\n' +
      "Return ONLY valid JSON (no markdown, no extra text) matching this exact schema:\n" +
      "{\n" +
      '  "headline": string,\n' +
      '  "subheadline": string,\n' +
      '  "hero_bullets": string[],\n' +
      '  "sections": [{"title": string, "body": string}],\n' +
      '  "testimonials": [{"name": string, "quote": string}],\n' +
      '  "faq": [{"q": string, "a": string}],\n' +
      '  "cta": { "primary": string, "secondary": string }\n' +
      "}\n" +
      "Constraints:\n" +
      "- Write conversion-focused copy.\n" +
      "- Provide at least 6 sections with clear titles.\n" +
      "- Provide at least 6 FAQ entries.\n" +
      "- Provide at least 2 testimonials (can be placeholders if none provided).\n",
  };

  const user: OpenRouterMessage = {
    role: "user",
    content:
      `Generate a ${input?.page_type ?? "landing"} page from this input JSON:\n` +
      `${JSON.stringify(input ?? {}, null, 2)}\n`,
  };

  const result = await openRouterChat({
    messages: [system, user],
    jsonMode: true,
    model: opts?.model,
    temperature: typeof opts?.temperature === "number" ? opts.temperature : 0.2,
    maxTokens: 1800,
  });

  let parsed: unknown;
  try {
    parsed = JSON.parse(result.content);
  } catch {
    throw new Error("Model returned non-JSON output for funnel-pages");
  }

  const output = validatePagesOutput(parsed);
  return { model: result.model, output, raw: parsed };
}
