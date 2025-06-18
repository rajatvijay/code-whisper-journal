import React from "react";
import "./globals.css";
import type { Metadata } from 'next'
import { siteConfig } from '../config/site';
import ClarityScript from '../src/components/Analytics/ClarityScript';

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.title
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.social.twitter }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: siteConfig.seo.openGraph.type,
    locale: siteConfig.seo.openGraph.locale,
    url: siteConfig.url,
    siteName: siteConfig.seo.openGraph.siteName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.png',
        width: siteConfig.seo.openGraph.imageWidth,
        height: siteConfig.seo.openGraph.imageHeight,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: siteConfig.seo.twitter.cardType,
    site: siteConfig.seo.twitter.site,
    creator: siteConfig.seo.twitter.handle,
    title: siteConfig.title,
    description: siteConfig.description,
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
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  category: 'technology',
  classification: 'Technology Blog',
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',
  applicationName: siteConfig.name,
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
        <ClarityScript />
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
