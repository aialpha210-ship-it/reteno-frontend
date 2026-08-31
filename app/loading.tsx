import { LoadingState } from "@/components/ui/loading-state";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingState label="Loading Reteno…" />
    </div>
  );
}
