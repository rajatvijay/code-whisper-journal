
import Navigation from './Navigation';

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
              DevBlog
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Thoughts on development, design, and the intersection of technology and creativity.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="prose-link">Twitter</a>
              <a href="#" className="prose-link">GitHub</a>
              <a href="#" className="prose-link">LinkedIn</a>
              <a href="#" className="prose-link">RSS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
