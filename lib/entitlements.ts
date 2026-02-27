/**
 * lib/entitlements.ts
 *
 * Real entitlements storage using @upstash/redis (already in package.json).
 * Works with Upstash Redis (direct) or Vercel KV (same driver, different env vars).
 *
 * Redis key layout:
 *   shopify:orders:paid:processed        – Set<orderId>   (idempotency)
 *   entitlements:agents:<email>          – Set<slug>      (access grants)
 *   entitlements:usage:<email>:<slug>    – String int     (usage credits)
 *
 * Env vars needed (one of the two sets):
 *   Option A – Upstash direct:   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *   Option B – Vercel KV:        KV_REST_API_URL + KV_REST_API_TOKEN
 *   (Vercel KV auto-injects when you connect a KV store in the dashboard)
 */

import { Redis } from "@upstash/redis";

// ---------------------------------------------------------------------------
// Redis client — works for both Upstash direct and Vercel KV
// ---------------------------------------------------------------------------
function getRedis(): Redis {
    // Vercel KV injects KV_REST_API_URL / KV_REST_API_TOKEN
  const url =
        process.env.KV_REST_API_URL ??
        process.env.UPSTASH_REDIS_REST_URL ??
        "";
    const token =
          process.env.KV_REST_API_TOKEN ??
          process.env.UPSTASH_REDIS_REST_TOKEN ??
          "";
    if (!url || !token) {
          throw new Error(
                  "Redis not configured. Set KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV) " +
                    "or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash direct)."
                );
    }
    return new Redis({ url, token });
}

// Lazy singleton — avoids recreating on every request in dev
let _redis: Redis | null = null;
function redis(): Redis {
    if (!_redis) _redis = getRedis();
    return _redis;
}

// ---------------------------------------------------------------------------
// Key helpers
// ---------------------------------------------------------------------------
const KEY = {
    processedOrders: "shopify:orders:paid:processed",
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
    const added = await redis().sadd(KEY.processedOrders, id);
    // @upstash/redis returns the number of elements added
  return (added as number) >= 1;
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
        await redis().sadd(KEY.agentsSet(userEmail), parsed.slug);
        console.log("[entitlements] granted agent access", {
                email: userEmail,
                slug: parsed.slug,
                term: parsed.term,
                orderId: context?.orderId,
        });
        return { ok: true, kind: "agent_access", slug: parsed.slug, term: parsed.term };
  }

  if (parsed.kind === "agent_usage") {
        await redis().incrby(KEY.usageKey(userEmail, parsed.slug), parsed.units);
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
 * Usage-only grants do NOT imply access here — use getUsageCredits separately.
 */
export async function userHasEntitlement(
    email: string,
    slug: string
  ): Promise<boolean> {
    const userEmail = (email ?? "").trim().toLowerCase();
    const agentSlug = (slug ?? "").trim().toLowerCase();
    if (!userEmail || !agentSlug) return false;
    const isMember = await redis().sismember(KEY.agentsSet(userEmail), agentSlug);
    return (isMember as number) === 1;
}

// ---------------------------------------------------------------------------
// Usage credits helpers
// ---------------------------------------------------------------------------

export async function getUsageCredits(
    email: string,
    slug: string
  ): Promise<number> {
    const val = await redis().get<string | number>(
          KEY.usageKey(email, slug)
        );
    const n =
          typeof val === "number"
        ? val
            : parseInt(String(val ?? "0"), 10);
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
    await redis().incrby(KEY.usageKey(email, slug), -u);
    return true;
}
