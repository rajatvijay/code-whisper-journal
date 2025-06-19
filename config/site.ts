// Site configuration - All hardcoded information in one place
export const siteConfig = {
  // Basic site information
  name: "Logs & Gains",
  title: "Logs & Gains - Changing the architecture within",
  description:
    "Tracking the gains that matter—mental, physical, and technical. A living journal of deep learning, personal growth, and mindful leadership.",
  tagline: "Changing the architecture within",

  // URLs
  url: "https://rajatvijay.in",

  // Author information
  author: {
    name: "Rajat Vijay",
    email: "rajat@rajatvijay.in",
    avatar: "/images/profile-avatar.jpeg",
    bio: "Innovative Engineering Leader with 8+ years of experience in frontend engineering and React.js development. Speaker at React India 2024, passionate about cutting-edge technology and performance optimization.",
    longBio:
      "I work at Certa.ai as a technology leader, focusing on React ecosystem, developer productivity, and performance engineering. I'm excited about AI-driven development tools and have contributed to open-source projects like devtools-highlighter and YouTube Repeat Player React component. Through this blog, I share insights on learning machines, mastering self, and shaping teams.",
  },

  // Social media links
  social: {
    twitter: "https://twitter.com/rajatvijay",
    github: "https://github.com/rajatvijay",
    linkedin: "https://linkedin.com/in/rajat-vijay",
    email: "mailto:rajat@rajatvijay.in",
  },

  // Blog configuration
  blog: {
    categories: [
      "Deep Learning",
      "Generative AI",
      "AI",
      "Machine Learning",
      "Health & Wellness",
      "Personal Development",
      "Team Leadership",
      "General Thoughts",
      "Beginner Guide",
    ],
    defaultCategories: ["General Thoughts"],
    postsPerPage: 10,
    readTimeWPM: 200, // Words per minute for reading time calculation
  },

  // Newsletter configuration
  newsletter: {
    description:
      "Get notified when I publish new insights on learning machines, mastering self, and shaping teams.",
    successMessage:
      "Thank you for subscribing! You'll receive updates about new insights.",
    collectionName: "newsletterSubscribers",
  },

  // SEO and metadata
  seo: {
    keywords: [
      "web development",
      "programming",
      "javascript",
      "react",
      "nextjs",
      "design",
      "user experience",
      "tech blog",
      "software engineering",
      "frontend development",
      "deep learning",
      "ai",
      "machine learning",
      "personal development",
      "health",
      "leadership",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      imageWidth: 1200,
      imageHeight: 630,
      siteName: "Logs & Gains",
    },
    twitter: {
      handle: "@rajatvijay",
      site: "@rajatvijay",
      cardType: "summary_large_image",
    },
  },

  // Navigation
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Blog", href: "/#blog" },
    ],
  },

  // About page configuration
  about: {
    title: "About Me",
    subtitle:
      "Engineering Leader, React enthusiast, and speaker exploring the intersection of performance optimization and developer experience.",
    sections: {
      topics: {
        title: "What I Write About",
        items: [
          {
            title: "Deep Learning & AI",
            description:
              "Exploring machine learning, neural networks, and artificial intelligence applications",
          },
          {
            title: "Personal Development",
            description:
              "Insights on self-improvement, productivity, and continuous learning",
          },
          {
            title: "Team Leadership",
            description:
              "Building effective teams, leadership principles, and organizational culture",
          },
          {
            title: "Health & Wellness",
            description:
              "Physical and mental health practices for sustainable performance",
          },
        ],
      },
      talks: {
        title: "Speaking & Talks",
        description:
          "I enjoy sharing knowledge and insights with the developer community through talks and presentations.",
        items: [
          {
            title: "Experiments with React Compiler in Production Code",
            event: "React India 2024",
            description:
              "Explore our journey of integrating the React Compiler into the production codebase, focusing on the challenges faced and lessons learned. This talk covers practical strategies for overcoming obstacles when implementing React Compiler in performance-critical areas.",
            date: "November 2024",
            type: "Conference Talk",
            videoUrl: "https://www.youtube.com/watch?v=WuDTRt07mmM&t=1s",
            eventUrl: "https://www.reactindia.io/speakers/rajat-vijay",
            // topics: ["React", "Performance Optimization", "Compiler Technology", "Production Engineering"]
          },
          {
            title: "AI Generated Test Cases",
            event: "React Nexus 2024",
            description:
              "Exploring the potential of AI in generating comprehensive test cases for modern web applications, covering automated testing strategies and practical implementation approaches.",
            date: "2024",
            type: "Tech Talk",
            videoUrl: "https://www.youtube.com/watch?v=JF6x0BFmr0I",
            eventUrl: "https://2024.reactnexus.com",
            slidesUrl:
              "https://slides.com/rajatvijay/ai-generated-test-cases/fullscreen",
            // topics: ["AI", "Testing", "Automation", "Quality Assurance"]
          },
        ],
      },
      contact: {
        title: "Get in Touch",
        description:
          "I'm always interested in connecting with fellow developers, discussing React performance optimization, AI-driven development tools, and sharing knowledge about engineering leadership. Feel free to reach out through any of the channels below.",
      },
    },
  },

  // Legacy topics reference (for backward compatibility)
  topics: [
    {
      title: "Deep Learning & AI",
      description:
        "Exploring machine learning, neural networks, and artificial intelligence applications",
    },
    {
      title: "Personal Development",
      description:
        "Insights on self-improvement, productivity, and continuous learning",
    },
    {
      title: "Team Leadership",
      description:
        "Building effective teams, leadership principles, and organizational culture",
    },
    {
      title: "Health & Wellness",
      description:
        "Physical and mental health practices for sustainable performance",
    },
  ],

  // Technical configuration
  technical: {
    timezone: "UTC",
    dateFormat: "MMMM dd, yyyy",
    language: "en",
    locale: "en-US",
  },

  // Analytics configuration
  analytics: {
    clarity: {
      projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "",
      enabled: true, // process.env.NODE_ENV === "production",
    },
  },
} as const;

// Helper functions for common operations
export const getSiteUrl = (path: string = "") => {
  return `${siteConfig.url}${path}`;
};

export const getAuthorSocial = (platform: keyof typeof siteConfig.social) => {
  return siteConfig.social[platform];
};

export const getBlogCategories = (categories?: string[]): string[] => {
  if (!categories || categories.length === 0) {
    return [...siteConfig.blog.defaultCategories];
  }
  return categories.filter((cat) =>
    siteConfig.blog.categories.includes(
      cat as (typeof siteConfig.blog.categories)[number]
    )
  );
};

export default siteConfig;
