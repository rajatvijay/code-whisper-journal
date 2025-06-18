import { getAllBlogPosts } from '@/lib/markdown'

export default async function sitemap() {
  const baseUrl = 'https://rajatvijay.in'
  
  // Get all blog posts
  const posts = await getAllBlogPosts()
  
  // Create sitemap entries for blog posts
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

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