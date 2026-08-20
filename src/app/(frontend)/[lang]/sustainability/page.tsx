import { type Locale, locales } from '@/lib/i18n'
import SustainabilityPage from '@/components/sections/SustainabilityPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema } from '@/lib/structuredData'

export const revalidate = 86400

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'التزامنا بالاستدامة' : 'Sustainability | EL WAHEED SHOES',
    description:
      validLang === 'ar'
        ? 'التزامنا بالاستدامة البيئية في تصنيع الأحذية'
        : 'Our commitment to environmental sustainability in footwear manufacturing.',
    alternates: {
      languages: {
        en: '/en/sustainability',
        ar: '/ar/sustainability',
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
          { name: validLang === 'ar' ? 'الاستدامة' : 'Sustainability', url: `/${validLang}/sustainability` },
        ])}
      />
      <SustainabilityPage lang={validLang} />
    </>
  )
}
