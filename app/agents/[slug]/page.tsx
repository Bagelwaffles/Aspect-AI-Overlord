/**
 * /app/agents/[slug]/page.tsx
 *
 * Protected agent detail page.
 * - Requires an authenticated session (server-side).
 * - Checks entitlement stub – swap in real DB/KV lookup as needed.
 */

import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
    AGENT_BY_SLUG,
    AGENT_REGISTRY,
} from "@/lib/agents/registry";

// ---------------------------------------------------------------------------
// Entitlement stub – replace with real lookup (DB, Redis, etc.)
// ---------------------------------------------------------------------------
async function userHasEntitlement(
    _userEmail: string,
    _slug: string
  ): Promise<boolean> {
    // TODO: query your entitlement store.
  // Return true if the user holds a LIFETIME, SUB_*, or USAGE entitlement
  // for this agent (populated by the Shopify orders/paid webhook).
  return false; // stub: always returns false → "locked" state
}

// ---------------------------------------------------------------------------
// Static params (optional – enables static generation)
// ---------------------------------------------------------------------------
export function generateStaticParams() {
    return AGENT_REGISTRY.map((a) => ({ slug: a.slug }));
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
interface Props {
    params: { slug: string };
}

export default async function AgentDetailPage({ params }: Props) {
    const { slug } = params;

  // 1. Auth guard
  const session = await getServerSession(authOptions);
    if (!session) {
          redirect(`/api/auth/signin?callbackUrl=/agents/${slug}`);
    }

  // 2. Agent must exist
  const agent = AGENT_BY_SLUG[slug];
    if (!agent) notFound();

  // 3. Entitlement check
  const userEmail = session.user?.email ?? "";
    const entitled = await userHasEntitlement(userEmail, slug);

  return (
        <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
                <Link href="/agents">← All Agents</Link>Link>
        
              <h1 style={{ marginTop: 16 }}>{agent.name}</h1>h1>
              <p style={{ color: "#555" }}>{agent.description}</p>p>
        
              <div style={{ marginTop: 8, fontSize: 13, color: "#888" }}>
                      Available as: {agent.entitlementTypes.join(", ")}
              </div>div>
        
          {entitled ? (
                  <div
                              style={{
                                            marginTop: 32,
                                            padding: 16,
                                            background: "#f0fdf4",
                                            borderRadius: 8,
                                            border: "1px solid #bbf7d0",
                              }}
                            >
                            <strong>Access granted.</strong>strong>
                            <p style={{ marginTop: 8 }}>
                              {/* TODO: render the actual agent UI / iframe / chat widget here */}
                                        Agent UI for <em>{agent.name}</em>em> goes here.
                            </p>p>
                  </div>div>
                ) : (
                  <div
                              style={{
                                            marginTop: 32,
                                            padding: 16,
                                            background: "#fff7ed",
                                            borderRadius: 8,
                                            border: "1px solid #fed7aa",
                              }}
                            >
                            <strong>Not yet unlocked.</strong>strong>
                            <p style={{ marginTop: 8 }}>
                                        Purchase access from our{" "}
                                        <a
                                                        href="https://teesandtruma.myshopify.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                      >
                                                      TeesandTruma store
                                        </a>a>{" "}
                                        to use this agent.
                            </p>p>
                            <p style={{ fontSize: 13, color: "#888" }}>
                                        SKU examples:&nbsp;
                                        <code>AGENT_{slug.toUpperCase()}_LIFETIME</code>code>,&nbsp;
                                        <code>AGENT_{slug.toUpperCase()}_SUB_MONTHLY</code>code>
                            </p>p>
                  </div>div>
              )}
        </main>main>
      );
}</Link>
