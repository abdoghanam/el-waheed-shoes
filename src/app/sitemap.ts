import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://el-waheed-shoes.vercel.app'

const pages = [
  '',
  '/about',
  '/products',
  '/manufacturing',
  '/capabilities',
  '/quality',
  '/oem',
  '/gallery',
  '/contact',
  '/quote',
  '/size-guide',
  '/materials',
  '/faq',
  '/privacy',
  '/terms',
  '/search',
  '/careers',
  '/sustainability',
  '/trade-shows',
  '/blog',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    const lastModified = new Date()
    const changeFrequency = page === '' ? 'weekly' as const : 'monthly' as const
    const priority = page === '' ? 1 : 0.8

    entries.push({
      url: `${baseUrl}/ar${page}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${page}`,
          ar: `${baseUrl}/ar${page}`,
        },
      },
    })

    entries.push({
      url: `${baseUrl}/en${page}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${page}`,
          ar: `${baseUrl}/ar${page}`,
        },
      },
    })
  }

  const blogSlugs = [
    'egyptian-footwear-export-growth-2026',
    'quality-control-leather-footwear-production',
    'sustainable-footwear-manufacturing-egypt',
    'private-label-footwear-oem-guide',
    'premium-leather-sourcing-guide',
    'custom-shoe-design-process',
  ]

  for (const slug of blogSlugs) {
    entries.push({
      url: `${baseUrl}/en/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${slug}`,
          ar: `${baseUrl}/ar/blog/${slug}`,
        },
      },
    })
    entries.push({
      url: `${baseUrl}/ar/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${slug}`,
          ar: `${baseUrl}/ar/blog/${slug}`,
        },
      },
    })
  }

  return entries
}
