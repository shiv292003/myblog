const button = document.getElementById("load-comments");
const status = document.getElementById("comments-status");

button.addEventListener("click", () => {
  button.disabled = true;
  status.textContent = "Loading comments from giscus...";
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  const config = {
    repo: button.dataset.repo,
    repoId: button.dataset.repoId,
    category: button.dataset.category,
    categoryId: button.dataset.categoryId,
    mapping: "specific",
    term: button.dataset.term,
    strict: "1",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "light",
    lang: "en"
  };
  for (const [key, value] of Object.entries(config)) script.dataset[key] = value;
  script.addEventListener("load", () => {
    button.hidden = true;
    status.textContent = "Comment service loaded. If comments don't appear, check your connection or visit GitHub Discussions.";
  });
  script.addEventListener("error", () => {
    status.textContent = "Comments couldn't load. Check your connection and try again, or visit GitHub Discussions.";
    button.disabled = false;
    script.remove();
  });
  document.querySelector(".giscus").append(script);
});
