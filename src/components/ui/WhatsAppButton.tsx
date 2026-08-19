'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'

const templates = [
  { key: 'general', en: 'Hello! I am interested in your footwear products.', ar: 'مرحباً! أنا مهتم بمنتجات الأحذية الخاصة بكم.' },
  { key: 'product', en: 'Hi! I would like to inquire about a specific product.', ar: 'مرحباً! أريد الاستفسار عن منتج معين.' },
  { key: 'oem', en: 'Hello! I am interested in OEM/private label manufacturing.', ar: 'مرحباً! أنا مهتم بالتصنيع بالوكالة/العلامة التجارية الخاصة.' },
]

function getTemplateFromPath(pathname: string) {
  if (pathname.includes('oem')) return 'oem'
  if (pathname.includes('products')) return 'product'
  return 'general'
}

export default function WhatsAppButton({ lang }: { lang?: Locale }) {
  const dict = dictionaries[lang || 'en']
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201114093000'
  const isRTL = lang === 'ar'
  const isAr = isRTL
  const pathname = usePathname()
  const [showTooltip, setShowTooltip] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [visible, setVisible] = useState(false)
  const [messageCount] = useState(3)

  const templateKey = getTemplateFromPath(pathname)
  const template = templates.find((t) => t.key === templateKey) || templates[0]
  const message = encodeURIComponent(isRTL ? template.ar : template.en)
  const url = `https://wa.me/${number}?text=${message}`

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed bottom-6 z-50 md:bottom-8"
      style={{ [isRTL ? 'left' : 'right']: '1.5rem' } as React.CSSProperties}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-10 scale-125" />

        <AnimatePresence>
          {messageCount > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {messageCount}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTemplates && (
            <motion.div
              className={`absolute bottom-full mb-3 ${isRTL ? 'left-0' : 'right-0'} w-64 bg-gray-900 border border-white/10 rounded-xl p-3 shadow-xl z-20`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs text-gray-400 mb-2 font-medium">{isAr ? 'اختر نوع الاستفسار' : 'Choose inquiry type'}</p>
              {templates.map((t) => (
                <a
                  key={t.key}
                  href={`https://wa.me/${number}?text=${encodeURIComponent(isRTL ? t.ar : t.en)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {t.key === 'general' && (isAr ? 'استفسار عام' : 'General Inquiry')}
                  {t.key === 'product' && (isAr ? 'استفسار منتج' : 'Product Inquiry')}
                  {t.key === 'oem' && (isAr ? 'استفسار OEM' : 'OEM Inquiry')}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => { setShowTooltip(false); setShowTemplates(false) }}
        >
          <AnimatePresence>
            {showTooltip && !showTemplates && (
              <motion.div
                className={`absolute bottom-full mb-3 ${isRTL ? 'left-full ml-3' : 'right-full mr-3'} whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-gray-300 border border-white/10 z-20`}
                initial={{ opacity: 0, x: isRTL ? -5 : 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -5 : 5 }}
              >
                {isAr ? 'تحدث معنا' : 'Chat with us'}
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-full border-l-gray-900' : 'left-full border-r-gray-900'} border-4 border-transparent`} />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
            aria-label="Chat on WhatsApp"
          >
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
