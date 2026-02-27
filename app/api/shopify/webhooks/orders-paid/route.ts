/**
 * app/api/shopify/webhooks/orders-paid/route.ts
 *
 * Shopify orders/paid webhook — idempotent, HMAC-verified.
 * Money instantly turns into access via lib/entitlements.ts (Redis).
 *
 * Required env vars:
 *   SHOPIFY_WEBHOOK_SECRET          – from Shopify Partners / Webhooks page
 *   KV_REST_API_URL                 – Vercel KV  (or UPSTASH_REDIS_REST_URL)
 *   KV_REST_API_TOKEN               – Vercel KV  (or UPSTASH_REDIS_REST_TOKEN)
 */

import crypto from "crypto";
import { NextResponse } from "next/server";
import { grantEntitlement, markOrderProcessed } from "@/lib/entitlements";

// Force Node.js runtime so crypto.timingSafeEqual is available
export const runtime = "nodejs";

function verifyShopifyHmac(
      rawBody: string,
      hmacHeader: string | null,
      secret: string
    ): boolean {
      if (!hmacHeader || !secret) return false;
      const digest = crypto
        .createHmac("sha256", secret)
        .update(rawBody, "utf8")
        .digest("base64");
      const a = Buffer.from(digest);
      const b = Buffer.from(hmacHeader);
      // timingSafeEqual requires same-length buffers
  if (a.length !== b.length) return false;
      return crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
      const secret = process.env.SHOPIFY_WEBHOOK_SECRET ?? "";
      const hmac = request.headers.get("x-shopify-hmac-sha256");

  // Must read raw body BEFORE any JSON parsing to preserve bytes for HMAC
  const rawBody = await request.text();

  if (!verifyShopifyHmac(rawBody, hmac, secret)) {
          return NextResponse.json({ ok: false, error: "invalid_hmac" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payload: any;
      try {
              payload = JSON.parse(rawBody);
      } catch {
              return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
      }

  // Shopify order payload: id (number), email (string), customer.email, line_items[]
  const orderId = String(payload?.id ?? "").trim();
      const email =
              String(payload?.email ?? "").trim() ||
              String(payload?.customer?.email ?? "").trim();

  if (!orderId) {
          return NextResponse.json({ ok: false, error: "missing_order_id" }, { status: 400 });
  }

  // Idempotency: process each Shopify order only once (atomic Redis SADD)
  const firstTime = await markOrderProcessed(orderId);
      if (!firstTime) {
              // Already processed — ACK so Shopify stops retrying
        return NextResponse.json({ ok: true, deduped: true });
      }

  if (!email) {
          // No email → can't grant entitlements, but still ACK to prevent Shopify retry loop
        console.warn("[orders-paid] no email on order — cannot grant entitlements", { orderId });
          return NextResponse.json({ ok: true, warning: "missing_email" });
  }

  const lineItems: Array<{ sku?: string }> = Array.isArray(payload?.line_items)
        ? payload.line_items
          : [];

  const agentSkus = lineItems
        .map((item) => String(item?.sku ?? "").trim())
        .filter((sku) => sku.toUpperCase().startsWith("AGENT_"));

  if (agentSkus.length === 0) {
          return NextResponse.json({ ok: true, orderId, granted: 0 });
  }

  let granted = 0;
      for (const sku of agentSkus) {
              try {
                        const result = await grantEntitlement(email, sku, { orderId });
                        if (result.ok) granted++;
              } catch (err) {
                        console.error("[orders-paid] grantEntitlement failed", { orderId, email, sku, err });
                        // Continue processing remaining SKUs — don't let one failure block the rest
              }
      }

  return NextResponse.json({ ok: true, orderId, granted });
}
