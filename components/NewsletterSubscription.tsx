"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "../lib/newsletter";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface NewsletterSubscriptionProps {
  className?: string;
}

export default function NewsletterSubscription({
  className = "",
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setFeedback({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    setIsLoading(true);
    setFeedback({ type: null, message: "" });

    try {
      const result = await subscribeToNewsletter(email);

      setFeedback({
        type: result.success ? "success" : "error",
        message: result.message,
      });

      if (result.success) {
        setEmail(""); // Clear email on success
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`mt-20 p-8 bg-muted/30 rounded-2xl text-center animate-slide-up stagger-4 ${className}`}
      role="complementary"
      aria-label="Newsletter subscription"
    >
      <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
        Stay Updated
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Get notified when I publish new insights.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        aria-label="Newsletter subscription form"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-background border-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Email address for newsletter"
          aria-describedby="newsletter-privacy newsletter-feedback"
          required
        />
        <Button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-w-[120px]"
          aria-describedby="newsletter-privacy"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>

      {/* Feedback Message */}
      {feedback.type && (
        <div
          id="newsletter-feedback"
          className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 text-sm ${
            feedback.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
          role="alert"
          aria-live="polite"
        >
          {feedback.type === "success" ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <p id="newsletter-privacy" className="text-xs text-muted-foreground mt-3">
        No spam, unsubscribe at any time.
      </p>
    </section>
  );
}
