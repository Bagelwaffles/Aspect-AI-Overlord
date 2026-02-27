/**
 * /app/api/shopify/webhooks/orders-paid/route.ts
 *
 * Shopify "orders/paid" webhook handler (server-only).
 *
 * Required env vars (see .env.example):
 *   SHOPIFY_WEBHOOK_SECRET   – used to verify HMAC-SHA256 signature
 *
 * SKU convention for agent entitlements:
 *   AGENT_<slug>_LIFETIME        – one-time lifetime purchase
 *   AGENT_<slug>_SUB_MONTHLY    – monthly subscription
 *   AGENT_<slug>_SUB_ANNUAL     – annual subscription
 *   AGENT_USAGE_<slug>_<units>  – usage-based add-on
 */

import { createHmac, timingSafeEqual } from "crypto";

/** Stub: replace with your real entitlement store (DB, Redis, etc.) */
async function grantEntitlement(
    customerId: string,
    sku: string
  ): Promise<void> {
    console.log(`[entitlement] grant customer=${customerId} sku=${sku}`);
    // TODO: persist to DB / KV store
}

function verifyShopifyHmac(rawBody: string, hmacHeader: string): boolean {
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
    if (!secret) {
          console.error("[shopify-webhook] SHOPIFY_WEBHOOK_SECRET is not set");
          return false;
    }
    const digest = createHmac("sha256", secret)
      .update(rawBody, "utf8")
      .digest("base64");
    try {
          return timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
    } catch {
          return false;
    }
}

export async function POST(request: Request): Promise<Response> {
    const hmacHeader = request.headers.get("x-shopify-hmac-sha256") ?? "";
    const rawBody = await request.text();

  if (!verifyShopifyHmac(rawBody, hmacHeader)) {
        return new Response("Unauthorized", { status: 401 });
  }

  let order: Record<string, unknown>;
    try {
          order = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
          return new Response("Bad Request", { status: 400 });
    }

  const customerId = String(order.customer_id ?? order.id ?? "unknown");
    const lineItems = Array.isArray(order.line_items) ? order.line_items : [];

  for (const item of lineItems as Array<Record<string, unknown>>) {
        const sku = String(item.sku ?? "");
        if (!sku.startsWith("AGENT_")) continue;

      await grantEntitlement(customerId, sku);
  }

  return new Response("OK", { status: 200 });
}
