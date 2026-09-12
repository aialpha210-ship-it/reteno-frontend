import type { Capture } from "@/types";

type CaptureStatusBadgeProps = {
  status: Capture["status"];
};

export function CaptureStatusBadge({ status }: CaptureStatusBadgeProps) {
  const statusConfig = {
    received: { label: "Received", classes: "bg-gray-100 text-gray-800 border-gray-200" },
    queued: { label: "Queued", classes: "bg-blue-50 text-blue-700 border-blue-200" },
    processing: { label: "Processing", classes: "bg-amber-100 text-amber-800 border-amber-200 animate-pulse" },
    completed: { label: "Ready", classes: "bg-green-100 text-green-800 border-green-200" },
    failed: { label: "Failed", classes: "bg-red-100 text-red-800 border-red-200" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.received;

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.classes}`}>
      {config.label}
    </span>
  );
}
