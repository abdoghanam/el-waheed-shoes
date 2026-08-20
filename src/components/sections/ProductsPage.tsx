'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { type ProductCatalogItem } from '@/lib/productCatalog'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

const categories = [
  { value: 'all', labelEn: 'All', labelAr: 'الكل' },
  { value: 'casual', labelEn: 'Casual', labelAr: 'كاجوال' },
  { value: 'sport', labelEn: 'Sport', labelAr: 'رياضي' },
  { value: 'formal', labelEn: 'Formal', labelAr: 'رسمي' },
  { value: 'safety', labelEn: 'Safety', labelAr: 'سلامة' },
  { value: 'sandals', labelEn: 'Sandals', labelAr: 'صنادل' },
  { value: 'boots', labelEn: 'Boots', labelAr: 'بوت' },
  { value: 'kids', labelEn: 'Kids', labelAr: 'أطفال' },
] as const

export function ProductsPageClient({
  products,
  lang,
}: {
  products: ProductCatalogItem[]
  lang: Locale
}) {
  const isAr = lang === 'ar'
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    let result = products

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.titleAr.includes(searchQuery) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.shortDescriptionAr.includes(searchQuery)
      )
    }

    return result
  }, [products, activeCategory, searchQuery])

  return (
    <>
      <section className="bg-bg-secondary pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isAr ? 'المنتجات' : 'Products' }]} lang={lang} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-6"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3 block">
              {isAr ? 'المنتجات' : 'PRODUCTS'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
              {isAr ? 'تشكيلتنا الكاملة' : 'Our Full Collection'}
            </h1>
            <p className="text-text-secondary text-base max-w-2xl mx-auto">
              {isAr
                ? 'تصفح مجموعتنا الكاملة من الأحذية عالية الجودة'
                : 'Browse our complete range of high-quality footwear'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8"
          >
            <div className="flex-1 relative">
              <svg
                className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'بحث بالاسم...' : 'Search by name...'}
                className="w-full rounded-xl border border-border bg-bg-card py-3 ps-10 pe-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            <p className="text-sm text-text-muted shrink-0">
              {isAr
                ? `${filtered.length} من ${products.length} منتج`
                : `${filtered.length} of ${products.length} products`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  activeCategory === cat.value
                    ? 'bg-gold text-black border-gold shadow-lg shadow-gold/10'
                    : 'text-text-secondary border-border hover:border-gold/30 hover:text-text-primary bg-bg-card'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center py-20"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bg-card border border-border">
                  <svg className="h-10 w-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {isAr ? 'لا توجد نتائج' : 'No products found'}
                </h3>
                <p className="text-text-muted text-sm">
                  {isAr
                    ? 'جرّب تغيير معايير البحث أو التصفية'
                    : 'Try adjusting your search or filter criteria'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/${lang}/products/${product.slug}`}
                      className="group block rounded-2xl bg-bg-card border border-border overflow-hidden hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] bg-bg-secondary flex items-center justify-center p-6 group-hover:bg-gold/[0.03] transition-colors duration-300">
                        <Image
                          src={product.image}
                          alt={isAr ? product.titleAr : product.title}
                          width={400}
                          height={300}
                          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 start-3 rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold border border-gold/20 uppercase tracking-wider backdrop-blur-sm">
                          {isAr ? product.categoryAr : product.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-text-primary mb-1 leading-snug group-hover:text-gold transition-colors">
                          {isAr ? product.titleAr : product.title}
                        </h3>
                        <p className="text-sm text-text-muted line-clamp-2 mb-4 leading-relaxed">
                          {isAr ? product.shortDescriptionAr : product.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.materials.slice(0, 3).map((mat) => (
                            <span
                              key={mat}
                              className="rounded-md bg-bg-secondary border border-border px-2 py-0.5 text-[10px] text-text-muted"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-text-muted mb-4 border-t border-border pt-4">
                          <div className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>{isAr ? product.moqAr : product.moq}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{isAr ? product.leadTimeAr : product.leadTime}</span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:gap-2.5 transition-all duration-300">
                          {isAr ? 'عرض التفاصيل' : 'View Details'}
                          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
