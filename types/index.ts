export type NavItem = {
  label: string;
  href: string;
  /** True once the route behind this item actually exists. */
  available: boolean;
};

export type { HealthResponse, DetailedHealthResponse, IntegrationsConfigured } from "@/lib/api";

export type ContentPlatform = "youtube" | "instagram";

export type ContentStatus =
  | "PENDING"
  | "DOWNLOADING"
  | "AUDIO_EXTRACTING"
  | "TRANSCRIBING"
  | "COMPLETED"
  | "FAILED";

export type TranscriptSegment = {
  start: number;
  end: number;
  text: string;
};

export type Transcription = {
  status: string;
  provider: string;
  model: string;
  language?: string;
  transcript_text?: string;
  segments?: TranscriptSegment[];
};

export type Capture = {
  id: string;
  source: ContentPlatform | string; // Keep string for backwards compatibility if needed, but ContentPlatform preferred
  source_url: string;
  external_content_id?: string | null;
  status: ContentStatus | "received" | "queued" | "processing" | "completed" | "failed";
  source_platform?: ContentPlatform; // Align with ContentItem
  duration_seconds?: number;
  transcription?: Transcription;
  title?: string | null;
  thumbnail_url?: string | null;
  created_at: string;
};

export type ContentItem = Capture;
