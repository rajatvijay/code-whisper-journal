import { getAllBlogPosts } from '@/lib/markdown'
import { siteConfig } from '../config/site'

export default async function sitemap() {
  const baseUrl = siteConfig.url
  
  // Get all blog posts
  const posts = await getAllBlogPosts()
  
  // Create sitemap entries for blog posts (both HTML and markdown versions)
  const blogUrls = posts.flatMap((post) => [
    {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/${post.slug}/md`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ])

  // Static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return [...staticUrls, ...blogUrls]
}