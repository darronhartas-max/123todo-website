# 123 ToDo Website Development Plan

## Project Overview
Transform 123todo.com from a single-page app into a full marketing website with integrated React app.

## Tech Stack
- **Framework**: Astro 5.x
- **Theme**: AstroWind (landing page template)
- **Styling**: TailwindCSS
- **App**: React 19.1.1 (existing 123todo app)
- **Blog**: Markdown/MDX with content collections
- **Deployment**: Docker on existing VPS

## Site Structure

### Pages

1. **Home (/)**
   - Hero section with app demo/screenshot
   - Key features showcase (3-4 features)
   - Benefits section
   - Testimonials/social proof
   - CTA to /app
   - Recent blog posts

2. **App (/app)**
   - Full React 123todo application (embedded)
   - Same functionality as current 123todo.com
   - No chrome/navigation (just the app)

3. **About (/about)**
   - Story behind 123 ToDo
   - Mission and vision
   - Why we built it
   - Team info (optional)

4. **User Guide (/guide)**
   - Getting started
   - Features walkthrough with screenshots
   - Tips & tricks
   - FAQ section
   - Keyboard shortcuts
   - PWA installation instructions

5. **Blog (/blog)**
   - Blog post listing
   - Categories/tags
   - Search (optional)
   - Individual post pages (/blog/[slug])

6. **Terms (/terms)**
   - Terms of service
   - User responsibilities
   - Data handling
   - Liability disclaimers

7. **Privacy (/privacy)**
   - Privacy policy
   - Data collection (localStorage only)
   - No tracking statement
   - GDPR compliance

## Content Strategy

### Home Page Content
- **Hero**: "Simple, Powerful Task Management"
- **Subtitle**: "Organize your life with priority-based tasks, offline support, and achievement tracking"
- **Features**:
  - Priority-Based Organization (4 levels)
  - Offline PWA Support
  - Achievement Milestones
  - Zero Tracking / Privacy-First
  - Export/Import Data
  - Beautiful & Fast

### Blog Topics (Initial Posts)
1. "Why We Built 123 ToDo: A Privacy-First Task Manager"
2. "Getting the Most Out of Priority-Based Task Management"
3. "How to Use 123 ToDo as a PWA on Your Phone"
4. "Productivity Tips: The 4-Level Priority System"
5. "Your Data, Your Control: Why Local Storage Matters"

## Technical Implementation

### File Structure
```
123todo-website/
├── src/
│   ├── components/
│   │   ├── widgets/        # AstroWind components
│   │   └── TodoApp.jsx     # Embedded React app
│   ├── content/
│   │   ├── blog/           # Blog posts (MDX)
│   │   └── config.ts       # Content collections config
│   ├── layouts/
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── index.astro     # Home
│   │   ├── app.astro       # Todo app page
│   │   ├── about.astro
│   │   ├── guide.astro
│   │   ├── terms.astro
│   │   ├── privacy.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── config.yaml         # Site config
└── public/
    └── app-assets/         # Screenshots, etc.
```

### React App Integration
1. Extract TodoApp component from existing app
2. Make it embeddable (remove outer chrome if needed)
3. Import in Astro with `client:load` directive
4. Maintain all existing functionality

### SEO Strategy
- Meta tags for all pages
- OpenGraph images
- Sitemap generation (built-in)
- Fast loading (<3s)
- Mobile-first responsive

## Deployment Plan

### Option 1: Subdomain (Recommended)
- Main site: `www.123todo.com` (Astro)
- App: `app.123todo.com` (Current React app)
- Easier to manage separately

### Option 2: Single Domain
- Main site: `123todo.com` (Astro)
- App embedded at: `123todo.com/app`
- Requires routing configuration

## Timeline Estimate

1. **Phase 1: Setup & Structure** (Current)
   - ✅ Install Astro + AstroWind
   - ✅ Add React integration
   - ⏳ Configure routing
   - ⏳ Set up content collections

2. **Phase 2: Content Creation**
   - Write all page content
   - Create blog posts
   - Prepare screenshots/assets

3. **Phase 3: Integration**
   - Embed React app
   - Style consistency
   - Navigation setup

4. **Phase 4: Deployment**
   - Build & test locally
   - Docker containerization
   - VPS deployment
   - DNS configuration

## Next Steps

1. Configure site settings (domain, metadata)
2. Create page layouts
3. Write content for each page
4. Extract and embed React app
5. Create initial blog posts
6. Test and deploy

---

**Created**: 2025-10-10
**Last Updated**: 2025-10-11
**Status**: ✅ Deployed to Production

## Deployment Information

### Live URLs
- **Marketing Website**: https://www.123todo.com
- **React App**: https://app.123todo.com

### Deployment Configuration
- **VPS IP**: 51.195.136.55
- **SSH Port**: 9947
- **Deploy Path (Marketing)**: `/home/debian/wordpress-docker/todo-app/`
- **Deploy Path (React App)**: `/home/debian/wordpress-docker/app-123todo/`
- **Deployment Method**: FileZilla upload + Docker rebuild

### Current Deployment (2025-10-11)
- ✅ All 7 custom blog post SVG images deployed
- ✅ Updated blog post markdown files
- ✅ Optimized images (compressed 146-312kB → 12-110kB)
- ✅ 42 pages generated
- ✅ Blog posts: Introducing 123 ToDo, Task Prioritization, Beginner's Guide, Building Habits, Spring Clean, Small Steps, Work-Life Balance

### Deployment Process
1. Build: `npm run build` (generates `dist/` folder)
2. Upload: FileZilla to `/home/debian/wordpress-docker/todo-app/`
3. Rebuild: `docker compose build --no-cache todo-app`
4. Restart: `docker compose up -d todo-app`
