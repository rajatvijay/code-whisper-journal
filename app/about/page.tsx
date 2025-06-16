import React from "react";
import About from "../../src/pages/About";

// Server Component with SSG
export default function AboutPage() {
  return <About />;
}

// Enable static generation
export const dynamic = 'force-static';

// Generate metadata
export async function generateMetadata() {
  return {
    title: 'About - Rajat Vijay',
    description: 'Learn more about Rajat Vijay, a passionate software developer and tech enthusiast.',
    openGraph: {
      title: 'About Rajat Vijay',
      description: 'Passionate software developer and tech enthusiast',
      type: 'profile',
    },
  };
}