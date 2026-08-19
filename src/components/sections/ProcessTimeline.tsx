'use client'

import { type Locale } from '@/lib/i18n'
import { Section, SectionHeader } from '@/components/ui/Section'

const steps = [
  {
    titleEn: 'Design & Concept',
    titleAr: 'التصميم والمفهوم',
    descEn: 'Our design team transforms ideas into detailed technical blueprints.',
    descAr: 'فريق التصميم يحول الأفكار إلى مخططات تقنية مفصلة.',
  },
  {
    titleEn: 'Material Selection',
    titleAr: 'اختيار المواد',
    descEn: 'We source premium leather and textile materials from trusted suppliers.',
    descAr: 'نختار مواد جلدية ونسيجية فاخرة من موردين موثوقين.',
  },
  {
    titleEn: 'Precision Cutting',
    titleAr: 'القص بدقة',
    descEn: 'Computer-guided laser cutting ensures minimal waste and maximum accuracy.',
    descAr: 'القص بالليزر الموجه بالحاسوب يضمن أقصى دقة.',
  },
  {
    titleEn: 'Expert Stitching',
    titleAr: 'الخياطة المحترفة',
    descEn: 'Skilled artisans craft each piece using precision stitching techniques.',
    descAr: 'حرفيون مهرة يصنعون كل قطعة بتقنيات خياطة دقيقة.',
  },
  {
    titleEn: 'Quality Assurance',
    titleAr: 'ضمان الجودة',
    descEn: 'Every pair passes through multiple quality checkpoints.',
    descAr: 'كل زوج يمر بعدة نقاط فحص جودة.',
  },
  {
    titleEn: 'Packaging & Delivery',
    titleAr: 'التعبئة والتسليم',
    descEn: 'Finished products are prepared for safe international shipping.',
    descAr: 'يتم تجهيز المنتجات للشحن الدولي الآمن.',
  },
]

export default function ProcessTimeline({ lang }: { lang?: Locale }) {
  const isAr = (lang || 'en') === 'ar'

  return (
    <Section>
      <SectionHeader
        label={isAr ? 'عملية التصنيع' : 'MANUFACTURING PROCESS'}
        title={isAr ? 'عملية التصنيع لدينا' : 'Our Manufacturing Process'}
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <span className="heading-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div>
              <h3 className="heading-sm mb-2">
                {isAr ? step.titleAr : step.titleEn}
              </h3>
              <p className="body-sm">
                {isAr ? step.descAr : step.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
