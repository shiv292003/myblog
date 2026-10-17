# Project context: personal blog

Last updated: 2026-10-17.

**Release snapshot:** personalization to **Quest**, a friendly RSS guide, sample hiding, and an owner-supplied portrait are implemented and locally verified. The user reviewed the local preview and explicitly said **"OKAY PUSH IT"** on 2026-10-17, authorizing this update's commit and push. A push to main may automatically redeploy Vercel. At preparation of this snapshot, the last verified live deployment was still Margin notes; verify the new release after pushing. Future publishing changes still require permission.

## Quest personalization: current local work

- User approved local implementation/testing, and asked to hide every sample article until real writing is added.
- Approved identity: **Shiv Shakti Sharma**, blog **Quest**, tagline **"On a quest. The world as I see it."**
- Approved biography is stored in [site data](src/_data/site.js) and rendered by [About](src/about.njk). About moved from Markdown to Nunjucks to reuse shared data; the URL stays `/about/`.
- Approved public contact: `shivshakti292003@gmail.com`. This is not the repository's commit email; keep those identities distinct.
- Approved profiles: https://www.linkedin.com/in/shiv-shakti-sharma-4830931b1/ , https://github.com/shiv292003 , https://x.com/shiv_buildsfail .
- Topics, in order: Books (`books`), Technology (`technology`), Projects (`projects`), Life (`life`). All four remain visible with no published articles.
- Header/footer, favicon, metadata, homepage and privacy contact use the Quest identity. Public profile links are ordinary links with no widgets.
- The user supplied a photo and authorized its use. [The optimized portrait](src/assets/portrait.png) is a 480px square, 55,313-byte PNG with black/white error-diffusion dots and no original photo metadata. It appears on About, with alt text and intrinsic dimensions. The original attachment is unchanged and is not in the repository. Processing was local, with no upload to an image service and no new dependency.
- Human Follow/RSS buttons now open [the RSS guide](src/follow.njk) at `/follow/`; RSS autodiscovery and the raw feed remain at `/feed.xml`. The guide explains the browser's XML display, provides a copyable absolute address, and is included in the sitemap.
- All six samples plus the original draft are `draft: true`. Their sections were mapped to valid new IDs. A clean build removes stale article output. Draft files remain in the source repository; earlier public copies or caches are not erased by this change.
- Empty homepage/archive/feed states are deliberate. First real article should use a new stable slug and `draft: false`.
- Newsletter, comments, analytics, and search-indexing policy are unchanged. No account-backed service was enabled.
- Tests now cover approved identity/contact/topics, portrait dimensions/size, hidden sample URLs, human-versus-machine RSS links, empty states, and Follow-page service gates.
- Verification: clean `npm run check` passed all **16 tests**. Generated links/assets and all seven hidden example URLs were checked; no sample pages were generated.
- XML parsing passed: Quest RSS has zero items; the sitemap has five public page URLs.
- Portrait verification checked all 230,400 pixels: opaque black or white only. PNG has no EXIF or text metadata chunks.
- Local browser checks passed **25 layout cases**: Home, About, Follow, Archive and Privacy at 320, 375, 500, 768 and 1280px. Each returned HTTP 200, had one main heading/landmark, and had no horizontal page overflow. The portrait loaded at every tested width. Desktop About was visually inspected.
- Footer RSS navigation reached the HTML Follow guide. Keyboard select-all selected the complete readonly feed address. A fresh Tab reached the visible skip link with a dashed focus outline.
- No third-party form was submitted or service enabled. These are local checks, not verification of a new public deployment.
- The test preview was stopped, then a new user-requested preview was started at `http://localhost:8081/` and verified responsive. It was left running for review (`quest-user-preview`); check whether it is still available before starting another server or running a clean build.
- Immediately before publishing, `npm test` again passed all 16 tests and `git diff --check` passed. Only the approved personalization, portrait, samples, tests and documentation were in the changed-file list.

The deployment/readiness records below describe the earlier public version, not this unpublished Quest update.

## First live deployment: verified 2026-10-17

