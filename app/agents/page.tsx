/**
 * /app/agents/page.tsx
 * Public listing of all available agents.
 * Individual agent pages (/app/agents/[slug]) are protected.
 */

import Link from "next/link";
import { AGENT_REGISTRY } from "@/lib/agents/registry";

export const metadata = {
  title: "Agents – Aspect Marketing Solutions",
  description: "Browse and unlock AI marketing agents.",
};

export default function AgentsPage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>AI Agents</h1>

      <p style={{ color: "#666", marginBottom: 32 }}>
        Browse our 13 specialist AI marketing agents. Purchase lifetime access, a
        subscription, or a usage pack from our{" "}
        <a
          href="https://teesandtruma.myshopify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          TeesandTruma store
        </a>
        , then return here to unlock them.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {AGENT_REGISTRY.map((agent) => (
          <Link
            key={agent.slug}
            href={`/agents/${agent.slug}`}
            style={{
              display: "block",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: 16,
              textDecoration: "none",
              color: "inherit",
              transition: "box-shadow 0.15s",
            }}
          >
            <h2 style={{ fontSize: 16, margin: "0 0 8px" }}>{agent.name}</h2>

            <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
              {agent.description}
            </p>

            <div style={{ marginTop: 12, fontSize: 12, color: "#888" }}>
              {agent.entitlementTypes.join(" · ")}
            </div>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/">← Home</Link>
      </p>
    </main>
  );
}
