import { type Locale } from '@/lib/i18n'
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
    locale: lang,
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
  const product = await getProduct(slug)

  const productName = product?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const shortDesc = product?.shortDescription || ''
  const productMaterials = (product?.materials || []).map((m: Record<string, unknown>) => (m as { material: string }).material)
  const productSizes = (product?.availableSizes || []).map((s: Record<string, unknown>) => (s as { size: string }).size)
  const productColors = (product?.availableColors || []).map((c: Record<string, unknown>) => ({ name: (c as { name: string }).name, hex: (c as { hex: string }).hex }))
  const featuredImageUrl = product?.featuredImage && typeof product.featuredImage !== 'number'
    ? product.featuredImage.url || getProductImage(slug)
    : getProductImage(slug)
  const categorySlug = product?.category && typeof product.category !== 'number'
    ? product.category.slug
    : ''

  const features = (product?.features || []).map((f: Record<string, unknown>) => (f as { feature: string }).feature)
  const certifications = (product?.certifications || []).map((c: Record<string, unknown>) => (c as { certification: string }).certification)

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
      features={features}
      certifications={certifications}
      moq={(product as Record<string, unknown>)?.moq as string || ''}
      leadTime={(product as Record<string, unknown>)?.leadTime as string || ''}
      weight={(product as Record<string, unknown>)?.weight as string || ''}
      usage={(product as Record<string, unknown>)?.usage as string || ''}
    />
  )
}
