type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading…" }: LoadingStateProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted" role="status" aria-live="polite">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted/60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-muted" />
      </span>
      <span>{label}</span>
    </div>
  );
}
