// app/agents/page.tsx
import Link from "next/link";
import { AGENT_REGISTRY } from "@/lib/agents/registry";

export const metadata = {
  title: "Agents – Aspect Marketing Solutions",
  description: "Browse and unlock AI marketing agents.",
};

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">AI Agents</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Browse our specialist AI marketing agents. Purchase lifetime access, a subscription,
          or a usage pack from{" "}
          <a
            href="https://teesandtruma.myshopify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 underline underline-offset-4"
          >
            TeesandTruma
          </a>{" "}
          then return here to unlock them.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AGENT_REGISTRY.map((agent) => (
          <Link
            key={agent.slug}
            href={`/agents/${agent.slug}`}
            className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold leading-snug">
                {agent.name}
              </h2>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] text-zinc-600">
                View
              </span>
            </div>

            <p className="mt-2 text-sm text-zinc-600 line-clamp-3">
              {agent.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {agent.entitlementTypes.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
              <span className="truncate">{agent.slug}</span>
              <span className="group-hover:text-zinc-900">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="text-sm">
        <Link href="/" className="text-zinc-700 underline underline-offset-4">
          ← Home
        </Link>
      </div>
    </div>
  );
}
