'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const categories = [
  { key: 'casual', label: 'Casual', labelAr: 'كاجوال', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
  { key: 'sport', label: 'Sport', labelAr: 'رياضية', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { key: 'formal', label: 'Formal', labelAr: 'رسمي', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { key: 'safety', label: 'Safety', labelAr: 'أمان', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { key: 'sandal', label: 'Sandal', labelAr: 'صندل', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14' },
  { key: 'boot', label: 'Boot', labelAr: 'بوت', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
]

const materials = [
  { key: 'genuine-leather', label: 'Genuine Leather', color: '#8B4513' },
  { key: 'suede', label: 'Suede', color: '#C4A882' },
  { key: 'canvas', label: 'Canvas', color: '#D0D0D0' },
  { key: 'mesh', label: 'Mesh', color: '#CCCCCC' },
  { key: 'patent-leather', label: 'Patent Leather', color: '#1a1a2e' },
  { key: 'rubber', label: 'Rubber', color: '#555555' },
]

const colors = [
  { key: 'black', label: 'Black', hex: '#1a1a1a' },
  { key: 'brown', label: 'Brown', hex: '#8B4513' },
  { key: 'white', label: 'White', hex: '#F5F5F5' },
  { key: 'navy', label: 'Navy', hex: '#2F4F4F' },
  { key: 'red', label: 'Red', hex: '#B22222' },
  { key: 'gray', label: 'Gray', hex: '#808080' },
  { key: 'tan', label: 'Tan', hex: '#D2B48C' },
  { key: 'olive', label: 'Olive', hex: '#556B2F' },
]

const soleTypes = [
  { key: 'rubber', label: 'Rubber', labelAr: 'مطاط' },
  { key: 'eva', label: 'EVA Foam', labelAr: 'فوم EVA' },
  { key: 'leather', label: 'Leather', labelAr: 'جلد' },
]

export function ProductConfigurator() {
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
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium">Custom Design</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-black">
            Design Your Custom Shoe / صمم حذاءك المخصص
          </h2>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                step === s ? 'bg-gold text-black' : step > s ? 'bg-gold/20 text-gold' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-gold' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 sm:p-8 min-h-[400px]">
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
                <h3 className="text-2xl font-bold text-black mb-2">Quote Request Submitted!</h3>
                <p className="text-gray-500 mb-1">Reference: #CQ-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
                <p className="text-sm text-gray-400">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h3 className="text-lg font-bold text-black mb-6">Step 1: Choose Category</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                        selectedCategory === cat.key
                          ? 'border-gold bg-gold/5'
                          : 'border-gray-100 hover:border-gold/30'
                      }`}
                    >
                      <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                      </svg>
                      <span className="font-medium text-black text-sm">{cat.label}</span>
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
                  <h3 className="text-lg font-bold text-black mb-4">Material</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {materials.map((mat) => (
                      <button
                        key={mat.key}
                        onClick={() => setSelectedMaterial(mat.key)}
                        className={`flex items-center gap-3 rounded-lg border-2 p-3 transition-all ${
                          selectedMaterial === mat.key
                            ? 'border-gold bg-gold/5'
                            : 'border-gray-100 hover:border-gold/30'
                        }`}
                      >
                        <div className="h-8 w-8 rounded-full shrink-0" style={{ backgroundColor: mat.color }} />
                        <span className="text-sm font-medium text-black">{mat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => setSelectedColor(c.key)}
                        className={`flex flex-col items-center gap-1.5`}
                      >
                        <div className={`h-10 w-10 rounded-full transition-all ${
                          selectedColor === c.key ? 'ring-2 ring-gold ring-offset-2 scale-110' : 'hover:scale-110'
                        }`} style={{ backgroundColor: c.hex }} />
                        <span className="text-xs text-gray-500">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Sole Type</h3>
                  <div className="flex gap-3">
                    {soleTypes.map((sole) => (
                      <button
                        key={sole.key}
                        onClick={() => setSelectedSole(sole.key)}
                        className={`rounded-lg border-2 px-6 py-3 text-sm font-medium transition-all ${
                          selectedSole === sole.key
                            ? 'border-gold bg-gold/5 text-gold'
                            : 'border-gray-100 text-gray-600 hover:border-gold/30'
                        }`}
                      >
                        {sole.label}
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
                <h3 className="text-lg font-bold text-black mb-4">Review & Request</h3>
                <div className="rounded-lg bg-gray-50 p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Category:</span><span className="font-medium text-black">{categories.find(c => c.key === selectedCategory)?.label || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Material:</span><span className="font-medium text-black">{materials.find(m => m.key === selectedMaterial)?.label || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Color:</span><span className="font-medium text-black">{colors.find(c => c.key === selectedColor)?.label || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Sole:</span><span className="font-medium text-black">{soleTypes.find(s => s.key === selectedSole)?.label || '—'}</span></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none" />
                  <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none" />
                  <input type="text" placeholder="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none" />
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
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-500 transition-all hover:border-gold/50 disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={step === 1 && !selectedCategory}
                className="flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-50"
              >
                Next
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
              >
                Request Custom Quote
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
