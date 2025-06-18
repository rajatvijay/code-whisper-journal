'use client'

import React from 'react';
import { siteConfig } from '../config/site';

interface BlogPostStructuredDataProps {
  title: string
  excerpt: string
  date: string
  slug: string
  readingTime?: string
  tags?: string[]
  author?: {
    name: string
    avatar?: string
  }
}

interface WebsiteStructuredDataProps {
  url: string
  name: string
  description: string
}

export function BlogPostStructuredData({
  title,
  excerpt,
  date,
  slug,
  readingTime,
  tags,
  author
}: BlogPostStructuredDataProps) {
  const baseUrl = siteConfig.url
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: date,
    url: `${baseUrl}/blog/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${slug}`
    },
    author: {
      '@type': 'Person',
      name: author?.name || siteConfig.author.name,
      url: siteConfig.social.twitter,
      image: author?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 60,
        height: 60
      }
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/og-image.png`,
      width: 1200,
      height: 630
    },
    articleSection: 'Technology',
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
    ...(readingTime && { 
      timeRequired: `PT${readingTime.replace(/\D/g, '')}M`
    }),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    genre: 'Technology Blog'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData({ url, name, description }: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    author: {
      '@type': 'Person',
      name: 'Rajat Vijay',
      url: 'https://twitter.com/rajatvijay',
      sameAs: [
        siteConfig.social.twitter,
        siteConfig.social.github
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${url}/logo.png`,
        width: 60,
        height: 60
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}