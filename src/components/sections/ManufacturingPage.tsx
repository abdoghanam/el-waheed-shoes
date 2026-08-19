'use client'

import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'
import FAQ from './FAQ'

export default function ManufacturingPage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const steps = ['material', 'cutting', 'stitching', 'assembly', 'quality', 'packaging'] as const

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: dict.nav.manufacturing }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'كيف نعمل' : 'HOW WE WORK'}
          title={dict.manufacturing.title}
          description={dict.manufacturing.subtitle}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <SectionGrid cols={3}>
          {steps.map((step, i) => (
            <div key={step} className="card text-center">
              <span className="heading-lg text-accent block mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="heading-sm mb-3">
                {dict.manufacturing.steps[`${step}` as keyof typeof dict.manufacturing.steps]}
              </h3>
              <p className="body-sm">
                {dict.manufacturing.steps[`${step}Desc` as keyof typeof dict.manufacturing.steps]}
              </p>
            </div>
          ))}
        </SectionGrid>
      </Section>

      <FAQ lang={lang} variant="manufacturing" />
    </>
  )
}
