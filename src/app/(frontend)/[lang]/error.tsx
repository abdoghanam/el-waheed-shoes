'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'

const errorText = {
  en: {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again.',
    retry: 'Try Again',
    goHome: 'Go Home',
  },
  ar: {
    title: 'حدث خطأ ما',
    message: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
    retry: 'حاول مرة أخرى',
    goHome: 'الرئيسية',
  },
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en'
  const t = errorText[lang]

  useEffect(() => {
    Sentry.captureException(error)
    console.error('[GlobalError]', error.message, error.digest)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-[8rem] font-bold leading-none text-gold-gradient opacity-20">
          !
        </h1>
        <h2 className="text-3xl font-bold text-white mt-[-2rem] mb-4">{t.title}</h2>
        <p className="text-gray-400 mb-8">{t.message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
          >
            {t.retry}
          </button>
          <a
            href={`/${lang}`}
            className="border border-gold/30 text-gold px-8 py-3 rounded-lg font-semibold hover:border-gold/60 transition-colors"
          >
            {t.goHome}
          </a>
        </div>
      </div>
    </div>
  )
}
