"use client";

import React, { useState } from 'react';
import BlogLayout from '@/components/BlogLayout';
import BlogCard from '@/components/BlogCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/markdown';

interface IndexClientProps {
  posts: Omit<BlogPost, 'content'>[];
}

export default function IndexClient({ posts }: IndexClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on search only
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6 leading-tight">
            Thoughts on Code & Design
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exploring the intersection of development, design, and user experience through 
            in-depth articles and practical insights.
          </p>
        </section>

        {/* Search Only */}
        <section className="mb-12 animate-slide-up stagger-1">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border focus:border-primary"
              />
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          <div className="grid gap-8 md:gap-6">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id}
                className={`animate-slide-up stagger-${Math.min(index + 2, 4)}`}
              >
                <a href={`/blog/${post.id}`}>
                  <BlogCard {...post} slug={`/blog/${post.id}`} />
                </a>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-xl text-muted-foreground mb-4">
                No articles found
              </p>
              <p className="text-muted-foreground">
                Try adjusting your search terms.
              </p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 p-8 bg-muted/30 rounded-2xl text-center animate-slide-up stagger-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get notified when I publish new articles about development and design.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background border-border"
            />
            <Button className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            No spam, unsubscribe at any time.
          </p>
        </section>
      </div>
    </BlogLayout>
  );
}