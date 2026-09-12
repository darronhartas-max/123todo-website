# Deployment Reminders

When making changes to the 123todo-website codebase (especially adding blog posts, updating changelogs, or editing pages), always remember to `git push` the changes to the `main` branch when finished. The repository is configured with a GitHub Action that automatically deploys the site to the live VPS upon a push to `main`.

# Public Changelog (`/changelog`)

The public changelog data resides in `src/data/changelog.json` and is rendered dynamically by `src/pages/changelog.astro`.

- Whenever a new version is released in `123todo-react`, running `npm run build` in the React app automatically synchronizes the new version entry into `src/data/changelog.json`.
- To deploy the updated changelog to `https://www.123todo.com/changelog`, verify with `npm run check && npm run build`, then commit `src/data/changelog.json` and push to `main`.

# Service Worker Caching Context

The domain `www.123todo.com` was previously used to host the 123todo React app, which installed a service worker. Because of this, returning visitors may have a rogue service worker intercepting navigation requests (like `/blog`) and improperly rendering the React app instead of the Astro website. An inline script in `Layout.astro` handles unregistering it, but keep this context in mind if cache issues are reported.
