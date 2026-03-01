/**
 * app/agents/[slug]/page.tsx
 *
 * Protected agent detail page — server component.
 * force-dynamic: always server-rendered, never statically cached.
 * Auth: getServerSession → redirect to sign-in if no session.
 * Entitlement: reads from Redis via lib/entitlements.ts.
 */
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AGENT_BY_SLUG } from "@/lib/agents/registry";
import { authOptions } from "@/lib/auth";
import { userHasEntitlement } from "@/lib/entitlements";

// Never statically cache — session + entitlements must be fresh every request
export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function AgentDetailPage({ params }: PageProps) {
  // 1. Auth guard
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/agents/${params.slug}`);
  }

  const slug = (params.slug ?? "").toLowerCase();

  // 2. Agent must exist in registry
  const agent = AGENT_BY_SLUG[slug];
  if (!agent) notFound();

  // 3. Email required for entitlement lookup
  const email = session.user?.email ?? "";
  if (!email) {
    redirect("/api/auth/signin?callbackUrl=/agents/" + slug);
  }

  // 4. Real entitlement check (Redis SISMEMBER)
  const hasAccess = await userHasEntitlement(email, slug);

  return (
    <main style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <p style={{ marginBottom: 16 }}>
        <Link href="/agents">← Back to Agents</Link>
      </p>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        {agent.name}
      </h1>
      <p style={{ color: "#666", marginBottom: 4 }}>{agent.description}</p>
      <p style={{ fontSize: 13, color: "#999", marginBottom: 24 }}>
        Available as: {agent.entitlementTypes.join(" · ")}
      </p>
      {hasAccess ? (
        <section
          style={{
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            padding: 20,
            background: "#f0fdf4",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            ✅ Access granted
          </h2>
          <p style={{ marginBottom: 12 }}>
            You have an active entitlement for <strong>{agent.name}</strong>.
          </p>
          {/* TODO: Replace with actual agent UI / iframe / chat widget */}
          <p style={{ color: "#555" }}>Agent UI coming here.</p>
        </section>
      ) : (
        <section
          style={{
            border: "1px solid #fed7aa",
            borderRadius: 12,
            padding: 20,
            background: "#fff7ed",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            🔒 Not yet unlocked
          </h2>
          <p style={{ marginBottom: 4 }}>
            A purchase is required for account:{" "}
            <strong>{email}</strong>
          </p>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
            SKU examples:{" "}
            <code>AGENT_{slug.replace(/-/g, "_").toUpperCase()}_LIFETIME</code>
            {" · "}
            <code>AGENT_{slug.replace(/-/g, "_").toUpperCase()}_SUB_MONTHLY</code>
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <a
              href="https://teesandtruma.myshopify.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Buy on TeesandTruma store →
            </a>
            <Link href="/agents">Browse all agents</Link>
          </div>
        </section>
      )}
    </main>
  );
}
