"use client";

import { useEffect } from 'react';
import { siteConfig } from '../../../config/site';

declare global {
  interface Window {
    clarity: (action: string, ...args: any[]) => void;
  }
}

export default function ClarityScript() {
  useEffect(() => {
    const clarityId = siteConfig.analytics.clarity.projectId;
    const isEnabled = siteConfig.analytics.clarity.enabled;

    if (!clarityId || !isEnabled) {
      return;
    }

    // Initialize Microsoft Clarity
    (function(c: any, l: any, a: any, r: any, i: any) {
      c[a] = c[a] || function(...args: any[]) { (c[a].q = c[a].q || []).push(args) };
      const t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode?.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);

    // Enhanced tracking for blog-specific events
    const trackPageView = () => {
      if (window.clarity) {
        window.clarity('set', 'page_type', getPageType());
        window.clarity('set', 'user_agent', navigator.userAgent);
        window.clarity('set', 'referrer', document.referrer);
        window.clarity('set', 'timestamp', new Date().toISOString());
      }
    };

    const getPageType = () => {
      const path = window.location.pathname;
      if (path === '/') return 'homepage';
      if (path.startsWith('/blog/')) return 'blog_post';
      if (path === '/about') return 'about';
      return 'other';
    };

    // Track initial page view
    trackPageView();

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
          if (window.clarity) {
            window.clarity('set', `scroll_${scrollPercent}`, true);
          }
        }
      }
    };

    // Track blog reading engagement
    const trackReadingTime = () => {
      let startTime = Date.now();
      let isActive = true;
      
      const handleVisibilityChange = () => {
        if (document.hidden) {
          isActive = false;
          if (window.clarity) {
            const readingTime = Math.round((Date.now() - startTime) / 1000);
            window.clarity('set', 'reading_time_seconds', readingTime);
          }
        } else {
          isActive = true;
          startTime = Date.now();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    };

    // Track newsletter interactions
    const trackNewsletterInteraction = () => {
      const newsletterForms = document.querySelectorAll('form[data-newsletter]');
      
      newsletterForms.forEach(form => {
        form.addEventListener('submit', () => {
          if (window.clarity) {
            window.clarity('set', 'newsletter_signup_attempted', true);
          }
        });
      });

      // Track newsletter form visibility
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && window.clarity) {
            window.clarity('set', 'newsletter_form_viewed', true);
          }
        });
      });

      newsletterForms.forEach(form => observer.observe(form));
    };

    // Track search interactions
    const trackSearchInteraction = () => {
      const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
      
      searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement;
          if (target.value.length > 2 && window.clarity) {
            window.clarity('set', 'search_used', true);
          }
        });
      });
    };

    // Track category filter usage
    const trackCategoryInteraction = () => {
      const categoryButtons = document.querySelectorAll('button[aria-pressed]');
      
      categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
          if (window.clarity) {
            window.clarity('set', 'category_filter_used', true);
          }
        });
      });
    };

    // Set up event listeners
    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    const cleanupReading = trackReadingTime();
    
    // Set up interaction tracking after a short delay to ensure DOM is ready
    setTimeout(() => {
      trackNewsletterInteraction();
      trackSearchInteraction();
      trackCategoryInteraction();
    }, 1000);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      if (cleanupReading) {
        cleanupReading();
      }
    };
  }, []);

  return null;
}