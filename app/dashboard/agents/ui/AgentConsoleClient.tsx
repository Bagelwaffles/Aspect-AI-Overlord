"use client";

import React, { useMemo, useState } from "react";

type RunMode = "route_only" | "execute";
type AgentChoice =
  | "auto"
  | "funnel-offer"
  | "funnel-pages"
  | "funnel-emails"
  | "n8n";

type ApiOk = {
  ok: true;
  via: "local" | "n8n";
  agent_slug: string;
  confidence?: number;
  intent_summary?: string;
  model?: string;
  output?: unknown;
  result?: unknown;
  payload?: unknown;
  message?: string;
};

type ApiNeedClarification = {
  ok: false;
  action: "needs_clarification";
  confidence: number;
  clarifying_questions: string[];
  intent_summary?: string;
  agent_slug?: string;
  payload?: unknown;
};

type ApiError = {
  ok: false;
  error: string;
  agent_slug?: string;
  detail?: string;
};

type ApiResponse = ApiOk | ApiNeedClarification | ApiError;

function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost";
  }
) {
  const { variant = "primary", style, ...rest } = props;
  const base: React.CSSProperties = {
    borderRadius: 10,
    padding: "10px 12px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontWeight: 600,
  };
  const v: React.CSSProperties =
    variant === "primary"
      ? { background: "#111", color: "#fff", borderColor: "#111" }
      : { background: "#fff", color: "#111" };

  return <button {...rest} style={{ ...base, ...v, ...style }} />;
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 14,
        padding: 16,
        background: "#fff",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }}>
        {title}
      </div>
      {children}
    </section>
  );
}

function CopyButton({
  getText,
  label = "Copy",
}: {
  getText: () => string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      variant="ghost"
      onClick={async () => {
        await navigator.clipboard.writeText(getText());
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      style={{ fontSize: 13, padding: "8px 10px" }}
      type="button"
    >
      {copied ? "Copied ✓" : label}
    </Button>
  );
}

function toMarkdown(resp: ApiResponse): string {
  if (!resp) return "";
  if (resp.ok === false) {
    if ((resp as ApiNeedClarification).action === "needs_clarification") {
      const r = resp as ApiNeedClarification;
      return (
        `# Needs clarification\n\nConfidence: ${r.confidence}\n\n## Questions\n` +
        r.clarifying_questions.map((q) => `- ${q}`).join("\n") +
        "\n"
      );
    }
    const r = resp as ApiError;
    return (
      `# Error\n\n${r.error}\n` +
      (r.detail ? `\n\nDetails:\n${r.detail}` : "")
    );
  }
  const r = resp as ApiOk;
  const header =
    `# Result\n\n- via: ${r.via}\n- agent: ${r.agent_slug}\n` +
    `- confidence: ${typeof r.confidence === "number" ? r.confidence : "n/a"}\n` +
    `- model: ${r.model || "n/a"}\n\n`;
  const body = r.output
    ? `## Output\n\n\`\`\`json\n${JSON.stringify(r.output, null, 2)}\n\`\`\`\n`
    : "";
  const n8n =
    r.via === "n8n"
      ? `## n8n\n\n\`\`\`json\n${JSON.stringify(r.result ?? r, null, 2)}\n\`\`\`\n`
      : "";
  return header + body + n8n;
}

export default function AgentConsoleClient() {
  const [agent, setAgent] = useState<AgentChoice>("auto");
  const [runMode, setRunMode] = useState<RunMode>("execute");
  const [text, setText] = useState(
    "Create an irresistible offer for a Shopify SEO service for small stores, $79/mo, goal: purchase."
  );
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<ApiResponse | null>(null);

  const effectiveForce = useMemo(() => {
    if (agent === "auto") return null;
    return agent;
  }, [agent]);

  async function run() {
    setLoading(true);
    setResp(null);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          runMode,
          ...(effectiveForce ? { forceAgentSlug: effectiveForce } : {}),
        }),
      });
      const json = (await res.json()) as ApiResponse;
      setResp(json);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "request_failed";
      setResp({ ok: false, error: msg });
    } finally {
      setLoading(false);
    }
  }

  const topMeta = useMemo(() => {
    if (!resp) return null;
    if (resp.ok === false) {
      if ((resp as ApiNeedClarification).action === "needs_clarification") {
        const r = resp as ApiNeedClarification;
        return {
          badge: "Needs clarification",
          subtitle: `Confidence ${r.confidence}`,
        };
      }
      const r = resp as ApiError;
      return { badge: "Error", subtitle: r.error };
    }
    const r = resp as ApiOk;
    return {
      badge: `OK via ${r.via}`,
      subtitle: `${r.agent_slug}${r.model ? ` • ${r.model}` : ""}`,
    };
  }, [resp]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "420px 1fr",
        gap: 18,
        alignItems: "start",
      }}
    >
      <Card title="Run an agent">
        <div style={{ display: "grid", gap: 10 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Agent</span>
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value as AgentChoice)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            >
              <option value="auto">Auto (router)</option>
              <option value="funnel-offer">funnel-offer</option>
              <option value="funnel-pages">funnel-pages</option>
              <option value="funnel-emails">funnel-emails</option>
              <option value="n8n">n8n</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Mode</span>
            <select
              value={runMode}
              onChange={(e) => setRunMode(e.target.value as RunMode)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
            >
              <option value="execute">Execute</option>
              <option value="route_only">Route only</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Prompt</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              style={{
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />
          </label>

          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={run} disabled={loading} style={{ flex: 1 }}>
              {loading ? "Running..." : "Run"}
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                setText("");
                setResp(null);
              }}
            >
              Clear
            </Button>
          </div>

          <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.35 }}>
            Tip: leave <b>Auto</b> to route intelligently. Use <b>Execute</b>{" "}
            to run Offer/Pages/Emails. Use <b>Route only</b> to debug routing
            &amp; payload.
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gap: 18 }}>
        <Card title="Result">
          {!resp ? (
            <div style={{ opacity: 0.7 }}>Run an agent to see output.</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {topMeta && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 900 }}>{topMeta.badge}</div>
                    <div style={{ opacity: 0.75, fontSize: 13 }}>
                      {topMeta.subtitle}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <CopyButton
                      label="Copy JSON"
                      getText={() => JSON.stringify(resp, null, 2)}
                    />
                    <CopyButton
                      label="Copy Markdown"
                      getText={() => toMarkdown(resp)}
                    />
                  </div>
                </div>
              )}

              {(resp as ApiNeedClarification).action ===
              "needs_clarification" ? (
                <ClarificationView resp={resp as ApiNeedClarification} />
              ) : resp.ok === false ? (
                <ErrorView resp={resp as ApiError} />
              ) : (
                <SuccessView resp={resp as ApiOk} />
              )}

              <details style={{ marginTop: 4 }}>
                <summary style={{ cursor: "pointer", fontWeight: 700 }}>
                  Raw JSON
                </summary>
                <pre style={{ whiteSpace: "pre-wrap", marginTop: 10, fontSize: 12 }}>
                  {JSON.stringify(resp, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function ErrorView({ resp }: { resp: ApiError }) {
  return (
    <div
      style={{
        border: "1px solid #f5c2c2",
        background: "#fff5f5",
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 6 }}>Error</div>
      <div
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
          fontSize: 13,
        }}
      >
        {resp.error}
        {resp.detail ? ` — ${resp.detail}` : ""}
      </div>
      {resp.error === "not_entitled" && (
        <div style={{ marginTop: 10 }}>
          <a
            href="https://teesandtruma.com"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline" }}
          >
            Buy access on TeesandTruma
          </a>
        </div>
      )}
    </div>
  );
}

