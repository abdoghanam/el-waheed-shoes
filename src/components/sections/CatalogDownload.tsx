'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { getCsrfToken } from '@/lib/csrf-client'

export function CatalogDownload({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const [formData, setFormData] = useState({ name: '', email: '', company: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const csrfToken = await getCsrfToken()
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
        body: JSON.stringify({ email: formData.email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <section className="section-padding bg-section-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(212,175,55,0.1) 0%, transparent 50%)' }} />

      <div className="relative section-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-80 rounded-xl bg-bg-card border border-border shadow-2xl flex flex-col items-center justify-center p-8">
              <svg className="h-16 w-16 text-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="heading-sm text-text-primary text-center">EL WAHEED SHOES</h3>
              <p className="body-sm text-text-muted text-center mt-1">{isAr ? 'كتالوج المنتجات 2026' : 'Product Catalog 2026'}</p>
              <div className="mt-4 text-accent text-xs font-medium">PDF • 15 MB</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md text-text-primary mb-4">
              {dict.catalog.title}
            </h2>
            <p className="body-lg text-text-secondary mb-6">
              {dict.catalog.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', text: dict.catalog.features.designs },
                { icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z', text: dict.catalog.features.categories },
                { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14', text: dict.catalog.features.photos },
                { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', text: dict.catalog.features.specs },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-text-secondary">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  <span className="body-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl bg-accent/10 border border-accent/30 p-6 text-center"
              >
                <svg className="h-12 w-12 text-accent mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-text-primary font-semibold">{dict.catalog.form.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={dict.catalog.form.name}
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="rounded-lg bg-bg-card border border-border px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder={dict.catalog.form.email}
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="rounded-lg bg-bg-card border border-border px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder={dict.catalog.form.company}
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full rounded-lg bg-bg-card border border-border px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none"
                />
                {status === 'error' && (
                  <p className="text-sm text-red-400">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {status === 'sending'
                    ? (isAr ? 'جاري الإرسال...' : 'Sending...')
                    : dict.catalog.form.submit
                  }
                </button>
                <p className="text-xs text-text-dim text-center">
                  {dict.catalog.legal}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
