'use client'

import Link from 'next/link'
import { dictionaries } from '@/lib/dictionaries'
import { type Locale } from '@/lib/i18n'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items, lang }: { items: BreadcrumbItem[]; lang: Locale }) {
  const dict = dictionaries[lang]
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-gray-400">
        <li>
          <Link href={`/${lang}`} className="hover:text-gold transition-colors">
            {dict.nav.home}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-gray-600">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
