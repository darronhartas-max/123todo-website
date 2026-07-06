# 123 ToDo - Marketing Website (v2.0.1)

This repository contains the marketing website for **123 ToDo**, a free, privacy-first task management application.

## Overview

The website is built with [Astro 5.0](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/) for lightning-fast performance and SEO optimization. It serves as the landing page and documentation hub for the 123 ToDo web application.

- **Live Marketing Site**: https://www.123todo.com
- **Web App**: https://app.123todo.com

## Latest Features (v2.0.1)

Version 2.0.1 introduced a massive upgrade to the application, and the marketing website has been updated to reflect these new capabilities:

- **Google Drive Sync**: Seamless, cross-device synchronization using personal Google Drive storage.
- **Client-Side Encryption**: Zero-knowledge AES-256-GCM encryption ensures data is encrypted locally before syncing.
- **Silent Authentication**: Persistent sign-in across sessions.
- **Invisible Syncing**: Background push/pull architecture.

## Development

```shell
# Install dependencies
npm install

# Start local dev server at localhost:4321
npm run dev

# Build for production
npm run build
```

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/actions.yaml`). Pushing to the `main` branch will automatically:

1. Build the Astro project.
2. Transfer files to the VPS (`51.195.136.55`) via SCP.
3. Rebuild and restart the Docker container (`todo-app`) via SSH.

_Note: The website is deployed to the `todo-app` container, which Traefik routes from `123todo.com` and `www.123todo.com`._
