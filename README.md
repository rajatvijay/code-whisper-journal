# Logs & Gains

> Tracking the gains that matter—mental, physical, and technical. A living journal of deep learning, personal growth, and mindful leadership.

A modern, high-performance personal blog built with Next.js, featuring perfect SEO and accessibility scores, comprehensive testing, and a focus on technical excellence.

## 🌟 Features

- **Perfect Performance**: 100% SEO and Accessibility scores on all pages
- **Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **Comprehensive Testing**: Automated SEO and accessibility testing scripts
- **Content Management**: Markdown-based blog posts with frontmatter support
- **Newsletter Integration**: Firebase-powered subscription system
- **Analytics**: Microsoft Clarity integration for user insights
- **SEO Optimized**: Dynamic sitemaps, robots.txt, and structured data
- **Accessibility First**: WCAG 2.1 AAA compliant with focus management
- **Responsive Design**: Mobile-first approach with dark mode support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd logs-and-gains

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── about/            # About page
│   ├── blog/             # Blog pages
│   ├── robots.ts         # Dynamic robots.txt
│   ├── sitemap.ts        # Dynamic sitemap
│   └── manifest.ts       # Web app manifest
├── components/            # React components
├── config/               # Configuration files
│   └── site.ts          # Site configuration
├── content/              # Blog content
│   ├── blog/            # Markdown blog posts
│   └── blog-index.json  # Generated blog index
├── scripts/              # Utility scripts
│   ├── test-seo-local.ts       # SEO testing
│   ├── test-accessibility-local.ts # A11y testing
│   ├── test-local-complete.ts  # Quick comprehensive test
│   ├── generate-llms-txt.ts    # LLM training data
│   └── update-blog-index.js    # Blog index generator
├── src/                  # Source code
│   └── components/       # Shared components
└── public/              # Static assets
```

## 🧪 Testing & Quality Assurance

This project includes comprehensive testing scripts to ensure perfect SEO and accessibility:

### Available Test Commands

```bash
# Quick comprehensive test (recommended for CI/CD)
pnpm run test:quick

# Detailed SEO testing
pnpm run test:seo

# Detailed accessibility testing
pnpm run test:a11y

# Run both SEO and accessibility tests in parallel
pnpm run test:audit

# Run both tests sequentially
pnpm run test:audit:sequential
```

### Test Coverage

- **SEO Testing**: Lighthouse SEO audits, robots.txt, sitemap.xml, manifest accessibility
- **Accessibility Testing**: Lighthouse accessibility audits (includes axe-core), WCAG 2.1 compliance
- **Performance**: Automated performance monitoring via Lighthouse

### Current Scores

- **SEO**: 100% across all pages ✅
- **Accessibility**: 100% across all pages ✅
- **Performance**: Optimized for Core Web Vitals

## 📝 Content Management

### Adding Blog Posts

1. Create a new Markdown file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2024-01-01"
description: "Post description for SEO"
categories: ["Deep Learning", "Personal Development"]
readTime: "5 min read"
---

Your blog content here...
```

2. Update the blog index:

```bash
pnpm run blog:update
```

### Supported Categories

- Deep Learning
- Generative AI
- AI
- Machine Learning
- Health & Wellness
- Personal Development
- Team Leadership
- General Thoughts
- Beginner Guide

## 🔧 Configuration

### Site Configuration

Edit `config/site.ts` to customize:

- Site metadata (title, description, URLs)
- Author information and social links
- Blog settings and categories
- SEO and analytics configuration
- Navigation structure

### Environment Variables

Create `.env.local` with:

```env
# Microsoft Clarity (optional)
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id

# Firebase (for newsletter)
FIREBASE_CONFIG=your_firebase_config
```

## 🚀 Deployment

### Build for Production

```bash
# Build the application
pnpm run build

# Start production server
pnpm start
```

### Deployment Platforms

The project is configured for deployment on:

- **Vercel** (recommended): Zero-config deployment
- **Netlify**: Static site generation
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

### Pre-deployment Checklist

```bash
# Run all tests
pnpm run test:audit

# Build and verify
pnpm run build
pnpm start

# Check production bundle
pnpm run build && npx serve out
```

## 🛠️ Development Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build           # Build for production
pnpm start           # Start production server
pnpm lint            # Run ESLint

# Content Management
pnpm run blog:update     # Update blog index
pnpm run llms:generate   # Generate LLM training data
pnpm run update-content  # Update all content

# Testing & Quality
pnpm run test:quick      # Quick comprehensive test
pnpm run test:seo        # SEO testing
pnpm run test:a11y       # Accessibility testing
pnpm run test:audit      # Run both tests in parallel
```

## 🔧 Customization

### Styling

- **CSS Framework**: Tailwind CSS with custom design system
- **Components**: shadcn/ui for consistent UI components
- **Icons**: Lucide React for scalable icons
- **Fonts**: Roboto family (configured in Tailwind)

### Analytics

- **Microsoft Clarity**: User behavior analytics
- **Built-in Analytics**: Page views, reading time, engagement metrics

### Performance

- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Optimization**: Tree shaking and code splitting
- **Caching**: Optimized caching strategies for static content

## 📊 Monitoring

### Performance Monitoring

- Lighthouse CI for automated performance testing
- Core Web Vitals tracking
- Bundle size monitoring

### SEO Monitoring

- Automated SEO score tracking
- Sitemap validation
- Meta tag verification

### Accessibility Monitoring

- WCAG 2.1 compliance testing
- Screen reader compatibility
- Keyboard navigation testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm run test:audit`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Maintain 100% SEO and accessibility scores
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rajat Vijay**

- Website: [rajatvijay.in](https://rajatvijay.in)
- Twitter: [@rajatvijay](https://twitter.com/rajatvijay)
- LinkedIn: [rajat-vijay](https://linkedin.com/in/rajat-vijay)
- GitHub: [@rajatvijay](https://github.com/rajatvijay)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Testing with [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- Analytics by [Microsoft Clarity](https://clarity.microsoft.com/)

---

**"Tracking the gains that matter—mental, physical, and technical."**
