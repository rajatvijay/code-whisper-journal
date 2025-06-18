
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  categories: string[];
  slug: string;
}

const BlogCard = ({ title, excerpt, date, readTime, categories, slug }: BlogCardProps) => {
  return (
    <Card className="hover-lift hover-glow group cursor-pointer transition-all duration-300 border-border/50 hover:border-border">
      <CardHeader className="pb-4 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mb-3 space-y-1 sm:space-y-0 sm:space-x-4">
          <time dateTime={date} className="font-medium">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-serif font-semibold leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="pt-0 p-4 sm:p-6">
        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3 text-sm sm:text-base">
          {excerpt}
        </p>
        <div className="flex items-center justify-end">
          <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform duration-200">
            <span className="mr-1">Read more</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
