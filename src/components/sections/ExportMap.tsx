'use client'

import { motion } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { Section, SectionHeader } from '@/components/ui/Section'

const regions = [
  { name: 'Middle East', ar: 'الشرق الأوسط', cx: 620, cy: 210, labelX: 630, labelY: 198 },
  { name: 'Europe', ar: 'أوروبا', cx: 490, cy: 135, labelX: 480, labelY: 123 },
  { name: 'Africa', ar: 'أفريقيا', cx: 500, cy: 280, labelX: 490, labelY: 298 },
  { name: 'Asia', ar: 'آسيا', cx: 710, cy: 185, labelX: 720, labelY: 173 },
]

export default function ExportMap({ lang }: { lang?: Locale }) {
  const isAr = (lang || 'en') === 'ar'

  const egyptX = 535
  const egyptY = 225

  return (
    <Section dark={false}>
      <SectionHeader
        label={isAr ? 'انتشار عالمي' : 'GLOBAL REACH'}
        title={isAr ? 'انتشار عالمي' : 'Global Reach'}
        description={isAr ? 'موثوق به من شركاء في أكثر من 20 دولة عبر 4 قارات' : 'Trusted by partners in 20+ countries across 4 continents'}
        align="center"
      />

      <motion.div
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <svg viewBox="300 60 500 300" className="w-full h-auto" fill="none">
          <defs>
            <radialGradient id="goldPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C8A951" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C8A951" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path
            d="M380 150 Q400 120 430 130 L460 125 Q490 115 510 130 L520 140 Q540 135 550 145 L560 155 Q575 148 590 155 L600 165 Q615 158 630 165 L650 175 Q660 170 670 178 L680 185"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <path
            d="M410 170 Q430 160 450 168 L470 175 Q490 168 510 175 L530 185 Q550 178 570 185 L590 195 Q610 188 630 195 L650 205 Q660 200 670 208"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
          <path
            d="M390 200 Q410 195 430 200 L455 208 Q475 200 495 208 L515 218 Q535 210 555 218 L575 228 Q595 220 615 228 L635 238 Q655 230 675 238 L690 245"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />

          {regions.map((region) => (
            <g key={region.name}>
              <circle cx={region.cx} cy={region.cy} r="4" fill="#C8A951" />
              <text
                x={region.labelX}
                y={region.labelY}
                fill="#666666"
                fontSize="9"
                textAnchor="middle"
              >
                {isAr ? region.ar : region.name}
              </text>
            </g>
          ))}

          <circle cx={egyptX} cy={egyptY} r="18" fill="url(#goldPulse)" />
          <circle cx={egyptX} cy={egyptY} r="4" fill="#C8A951" />
          <text
            x={egyptX}
            y={egyptY - 14}
            fill="#C8A951"
            fontSize="9"
            fontWeight="600"
            textAnchor="middle"
          >
            {isAr ? 'مصر' : 'Egypt'}
          </text>
        </svg>
      </motion.div>

      <p className="text-center body-lg mt-12">
        {isAr ? '20+ دولة ، 4 قارات' : '20+ Countries, 4 Continents'}
      </p>
    </Section>
  )
}
