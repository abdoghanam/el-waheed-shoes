'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'

function formatNumber(n: number): string {
  return n >= 1000 ? n.toLocaleString('en-US') : String(n)
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(target)
      return
    }
    let start = 0
    const duration = 2500
    let raf: number
    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      setDisplay(Math.round(easeOutCubic(progress) * target))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return (
    <span className="heading-lg text-accent">
      {formatNumber(display)}
      <span className="text-2xl sm:text-3xl">{suffix}</span>
    </span>
  )
}

export default function LiveStats({ lang }: { lang?: Locale }) {
  const dict = dictionaries[lang || 'en']
  const isAr = (lang || 'en') === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const stats = [
    { target: 15, suffix: '+', label: dict.stats.years },
    { target: 25000, suffix: '+', label: dict.stats.production },
    { target: 20, suffix: '+', label: isAr ? 'دولة نخدمها' : 'Countries Served' },
    { target: 120, suffix: '+', label: dict.stats.workers },
  ]

  return (
    <section ref={ref} className="section-padding bg-section-dark">
      <div className="section-narrow">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedNumber target={stat.target} suffix={stat.suffix} inView={inView} />
              <p className="body-sm mt-3">
                {stat.label}
              </p>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-px h-12 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
