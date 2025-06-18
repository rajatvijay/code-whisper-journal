import React from "react";
import BlogLayout from "../components/BlogLayout";
import { siteConfig } from "../../config/site";

const About = () => {
  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6 leading-tight">
            {siteConfig.about.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.about.subtitle}
          </p>
        </section>

        {/* Main Content */}
        <section className="prose dark:prose-invert max-w-none animate-slide-up stagger-1">
          <div className="mb-12">
            <img
              src={siteConfig.author.avatar}
              alt={`Professional portrait of ${siteConfig.author.name}, Engineering Leader and React enthusiast`}
              className="rounded-xl mx-auto mb-8 shadow-lg"
            />
            <h2 className="text-3xl font-serif font-semibold mb-4">
              Hi, I'm {siteConfig.author.name}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {siteConfig.author.bio}
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              {siteConfig.author.longBio}
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              {siteConfig.about.sections.topics.title}
            </h2>
            <ul className="list-none p-0 grid gap-4">
              {siteConfig.about.sections.topics.items.map((topic, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-muted-foreground">{topic.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-6">
              {siteConfig.about.sections.talks.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {siteConfig.about.sections.talks.description}
            </p>
            <div className="grid gap-6">
              {siteConfig.about.sections.talks.items.map((talk, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h3 className="text-xl font-serif font-semibold text-foreground">
                          {talk.title}
                        </h3>
                        {/* <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {talk.type}
                        </span> */}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-sm text-muted-foreground">
                        <span className="font-medium">{talk.event}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{talk.date}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {talk.description}
                      </p>
                      {/* <div className="flex flex-wrap gap-2 mb-4">
                        {talk.topics.map(
                          (topic: string, topicIndex: number) => (
                            <span
                              key={topicIndex}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-background border border-border text-muted-foreground"
                            >
                              {topic}
                            </span>
                          )
                        )}
                      </div> */}
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                      {"videoUrl" in talk && (
                        <a
                          href={talk.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          Watch Video
                        </a>
                      )}
                      {"slidesUrl" in talk && (
                        <a
                          href={talk.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/50 border border-border rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          View Slides
                        </a>
                      )}
                      {"eventUrl" in talk && (
                        <a
                          href={talk.eventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/50 border border-border rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          Event Details
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              {siteConfig.about.sections.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {siteConfig.about.sections.contact.description}
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.email}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </section>
      </div>
    </BlogLayout>
  );
};

export default About;
