'use client'

import { useEffect } from 'react'

export function LangSetter({ lang, dir }: { lang: string; dir: string }) {
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  return null
}
