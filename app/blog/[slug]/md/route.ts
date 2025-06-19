import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { notFound } from 'next/navigation';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    // Construct the path to the markdown file
    const filePath = join(process.cwd(), 'content', 'blog', `${slug}.md`);
    
    // Read the markdown file
    const fileContent = await readFile(filePath, 'utf-8');
    
    // Return the markdown content with appropriate headers
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Content-Disposition': `inline; filename="${slug}.md"`,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    // If file doesn't exist, return 404
    console.error('Error serving markdown file:', error);
    notFound();
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const { getAllBlogPosts } = await import('@/lib/markdown');
    const posts = await getAllBlogPosts();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for markdown routes:', error);
    return [];
  }
}