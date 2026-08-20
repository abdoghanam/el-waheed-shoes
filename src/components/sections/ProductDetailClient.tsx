'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { getProductImage } from '@/lib/images'
import { SizeGuide } from '@/components/ui/SizeGuide'
import { useQuote } from '@/lib/QuoteContext'

const fallbackSizes = Array.from({ length: 12 }, (_, i) => i + 36)
const fallbackColors = [
  { name: 'Black', hex: '#000000' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'White', hex: '#F5F5DC' },
  { name: 'Navy', hex: '#2F4F4F' },
]

const fallbackImages: Record<string, string> = {
  'casual-shoes': getProductImage('casual-shoes'),
  'formal-shoes': getProductImage('formal-shoes'),
  'sport-shoes': getProductImage('sport-shoes'),
  'safety-boots': getProductImage('safety-boots'),
  sandals: getProductImage('sandals'),
  boots: getProductImage('boots'),
}

const relatedProducts = [
  { slug: 'formal-shoes', name: 'Formal Collection' },
  { slug: 'sport-shoes', name: 'Sport Collection' },
  { slug: 'safety-boots', name: 'Safety Boots' },
]

interface ProductDetailClientProps {
  lang: Locale
  slug: string
  productName: string
  shortDescription: string
  materials: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  featuredImageUrl: string
  categorySlug: string
  hasProduct: boolean
}

