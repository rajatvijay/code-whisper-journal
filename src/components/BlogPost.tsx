
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
          <div 
            className="prose prose-sm sm:prose-base lg:prose-lg prose-gray dark:prose-invert max-w-none 
                       prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
                       prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4 sm:prose-h1:mb-6
                       prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-8 sm:prose-h2:mt-12 prose-h2:mb-4 sm:prose-h2:mb-6 prose-h2:leading-tight
                       prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mt-6 sm:prose-h3:mt-10 prose-h3:mb-3 sm:prose-h3:mb-5 prose-h3:leading-tight
                       prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-6 prose-p:text-sm sm:prose-p:text-base lg:prose-p:text-[17px]
                       prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-lg sm:prose-pre:rounded-xl prose-pre:p-3 sm:prose-pre:p-6 prose-pre:my-4 sm:prose-pre:my-8 prose-pre:overflow-x-auto
                       prose-code:bg-muted/60 prose-code:px-1.5 sm:prose-code:px-2 prose-code:py-0.5 sm:prose-code:py-1 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm lg:prose-code:text-[15px] prose-code:font-mono
                       prose-code:before:content-none prose-code:after:content-none
                       prose-strong:text-foreground prose-strong:font-semibold
                       prose-blockquote:border-l-2 sm:prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-3 sm:prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
                       prose-ul:my-4 sm:prose-ul:my-6 prose-ol:my-4 sm:prose-ol:my-6 prose-li:my-1 sm:prose-li:my-2
                       prose-img:rounded-lg prose-img:border prose-img:border-border/50"
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
