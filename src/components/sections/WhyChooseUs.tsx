'use client'

import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Section, SectionHeader } from '@/components/ui/Section'

const features = [
  {
    key: 'quality' as const,
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'innovation' as const,
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    key: 'partnership' as const,
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'reliability' as const,
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function WhyChooseUs({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]

  return (
    <Section dark={false}>
      <SectionHeader
        label={lang === 'ar' ? 'لماذا نحن' : 'WHY CHOOSE US'}
        title={lang === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
        description={dict.about.mission}
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div
            key={feature.key}
            className="card text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent mx-auto mb-5">
              {feature.icon}
            </div>
            <h3 className="heading-sm mb-3">
              {dict.about.values[feature.key]}
            </h3>
            <p className="body-sm">
              {dict.about.values[`${feature.key}Desc` as keyof typeof dict.about.values]}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
