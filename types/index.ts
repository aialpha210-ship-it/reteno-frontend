export type NavItem = {
  label: string;
  href: string;
  /** True once the route behind this item actually exists. */
  available: boolean;
};

export type { HealthResponse, DetailedHealthResponse, IntegrationsConfigured } from "@/lib/api";

export type Capture = {
  id: string;
  source: string;
  source_url: string;
  external_content_id?: string | null;
  status: "received" | "queued" | "processing" | "completed" | "failed";
  title?: string | null;
  thumbnail_url?: string | null;
  created_at: string;
};
