'use client'

import { useState } from 'react'
import { type Locale } from '@/lib/i18n'
import Image from 'next/image'

const clientLogos = [
  { src: '/images/clients/client-1.svg', name: 'Al Rashid Trading' },
  { src: '/images/clients/client-2.svg', name: 'Schuhhaus Müller' },
  { src: '/images/clients/client-3.svg', name: 'StepUp Retail' },
  { src: '/images/clients/client-4.svg', name: 'Gulf Footwear' },
  { src: '/images/clients/client-5.svg', name: 'Shanghai Leather' },
  { src: '/images/clients/client-6.svg', name: 'Calzature Roma' },
]

export default function ClientLogos({ lang }: { lang?: Locale }) {
  const isAr = (lang || 'en') === 'ar'

  return (
    <section className="section-padding bg-section-dark overflow-hidden">
      <div className="section-narrow">
        <div className="text-center mb-12">
          <p className="label-tag mb-4">
            {isAr ? 'موثوق من قبل' : 'TRUSTED BY'}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10" />

          <div className="overflow-hidden">
            <div
              className="flex items-center gap-16"
              style={{
                animation: 'scroll 30s linear infinite',
                width: 'max-content',
              }}
            >
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="relative h-12 w-24 flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        <p className="text-center body-sm mt-10">
          {isAr ? '+50 شركة حول العالم' : '50+ Companies Worldwide'}
        </p>
      </div>
    </section>
  )
}
