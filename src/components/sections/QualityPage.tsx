'use client'

import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

const certifications = [
  {
    icon: '/images/icons/iso-certified.svg',
    name: { en: 'ISO 9001:2015', ar: 'ISO 9001:2015' },
    desc: { en: 'Quality Management System', ar: 'نظام إدارة الجودة' },
  },
  {
    icon: '/images/icons/quality-badge.svg',
    name: { en: 'CE Certified', ar: 'شهادة CE' },
    desc: { en: 'European Conformity', ar: 'التوافق الأوروبي' },
  },
  {
    icon: '/images/icons/eco-friendly.svg',
    name: { en: 'ISO 14001', ar: 'ISO 14001' },
    desc: { en: 'Environmental Management', ar: 'إدارة البيئة' },
  },
  {
    icon: '/images/icons/export-world.svg',
    name: { en: 'Global Export', ar: 'التصدير العالمي' },
    desc: { en: 'Export to 20+ Countries', ar: 'تصدير لأكثر من 20 دولة' },
  },
]

const metrics = [
  { en: 'Defect Rate', ar: 'نسبة العيوب', value: '< 1%' },
  { en: 'On-Time Delivery', ar: 'التسليم في الموعد', value: '98%' },
  { en: 'Client Retention', ar: 'احتفاظ العملاء', value: '95%' },
  { en: 'Pass Rate First Check', ar: 'نسبة النجاح', value: '97%' },
]

export default function QualityPage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: dict.nav.quality }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'التميز' : 'EXCELLENCE'}
          title={dict.quality.title}
          description={dict.quality.subtitle}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <SectionHeader
          label={isAr ? 'وعدنا بالجودة' : 'OUR QUALITY PROMISE'}
          title={isAr ? 'الجودة في كل خطوة' : 'Quality at Every Step'}
          description={dict.quality.subtitle}
          align="center"
        />
      </Section>

      <Section>
        <SectionHeader
          label={isAr ? 'شهاداتنا' : 'CERTIFICATIONS'}
          title={isAr ? 'شهاداتنا' : 'Our Certifications'}
          align="center"
        />
        <SectionGrid cols={4}>
          {certifications.map((cert) => (
            <div key={cert.name.en} className="card text-center">
              <h3 className="heading-sm text-sm mb-1">
                {isAr ? cert.name.ar : cert.name.en}
              </h3>
              <p className="body-sm">
                {isAr ? cert.desc.ar : cert.desc.en}
              </p>
            </div>
          ))}
        </SectionGrid>
      </Section>

      <Section dark={false}>
        <SectionHeader
          label={isAr ? 'مؤشرات الأداء' : 'QUALITY METRICS'}
          title={isAr ? 'أرقام تتحدث' : 'Numbers That Speak'}
          align="center"
        />
        <SectionGrid cols={4}>
          {metrics.map((metric) => (
            <div key={metric.en} className="card text-center">
              <span className="heading-lg text-accent block mb-2">{metric.value}</span>
              <p className="body-sm">{isAr ? metric.ar : metric.en}</p>
            </div>
          ))}
        </SectionGrid>
      </Section>
    </>
  )
}
