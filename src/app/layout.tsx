import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import { cookies } from 'next/headers'
import './globals.css'
import AdminAccessButton from '@/components/admin/AdminAccessButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'EL WAHEED SHOES - Egyptian Footwear Manufacturer',
    template: '%s | EL WAHEED SHOES',
  },
  description:
    'Premium Egyptian footwear manufacturer since 2010. 15+ years of manufacturing excellence. Wholesale, OEM, and private label footwear production.',
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://el-waheed-shoes.vercel.app'
  ),
  openGraph: {
    title: 'EL WAHEED SHOES',
    description:
      'Premium Egyptian footwear manufacturer since 2010',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_EG',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'EL WAHEED SHOES - Premium Egyptian Footwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EL WAHEED SHOES',
    description: 'Premium Egyptian footwear manufacturer since 2010',
    images: ['/og-image.svg'],
  },
  alternates: {
    languages: {
      en: '/en',
      ar: '/ar',
    },
  },
  other: {
    'theme-color': '#060606',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <meta name="theme-color" content="#060606" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <AdminAccessButton />
        {children}
      </body>
    </html>
  )
}
