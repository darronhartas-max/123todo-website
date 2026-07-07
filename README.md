# 123 ToDo - Marketing Website (v2.1.0)

This repository contains the marketing website for **123 ToDo**, a free, privacy-first task management application.

## Overview

The website is built with [Astro 5.0](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/) for lightning-fast performance and SEO optimization. It serves as the landing page and documentation hub for the 123 ToDo web application.

- **Live Marketing Site**: https://www.123todo.com
- **Web App**: https://app.123todo.com

## Latest Features (v2.1.0)

Version 2.1.0 introduced visual scaling and customization features, building on the Google Drive sync capabilities:

- **Appearance Preferences**: Font size adjustment slider (14px - 22px) that scales the layout proportionally.
- **Cozy & Compact Layouts**: Spacing density settings to reduce desktop clunkiness.
- **Desktop Kanban Mode**: Auto-transition of priority lists into side-by-side Kanban columns on desktop views.
- **Google Drive Sync**: Seamless, cross-device synchronization with AES-256 client-side encryption.

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
