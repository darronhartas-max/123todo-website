# Blog Post Template for 123 ToDo

Copy this template to create new blog posts in `src/data/post/`

## Template File

```markdown
---
publishDate: 2025-10-10T00:00:00Z
title: 'Your Catchy Blog Post Title'
excerpt: 'A compelling one-sentence description that makes people want to read more. Keep it under 160 characters for SEO.'
image: ~/assets/images/blog-post-image.jpg
category: Announcements
tags:
  - productivity
  - tips
  - features
author: 123 ToDo Team
metadata:
  canonical: https://www.123todo.com/your-blog-post-slug
---

## Introduction

Start with a hook that grabs attention. Explain what this post is about and why readers should care.

## Main Section 1

### Subsection

Your content here. Use markdown formatting:

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- [Links](https://app.123todo.com) to other pages
- `inline code` for technical terms

### Another Subsection

More content with examples:

1. Numbered lists for steps
2. Second step
3. Third step

## Main Section 2

Include images, code blocks, and other rich content:

```javascript
// Code example
const example = "code block";
```

> Blockquotes for important callouts or quotes

## Conclusion

Wrap up your main points and include a call to action.

**[Try 123 ToDo Now →](https://app.123todo.com)**

---

## FAQs (Optional)

**Q: Common question?**
A: Your answer here.

**Q: Another question?**
A: Another answer here.
```

---

## Categories to Use

Choose one of these for consistency:
- **Announcements** - Product launches, major updates
- **Tutorials** - How-to guides, walkthroughs
- **Tips & Tricks** - Productivity advice, best practices
- **Updates** - Feature updates, improvements
- **Behind the Scenes** - Development stories, technical posts

## Tags to Use

Common tags for 123 ToDo blog posts:
- productivity
- privacy
- features
- tips
- launch
- pwa
- tutorial
- updates
- organization
- workflow

## Image Guidelines

1. Save images to: `src/assets/images/`
2. Recommended size: 1200x630px (optimal for social sharing)
3. Format: JPG or PNG
4. File naming: Use descriptive lowercase with hyphens (e.g., `blog-productivity-tips.jpg`)
5. Reference in frontmatter: `image: ~/assets/images/your-image.jpg`

## SEO Best Practices

1. **Title**: 50-60 characters, include keywords
2. **Excerpt**: 120-160 characters, compelling and descriptive
3. **Canonical URL**: Match your actual URL slug
4. **Images**: Use descriptive filenames and alt text
5. **Internal links**: Link to other pages (User Guide, About, etc.)

---

## Quick Workflow

### To Create a New Blog Post:

1. **Copy this template**
2. **Create new file**: `src/data/post/my-new-post.md`
3. **Update frontmatter** with your info
4. **Write content** in Markdown
5. **Add image** to `src/assets/images/` if needed
6. **Save file** - Astro auto-detects it
7. **Check preview**: Visit http://localhost:4321/blog
8. **Build and deploy** when ready

### To Edit Existing Blog Post:

1. **Open file** in `src/data/post/filename.md`
2. **Make changes** to frontmatter or content
3. **Save file**
4. **Rebuild and redeploy** to see changes live

---

## Current Blog Posts

Your existing blog posts in `src/data/post/`:
- `introducing-123-todo.md` (Launch announcement)
- `markdown-elements-demo-post.mdx` (Template example)
- `useful-resources-to-create-websites.md` (Template - can delete)
- `get-started-website-with-astro-tailwind-css.md` (Template - can delete)
- `landing.md` (Template - can delete)
- `astrowind-template-in-depth.mdx` (Template - can delete)
- `how-to-customize-astrowind-to-your-brand.md` (Template - can delete)

**Recommendation**: Delete the AstroWind template posts and keep only relevant 123 ToDo content.

---

## Blog URLs

Blog posts automatically generate URLs based on filename:
- File: `introducing-123-todo.md`
- URL: `https://www.123todo.com/introducing-123-todo`

The blog index is at: `https://www.123todo.com/blog`

---

## Markdown Cheatsheet

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold text**
*Italic text*
***Bold and italic***

[Link text](https://url.com)
![Image alt text](~/assets/images/image.jpg)

- Bullet point
- Another point

1. Numbered list
2. Second item

> Blockquote

`inline code`

```language
code block
```

---

Horizontal rule
```

---

**Ready to create your first blog post? Just copy the template above!**
