"use client";

import React from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../src/App-nextjs"), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-foreground">Loading...</div>
  </div>
});

export default function Home() {
  return <App />;
}
