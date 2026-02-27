import { runFunnelOffer, type FunnelOfferInput } from "@/lib/agents/executors/funnel-offer";
import { runFunnelPages, type FunnelPagesInput } from "@/lib/agents/executors/funnel-pages";
import { runFunnelEmails, type FunnelEmailsInput } from "@/lib/agents/executors/funnel-emails";

export type ExecutableAgentSlug = "funnel-offer" | "funnel-pages" | "funnel-emails";

export const EXECUTABLE_AGENT_SLUGS: ExecutableAgentSlug[] = [
  "funnel-offer",
  "funnel-pages",
  "funnel-emails",
];

export type ExecuteAgentResult =
  | { ok: true; agent_slug: ExecutableAgentSlug; model: string; output: unknown }
  | { ok: false; agent_slug: ExecutableAgentSlug; error: string };

export async function executeAgent(
  slug: ExecutableAgentSlug,
  payload: unknown
): Promise<ExecuteAgentResult> {
  try {
    if (slug === "funnel-offer") {
      const { model, output } = await runFunnelOffer((payload ?? {}) as FunnelOfferInput);
      return { ok: true, agent_slug: slug, model, output };
    }

    if (slug === "funnel-pages") {
      const { model, output } = await runFunnelPages((payload ?? {}) as FunnelPagesInput);
      return { ok: true, agent_slug: slug, model, output };
    }

    if (slug === "funnel-emails") {
      const { model, output } = await runFunnelEmails((payload ?? {}) as FunnelEmailsInput);
      return { ok: true, agent_slug: slug, model, output };
    }

    return { ok: false, agent_slug: slug, error: "unsupported_agent" };
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message : "execution_failed";
    return { ok: false, agent_slug: slug, error: msg };
  }
}
