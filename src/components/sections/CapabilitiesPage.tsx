'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

function formatNumber(n: number, locale?: string): string {
  return n >= 1000 ? n.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US') : String(n)
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedCounter({
  target,
  suffix,
  inView,
  locale,
}: {
  target: number
  suffix: string
  inView: boolean
  locale?: string
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
    <span className="heading-lg text-accent">
      {formatNumber(display, locale)}
      <span className="text-2xl">{suffix}</span>
    </span>
  )
}

export default function CapabilitiesPage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: 4000, suffix: ' m\u00B2', label: dict.capabilities.stats.area },
    { value: 120, suffix: '', label: dict.capabilities.stats.workers },
    { value: 900, suffix: '', label: dict.capabilities.stats.daily },
    { value: 25000, suffix: '', label: dict.capabilities.stats.monthly },
  ]

  const capabilities = [
    {
      key: 'capacity',
      titleEn: 'Production Capacity',
      titleAr: 'الطاقة الإنتاجية',
      descEn: '25,000+ pairs per month across all product lines.',
      descAr: 'أكثر من 25,000 زوج شهرياً عبر جميع خطوط الإنتاج.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      key: 'technology',
      titleEn: 'Modern Technology',
      titleAr: 'التكنولوجيا الحديثة',
      descEn: 'Computer-guided cutting, automated stitching, and advanced QC.',
      descAr: 'قص موجه بالحاسوب، وخياطة آلية، ومراقبة جودة متقدمة.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      key: 'materials',
      titleEn: 'Premium Materials',
      titleAr: 'مواد فاخرة',
      descEn: 'Genuine leather, PU/PVC, canvas, rubber, EVA, and more.',
      descAr: 'جلد طبيعي، وPU/PVC، وقماش، ومطاط، وEVA والمزيد.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      key: 'design',
      titleEn: 'Custom Design',
      titleAr: 'تصميم مخصص',
      descEn: 'In-house design team for OEM and private label projects.',
      descAr: 'فريق تصميم داخلي لمشاريع OEM والعلامة الخاصة.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
        </svg>
      ),
    },
    {
      key: 'logistics',
      titleEn: 'Global Logistics',
      titleAr: 'اللوجستيات العالمية',
      descEn: 'Export-ready packaging and international shipping to 20+ countries.',
      descAr: 'تعبئة جاهزة للتصدير وشحن دولي لأكثر من 20 دولة.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'support',
      titleEn: 'Dedicated Support',
      titleAr: 'دعم مخصص',
      descEn: 'Dedicated account managers for every client partnership.',
      descAr: 'مدير حساب مخصص لكل شراكة عميل.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: dict.nav.capabilities }]} lang={lang} />
        <SectionHeader
          label={dict.capabilitiesPage.facility}
          title={dict.capabilities.title}
          description={dict.capabilities.subtitle}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <SectionGrid cols={4}>
          {stats.map((stat) => (
            <div key={stat.label} className="card text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} locale={lang} />
              <p className="body-sm mt-3">{stat.label}</p>
            </div>
          ))}
        </SectionGrid>
      </Section>

      <Section>
        <SectionHeader
          label={isAr ? 'قدراتنا' : 'CAPABILITIES'}
          title={dict.capabilitiesPage.whatWeOffer}
          align="center"
        />
        <SectionGrid cols={3}>
          {capabilities.map((cap) => (
            <div key={cap.key} className="card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                {cap.icon}
              </div>
              <h3 className="heading-sm mb-2">
                {isAr ? cap.titleAr : cap.titleEn}
              </h3>
              <p className="body-sm">
                {isAr ? cap.descAr : cap.descEn}
              </p>
            </div>
          ))}
        </SectionGrid>
      </Section>
    </>
  )
}
