import React from "react";
import IndexClient from "../src/components/IndexClient";
import { getAllBlogPosts } from "@/lib/markdown";

// Server Component - runs at build time for SSG
export default async function Home() {
  // This runs at build time and pre-fetches all blog posts
  const posts = await getAllBlogPosts();
  
  // Pass the data to the client component
  return <IndexClient posts={posts} />;
}

// Enable static generation
export const dynamic = 'force-static';

// Generate metadata
export async function generateMetadata() {
  return {
    title: 'Rajat Vijay - Thoughts on Code & Design',
    description: 'Exploring the intersection of development, design, and user experience through in-depth articles and practical insights.',
    openGraph: {
      title: 'Rajat Vijay - Developer Blog',
      description: 'Thoughts on Code & Design',
      type: 'website',
    },
  };
}