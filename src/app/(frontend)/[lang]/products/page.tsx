import { type Locale, locales } from '@/lib/i18n'
import { getPayload } from 'payload'
import config from '@payload-config'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema } from '@/lib/structuredData'
import { ProductsPageClient, type ProductDoc } from '@/components/sections/ProductsPage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  return {
    title: validLang === 'ar' ? 'المنتجات' : 'Products',
    description:
      validLang === 'ar'
        ? 'تصفح مجموعة أحذية الوحيد المتنوعة'
        : 'Browse the diverse range of EL WAHEED SHOES footwear products.',
    alternates: {
      languages: {
        en: '/en/products',
        ar: '/ar/products',
      },
    },
  }
}

export default async function Products({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const validLang = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  let products: ProductDoc[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'products',
      depth: 2,
      limit: 100,
    })
    products = result.docs as ProductDoc[]
  } catch {
    // Database may not be ready during initial deployment
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: validLang === 'ar' ? 'الرئيسية' : 'Home', url: `/${validLang}` },
          { name: validLang === 'ar' ? 'المنتجات' : 'Products', url: `/${validLang}/products` },
        ])}
      />
      <ProductsPageClient products={products} lang={validLang} />
    </>
  )
}
