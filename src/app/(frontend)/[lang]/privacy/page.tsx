import { locales, type Locale } from '@/lib/i18n'
import { PrivacyPage } from '@/components/sections/PrivacyPage'

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
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const validLang = (locales.includes(rawLang as Locale) ? rawLang : 'en') as Locale
  return <PrivacyPage lang={validLang} />
}
