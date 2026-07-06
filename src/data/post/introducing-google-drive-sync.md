---
publishDate: 2026-07-06T00:00:00Z
title: 'New Feature: Seamless Google Drive Sync'
excerpt: 'Keep your tasks backed up and synced across all your devices with our new privacy-first Google Drive integration featuring Zero-Knowledge Encryption.'
image: ~/assets/images/blog-launch-rocket.svg
category: Announcements
tags:
  - launch
  - features
  - privacy
  - updates
author: 123 ToDo Team
metadata:
  canonical: https://www.123todo.com/introducing-google-drive-sync
---

## Take Your Tasks Anywhere

We built 123 ToDo with a core principle: your data belongs to you, and it never touches our servers. However, we heard your feedback loud and clear: you want to seamlessly use 123 ToDo across your phone, tablet, and laptop without manually exporting and importing files.

Today, we're thrilled to introduce **Google Drive Sync**!

## How It Works (With Zero-Knowledge Encryption)

Our new Google Drive Sync feature gives you the best of both worlds: the convenience of cloud synchronization and the absolute security of knowing we still don't have access to your data.

When you enable this feature, 123 ToDo connects directly from your device to your personal Google Drive account. But here is the best part: before your data ever leaves your device, it is encrypted using **military-grade AES-256-GCM encryption** combined with a custom passphrase that only you know.

### Why Google Drive?

- **Privacy First**: We don't act as a middleman. Your device talks directly to Google. We never see your tasks or your Google credentials.
- **Zero-Knowledge Encryption**: Because your tasks are encrypted with your secret passphrase _before_ being uploaded, not even Google can read your tasks!
- **Cross-Device Syncing**: Update a task on your phone, and thanks to our new "Smart Sync" technology, it will automatically check off on your laptop almost instantly when you switch back to it.
- **Automatic Backups**: Never worry about clearing your browser data or losing a device again.

## Getting Started

Setting up Google Drive sync takes just a few seconds:

1. Open **[app.123todo.com](https://app.123todo.com)**
2. Click the **"☁️ Google Drive Sync"** button in the footer of the app.
3. Click **Sign In with Google** and authorize the app.
4. **Enter your secure passphrase**. Make sure to remember this! You will need to enter the exact same passphrase on any other device you want to sync with.
5. Click **Start Syncing**.

That's it! Your tasks will now automatically push and pull in the background. When you want to connect your phone, just open the app there, tap the same footer button, log in, and provide your passphrase to decrypt your data.

## Still Free, Still Private

We want to reiterate our promise to you: 123 ToDo remains completely free and privacy-focused. Adding Google Drive Sync doesn't change our business model because we still don't have one! Since we aren't hosting the servers to sync your data, our costs remain exactly the same.

Enjoy the new feature, and let us know what you think!

---

## FAQs

**Q: Can 123 ToDo read all the files in my Google Drive?**
A: No. We use a specific, restricted permission that only allows the app to create and access its own specific hidden sync file in your Drive. It cannot see any of your other personal documents or photos.

**Q: Do I have to use Google Drive Sync?**
A: Absolutely not. 123 ToDo will continue to work perfectly as a local-only application. Google Drive Sync is an optional feature.

**Q: What if my devices get stuck and stop syncing?**
A: If you accidentally enter the wrong passphrase on one device, it won't be able to decrypt the tasks. Simply click the sync button to **Sign Out**, and then sign back in on both devices with the exact same passphrase to force a fresh connection.

**Q: Is there any cost for this feature?**
A: No, this feature is completely free, just like the rest of 123 ToDo.
