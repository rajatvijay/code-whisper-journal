# Blog Management Guide

This blog system uses markdown files with a separate metadata index for optimal performance.

## 📁 File Structure

```
content/
├── blog/                     # Markdown files for blog posts
│   ├── my-first-post.md
│   ├── another-post.md
│   └── ...
└── blog-index.json          # Metadata index (auto-generated)
```

## ✨ Adding a New Blog Post

### 1. Create the Markdown File

Create a new `.md` file in `content/blog/` with this structure:

```markdown
---
title: "Your Amazing Blog Post Title"
excerpt: "A brief description that appears on the index page"
date: "2024-03-20"
readTime: "7 min read"
tags: ["React", "JavaScript", "Tutorial"]
author:
  name: "Rajat Vijay"
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
---

# Your Blog Post Content

Write your blog content here using **Markdown**!

## Code Examples Work Great

\`\`\`javascript
const example = "This will be syntax highlighted";
console.log(example);
\`\`\`

## Features Supported

- GitHub-flavored markdown
- Syntax highlighting
- Tables, lists, links
- Images and media
- Code blocks
```

### 2. Update the Blog Index

After creating your markdown file, run this command to update the metadata index:

```bash
pnpm run blog:update
```

This will:
- ✅ Scan all markdown files in `content/blog/`
- ✅ Extract metadata from frontmatter
- ✅ Generate unique IDs for each post
- ✅ Update `content/blog-index.json`
- ✅ Sort posts by date (newest first)

### 3. Your Post is Live!

The blog will now:
- 🚀 **Fast index loading**: Uses the JSON index (no markdown parsing)
- 📱 **Client-side loading**: Individual posts load only when requested
- 🔍 **Search support**: Search by title, excerpt, and tags
- 🎨 **Styled content**: Full markdown rendering with syntax highlighting

## 🚀 Performance Benefits with SSG

### Previous Approaches
- **Client-side loading**: Fetch data after page loads = **SLOW** 🐌
- **Server-side on demand**: Process files on each request = **SLOW** 🐌

### Current: Static Site Generation (SSG)
- **Build time processing**: All pages generated during build = **BLAZING FAST** ⚡
- **Zero client-side requests**: Everything pre-rendered = **INSTANT** ⚡
- **CDN ready**: Static HTML/CSS/JS can be cached globally = **GLOBAL SPEED** 🌍

## 📝 File Naming Convention

- Use kebab-case: `my-awesome-post.md`
- Be descriptive: `react-hooks-complete-guide.md`
- Avoid spaces and special characters
- The filename becomes the slug: `/blog/react-hooks-complete-guide`

## 🏷️ Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ | Post title | `"Building Better React Apps"` |
| `excerpt` | ✅ | Short description | `"Learn advanced React patterns..."` |
| `date` | ✅ | Publication date | `"2024-03-20"` |
| `readTime` | ❌ | Reading time estimate | `"5 min read"` |
| `tags` | ❌ | Array of tags | `["React", "JavaScript"]` |
| `author` | ❌ | Author info | `{ name: "...", avatar: "..." }` |

## 🚀 Development Workflow

1. **Write**: Create your markdown file
2. **Update**: Run `pnpm run blog:update`
3. **Preview**: Start dev server with `pnpm dev`
4. **Publish**: Commit both the `.md` file and updated `blog-index.json`

## 🛠️ Advanced Usage

### Custom Post IDs
Post IDs are auto-generated from the filename. If you need custom IDs, modify the slug and run the update script.

### Bulk Operations
The `update-blog-index.js` script processes all markdown files, so you can:
- Add multiple posts at once
- Rename files
- Update metadata in bulk

### Content Management
- Keep drafts outside `content/blog/` until ready
- Use git branches for draft management
- Archive old posts by moving them to a subfolder

## 🔍 Troubleshooting

**Q: My new post doesn't appear**  
A: Run `pnpm run blog:update` to refresh the index

**Q: Post content not loading**  
A: Check that the markdown file exists and the slug matches

**Q: Search not working**  
A: Ensure the blog index is updated and contains proper metadata

**Q: Styling issues**  
A: Verify your markdown syntax and frontmatter format