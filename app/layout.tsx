import React from "react";
import "./globals.css";

export const metadata = { title: "Code-Whisper Journal" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
