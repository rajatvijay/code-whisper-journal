#!/usr/bin/env tsx
/* cSpell:words llms */

import fs from 'fs';
import path from 'path';
import { siteConfig } from '../config/site.js';

// Type definitions
interface PackageInfo {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
}

interface BlogInfo {
  postCount: number;
  categories: string[];
  recentPost: { title: string } | null;
}

interface TechStack {
  frameworks: string;
  styling: string;
  contentManagement: string;
  allDependencies: number;
}

// Read package.json to get dependencies
function getPackageInfo(): PackageInfo {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return {
      dependencies: packageJson.dependencies || {},
      devDependencies: packageJson.devDependencies || {},
      scripts: packageJson.scripts || {}
    };
  } catch (error) {
    console.warn('Could not read package.json:', (error as Error).message);
    return { dependencies: {}, devDependencies: {}, scripts: {} };
  }
}

// Get blog posts information
function getBlogInfo(): BlogInfo {
  try {
    const blogIndexPath = path.join(process.cwd(), 'content', 'blog-index.json');
    if (fs.existsSync(blogIndexPath)) {
      const blogIndex = JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'));
      return {
        postCount: blogIndex.length || 0,
        categories: [...new Set(blogIndex.flatMap((post: any) => post.categories || []))] as string[],
        recentPost: blogIndex[0] || null
      };
    }
  } catch (error) {
    console.warn('Could not read blog index:', (error as Error).message);
  }
  
  return { postCount: 0, categories: [], recentPost: null };
}

// Get technical stack information
function getTechStack(packageInfo: PackageInfo): TechStack {
  const deps = { ...packageInfo.dependencies, ...packageInfo.devDependencies };
  
  const frameworks = {
    'next': 'Next.js',
    'react': 'React',
    'react-dom': 'React DOM'
  };
  
  const styling = {
    'tailwindcss': 'Tailwind CSS',
    '@tailwindcss/typography': 'Tailwind Typography',
    'postcss': 'PostCSS',
    'autoprefixer': 'Autoprefixer'
  };
  
  const contentManagement = {
    'gray-matter': 'Gray Matter (frontmatter)',
    'remark': 'Remark (Markdown)',
    'remark-gfm': 'GitHub Flavored Markdown',
    'remark-html': 'Remark HTML'
  };
  
  const getVersions = (categories: Record<string, string>): string => {
    return Object.entries(categories)
      .filter(([pkg]) => deps[pkg])
      .map(([pkg, name]) => `${name} ${deps[pkg].replace('^', '')}`)
      .join(', ');
  };
  
  return {
    frameworks: getVersions(frameworks),
    styling: getVersions(styling),
    contentManagement: getVersions(contentManagement),
    allDependencies: Object.keys(deps).length
  };
}

