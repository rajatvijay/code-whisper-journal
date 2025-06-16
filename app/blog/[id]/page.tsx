"use client";

import React from "react";
import { useParams } from "next/navigation";
import BlogPost from "../../../src/components/BlogPost";
import BlogLayout from "../../../src/components/BlogLayout";

// Blog posts data (in a real app, this would come from a database or API)
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt: "Explore advanced patterns and best practices for creating maintainable React applications using TypeScript.",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications requires careful consideration of architecture, type safety, and performance.</p>
      <h2>Component Architecture</h2>
      <p>A well-structured component hierarchy is the foundation of any scalable React application.</p>
    `,
    date: "2024-03-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Architecture", "Performance"],
    author: {
      name: "Rajat Vijay",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 2,
    title: "Advanced CSS Grid Techniques for Modern Layouts",
    excerpt: "Master the art of CSS Grid with advanced techniques for creating complex, responsive layouts.",
    content: `
      <h2>CSS Grid Fundamentals</h2>
      <p>CSS Grid revolutionized how we approach layout in web development.</p>
    `,
    date: "2024-03-10", 
    readTime: "6 min read",
    tags: ["CSS", "Grid", "Layout", "Responsive Design"],
    author: {
      name: "Rajat Vijay",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 3,
    title: "The Future of JavaScript: ES2024 Features",
    excerpt: "Discover the latest JavaScript features coming in ES2024.",
    content: `
      <h2>What's New in ES2024</h2>
      <p>JavaScript continues to evolve, bringing new features that make development more efficient.</p>
    `,
    date: "2024-03-05",
    readTime: "5 min read", 
    tags: ["JavaScript", "ES2024", "Features", "Modern JS"],
    author: {
      name: "Rajat Vijay",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Blog post not found</h1>
          <a href="/" className="text-primary hover:text-primary/80 underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <BlogLayout>
      <BlogPost {...post} />
    </BlogLayout>
  );
}