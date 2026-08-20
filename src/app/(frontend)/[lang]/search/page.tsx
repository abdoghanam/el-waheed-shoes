import { type Locale, locales } from '@/lib/i18n'
import { SearchPage } from '@/components/sections/SearchPage'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'بحث' : 'Search',
    description:
      validLang === 'ar'
        ? 'ابحث في موقع الوحيد'
        : 'Search the EL WAHEED SHOES website.',
    alternates: {
      languages: {
        en: '/en/search',
        ar: '/ar/search',
      },
    },
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const { lang: rawLang } = await params
  const validLang = (locales.includes(rawLang as Locale) ? rawLang : 'en') as Locale
  const { q } = await searchParams

  return <SearchPage lang={validLang} query={q ?? ''} />
}
