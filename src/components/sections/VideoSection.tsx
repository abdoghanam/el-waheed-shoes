'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { siteImages } from '@/lib/images'

export default function VideoSection({ lang }: { lang?: Locale }) {
  const isAr = (lang || 'en') === 'ar'
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="section-padding bg-section-card">
        <div className="section-narrow">
          <div className="text-center mb-12">
            <motion.h2
              className="heading-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              {isAr ? 'شاهد حرفتنا' : 'See Our Craft'}
            </motion.h2>
          </div>

          <motion.div
            className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="relative aspect-video">
              <Image
                src={siteImages.factory.overview}
                alt={isAr ? 'جولة داخل المصنع' : 'Factory tour preview'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-8 h-8 text-bg-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl mx-4 rounded-2xl overflow-hidden bg-black"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 min-h-[44px] min-w-[44px] rounded-full glass flex items-center justify-center text-text-primary hover:text-accent transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video flex items-center justify-center bg-bg-primary">
                <div className="text-center text-text-muted">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="heading-sm">Video Player</p>
                  <p className="body-sm mt-1">/videos/factory-tour.mp4</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