- URL: https://myblog-wheat-nu.vercel.app/
- User imported `shiv292003/myblog`, branch `main`, in their own Vercel account and clicked Deploy after explicit confirmation.
- Import screenshot showed Hobby plan, project `myblog`, root `./`, Eleventy preset, build `npm run check`, output `_site`, install `npm ci`.
- User left custom environment variables unset. Vercel's supplied production hostname produced the correct canonical/feed/sitemap origin without manually setting `SITE_URL`.
- Homepage, archive, About, privacy, and all six article URLs returned HTTP 200.
- CSS, original SVG illustration and favicon returned HTTP 200 with appropriate content types; the homepage illustration decoded in the browser.
- Custom missing-page route and `/writing/draft-example/` returned HTTP 404 and the site's own not-found page.
- RSS parsed with six items, and all tested RSS site/article/GUID URLs use the deployed origin.
- Sitemap parsed with ten URLs, all on the deployed origin. Homepage canonical is `https://myblog-wheat-nu.vercel.app/`, with no localhost reference.
- `robots.txt` currently permits indexing and points to the correct sitemap. The production homepage has no noindex directive: sample content is public and indexable.
- Live source checks found no active analytics script, email signup form, or comment loader; inactive-service messages are displayed.
- Security headers checked: `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`.
- Fifteen browser layout cases passed: homepage, archive, illustrated article, table article, code article at 320, 375 and 1280px; no horizontal page overflow, one main heading per page, dates visible.
- Article and archive link navigation passed.
- Live keyboard-focus and lazy-image timing checks were limited by an inactive browser tab; do not report those as freshly passed. Earlier local keyboard checks passed. The inactive tab prevented reliable scroll-stability/focus waits, not HTTP delivery.
- No forms were submitted, no services enabled, and no Vercel settings changed during verification.
- Private build logs, selected Vercel Node runtime and exact deployed commit metadata were not inspected. The configured test gate and locally passing 13 tests are known; confirm cloud logs before making more specific claims.
- README/context were updated locally with permission after verification. They have not been committed or pushed as part of that step. A future push to main may trigger automatic Vercel redeployment; ask permission first.

## Deployment-readiness checkpoint

- Eleventy updated from 3.1.6 to 3.1.7; lockfile refreshed through npm.
- `npm audit` reports zero known vulnerabilities in the installed tree. This does not replace broader review or future audits.
- Clean `npm run check` succeeds with 13 tests.
- Vercel build command is now `npm run check`; output remains `_site`, installation remains `npm ci`.
- `site.isProduction` requires `VERCEL_ENV=production` and a non-local canonical origin. Only that state enables configured comments, signup and analytics.
- Local/development/preview builds remain noindex with all live service UI disabled even when identifiers and a real canonical domain are supplied.
- Privacy disclosures follow the same activation rules.
- The user chose to defer comment recovery work until comments are enabled; leave all optional service identifiers unset for the first deployment.
- First deployment may be publicly accessible and contain the sample articles; the user explicitly accepted that scope. This is not a finished personal-content launch.
- Local checks used Node 26.1.0. Verify the runtime selected by Vercel, and require the deployed build/tests to pass there before reporting compatibility.
- Further staging, committing, pushing, account changes and deployments require the user's separate approval. The first deployment has since been verified as described above; this readiness checkpoint records its prerequisites.

This is the handoff and decision record for continuing this project in another chat. It records actual implementation separately from proposed changes. It is not automatically loaded by every chat tool: open the correct workspace and explicitly ask the next assistant to read this file.

## Working repository

- The active project is the repository containing this file and `package.json`. Use its Git origin to confirm the correct project.
- An older local prototype may exist outside this repository. Do not use an outdated copy for development or deployment.
- Use a development location permitted by your environment. Do not bypass execution restrictions.
- Avoid concurrent editing/building from multiple machines in a synced folder.
- Local Git repository initialized on `main`; `origin` is `https://github.com/shiv292003/myblog.git`.
- The user confirmed a personal commit identity, saved only in this repository's Git configuration. Global/work Git identity was not changed.
- The remote was queried successfully and had no references during initial setup. This is a setup observation, not a guarantee about its later contents.
- Verify current commit/upload state using `git status`, `git log -1`, and the remote branch; do not infer a successful upload from the presence of this file.
- Initial upload verified: local and GitHub `main` matched commit `0652517b9e1174e14465c6d8c02eaef9fa81546c`.
- Readiness upload verified: local and GitHub `main` matched `9d4e73fdd75caed5c5a5624d0d59ee5d23d5299c`.
- Vercel is now connected and the core site is live; newsletter, comments and analytics remain disabled.

## User's goals and agreed choices

