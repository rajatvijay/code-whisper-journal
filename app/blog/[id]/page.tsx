import React from "react";
import BlogPost from "../../../src/components/BlogPost";
import BlogLayout from "../../../src/components/BlogLayout";
import { getBlogPost, getAllBlogPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    id: post.id,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id);
  
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
  };
}

// Static site generation - this runs at build time
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id);

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