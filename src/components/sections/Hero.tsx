'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { siteImages } from '@/lib/images'

export default function Hero({ lang }: { lang?: Locale }) {
  const dict = dictionaries[lang || 'en']
  const isAr = (lang || 'en') === 'ar'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={siteImages.hero}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/hero-factory.mp4" type="video/mp4" />
        </video>
        <Image
          src={siteImages.hero}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="label-tag mb-6">
            {dict.heroExtra.tagline}
          </p>
        </motion.div>

        <motion.h1
          className="heading-md md:heading-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          {dict.heroExtra.headline}
        </motion.h1>

        <motion.p
          className="body-lg mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {dict.heroExtra.stats}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href={`/${lang || 'en'}/quote`} className="btn-primary">
            {dict.hero.ctaQuote}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href={`/${lang || 'en'}/products`} className="btn-secondary">
            {dict.hero.ctaProducts}
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 text-body-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="text-text-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {dict.heroExtra.iso}
          </span>
          <span className="w-1 h-1 rounded-full bg-text-dim" />
          <span className="text-text-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {dict.heroExtra.exported}
          </span>
          <span className="w-1 h-1 rounded-full bg-text-dim" />
          <span className="text-text-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {dict.heroExtra.experience}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <svg className="w-5 h-8 text-text-dim" viewBox="0 0 20 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="18" height="30" rx="9" />
          <motion.circle
            cx="10"
            cy="10"
            r="2"
            fill="currentColor"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </section>
  )
}
