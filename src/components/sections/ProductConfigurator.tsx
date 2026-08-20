'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { dictionaries } from '@/lib/dictionaries'
import type { Locale } from '@/lib/i18n'

const categoryKeys = ['casual', 'sport', 'formal', 'safety', 'sandal', 'boot'] as const
const categoryIcons: Record<string, string> = {
  casual: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
  sport: 'M13 10V3L4 14h7v7l9-11h-7z',
  formal: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  safety: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  sandal: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14',
  boot: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
}

const materialKeys = ['genuineLeather', 'suede', 'canvas', 'mesh', 'patentLeather', 'rubber'] as const
const materialColors: Record<string, string> = {
  genuineLeather: '#8B4513',
  suede: '#C4A882',
  canvas: '#D0D0D0',
  mesh: '#CCCCCC',
  patentLeather: '#1a1a2e',
  rubber: '#555555',
}

const colorKeys = ['black', 'brown', 'white', 'navy', 'red', 'gray', 'tan', 'olive'] as const
const colorHex: Record<string, string> = {
  black: '#1a1a1a',
  brown: '#8B4513',
  white: '#F5F5F5',
  navy: '#2F4F4F',
  red: '#B22222',
  gray: '#808080',
  tan: '#D2B48C',
  olive: '#556B2F',
}

const soleKeys = ['rubber', 'eva', 'leather'] as const

export function ProductConfigurator({ lang }: { lang: Locale }) {
  const dict = dictionaries[lang].configurator
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSole, setSelectedSole] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium">{dict.title}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary">
            {dict.subtitle}
          </h2>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                step === s ? 'bg-gold text-black' : step > s ? 'bg-gold/20 text-gold' : 'bg-elevated text-muted'
              }`}>
                {step > s ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-gold' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                  <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{dict.success}</h3>
                <p className="text-secondary mb-1">Reference: #CQ-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
                <p className="text-sm text-muted">{dict.successDesc}</p>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h3 className="text-lg font-bold text-primary mb-6">{dict.step1}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {categoryKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                        selectedCategory === key
                          ? 'border-gold bg-gold/5'
                            : 'border-border hover:border-gold/30'
                      }`}
                    >
                      <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={categoryIcons[key]} />
                      </svg>
                      <span className="font-medium text-primary text-sm">{dict.categories[key as keyof typeof dict.categories]}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary mb-4">{dict.material}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {materialKeys.map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedMaterial(key)}
                        className={`flex items-center gap-3 rounded-lg border-2 p-3 transition-all ${
                          selectedMaterial === key
                            ? 'border-gold bg-gold/5'
                          : 'border-border hover:border-gold/30'
                        }`}
                      >
                        <div className="h-8 w-8 rounded-full shrink-0" style={{ backgroundColor: materialColors[key] }} />
                        <span className="text-sm font-medium text-primary">{dict.materials[key as keyof typeof dict.materials]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-primary mb-4">{dict.color}</h3>
                  <div className="flex flex-wrap gap-3">
                    {colorKeys.map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedColor(key)}
                        className={`flex flex-col items-center gap-1.5`}
                      >
                        <div className={`h-10 w-10 rounded-full transition-all ${
                          selectedColor === key ? 'ring-2 ring-gold ring-offset-2 scale-110' : 'hover:scale-110'
                        }`} style={{ backgroundColor: colorHex[key] }} />
                        <span className="text-xs text-muted">{dict.colors[key as keyof typeof dict.colors]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-primary mb-4">{dict.soleType}</h3>
                  <div className="flex gap-3">
                    {soleKeys.map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedSole(key)}
                        className={`rounded-lg border-2 px-6 py-3 text-sm font-medium transition-all ${
                          selectedSole === key
                            ? 'border-gold bg-gold/5 text-gold'
                            : 'border-border text-secondary hover:border-gold/30'
                        }`}
                      >
                        {dict.soles[key as keyof typeof dict.soles]}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-bold text-primary mb-4">{dict.step4}</h3>
                <div className="rounded-lg bg-elevated p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-secondary">{dict.step1.split(':')[1]?.trim() || 'Category'}:</span><span className="font-medium text-primary">{selectedCategory ? dict.categories[selectedCategory as keyof typeof dict.categories] : '—'}</span></div>
                  <div className="flex justify-between"><span className="text-secondary">{dict.material}:</span><span className="font-medium text-primary">{selectedMaterial ? dict.materials[selectedMaterial as keyof typeof dict.materials] : '—'}</span></div>
                  <div className="flex justify-between"><span className="text-secondary">{dict.color}:</span><span className="font-medium text-primary">{selectedColor ? dict.colors[selectedColor as keyof typeof dict.colors] : '—'}</span></div>
                  <div className="flex justify-between"><span className="text-secondary">{dict.soleType}:</span><span className="font-medium text-primary">{selectedSole ? dict.soles[selectedSole as keyof typeof dict.soles] : '—'}</span></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" placeholder={dict.form.name} aria-label={dict.form.name} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-lg border border-border bg-elevated px-4 py-3 text-sm text-primary focus:border-gold focus:outline-none" />
                  <input type="email" placeholder={dict.form.email} aria-label={dict.form.email} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="rounded-lg border border-border bg-elevated px-4 py-3 text-sm text-primary focus:border-gold focus:outline-none" />
                  <input type="text" placeholder={dict.form.company} aria-label={dict.form.company} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="rounded-lg border border-border bg-elevated px-4 py-3 text-sm text-primary focus:border-gold focus:outline-none" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!submitted && (
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-secondary transition-all hover:border-gold/50 disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {dict.back}
            </button>
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={step === 1 && !selectedCategory}
                className="flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-50"
              >
                {dict.next}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
              >
                {dict.requestQuote}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