- Personal articles and blog posts, no fixed niche.
- Original design inspired by Paul Graham, Sam Altman, Kitchen Soap, Julia Evans, Zach Holman, and StaffEng; not a copy of their content or layout.
- Simple, sober, late-1990s/early-2000s character with modern readability and responsiveness.
- Black and white only, with serif reading type, dots, sketch/pencil-like marks, and old-web buttons. This replaces the earlier warm-paper/cream preference.
- Curated theme-based homepage, with a chronological archive as an additional view.
- Eleventy, Markdown, Nunjucks, plain CSS; no browser framework or custom backend.
- Vercel hosting; custom domain still to be chosen and purchased.
- giscus comments, Buttondown newsletter, GoatCounter analytics.
- One light theme; no dark mode for now.
- RSS included. Search, accounts, CMS, automatic newsletter sending, and scheduled publishing deferred.
- User is a beginner; explain decisions and publishing steps clearly.

Reference URLs supplied by the user:

- https://www.paulgraham.com/arc.html
- https://blog.samaltman.com/
- https://www.kitchensoap.com/
- https://jvns.ca/
- https://zachholman.com/posts/cold-email
- https://staffeng.com/stories/

## Current implementation

- Quest identity, with a `Q` monogram and the owner's confirmed public information.
- Pure black/white authored palette, Georgia headings/prose, Verdana controls, Courier labels, and a system handwriting-font fallback for margin notes.
- Dotted outer paper, double rules, square monogram, compact masthead/navigation, original notebook/pencil SVG, and monochrome code styling.
- Homepage introduction, four topic groups, notebook-style sidebar, public profiles, and follow area. Pinned-essay UI appears only when articles are published.
- Raised/inset CSS buttons with hover/pressed states and 44px minimum height; mobile article dates remain visible.
- Article layout, archive, About with dotted portrait, Follow guide, privacy disclosure, custom 404.
- Zero published articles; six samples and the original draft are retained as excluded examples.
- Themes: `books`, `technology`, `projects`, `life`.
- Permanent article paths: `/writing/<slug>/`.
- RSS is summaries and links, not full article content.
- Sitemap and robots output; canonical/Open Graph text metadata; SVG favicon.
- Build-time code syntax highlighting, print styles, skip link, visible keyboard focus, reduced-motion support.
- Optional services are explicitly unconfigured in the UI until public identifiers are supplied.
- Comments load on request rather than on initial page load.
- Newsletter form submits directly to Buttondown; it does not automatically send published posts.
- Static output is generated into `_site`. It is not source content.
- No new design dependency, Three.js, canvas/WebGL, web font, or animation runtime was added. CSS and a roughly 2KB SVG meet the visual brief without changing the deployment architecture. Eleventy was subsequently patched to 3.1.7 for deployment readiness.
- Tests no longer require four specific published titles. Public output is checked dynamically; an in-memory virtual template exercises code and integration rendering.

### Build and reading flow

```text
Markdown + templates + CSS
            |
       Eleventy build
            |
 HTML + CSS + assets + RSS + sitemap
            |
        Vercel CDN
            |
      Reader's browser
            |
     optional services
```

GitHub source upload and the first Vercel deployment are verified. Future pushes to the connected production branch may trigger an automatic build and deployment.

### Commands

Run from the repository root:

```powershell
npm ci
npm run dev
npm run check
```

- Install only when dependencies need restoring/updating; they are currently present.
- Default preview: `http://localhost:8080`; always use the address printed by Eleventy. The monochrome preview previously used port 8081 because port 8080 was occupied. It was stopped with permission for clean pre-upload checks.
- `npm run check` performs a clean build and runs the Node test suite.
- `npm test` alone expects existing generated output.
- The editor's test discovery previously found no tests; npm/Node is the working runner.
- Stop the preview before running a clean build, because both use `_site`.
- Restart preview after deleting a post or changing a published post to a draft; watch mode does not reliably remove its old output.
- Do not assume a preview process survives between chats. Both assistant-owned review/design preview processes were stopped. Do not stop unrelated processes to reclaim port 8080.

### Pre-upload checks

During the guided Git setup on October 17:

- `npm run check` was rerun successfully: clean build and 11 passing tests.
- Git listed 37 project files eligible for the first commit.
- `node_modules`, `_site`, `.env`, and `.env.local` matched ignore rules; only `.env.example` is intended for version control.
- A targeted check of source, tests, example environment values and build configuration found no matches for the checked private-key/token/secret patterns. This is not a comprehensive secret audit.
- Known dependency advisories, live-service tests, local/preview analytics gating and Vercel deployment checks remain pending.
- Staging, committing, pushing and any further changes require the user's step-specific approval in this guided workflow.

