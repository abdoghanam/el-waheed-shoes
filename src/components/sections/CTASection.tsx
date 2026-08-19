'use client'

import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Section } from '@/components/ui/Section'

export default function CTASection({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'

  return (
    <Section dark={false}>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="heading-lg mb-6">
          {isAr ? 'جاهز لبدء مجموعتك القادمة؟' : 'Ready to Start Your Next Collection?'}
        </h2>
        <p className="body-lg mb-10">
          {isAr
            ? 'احصل على استشارة مجانية وعرض سعر خلال 24 ساعة'
            : 'Get a free consultation and quote within 24 hours'}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Link href={`/${lang}/quote`} className="btn-primary">
            {dict.hero.ctaQuote}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href={`/${lang}/products`} className="btn-secondary">
            {dict.hero.ctaProducts}
          </Link>
        </div>
      </div>
    </Section>
  )
}
