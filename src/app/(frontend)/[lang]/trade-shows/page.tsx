import { type Locale, locales } from '@/lib/i18n'
import TradeShowsPage from '@/components/sections/TradeShowsPage'
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
    title: validLang === 'ar' ? 'معارض التجارة' : 'Trade Shows | EL WAHEED SHOES',
    description:
      validLang === 'ar'
        ? 'زارنا في معارض التجارة الدولية'
        : 'Visit us at international trade shows and exhibitions.',
    alternates: {
      languages: {
        en: '/en/trade-shows',
        ar: '/ar/trade-shows',
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
          { name: validLang === 'ar' ? 'معارض التجارة' : 'Trade Shows', url: `/${validLang}/trade-shows` },
        ])}
      />
      <TradeShowsPage lang={validLang} />
    </>
  )
}