function ClarificationView({ resp }: { resp: ApiNeedClarification }) {
  return (
    <div
      style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
    >
      <div style={{ fontWeight: 900, marginBottom: 6 }}>
        Needs clarification
      </div>
      {resp.intent_summary && (
        <div style={{ opacity: 0.8, marginBottom: 10 }}>
          {resp.intent_summary}
        </div>
      )}
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {resp.clarifying_questions.map((q, idx) => (
          <li key={idx} style={{ marginBottom: 6 }}>
            {q}
          </li>
        ))}
      </ul>
      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 10 }}>
        Answer these in your prompt and run again. The router will raise
        confidence.
      </div>
    </div>
  );
}

function SuccessView({ resp }: { resp: ApiOk }) {
  if (resp.via === "n8n") {
    return (
      <div
        style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
      >
        <div style={{ fontWeight: 900, marginBottom: 6 }}>
          Executed via n8n
        </div>
        <div style={{ opacity: 0.8, marginBottom: 10 }}>
          Agent: <b>{resp.agent_slug}</b>
          {typeof resp.confidence === "number"
            ? ` • Confidence ${resp.confidence}`
            : ""}
        </div>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, margin: 0 }}>
          {JSON.stringify(resp.result ?? resp, null, 2)}
        </pre>
      </div>
    );
  }

  const out = resp.output;

  if (!out || typeof out !== "object") {
    return <div style={{ opacity: 0.7 }}>No structured output returned.</div>;
  }

  if (resp.agent_slug === "funnel-offer") return <OfferView out={out} />;
  if (resp.agent_slug === "funnel-pages") return <PagesView out={out} />;
  if (resp.agent_slug === "funnel-emails") return <EmailsView out={out} />;

  return (
    <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, margin: 0 }}>
      {JSON.stringify(resp.output, null, 2)}
    </pre>
  );
}

