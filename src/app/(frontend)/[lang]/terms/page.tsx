import { locales, type Locale } from '@/lib/i18n'
import { TermsPage } from '@/components/sections/TermsPage'

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
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const validLang = (locales.includes(rawLang as Locale) ? rawLang : 'en') as Locale
  return <TermsPage lang={validLang} />
}
