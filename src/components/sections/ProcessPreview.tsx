'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'

const steps = ['material', 'cutting', 'stitching', 'assembly', 'quality', 'packaging'] as const

export default function ProcessPreview({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            {dict.manufacturing.title}
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {dict.manufacturing.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold text-xl font-bold">
                {i + 1}
              </div>
              <h3 className="text-sm font-semibold mb-1">
                {dict.manufacturing.steps[`${step}` as keyof typeof dict.manufacturing.steps]}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed px-1">
                {dict.manufacturing.steps[`${step}Desc` as keyof typeof dict.manufacturing.steps]}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${lang}/manufacturing`}
            className="inline-flex items-center gap-2 rounded-md border border-gold/30 px-6 py-3 min-h-[44px] text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            {lang === 'ar' ? 'اعرف المزيد' : 'Learn More'}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
