
import React from 'react';
import Navigation from './Navigation';
import { siteConfig } from '../../config/site';
import { SocialLinks } from '@/components/common/SocialLinks';

interface NavigationProps {
  categories?: string[];
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
  posts?: Array<{
    id: string;
    categories?: string[];
    [key: string]: unknown;
  }>;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  navigationProps?: NavigationProps;
}

const BlogLayout = ({ children, navigationProps }: BlogLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation {...navigationProps} />
      <main className="relative">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {siteConfig.description}
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <SocialLinks variant="footer" className="space-x-6" />
              <a href={`${siteConfig.url}/feed.xml`} className="prose-link">RSS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
