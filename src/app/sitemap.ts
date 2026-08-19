import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elwaheedshoes.com'

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

  return entries
}
