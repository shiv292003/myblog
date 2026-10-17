function identifier(name, pattern) {
  const value = process.env[name]?.trim() || "";
  if (value && !pattern.test(value)) throw new Error(`${name} has an invalid format. Check the service's setup instructions.`);
  return value;
}

export default function () {
  const buttondown = identifier("BUTTONDOWN_USERNAME", /^[a-zA-Z0-9_-]+$/);
  const goatcounter = identifier("GOATCOUNTER_CODE", /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  const giscus = {
    repo: identifier("GISCUS_REPO", /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/),
    repoId: identifier("GISCUS_REPO_ID", /^[a-zA-Z0-9_=-]+$/),
    category: process.env.GISCUS_CATEGORY?.trim() || "",
    categoryId: identifier("GISCUS_CATEGORY_ID", /^[a-zA-Z0-9_=-]+$/)
  };
  const fields = Object.values(giscus);
  if (fields.some(Boolean) && !fields.every(Boolean)) {
    throw new Error("giscus configuration is incomplete. Set all four GISCUS_* environment variables.");
  }
  return { buttondown, goatcounter, giscus: fields.every(Boolean) ? giscus : null };
}
