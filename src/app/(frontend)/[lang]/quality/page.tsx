import { type Locale, locales } from '@/lib/i18n'
import QualityPage from '@/components/sections/QualityPage'
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
    title: validLang === 'ar' ? 'الجودة' : 'Quality',
    description:
      validLang === 'ar'
        ? 'معايير الجودة الصارمة في مصنع الوحيد للاحذية'
        : 'Strict quality standards at EL WAHEED SHOES factory.',
    alternates: {
      languages: {
        en: '/en/quality',
        ar: '/ar/quality',
      },
    },
  }
}

export default async function Quality({
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
          { name: validLang === 'ar' ? 'الجودة' : 'Quality', url: `/${validLang}/quality` },
        ])}
      />
      <QualityPage lang={validLang} />
    </>
  )
}
