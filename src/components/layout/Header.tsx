'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { type Locale, localeNames, locales } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { siteImages } from '@/lib/images'
import TopBar from './TopBar'

const productCategories = [
  { key: 'casual', icon: siteImages.products.casual, desc: { en: 'Everyday comfort & style', ar: 'راحة وأناقة يومية' }, href: '/products?category=casual' },
  { key: 'sport', icon: siteImages.products.sport, desc: { en: 'Athletic & performance', ar: 'رياضية وأداء عالي' }, href: '/products?category=sport' },
  { key: 'formal', icon: siteImages.products.formal, desc: { en: 'Professional & elegant', ar: 'مهنية وأنيقة' }, href: '/products?category=formal' },
  { key: 'safety', icon: siteImages.products.safety, desc: { en: 'Industrial protection', ar: 'حماية صناعية' }, href: '/products?category=safety' },
  { key: 'sandal', icon: siteImages.products.sandal, desc: { en: 'Casual & open design', ar: 'تصميم مفتوح' }, href: '/products?category=sandal' },
  { key: 'boot', icon: siteImages.products.boot, desc: { en: 'Durable & sturdy', ar: 'متينة وصلبة' }, href: '/products?category=boot' },
]

export default function Header({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const isAr = lang === 'ar'

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  function switchLocale(target: Locale) {
    const segments = pathname.split('/')
    segments[1] = target
    return segments.join('/')
  }

  function handleMegaEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setMegaOpen(true)
  }

  function handleMegaLeave() {
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 150)
  }

  function isActive(href: string) {
    return pathname.includes(href)
  }

  const navLinks = [
    { key: 'about' as const, href: '/about' },
    { key: 'products' as const, href: '/products', hasMega: true },
    { key: 'oem' as const, href: '/oem' },
    { key: 'manufacturing' as const, href: '/manufacturing' },
    { key: 'quality' as const, href: '/quality' },
    { key: 'blog' as const, href: '/blog' },
    { key: 'contact' as const, href: '/contact' },
  ]

  return (
    <>
      <TopBar />
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass h-[60px]' : 'bg-transparent h-[72px]'}`}>
        <div className="section-narrow px-4 md:px-6 flex h-full items-center justify-between">
          <Link href={`/${lang}`} className="shrink-0">
            <Image
              src={siteImages.logo.horizontal}
              alt="EL WAHEED SHOES"
              width={scrolled ? 100 : 120}
              height={scrolled ? 24 : 28}
              className="transition-all duration-300 h-6 md:h-7 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              if (link.hasMega) {
                return (
                  <div
                    key={link.key}
                    className="relative"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <Link
                      href={`/${lang}${link.href}`}
                      className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors ${active ? 'text-gold' : 'text-text-secondary hover:text-white'}`}
                    >
                      {dict.nav[link.key]}
                      {active && <span className="absolute bottom-0 left-3 right-3 h-px bg-gold" />}
                    </Link>

                    <AnimatePresence>
                      {megaOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-4xl pt-3"
                          onMouseEnter={handleMegaEnter}
                          onMouseLeave={handleMegaLeave}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            className="glass rounded-2xl p-8 shadow-2xl shadow-black/60"
                          >
                            <div className="grid grid-cols-3 gap-4">
                              {productCategories.map((cat) => (
                                <Link
                                  key={cat.key}
                                  href={`/${lang}${cat.href}`}
                                  className="group flex items-start gap-3 rounded-xl p-3 hover:bg-white/[0.03] transition-colors"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-border flex items-center justify-center shrink-0 group-hover:border-border-hover transition-colors">
                                    <Image src={cat.icon} alt="" width={28} height={28} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-text-primary group-hover:text-gold transition-colors">
                                      {isAr ? (cat.key === 'casual' ? 'أحذية كاجوال' : cat.key === 'sport' ? 'أحذية رياضية' : cat.key === 'formal' ? 'أحذية رسمية' : cat.key === 'safety' ? 'أحذية سلامة' : cat.key === 'sandal' ? 'صندل' : 'بوت') : cat.key.charAt(0).toUpperCase() + cat.key.slice(1) + ' Shoes'}
                                    </div>
                                    <div className="text-xs text-text-muted mt-0.5">{isAr ? cat.desc.ar : cat.desc.en}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-border">
                              <Link
                                href={`/${lang}/products`}
                                className="text-sm font-medium text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1.5"
                                onClick={() => setMegaOpen(false)}
                              >
                                {isAr ? 'استكشف كامل المنتجات' : 'Explore All Products'}
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </Link>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={link.key}
                  href={`/${lang}${link.href}`}
                  className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors ${active ? 'text-gold' : 'text-text-secondary hover:text-white'}`}
                >
                  {dict.nav[link.key]}
                  {active && <span className="absolute bottom-0 left-3 right-3 h-px bg-gold" />}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+201114093000" className="flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="xl:inline hidden">+20 111 409 3000</span>
            </a>

            <div className="flex items-center gap-1 text-[13px] font-medium">
              {locales.map((locale, i) => (
                <span key={locale} className="flex items-center gap-1">
                  {i > 0 && <span className="text-text-dim">|</span>}
                  <Link
                    href={switchLocale(locale)}
                    className={`transition-colors ${lang === locale ? 'text-gold' : 'text-text-muted hover:text-white'}`}
                  >
                    {localeNames[locale]}
                  </Link>
                </span>
              ))}
            </div>

            <Link href={`/${lang}/quote`} className="btn-primary !py-2 !px-4 !text-[13px] !rounded-lg">
              {dict.nav.quote}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -mr-1 text-text-secondary hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isAr ? 'فتح القائمة' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed inset-0 z-50 flex flex-col bg-bg-primary overflow-y-auto ${isAr ? '[direction:rtl]' : ''}`}
            >
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border">
                <Image src={siteImages.logo.horizontal} alt="EL WAHEED SHOES" width={100} height={24} className="h-6 w-auto" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-text-muted hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={isAr ? 'إغلاق القائمة' : 'Close menu'}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-8 min-h-0">
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.key}
                      href={`/${lang}${link.href}`}
                      className={`text-xl sm:text-2xl font-semibold tracking-tight transition-colors min-h-[44px] flex items-center ${active ? 'text-gold' : 'text-text-primary hover:text-gold'}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {dict.nav[link.key]}
                    </Link>
                  )
                })}
              </nav>

              <div className="px-4 md:px-6 py-6 border-t border-border space-y-5 pb-safe">
                <div className="flex items-center justify-center gap-1 text-sm font-medium">
                  {locales.map((locale, i) => (
                    <span key={locale} className="flex items-center gap-1">
                      {i > 0 && <span className="text-text-dim">|</span>}
                      <Link
                        href={switchLocale(locale)}
                        className={`px-3 py-2 min-h-[44px] flex items-center transition-colors ${lang === locale ? 'text-gold' : 'text-text-muted hover:text-white'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {localeNames[locale]}
                      </Link>
                    </span>
                  ))}
                </div>

                <Link
                  href={`/${lang}/quote`}
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  {dict.nav.quote}
                </Link>

                <div className="flex items-center justify-center gap-5">
                  <a href="https://www.facebook.com/@alwaheed100/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label={isAr ? 'فيسبوك' : 'Facebook'}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.745-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/elwaheedshoes" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label={isAr ? 'انستغرام' : 'Instagram'}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/company/elwaheedshoes" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label={isAr ? 'لينكدإن' : 'LinkedIn'}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
