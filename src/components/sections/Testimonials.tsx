'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { Section, SectionHeader } from '@/components/ui/Section'

const testimonials = [
  {
    quote: { en: 'Outstanding quality and consistency in every order. They have become our primary footwear supplier in the Middle East.', ar: 'جودة متميزة وثبات في كل طلب. أصبحوا الموردين الأساسيين لنا للأحذية في الشرق الأوسط.' },
    name: { en: 'Ahmed K.', ar: 'أحمد ك.' },
    company: { en: 'Dubai Trading Co.', ar: 'شركة دبي للتجارة' },
    country: { en: 'UAE', ar: 'الإمارات' },
  },
  {
    quote: { en: 'Their OEM capabilities exceeded our expectations. The attention to detail and willingness to adapt is remarkable.', ar: 'قدرات التصنيع عندهم فاقت توقعاتنا. الاهتمام بالتفاصيل والقدرة على التكييف مذهلة.' },
    name: { en: 'Maria S.', ar: 'ماريا س.' },
    company: { en: 'EuroStyle GmbH', ar: 'يورو ستايل' },
    country: { en: 'Germany', ar: 'ألمانيا' },
  },
  {
    quote: { en: 'Reliable partner for our retail chain. On-time delivery and premium quality every single time.', ar: 'شريك موثوق لسلسلة تجزئتنا. التسليم في الوقت المحدد وجودة ممتازة في كل مرة.' },
    name: { en: 'James T.', ar: 'جيمس ت.' },
    company: { en: 'ShoeWorld Ltd', ar: 'شو وورلد' },
    country: { en: 'UK', ar: 'بريطانيا' },
  },
  {
    quote: { en: 'Best safety footwear manufacturer in Egypt. Their commitment to international standards is unwavering.', ar: 'أفضل مصنعي الأحذية السلامة في مصر. التزامهم بالمعايير الدولية لا يتزعزع.' },
    name: { en: 'Fatima A.', ar: 'فاطمة أ.' },
    company: { en: 'GulfSafety', ar: 'جلف سيفتي' },
    country: { en: 'Saudi Arabia', ar: 'السعودية' },
  },
  {
    quote: { en: 'Excellent communication and fast delivery. They understand the Asian market demands very well.', ar: 'تواصل ممتاز وتسليم سريع. يفهمون متطلبات السوق الآسيوي جيداً جداً.' },
    name: { en: 'Chen W.', ar: 'تشن و.' },
    company: { en: 'AsiaFoot Corp', ar: 'آسيا فوت' },
    country: { en: 'China', ar: 'الصين' },
  },
  {
    quote: { en: 'We have been working with them for 8 years. Consistent quality and they always meet our seasonal deadlines.', ar: 'نعمل معهم منذ 8 سنوات. جودة متسقة ويلبون دائماً مواعيدنا الموسمية.' },
    name: { en: 'Roberto M.', ar: 'روبرتو م.' },
    company: { en: 'ModaPelle SRL', ar: 'مودا بيلي' },
    country: { en: 'Italy', ar: 'إيطاليا' },
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
