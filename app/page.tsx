import React from "react";
import IndexClient from "../src/components/IndexClient";
import { getAllBlogPosts } from "@/lib/markdown";
import { WebsiteStructuredData } from "../components/StructuredData";
import { siteConfig } from '../config/site';

// Server Component - runs at build time for SSG
export default async function Home() {
  // This runs at build time and pre-fetches all blog posts
  const posts = await getAllBlogPosts();
  
  // Pass the data to the client component
  return (
    <>
      <WebsiteStructuredData 
        url={siteConfig.url}
        name={siteConfig.name}
        description={siteConfig.description}
      />
      <IndexClient posts={posts} />
    </>
  );
}

// Enable static generation
export const dynamic = 'force-static';

// Generate metadata
export async function generateMetadata() {
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    openGraph: {
      title: `${siteConfig.name} - ${siteConfig.author.name}`,
      description: siteConfig.description,
      type: 'website',
    },
  };
}