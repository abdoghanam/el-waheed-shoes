import { type Locale, locales } from '@/lib/i18n'

import BlogDetail from '@/components/sections/BlogDetail'
import { JsonLd } from '@/components/ui/JsonLd'
import { blogPostSchema, breadcrumbSchema } from '@/lib/structuredData'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { slug } = await params
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return {
    title: `${title} | Blog | EL WAHEED SHOES`,
    description: `${title} - EL WAHEED SHOES blog post.`,
    alternates: {
      languages: {
        en: `/en/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
      },
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <>
      <JsonLd
        data={[
          blogPostSchema({
            title,
            description: `${title} - EL WAHEED SHOES blog post.`,
            image: '/images/blog/default.svg',
            datePublished: '2025-01-01T00:00:00Z',
            author: 'EL WAHEED SHOES',
          }),
          breadcrumbSchema([
            { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
            { name: validLang === 'ar' ? 'المدونة' : 'Blog', url: `/${validLang}/blog` },
            { name: title, url: `/${validLang}/blog/${slug}` },
          ]),
        ]}
      />
      <BlogDetail lang={validLang} slug={slug} />
    </>
  )
}
