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
    description: 'Learn more about Rajat Vijay, an innovative engineering leader with 8+ years of experience in frontend engineering and React.js development.',
    openGraph: {
      title: 'About Rajat Vijay',
      description: 'Engineering Leader and React enthusiast, speaker at React India 2024',
      type: 'profile',
    },
  };
}