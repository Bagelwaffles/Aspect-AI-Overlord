/**
 * /lib/agents/registry.ts
 *
 * Canonical registry of all 13 sellable agents.
 * IDs / slugs are stable – do not rename them once used in Shopify SKUs.
 *
 * SKU conventions (TeesandTruma / Aspect store):
 *   AGENT_<slug>_LIFETIME        – one-time lifetime access
 *   AGENT_<slug>_SUB_MONTHLY    – monthly subscription
 *   AGENT_<slug>_SUB_ANNUAL     – annual subscription
 *   AGENT_USAGE_<slug>_<units>  – usage-based add-on pack
 */

export type EntitlementType =
    | "LIFETIME"
  | "SUB_MONTHLY"
  | "SUB_ANNUAL"
  | "USAGE";

export interface AgentDefinition {
    id: string;         // numeric string, stable
  slug: string;       // used in SKUs and URL paths
  name: string;
    description: string;
    /** All SKU suffixes this agent can be sold under */
  entitlementTypes: EntitlementType[];
}

/** Derive the Shopify SKU for a given agent + entitlement type */
export function buildSku(
    slug: string,
    type: Exclude<EntitlementType, "USAGE">
  ): string {
    return `AGENT_${slug.toUpperCase()}_${type}`;
}

export function buildUsageSku(slug: string, units: number): string {
    return `AGENT_USAGE_${slug.toUpperCase()}_${units}`;
}

/** Check whether a raw SKU grants access to a given agent */
export function skuGrantsAgent(sku: string, slug: string): boolean {
    const prefix = `AGENT_${slug.toUpperCase()}_`;
    const usagePrefix = `AGENT_USAGE_${slug.toUpperCase()}_`;
    return sku.startsWith(prefix) || sku.startsWith(usagePrefix);
}

// ---------------------------------------------------------------------------
// The 13 core agents
// ---------------------------------------------------------------------------

export const AGENT_REGISTRY: AgentDefinition[] = [
  {
        id: "1",
        slug: "router",
        name: "Router / Dispatcher",
        description:
                "Analyses your request and routes it to the best specialist agent automatically.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL"],
  },
  {
        id: "2",
        slug: "affiliate-search",
        name: "Affiliate Program Search",
        description:
                "Finds and evaluates relevant affiliate programs for your niche.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "3",
        slug: "affiliate-application",
        name: "Affiliate Application Helper",
        description: "Crafts compelling affiliate program applications.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "4",
        slug: "affiliate-link",
        name: "Affiliate Link Manager",
        description: "Organises and optimises your affiliate link strategy.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL"],
  },
  {
        id: "5",
        slug: "content-plan",
        name: "Content Plan Generator",
        description:
                "Creates 30-day content calendars with hooks, scripts, and schedules.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "6",
        slug: "funnel-offer",
        name: "Funnel Offer Generator",
        description: "Crafts irresistible offers and value propositions.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "7",
        slug: "funnel-pages",
        name: "Funnel Pages Generator",
        description: "Designs landing page structures and copy.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "8",
        slug: "funnel-emails",
        name: "Funnel Emails Generator",
        description: "Creates email sequences for nurture and conversion.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "9",
        slug: "store-product",
        name: "Store Product Creator",
        description:
                "Generates product ideas, descriptions, and pricing strategies.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "10",
        slug: "analytics",
        name: "Analytics Aggregator",
        description: "Analyses performance data and provides actionable insights.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL"],
  },
  {
        id: "11",
        slug: "shopify-store-builder",
        name: "Shopify Store Builder",
        description: "Creates and configures a Shopify store end-to-end.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "12",
        slug: "shopify-seo-optimizer",
        name: "Shopify SEO Optimizer",
        description: "Optimises Shopify store SEO and metadata.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL", "USAGE"],
  },
  {
        id: "13",
        slug: "onboarding",
        name: "Onboarding Master",
        description:
                "Creates customer onboarding workflows and experiences.",
        entitlementTypes: ["LIFETIME", "SUB_MONTHLY", "SUB_ANNUAL"],
  },
  ];

/** Quick lookup by slug */
export const AGENT_BY_SLUG: Record<string, AgentDefinition> =
    Object.fromEntries(AGENT_REGISTRY.map((a) => [a.slug, a]));
