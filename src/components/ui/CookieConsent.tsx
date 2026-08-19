'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'

const STORAGE_KEY = 'cookie-consent'

const consentText = {
  en: {
    message: 'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.',
    accept: 'Accept All',
    reject: 'Reject',
  },
  ar: {
    message: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بمتابعتك لهذا الموقع فإنك توافق على استخدامنا لها.',
    accept: 'قبول الكل',
    reject: 'رفض',
  },
}

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const pathname = usePathname()

  const lang = pathname.startsWith('/ar') ? 'ar' : 'en'
  const t = consentText[lang]

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setShow(true)
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setShow(false)
  }

  function handleReject() {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 inset-x-0 z-[100] bg-gray-950/90 backdrop-blur-lg border-t border-gold/20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <svg className="h-6 w-6 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z" />
                </svg>
                <div className="text-sm text-gray-300 leading-relaxed">
                  {t.message}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleAccept}
                  className="rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
                >
                  {t.accept}
                </button>
                <button
                  onClick={handleReject}
                  className="rounded-md border border-gold/30 px-5 py-2.5 text-sm font-medium text-gold transition-colors hover:border-gold hover:bg-gold/5"
                >
                  {t.reject}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
