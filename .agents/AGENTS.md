# Deployment Reminders

When making changes to the 123todo-website codebase (especially adding blog posts or editing pages), always remember to `git push` the changes to the `main` branch when finished. The repository is configured with a GitHub Action that automatically deploys the site to the live VPS upon a push to `main`.

# Service Worker Caching Context

The domain `www.123todo.com` was previously used to host the 123todo React app, which installed a service worker. Because of this, returning visitors may have a rogue service worker intercepting navigation requests (like `/blog`) and improperly rendering the React app instead of the Astro website. An inline script in `Layout.astro` handles unregistering it, but keep this context in mind if cache issues are reported.
