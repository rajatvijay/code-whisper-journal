import { getAllBlogPosts } from '@/lib/markdown'

export async function GET() {
  const posts = await getAllBlogPosts()
  const baseUrl = 'https://rajatvijay.in'
  
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Logs & Gains</title>
    <description>Changing the architecture within. Notes on learning machines, mastering self, and shaping teams.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>rajat@example.com (Rajat Vijay)</managingEditor>
    <webMaster>rajat@example.com (Rajat Vijay)</webMaster>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Logs & Gains</title>
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
      <author>${post.author?.name || 'Rajat Vijay'}</author>
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