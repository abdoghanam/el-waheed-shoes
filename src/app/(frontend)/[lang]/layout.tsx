import { locales, dirAttributes, type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageTransition } from '@/components/ui/PageTransition'
import { GoogleAnalytics } from '@/components/ui/GoogleAnalytics'
import { QuoteProvider } from '@/lib/QuoteContext'

const WhatsAppButton = dynamic(() => import('@/components/ui/WhatsAppButton'), { ssr: false })
const BackToTop = dynamic(() => import('@/components/ui/BackToTop'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), { ssr: false })
const CookieConsent = dynamic(() => import('@/components/ui/CookieConsent'), { ssr: false })
const PerformanceHints = dynamic(() => import('@/components/ui/PerformanceHints'), { ssr: false })

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (locales.includes(rawLang as Locale) ? rawLang : 'en') as Locale
  const dict = dictionaries[lang] || dictionaries.en

  return {
    title: dict.hero.headline,
    description: dict.hero.subheadline,
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (locales.includes(rawLang as Locale) ? rawLang : 'en') as Locale
  const dir = dirAttributes[lang] || 'ltr'

  return (
    <div lang={lang} dir={dir} className="scroll-smooth">
      <QuoteProvider>
        <GoogleAnalytics />
        <Header lang={lang} />
        <main id="main-content" className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer lang={lang} />
        <WhatsAppButton lang={lang} />
        <BackToTop />
        <ScrollProgress />
        <CookieConsent />
        <PerformanceHints />
      </QuoteProvider>
    </div>
  )
}
