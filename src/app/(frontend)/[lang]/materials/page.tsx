import { type Locale, locales } from '@/lib/i18n'
import MaterialsPage from '@/components/sections/MaterialsPage'
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
    title: validLang === 'ar' ? 'مكتبة المواد' : 'Materials Library | EL WAHEED SHOES',
    description:
      validLang === 'ar'
        ? 'مكتبة المواد لدينا - مواد فاخرة من موردين موثوقين'
        : 'Our Material Library - Premium materials sourced from trusted suppliers worldwide.',
    alternates: {
      languages: {
        en: '/en/materials',
        ar: '/ar/materials',
      },
    },
  }
}

export default async function Materials({
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
          { name: validLang === 'ar' ? 'المواد' : 'Materials', url: `/${validLang}/materials` },
        ])}
      />
      <MaterialsPage lang={validLang} />
    </>
  )
}
