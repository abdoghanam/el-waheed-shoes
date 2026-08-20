import { locales, dirAttributes, type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import BackToTop from '@/components/ui/BackToTop'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CookieConsent from '@/components/ui/CookieConsent'
import { PageTransition } from '@/components/ui/PageTransition'
import { GoogleAnalytics } from '@/components/ui/GoogleAnalytics'
import PerformanceHints from '@/components/ui/PerformanceHints'
import { QuoteProvider } from '@/lib/QuoteContext'

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