export function ProductDetailClient({
  lang,
  slug,
  productName,
  shortDescription,
  materials,
  sizes,
  colors,
  featuredImageUrl,
  categorySlug,
  hasProduct,
}: ProductDetailClientProps) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.name || fallbackColors[0].name)
  const [sampleRequested, setSampleRequested] = useState(false)
  const [showSampleForm, setShowSampleForm] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [quoteAdded, setQuoteAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useQuote()

  const displaySizes = sizes.length > 0 ? sizes : fallbackSizes.map(String)
  const displayColors = colors.length > 0 ? colors : fallbackColors
  const imagePath = hasProduct
    ? featuredImageUrl
    : fallbackImages[slug] || '/images/products/shoe-casual.svg'

  const galleryImages = [
    imagePath,
    '/images/products/shoe-casual.svg',
    '/images/products/shoe-formal.svg',
    '/images/products/shoe-sport.svg',
  ]

  return (
    <>
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} selectedSize={selectedSize} />

      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
              <Link href={`/${lang}`} className="hover:text-gold transition-colors">
                {dict.nav.home}
              </Link>
              <span>/</span>
              <Link href={`/${lang}/products`} className="hover:text-gold transition-colors">
                {dict.products.title}
              </Link>
              <span>/</span>
              {categorySlug && (
                <>
                  <Link
                    href={`/${lang}/products?category=${categorySlug}`}
                    className="hover:text-gold transition-colors"
                  >
                    {categorySlug}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-white">{productName}</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {productName}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {hasProduct ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="aspect-square rounded-xl bg-bg-elevated flex items-center justify-center overflow-hidden">
                    <Image
                      src={galleryImages[activeImage]}
                      alt={productName}
                      width={500}
                      height={500}
                      className="object-contain w-full h-full p-8"
                      priority
                    />
                  </div>
                  <div className="flex gap-3">
                    {galleryImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`h-20 w-20 rounded-lg bg-bg-elevated border-2 overflow-hidden transition-all ${
                          activeImage === i ? 'border-gold' : 'border-transparent hover:border-border-hover'
                        }`}
                      >
                        <Image src={img} alt={`Product thumbnail ${i + 1}`} width={80} height={80} className="object-contain w-full h-full p-2" />
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 border border-green-200">
                      {isAr ? 'متوفر' : 'In Stock'}
                    </span>
                    {categorySlug && (
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold border border-gold/20">
                        {categorySlug}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-text-primary mb-4">{productName}</h2>
                  <p className="text-text-muted mb-6 leading-relaxed">
                    {shortDescription ||
                      (isAr
                        ? `${productName} عالي الجودة مصنوع في مصنعنا الحديث في المحلة الكبرى، مصر. متاح للجملة وOEM والعلامة الخاصة.`
                        : `Premium quality ${productName.toLowerCase()} manufactured in our state-of-the-art facility in El Mahalla El Kubra, Egypt. Available for wholesale, OEM, and private label orders.`)}
                  </p>

                  {materials.length > 0 && (
                    <div className="rounded-lg bg-bg-elevated border border-border p-4 mb-6">
                      <h3 className="text-sm font-bold text-text-primary mb-2">
                        {isAr ? 'المواد' : 'Materials'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {materials.map((mat) => (
                          <span key={mat} className="rounded-full bg-bg-card border border-border px-3 py-1 text-xs text-text-secondary">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-text-secondary w-24 shrink-0 pt-1">{dict.products.sizes}:</span>
                      <div className="flex flex-wrap gap-2 items-center">
                        {displaySizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`h-10 min-w-[2.5rem] px-2 rounded-lg border text-sm font-medium transition-all ${
                              selectedSize === size
                                ? 'border-gold bg-gold text-black'
                                : 'border-border text-text-secondary hover:border-gold/50 hover:bg-gold/5'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                        <button
                          onClick={() => setShowSizeGuide(true)}
                          className="text-xs text-gold underline hover:text-gold-light ml-2"
                        >
                          Size Guide
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-text-secondary w-24 shrink-0 pt-1">{dict.products.colors}:</span>
                      <div className="flex gap-3">
                        {displayColors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`group relative h-8 w-8 rounded-full transition-all ${
                              selectedColor === color.name
                                ? 'ring-2 ring-gold ring-offset-2 scale-110'
                                : 'hover:scale-110'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {color.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button
                      onClick={() => setShowSampleForm(!showSampleForm)}
                      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-all ${
                        sampleRequested
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gold/30 text-gold hover:border-gold/60 hover:bg-gold/5'
                      }`}
                    >
                      {sampleRequested ? (
                        <>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {isAr ? 'تم طلب العينة!' : 'Sample Requested!'}
                        </>
                      ) : (
                        isAr ? 'طلب عينة' : 'Request Sample'
                      )}
                    </button>

                    <button
                      onClick={() => {
                        addItem({ productId: slug, name: productName, quantity: 1, notes: '' })
                        setQuoteAdded(true)
                        setTimeout(() => setQuoteAdded(false), 3000)
                      }}
                      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                        quoteAdded
                          ? 'bg-green-500 text-white'
                          : 'bg-gold text-black hover:bg-gold-light'
                      }`}
                    >
                      {quoteAdded ? (
                        <>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {isAr ? 'تمت الإضافة!' : 'Added to Quote!'}
                        </>
                      ) : (
                        <>
                          {isAr ? 'أضف لعرض السعر' : 'Add to Quote'}
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  {showSampleForm && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-4 rounded-lg border border-border p-4 space-y-3"
                    >
                      <p className="text-sm font-medium text-text-primary">{isAr ? 'طلب عينة' : 'Request a Sample'}</p>
                      <input type="text" placeholder={isAr ? 'الاسم' : 'Name'} className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary focus:border-gold focus:outline-none" />
                      <input type="email" placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary focus:border-gold focus:outline-none" />
                      <button
                        onClick={() => {
                          setSampleRequested(true)
                          setShowSampleForm(false)
                          setTimeout(() => setSampleRequested(false), 3000)
                        }}
                        className="w-full rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black hover:bg-gold-light transition-colors"
                      >
                        {isAr ? 'إرسال' : 'Submit'}
                      </button>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                    <span className="text-xs text-gray-400">{isAr ? 'مشاركة' : 'Share'}:</span>
                    {[
                      { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}` },
                      { name: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(productName)}` },
                      { name: 'Email', url: `mailto:?subject=${encodeURIComponent(productName)}` },
                    ].map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-bg-elevated px-3 py-1.5 text-xs text-text-secondary hover:bg-gold/10 hover:text-gold transition-all"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="mt-20">
                <h2 className="text-2xl font-bold text-text-primary mb-8">{isAr ? 'منتجات ذات صلة' : 'Related Products'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedProducts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/${lang}/products/${rp.slug}`}
                      className="group rounded-xl bg-bg-elevated border border-border p-6 text-center hover:border-gold/30 hover:shadow-md transition-all"
                    >
                      <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center">
                        <Image
                          src={fallbackImages[rp.slug] || '/images/products/shoe-casual.svg'}
                          alt={rp.name}
                          width={120}
                          height={120}
                          className="object-contain transition-transform group-hover:scale-110"
                        />
                      </div>
                      <h3 className="font-bold text-text-primary mb-1">{rp.name}</h3>
                      <span className="text-sm text-gold group-hover:gap-2 inline-flex items-center gap-1">
                        {dict.products.viewDetails}
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <motion.div
              className="rounded-xl bg-bg-elevated border border-border p-16 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                {isAr ? 'المنتج قادم قريباً' : 'Product Coming Soon'}
              </h2>
              <p className="text-text-muted mb-8 max-w-md mx-auto">
                {isAr
                  ? 'هذا المنتج قيد الإعداد. يرجى التواصل معنا للحصول على مزيد من المعلومات.'
                  : 'This product is being set up. Please contact us for more information.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/${lang}/products`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-secondary hover:border-gold/50 transition-all"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {isAr ? 'العودة للمنتجات' : 'Back to Products'}
                </Link>
                <Link
                  href={`/${lang}/quote`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
                >
                  {dict.products.inquire}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
