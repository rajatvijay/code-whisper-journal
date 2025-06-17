import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Code-Whisper Journal - Exploring Code, Design & Technology',
    short_name: 'Code-Whisper Journal',
    description: 'A personal blog exploring the intersection of development, design, and user experience. Thoughts on modern web development, programming insights, and tech trends.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    categories: ['technology', 'blog', 'education'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Code-Whisper Journal homepage on desktop',
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Code-Whisper Journal homepage on mobile',
      },
    ],
    shortcuts: [
      {
        name: 'Latest Posts',
        short_name: 'Posts',
        description: 'View the latest blog posts',
        url: '/#blog',
        icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
      },
      {
        name: 'About',
        short_name: 'About',
        description: 'Learn about the author',
        url: '/about',
        icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
      },
    ],
  }
}