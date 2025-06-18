
import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

const BlogCard = ({ title, excerpt, date, readTime }: BlogCardProps) => {
  return (
    <Card className="hover-lift hover-glow group cursor-pointer transition-all duration-300 border-border/50 hover:border-border">
      <CardHeader className="pb-4 px-4 pt-4 sm:px-6 sm:pt-6 md:px-7 md:pt-7">
        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mb-3 sm:mb-4 space-y-1 sm:space-y-0 sm:space-x-4">
          <time dateTime={date} className="font-medium text-xs sm:text-sm">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{readTime}</span>
          </div>
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-serif font-semibold leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4 sm:px-6 sm:pb-6 md:px-7 md:pb-7">
        <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 line-clamp-3 text-sm sm:text-base md:text-base">
          {excerpt}
        </p>
        <div className="flex items-center justify-end">
          <div className="flex items-center text-xs sm:text-sm text-primary group-hover:translate-x-1 transition-transform duration-200">
            <span className="mr-1 sm:mr-2">Read more</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
