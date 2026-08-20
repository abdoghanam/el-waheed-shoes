import { locales, type Locale } from '@/lib/i18n'
import { PrivacyPage } from '@/components/sections/PrivacyPage'
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
    title: validLang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy',
    description:
      validLang === 'ar'
        ? 'سياسة الخصوصية لشركة الوحيد للاحذية'
        : 'Privacy Policy for EL WAHEED SHOES.',
    alternates: {
      languages: {
        en: '/en/privacy',
        ar: '/ar/privacy',
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
          { name: validLang === 'ar' ? 'الخصوصية' : 'Privacy', url: `/${validLang}/privacy` },
        ])}
      />
      <PrivacyPage lang={validLang} />
    </>
  )
}
