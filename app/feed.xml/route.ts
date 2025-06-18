import { getAllBlogPosts } from '@/lib/markdown'
import { siteConfig } from '../../config/site'

export async function GET() {
  const posts = await getAllBlogPosts()
  const baseUrl = siteConfig.url
  
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{siteConfig.name}</title>
    <description>{siteConfig.description}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>{siteConfig.author.email} ({siteConfig.author.name})</managingEditor>
    <webMaster>{siteConfig.author.email} ({siteConfig.author.name})</webMaster>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>{siteConfig.name}</title>
      <link>${baseUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>
    ${posts
      .slice(0, 20) // Limit to 20 most recent posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author?.name || siteConfig.author.name}</author>
      ${post.tags?.map(tag => `<category>${tag}</category>`).join('') || ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}