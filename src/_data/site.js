export default function () {
  const urlValue = process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:8080");
  const url = new URL(urlValue);
  if (!["http:", "https:"].includes(url.protocol) || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("SITE_URL must be an HTTP(S) origin without a path, query, or credentials.");
  }
  const local = ["localhost", "127.0.0.1"].includes(url.hostname);
  if (!local && url.protocol !== "https:") throw new Error("Public SITE_URL must use HTTPS.");
  if (local) console.warn("[site] Using localhost URLs. Set SITE_URL before publishing outside Vercel.");
  return {
    title: "Margin notes",
    description: "A personal collection of essays, observations, and things learned along the way.",
    url: url.origin,
    language: "en",
    noindex: local || process.env.VERCEL_ENV === "preview",
    year: new Date().getUTCFullYear()
  };
}
