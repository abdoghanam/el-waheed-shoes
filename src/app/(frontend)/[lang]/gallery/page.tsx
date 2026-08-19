import { type Locale, locales } from '@/lib/i18n'
import GalleryPage from '@/components/sections/GalleryPage'
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
    title: validLang === 'ar' ? 'المعرض' : 'Gallery',
    description:
      validLang === 'ar'
        ? 'معرض صور مصنع الوحيد ومنتجاتنا'
        : 'Photo gallery of EL WAHEED SHOES factory and our products.',
    alternates: {
      languages: {
        en: '/en/gallery',
        ar: '/ar/gallery',
      },
    },
  }
}

export default async function Gallery({
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
          { name: validLang === 'ar' ? 'المعرض' : 'Gallery', url: `/${validLang}/gallery` },
        ])}
      />
      <GalleryPage lang={validLang} />
    </>
  )
}
