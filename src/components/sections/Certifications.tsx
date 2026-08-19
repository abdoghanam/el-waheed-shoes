'use client'

import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { Section, SectionHeader } from '@/components/ui/Section'

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

export default function Certifications({ lang }: { lang?: Locale }) {
  const isAr = (lang || 'en') === 'ar'

  return (
    <Section dark={false}>
      <SectionHeader
        label={isAr ? 'الشهادات' : 'CERTIFICATIONS'}
        title={isAr ? 'الجودة والشهادات' : 'Quality & Certifications'}
        align="center"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.name.en}
            className="card text-center"
          >
            <div className="mx-auto mb-4 h-12 w-12 relative">
              <Image src={cert.icon} alt="" fill className="object-contain opacity-60" />
            </div>
            <h3 className="heading-sm text-sm">
              {isAr ? cert.name.ar : cert.name.en}
            </h3>
            <p className="body-sm mt-1">
              {isAr ? cert.desc.ar : cert.desc.en}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