### Configuration and content rules

- [Site data](src/_data/site.js): title, description, origin and indexing state.
- [Sections](src/_data/sections.js): ordered section IDs, display names and descriptions.
- [Environment example](.env.example): public integration identifiers and canonical site origin.
- `.env` files are not automatically loaded. Set environment variables in the shell or Vercel.
- giscus requires all four `GISCUS_*` values together.
- No private credentials are needed in browser code. Do not store account passwords/tokens here.
- Article metadata: title, lowercase hyphenated slug, YAML date, known section, description, and optional Boolean draft/featured/sample flags.
- `draft: true` excludes the page and collections. Omitted/false draft flags permit publication; future dates do not schedule it.
- A draft in a public repository is still readable as source.
- Changing a title does not change its URL; changing the slug does.
- Marking several articles featured selects the newest; no featured flag falls back to the newest post.

## Latest implementation: monochrome notebook

The user asked to implement a more creative black-and-white design with sample articles. Dots, pencil/sketch elements and optional Three.js were suggested; deployment simplicity remained important.

Completed:

- Replaced the warm editorial design with the monochrome notebook direction described above.
- Added [notebook.svg](src/assets/notebook.svg), an original spiral-notebook and pencil illustration using only black/white, dots and hatching.
- Updated homepage, global layout, newsletter, article details, favicon and the shared stylesheet.
- Added [unfinished-thoughts.md](src/posts/unfinished-thoughts.md) and [small-things-worth-keeping.md](src/posts/small-things-worth-keeping.md), bringing the published samples to six.
- Added actual sample blogroll links and functional RSS/About footer badges.
- Retained responsive layouts, semantic links, keyboard focus, reduced-motion handling, RSS, draft rules and print styles.
- Replaced sample-count/title-dependent tests with output-based checks and an in-memory rendering fixture; added a black/white palette regression check.
- Kept the current packages and Vercel configuration unchanged. Deployment-related findings below still require follow-up.

Verification for this implementation:

- `npm run check`: clean build and 11 tests passed.
- 25 browser layout checks: homepage, archive, illustrated article, table article and code article at 320, 375, 768, 1024 and 1440px.
- All checked pages returned HTTP 200, had one main heading, no horizontal page overflow, visible dates and successfully decoded images after scrolling lazy-loaded images into view.
- Native subscription form rendered from the real template was checked at 320, 768 and 1280px: no overflow, email validation works, submit button height is 44px. No subscription was submitted; external submission requests were blocked during the check.
- Keyboard skip-link order, article/archive navigation, two archive-year groups, button hover colors and minimum button height passed browser checks.
- Checked rendered archive colors: black, white and transparent only. Source tests cover the stylesheet and both SVG assets.
- RSS parsed with 6 items; sitemap parsed with 10 URLs.
- Final generated output: 18 files, 84,141 bytes (file sizes, not a network performance benchmark).
- Current preview returns HTTP 200 at port 8081; excluded draft URL returns 404.
- A fresh JavaScript-disabled browser context could not be created because of the browser tool's session-affinity restriction. Do not claim a new no-JavaScript browser test passed. The design uses static HTML/CSS/SVG and adds no reading/navigation script.
- A generated temporary form-test page was removed after checking it. No test fixture is published.

The following historical pending items are now resolved by the deployment-readiness checkpoint: dependency patch evaluation and local/preview service gating. Still pending: final identity and real content, comment recovery before enabling comments, actual service accounts/configuration, and verified Vercel deployment.

## Earlier review request and scope (historical)

On October 17, the user asked for:

1. A review of every project file and suggestions before deployment.
2. More late-1990s/early-2000s visual character, especially buttons.
3. A persistent context file for continuing in a new chat.

That earlier review did not change application code or deploy anything. It added the initial context record and README updates. The historical findings below document the starting point; the latest implementation section above takes precedence for current design, tests, and mobile-date behavior.

## Earlier design proposal (superseded by monochrome implementation)

Diagnosis: the current big italic hero, generous spacing, featured card, tiny uppercase labels, and promotional newsletter language feel more like a modern literary magazine than an early personal homepage.

