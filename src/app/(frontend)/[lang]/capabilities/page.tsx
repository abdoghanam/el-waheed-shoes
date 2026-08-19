import { type Locale, locales } from '@/lib/i18n'
import CapabilitiesPage from '@/components/sections/CapabilitiesPage'
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
    title: validLang === 'ar' ? 'القدرات' : 'Capabilities',
    description:
      validLang === 'ar'
        ? 'قدرات التصنيع المتنوعة في مصنع الوليد أحذية'
        : 'Diverse manufacturing capabilities at EL WAHEED SHOES factory.',
    alternates: {
      languages: {
        en: '/en/capabilities',
        ar: '/ar/capabilities',
      },
    },
  }
}

export default async function Capabilities({
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
          { name: validLang === 'ar' ? 'القدرات' : 'Capabilities', url: `/${validLang}/capabilities` },
        ])}
      />
      <CapabilitiesPage lang={validLang} />
    </>
  )
}
