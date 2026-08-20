import { Suspense } from 'react'
import { type Locale, locales } from '@/lib/i18n'
import BlogPage from '@/components/sections/BlogPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema } from '@/lib/structuredData'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'المدونة' : 'Blog',
    description:
      validLang === 'ar'
        ? 'مقالات وأخبار مصنع الوحيد'
        : 'Articles and news from EL WAHEED SHOES factory.',
    alternates: {
      languages: {
        en: '/en/blog',
        ar: '/ar/blog',
      },
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
          { name: validLang === 'ar' ? 'المدونة' : 'Blog', url: `/${validLang}/blog` },
        ])}
      />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <BlogPage lang={validLang} />
      </Suspense>
    </>
  )
}
