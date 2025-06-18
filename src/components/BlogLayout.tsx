
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
              Logs & Gains
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Changing the architecture within. Notes on learning machines, mastering self, and shaping teams.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="https://twitter.com/rajatvijay" className="prose-link" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://github.com/rajatvijay" className="prose-link" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/rajat-vijay" className="prose-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://rajatvijay.in/feed.xml" className="prose-link">RSS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