Recommended next iteration:

- Keep warm paper and readable serif articles.
- Use a compact masthead with the owner's name and one honest introductory sentence.
- Reduce the hero substantially; make actual article links visible near the top.
- Use a roughly 840-920px responsive shell, not rigid table layouts.
- Use Georgia for reading, Verdana/Tahoma for navigation and forms, and restrained monospace dates.
- Make links visibly underlined with a deliberate visited-link color. Consider deep blue links, muted plum visited links, and rust as a secondary accent.
- Use compact tab-like navigation or bracketed text links; preserve real anchor semantics.
- Use slightly raised, square, warm-gray buttons for actions: light top/left border, darker bottom/right border, and an inset pressed state.
- Keep button labels readable and touch targets comfortable; do not literally recreate tiny 1990s controls.
- Style email inputs as simple inset fields. Do not turn every link into a button.
- Replace the large featured card with a compact "Start here" row.
- Retain themed writing lists with dates visible on phones.
- Replace promotional copy with direct labels such as "Get new posts by email".
- Add at most a few purposeful period details: small RSS/HTML badges, a real "Elsewhere" blogroll, or an author-maintained "Last updated" note.
- If using "NEW", derive it from publication dates rather than leaving it permanently attached.
- Keep small badges secondary, legible and functional. No fake visitor counts, flashing text, marquees, fake OS desktop, custom cursor, or copied browser branding.
- Keep accessibility, mobile layout, HTTPS, RSS, fast static output, and no-JavaScript reading.

Concept sketch, not an implementation:

```text
YOUR NAME'S HOMEPAGE
Personal essays, notes, and things I am learning.
------------------------------------------------
[ Home ] [ Archive ] [ About ]             [ RSS ]

Start here: A short introduction to this space

WRITING
On living
  12 Oct 2026   An ordinary afternoon

On learning
  08 Oct 2026   Keeping questions

On making
  15 Oct 2026   A small corner of the internet

ELSEWHERE                         SUBSCRIBE
A few sites worth reading        [email address] [Subscribe]
------------------------------------------------
[ RSS ] [ HTML + CSS ]   Updated: actual date
```

## Earlier review findings and priorities

Current status: sample-count/title coupling and hidden mobile dates were addressed in the redesign; environment gating, dependency patching and the deployment test gate were addressed during readiness work. Comment recovery, real content and live deployment checks remain open. Some deliberately secondary edition/badge text remains 10-11px; navigation, dates, controls and article text are larger.

### Address before a public launch

1. **Decouple tests from sample content.** [Tests](tests/site.test.js) assert four specific articles, sample labels, fixed dates and section IDs. Replacing the samples with real writing will fail otherwise healthy checks. Use isolated fixtures for known-content assertions and content-derived invariants for the real site.
2. **Separate environment from canonical URL.** [Site data](src/_data/site.js) identifies local builds by the hostname in `SITE_URL`; [the base template](src/_includes/layouts/base.njk) gates analytics on `not site.noindex`. With a real `SITE_URL` during local/development execution, `noindex` is false and configured analytics can run. Reproduced in this review with `VERCEL_ENV=development`. Add explicit build-context gating and tests.
3. **Restore mobile dates and increase utility text.** [CSS](src/assets/style.css) hides `.post-row-end time` below 900px, including every date in the chronological archive. Browser checks confirmed zero visible archive dates at 375px versus four at 1280px. Several labels are 8-11px. Keep dates visible and increase important labels to readable sizes while making layout compact.
4. **Review the available dependency patch.** Installed Eleventy is 3.1.6. The registry now offers 3.1.7 within the existing range; `npm audit` offers fix availability. Its dependency graph differs from 3.1.6. Upgrade deliberately, rerun checks/audit, and do not assume it fixes every advisory until verified. No package changes were made during this review.
5. **Complete real content and disclosures.** Replace the starter About text, sample essays, placeholder identity, and unfinished privacy/contact section. Choose the actual domain and canonical origin. Do not present fabricated author information.
6. **Make checks part of deployment after fixing the tests.** [Vercel config](vercel.json) currently runs `npm run build`, not the tests. Prefer `npm run check` once tests support real content, or an equivalent required CI check.

### Address before enabling the affected service

