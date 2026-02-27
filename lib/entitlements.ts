/**
 * lib/entitlements.ts
 *
 * Entitlements storage using @vercel/kv (Vercel-native Redis client).
 * Requires: npm add @vercel/kv  (already in package.json ^3.0.0)
 *
 * Redis key layout:
 *   shopify:orders:paid:processed    – Set<orderId>        (idempotency)
 *   entitlements:agents:<email>      – Set<slug>           (access grants)
 *   entitlements:usage:<email>:<slug>– String int          (usage credits)
 *
 * Env vars (auto-injected by Vercel KV integration, or set manually):
 *   KV_REST_API_URL
 *   KV_REST_API_TOKEN
 */
import { kv } from "@vercel/kv";

// ---------------------------------------------------------------------------
// Key helpers
// ---------------------------------------------------------------------------
const KEY = {
  processedOrdersSet: "shopify:orders:paid:processed",
  agentsSet: (email: string) =>
    `entitlements:agents:${email.trim().toLowerCase()}`,
  usageKey: (email: string, slug: string) =>
    `entitlements:usage:${email.trim().toLowerCase()}:${slug.trim().toLowerCase()}`,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ParsedEntitlement =
  | { kind: "agent_access"; slug: string; term: "LIFETIME" | "SUB_MONTHLY" | "SUB_ANNUAL" }
  | { kind: "agent_usage"; slug: string; units: number };

// ---------------------------------------------------------------------------
// SKU parser
// ---------------------------------------------------------------------------
function normalizeSkuSlug(part: string): string {
  return part.trim().toLowerCase().replace(/_/g, "-");
}

export function parseEntitlementSku(skuRaw: string): ParsedEntitlement | null {
  const sku = (skuRaw ?? "").trim().toUpperCase();

  // AGENT_<slug>_LIFETIME | AGENT_<slug>_SUB_MONTHLY | AGENT_<slug>_SUB_ANNUAL
  const accessMatch = sku.match(
    /^AGENT_([A-Z0-9_-]+)_(LIFETIME|SUB_MONTHLY|SUB_ANNUAL)$/
  );
  if (accessMatch) {
    const slug = normalizeSkuSlug(accessMatch[1]);
    const term = accessMatch[2] as "LIFETIME" | "SUB_MONTHLY" | "SUB_ANNUAL";
    return { kind: "agent_access", slug, term };
  }

  // AGENT_USAGE_<slug>_<units>
  const usageMatch = sku.match(/^AGENT_USAGE_([A-Z0-9_-]+)_([0-9]+)$/);
  if (usageMatch) {
    const slug = normalizeSkuSlug(usageMatch[1]);
    const units = parseInt(usageMatch[2], 10);
    if (!Number.isFinite(units) || units <= 0) return null;
    return { kind: "agent_usage", slug, units };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------
/**
 * Returns true the FIRST time this orderId is seen (adds to Redis Set).
 * Returns false if already processed. Atomic via SADD.
 */
export async function markOrderProcessed(orderId: string): Promise<boolean> {
  const id = String(orderId ?? "").trim();
  if (!id) return false;
  const added = await kv.sadd(KEY.processedOrdersSet, id);
  return added === 1;
}

// ---------------------------------------------------------------------------
// Grant entitlement
// ---------------------------------------------------------------------------
export async function grantEntitlement(
  email: string,
  sku: string,
  context?: { orderId?: string }
): Promise<
  | { ok: true; kind: "agent_access"; slug: string; term: string }
  | { ok: true; kind: "agent_usage"; slug: string; units: number }
  | { ok: false; reason: "unrecognized_sku" | "missing_email" | "unknown_kind" }
> {
  const userEmail = (email ?? "").trim().toLowerCase();
  if (!userEmail) {
    return { ok: false, reason: "missing_email" };
  }

  const parsed = parseEntitlementSku(sku);
  if (!parsed) {
    console.warn("[entitlements] ignoring unrecognized SKU", { sku, email: userEmail, context });
    return { ok: false, reason: "unrecognized_sku" };
  }

  if (parsed.kind === "agent_access") {
    await kv.sadd(KEY.agentsSet(userEmail), parsed.slug);
    console.log("[entitlements] granted agent access", {
      email: userEmail,
      slug: parsed.slug,
      term: parsed.term,
      orderId: context?.orderId,
    });
    return { ok: true, kind: "agent_access", slug: parsed.slug, term: parsed.term };
  }

  if (parsed.kind === "agent_usage") {
    await kv.incrby(KEY.usageKey(userEmail, parsed.slug), parsed.units);
    console.log("[entitlements] granted usage credits", {
      email: userEmail,
      slug: parsed.slug,
      units: parsed.units,
      orderId: context?.orderId,
    });
    return { ok: true, kind: "agent_usage", slug: parsed.slug, units: parsed.units };
  }

  return { ok: false, reason: "unknown_kind" };
}

// ---------------------------------------------------------------------------
// Check entitlement (used in page gates)
// ---------------------------------------------------------------------------
/**
 * True if user has agent access (LIFETIME, SUB_MONTHLY, or SUB_ANNUAL).
 * Usage-only grants do NOT imply access here.
 */
export async function userHasEntitlement(
  email: string,
  slug: string
): Promise<boolean> {
  const userEmail = (email ?? "").trim().toLowerCase();
  const agentSlug = (slug ?? "").trim().toLowerCase();
  if (!userEmail || !agentSlug) return false;
  const has = await kv.sismember(KEY.agentsSet(userEmail), agentSlug);
  return has === 1;
}

// ---------------------------------------------------------------------------
// Usage credits helpers
// ---------------------------------------------------------------------------
export async function getUsageCredits(
  email: string,
  slug: string
): Promise<number> {
  const val = await kv.get<string | number>(KEY.usageKey(email, slug));
  const n = typeof val === "number" ? val : parseInt(String(val ?? "0"), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export async function consumeUsageCredit(
  email: string,
  slug: string,
  units = 1
): Promise<boolean> {
  const u = Math.max(1, Math.floor(Number.isFinite(units) ? units : 1));
  const current = await getUsageCredits(email, slug);
  if (current < u) return false;
  await kv.incrby(KEY.usageKey(email, slug), -u);
  return true;
}
