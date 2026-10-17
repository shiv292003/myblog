import { rm } from "node:fs/promises";

// Remove only generated output so deleted articles and newly hidden drafts cannot linger.
await rm(new URL("./_site/", import.meta.url), { recursive: true, force: true });
