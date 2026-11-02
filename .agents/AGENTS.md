# Deployment Reminders

When making changes to the 123todo-website codebase (especially adding blog posts, updating changelogs, or editing pages), always remember to `git push` the changes to the `main` branch when finished. The repository is configured with a GitHub Action that automatically deploys the site to the live VPS upon a push to `main`.

# Public Changelog (`/changelog`) & Hero Graphic

The public changelog data resides in `src/data/changelog.json` and is rendered dynamically by `src/pages/changelog.astro`. The hero graphic illustrating the latest updates and roadmap resides in `src/assets/images/changelog-hero.svg`.

- Whenever a new version is released in `123todo-react`, running `npm run build` in the React app automatically synchronizes:
  1. The new release entry into `src/data/changelog.json`
  2. The latest version badge (`v<version> Live`), build count (`<count>+ Builds`), and roadmap phase in `src/assets/images/changelog-hero.svg`
- To deploy the updated changelog and graphic to `https://www.123todo.com/changelog`, verify with `npm run check && npm run build`, then commit both `src/data/changelog.json` and `src/assets/images/changelog-hero.svg` (along with any page edits) and push to `main`.
- Every release pushed must have its changelog page and graphic updated live.

# Sync Accuracy Guidelines (NEVER CLAIM "REAL-TIME" SYNC FOR CORE APP)

> [!IMPORTANT]
> **NEVER CLAIM "REAL-TIME" SYNC FOR THE CORE (FREE) APP.**
>
> - The core (free) app uses a 60-second periodic sync interval (with instant sync on app open and pull-to-refresh).
> - Stating "real-time sync" or "syncs in real time" is inaccurate and sets false expectations of sub-second WebSocket syncing.
> - Always describe it accurately: "Automatic Multi-Device Sync", "Automatic Cross-Device Sync", "Seamless Cloud Sync", or "Automatic 60-second background sync".
> - Note: Hardware audio features (such as continuous microphone voice dictation and spoken punctuation) truly process live and may be described as real-time audio.

# Service Worker Caching Context

The domain `www.123todo.com` was previously used to host the 123todo React app, which installed a service worker. Because of this, returning visitors may have a rogue service worker intercepting navigation requests (like `/blog`) and improperly rendering the React app instead of the Astro website. An inline script in `Layout.astro` handles unregistering it, but keep this context in mind if cache issues are reported.

# Writing Style & Copy Guidelines (NEVER USE EM DASHES)

> [!IMPORTANT]
> **NEVER USE EM DASHES (`—`) TO JOIN WORDS OR CLAUSES.**
>
> - Using em dashes (`—`) looks AI-generated and is a dead giveaway.
> - Never use `—` in website pages, blog posts, headings, titles, changelogs, UI copy, or documentation.
> - Always use a spaced hyphen (`-`) or standard punctuation (commas, parentheses, colons) instead.
