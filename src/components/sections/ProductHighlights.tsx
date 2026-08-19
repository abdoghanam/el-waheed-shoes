'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { Section, SectionHeader } from '@/components/ui/Section'

const categories = [
  { key: 'casual', icon: '/images/products/shoe-casual.svg', en: 'Casual Shoes', ar: 'كاجوال' },
  { key: 'sport', icon: '/images/products/shoe-sport.svg', en: 'Sport Shoes', ar: 'رياضية' },
  { key: 'formal', icon: '/images/products/shoe-formal.svg', en: 'Formal Shoes', ar: 'رسمي' },
]

export default function ProductHighlights({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]

  return (
    <Section>
      <SectionHeader
        label={lang === 'ar' ? 'المنتجات' : 'PRODUCTS'}
        title={dict.products.title}
        description={dict.products.subtitle}
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.key}
            href={`/${lang}/products?category=${category.key}`}
            className="card text-center group"
          >
            <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-2xl bg-bg-elevated border border-border group-hover:border-border-hover transition-colors duration-300">
              <Image
                src={category.icon}
                alt={lang === 'ar' ? category.ar : category.en}
                width={64}
                height={64}
                className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <h3 className="heading-sm">
              {lang === 'ar' ? category.ar : category.en}
            </h3>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href={`/${lang}/products`} className="btn-secondary">
          {dict.products.all} {dict.products.title}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </Section>
  )
}
