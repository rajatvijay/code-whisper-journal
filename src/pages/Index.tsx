
import { useState } from 'react';
import BlogLayout from '@/components/BlogLayout';
import BlogCard from '@/components/BlogCard';
import BlogPost from '@/components/BlogPost';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt: "Explore advanced patterns and best practices for creating maintainable React applications using TypeScript. We'll dive into component architecture, state management, and performance optimization techniques.",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications requires careful consideration of architecture, type safety, and performance. In this comprehensive guide, we'll explore proven patterns and techniques.</p>
      
      <h2>Component Architecture</h2>
      <p>A well-structured component hierarchy is the foundation of any scalable React application. Here's how to approach it:</p>
      
      <pre><code>// Example of a well-typed React component
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      {...props}
    >
      {children}
    </button>
  );
};</code></pre>
      
      <h2>State Management Patterns</h2>
      <p>Effective state management is crucial for scalable applications. Consider these approaches:</p>
      
      <h3>1. Local State with useState</h3>
      <p>For component-specific state that doesn't need to be shared:</p>
      
      <pre><code>const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);
  
  // Component logic here
};</code></pre>
      
      <h3>2. Global State with Context</h3>
      <p>For application-wide state that multiple components need access to:</p>
      
      <pre><code>interface AppContextType {
  user: User | null;
  theme: 'light' | 'dark';
  updateUser: (user: User) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);</code></pre>
      
      <h2>Performance Optimization</h2>
      <p>TypeScript can help catch performance issues at compile time:</p>
      
      <pre><code>// Use React.memo for expensive components
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveOperation(data);
  }, [data]);
  
  return <div>{processedData}</div>;
});</code></pre>
      
      <h2>Conclusion</h2>
      <p>Building scalable React applications with TypeScript requires a thoughtful approach to architecture, state management, and performance. By following these patterns, you'll create applications that are both maintainable and performant.</p>
    `,
    date: "2024-03-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Architecture", "Performance"],
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 2,
    title: "Advanced CSS Grid Techniques for Modern Layouts",
    excerpt: "Master the art of CSS Grid with advanced techniques for creating complex, responsive layouts. Learn about grid areas, implicit grids, and dynamic sizing.",
    content: `
      <h2>CSS Grid Fundamentals</h2>
      <p>CSS Grid revolutionized how we approach layout in web development. Let's explore some advanced techniques that go beyond the basics.</p>
      
      <h2>Grid Template Areas</h2>
      <p>One of the most powerful features of CSS Grid is the ability to define named grid areas:</p>
      
      <pre><code>.grid-container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }</code></pre>
      
      <h2>Dynamic Grid Sizing</h2>
      <p>Use fr units and minmax() for truly responsive grids:</p>
      
      <pre><code>/* Auto-fitting columns with minimum width */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Dynamic rows with content-based sizing */
.content-grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-auto-rows: minmax(100px, auto);
}</code></pre>
      
      <h2>Subgrid (Future-Forward)</h2>
      <p>Subgrid allows nested grids to participate in their parent's grid:</p>
      
      <pre><code>.parent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.child-grid {
  display: grid;
  grid-column: span 3;
  grid-template-columns: subgrid; /* Inherits parent's grid */
}</code></pre>
    `,
    date: "2024-03-10",
    readTime: "6 min read",
    tags: ["CSS", "Grid", "Layout", "Responsive Design"],
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: 3,
    title: "The Future of JavaScript: ES2024 Features",
    excerpt: "Discover the latest JavaScript features coming in ES2024, including new array methods, improved error handling, and enhanced async capabilities.",
    content: `
      <h2>What's New in ES2024</h2>
      <p>JavaScript continues to evolve, bringing new features that make development more efficient and code more readable.</p>
      
      <h2>Array Grouping Methods</h2>
      <p>New methods for grouping array elements:</p>
      
      <pre><code>const products = [
  { category: 'electronics', name: 'Phone' },
  { category: 'clothing', name: 'Shirt' },
  { category: 'electronics', name: 'Laptop' }
];

// Group by category
const grouped = products.groupBy(item => item.category);
console.log(grouped);
// {
//   electronics: [{ category: 'electronics', name: 'Phone' }, ...],
//   clothing: [{ category: 'clothing', name: 'Shirt' }]
// }</code></pre>
      
      <h2>Promise.withResolvers()</h2>
      <p>A new utility for creating promises with external resolve/reject:</p>
      
      <pre><code>const { promise, resolve, reject } = Promise.withResolvers();

// Use resolve/reject from outside the promise constructor
setTimeout(() => resolve('Success!'), 1000);

promise.then(console.log); // 'Success!' after 1 second</code></pre>
      
      <h2>Improved Error Handling</h2>
      <p>Better stack traces and error information:</p>
      
      <pre><code>class CustomError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = 'CustomError';
  }
}

try {
  throw new CustomError('Something went wrong', { 
    cause: originalError 
  });
} catch (error) {
  console.log(error.cause); // Access to original error
}</code></pre>
    `,
    date: "2024-03-05",
    readTime: "5 min read",
    tags: ["JavaScript", "ES2024", "Features", "Modern JS"],
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  }
];

const Index = () => {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  );

  // Filter posts based on search and tags
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  if (selectedPost) {
    return (
      <BlogLayout>
        <BlogPost {...selectedPost} />
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6 leading-tight">
            Thoughts on Code & Design
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exploring the intersection of development, design, and user experience through 
            in-depth articles and practical insights.
          </p>
        </section>

        {/* Search and Filter */}
        <section className="mb-12 animate-slide-up stagger-1">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border focus:border-primary"
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="text-xs"
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className="text-xs"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          <div className="grid gap-8 md:gap-6">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id}
                className={`animate-slide-up stagger-${Math.min(index + 2, 4)}`}
                onClick={() => setSelectedPost(post)}
              >
                <BlogCard {...post} slug={`/blog/${post.id}`} />
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-xl text-muted-foreground mb-4">
                No articles found
              </p>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filter settings.
              </p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 p-8 bg-muted/30 rounded-2xl text-center animate-slide-up stagger-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get notified when I publish new articles about development and design.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background border-border"
            />
            <Button className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            No spam, unsubscribe at any time.
          </p>
        </section>
      </div>
    </BlogLayout>
  );
};

export default Index;
