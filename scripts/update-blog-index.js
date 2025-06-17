#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content/blog');
const indexPath = path.join(__dirname, '../content/blog-index.json');

// Generate numeric ID from slug for consistency
function generateIdFromSlug(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % 1000 + 1; // Keep IDs between 1-1000
}

async function updateBlogIndex() {
  try {
    console.log('🔍 Scanning for markdown files...');
    
    if (!fs.existsSync(contentDir)) {
      console.error(`❌ Content directory not found: ${contentDir}`);
      process.exit(1);
    }

    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'))
      .sort();

    if (files.length === 0) {
      console.log('📝 No markdown files found.');
      return;
    }

    const blogPosts = [];

    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      const slug = file.replace(/\.md$/, '');
      const id = generateIdFromSlug(slug).toString();

      const post = {
        id,
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || '',
        readTime: data.readTime || '5 min read',
        category: data.category || 'General Thoughts',
        tags: data.tags || [],
        author: data.author || {
          name: 'Rajat Vijay',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        }
      };

      blogPosts.push(post);
      console.log(`✅ Processed: ${post.title} (${slug})`);
    }

    // Sort by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Write the index file
    fs.writeFileSync(indexPath, JSON.stringify(blogPosts, null, 2));
    
    console.log('');
    console.log(`🎉 Successfully updated blog index!`);
    console.log(`📊 Total posts: ${blogPosts.length}`);
    console.log(`📁 Index file: ${indexPath}`);
    
  } catch (error) {
    console.error('❌ Error updating blog index:', error);
    process.exit(1);
  }
}

// Run if called directly (ES module check)
if (import.meta.url === `file://${process.argv[1]}`) {
  updateBlogIndex();
}

export { updateBlogIndex };