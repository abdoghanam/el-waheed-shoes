'use client'

import { usePathname } from 'next/navigation'

const errorText = {
  en: {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again.',
    retry: 'Try Again',
  },
  ar: {
    title: 'حدث خطأ ما',
    message: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
    retry: 'حاول مرة أخرى',
  },
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en'
  const t = errorText[lang]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-3xl font-bold text-white mb-4">{t.title}</h2>
        <p className="text-gray-400 mb-8">
          {t.message}
        </p>
        <button
          onClick={reset}
          className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
        >
          {t.retry}
        </button>
      </div>
    </div>
  )
}
