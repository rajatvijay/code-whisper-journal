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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get unique categories from posts
  const categories = ["All", ...Array.from(new Set(posts.map(post => post.category).filter(Boolean))).sort()];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in" role="banner">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6 leading-tight">
            Logs & Gains
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Changing the architecture within.<br />
            Notes on learning machines, mastering self, and shaping teams.
          </p>
        </section>

        {/* Search and Category Filter */}
        <section className="mb-12 animate-slide-up stagger-1" role="search" aria-label="Article search and filtering">
          {/* Category Filter */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-pressed={selectedCategory === category}
                  type="button"
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-1 text-xs opacity-70">
                      ({posts.filter(p => p.category === category).length})
                    </span>
                  )}
                  {category === "All" && (
                    <span className="ml-1 text-xs opacity-70">
                      ({posts.length})
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Search articles by title, content, tags, or category"
                aria-describedby="search-help"
              />
              <div id="search-help" className="sr-only">
                Search through {posts.length} articles by title, excerpt, tags, or category. Currently showing {selectedCategory === "All" ? "all categories" : selectedCategory} category.
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section role="main" aria-label="Blog articles">
          <h2 className="sr-only">
            {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`} 
            ({filteredPosts.length} found{searchTerm ? ` matching "${searchTerm}"` : ""})
          </h2>
          <div className="grid gap-8 md:gap-6">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id}
                className={`animate-slide-up stagger-${Math.min(index + 2, 4)}`}
              >
                <a 
                  href={`/blog/${post.slug}`}
                  className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                  aria-label={`Read article: ${post.title}`}
                >
                  <BlogCard {...post} slug={`/blog/${post.slug}`} />
                </a>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 animate-fade-in" role="status" aria-live="polite">
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
        <section className="mt-20 p-8 bg-muted/30 rounded-2xl text-center animate-slide-up stagger-4" role="complementary" aria-label="Newsletter subscription">
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get notified when I publish new insights on learning machines, mastering self, and shaping teams.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" aria-label="Newsletter subscription form">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background border-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Email address for newsletter"
              aria-describedby="newsletter-privacy"
              required
            />
            <Button 
              type="submit" 
              className="whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-describedby="newsletter-privacy"
            >
              Subscribe
            </Button>
          </form>
          <p id="newsletter-privacy" className="text-xs text-muted-foreground mt-3">
            No spam, unsubscribe at any time.
          </p>
        </section>
      </div>
    </BlogLayout>
  );
}