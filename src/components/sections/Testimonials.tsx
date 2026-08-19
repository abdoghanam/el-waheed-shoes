'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { Section, SectionHeader } from '@/components/ui/Section'

const testimonials = [
  {
    quote: { en: 'We switched from a Chinese supplier two years ago and haven\'t looked back. The MOQ flexibility and consistent sizing across 12,000-pair orders is exactly what we needed for our Gulf retail expansion.', ar: 'انتقلنا من مورد صيني قبل عامين ولم نتمنّع قط. مرونة الحد الأدنى للطلب وثبات المقاسات عبر طلبات 12,000 زوج هو بالضبط ما احتجناه لتوسعنا في تجارة التجزئة الخليجية.' },
    name: { en: 'Khalid Al-Mansoori', ar: 'خالد المنصوري' },
    company: { en: 'Al Rashid Trading LLC', ar: 'شركة الراشد للتجارة' },
    country: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
  },
  {
    quote: { en: 'Their private-label program is exceptional. We briefed them on a full safety-boot line with S3 SRC certification and they delivered samples within three weeks. Production quality has been flawless for four consecutive seasons now.', ar: ' برنامج العلامة الخاصة استثنائي. أخبرناهم عن خط كامل من حذاء السلامة بشهادة S3 SRC وقدموا عينات خلال ثلاثة أسابيع. جودة الإنتاج كانت خالية من العيوب لأربعة مواسم متتالية.' },
    name: { en: 'Thomas Müller', ar: 'توماس مولر' },
    company: { en: 'Schuhhaus Müller GmbH', ar: 'شوهوس مولر' },
    country: { en: 'Munich, Germany', ar: 'ميونخ، ألمانيا' },
  },
  {
    quote: { en: 'We needed a partner who could handle 50,000 pairs per quarter with tight seasonal deadlines. Their factory turnaround time consistently beats what we were quoted by competitors in Turkey and Vietnam.', ar: ' كنا بحاجة إلى شريك يمكنه التعامل مع 50,000 زوج في الربع بمواعيد نهائية موسمية صعبة. وقت الإنتاج عندهم يتفوق باستمرار على عروض المنافسين في تركيا وفيتنام.' },
    name: { en: 'Sarah Whitfield', ar: 'سارة ويتفلد' },
    company: { en: 'StepUp Retail Group', ar: 'ستيب أب ريتيل غروب' },
    country: { en: 'London, UK', ar: 'لندن، بريطانيا' },
  },
  {
    quote: { en: 'We\'ve been sourcing work boots from them since 2019. The leather quality rivals what we used to import from Brazil, but at a much better price point. Their QC team catches defects before they even leave the floor.', ar: 'نقوم بالمشتريات من حذاء العمل لديهم منذ 2019. جودة الجلد تنافس ما كنا تستورده من البرازيل بسعر أفضل بكثير. فريق مراقبة الجودة لديهم يمنع العيوب قبل مغادرة المصنع.' },
    name: { en: 'Faisal Al-Harbi', ar: 'فيصل الحربي' },
    company: { en: 'Gulf Footwear Distributors', ar: 'موزعي الأحذية الخليجية' },
    country: { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، السعودية' },
  },
  {
    quote: { en: 'Communication is smooth despite the time-zone gap. They send detailed production updates with photos at every stage. The bonded-leather collection they developed for us outsold projections by 40% in our first year.', ar: 'التواصل سلس رغم فرق التوقيت. يرسلون تحديثات إنتاج مفصلة مع صور في كل مرحلة. مجموعة الجلد الصناعي التي طوروها لنا تجاوزت التوقعات بنسبة 40% في عامنا الأول.' },
    name: { en: 'Liu Jianwei', ar: 'ليو جيانوي' },
    company: { en: 'Shanghai Leather Corp', ar: 'شانغهاي للجلد' },
    country: { en: 'Shanghai, China', ar: 'شانغهاي، الصين' },
  },
  {
    quote: { en: 'As a mid-market brand, we needed an OEM partner who could deliver Italian-level craftsmanship without the Italian price tag. They nailed our spring collection prototypes on the first round — something our previous supplier never managed.', ar: 'كرائدة سوق متوسطة، كنا بحاجة إلى شريك تصنيع يمكنه تقديم الحرفية الإيطالية بسعر غير إيطالي. نجحوا في نماذج مجموعة الربيع الخاصة بنا في المحاولة الأولى – شيء لم يتمكن منه موردونا السابقون.' },
    name: { en: 'Giulia Ferretti', ar: 'جوليا فيرتي' },
    company: { en: 'Calzature Roma S.p.A.', ar: 'كالزاتور روما' },
    country: { en: 'Milan, Italy', ar: 'ميلانو، إيطاليا' },
  },
]

export default function Testimonials({ lang }: { lang?: Locale }) {
  const isAr = (lang || 'en') === 'ar'
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(testimonials.length / perPage)

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages])
  const prev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages])

  const current = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <Section>
      <SectionHeader
        label={isAr ? 'شهادات الشركاء' : 'TESTIMONIALS'}
        title={isAr ? 'ماذا يقول شركاؤنا' : 'What Our Partners Say'}
        description={isAr ? 'موثوقون من العلامات التجارية والموزعين الرائدين حول العالم' : 'Trusted by leading brands and wholesalers worldwide'}
        align="center"
      />

      <div className="relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {current.map((t, i) => (
                <div key={`${page}-${i}`} className="card">
                  <svg className="h-6 w-6 text-accent/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="body-md italic mb-6">
                    &ldquo;{isAr ? t.quote.ar : t.quote.en}&rdquo;
                  </p>

                  <div className="divider mb-4" />

                  <h4 className="heading-sm text-sm">
                    {isAr ? t.name.ar : t.name.en}
                  </h4>
                  <p className="body-sm text-accent mt-1">
                    {isAr ? t.company.ar : t.company.en}
                  </p>
                  <p className="body-sm mt-0.5">
                    {isAr ? t.country.ar : t.country.en}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          className="absolute top-1/2 -left-2 md:-left-12 -translate-y-1/2 w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 -right-2 md:-right-12 -translate-y-1/2 w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`h-2 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${i === page ? 'w-6 bg-accent' : 'w-2 bg-border hover:bg-border-hover'}`}
          />
        ))}
      </div>
    </Section>
  )
}
