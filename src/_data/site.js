export default function () {
  const urlValue = process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:8080");
  const url = new URL(urlValue);
  if (!["http:", "https:"].includes(url.protocol) || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("SITE_URL must be an HTTP(S) origin without a path, query, or credentials.");
  }
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const isProduction = process.env.VERCEL_ENV === "production" && !local;
  if (!local && url.protocol !== "https:") throw new Error("Public SITE_URL must use HTTPS.");
  if (local) console.warn("[site] Using localhost URLs. Set SITE_URL before publishing outside Vercel.");
  return {
    title: "Quest",
    author: "Shiv Shakti Sharma",
    monogram: "Q",
    tagline: "On a quest. The world as I see it.",
    description: "Books, technology, projects, and life. A personal blog by Shiv Shakti Sharma.",
    email: "shivshakti292003@gmail.com",
    about: [
      "I'm curious about a little bit of everything—from history and politics to architecture, sports, human psychology, and technology.",
      "Ideas slip away if I don't write them down. Quest is where I explore what interests me, write to find clarity, and share the world as I see it. I welcome thoughtful feedback and conversations that help me see things differently."
    ],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/shiv-shakti-sharma-4830931b1/" },
      { label: "GitHub", url: "https://github.com/shiv292003" },
      { label: "X / @shiv_buildsfail", url: "https://x.com/shiv_buildsfail" }
    ],
    url: url.origin,
    language: "en",
    isProduction,
    noindex: !isProduction,
    year: new Date().getUTCFullYear()
  };
}
