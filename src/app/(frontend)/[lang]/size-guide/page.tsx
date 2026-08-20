import { type Locale, locales } from '@/lib/i18n'
import SizeGuidePage from '@/components/sections/SizeGuidePage'
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
    title: validLang === 'ar' ? 'دليل المقاسات' : 'Size Guide | EL WAHEED SHOES',
    description:
      validLang === 'ar'
        ? 'دليل المقاسات الشامل لجميع أحذيةنا'
        : 'Comprehensive shoe size conversion guide for all EL WAHEED SHOES products.',
    alternates: {
      languages: {
        en: '/en/size-guide',
        ar: '/ar/size-guide',
      },
    },
  }
}

export default async function SizeGuide({
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
          { name: validLang === 'ar' ? 'دليل المقاسات' : 'Size Guide', url: `/${validLang}/size-guide` },
        ])}
      />
      <SizeGuidePage lang={validLang} />
    </>
  )
}
