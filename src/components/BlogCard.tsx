
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

const BlogCard = ({ title, excerpt, date, readTime, tags, slug }: BlogCardProps) => {
  return (
    <Card className="hover-lift hover-glow group cursor-pointer transition-all duration-300 border-border/50 hover:border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
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
        <h3 className="text-xl font-serif font-semibold leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
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
