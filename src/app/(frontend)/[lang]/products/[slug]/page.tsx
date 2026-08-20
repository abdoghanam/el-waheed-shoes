import { type Locale, locales } from '@/lib/i18n'
import ProductDetail from '@/components/sections/ProductDetail'
import { JsonLd } from '@/components/ui/JsonLd'
import { productSchema, breadcrumbSchema } from '@/lib/structuredData'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return {
    title: `${title} | EL WAHEED SHOES`,
    description: `${title} - Premium footwear by EL WAHEED SHOES.`,
    alternates: {
      languages: {
        en: `/en/products/${slug}`,
        ar: `/ar/products/${slug}`,
      },
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: title,
            description: `${title} - Premium footwear by EL WAHEED SHOES.`,
            image: `/images/products/${slug}.svg`,
            category: 'Footwear',
          }),
          breadcrumbSchema([
            { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
            { name: validLang === 'ar' ? 'المنتجات' : 'Products', url: `/${validLang}/products` },
            { name: title, url: `/${validLang}/products/${slug}` },
          ]),
        ]}
      />
      <ProductDetail lang={validLang} slug={slug} />
    </>
  )
}
