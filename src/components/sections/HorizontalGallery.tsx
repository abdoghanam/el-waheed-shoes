'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import { type Locale } from '@/lib/i18n'

const galleryItems = [
  { title: { en: 'Factory Exterior', ar: 'مبنى المصنع' }, src: '/images/factory/exterior.svg', color: '#1a1a2e' },
  { title: { en: 'Production Line', ar: 'خط الإنتاج' }, src: '/images/process/production-line.svg', color: '#16213e' },
  { title: { en: 'Leather Cutting', ar: 'قص الجلد' }, src: '/images/process/leather-cutting.svg', color: '#0f3460' },
  { title: { en: 'Stitching Detail', ar: 'تفاصيل الخياطة' }, src: '/images/process/stitching.svg', color: '#1a1a2e' },
  { title: { en: 'Quality Inspection', ar: 'فحص الجودة' }, src: '/images/process/quality-inspection.svg', color: '#16213e' },
  { title: { en: 'Finished Products', ar: 'المنتجات النهائية' }, src: '/images/factory/finished-products.svg', color: '#0f3460' },
  { title: { en: 'Packaging Area', ar: 'منطقة التعبئة' }, src: '/images/factory/packaging.svg', color: '#1a1a2e' },
  { title: { en: 'Shipping Dock', ar: 'رصيف الشحن' }, src: '/images/factory/shipping.svg', color: '#16213e' },
]

export default function HorizontalGallery({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar'
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)

  const scrollTo = useCallback((index: number) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const children = container.children
    if (children[index]) {
      const child = children[index] as HTMLElement
      const scrollLeft = child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2
      animate(x, scrollLeft, { type: 'spring', stiffness: 300, damping: 30 })
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [x])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => {
      const scrollCenter = container.scrollLeft + container.offsetWidth / 2
      const children = Array.from(container.children) as HTMLElement[]
      let closest = 0
      let minDist = Infinity
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2
        const dist = Math.abs(scrollCenter - childCenter)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActiveIndex(closest)
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const prev = () => scrollTo(Math.max(0, activeIndex - 1))
  const next = () => scrollTo(Math.min(galleryItems.length - 1, activeIndex + 1))

  return (
    <section className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            {isAr ? (
              <span className="text-gold-gradient">أعمالنا قيد التنفيذ</span>
            ) : (
              <>
                <span className="text-white">Our Work in </span>
                <span className="text-gold-gradient">Motion</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {isAr ? 'جولة داخل مصنعنا ومراحل الإنتاج' : 'Take a tour inside our factory and production stages'}
          </p>
        </motion.div>

        <div className="relative group">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 snap-center cursor-grab active:cursor-grabbing"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="relative w-[300px] sm:w-[350px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 group/card">
                  <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="300" fill={item.color} />
                    <rect x="20" y="20" width="360" height="260" rx="8" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
                    <text x="200" y="130" textAnchor="middle" fill="rgba(212,175,55,0.4)" fontSize="14" fontFamily="sans-serif">
                      {isAr ? item.title.ar : item.title.en}
                    </text>
                    <rect x="150" y="145" width="100" height="4" rx="2" fill="rgba(212,175,55,0.2)" />
                    <circle cx="200" cy="170" r="3" fill="rgba(212,175,55,0.3)" />
                    <line x1="100" y1="200" x2="300" y2="200" stroke="rgba(212,175,55,0.1)" strokeWidth="1" />
                    <line x1="120" y1="220" x2="280" y2="220" stroke="rgba(212,175,55,0.08)" strokeWidth="1" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
                    <span className="text-gold text-xs font-medium tracking-wider uppercase">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-white font-semibold mt-1">
                      {isAr ? item.title.ar : item.title.en}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute top-1/2 -left-2 md:-left-6 -translate-y-1/2 rounded-full bg-black/60 border border-white/10 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-2 md:-right-6 -translate-y-1/2 rounded-full bg-black/60 border border-white/10 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {galleryItems.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${i === activeIndex ? 'w-6 bg-gold' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
