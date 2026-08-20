import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif' as const, 'image/webp' as const],
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'plus.unsplash.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
