import BlogLayout from "@/components/BlogLayout";

const About = () => {
  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6 leading-tight">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Developer, designer, and writer exploring the intersection of code
            and creativity.
          </p>
        </section>

        {/* Main Content */}
        <section className="prose dark:prose-invert max-w-none animate-slide-up stagger-1">
          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Rajat Vijay Profile"
              className="rounded-xl mx-auto mb-8 shadow-lg"
            />
            <h2 className="text-3xl font-serif font-semibold mb-4">
              Hi, I'm Rajat Vijay
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm a passionate software developer and tech enthusiast who loves
              exploring the latest in web development, AI, and emerging
              technologies. With expertise in modern JavaScript frameworks,
              cloud technologies, and full-stack development, I enjoy building
              innovative solutions that make a difference.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Through this blog, I share my journey in tech, interesting
              discoveries, code experiments, and insights from my development
              experiences. I believe in continuous learning and enjoy connecting
              with fellow developers to exchange ideas and knowledge.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              What I Write About
            </h2>
            <ul className="list-none p-0 grid gap-4">
              <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Web Development</h3>
                  <p className="text-muted-foreground">
                    Modern frameworks, architecture patterns, and performance
                    optimization
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">UI/UX Design</h3>
                  <p className="text-muted-foreground">
                    Creating intuitive interfaces and delightful user
                    experiences
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Best Practices</h3>
                  <p className="text-muted-foreground">
                    Code quality, testing strategies, and development workflows
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm always interested in connecting with fellow developers and
              discussing new ideas. Feel free to reach out through any of the
              channels below.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://twitter.com/rajatvijay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://github.com/rajatvijay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/rajat-vijay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
    </BlogLayout>
  );
};

export default About;