- **Comment recovery:** [comments.js](src/assets/comments.js) has a script-error retry, but no stalled-load timeout or iframe-ready/error handling. Loading the script is not proof that comments are usable. Status text says to visit GitHub Discussions, but the clickable link exists only inside `<noscript>` in [the article layout](src/_includes/layouts/post.njk), so a JavaScript-enabled reader with a failed service gets no direct fallback link. Add an always-available discussion link and test blocked/stalled requests.
- **No-JavaScript comment control:** the load button is rendered even with JavaScript disabled. Hide it until enhanced or provide a plain link-first experience.
- **Live subscriptions/comments/analytics:** current tests validate rendered configuration only, not real account-backed operations. Test with the user's actual accounts before calling them working.
- **Preview isolation:** previews exclude analytics when Vercel identifies them as previews, but comments and newsletter forms can still use real accounts. Choose environment-scoped variables or explicit gates so previews do not accidentally create live comments/signups.

### Worth considering, not launch blockers

- Full-content RSS if the user wants to let readers stay in their feed reader; keep relative links/images correct if added.
- An optional updated date for revised essays; do not equate build time with editorial revision time.
- A text-based social share image after the identity is final.
- A pinned Node LTS major matching Vercel, rather than the broad `>=22` range. Local checks currently ran on Node 26.1.0, not an explicitly selected LTS.
- New tests for empty sites, multiple archive years, long titles, ampersands/XML, missing section anchors, draft transitions, disabled JavaScript, and integration failure states.
- Local image optimization remains manual until images are actually introduced.
- Keep the project static; no new framework, UI library, database or custom newsletter backend is warranted.

## Earlier file-by-file review inventory

All 33 project-owned files existing at the time of the initial review were reviewed. This table is a historical snapshot, not a current list of unresolved issues. The later redesign added this context file plus an SVG and two articles. Source/configuration/docs were read; the generated lockfile was examined programmatically for versions, package metadata, registry/integrity entries, and advisory status. Installed dependency source and generated copies are not separate hand-authored files to review line by line.

| File | Review result / suggested action |
|---|---|
| [.env.example](.env.example) | Public identifiers only; clearly document that it is not auto-loaded. Keep actual secrets out. |
| [.gitignore](.gitignore) | Appropriate generated/dependency/environment exclusions; retain. |
| [clean.mjs](clean.mjs) | Cleanup is scoped to generated output; retain. Watch-mode stale output remains documented. |
| [eleventy.config.js](eleventy.config.js) | Simple build pipeline, autoescaping and useful validation; keep. Expand behavior tests rather than adding abstractions. |
| [package.json](package.json) | Minimal dependencies and useful commands; consider a shared Node LTS major and the available Eleventy patch. |
| [package-lock.json](package-lock.json) | 133 entries including root; dependency entries have registry URLs/integrity and are dev-only. Installed versions/advisories recorded below. |
| [vercel.json](vercel.json) | Static output configuration is reasonable. Test gate and deployed redirects/404/headers need verification. |
| [README.md](README.md) | Useful setup guide; linked this record and corrected the stale dependency/local-analytics wording. |
| [src/_data/site.js](src/_data/site.js) | Placeholder identity; separate runtime/build context from canonical URL. |
| [src/_data/sections.js](src/_data/sections.js) | Clear ordered taxonomy. Rename with the user; keep a single default export for Eleventy data loading. |
| [src/_data/integrations.js](src/_data/integrations.js) | Validates public identifiers and rejects partial giscus config; retain. Consider preview-specific activation. |
| [src/_includes/layouts/base.njk](src/_includes/layouts/base.njk) | Sound semantic shell; make masthead/nav compact and retro, fix analytics gating, update monogram with identity. |
| [src/_includes/layouts/page.njk](src/_includes/layouts/page.njk) | Reusable simple layout; replace hardcoded fallback identity with site data when personalizing. |
| [src/_includes/layouts/post.njk](src/_includes/layouts/post.njk) | Reading layout is worth keeping; improve comment fallback and optionally support updated dates. |
| [src/_includes/newsletter.njk](src/_includes/newsletter.njk) | Native accessible form structure; simplify copy and apply restrained inset/beveled controls. |
| [src/assets/style.css](src/assets/style.css) | Main redesign surface; shrink hero, emphasize links, restore dates, enlarge small text, retain responsive/print/focus rules. |
| [src/assets/comments.js](src/assets/comments.js) | On-demand loading is good; improve stalled/error UX and real readiness checks. |
| [src/assets/favicon.svg](src/assets/favicon.svg) | Small and lightweight; personalize later, optionally use squarer old-web styling. |
| [src/index.njk](src/index.njk) | Correct themed lists and empty-state handling; replace hero/card-heavy hierarchy with an inviting directory. |
| [src/archive.njk](src/archive.njk) | Clear newest-first archive; restore mobile dates and test multiple years. |
| [src/about.njk](src/about.njk) (formerly `src/about.md`) | At review time, entirely starter copy; subsequently personalized and converted to Nunjucks. |
| [src/privacy.njk](src/privacy.njk) | Conditional disclosures are useful; finish owner contact and review actual service setup. |
| [src/404.njk](src/404.njk) | Useful return links; keep and verify deployed HTTP 404 behavior. |
| [src/feed.njk](src/feed.njk) | Parsed correctly; summary feed is intentional. Full-content feed is optional. |
| [src/sitemap.njk](src/sitemap.njk) | Parsed correctly and contains current public routes. New standalone pages need adding to its explicit list. |
| [src/robots.njk](src/robots.njk) | Follows site indexing state; fix environment distinction upstream. Robots/noindex are not access control. |
| [src/posts/posts.11tydata.js](src/posts/posts.11tydata.js) | Stable slug URLs and draft exclusion; retain. Publication is opt-out unless draft is explicitly true. |
| [src/posts/draft-example.md](src/posts/draft-example.md) | Useful excluded writing template and privacy warning; retain or move to fixtures later. |
| [src/posts/keeping-questions.md](src/posts/keeping-questions.md) | Clearly labeled sample; replace with real writing before launch. |
| [src/posts/make-less.md](src/posts/make-less.md) | Clearly labeled sample and code-rendering example; move testing coverage to fixtures when replacing it. |
| [src/posts/ordinary-afternoon.md](src/posts/ordinary-afternoon.md) | Clearly labeled sample; replace. |
| [src/posts/the-case-for-a-small-corner.md](src/posts/the-case-for-a-small-corner.md) | Clearly labeled featured sample; replace and choose a real featured article. |
| [tests/site.test.js](tests/site.test.js) | All ten current tests pass, but sample coupling and behavior coverage gaps need addressing. |

