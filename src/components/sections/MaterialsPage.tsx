'use client'

import { type Locale } from '@/lib/i18n'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'
import { MaterialsLibrary } from './MaterialsLibrary'

const sourcingInfo = [
  {
    titleEn: 'Global Sourcing',
    titleAr: 'المصادر العالمية',
    descriptionEn: 'We partner with tanneries and material suppliers across Italy, Turkey, India, and China to ensure access to the finest materials at competitive prices.',
    descriptionAr: 'نتعامل مع دباغات وموردي مواد في إيطاليا وتركيا والهند والصين للحصول على أفضل المواد بأسعار تنافسية.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titleEn: 'Certified Quality',
    titleAr: 'جودة معتمدة',
    descriptionEn: 'All materials meet REACH, OEKO-TEX, and ISO 9001 standards. We provide full material certifications with every order.',
    descriptionAr: 'جميع المواد تلبي معايير REACH و OEKO-TEX و ISO 9001. نقدم شهادات المواد الكاملة مع كل طلب.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    titleEn: 'Sustainable Options',
    titleAr: 'خيارات مستدامة',
    descriptionEn: 'Eco-friendly materials including recycled rubber, water-based adhesives, and vegetable-tanned leather available upon request.',
    descriptionAr: 'مواد صديقة للبيئة تشمل المطاط المعاد تدويره والمواد اللاصقة المائية والجلد المُدبغ نباتياً متاحة عند الطلب.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    titleEn: 'Custom Development',
    titleAr: 'تطوير مخصص',
    descriptionEn: 'Need a specific material? Our R&D team can develop custom materials, colors, and finishes tailored to your brand requirements.',
    descriptionAr: 'تحتاج مادة محددة؟ فريق البحث والتطوير لدينا يمكنه تطوير مواد وألوان وأنهاء مخصصة وفقاً لمتطلبات علامتك التجارية.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
]

export default function MaterialsPage({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: isAr ? 'المواد' : 'Materials' }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'الجودة' : 'QUALITY'}
          title={isAr ? 'مكتبة المواد لدينا' : 'Our Material Library'}
          description={isAr ? 'مواد فاخرة من موردين موثوقين حول العالم' : 'Premium materials sourced from trusted suppliers worldwide'}
          align="center"
        />
      </Section>

      <MaterialsLibrary lang={lang} />

      <Section dark={false}>
        <SectionHeader
          label={isAr ? 'لماذا تختار موادنا' : 'WHY OUR MATERIALS'}
          title={isAr ? 'لماذا تختار موادنا' : 'Why Choose Our Materials'}
          description={isAr ? 'نختار المواد بعناية لتلبية أعلى معايير الجودة والاستدامة' : 'We carefully select materials to meet the highest standards of quality and sustainability'}
          align="center"
        />
        <SectionGrid cols={2}>
          {sourcingInfo.map((item) => (
            <div key={item.titleEn} className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="heading-sm mb-2">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="body-sm">
                    {isAr ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </SectionGrid>
      </Section>
    </>
  )
}
