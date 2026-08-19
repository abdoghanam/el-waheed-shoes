import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { getProductImage } from '@/lib/images'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ProductDetailClient } from './ProductDetailClient'

async function getProduct(slug: string) {
  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return products.docs[0] || null
}

export default async function ProductDetail({
  lang,
  slug,
}: {
  lang: Locale
  slug: string
}) {
  const dict = dictionaries[lang]
  const product = await getProduct(slug)

  const productName = product?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const shortDesc = product?.shortDescription || ''
  const productMaterials = (product?.materials || []).map((m: any) => m.material)
  const productSizes = (product?.availableSizes || []).map((s: any) => s.size)
  const productColors = (product?.availableColors || []).map((c: any) => ({ name: c.name, hex: c.hex }))
  const featuredImageUrl = product?.featuredImage && typeof product.featuredImage !== 'number'
    ? product.featuredImage.url || getProductImage(slug)
    : getProductImage(slug)
  const categorySlug = product?.category && typeof product.category !== 'number'
    ? product.category.slug
    : ''

  return (
    <ProductDetailClient
      lang={lang}
      slug={slug}
      productName={productName}
      shortDescription={shortDesc}
      materials={productMaterials}
      sizes={productSizes}
      colors={productColors}
      featuredImageUrl={featuredImageUrl}
      categorySlug={categorySlug}
      hasProduct={!!product}
    />
  )
}
