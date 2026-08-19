'use client'

import { useEffect, useCallback } from 'react'

const criticalRoutes = ['/', '/products', '/quote', '/contact', '/about']

export default function PerformanceHints() {
  const prefetch = useCallback((href: string) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    link.as = 'document'
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('loaded')
            observer.unobserve(el)
          }
        })
      },
      { rootMargin: '200px' }
    )

    document.querySelectorAll('[data-defer]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        criticalRoutes.forEach((route) => {
          const link = document.querySelector(`link[href="${route}"]`)
          if (!link) prefetch(route)
        })
      })
    }
  }, [prefetch])

  return null
}
