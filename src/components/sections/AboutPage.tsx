'use client'

import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

const timeline = [
  { year: '2010', key: 'founded' as const },
  { year: '2015', key: 'capacity' as const },
  { year: '2020', key: 'workers' as const },
  { year: '2026', key: 'today' as const },
]

export default function AboutPage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: dict.nav.about }]} lang={lang} />
        <SectionHeader
          label={dict.nav.about}
          title={dict.about.title}
          description={dict.about.subtitle}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <SectionGrid cols={2}>
          <div>
            <p className="label-tag mb-4">{isAr ? 'مهمتنا' : 'OUR MISSION'}</p>
            <h3 className="heading-sm mb-3">{dict.about.mission}</h3>
            <p className="body-md">{dict.about.vision}</p>
          </div>
          <div className="space-y-6">
            {(['quality', 'innovation', 'partnership', 'reliability'] as const).map((key) => (
              <div key={key} className="card">
                <h4 className="heading-sm mb-2 text-accent">
                  {dict.about.values[key]}
                </h4>
                <p className="body-sm">
                  {dict.about.values[`${key}Desc` as keyof typeof dict.about.values]}
                </p>
              </div>
            ))}
          </div>
        </SectionGrid>
      </Section>

      <Section>
        <SectionHeader
          label={isAr ? 'رحلتنا' : 'OUR JOURNEY'}
          title={isAr ? 'مسيرة النمو' : 'Growth Timeline'}
          align="center"
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div key={item.year} className="relative flex items-start gap-8">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card border border-border">
                  <span className="heading-sm text-accent">{item.year}</span>
                </div>
                <div className="pt-2">
                  <p className="body-md">
                    {dict.about.timeline[item.key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
