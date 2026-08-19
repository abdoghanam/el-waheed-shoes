'use client'

import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { getCsrfToken, csrfHeaders } from '@/lib/csrf-client'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader } from '@/components/ui/Section'

export default function QuotePage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = new FormData(e.currentTarget)

    try {
      const formData = new FormData()
      formData.append('companyName', form.get('company') as string)
      formData.append('country', form.get('country') as string)
      formData.append('contactPerson', form.get('contact') as string)
      formData.append('email', form.get('email') as string)
      formData.append('phone', form.get('phone') as string)
      formData.append('requiredQuantity', form.get('quantity') as string)
      formData.append('message', form.get('message') as string)
      if (selectedFile) {
        formData.append('file', selectedFile)
      }

      const csrf = await getCsrfToken()
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: csrfHeaders(csrf),
        body: formData,
      })
      if (res.ok) {
        setReferenceNumber(`Q-${Date.now().toString(36).toUpperCase()}`)
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: dict.nav.quote }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'ابدأ مشروعك' : 'START YOUR PROJECT'}
          title={dict.quote.title}
          description={dict.quote.subtitle}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <div className="max-w-2xl mx-auto">
          {status === 'success' ? (
            <motion.div
              className="card text-center py-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg className="h-16 w-16 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="heading-sm mb-2">
                {dict.quote.form.success}
              </h3>
              {referenceNumber && (
                <p className="body-sm mt-2">
                  {isAr ? 'المرجع' : 'Reference'}: <span className="font-mono text-accent">{referenceNumber}</span>
                </p>
              )}
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-tag block mb-2">{dict.quote.form.company} *</label>
                  <input
                    name="company"
                    required
                    className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="label-tag block mb-2">{dict.quote.form.country} *</label>
                  <input
                    name="country"
                    required
                    className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-tag block mb-2">{dict.quote.form.contact} *</label>
                  <input
                    name="contact"
                    required
                    className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="label-tag block mb-2">{dict.quote.form.email} *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-tag block mb-2">{dict.quote.form.phone}</label>
                  <input
                    name="phone"
                    className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="label-tag block mb-2">{dict.quote.form.quantity}</label>
                  <input
                    name="quantity"
                    placeholder={isAr ? 'مثال: 5000 زوج/شهرياً' : 'e.g., 5000 pairs/month'}
                    className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="label-tag block mb-2">{dict.quote.form.message} *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors resize-none"
                />
              </div>

              <div>
                <label className="label-tag block mb-2">{dict.quote.form.file}</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.ai,.psd,.jpg,.png,.zip"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    setFileName(file?.name || null)
                    setSelectedFile(file || null)
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-xl border-2 border-dashed border-border p-8 text-center hover:border-border-gold transition-colors cursor-pointer"
                >
                  <svg className="mx-auto h-10 w-10 text-text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="body-sm">
                    {fileName || (isAr ? 'اسحب الملفات هنا أو انقر للرفع' : 'Drop files here or click to upload')}
                  </p>
                  <p className="body-sm text-text-dim mt-1">
                    PDF, AI, PSD, JPG, PNG, ZIP (max 10MB)
                  </p>
                </button>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full disabled:opacity-50"
              >
                {status === 'sending' ? dict.quote.form.sending : dict.quote.form.submit}
              </button>
              {status === 'error' && (
                <p className="body-sm text-red-400">{dict.quote.form.error}</p>
              )}
            </motion.form>
          )}
        </div>
      </Section>
    </>
  )
}
