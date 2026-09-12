"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getContent } from "@/lib/api";
import type { Capture } from "@/types";
import { Button } from "@/components/ui/button";

export default function KnowledgeDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [content, setContent] = useState<Capture | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      const data = await getContent(id);
      setContent(data);
    } catch (err: any) {
      if (err.status === 404) {
        setError("Content not found.");
      } else {
        setError("Unable to load content.");
      }
    }
  }, [id]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    if (!content) return;

    const activeStatuses = ["PENDING", "DOWNLOADING", "AUDIO_EXTRACTING", "TRANSCRIBING", "received", "queued", "processing"];

    if (activeStatuses.includes(content.status)) {
      const interval = setInterval(fetchContent, 3000);
      return () => clearInterval(interval);
    }
  }, [content, fetchContent]);

  if (error) {
    return (
      <main className="min-h-screen bg-[#fbfaf7] px-5 py-8 sm:px-10 lg:px-20">
        <Link href="/dashboard" className="text-sm text-muted hover:text-ink">← Back to Library</Link>
        <div className="mt-10 max-w-3xl mx-auto p-6 bg-red-50 text-red-700 rounded-xl">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen bg-[#fbfaf7] px-5 py-8 sm:px-10 lg:px-20">
        <Link href="/dashboard" className="text-sm text-muted hover:text-ink">← Back to Library</Link>
        <div className="mt-10 max-w-3xl mx-auto">
          <p className="text-muted">Loading...</p>
        </div>
      </main>
    );
  }

  const isFailed = content.status === "FAILED" || content.status === "failed";
  const isCompleted = content.status === "COMPLETED" || content.status === "completed";
  const isProcessing = !isFailed && !isCompleted;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-5 py-8 sm:px-10 lg:px-20">
      <Link href="/dashboard" className="text-sm text-muted hover:text-ink">← Back to Library</Link>

      <article className="mx-auto mt-10 max-w-3xl">
        {isProcessing && (
          <div className="rounded-2xl border border-line bg-white p-8 mb-8 shadow-sm">
            <h2 className="font-display text-2xl mb-6 text-ink">Processing content...</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> Content received
              </li>
              <li className="flex items-center gap-3">
                {content.status === "AUDIO_EXTRACTING" || content.status === "TRANSCRIBING" ? <span className="text-green-500">✓</span> : content.status === "DOWNLOADING" ? <span className="text-amber-500 animate-pulse">●</span> : <span className="text-gray-300">○</span>} Downloading
              </li>
              <li className="flex items-center gap-3">
                {content.status === "TRANSCRIBING" ? <span className="text-green-500">✓</span> : content.status === "AUDIO_EXTRACTING" ? <span className="text-amber-500 animate-pulse">●</span> : <span className="text-gray-300">○</span>} Extracting audio
              </li>
              <li className="flex items-center gap-3">
                {content.status === "TRANSCRIBING" ? <span className="text-amber-500 animate-pulse">●</span> : <span className="text-gray-300">○</span>} Transcribing
              </li>
              <li className="flex items-center gap-3">
                 <span className="text-gray-300">○</span> Complete
              </li>
            </ul>
          </div>
        )}

        {isFailed && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 mb-8">
            <h2 className="font-display text-2xl text-red-700 mb-4">Unable to process this content.</h2>
            <p className="text-red-600 mb-6">There was an error while trying to ingest the provided URL.</p>
            <Button onClick={async () => {
                if (content.source_url) {
                    try {
                        const { ingestContent } = await import("@/lib/api");
                        const res = await ingestContent(content.source_url, content.source_platform || "auto");
                        router.push(`/dashboard/knowledge/${res.content_id}`);
                    } catch (e) {
                        router.push("/dashboard");
                    }
                } else {
                    router.push("/dashboard");
                }
            }}>Retry</Button>
          </div>
        )}

        {isCompleted && (
          <>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent capitalize">
                  {content.source_platform || content.source || "Unknown source"}
                </span>
                <h1 className="mt-4 font-display text-4xl leading-tight">
                  {content.title || "Captured Content"}
                </h1>
              </div>
            </div>

            <p className="mt-5 text-sm text-muted">
              Source URL · <a className="underline text-ink hover:text-accent" href={content.source_url} target="_blank" rel="noopener noreferrer">Open link</a>
              {content.duration_seconds ? ` · ${formatTime(content.duration_seconds)}` : ""}
            </p>

            <section className="mt-10 border-t border-line py-8">
              <h2 className="font-display text-3xl mb-6">Transcription</h2>

              {!content.transcription?.segments?.length ? (
                <p className="text-muted italic">No transcript segments available.</p>
              ) : (
                <div className="space-y-6">
                  {content.transcription.segments.map((segment, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="text-xs font-mono text-muted bg-gray-100 inline-block px-2 py-1 rounded w-max">
                        {formatTime(segment.start)} → {formatTime(segment.end)}
                      </span>
                      <p className="text-lg leading-relaxed text-ink pl-1">
                        {segment.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </article>
    </main>
  );
}
