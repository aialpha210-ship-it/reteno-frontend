import { API_URL } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Thin fetch wrapper. This is the foundation future API calls build on —
 * it does not yet know about auth headers, retries, or specific resources.
 * Those are added alongside the features that need them.
 */
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const accessToken = typeof window === "undefined"
    ? undefined
    : (await createClient().auth.getSession()).data.session?.access_token;
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed with status ${response.status}`, response.status);
  }

  return response.json() as Promise<T>;
}

export type HealthResponse = {
  status: string;
  service: string;
  environment: string;
};

export type IntegrationsConfigured = {
  supabase: boolean;
  redis: boolean;
  anthropic: boolean;
  instagram: boolean;
  whatsapp: boolean;
};

export type DetailedHealthResponse = HealthResponse & {
  integrations_configured: IntegrationsConfigured;
};

/** Calls the backend's liveness endpoint: GET /api/v1/health */
export function getHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/api/v1/health", { cache: "no-store" });
}

/** Calls the backend's configuration-status endpoint: GET /api/v1/health/detailed */
export function getDetailedHealth(): Promise<DetailedHealthResponse> {
  return apiFetch<DetailedHealthResponse>("/api/v1/health/detailed", { cache: "no-store" });
}
