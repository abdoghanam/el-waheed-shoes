'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const notFoundText = {
  en: {
    title: 'Page Not Found',
    message: 'The page you\'re looking for doesn\'t exist or has been moved.',
    goHome: 'Go Home',
    contact: 'Contact Us',
  },
  ar: {
    title: 'الصفحة غير موجودة',
    message: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    goHome: 'الرئيسية',
    contact: 'اتصل بنا',
  },
}

export default function NotFound() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en'
  const t = notFoundText[lang]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-[10rem] font-bold leading-none text-gold-gradient opacity-20">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-[-3rem] mb-6">
          {t.title}
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          {t.message}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href={`/${lang}`} className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors">
            {t.goHome}
          </Link>
          <Link href={`/${lang}/contact`} className="border border-gold/30 text-gold px-8 py-3 rounded-lg font-semibold hover:border-gold/60 transition-colors">
            {t.contact}
          </Link>
        </div>
      </div>
    </div>
  )
}
