"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, getHealth, type HealthResponse } from "@/lib/api";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

type State =
  | { kind: "loading" }
  | { kind: "online"; health: HealthResponse }
  | { kind: "offline"; message: string };

/**
 * Demonstrates the API client foundation against the one endpoint that
 * currently exists. Not a dashboard — just a connectivity check.
 */
export function BackendStatus() {
  const [state, setState] = useState<State>({ kind: "loading" });

  const check = useCallback(() => {
    setState({ kind: "loading" });
    getHealth()
      .then((health) => setState({ kind: "online", health }))
      .catch((error: unknown) => {
        const message = error instanceof ApiError ? error.message : "Backend unreachable";
        setState({ kind: "offline", message });
      });
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  if (state.kind === "loading") {
    return <LoadingState label="Checking backend connection…" />;
  }

  if (state.kind === "offline") {
    return <ErrorState message={state.message} onRetry={check} />;
  }

  return (
    <div className="flex items-center gap-3 text-sm text-muted">
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
      <span>
        Backend online
        {state.health.environment ? ` · ${state.health.environment}` : ""}
      </span>
    </div>
  );
}
