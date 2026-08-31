import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-2xl text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The page you're looking for doesn't exist or hasn't been built yet.
      </p>
      <div className="mt-6">
        <Button href="/" variant="secondary">
          Back home
        </Button>
      </div>
    </div>
  );
}
