import React from "react";
import BlogPost from "../../../src/components/BlogPost";
import BlogLayout from "../../../src/components/BlogLayout";
import { getBlogPost, getAllBlogPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { BlogPostStructuredData, BreadcrumbStructuredData } from "../../../components/StructuredData";

// Generate static params for all blog posts at build time using SEO-friendly slugs
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
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
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', url: 'https://rajatvijay.in' },
    { name: 'Blog', url: 'https://rajatvijay.in/#blog' },
    { name: post.title, url: `https://rajatvijay.in/blog/${post.slug}` }
  ];

  return (
    <BlogLayout>
      <BlogPostStructuredData
        title={post.title}
        excerpt={post.excerpt}
        date={post.date}
        slug={post.slug}
        readingTime={post.readTime}
        tags={post.tags}
        author={post.author}
      />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <BlogPost {...post} content={post.content || ''} />
    </BlogLayout>
  );
}

// Enable static generation
export const dynamic = 'force-static';