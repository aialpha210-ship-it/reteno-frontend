/**
 * Environment configuration.
 *
 * Only `NEXT_PUBLIC_*` variables belong here — anything without that prefix
 * is a server-only secret and must never be read into client-bundled code.
 * The frontend currently has no server-only secrets.
 */

function requireEnv(name: string, value: string | undefined, fallback: string): string {
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      // Fail loudly in production rather than silently pointing at localhost.
      console.error(`Missing required environment variable: ${name}`);
    }
    return fallback;
  }
  return value;
}

/** Base URL of the FastAPI backend. Never hardcode a production URL. */
export const API_URL = requireEnv(
  "NEXT_PUBLIC_API_URL",
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:8000",
);

export const APP_NAME = "Reteno";
