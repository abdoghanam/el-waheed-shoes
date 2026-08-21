import { type Locale } from '@/lib/i18n'
import { getProductImage } from '@/lib/images'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ProductDetailClient } from './ProductDetailClient'
import { getCatalogProduct } from '@/lib/productCatalog'

export default async function ProductDetail({
  lang,
  slug,
}: {
  lang: Locale
  slug: string
}) {
  let payloadProduct = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    payloadProduct = result.docs[0] || null
  } catch {
    // Fall through to catalog
  }

  if (!payloadProduct) {
    const catalogProduct = getCatalogProduct(slug)
    if (catalogProduct) {
      const isAr = lang === 'ar'
      return (
        <ProductDetailClient
          lang={lang}
          slug={slug}
          productName={isAr ? catalogProduct.titleAr : catalogProduct.title}
          shortDescription={isAr ? catalogProduct.shortDescriptionAr : catalogProduct.shortDescription}
          materials={catalogProduct.materials}
          sizes={catalogProduct.sizes}
          colors={catalogProduct.colors}
          featuredImageUrl={catalogProduct.image}
          categorySlug={catalogProduct.category}
          hasProduct={true}
          features={isAr ? catalogProduct.featuresAr : catalogProduct.features}
          certifications={catalogProduct.certifications}
          moq={isAr ? catalogProduct.moqAr : catalogProduct.moq}
          leadTime={isAr ? catalogProduct.leadTimeAr : catalogProduct.leadTime}
          weight={isAr ? catalogProduct.weightAr : catalogProduct.weight}
          usage={isAr ? catalogProduct.usageAr : catalogProduct.usage}
        />
      )
    }
  }

  const product = payloadProduct
  const productName = product?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const shortDesc = product?.shortDescription || ''
  const productMaterials = (product?.materials || []).map((m) => m.material)
  const productSizes = (product?.availableSizes || []).map((s) => s.size)
  const productColors = (product?.availableColors || []).map((c) => ({ name: c.name, hex: c.hex }))
  const featuredImageUrl = product?.featuredImage && typeof product.featuredImage !== 'number'
    ? product.featuredImage.url || getProductImage(slug)
    : getProductImage(slug)
  const categorySlug = product?.category && typeof product.category !== 'number'
    ? product.category.slug
    : ''

  const features = (product?.features || []).map((f) => f.feature)
  const certifications = (product?.certifications || []).map((c) => c.certification)

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
      moq={product?.moq || ''}
      leadTime={product?.leadTime || ''}
      weight={product?.weight || ''}
      usage={product?.usage || ''}
    />
  )
}
