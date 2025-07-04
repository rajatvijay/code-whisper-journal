"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { siteConfig } from '../../config/site';

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

const Navigation = ({ categories, selectedCategory, setSelectedCategory, posts }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMobileMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first menu item
      const firstMenuItem = mobileMenuRef.current?.querySelector('a, button');
      if (firstMenuItem instanceof HTMLElement) {
        firstMenuItem.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-xl font-serif font-semibold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              aria-label={`${siteConfig.name} - Home`}
            >
              {siteConfig.name}
            </a>
          </div>

          {/* Navigation and Theme Toggle */}
          <div className="flex items-center space-x-6">
            <a
              href="/about"
              className={`text-sm font-medium transition-colors duration-200 relative group hidden md:block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1 ${
                pathname === '/about' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
              aria-describedby="about-link-description"
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              About Me
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-200 origin-left ${
                pathname === '/about' 
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
              <span id="about-link-description" className="sr-only">Learn more about Rajat Vijay and this blog</span>
            </a>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-pressed={isDark}
              type="button"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                ref={menuButtonRef}
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 p-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                type="button"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu" ref={mobileMenuRef}>
            <div className="px-2 pt-2 pb-3 border-t border-border bg-background/95" role="menu">
              <a
                href="/about"
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm ${
                  pathname === '/about' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:text-primary hover:bg-muted/50'
                }`}
                onClick={closeMobileMenu}
                role="menuitem"
                aria-describedby="mobile-about-description"
                aria-current={pathname === '/about' ? 'page' : undefined}
              >
                About Me
                <span id="mobile-about-description" className="sr-only">Learn more about Rajat Vijay and this blog</span>
              </a>
              
              {/* Categories in Mobile Menu */}
              {categories && categories.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Categories
                  </div>
                  <div className="space-y-1">
                    {categories.map((category) => {
                      const categoryCount = category === "All" 
                        ? (posts?.length || 0)
                        : (posts?.filter(p => p.categories && p.categories.includes(category)).length || 0);
                      
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory?.(category);
                            closeMobileMenu();
                          }}
                          className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm flex justify-between items-center ${
                            selectedCategory === category 
                              ? 'text-primary bg-primary/10' 
                              : 'text-foreground hover:text-primary hover:bg-muted/50'
                          }`}
                          role="menuitem"
                          type="button"
                        >
                          <span>{category}</span>
                          <span className="text-xs opacity-70">({categoryCount})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
