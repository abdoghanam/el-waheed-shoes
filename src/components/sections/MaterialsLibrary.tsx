'use client'

import { motion } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { Section, SectionHeader } from '@/components/ui/Section'

interface Material {
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  tags: string[]
  tagsAr: string[]
  pattern: string
}

const materials: Material[] = [
  {
    name: 'Genuine Leather',
    nameAr: 'جلد طبيعي',
    description: 'Premium cowhide, soft touch, durability',
    descriptionAr: 'جلد بقري فاخر، لمسة ناعمة، متانة',
    tags: ['Premium'],
    tagsAr: ['فاخر'],
    pattern: 'repeating-linear-gradient(45deg, #8B4513 0px, #8B4513 2px, #A0522D 2px, #A0522D 4px)',
  },
  {
    name: 'Suede',
    nameAr: 'سويدي',
    description: 'Brushed finish, luxury feel, breathability',
    descriptionAr: 'مقشر، إحساس فاخر، قابلية تنفس',
    tags: ['Premium'],
    tagsAr: ['فاخر'],
    pattern: 'repeating-linear-gradient(135deg, #C4A882 0px, #C4A882 1px, #B89B72 1px, #B89B72 3px)',
  },
  {
    name: 'Canvas',
    nameAr: 'كانفس',
    description: 'Lightweight, breathable, casual elegance',
    descriptionAr: 'خفيف الوزن، قابل للتنفس، أناقة كاجوال',
    tags: ['Standard', 'Eco-Friendly'],
    tagsAr: ['عادي', 'صديق للبيئة'],
    pattern: 'repeating-linear-gradient(0deg, #E8E8E8 0px, #E8E8E8 2px, #D0D0D0 2px, #D0D0D0 4px)',
  },
  {
    name: 'Mesh',
    nameAr: 'شبك',
    description: 'Ultra-breathable, sport performance, ventilation',
    descriptionAr: 'قابل للتنفس للغاية، أداء رياضي، تهوية',
    tags: ['Standard'],
    tagsAr: ['عادي'],
    pattern: 'radial-gradient(circle, #CCCCCC 1px, transparent 1px)',
  },
  {
    name: 'PU Synthetic',
    nameAr: 'بولي يوريثان صناعي',
    description: 'Cost-effective, versatile, easy maintenance',
    descriptionAr: 'فعال من حيث التكلفة، متعدد الاستخدامات، صيانة سهلة',
    tags: ['Standard'],
    tagsAr: ['عادي'],
    pattern: 'linear-gradient(135deg, #6B6B6B 25%, #7A7A7A 25%, #7A7A7A 50%, #6B6B6B 50%, #6B6B6B 75%, #7A7A7A 75%)',
  },
  {
    name: 'Patent Leather',
    nameAr: 'جلد باتنت',
    description: 'High-gloss finish, formal occasions',
    descriptionAr: 'لامع عالي، المناسبات الرسمية',
    tags: ['Premium'],
    tagsAr: ['فاخر'],
    pattern: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    name: 'Rubber',
    nameAr: 'مطاط',
    description: 'Superior grip, weather resistance, flexibility',
    descriptionAr: 'تماس ممتاز، مقاومة الطقس، المرونة',
    tags: ['Standard'],
    tagsAr: ['عادي'],
    pattern: 'repeating-radial-gradient(circle at 5px 5px, #555 0px, #555 2px, #444 2px, #444 4px)',
  },
  {
    name: 'EVA Foam',
    nameAr: 'فوم EVA',
    description: 'Lightweight cushioning, shock absorption',
    descriptionAr: 'خفيف الوزن، امتصاص الصدمات',
    tags: ['Standard', 'Eco-Friendly'],
    tagsAr: ['عادي', 'صديق للبيئة'],
    pattern: 'linear-gradient(180deg, #E0E0E0 0%, #F5F5F5 50%, #E0E0E0 100%)',
  },
]

export function MaterialsLibrary({ lang }: { lang?: Locale }) {
  const isAr = (lang || 'en') === 'ar'

  return (
    <Section>
      <SectionHeader
        label={isAr ? 'مواد عالية الجودة' : 'QUALITY MATERIALS'}
        title={isAr ? 'مكتبة المواد لدينا' : 'Our Material Library'}
        description={isAr ? 'مواد فاخرة من موردين موثوقين حول العالم' : 'Premium materials sourced from trusted suppliers worldwide'}
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {materials.map((material, i) => (
          <motion.div
            key={material.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className="card group overflow-hidden hover:border-gold/30 transition-colors"
          >
            <div className="h-32 w-full" style={{ background: material.pattern }} />
            <div className="p-5">
              <h3 className="heading-sm mb-1">{isAr ? material.nameAr : material.name}</h3>
              <p className="body-sm mb-3 line-clamp-1">{isAr ? material.descriptionAr : material.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {(isAr ? material.tagsAr : material.tags).map((tag) => (
                  <span key={tag} className="label-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
