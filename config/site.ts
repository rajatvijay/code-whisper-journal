// Site configuration - All hardcoded information in one place
export const siteConfig = {
  // Basic site information
  name: "Logs & Gains",
  title: "Logs & Gains - Changing the architecture within",
  description: "Changing the architecture within. Notes on learning machines, mastering self, and shaping teams.",
  tagline: "Changing the architecture within",
  
  // URLs
  url: "https://rajatvijay.in",
  
  // Author information
  author: {
    name: "Rajat Vijay",
    email: "rajat@rajatvijay.in",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "I'm a passionate software developer and tech enthusiast who loves exploring the latest in web development, AI, and emerging technologies. With expertise in modern JavaScript frameworks, cloud technologies, and full-stack development, I enjoy building innovative solutions that make a difference.",
    longBio: "Through this blog, I share my journey in tech, interesting discoveries, code experiments, and insights from my development experiences. I believe in continuous learning and enjoy connecting with fellow developers to exchange ideas and knowledge."
  },
  
  // Social media links
  social: {
    twitter: "https://twitter.com/rajatvijay",
    github: "https://github.com/rajatvijay", 
    linkedin: "https://linkedin.com/in/rajat-vijay",
    email: "mailto:rajat@rajatvijay.in"
  },
  
  // Blog configuration
  blog: {
    categories: [
      "Deep Learning",
      "Generative AI", 
      "Health",
      "General Thoughts"
    ],
    defaultCategory: "General Thoughts",
    postsPerPage: 10,
    readTimeWPM: 200 // Words per minute for reading time calculation
  },
  
  // Newsletter configuration
  newsletter: {
    description: "Get notified when I publish new insights on learning machines, mastering self, and shaping teams.",
    successMessage: "Thank you for subscribing! You'll receive updates about new insights.",
    collectionName: "newsletterSubscribers"
  },
  
  // SEO and metadata
  seo: {
    keywords: [
      'web development',
      'programming', 
      'javascript',
      'react',
      'nextjs',
      'design',
      'user experience',
      'tech blog',
      'software engineering',
      'frontend development',
      'deep learning',
      'ai',
      'machine learning',
      'personal development',
      'health',
      'leadership'
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      imageWidth: 1200,
      imageHeight: 630,
      siteName: "Logs & Gains"
    },
    twitter: {
      handle: '@rajatvijay',
      site: '@rajatvijay',
      cardType: 'summary_large_image'
    }
  },
  
  // Navigation
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/#blog' }
    ]
  },
  
  // Content topics for About page
  topics: [
    {
      title: "Deep Learning & AI",
      description: "Exploring machine learning, neural networks, and artificial intelligence applications"
    },
    {
      title: "Personal Development", 
      description: "Insights on self-improvement, productivity, and continuous learning"
    },
    {
      title: "Team Leadership",
      description: "Building effective teams, leadership principles, and organizational culture"
    },
    {
      title: "Health & Wellness",
      description: "Physical and mental health practices for sustainable performance"
    }
  ],
  
  // Technical configuration
  technical: {
    timezone: 'UTC',
    dateFormat: 'MMMM dd, yyyy',
    language: 'en',
    locale: 'en-US'
  }
} as const;

// Helper functions for common operations
export const getSiteUrl = (path: string = '') => {
  return `${siteConfig.url}${path}`;
};

export const getAuthorSocial = (platform: keyof typeof siteConfig.social) => {
  return siteConfig.social[platform];
};

export const getBlogCategory = (category?: string): string => {
  return category && siteConfig.blog.categories.includes(category as any) 
    ? category 
    : siteConfig.blog.defaultCategory;
};

export default siteConfig;