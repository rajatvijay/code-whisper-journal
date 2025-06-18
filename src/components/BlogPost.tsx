
"use client";

import React, { useEffect, useState } from 'react';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPostProps {
  title: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
}

const BlogPost = ({ title, content, date, readTime, tags, author }: BlogPostProps) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  return (
    <article className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <div 
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={readingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-12 group text-muted-foreground hover:text-foreground"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to blog
        </Button>

        {/* Article Header */}
        <header className="mb-12 sm:mb-16 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mb-4 sm:mb-6 space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={date} className="font-medium">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-[1.1] text-foreground mb-6 sm:mb-8 animate-slide-up stagger-1 tracking-tight">
            {title}
          </h1>

          <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8 animate-slide-up stagger-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-2 ring-border"
            />
            <div>
              <p className="font-semibold text-foreground text-base sm:text-lg">{author.name}</p>
              <p className="text-muted-foreground text-sm">Author</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3 animate-slide-up stagger-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-muted/60 text-muted-foreground rounded-full border border-border/50 hover:bg-muted transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="animate-slide-up stagger-4">
          <article 
            className="prose prose-lg prose-gray dark:prose-invert max-w-none
                       [&>h1]:text-3xl [&>h1]:font-serif [&>h1]:font-bold [&>h1]:tracking-tight [&>h1]:mt-16 [&>h1]:mb-8 [&>h1]:text-foreground
                       [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-foreground
                       [&>h3]:text-xl [&>h3]:font-serif [&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:mt-10 [&>h3]:mb-5 [&>h3]:text-foreground
                       [&>h4]:text-lg [&>h4]:font-serif [&>h4]:font-semibold [&>h4]:tracking-tight [&>h4]:mt-8 [&>h4]:mb-4 [&>h4]:text-foreground
                       [&>p]:text-foreground [&>p]:leading-[1.8] [&>p]:mb-6 [&>p]:text-base
                       [&>hr]:border-border/40 [&>hr]:my-12 [&>hr]:border-t-2
                       [&>blockquote]:border-l-4 [&>blockquote]:border-primary/30 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:my-8 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:bg-muted/20 [&>blockquote]:rounded-r-lg
                       [&>ul]:my-6 [&>ul]:space-y-2 [&>ol]:my-6 [&>ol]:space-y-2
                       [&>ul>li]:leading-relaxed [&>ol>li]:leading-relaxed
                       [&>pre]:bg-muted/50 [&>pre]:border [&>pre]:border-border [&>pre]:rounded-xl [&>pre]:p-6 [&>pre]:my-8 [&>pre]:overflow-x-auto
                       [&>code]:bg-muted/60 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                       [&>table]:border-collapse [&>table]:border [&>table]:border-border [&>table]:my-8 [&>table]:w-full
                       [&>table>thead>tr>th]:border [&>table>thead>tr>th]:border-border [&>table>thead>tr>th]:bg-muted/50 [&>table>thead>tr>th]:px-4 [&>table>thead>tr>th]:py-3 [&>table>thead>tr>th]:font-semibold [&>table>thead>tr>th]:text-left
                       [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:border-border [&>table>tbody>tr>td]:px-4 [&>table>tbody>tr>td]:py-3
                       [&>img]:rounded-lg [&>img]:border [&>img]:border-border/50 [&>img]:my-8
                       [&_strong]:text-foreground [&_strong]:font-semibold
                       [&_em]:italic"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Author Bio */}
        <footer className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-border/60">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 bg-muted/30 rounded-xl sm:rounded-2xl p-6 sm:p-8">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-2 ring-border flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground mb-2 sm:mb-3">
                About {author.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Full-stack developer passionate about creating elegant solutions to complex problems. 
                Loves exploring new technologies and sharing knowledge with the community through 
                detailed technical articles and open-source contributions.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
