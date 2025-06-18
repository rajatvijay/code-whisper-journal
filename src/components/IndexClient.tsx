"use client";

import React, { useState } from 'react';
import BlogLayout from '@/components/BlogLayout';
import BlogCard from '@/components/BlogCard';
import NewsletterSubscription from '../../components/NewsletterSubscription';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/markdown';
import { siteConfig } from '../../config/site';

interface IndexClientProps {
  posts: Omit<BlogPost, 'content'>[];
}

export default function IndexClient({ posts }: IndexClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get categories that have at least one blog post from the constant array
  const allPostCategories = posts.flatMap(post => post.categories || []);
  const categoriesWithPosts = siteConfig.blog.categories.filter(category => 
    allPostCategories.includes(category)
  );
  const categories = ["All", ...categoriesWithPosts];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.categories && post.categories.some((cat: string) => cat.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === "All" || (post.categories && post.categories.includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  const navigationProps = {
    categories,
    selectedCategory,
    setSelectedCategory,
    posts
  };

  return (
    <BlogLayout navigationProps={navigationProps}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <section className="text-center mb-12 sm:mb-16 animate-fade-in" role="banner">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-4 sm:mb-6 leading-tight px-2">
                {siteConfig.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                {siteConfig.tagline}.<br />
                {siteConfig.description.split('. ')[1]}.
              </p>
            </section>

            {/* Search Bar */}
            <section className="mb-8 sm:mb-12 animate-slide-up stagger-1" role="search" aria-label="Article search">
              <div className="flex justify-center px-4">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" aria-label="Search icon" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Search articles by title, content, or categories"
                    aria-describedby="search-help"
                  />
                  <div id="search-help" className="sr-only">
                    Search through {posts.length} articles by title, excerpt, or categories. Currently showing {selectedCategory === "All" ? "all categories" : selectedCategory} category.
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
              <div className="grid gap-4 sm:gap-6 md:gap-8">
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
                      <BlogCard 
                        title={post.title}
                        excerpt={post.excerpt}
                        date={post.date}
                        readTime={post.readTime}
                      />
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
                    Try adjusting your search terms or category filter.
                  </p>
                </div>
              )}
            </section>

            {/* Newsletter Signup */}
            <NewsletterSubscription />
          </div>

          {/* Right Sidebar - Category Filter - Desktop Only */}
          <aside className="hidden lg:block lg:col-span-1 mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-24">
              <section role="navigation" aria-label="Category filter">
                <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-foreground">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const categoryCount = category === "All" 
                      ? posts.length 
                      : posts.filter(p => p.categories && p.categories.includes(category)).length;
                    
                    return (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="w-full justify-between text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-pressed={selectedCategory === category}
                        type="button"
                      >
                        <span>{category}</span>
                        <span className="text-xs opacity-70">
                          {categoryCount}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </BlogLayout>
  );
}