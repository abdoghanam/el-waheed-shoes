import { locales, type Locale } from '@/lib/i18n'
import { TermsPage } from '@/components/sections/TermsPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema } from '@/lib/structuredData'

export const revalidate = 86400

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const validLang = (locales.includes(rawLang as Locale) ? rawLang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'شروط الخدمة' : 'Terms of Service',
    description:
      validLang === 'ar'
        ? 'شروط الخدمة لشركة الوحيد للاحذية'
        : 'Terms of Service for EL WAHEED SHOES.',
    alternates: {
      languages: {
        en: '/en/terms',
        ar: '/ar/terms',
      },
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const validLang = (locales.includes(rawLang as Locale) ? rawLang : 'en') as Locale

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
          { name: validLang === 'ar' ? 'الشروط' : 'Terms', url: `/${validLang}/terms` },
        ])}
      />
      <TermsPage lang={validLang} />
    </>
  )
}
