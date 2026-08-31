export type NavItem = {
  label: string;
  href: string;
  /** True once the route behind this item actually exists. */
  available: boolean;
};

export type { HealthResponse, DetailedHealthResponse, IntegrationsConfigured } from "@/lib/api";
