import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  categories: string[];
  content?: string;
  slug: string;
}

const contentDirectory = path.join(process.cwd(), 'content/blog');
const blogIndexPath = path.join(process.cwd(), 'content/blog-index.json');

// Get all blog post metadata (for index page) - FAST: reads only JSON file
export async function getAllBlogPosts(): Promise<Omit<BlogPost, 'content'>[]> {
  try {
    const indexContents = fs.readFileSync(blogIndexPath, 'utf8');
    const posts = JSON.parse(indexContents);
    
    // Sort by date (newest first)
    return posts.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog index:', error);
    return [];
  }
}

// Get a single blog post with content (for individual post page)
export async function getBlogPost(slugOrId: string): Promise<BlogPost | null> {
  try {
    // First, get metadata from the index
    const indexContents = fs.readFileSync(blogIndexPath, 'utf8');
    const posts = JSON.parse(indexContents);
    
    // Find the post by slug first (SEO-friendly), then by ID for backward compatibility
    const postMeta = posts.find((post: BlogPost) => 
      post.slug === slugOrId || post.id === slugOrId
    );

    if (!postMeta) {
      return null;
    }

    // Read the actual markdown file using the slug
    const markdownPath = path.join(contentDirectory, `${postMeta.slug}.md`);
    
    if (!fs.existsSync(markdownPath)) {
      console.error(`Markdown file not found: ${markdownPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { content } = matter(fileContents);

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content);

    return {
      ...postMeta,
      content: processedContent.toString()
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

// Get all unique categories from blog posts
export async function getAllCategories(): Promise<string[]> {
  try {
    const indexContents = fs.readFileSync(blogIndexPath, 'utf8');
    const posts = JSON.parse(indexContents);
    
    const categories = posts
      .flatMap((post: BlogPost) => post.categories || [])
      .filter((category: string) => category)
      .filter((category: string, index: number, array: string[]) => array.indexOf(category) === index)
      .sort();
    
    return categories;
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

// Get blog posts by category  
export async function getBlogPostsByCategory(category: string): Promise<Omit<BlogPost, 'content'>[]> {
  try {
    const allPosts = await getAllBlogPosts();
    return allPosts.filter(post => post.categories && post.categories.includes(category));
  } catch (error) {
    console.error('Error filtering posts by category:', error);
    return [];
  }
}

// Note: Additional utility functions for ID generation are available 
// but currently unused. These can be re-enabled as needed.

// Note: Client-side functions removed - using SSG instead for optimal performance