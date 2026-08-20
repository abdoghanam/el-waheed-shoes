import { type Locale, locales } from '@/lib/i18n'
import QuotePage from '@/components/sections/QuotePage'
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
    title: validLang === 'ar' ? 'طلب عرض سعر' : 'Request a Quote',
    description:
      validLang === 'ar'
        ? 'احصل على عرض سعر مخصص لأحذية الوحيد'
        : 'Get a custom quote for EL WAHEED SHOES footwear.',
    alternates: {
      languages: {
        en: '/en/quote',
        ar: '/ar/quote',
      },
    },
  }
}

export default async function Quote({
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
          { name: validLang === 'ar' ? 'طلب عرض سعر' : 'Request a Quote', url: `/${validLang}/quote` },
        ])}
      />
      <QuotePage lang={validLang} />
    </>
  )
}
