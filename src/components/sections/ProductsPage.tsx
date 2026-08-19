import { type Locale } from '@/lib/i18n'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader } from '@/components/ui/Section'
import { ProductsGrid } from './ProductsGrid'
import type { Product, Category, Media } from '@/payload-types'

export type ProductDoc = Product & {
  category: Category
  featuredImage: Media
}

const categories = [
  { value: 'all', labelEn: 'All Products', labelAr: 'جميع المنتجات' },
  { value: 'casual', labelEn: 'Casual Shoes', labelAr: 'أحذية كاجوية' },
  { value: 'formal', labelEn: 'Formal Shoes', labelAr: 'أحذية رسمية' },
  { value: 'sport', labelEn: 'Sport Shoes', labelAr: 'أحذية رياضية' },
  { value: 'safety', labelEn: 'Safety Boots', labelAr: 'أحذية سلامة' },
  { value: 'sandals', labelEn: 'Sandals', labelAr: 'شباشب' },
]

export function ProductsPageClient({ products, lang }: { products: ProductDoc[]; lang: Locale }) {
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: isAr ? 'المنتجات' : 'Products' }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'المنتجات' : 'PRODUCTS'}
          title={isAr ? 'تشكيلتنا الكاملة' : 'Our Full Collection'}
          description={isAr ? 'تصفح مجموعتنا الكاملة من الأحذية عالية الجودة' : 'Browse our complete range of high-quality footwear'}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className="px-5 py-2.5 rounded-xl body-sm font-medium transition-all text-text-muted hover:text-text-primary border border-border hover:border-accent"
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        <ProductsGrid products={products} lang={lang} />
      </Section>
    </>
  )
}
