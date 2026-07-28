/**
 * API base URL for docs live previews (AsyncSelect, DataTable server demos).
 * Set `NEXT_PUBLIC_API_BASE_URL` at build/dev time (see `.env.example`).
 */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (fromEnv) {
    return fromEnv;
  }
  return process.env.NODE_ENV === "production"
    ? "https://api.ui.kousta.org/"
    : "http://localhost:8001";
}
