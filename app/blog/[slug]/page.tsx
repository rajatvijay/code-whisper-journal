import React from "react";
import BlogPost from "../../../src/components/BlogPost";
import BlogLayout from "../../../src/components/BlogLayout";
import { getBlogPost, getAllBlogPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";

// Generate static params for all blog posts at build time using SEO-friendly slugs
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Static site generation - this runs at build time
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogLayout>
      <BlogPost {...post} />
    </BlogLayout>
  );
}

// Enable static generation
export const dynamic = 'force-static';