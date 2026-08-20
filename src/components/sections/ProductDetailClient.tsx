'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { siteImages, getProductImage } from '@/lib/images'
import { SizeGuide } from '@/components/ui/SizeGuide'
import { useQuote } from '@/lib/QuoteContext'

const fallbackSizes = Array.from({ length: 12 }, (_, i) => i + 36)
const fallbackColors = [
  { name: 'Black', hex: '#000000' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'White', hex: '#F5F5DC' },
  { name: 'Navy', hex: '#2F4F4F' },
]

const productGallery: Record<string, string[]> = {
  'casual-chunky-sneaker': [siteImages.products.casual, siteImages.products.formal, siteImages.products.sport],
  'sport-runner': [siteImages.products.sport, siteImages.products.casual, siteImages.products.formal],
  'premium-leather': [siteImages.products.formal, siteImages.products.casual, siteImages.products.sport],
  'safety-boot': [siteImages.products.safety, siteImages.products.boot, siteImages.products.casual],
  'leather-sandal': [siteImages.products.sandal, siteImages.products.boot, siteImages.products.casual],
  'fashion-boot': [siteImages.products.boot, siteImages.products.sandal, siteImages.products.formal],
}

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
  features: string[]
  certifications: string[]
  moq: string
  leadTime: string
  weight: string
  usage: string
}

