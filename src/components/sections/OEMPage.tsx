'use client'

import React from 'react'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'
import FAQ from './FAQ'

const services = ['custom', 'brand', 'bulk', 'wholesale'] as const

const serviceIcons: Record<string, React.ReactNode> = {
  custom: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  brand: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  bulk: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  wholesale: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
}

export default function OEMPage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: dict.nav.oem }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'شريك التصنيع' : 'MANUFACTURING PARTNER'}
          title={dict.oem.title}
          description={dict.oem.subtitle}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <p className="body-lg max-w-3xl mx-auto text-center mb-12">
          {dict.oem.description}
        </p>
        <SectionGrid cols={2}>
          {services.map((service) => (
            <div key={service} className="card">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                {serviceIcons[service]}
              </div>
              <h3 className="heading-sm mb-2">
                {dict.oem.services[`${service}` as keyof typeof dict.oem.services]}
              </h3>
              <p className="body-sm">
                {dict.oem.services[`${service}Desc` as keyof typeof dict.oem.services]}
              </p>
            </div>
          ))}
        </SectionGrid>
      </Section>

      <Section>
        <SectionHeader
          label={isAr ? 'عملية OEM' : 'OEM PROCESS'}
          title={isAr ? 'كيف نعمل' : 'How We Work'}
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { num: '01', titleEn: 'Design & Specs', titleAr: 'التصميم والمواصفات', descEn: 'Share your designs and specifications with our team.', descAr: 'شارك تصاميمك ومواصفاتك مع فريقنا.' },
            { num: '02', titleEn: 'Quote & Timeline', titleAr: 'عرض السعر والجدول', descEn: 'We provide a detailed quote and production timeline.', descAr: 'نقدم عرض سعر مفصلاً وجدولاً زمنياً للإنتاج.' },
            { num: '03', titleEn: 'Sample & Approval', titleAr: 'العينات والموافقة', descEn: 'Sample production for your review and approval.', descAr: 'إنتاج العينات للمراجعة والموافقة.' },
            { num: '04', titleEn: 'Production & Delivery', titleAr: 'الإنتاج والتسليم', descEn: 'Mass production with quality checks and timely delivery.', descAr: 'الإنتاج الضخم مع فحوصات جودة وتسليم في الوقت المحدد.' },
          ].map((step) => (
            <div key={step.num} className="card text-center">
              <span className="heading-lg text-accent block mb-3">{step.num}</span>
              <h4 className="heading-sm mb-2">{isAr ? step.titleAr : step.titleEn}</h4>
              <p className="body-sm">{isAr ? step.descAr : step.descEn}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark={false}>
        <div className="text-center">
          <Link href={`/${lang}/quote`} className="btn-primary">
            {dict.hero.ctaQuote}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Section>

      <FAQ lang={lang} variant="oem" />
    </>
  )
}
