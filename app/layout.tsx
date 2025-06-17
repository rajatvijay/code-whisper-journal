import React from "react";
import "./globals.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Code-Whisper Journal',
    default: 'Code-Whisper Journal - Exploring Code, Design & Technology'
  },
  description: 'A personal blog exploring the intersection of development, design, and user experience. Thoughts on modern web development, programming insights, and tech trends.',
  keywords: [
    'web development',
    'programming',
    'javascript',
    'react',
    'nextjs',
    'design',
    'user experience',
    'tech blog',
    'software engineering',
    'frontend development'
  ],
  authors: [{ name: 'Rajat Vijay', url: 'https://twitter.com/rajatvijay' }],
  creator: 'Rajat Vijay',
  publisher: 'Rajat Vijay',
  metadataBase: new URL('https://code-whisper-journal.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://code-whisper-journal.vercel.app',
    siteName: 'Code-Whisper Journal',
    title: 'Code-Whisper Journal - Exploring Code, Design & Technology',
    description: 'A personal blog exploring the intersection of development, design, and user experience.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code-Whisper Journal'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rajatvijay',
    creator: '@rajatvijay',
    title: 'Code-Whisper Journal - Exploring Code, Design & Technology',
    description: 'A personal blog exploring the intersection of development, design, and user experience.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
  classification: 'Technology Blog',
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',
  applicationName: 'Code-Whisper Journal',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg">
          Skip to main content
        </a>
        <div id="main-content" role="main">
          {children}
        </div>
      </body>
    </html>
  );
}
