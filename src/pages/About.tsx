import React from "react";
import BlogLayout from "../components/BlogLayout";
import { siteConfig } from "../../config/site";
import { SocialLinks } from "@/components/common/SocialLinks";
import { SectionDivider } from "@/components/common/SectionDivider";

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
        <div className="max-w-3xl mx-auto animate-slide-up stagger-1">
          {/* Introduction */}
          <div className="mb-16">
            <img
              src={siteConfig.author.avatar}
              alt={`Professional portrait of ${siteConfig.author.name}, Engineering Leader and React enthusiast`}
              className="w-48 h-48 rounded-xl mx-auto mb-8 shadow-lg object-cover"
            />
            {/* <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              {siteConfig.about.intro}
            </p> */}
          </div>

          <SectionDivider />

          {/* What You'll Find Here */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-foreground">
              {siteConfig.about.sections.topics.title}
            </h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              {siteConfig.about.sections.topics.description}
            </p>
            <div className="space-y-6">
              {siteConfig.about.sections.topics.items.map((topic, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">
                      {topic.title}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      – {topic.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionDivider />

          {/* Why I Write */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-foreground">
              {siteConfig.about.sections.writing.title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {siteConfig.about.sections.writing.description}
            </p>
          </div>

          <SectionDivider />

          {/* Professional Snapshot */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">
              {siteConfig.about.sections.professional.title}
            </h2>
            <div className="space-y-6">
              {siteConfig.about.sections.professional.items.map(
                (item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="text-primary text-lg font-bold mt-0.5">
                      •
                    </span>
                    <div className="flex-1">
                      <span className="font-semibold text-foreground">
                        {item.title}:
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        {item.description}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <SectionDivider />

          {/* Guiding Principles */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">
              {siteConfig.about.sections.principles.title}
            </h2>
            <div className="space-y-6">
              {siteConfig.about.sections.principles.items.map(
                (principle, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <span className="font-semibold text-foreground">
                        {principle.title}.
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        {principle.description}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <SectionDivider />

          {/* Talks Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-foreground">
              {siteConfig.about.sections.talks.title}
            </h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              {siteConfig.about.sections.talks.description}
            </p>
            <div className="grid gap-6">
              {siteConfig.about.sections.talks.items.map((talk, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-muted/20 border border-border/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                        {talk.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <span className="font-medium">{talk.event}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{talk.date}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                        {talk.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:w-32">
                      {"videoUrl" in talk && (
                        <a
                          href={talk.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          Watch Video
                        </a>
                      )}
                      {"slidesUrl" in talk && (
                        <a
                          href={talk.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/50 border border-border rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          View Slides
                        </a>
                      )}
                      {"eventUrl" in talk && (
                        <a
                          href={talk.eventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/50 border border-border rounded-lg hover:bg-muted/70 transition-colors"
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

          {/* Final Divider */}
          <div className="text-center text-muted-foreground text-3xl mb-16 font-light">
            ⸻
          </div>

          {/* Contact Section */}
          <div className="mb-16 text-center">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-foreground">
              {siteConfig.about.sections.contact.title}
            </h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              {siteConfig.about.sections.contact.description}
            </p>
            <div className="flex justify-center">
              <SocialLinks className="space-x-8" linkClassName="text-muted-foreground hover:text-primary transition-colors font-medium" />
              <a
                href={siteConfig.social.email}
                className="ml-8 text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default About;
