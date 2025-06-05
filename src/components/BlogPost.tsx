
import { useEffect, useState } from 'react';
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 group"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to blog
        </Button>

        {/* Article Header */}
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={date} className="font-medium">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-tight text-foreground mb-6 animate-slide-up stagger-1">
            {title}
          </h1>

          <div className="flex items-center space-x-4 animate-slide-up stagger-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium text-foreground">{author.name}</p>
              <p className="text-sm text-muted-foreground">Author</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 animate-slide-up stagger-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none animate-slide-up stagger-4">
          <div 
            className="text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Author Bio */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex items-start space-x-4">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                {author.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Full-stack developer passionate about creating elegant solutions to complex problems. 
                Loves exploring new technologies and sharing knowledge with the community.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
