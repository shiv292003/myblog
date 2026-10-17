import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import getSections from "./src/_data/sections.js";

const sections = getSections();

export function publishedPosts(items) {
  return items.filter((item) => item.data.draft !== true)
    .sort((a, b) => b.date - a.date || a.data.slug.localeCompare(b.data.slug));
}

export function validatePosts(items) {
  const slugs = new Set();
  for (const item of items) {
    const data = item.data;
    const label = item.inputPath;
    for (const field of ["title", "slug", "description", "section"]) {
      if (typeof data[field] !== "string" || !data[field].trim()) {
        throw new Error(`${label}: "${field}" must be a non-empty string.`);
      }
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
      throw new Error(`${label}: slug must use lowercase letters, numbers and single hyphens.`);
    }
    if (slugs.has(data.slug)) throw new Error(`${label}: duplicate slug "${data.slug}".`);
    slugs.add(data.slug);
    if (!sections.some((section) => section.id === data.section)) {
      throw new Error(`${label}: unknown section "${data.section}". Update src/_data/sections.js.`);
    }
    if (!(data.date instanceof Date) || Number.isNaN(data.date.valueOf())) {
      throw new Error(`${label}: supply a valid date, such as 2026-10-15.`);
    }
    for (const field of ["draft", "featured", "sample"]) {
      if (data[field] !== undefined && typeof data[field] !== "boolean") {
        throw new Error(`${label}: "${field}" must be true or false, not a string.`);
      }
    }
  }
}

export default function (eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: true });
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets");
  eleventyConfig.addCollection("posts", (api) => {
    const items = api.getFilteredByGlob("./src/posts/*.md");
    validatePosts(items);
    return publishedPosts(items);
  });
  eleventyConfig.addFilter("dateLabel", (date) =>
    new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date));
  eleventyConfig.addFilter("isoDate", (date) => date.toISOString());
  eleventyConfig.addFilter("year", (date) => date.getUTCFullYear());
  eleventyConfig.addFilter("inSection", (posts, id) => posts.filter((post) => post.data.section === id));
  eleventyConfig.addFilter("featuredPost", (posts) => posts.find((post) => post.data.featured) || posts[0]);
  eleventyConfig.addFilter("hasSamples", (posts) => posts.some((post) => post.data.sample));
  eleventyConfig.addFilter("sectionName", (id) => sections.find((section) => section.id === id)?.title);
  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);
  eleventyConfig.addFilter("xml", (value) => String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&apos;"));
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 220));
  });
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"]
  };
}
