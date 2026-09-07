"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createCapture } from "@/lib/api";
import type { Capture } from "@/types";

type CaptureFormProps = {
  onSuccess?: (capture: Capture) => void;
};

export function CaptureForm({ onSuccess }: CaptureFormProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    // Basic YouTube URL validation
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be|youtube\.com\/shorts)\/.+$/;
    if (!youtubeRegex.test(url.trim())) {
      setError("Please enter a valid YouTube URL. Other formats are coming soon!");
      return;
    }

    setIsLoading(true);
    try {
      const newCapture = await createCapture(url.trim());
      setUrl("");
      onSuccess?.(newCapture);
    } catch (err: any) {
      if (err.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else if (err.status === 400 || err.status === 422) {
        setError(err.message || "Invalid capture request. Please check the URL.");
      } else if (err.status === 404) {
        setError("The capture endpoint was not found.");
      } else {
        setError("Something went wrong while adding this capture. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="capture-url" className="text-sm font-medium text-ink">
          What do you want to learn?
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="capture-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a YouTube URL"
            className="flex-1 rounded-md border border-line bg-white px-3 py-2 text-sm outline-none placeholder:text-muted focus-visible:border-accent"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Adding..." : "Capture"}
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {isLoading && <p className="text-sm text-muted">Adding to your knowledge...</p>}
    </form>
  );
}
