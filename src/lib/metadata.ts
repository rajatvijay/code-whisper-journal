import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export interface MetadataOptions {
  title?: string
  description?: string
  image?: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  type?: 'website' | 'article'
  pathname?: string
}

export function generateMetadata({
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  authors = [siteConfig.author.name],
  tags = [],
  type = 'website',
  pathname = ''
}: MetadataOptions = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaImage = image || `${siteConfig.url}/og-image.png`
  const url = `${siteConfig.url}${pathname}`

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: [...siteConfig.seo.keywords, ...tags],
    authors: authors.map(name => ({ name })),
    creator: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.seo.twitter.handle,
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
  }

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors,
      tags,
    }
  }

  return metadata
}

export function generateBlogPostMetadata({
  title,
  description,
  date,
  categories = [],
  image
}: {
  title: string
  description: string
  date: string
  categories?: string[]
  image?: string
}) {
  return generateMetadata({
    title,
    description,
    image,
    publishedTime: new Date(date).toISOString(),
    modifiedTime: new Date().toISOString(),
    tags: categories,
    type: 'article',
    pathname: `/blog/${title.toLowerCase().replace(/\s+/g, '-')}`
  })
}