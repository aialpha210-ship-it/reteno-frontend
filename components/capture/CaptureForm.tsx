"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ingestContent } from "@/lib/api";
import type { Capture, ContentPlatform } from "@/types";

type CaptureFormProps = {
  onSuccess?: (capture: Capture) => void;
};

export function CaptureForm({ onSuccess }: CaptureFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<ContentPlatform | "auto">("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    const trimmedUrl = url.trim();
    let detectedPlatform: ContentPlatform | null = null;

    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be|youtube\.com\/shorts)\/.+$/;
    const instagramRegex = /^(https?\:\/\/)?((www\.)?instagram\.com)\/.+$/;

    if (platform === "auto") {
      if (youtubeRegex.test(trimmedUrl)) {
        detectedPlatform = "youtube";
      } else if (instagramRegex.test(trimmedUrl)) {
        detectedPlatform = "instagram";
      } else {
        setError("Could not automatically detect platform. Please select YouTube or Instagram, or check your URL.");
        return;
      }
    } else {
      detectedPlatform = platform;
      if (platform === "youtube" && !youtubeRegex.test(trimmedUrl)) {
         setError("Please enter a valid YouTube URL.");
         return;
      }
      if (platform === "instagram" && !instagramRegex.test(trimmedUrl)) {
         setError("Please enter a valid Instagram URL.");
         return;
      }
    }

    setIsLoading(true);
    try {
      const response = await ingestContent(trimmedUrl, detectedPlatform!);
      setUrl("");
      setPlatform("auto");
      // Use the newly created ingestion flow component route
      router.push(`/dashboard/knowledge/${response.content_id}`);
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
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            placeholder="Paste a YouTube or Instagram URL"
            className="flex-1 rounded-md border border-line bg-white px-3 py-2 text-sm outline-none placeholder:text-muted focus-visible:border-accent"
            disabled={isLoading}
          />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
            className="rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus-visible:border-accent"
            disabled={isLoading}
            aria-label="Platform"
          >
            <option value="auto">Auto Detect</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
          </select>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {isLoading && <p className="text-sm text-muted">Adding to your knowledge...</p>}
    </form>
  );
}
