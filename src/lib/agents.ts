export type AgentKey =
  | "router"
  | "affiliate_search"
  | "affiliate_application"
  | "affiliate_link"
  | "course_campaign"
  | "content_plan"
  | "funnel_offer"
  | "funnel_pages"
  | "funnel_emails"
  | "store_product"
  | "store_page"
  | "analytics"
  | "onboarding"
  | "audit";

export const AGENTS: Record<
  AgentKey,
  { label: string; description: string; videoUrl?: string }
> = {
  router: {
    label: "Router / Dispatcher",
    description: "Analyzes your request and routes it to the best specialist agent",
    videoUrl: "/videos/router.mp4",
  },
  affiliate_search: {
    label: "Affiliate Program Search",
    description: "Finds and evaluates relevant affiliate programs for your niche",
    videoUrl: "/videos/affiliate-search.mp4",
  },
  affiliate_application: {
    label: "Affiliate Application Helper",
    description: "Crafts compelling affiliate program applications",
    videoUrl: "/videos/affiliate-app.mp4",
  },
  affiliate_link: {
    label: "Affiliate Link Manager",
    description: "Organizes and optimizes your affiliate link strategy",
    videoUrl: "/videos/affiliate-link.mp4",
  },
  course_campaign: {
    label: "Course/Campaign Builder",
    description: "Designs complete course structures and campaign strategies",
    videoUrl: "/videos/course.mp4",
  },
  content_plan: {
    label: "Content Plan Generator",
    description: "Creates 30-day content calendars with hooks, scripts, and schedules",
    videoUrl: "/videos/content.mp4",
  },
  funnel_offer: {
    label: "Funnel Offer Generator",
    description: "Crafts irresistible offers and value propositions",
    videoUrl: "/videos/funnel-offer.mp4",
  },
  funnel_pages: {
    label: "Funnel Pages Generator",
    description: "Designs landing page structures and copy",
    videoUrl: "/videos/funnel-pages.mp4",
  },
  funnel_emails: {
    label: "Funnel Emails Generator",
    description: "Creates email sequences for nurture and conversion",
    videoUrl: "/videos/funnel-emails.mp4",
  },
  store_product: {
    label: "Store Product Creator",
    description: "Generates product ideas, descriptions, and pricing strategies",
    videoUrl: "/videos/store-product.mp4",
  },
  store_page: {
    label: "Store Page Generator",
    description: "Designs product pages and store layouts",
    videoUrl: "/videos/store-page.mp4",
  },
  analytics: {
    label: "Analytics Aggregator",
    description: "Analyzes performance data and provides actionable insights",
    videoUrl: "/videos/analytics.mp4",
  },
  onboarding: {
    label: "Onboarding Master",
    description: "Creates customer onboarding workflows and experiences",
    videoUrl: "/videos/onboarding.mp4",
  },
  audit: {
    label: "System Auditor",
    description: "Reviews your marketing systems and identifies improvements",
    videoUrl: "/videos/audit.mp4",
  },
};
