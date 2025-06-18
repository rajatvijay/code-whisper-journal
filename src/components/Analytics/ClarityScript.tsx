"use client";

import { useEffect } from 'react';
import clarity from '@microsoft/clarity';
import { siteConfig } from '../../../config/site';

export default function ClarityScript() {
  useEffect(() => {
    const clarityId = siteConfig.analytics.clarity.projectId;
    const isEnabled = siteConfig.analytics.clarity.enabled;

    if (!clarityId || !isEnabled) {
      return;
    }

    // Initialize Microsoft Clarity with the official package
    clarity.init(clarityId);

    // Enhanced tracking for blog-specific events
    const trackPageView = () => {
      clarity.setTag('page_type', getPageType());
      clarity.setTag('user_agent', navigator.userAgent);
      clarity.setTag('referrer', document.referrer);
      clarity.setTag('timestamp', new Date().toISOString());
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
          clarity.setTag(`scroll_${scrollPercent}`, 'true');
        }
      }
    };

    // Track blog reading engagement
    const trackReadingTime = () => {
      let startTime = Date.now();
      
      const handleVisibilityChange = () => {
        if (document.hidden) {
          const readingTime = Math.round((Date.now() - startTime) / 1000);
          clarity.setTag('reading_time_seconds', readingTime.toString());
        } else {
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
          clarity.setTag('newsletter_signup_attempted', 'true');
        });
      });

      // Track newsletter form visibility
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            clarity.setTag('newsletter_form_viewed', 'true');
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
          if (target.value.length > 2) {
            clarity.setTag('search_used', 'true');
          }
        });
      });
    };

    // Track category filter usage
    const trackCategoryInteraction = () => {
      const categoryButtons = document.querySelectorAll('button[aria-pressed]');
      
      categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
          clarity.setTag('category_filter_used', 'true');
        });
      });
    };

    // Track talk interactions on about page
    const trackTalkInteractions = () => {
      const talkLinks = document.querySelectorAll('a[href*="youtube.com"], a[href*="slides.com"], a[href*="reactindia.io"]');
      
      talkLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const target = e.target as HTMLAnchorElement;
          const url = target.href;
          
          if (url.includes('youtube.com')) {
            clarity.setTag('talk_video_clicked', 'true');
          } else if (url.includes('slides.com')) {
            clarity.setTag('talk_slides_clicked', 'true');
          } else if (url.includes('reactindia.io')) {
            clarity.setTag('talk_event_clicked', 'true');
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
      trackTalkInteractions();
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