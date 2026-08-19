import { type Locale, locales } from '@/lib/i18n'
import AboutPage from '@/components/sections/AboutPage'
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
    title: validLang === 'ar' ? 'من نحن' : 'About Us',
    description:
      validLang === 'ar'
        ? 'تعرّف على شركة الوحيد للاحذية وقصتنا في صناعة الأحذية المصرية'
        : 'Learn about EL WAHEED SHOES and our story in Egyptian footwear manufacturing.',
    alternates: {
      languages: {
        en: '/en/about',
        ar: '/ar/about',
      },
    },
  }
}

export default async function About({
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
            { name: validLang === 'ar' ? 'من نحن' : 'About Us', url: `/${validLang}/about` },
          ]),
        ]}
      />
      <AboutPage lang={validLang} />
    </>
  )
}
