'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

interface PricingTier {
  tier: string
  tierAr: string
  moq: string
  leadTime: string
  priceRange: string
  priceLevel: number
  bestFor: string
  bestForAr: string
  featured?: boolean
}

const tiers: PricingTier[] = [
  {
    tier: 'Starter',
    tierAr: 'المبتدئ',
    moq: '500',
    leadTime: '45 days',
    priceRange: '$$',
    priceLevel: 2,
    bestFor: 'Small retailers, boutiques',
    bestForAr: 'بائعون صغار، متاجر بوتيك',
  },
  {
    tier: 'Business',
    tierAr: 'الأعمال',
    moq: '1,000',
    leadTime: '35 days',
    priceRange: '$',
    priceLevel: 1,
    bestFor: 'Growing brands, distributors',
    bestForAr: 'علامات تجارية نامية، موزعون',
    featured: true,
  },
  {
    tier: 'Enterprise',
    tierAr: 'المؤسسات',
    moq: '5,000',
    leadTime: '30 days',
    priceRange: '$',
    priceLevel: 1,
    bestFor: 'Large retailers, chains',
    bestForAr: 'بائعون كبار، سلاسل تجارية',
  },
  {
    tier: 'Custom OEM',
    tierAr: 'OEM مخصص',
    moq: '10,000+',
    leadTime: '25-30 days',
    priceRange: 'Contact Us',
    priceLevel: 0,
    bestFor: 'Major brands, private label',
    bestForAr: 'علامات رئيسية، علامة خاصة',
  },
]

export function PricingTable({ lang }: { lang?: string }) {
  const isAr = (lang || 'en') === 'ar'
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium">{isAr ? 'الأسعار' : 'Pricing'}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary">
            {isAr ? 'الحد الأدنى للطلب والأسعار' : 'MOQ & Pricing Tiers'}
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Flexible ordering options for businesses of all sizes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-xl border-2 p-6 transition-all ${
                tier.featured
                  ? 'border-gold bg-card shadow-lg'
                  : 'border-border bg-card hover:border-gold/30 hover:shadow-md'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-black">
                  {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                </div>
              )}

              <h3 className="text-lg font-bold text-gold mb-1">{isAr ? tier.tierAr : tier.tier}</h3>
              <p className="text-xs text-gray-400 mb-4">{isAr ? tier.tier : tier.tierAr}</p>

              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">{tier.moq}</span>
                <span className="text-sm text-gray-500 ml-1">{isAr ? 'زوج كحد أدنى' : 'pairs min'}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {tier.leadTime}
                </span>
              </div>

              {tier.priceLevel > 0 && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 3 }, (_, j) => (
                    <span key={j} className={`text-lg ${j < tier.priceLevel ? 'text-gold' : 'text-gray-200'}`}>$</span>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-500 mb-6 flex-1">{isAr ? tier.bestForAr : tier.bestFor}</p>

              <Link
                href={`/${lang || 'en'}/quote`}
                className={`block w-full rounded-lg py-3 min-h-[44px] text-center text-sm font-semibold transition-all ${
                  tier.featured
                    ? 'bg-gold text-black hover:bg-gold-light'
                    : 'border border-gold/30 text-gold hover:bg-gold/5'
                }`}
              >
                {isAr ? 'ابدأ الآن' : 'Get Started'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