const categoryNames: Record<string, { en: string; ar: string }> = {
  casual: { en: 'Casual Shoes', ar: 'أحذية كاجوال' },
  sport: { en: 'Sport Shoes', ar: 'أحذية رياضية' },
  formal: { en: 'Formal Shoes', ar: 'أحذية رسمية' },
  safety: { en: 'Safety Boots', ar: 'أحذية سلامة' },
  sandals: { en: 'Sandals', ar: 'صندل' },
  boots: { en: 'Boots', ar: 'بوت' },
  kids: { en: 'Kids', ar: 'أطفال' },
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
  features,
  certifications,
  moq,
  leadTime,
  weight,
  usage,
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
  const imagePath = hasProduct ? featuredImageUrl : getProductImage(slug)
  const galleryImages = (productGallery[slug] || [imagePath, siteImages.products.casual, siteImages.products.formal]).map((img, i) => i === 0 ? imagePath : img)

  const catName = categoryNames[categorySlug]

  const relatedProducts = [
    { slug: 'hero-sneaker', name: 'White & Gold Premium' },
    { slug: 'premium-leather', name: 'Premium Leather' },
    { slug: 'safety-boot', name: 'Safety Boot' },
  ]

  return (
    <>
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} selectedSize={selectedSize} />

      <section className="bg-bg-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-6" aria-label="Breadcrumb">
              <Link href={`/${lang}`} className="hover:text-gold transition-colors">{dict.nav.home}</Link>
              <span className="text-text-dim">/</span>
              <Link href={`/${lang}/products`} className="hover:text-gold transition-colors">{dict.products.title}</Link>
              <span className="text-text-dim">/</span>
              {catName && (
                <>
                  <Link href={`/${lang}/products?category=${categorySlug}`} className="hover:text-gold transition-colors">
                    {isAr ? catName.ar : catName.en}
                  </Link>
                  <span className="text-text-dim">/</span>
                </>
              )}
              <span className="text-text-primary">{productName}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">{productName}</h1>
            {catName && (
              <div className="flex items-center gap-3 mt-4">
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold border border-gold/20 uppercase tracking-wider">
                  {isAr ? catName.ar : catName.en}
                </span>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/20">
                  {isAr ? 'متوفر' : 'In Stock'}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasProduct ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Image Gallery — left */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7">
                  <div className="sticky top-24">
                    <div className="aspect-square rounded-2xl bg-bg-card border border-border flex items-center justify-center overflow-hidden mb-4">
                      <Image
                        src={galleryImages[activeImage]}
                        alt={productName}
                        width={600}
                        height={600}
                        className="object-contain w-full h-full p-6 md:p-12 transition-transform duration-500"
                        priority
                      />
                    </div>
                    <div className="flex gap-3">
                      {galleryImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`h-20 w-20 rounded-xl bg-bg-card border-2 overflow-hidden transition-all ${
                            activeImage === i ? 'border-gold shadow-lg shadow-gold/10' : 'border-border hover:border-border-hover'
                          }`}
                          aria-label={`Product image ${i + 1}`}
                        >
                          <Image src={img} alt={`${productName} view ${i + 1}`} width={80} height={80} className="object-contain w-full h-full p-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Product Info — right */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-5">
                  <h2 className="text-2xl font-bold text-text-primary mb-3">{productName}</h2>
                  <p className="text-text-secondary leading-relaxed mb-8">
                    {shortDescription || (isAr
                      ? `${productName} عالي الجودة مصنوع في مصنعنا الحديث في المحلة الكبرى، مصر. متاح للجملة وOEM والعلامة الخاصة.`
                      : `Premium quality ${productName.toLowerCase()} manufactured in our state-of-the-art facility in El Mahalla El Kubra, Egypt. Available for wholesale, OEM, and private label orders.`)}
                  </p>

                  {materials.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">{isAr ? 'المواد' : 'Materials'}</h3>
                      <div className="flex flex-wrap gap-2">
                        {materials.map((mat) => (
                          <span key={mat} className="rounded-full bg-bg-card border border-border px-3 py-1.5 text-sm text-text-secondary">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-5 mb-8">
                    <div className="flex items-start gap-4">
                      <span className="text-sm font-semibold text-text-primary w-20 shrink-0 pt-2">{dict.products.sizes}:</span>
                      <div className="flex flex-wrap gap-2 items-center">
                        {displaySizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`h-10 min-w-[2.5rem] px-3 rounded-lg border text-sm font-medium transition-all ${
                              selectedSize === size
                                ? 'border-gold bg-gold text-black shadow-lg shadow-gold/20'
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
                          {isAr ? 'دليل المقاسات' : 'Size Guide'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="text-sm font-semibold text-text-primary w-20 shrink-0 pt-2">{dict.products.colors}:</span>
                      <div className="flex gap-3">
                        {displayColors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`group relative h-9 w-9 rounded-full transition-all ${
                              selectedColor === color.name
                                ? 'ring-2 ring-gold ring-offset-2 ring-offset-bg-primary scale-110'
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

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowSampleForm(!showSampleForm)}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all ${
                        sampleRequested
                          ? 'border-green-500 bg-green-500/10 text-green-400'
                          : 'border-gold/30 text-gold hover:border-gold/60 hover:bg-gold/5'
                      }`}
                    >
                      {sampleRequested ? (
                        <>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
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
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all ${
                        quoteAdded ? 'bg-green-500 text-white' : 'bg-gold text-black hover:bg-gold-light'
                      }`}
                    >
                      {quoteAdded ? (
                        <>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {isAr ? 'تمت الإضافة!' : 'Added to Quote!'}
                        </>
                      ) : (
                        <>
                          {isAr ? 'أضف لعرض السعر' : 'Add to Quote'}
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </>
                      )}
                    </button>
                  </div>

                  {showSampleForm && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-4 rounded-xl border border-border bg-bg-card p-5 space-y-3"
                    >
                      <p className="text-sm font-semibold text-text-primary">{isAr ? 'طلب عينة' : 'Request a Sample'}</p>
                      <input type="text" placeholder={isAr ? 'الاسم' : 'Name'} aria-label={isAr ? 'الاسم' : 'Name'} className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm text-text-primary focus:border-gold focus:outline-none" />
                      <input type="email" placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} aria-label={isAr ? 'البريد الإلكتروني' : 'Email'} className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm text-text-primary focus:border-gold focus:outline-none" />
                      <button
                        onClick={() => { setSampleRequested(true); setShowSampleForm(false); setTimeout(() => setSampleRequested(false), 3000) }}
                        className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-black hover:bg-gold-light transition-colors"
                      >
                        {isAr ? 'إرسال' : 'Submit'}
                      </button>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                    <span className="text-xs text-text-muted">{isAr ? 'مشاركة' : 'Share'}:</span>
                    {['LinkedIn', 'WhatsApp', 'Email'].map((name) => (
                      <a
                        key={name}
                        href={name === 'WhatsApp' ? `https://wa.me/?text=${encodeURIComponent(productName)}` : name === 'Email' ? `mailto:?subject=${encodeURIComponent(productName)}` : '#'}
                        target={name !== 'Email' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="rounded-full bg-bg-card px-3 py-1.5 text-xs text-text-secondary hover:bg-gold/10 hover:text-gold transition-all border border-border"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* === Professional Specs Section === */}
              <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Features */}
                {features.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="rounded-2xl bg-bg-card border border-border p-6 md:p-8"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">{isAr ? 'المميزات' : 'Features'}</h3>
                    </div>
                    <ul className="space-y-3">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                          <svg className="h-4 w-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Specifications */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl bg-bg-card border border-border p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary">{isAr ? 'المواصفات' : 'Specifications'}</h3>
                  </div>
                  <div className="space-y-4">
                    {moq && (
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-text-muted">{isAr ? 'الحد الأدنى للطلب' : 'MOQ'}</span>
                        <span className="text-sm font-semibold text-text-primary">{moq}</span>
                      </div>
                    )}
                    {leadTime && (
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-text-muted">{isAr ? 'وقت التسليم' : 'Lead Time'}</span>
                        <span className="text-sm font-semibold text-text-primary">{leadTime}</span>
                      </div>
                    )}
                    {weight && (
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-text-muted">{isAr ? 'الوزن' : 'Weight'}</span>
                        <span className="text-sm font-semibold text-text-primary">{weight}</span>
                      </div>
                    )}
                    {usage && (
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-text-muted">{isAr ? 'الاستخدام' : 'Usage'}</span>
                        <span className="text-sm font-semibold text-text-primary">{usage}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-text-muted">{isAr ? 'المقاسات' : 'Sizes'}</span>
                      <span className="text-sm font-semibold text-text-primary">{displaySizes.length} {isAr ? 'مقاسات' : 'sizes'}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Certifications & Quality */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl bg-bg-card border border-border p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary">{isAr ? 'الشهادات والجودة' : 'Certifications & Quality'}</h3>
                  </div>
                  {certifications.length > 0 ? (
                    <div className="space-y-3 mb-6">
                      {certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg bg-bg-elevated border border-border px-4 py-3">
                          <svg className="h-5 w-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
                          <span className="text-sm font-medium text-text-primary">{cert}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-text-muted mb-6">{isAr ? 'شهادات الجودة متاحة عند الطلب' : 'Quality certifications available upon request'}</p>
                  )}
                  <div className="rounded-lg bg-gold/5 border border-gold/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-xs font-semibold text-gold uppercase tracking-wider">{isAr ? 'ضمان الجودة' : 'Quality Assurance'}</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {isAr
                        ? 'جميع منتجاتنا تخضع لاختبارات جودة صارمة وفقاً لمعايير ISO 9001. نضمن أعلى معايير الجودة في جميع مراحل التصنيع.'
                        : 'All products undergo rigorous quality testing per ISO 9001 standards. We ensure the highest quality standards at every manufacturing stage.'}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* CTA Banner */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="mt-16 rounded-2xl bg-gradient-to-r from-gold/10 via-bg-card to-gold/10 border border-gold/20 p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                      {isAr ? 'هل أنت مهتم بهذا المنتج؟' : 'Interested in this product?'}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base">
                      {isAr
                        ? 'تواصل معنا للحصول على عرض سعر مخصص وعينات مجانية.'
                        : 'Contact us for a customized quote and free samples.'}
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <Link href={`/${lang}/quote`} className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black hover:bg-gold-light transition-colors">
                      {isAr ? 'احصل على عرض سعر' : 'Get a Quote'}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                    <a
                      href="https://wa.me/201114093000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 px-6 py-3 text-sm font-semibold text-green-400 hover:bg-green-500/5 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Related Products */}
              <div className="mt-16 md:mt-24">
                <h2 className="text-2xl font-bold text-text-primary mb-8">{isAr ? 'منتجات ذات صلة' : 'Related Products'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedProducts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/${lang}/products/${rp.slug}`}
                      className="group rounded-2xl bg-bg-card border border-border p-6 text-center hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all"
                    >
                      <div className="mx-auto mb-4 flex h-36 w-36 items-center justify-center">
                        <Image
                          src={getProductImage(rp.slug)}
                          alt={rp.name}
                          width={140}
                          height={140}
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="font-bold text-text-primary mb-1">{rp.name}</h3>
                      <span className="text-sm text-gold group-hover:gap-2 inline-flex items-center gap-1">
                        {dict.products.viewDetails}
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <motion.div
              className="rounded-2xl bg-bg-card border border-border p-16 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
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
                <Link href={`/${lang}/products`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-text-secondary hover:border-gold/50 transition-all">
                  {isAr ? 'العودة للمنتجات' : 'Back to Products'}
                </Link>
                <Link href={`/${lang}/quote`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black hover:bg-gold-light transition-colors">
                  {dict.products.inquire}
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
