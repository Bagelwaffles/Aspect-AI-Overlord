/**
 * lib/agents.ts — DEPRECATED
 *
 * This file is kept only to avoid breaking any existing imports.
 * The canonical agent registry is now at lib/agents/registry.ts.
 *
 * DO NOT add new agents here. Edit lib/agents/registry.ts instead.
 */

// Re-export everything from the canonical registry so old imports still work
export * from "./agents/registry";
