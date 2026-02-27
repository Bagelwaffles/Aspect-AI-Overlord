import { openRouterChat, type OpenRouterMessage } from "@/lib/openrouter";

export type FunnelEmailsInput = {
  sequence_type?: "welcome" | "abandoned_cart" | "post_purchase" | "nurture" | "launch";
  offer_name?: string;
  target_audience?: string;
  tone?: "direct" | "friendly" | "luxury" | "urgent" | "playful";
  num_emails?: number;
  primary_goal?: "lead_gen" | "purchase" | "book_call";
  objections?: string[];
};

export type FunnelEmailsOutput = {
  sequence_name: string;
  emails: {
    email_number: number;
    subject: string;
    preview: string;
    body: string;
    cta: string;
  }[];
};

function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function validateEmailsOutput(raw: unknown, expectedCount: number): FunnelEmailsOutput {
  if (!isObj(raw)) throw new Error("Invalid output: not an object");
  const emails = Array.isArray(raw.emails)
    ? raw.emails
        .filter(isObj)
        .map((e) => ({
          email_number: Number.isFinite(e.email_number) ? Number(e.email_number) : 0,
          subject: str(e.subject),
          preview: str(e.preview),
          body: str(e.body),
          cta: str(e.cta),
        }))
        .filter((e) => e.subject && e.body && e.cta)
    : [];

  const out: FunnelEmailsOutput = {
    sequence_name: str(raw.sequence_name, "Email Sequence"),
    emails,
  };

  if (out.emails.length < Math.min(3, expectedCount)) {
    throw new Error("Invalid output: too few emails generated");
  }

  // Normalize numbering if missing
  out.emails = out.emails.map((e, idx) => ({
    ...e,
    email_number: e.email_number || idx + 1,
  }));

  return out;
}

export async function runFunnelEmails(
  input: FunnelEmailsInput,
  opts?: { model?: string; temperature?: number }
): Promise<{ model: string; output: FunnelEmailsOutput; raw: unknown }> {
  const count = Number.isFinite(input?.num_emails)
    ? Math.max(1, Math.min(12, Number(input!.num_emails)))
    : 5;

  const system: OpenRouterMessage = {
    role: "system",
    content:
      'You are the "Funnel Emails Generator" for Aspect Marketing Solutions.\n' +
      "Return ONLY valid JSON (no markdown, no extra text) matching this exact schema:\n" +
      "{\n" +
      '  "sequence_name": string,\n' +
      '  "emails": [\n' +
      "    {\n" +
      '      "email_number": number,\n' +
      '      "subject": string,\n' +
      '      "preview": string,\n' +
      '      "body": string,\n' +
      '      "cta": string\n' +
      "    }\n" +
      "  ]\n" +
      "}\n" +
      "Constraints:\n" +
      "- Write in the requested tone.\n" +
      `- Output exactly ${count} emails.\n` +
      "- Each body should be ready to send.\n" +
      "- Make CTAs explicit.\n",
  };

  const user: OpenRouterMessage = {
    role: "user",
    content:
      `Create a ${input?.sequence_type ?? "welcome"} email sequence using this input JSON:\n` +
      `${JSON.stringify({ ...(input ?? {}), num_emails: count }, null, 2)}\n`,
  };

  const result = await openRouterChat({
    messages: [system, user],
    jsonMode: true,
    model: opts?.model,
    temperature: typeof opts?.temperature === "number" ? opts.temperature : 0.25,
    maxTokens: 2200,
  });

  let parsed: unknown;
  try {
    parsed = JSON.parse(result.content);
  } catch {
    throw new Error("Model returned non-JSON output for funnel-emails");
  }

  const output = validateEmailsOutput(parsed, count);
  return { model: result.model, output, raw: parsed };
}
