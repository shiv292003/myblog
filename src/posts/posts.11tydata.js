export default {
  layout: "layouts/post.njk",
  eleventyComputed: {
    permalink: (data) => data.draft === true ? false : `/writing/${data.slug}/`,
    eleventyExcludeFromCollections: (data) => data.draft === true
  }
};