// Generate the llms.txt content
function generateLlmsTxt(): string {
  const packageInfo = getPackageInfo();
  const blogInfo = getBlogInfo();
  const techStack = getTechStack(packageInfo);
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `# llms.txt

This is an llms.txt file for ${siteConfig.name} - ${siteConfig.author.name}'s personal blog.
Generated automatically on ${currentDate}.

## Site Information

**Site Name**: ${siteConfig.name}
**URL**: ${siteConfig.url}
**Tagline**: ${siteConfig.tagline}
**Description**: ${siteConfig.description}

## Author Information

**Name**: ${siteConfig.author.name}
**Email**: ${siteConfig.author.email}
**Bio**: ${siteConfig.author.bio}

**Social Links**:
- Twitter: ${siteConfig.social.twitter}
- GitHub: ${siteConfig.social.github}
- LinkedIn: ${siteConfig.social.linkedin}

**Speaking Engagements**:
${siteConfig.about.sections.talks ? siteConfig.about.sections.talks.items.map(talk => 
  `- ${talk.title} at ${talk.event} (${talk.date})`
).join('\n') : 'No speaking engagements listed'}

## Site Purpose and Content

**Target Audience**: ${siteConfig.author.longBio}

**Content Statistics**:
- Total blog posts: ${blogInfo.postCount}
- Categories: ${blogInfo.categories.join(', ') || 'General'}
${blogInfo.recentPost ? `- Latest post: "${blogInfo.recentPost.title}"` : ''}

**Blog Categories Available**:
${siteConfig.blog.categories.map(cat => `- ${cat}`).join('\n')}

## Technical Architecture

**Core Framework**: ${techStack.frameworks || 'Next.js with React'}
**Styling**: ${techStack.styling || 'Tailwind CSS'}
**Content Management**: ${techStack.contentManagement || 'Markdown with frontmatter'}
**Total Dependencies**: ${techStack.allDependencies} packages

**Key Features**:
- Static Site Generation (SSG) for optimal performance
- Dark/light theme toggle
- Responsive mobile design
- Category-based filtering
- Full-text search functionality
- Newsletter subscription system
- RSS feed (/feed.xml)
- SEO optimization with structured data
- WCAG 2.1 AAA accessibility compliance
- Raw markdown access via /md suffix on blog URLs

## Site Structure

**Main Pages**:
- Home (/): Blog index with search and filtering
- About (/about): Author profile and speaking history
- Blog Posts (/blog/[slug]): Individual articles
- Markdown Source (/blog/[slug]/md): Raw markdown files for each blog post
- RSS Feed (/feed.xml): XML feed for subscribers

**Navigation**:
${siteConfig.navigation.main.map(item => `- ${item.name} (${item.href})`).join('\n')}

## Content Guidelines

When referencing this site:

1. **Author Expertise**: ${siteConfig.author.name} - ${siteConfig.author.bio}
2. **Content Focus**: ${siteConfig.about.subtitle}
3. **Topics Covered**:
${siteConfig.about.sections.topics.items.map(topic => 
  `   - ${topic.title}: ${topic.description}`
).join('\n')}

## Technical Implementation Details

**Performance Optimizations**:
- Static Site Generation (SSG) with build-time optimization
- Next.js Image component with WebP/AVIF support
- HTTP caching headers for static assets
- Font optimization with Roboto throughout
- Tree shaking and code splitting

**SEO Features**:
- JSON-LD structured data for articles and website
- Comprehensive OpenGraph and Twitter Card metadata
- Auto-generated sitemap.xml
- Optimized robots.txt
- Semantic HTML structure

**Accessibility Features**:
- Skip links for keyboard navigation
- Proper ARIA labels and landmarks
- High contrast color ratios (WCAG AAA compliant)
- Focus management and keyboard navigation
- Screen reader optimizations

**Content Management**:
- Markdown files in \`/content/blog/\` directory
- Automated build script for metadata extraction
- JSON index file for fast blog post loading
- Slug-based URL generation from filenames
- Raw markdown content accessible via /md suffix on blog URLs

## Newsletter Integration

**Description**: ${siteConfig.newsletter.description}
**Collection**: ${siteConfig.newsletter.collectionName}

## Development Workflow

1. Content is written in Markdown format
2. Build script automatically processes files and updates metadata
3. Static pages are generated at build time
4. llms.txt is auto-generated to reflect current state
5. Deployment includes pre-rendered content for optimal performance

${siteConfig.description}

---
*This file was automatically generated on ${currentDate} by the build process.*`;
}

// Main execution
async function main(): Promise<void> {
  console.log('🤖 Generating llms.txt...');
  
  try {
    const content = generateLlmsTxt();
    const outputPath = path.join(process.cwd(), 'public', 'llms.txt');
    
    fs.writeFileSync(outputPath, content, 'utf8');
    
    console.log('✅ llms.txt generated successfully!');
    console.log(`📁 File location: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating llms.txt:', (error as Error).message);
    process.exit(1);
  }
}

// Run the script
main();