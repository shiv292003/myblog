import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Eleventy from "@11ty/eleventy";
import { publishedPosts, validatePosts } from "../eleventy.config.js";
import integrations from "../src/_data/integrations.js";
import site from "../src/_data/site.js";
import getSections from "../src/_data/sections.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "_site");
const read = (path) => readFile(join(output, path), "utf8");
async function publishedPages() {
  const sitemap = await read("sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname)
    .filter((path) => path.startsWith("/writing/"));
  return Promise.all(urls.map(async (url) => {
    const html = await read(join(url, "index.html"));
    const timestamp = html.match(/property="article:published_time" content="([^"]+)"/)?.[1];
    assert.ok(timestamp && Number.isFinite(Date.parse(timestamp)), `${url} needs a publication date`);
    return { url, html, date: new Date(timestamp) };
  }));
}
const article = (overrides = {}) => ({
  inputPath: "test-article.md",
  date: new Date("2026-10-15"),
  data: {
    title: "A test article", slug: "test-article", date: new Date("2026-10-15"),
    description: "A short description.", section: getSections()[0].id, ...overrides
  }
});

async function withEnvironment(values, callback) {
  const originals = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return await callback();
  } finally {
    for (const [key, value] of Object.entries(originals)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("article validation rejects bad metadata instead of silently publishing it", () => {
  assert.doesNotThrow(() => validatePosts([article()]));
  for (const invalid of [
    { title: "" }, { slug: "Not a slug" }, { description: "" }, { section: "missing" },
    { date: "tomorrow" }, { draft: "false" }, { featured: "yes" }, { sample: "true" }
  ]) assert.throws(() => validatePosts([article(invalid)]));
  assert.throws(() => validatePosts([article(), article()]), /duplicate slug/);
});

test("publishing filters drafts and sorts newest first", () => {
  const older = article({ slug: "older" });
  older.date = new Date("2025-01-01");
  const newest = article({ slug: "newest" });
  const hidden = article({ draft: true });
  assert.deepEqual(publishedPosts([older, hidden, newest]), [newest, older]);
});

test("home indexes every published article under a known section", async () => {
  const home = await read("index.html");
  const posts = await publishedPages();
  assert.equal((home.match(/class="post-row"/g) || []).length, posts.length);
  const sectionIds = [...home.matchAll(/<h3 id="section-([^"]+)"/g)].map((match) => match[1]);
  for (const id of sectionIds) assert.ok(getSections().some((section) => section.id === id));
  for (const post of posts) assert.ok(home.includes(`href="${post.url}"`));
  assert.equal((home.match(/<h1\b/g) || []).length, 1);
});

test("drafts are absent from pages, archive, feed and sitemap", async () => {
  for (const path of ["index.html", join("archive", "index.html"), "feed.xml", "sitemap.xml"]) {
    assert.doesNotMatch(await read(path), /draft-example|An unfinished thought/);
  }
  assert.equal(existsSync(join(output, "writing", "draft-example", "index.html")), false);
});

test("archive and RSS contain every published article in date order", async () => {
  const archive = await read(join("archive", "index.html"));
  const feed = await read("feed.xml");
  const posts = (await publishedPages()).sort((a, b) => b.date - a.date || a.url.localeCompare(b.url));
  for (const body of [archive, feed]) {
    let previous = -1;
    for (const post of posts) {
      const index = body.indexOf(post.url);
      assert.ok(index > previous, `${post.url} should be present in date order`);
      previous = index;
    }
  }
  assert.equal((feed.match(/<item>/g) || []).length, posts.length);
  for (const year of new Set(posts.map((post) => post.date.getUTCFullYear()))) {
    assert.equal((archive.match(new RegExp(`<h2>${year}</h2>`, "g")) || []).length, 1);
  }
  assert.ok(feed.startsWith('<?xml version="1.0"'));
  for (const post of posts) assert.ok(feed.includes(`<pubDate>${post.date.toUTCString()}</pubDate>`));
});

test("all generated internal links and assets resolve, including section anchors", async () => {
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) =>
      entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]));
    return nested.flat();
  }
  for (const file of (await walk(output)).filter((file) => file.endsWith(".html"))) {
    const html = await readFile(file, "utf8");
    for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (!value.startsWith("/") || value.startsWith("//")) continue;
      const url = new URL(value, "https://test.example");
      const target = join(output, decodeURIComponent(url.pathname), url.pathname.endsWith("/") ? "index.html" : "");
      assert.ok(existsSync(target), `${file} links to missing ${value}`);
      if (url.hash) {
        const targetHtml = await readFile(target, "utf8");
        assert.ok(targetHtml.includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${value}`);
      }
    }
  }
});

test("article pages have a reading area and require no browser framework", async () => {
  for (const post of await publishedPages()) {
    assert.match(post.html, /class="prose"/);
    assert.equal((post.html.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(post.html, /src="[^"]*(?:react|vue|three)[^"]*\.js"/);
  }
  assert.match(await read("404.html"), /404 \/ Not found/);
});

test("authored visual assets use only black and white", async () => {
  for (const path of ["style.css", "notebook.svg", "favicon.svg"]) {
    const asset = await read(join("assets", path));
    const colors = [...asset.matchAll(/#[a-f0-9]{3,8}\b/gi)].map((match) => match[0].toLowerCase());
    assert.ok(colors.length, `${path} should declare a palette`);
    for (const color of colors) assert.ok(["#000", "#fff", "#000000", "#ffffff"].includes(color), `${path}: ${color}`);
    assert.doesNotMatch(asset, /(?:rgba?|hsla?|oklch)\(/i);
  }
});

test("missing service configuration stays explicit; partial config fails", async () => {
  const empty = {
    BUTTONDOWN_USERNAME: "", GOATCOUNTER_CODE: "", GISCUS_REPO: "",
    GISCUS_REPO_ID: "", GISCUS_CATEGORY: "", GISCUS_CATEGORY_ID: ""
  };
  await withEnvironment(empty, () => {
    assert.equal(integrations().giscus, null);
    assert.equal(integrations().buttondown, "");
  });
  await withEnvironment({ ...empty, GISCUS_REPO: "owner/blog" }, () =>
    assert.throws(() => integrations(), /incomplete/));
  await withEnvironment({ ...empty, BUTTONDOWN_USERNAME: '"><script>' }, () =>
    assert.throws(() => integrations(), /invalid format/));
});

test("public URLs require HTTPS and previews are not indexed", async () => {
  await withEnvironment({ SITE_URL: "http://example.com" }, () =>
    assert.throws(() => site(), /HTTPS/));
  await withEnvironment({ SITE_URL: "https://example.com/subpath" }, () =>
    assert.throws(() => site(), /without a path/));
  await withEnvironment({ SITE_URL: "https://example.com", VERCEL_ENV: "preview" }, () => {
    assert.equal(site().noindex, true);
    assert.equal(site().url, "https://example.com");
  });
});

test("production build wires configured services and canonical URLs without contacting them", async () => {
  await withEnvironment({
    SITE_URL: "https://blog.example", VERCEL_ENV: "production",
    BUTTONDOWN_USERNAME: "test-newsletter", GOATCOUNTER_CODE: "test-blog",
    GISCUS_REPO: "example/comments", GISCUS_REPO_ID: "R_test",
    GISCUS_CATEGORY: 'Notes & "questions"', GISCUS_CATEGORY_ID: "DIC_test"
  }, async () => {
    const builder = new Eleventy("src", "_site", {
      configPath: "eleventy.config.js",
      quietMode: true,
      config: (config) => {
        config.addTemplate("test-render.md", [
          "A **fixture**, not an article that needs to stay on the site.",
          "",
          "```js",
          "const notebook = true;",
          "```"
        ].join("\n"), {
          layout: "layouts/post.njk", title: 'Ink & "paper"', description: "A rendering fixture.",
          slug: "test-render", section: getSections()[0].id, date: new Date("2026-10-17"),
          permalink: "/test-render/", eleventyExcludeFromCollections: true
        });
      }
    });
    const pages = await builder.toJSON();
    const home = pages.find((page) => page.url === "/").content;
    const post = pages.find((page) => page.url === "/test-render/").content;
    assert.match(home, /action="https:\/\/buttondown.com\/api\/emails\/embed-subscribe\/test-newsletter"/);
    assert.match(home, /name="email"/);
    assert.match(home, /https:\/\/test-blog.goatcounter.com\/count/);
    assert.match(home, /rel="canonical" href="https:\/\/blog.example\/"/);
    assert.doesNotMatch(home, /noindex/);
    assert.match(post, /data-term="test-render"/);
    assert.match(post, /class="token keyword"/);
    assert.match(post, /Ink &amp; &quot;paper&quot;/);
    assert.match(post, /data-category="Notes &amp; &quot;questions&quot;"/);
    assert.match(post, /id="load-comments"/);
    assert.doesNotMatch(post, /src="https:\/\/giscus.app\/client.js"/);
    assert.match(pages.find((page) => page.url === "/robots.txt").content, /Allow: \//);
  });
});
