'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import type { Product, Category, Media } from '@/payload-types'

type ProductDoc = Product & {
  category: Category
  featuredImage: Media
}

export function ProductsGrid({ products, lang }: { products: ProductDoc[]; lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [quickView, setQuickView] = useState<ProductDoc | null>(null)

  const getMediaUrl = (img: number | Media | null | undefined): string => {
    if (!img || typeof img === 'number') return '/images/products/shoe-casual.svg'
    return img.url || '/images/products/shoe-casual.svg'
  }

  const getCategorySlug = (cat: number | Category): string => {
    if (typeof cat === 'number') return ''
    return cat.slug || ''
  }

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'popular') return (b.sortOrder || 0) - (a.sortOrder || 0)
    if (sortBy === 'price-low') return 1
    if (sortBy === 'price-high') return -1
    return (b.sortOrder || 0) - (a.sortOrder || 0)
  })

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <p className="text-sm text-gray-500">
          {isAr ? `عرض ${products.length} من ${products.length} منتجات` : `Showing ${products.length} of ${products.length} products`}
        </p>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-gold focus:outline-none"
          >
            <option value="newest">{isAr ? 'الأحدث' : 'Newest'}</option>
            <option value="price-low">{isAr ? 'السعر: من الأقل' : 'Price: Low → High'}</option>
            <option value="price-high">{isAr ? 'السعر: من الأعلى' : 'Price: High → Low'}</option>
            <option value="popular">{isAr ? 'الأكثر شعبية' : 'Most Popular'}</option>
          </select>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gold/10 text-gold' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gold/10 text-gold' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-4'}>
        {sorted.map((product, i) => {
          const catSlug = getCategorySlug(product.category)
          const imageUrl = getMediaUrl(product.featuredImage)
          return viewMode === 'grid' ? (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setQuickView(product)}
              onMouseLeave={() => setQuickView(null)}
            >
              <Link
                href={`/${lang}/products/${product.slug}`}
                className="group block rounded-xl bg-white border border-gray-100 overflow-hidden hover:border-gold/30 hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-8 group-hover:bg-gold/5 transition-colors">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  {catSlug && (
                    <span className="text-xs font-medium text-gold uppercase tracking-wider">
                      {catSlug}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-black mt-1 mb-2">
                    {product.title}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {product.shortDescription}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold group-hover:gap-2 transition-all">
                    {dict.products.viewDetails || (isAr ? 'عرض التفاصيل' : 'View Details')}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link
                href={`/${lang}/products/${product.slug}`}
                className="group flex items-center gap-6 rounded-xl bg-white border border-gray-100 p-4 hover:border-gold/30 hover:shadow-md transition-all"
              >
                <div className="h-24 w-24 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center p-2">
                  <Image src={imageUrl} alt={product.title} width={80} height={80} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  {catSlug && <span className="text-xs font-medium text-gold uppercase tracking-wider">{catSlug}</span>}
                  <h3 className="text-lg font-bold text-black truncate">{product.title}</h3>
                  {product.shortDescription && <p className="text-sm text-gray-500 truncate">{product.shortDescription}</p>}
                </div>
                <svg className="h-5 w-5 text-gold shrink-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
