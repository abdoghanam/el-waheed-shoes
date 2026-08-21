import { type Locale } from '@/lib/i18n'
import { ProductDetailClient } from './ProductDetailClient'
import { getCatalogProduct } from '@/lib/productCatalog'

export default async function ProductDetail({
  lang,
  slug,
}: {
  lang: Locale
  slug: string
}) {
  const catalogProduct = getCatalogProduct(slug)
  const isAr = lang === 'ar'

  if (catalogProduct) {
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

  const fallbackName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return (
    <ProductDetailClient
      lang={lang}
      slug={slug}
      productName={fallbackName}
      shortDescription=""
      materials={[]}
      sizes={[]}
      colors={[]}
      featuredImageUrl={`/images/products/${slug}.jpg`}
      categorySlug=""
      hasProduct={false}
      features={[]}
      certifications={[]}
      moq=""
      leadTime=""
      weight=""
      usage=""
    />
  )
}
