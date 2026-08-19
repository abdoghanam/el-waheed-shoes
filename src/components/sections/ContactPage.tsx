'use client'

import { useState } from 'react'
import { type Locale } from '@/lib/i18n'
import { dictionaries } from '@/lib/dictionaries'
import { getCsrfToken, csrfHeaders } from '@/lib/csrf-client'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader } from '@/components/ui/Section'
import FAQ from './FAQ'

export default function ContactPage({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang]
  const isAr = lang === 'ar'
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = new FormData(e.currentTarget)

    try {
      const csrf = await getCsrfToken()
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...csrfHeaders(csrf) },
        body: JSON.stringify({
          companyName: form.get('company'),
          country: form.get('country'),
          contactPerson: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone'),
          message: form.get('message'),
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Section>
        <Breadcrumb items={[{ label: dict.nav.contact }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'تواصل معنا' : 'GET IN TOUCH'}
          title={dict.contact.title}
          description={dict.contact.subtitle}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="card text-center py-12">
                <svg className="h-16 w-16 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="heading-sm mb-2">
                  {dict.contact.form.success}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="label-tag block mb-2">{dict.contact.form.name}</label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="label-tag block mb-2">{dict.contact.form.company}</label>
                    <input
                      id="contact-company"
                      name="company"
                      required
                      className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-country" className="label-tag block mb-2">{dict.contact.form.country}</label>
                    <input
                      id="contact-country"
                      name="country"
                      required
                      className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="label-tag block mb-2">{dict.contact.form.email}</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-phone" className="label-tag block mb-2">{dict.contact.form.phone}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="label-tag block mb-2">{dict.contact.form.message}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-xl bg-card border border-border px-4 py-3 body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-gold transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {status === 'sending' ? dict.contact.form.sending : dict.contact.form.submit}
                </button>
                {status === 'error' && (
                  <p className="body-sm text-red-400">{dict.contact.form.error}</p>
                )}
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="label-tag mb-1">{dict.contact.factory}</p>
                  <p className="body-sm">{isAr ? 'المحلة الكبرى، الغربية، مصر' : 'El Mahalla El Kubra, Gharbia, Egypt'}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="label-tag mb-1">{dict.contact.phone}</p>
                  <a href="tel:+201114093000" className="body-sm hover:text-accent transition-colors">
                    +20 111 409 3000
                  </a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="label-tag mb-1">{dict.contact.email}</p>
                  <a href="mailto:ELWAHEED@GMAIL.COM" className="body-sm hover:text-accent transition-colors">
                    ELWAHEED@GMAIL.COM
                  </a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="label-tag mb-1">{isAr ? 'ساعات العمل' : 'BUSINESS HOURS'}</p>
                  <p className="body-sm">
                    {isAr ? 'السبت - الخميس: 8:00 ص - 5:00 م' : 'Saturday - Thursday: 8:00 AM - 5:00 PM'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="w-full h-80 rounded-2xl overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54567.47594584936!2d31.0018!3d30.5573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5b5e5a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sEl%20Mahalla%20El%20Kubra%2C%20Gharbia%20Governate!5e0!3m2!1sen!2seg!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      <FAQ lang={lang} variant="contact" />
    </>
  )
}
