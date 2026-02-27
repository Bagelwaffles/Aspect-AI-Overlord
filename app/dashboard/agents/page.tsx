import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AgentConsoleClient from "./ui/AgentConsoleClient";

export const dynamic = "force-dynamic";

export default async function DashboardAgentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>
            Agent Console
          </h1>
          <p style={{ opacity: 0.85, margin: 0 }}>
            Run your paid agents (Offer, Pages, Emails). Auto-routing enabled.
            Results render as cards + export.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/agents" style={{ textDecoration: "underline" }}>
            Agents Catalog
          </Link>
          <Link href="/dashboard" style={{ textDecoration: "underline" }}>
            Dashboard
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <AgentConsoleClient />
      </div>
    </main>
  );
}
