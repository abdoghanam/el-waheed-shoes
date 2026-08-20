import { withPayload } from '@payloadcms/next/withPayload'
import { withSentryConfig } from '@sentry/nextjs'

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
  sentry: {
    hideSourceMaps: true,
    disableLogger: true,
  },
}

export default withSentryConfig(withPayload(nextConfig), {
  org: 'el-waheed-shoes',
  project: 'javascript-nextjs',
  silent: true,
  widenClientFileUpload: true,
  disableLogger: true,
  tunnelRoute: '/api/sentry-tunnel',
})
