import { type Locale, locales } from '@/lib/i18n'
import CareersPage from '@/components/sections/CareersPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema } from '@/lib/structuredData'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'انضم إلى فريقنا' : 'Careers | EL WAHEED SHOES',
    description:
      validLang === 'ar'
        ? 'انضم إلى فريق شركة الوليد أحذية - وظائف شاغرة ومزايا مميزة'
        : 'Join the EL WAHEED SHOES team - job openings and employee benefits.',
    alternates: {
      languages: {
        en: '/en/careers',
        ar: '/ar/careers',
      },
    },
  }
}

export default async function Page({
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
          { name: validLang === 'ar' ? 'الوظائف' : 'Careers', url: `/${validLang}/careers` },
        ])}
      />
      <CareersPage lang={validLang} />
    </>
  )
}
