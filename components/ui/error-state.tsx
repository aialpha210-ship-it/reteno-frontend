type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center gap-3 text-sm" role="alert">
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" aria-hidden="true" />
      <span className="text-muted">{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Retry
        </button>
      )}
    </div>
  );
}
