import { type Locale, locales } from '@/lib/i18n'
import ManufacturingPage from '@/components/sections/ManufacturingPage'
import { JsonLd } from '@/components/ui/JsonLd'
import {
  organizationSchema,
  breadcrumbSchema,
} from '@/lib/structuredData'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'التصنيع' : 'Manufacturing',
    description:
      validLang === 'ar'
        ? 'اكتشف خطوط الإنتاج المتطورة في مصنع الوليد أحذية'
        : 'Explore the advanced production lines at EL WAHEED SHOES factory.',
    alternates: {
      languages: {
        en: '/en/manufacturing',
        ar: '/ar/manufacturing',
      },
    },
  }
}

export default async function Manufacturing({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
            { name: validLang === 'ar' ? 'التصنيع' : 'Manufacturing', url: `/${validLang}/manufacturing` },
          ]),
        ]}
      />
      <ManufacturingPage lang={validLang} />
    </>
  )
}
