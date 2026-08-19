'use client'

import { type Locale } from '@/lib/i18n'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

const initiatives = [
  {
    titleEn: 'Eco-Friendly Materials',
    titleAr: 'مواد صديقة للبيئة',
    descriptionEn: 'We offer a diverse range of eco-friendly materials including recycled leather, recycled rubber, and natural fibers, carefully selected to meet international environmental standards while delivering premium quality.',
    descriptionAr: 'لدينا خيارات متنوعة من المواد الصديقة للبيئة تشمل الجلد المعاد تدويره والمطاط المعاد تدويره والألياف الطبيعية، مختارة بعناية لتلبية المعايير البيئية الدولية مع تقديم جودة متميزة.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    titleEn: 'Waste Reduction',
    titleAr: 'تقليل النفايات',
    descriptionEn: 'We achieve a 72% waste diversion rate from landfills through comprehensive recycling programs, advanced cutting optimization, and responsible material management across all production lines.',
    descriptionAr: 'نحقق نسبة تحويل 72% من مخلفات الإنتاج من مكبات النفايات من خلال برامج إعادة التدوير وتقنيات القطع المتقدمة وإدارة المواد المسؤولة في جميع خطوط الإنتاج.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    titleEn: 'Energy Efficiency',
    titleAr: 'كفاءة الطاقة',
    descriptionEn: 'A 450 kW solar panel system reduces electricity consumption by 40%, powering key manufacturing operations with clean, renewable energy year-round.',
    descriptionAr: 'نظام طاقة شمسية 450 كيلوواط يوفر 40% من استهلاك الكهرباء في المصنع، مما يدعم العمليات الإنتاجية الأساسية بطاقة نظيفة ومتجددة على مدار العام.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    titleEn: 'Water Conservation',
    titleAr: 'الحفاظ على المياه',
    descriptionEn: 'Our advanced water treatment system recycles 85% of water used in dyeing and cleaning processes, significantly reducing freshwater consumption across the facility.',
    descriptionAr: 'نظام معالجة مياه يعاد تدوير 85% من المياه المستخدمة في عمليات الصباغة والتنظيف، مما يقلل بشكل ملحوظ استهلاك المياه العذبة في المصنع.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.004 8.004 0 005.279-2.056c.514-.343.871-.933.871-1.58V10.5c0-1.525-1.5-2.5-2.5-2.5S13.149 8.975 13.149 10.5v6.864c0 .647-.357 1.237-.871 1.58A8.004 8.004 0 0112 21z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9" />
      </svg>
    ),
  },
]

const impactNumbers = [
  { numberEn: '72%', numberAr: '٧٢٪', labelEn: 'Waste Diversion', labelAr: 'تحويل النفايات' },
  { numberEn: '450 kW', numberAr: '٤٥٠ كيلوواط', labelEn: 'Solar Capacity', labelAr: 'الطاقة الشمسية' },
  { numberEn: '85%', numberAr: '٨٥٪', labelEn: 'Water Recycled', labelAr: 'مياه معاد تدويرها' },
  { numberEn: '40%', numberAr: '٤٠٪', labelEn: 'Energy Saved', labelAr: 'طاقة موفرة' },
]

export default function SustainabilityPage({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar'

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: isAr ? 'الاستدامة' : 'Sustainability' }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'الاستدامة' : 'SUSTAINABILITY'}
          title={isAr ? 'ملتزمون بمستقبل أفضل' : 'Committed to a Better Future'}
          description={isAr ? 'التصنيع المسؤول في صميم كل ما نفعله' : 'Responsible manufacturing at the core of everything we do'}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <SectionGrid cols={2}>
          {initiatives.map((item) => (
            <div key={item.titleEn} className="card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                {item.icon}
              </div>
              <h3 className="heading-sm mb-2">{isAr ? item.titleAr : item.titleEn}</h3>
              <p className="body-sm">{isAr ? item.descriptionAr : item.descriptionEn}</p>
            </div>
          ))}
        </SectionGrid>
      </Section>

      <Section dark={true}>
        <SectionHeader
          label={isAr ? 'تأثيرنا' : 'OUR IMPACT'}
          title={isAr ? 'أرقام تتحدث' : 'Numbers That Speak'}
          align="center"
        />
        <SectionGrid cols={4}>
          {impactNumbers.map((item) => (
            <div key={item.labelEn} className="text-center p-6 rounded-2xl border border-border">
              <div className="text-accent heading-lg mb-2">
                {isAr ? item.numberAr : item.numberEn}
              </div>
              <div className="body-sm">
                {isAr ? item.labelAr : item.labelEn}
              </div>
            </div>
          ))}
        </SectionGrid>
      </Section>

      <Section dark={false}>
        <SectionHeader
          label={isAr ? 'الالتزام' : 'COMMITMENT'}
          title={isAr ? 'التزامنا بالاستدامة' : 'Our Sustainability Commitment'}
          align="center"
        />
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="body-md">
            {isAr
              ? 'في الوحيد للاحذية، الاستدامة ليست مجرد كلمة عابرة — إنها جزء أساسي من كيف نعمل. نحن ملتزمون بتقليل تأثيرنا البيئي مع الحفاظ على أعلى معايير الجودة.'
              : 'At El Waheed Shoes, sustainability isn\'t just a buzzword — it\'s a core part of how we operate. We are committed to reducing our environmental footprint while maintaining the highest quality standards.'}
          </p>
          <p className="body-md">
            {isAr
              ? 'من المواد المستدامة إلى كفاءة الطاقة، نبحث باستمرار عن طرق جديدة لتصنيع منتجات أفضل مع الحفاظ على كوكبنا.'
              : 'From sustainable materials to energy efficiency, we continuously seek new ways to manufacture better products while preserving our planet.'}
          </p>
        </div>
      </Section>
    </>
  )
}
