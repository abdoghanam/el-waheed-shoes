'use client'

import { useState } from 'react'
import { type Locale } from '@/lib/i18n'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section'

const upcomingEvents = [
  {
    nameEn: 'Gulfoot 2026',
    nameAr: 'جلفوت 2026',
    dateEn: 'March 15-18, 2026',
    dateAr: '١٥-١٨ مارس ٢٠٢٦',
    locationEn: 'Dubai, UAE',
    locationAr: 'دبي، الإمارات',
    standEn: 'Hall 3, Stand B12',
    standAr: 'القاعة 3، جناح B12',
  },
  {
    nameEn: 'MICAM',
    nameAr: 'ميكام',
    dateEn: 'September 20-23, 2026',
    dateAr: '٢٠-٢٣ سبتمبر ٢٠٢٦',
    locationEn: 'Milan, Italy',
    locationAr: 'ميلانو، إيطاليا',
    standEn: 'Hall 9, Stand A45',
    standAr: 'القاعة 9، جناح A45',
  },
  {
    nameEn: 'FILO Footwear Expo',
    nameAr: 'معرض فيلو للأحذية',
    dateEn: 'November 8-10, 2026',
    dateAr: '٨-١٠ نوفمبر ٢٠٢٦',
    locationEn: 'Istanbul, Turkey',
    locationAr: 'إسطنبول، تركيا',
    standEn: 'Hall 5, Stand C22',
    standAr: 'القاعة 5، جناح C22',
  },
]

const pastEvents = [
  {
    nameEn: 'Fakuma 2025',
    nameAr: 'فكوما ٢٠٢٥',
    dateEn: 'October 2025',
    dateAr: 'أكتوبر ٢٠٢٥',
    locationEn: 'Frankfurt, Germany',
    locationAr: 'فرانكفورت، ألمانيا',
    resultEn: 'Met 12 potential distributors',
    resultAr: 'قابلنا ١٢ موزعاً محتملاً',
  },
  {
    nameEn: 'Shoe Electronics Fair',
    nameAr: 'معرض الأحذية الإلكتروني',
    dateEn: 'July 2025',
    dateAr: 'يوليو ٢٠٢٥',
    locationEn: 'Shanghai, China',
    locationAr: 'شنغهاي، الصين',
    resultEn: 'Secured 3 new OEM partnerships',
    resultAr: 'أبرمنا ٣ شراكات OEM جديدة',
  },
]

export default function TradeShowsPage({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar'
  const [form, setForm] = useState({ name: '', email: '', company: '', event: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactPerson: form.name,
          email: form.email,
          companyName: form.company,
          event: form.event,
          message: form.message,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', company: '', event: '', message: '' })
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
        <Breadcrumb items={[{ label: isAr ? 'المعارض' : 'Trade Shows' }]} lang={lang} />
        <SectionHeader
          label={isAr ? 'المعارض' : 'TRADE SHOWS'}
          title={isAr ? 'التق بنا في المعارض' : 'Meet Us at Trade Shows'}
          description={isAr ? 'تواصل معنا في أبرز معارض الأحذية العالمية' : 'Connect with us at the world\'s leading footwear exhibitions'}
          align="center"
        />
      </Section>

      <Section dark={false}>
        <SectionHeader
          label={isAr ? 'الفعاليات القادمة' : 'UPCOMING EVENTS'}
          title={isAr ? 'الفعاليات القادمة' : 'Upcoming Events'}
          align="center"
        />
        <SectionGrid cols={3}>
          {upcomingEvents.map((event) => (
            <div key={event.nameEn} className="card">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="heading-sm">{isAr ? event.nameAr : event.nameEn}</h3>
                  <p className="body-sm">{isAr ? event.dateAr : event.dateEn}</p>
                </div>
              </div>
              <p className="body-sm mb-1">{isAr ? event.locationAr : event.locationEn}</p>
              <p className="label-tag">{isAr ? event.standAr : event.standEn}</p>
            </div>
          ))}
        </SectionGrid>
      </Section>

      <Section dark={true}>
        <SectionHeader
          label={isAr ? 'الفعاليات السابقة' : 'PAST EVENTS'}
          title={isAr ? 'فعاليات سابقة' : 'Past Events'}
          align="center"
        />
        <div className="space-y-4 max-w-3xl mx-auto">
          {pastEvents.map((event) => (
            <div key={event.nameEn} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="heading-sm mb-1">{isAr ? event.nameAr : event.nameEn}</h3>
                  <p className="body-sm">{isAr ? event.locationAr : event.locationEn} · {isAr ? event.dateAr : event.dateEn}</p>
                </div>
                <span className="label-tag">{isAr ? event.resultAr : event.resultEn}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section dark={false}>
        <SectionHeader
          label={isAr ? 'ن次会议' : 'SCHEDULE A MEETING'}
          title={isAr ? 'حدد اجتماعاً في المعرض القادم' : 'Schedule a Meeting at the Next Show'}
          description={isAr ? 'أرسل لنا رسالة وسنحدد موعداً' : 'Send us a message and we\'ll set up a time'}
          align="center"
        />
        {status === 'success' ? (
          <div className="card text-center py-12 max-w-xl mx-auto">
            <svg className="h-16 w-16 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="heading-sm mb-2">
              {isAr ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!'}
            </h3>
            <p className="body-sm">{isAr ? 'سنتواصل معك قريباً' : 'We will get back to you soon'}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={isAr ? 'الاسم' : 'Your Name'}
                className="px-4 py-3 rounded-xl bg-transparent border border-border text-text-primary body-md focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={isAr ? 'البريد الإلكتروني' : 'Email'}
                className="px-4 py-3 rounded-xl bg-transparent border border-border text-text-primary body-md focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              />
            </div>
            <input
              type="text"
              name="company"
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder={isAr ? 'الشركة' : 'Company'}
              className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-text-primary body-md focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
            <select
              name="event"
              required
              value={form.event}
              onChange={(e) => setForm({ ...form, event: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-text-muted body-md focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none"
            >
              <option value="">{isAr ? 'اختر المعرض' : 'Select Event'}</option>
              {upcomingEvents.map((event) => (
                <option key={event.nameEn} value={event.nameEn}>{isAr ? event.nameAr : event.nameEn}</option>
              ))}
            </select>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={isAr ? 'رسالتك' : 'Your Message'}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-transparent border border-border text-text-primary body-md focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
            />
            {status === 'error' && (
              <p className="body-sm text-red-400">{isAr ? 'حدث خطأ، يرجى المحاولة مرة أخرى' : 'Something went wrong, please try again'}</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full btn-primary disabled:opacity-50"
            >
              {status === 'sending'
                ? (isAr ? 'جاري الإرسال...' : 'Sending...')
                : (isAr ? 'إرسال' : 'Send Message')}
            </button>
          </form>
        )}
      </Section>
    </>
  )
}
