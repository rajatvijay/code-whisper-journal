"use client";

import React from "react";
import dynamic from "next/dynamic";

const About = dynamic(() => import("../../src/pages/About"), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-foreground">Loading...</div>
  </div>
});

export default function AboutPage() {
  return <About />;
}