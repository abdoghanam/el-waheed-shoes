'use client'

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function pageview(url: string) {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return
  window.gtag?.('config', GA_TRACKING_ID, { page_path: url })
}

export function event(action: string, params?: Record<string, unknown>) {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return
  window.gtag?.('event', action, params)
}

export function trackConversion(eventName: string, value?: number) {
  event(eventName, { value, currency: 'USD' })
}
