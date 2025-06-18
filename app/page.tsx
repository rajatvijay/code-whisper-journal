import React from "react";
import IndexClient from "../src/components/IndexClient";
import { getAllBlogPosts } from "@/lib/markdown";
import { WebsiteStructuredData } from "../components/StructuredData";

// Server Component - runs at build time for SSG
export default async function Home() {
  // This runs at build time and pre-fetches all blog posts
  const posts = await getAllBlogPosts();
  
  // Pass the data to the client component
  return (
    <>
      <WebsiteStructuredData 
        url="https://rajatvijay.in"
        name="Logs & Gains"
        description="Changing the architecture within. Notes on learning machines, mastering self, and shaping teams."
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
    title: 'Logs & Gains - Changing the architecture within',
    description: 'Changing the architecture within. Notes on learning machines, mastering self, and shaping teams.',
    openGraph: {
      title: 'Logs & Gains - Rajat Vijay',
      description: 'Changing the architecture within. Notes on learning machines, mastering self, and shaping teams.',
      type: 'website',
    },
  };
}