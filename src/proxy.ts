import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

const PUBLIC_FILE = /\.(.*)$/

function getLocaleFromHeaders(request: NextRequest): typeof defaultLocale {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const preferred = acceptLanguage.split(',')[0].split('-')[0]
  return (locales as readonly string[]).includes(preferred) ? preferred as typeof defaultLocale : defaultLocale
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), interest-cohort=(), browsing-topics=()'
  )
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; " +
    "connect-src 'self' https://*.vercel.app https://www.google-analytics.com https://www.googletagmanager.com; " +
    "frame-ancestors 'none'; " +
    "frame-src 'self' https://www.google.com https://www.google.com/maps; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "upgrade-insecure-requests"
  )
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    )
  }
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots') ||
    PUBLIC_FILE.test(pathname)
  ) {
    const response = NextResponse.next()
    return addSecurityHeaders(response)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const response = NextResponse.next()
    return addSecurityHeaders(response)
  }

  const locale = getLocaleFromHeaders(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)

  const response = NextResponse.redirect(newUrl)
  response.cookies.set('NEXT_LOCALE', locale, { path: '/', secure: true, httpOnly: true, sameSite: 'lax' })
  return addSecurityHeaders(response)
}

export const config = {
  matcher: ['/((?!_next|favicon|sitemap|robots).*)'],
}