## Earlier review verification on 2026-10-17 (before redesign)

- `npm run check`: clean build succeeded; 10 tests passed.
- Generated output: 15 files, 57,473 bytes total, before optional services. This is file size, not a measured network/performance score.
- RSS parsed as XML with 4 items; sitemap parsed with 8 URLs.
- Browser checks at 375px and 1280px for homepage, archive and a code-containing article: no horizontal overflow.
- Browser inspection confirmed mobile archive dates are hidden and utility text includes 8-11px sizes.
- Programmatic check confirmed canonical-domain local/development configuration has `noindex: false`.
- `npm audit`: 9 advisories reported across the current build dependency tree (5 high, 4 moderate); this count includes propagation through parent packages, not nine independent root flaws.
- `npm outdated` / registry metadata: Eleventy 3.1.6 installed, 3.1.7 wanted/latest; syntax highlighting plugin 5.0.2 installed/latest.
- Lockfile metadata check found no dependency entries lacking integrity or outside the npm registry, and all dependency entries were development-only.
- No live email, comments, analytics, DNS, hosting or production authentication flows were exercised.
- This was a general code/design review, not a dedicated exploitability/security audit.

## Next work, in order

1. Commit and push this approved update; verify local and remote commit IDs rather than inferring upload from this snapshot.
2. Check that Vercel has published the new version; the user has authorized this release, not unrelated future publishing changes.
3. Verify the new live identity, portrait, Follow guide, raw feed, and HTTP 404 for previously published sample URLs after redeployment.
4. Review the private Vercel build log/runtime with the user, without asking for secrets.
5. Add the user's first real article when supplied. Custom domain remains optional.
6. Keep optional service identifiers unset. Finish comment recovery before enabling comments.
7. Connect service accounts/domain only with authorization, and test real signup, unsubscribe, comments and analytics flows.

Unresolved at release preparation: confirmation of the new GitHub upload/deployment, first real writing, optional custom domain, service account identifiers, and private cloud build-log/runtime confirmation. Owner identity, biography, topics, contact, portrait and publishing this release are approved. The production origin is verified; a custom domain is optional.

Keep this record current after meaningful decisions, implementations and checks. Record completed work as completed only after verification; leave proposals marked pending.
