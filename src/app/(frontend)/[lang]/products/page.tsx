import { type Locale, locales } from '@/lib/i18n'
import { getPayload } from 'payload'
import config from '@payload-config'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema } from '@/lib/structuredData'
import { productCatalog, type ProductCatalogItem } from '@/lib/productCatalog'
import { ProductsPageClient } from '@/components/sections/ProductsPage'

export const revalidate = 3600

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

  const products: ProductCatalogItem[] = [...productCatalog]

  try {
    const payload = await getPayload({ config })
    await payload.find({
      collection: 'products',
      depth: 2,
      limit: 100,
    })
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