function OfferView({ out }: { out: Record<string, unknown> }) {
  const pos = (out.positioning as Record<string, string>) ?? {};
  const pricing = (out.pricing as Record<string, unknown>) ?? {};
  const cta = (out.cta as Record<string, string>) ?? {};
  const hooks = Array.isArray(out.hooks) ? (out.hooks as string[]) : [];
  const objections = Array.isArray(out.objections_and_answers)
    ? (out.objections_and_answers as { objection: string; answer: string }[])
    : [];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 4 }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>
          {String(out.offer_name ?? "")}
        </div>
        <div style={{ opacity: 0.8 }}>{pos.one_liner}</div>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontWeight: 900 }}>Positioning</div>
        <div>
          <b>Who it&apos;s for:</b> {pos.who_its_for}
        </div>
        <div>
          <b>Promise:</b> {pos.core_promise}
        </div>
        <div>
          <b>Unique mechanism:</b> {pos.unique_mechanism}
        </div>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontWeight: 900 }}>Pricing</div>
        <div>
          <b>Recommended:</b> {String(pricing.recommended ?? "")}
        </div>
        {Array.isArray(pricing.alternatives) &&
          (pricing.alternatives as string[]).length > 0 && (
            <div>
              <b>Alternatives:</b>{" "}
              {(pricing.alternatives as string[]).join(" • ")}
            </div>
          )}
        <div>
          <b>Guarantee:</b> {String(pricing.guarantee ?? "")}
        </div>
      </div>

      {hooks.length > 0 && (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontWeight: 900 }}>Hooks</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {hooks.slice(0, 12).map((h, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {objections.length > 0 && (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontWeight: 900 }}>Objections</div>
          <div style={{ display: "grid", gap: 10 }}>
            {objections.slice(0, 6).map((x, i) => (
              <div
                key={i}
                style={{ border: "1px solid #eee", borderRadius: 12, padding: 10 }}
              >
                <div style={{ fontWeight: 800 }}>{x.objection}</div>
                <div style={{ opacity: 0.85, marginTop: 4 }}>{x.answer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontWeight: 900 }}>CTAs</div>
        <div>
          <b>Primary:</b> {cta.primary}
        </div>
        <div>
          <b>Secondary:</b> {cta.secondary}
        </div>
      </div>
    </div>
  );
}

function PagesView({ out }: { out: Record<string, unknown> }) {
  const cta = (out.cta as Record<string, string>) ?? {};
  const heroBullets = Array.isArray(out.hero_bullets)
    ? (out.hero_bullets as string[])
    : [];
  const sections = Array.isArray(out.sections)
    ? (out.sections as { title: string; body: string }[])
    : [];
  const faq = Array.isArray(out.faq)
    ? (out.faq as { q: string; a: string }[])
    : [];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 4 }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>
          {String(out.headline ?? "")}
        </div>
        <div style={{ opacity: 0.85 }}>{String(out.subheadline ?? "")}</div>
      </div>

      {heroBullets.length > 0 && (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontWeight: 900 }}>Hero bullets</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {heroBullets.slice(0, 8).map((b, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {sections.length > 0 && (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontWeight: 900 }}>Sections</div>
          {sections.map((s, i) => (
            <div
              key={i}
              style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}
            >
              <div style={{ fontWeight: 900, marginBottom: 6 }}>{s.title}</div>
              <div style={{ opacity: 0.9, whiteSpace: "pre-wrap" }}>{s.body}</div>
            </div>
          ))}
        </div>
      )}

      {faq.length > 0 && (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontWeight: 900 }}>FAQ</div>
          {faq.map((f, i) => (
            <div
              key={i}
              style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}
            >
              <div style={{ fontWeight: 900 }}>{f.q}</div>
              <div style={{ opacity: 0.85, marginTop: 6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontWeight: 900 }}>CTAs</div>
        <div>
          <b>Primary:</b> {cta.primary}
        </div>
        <div>
          <b>Secondary:</b> {cta.secondary}
        </div>
      </div>
    </div>
  );
}

function EmailsView({ out }: { out: Record<string, unknown> }) {
  const emails = Array.isArray(out.emails)
    ? (out.emails as {
        email_number: number;
        subject: string;
        preview: string;
        body: string;
        cta: string;
      }[])
    : [];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 900 }}>
        {String(out.sequence_name ?? "Email Sequence")}
      </div>

      {emails.length > 0 ? (
        <div style={{ display: "grid", gap: 12 }}>
          {emails.map((e, i) => (
            <div
              key={i}
              style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: 900 }}>
                  Email {e.email_number}: {e.subject}
                </div>
                <CopyButton
                  label="Copy Email"
                  getText={() =>
                    `Subject: ${e.subject}\nPreview: ${e.preview}\n\n${e.body}\n\nCTA: ${e.cta}\n`
                  }
                />
              </div>
              <div style={{ opacity: 0.7, marginTop: 6 }}>{e.preview}</div>
              <div style={{ marginTop: 10, whiteSpace: "pre-wrap" }}>
                {e.body}
              </div>
              <div style={{ marginTop: 10 }}>
                <b>CTA:</b> {e.cta}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ opacity: 0.7 }}>No emails returned.</div>
      )}
    </div>
  );
}
