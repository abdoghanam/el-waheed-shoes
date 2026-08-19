import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '*.vercel.app',
      },
    ],
  },
}

export default withPayload(nextConfig)
