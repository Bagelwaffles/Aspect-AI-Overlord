import { openRouterChat, type OpenRouterMessage } from "@/lib/openrouter";

export type FunnelOfferInput = {
  business?: string;
  target_audience?: string;
  product_type?: string;
  price_point?: string;
  primary_goal?: "lead_gen" | "purchase" | "book_call";
  constraints?: string[];
  tone?: "direct" | "friendly" | "luxury" | "urgent" | "playful";
  proof_assets?: string[];
  competitors?: string[];
};

export type FunnelOfferOutput = {
  offer_name: string;
  positioning: {
    one_liner: string;
    who_its_for: string;
    core_promise: string;
    unique_mechanism: string;
  };
  pricing: {
    recommended: string;
    alternatives: string[];
    guarantee: string;
  };
  hooks: string[];
  objections_and_answers: { objection: string; answer: string }[];
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

function validateOfferOutput(raw: unknown): FunnelOfferOutput {
  if (!isObj(raw)) throw new Error("Invalid output: not an object");

  const positioning = isObj(raw.positioning) ? raw.positioning : {};
  const pricing = isObj(raw.pricing) ? raw.pricing : {};
  const cta = isObj(raw.cta) ? raw.cta : {};

  const objections = Array.isArray(raw.objections_and_answers)
    ? raw.objections_and_answers
        .filter(isObj)
        .map((x) => ({ objection: str(x.objection), answer: str(x.answer) }))
        .filter((x) => x.objection && x.answer)
    : [];

  const out: FunnelOfferOutput = {
    offer_name: str(raw.offer_name, "Untitled Offer"),
    positioning: {
      one_liner: str(positioning.one_liner),
      who_its_for: str(positioning.who_its_for),
      core_promise: str(positioning.core_promise),
      unique_mechanism: str(positioning.unique_mechanism),
    },
    pricing: {
      recommended: str(pricing.recommended),
      alternatives: strArr(pricing.alternatives),
      guarantee: str(pricing.guarantee),
    },
    hooks: strArr(raw.hooks),
    objections_and_answers: objections,
    cta: {
      primary: str(cta.primary),
      secondary: str(cta.secondary),
    },
  };

  if (!out.positioning.one_liner)
    throw new Error("Invalid output: missing positioning.one_liner");
  if (!out.positioning.core_promise)
    throw new Error("Invalid output: missing positioning.core_promise");
  if (!out.pricing.recommended)
    throw new Error("Invalid output: missing pricing.recommended");
  if (!out.cta.primary)
    throw new Error("Invalid output: missing cta.primary");

  return out;
}

export async function runFunnelOffer(
  input: FunnelOfferInput,
  opts?: { model?: string; temperature?: number }
): Promise<{ model: string; output: FunnelOfferOutput; raw: unknown }> {
  const system: OpenRouterMessage = {
    role: "system",
    content:
      'You are the "Funnel Offer Generator" for Aspect Marketing Solutions.\n' +
      "Return ONLY valid JSON (no markdown, no extra text) matching this exact schema:\n" +
      "{\n" +
      '  "offer_name": string,\n' +
      '  "positioning": {\n' +
      '    "one_liner": string,\n' +
      '    "who_its_for": string,\n' +
      '    "core_promise": string,\n' +
      '    "unique_mechanism": string\n' +
      "  },\n" +
      '  "pricing": {\n' +
      '    "recommended": string,\n' +
      '    "alternatives": string[],\n' +
      '    "guarantee": string\n' +
      "  },\n" +
      '  "hooks": string[],\n' +
      '  "objections_and_answers": [{"objection": string, "answer": string}],\n' +
      '  "cta": { "primary": string, "secondary": string }\n' +
      "}\n" +
      "Constraints:\n" +
      "- Be specific and conversion-focused.\n" +
      "- Pricing should be realistic for the audience.\n" +
      "- Include at least 7 hooks.\n" +
      "- Include at least 5 objections with strong answers.\n",
  };

  const user: OpenRouterMessage = {
    role: "user",
    content:
      "Build a high-converting offer from this input JSON:\n" +
      `${JSON.stringify(input ?? {}, null, 2)}\n`,
  };

  const result = await openRouterChat({
    messages: [system, user],
    jsonMode: true,
    model: opts?.model,
    temperature: typeof opts?.temperature === "number" ? opts.temperature : 0.2,
    maxTokens: 1400,
  });

  let parsed: unknown;
  try {
    parsed = JSON.parse(result.content);
  } catch {
    throw new Error("Model returned non-JSON output for funnel-offer");
  }

  const output = validateOfferOutput(parsed);
  return { model: result.model, output, raw: parsed };
}
