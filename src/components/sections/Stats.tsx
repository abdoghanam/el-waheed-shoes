'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'motion/react'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'

const stats = [
  { value: 15, suffix: '+', label: 'years', icon: '/images/icons/experience.svg' },
  { value: 120, suffix: '', label: 'workers', icon: '/images/icons/team.svg' },
  { value: 25000, suffix: '+', label: 'production', icon: '/images/icons/production.svg' },
  { value: 4000, suffix: ' m²', label: 'factory', icon: '/images/icons/facility.svg' },
]

const labelKeys = ['years', 'workers', 'production', 'factory'] as const

function formatNumber(n: number, locale?: Locale): string {
  if (n >= 1000) return n.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')
  return String(n)
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(target)
      return
    }

    let start = 0
    const duration = 2000
    let raf: number

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      setDisplay(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return (
    <span className="text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
      {formatNumber(display, lang)}
      <span className="text-gold">{suffix}</span>
    </span>
  )
}

export default function Stats({ lang }: { lang?: Locale }) {
  const dict = dictionaries[lang || 'en']
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative -mt-16 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="group rounded-xl bg-[#111] p-4 sm:p-6 border border-white/5 text-center transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            <div className="mx-auto mb-3 h-8 w-8 sm:h-10 sm:w-10 relative">
              <Image src={stat.icon} alt="" fill className="object-contain" />
            </div>
            <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
            <div className="mt-2 text-sm text-gray-500 font-medium">
              {dict.stats[labelKeys[i]]}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
