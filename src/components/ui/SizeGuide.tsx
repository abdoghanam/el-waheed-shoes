'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface SizeGuideProps {
  isOpen: boolean
  onClose: () => void
  selectedSize?: string | null
  gender?: 'men' | 'women'
}

const sizeData = [
  { eu: 35, usMen: '3.5', uk: '3', cm: '22.5', usWomen: '5' },
  { eu: 36, usMen: '4', uk: '3.5', cm: '23', usWomen: '5.5' },
  { eu: 37, usMen: '5', uk: '4.5', cm: '24', usWomen: '6.5' },
  { eu: 38, usMen: '5.5', uk: '5', cm: '24.5', usWomen: '7' },
  { eu: 39, usMen: '6.5', uk: '6', cm: '25.5', usWomen: '8' },
  { eu: 40, usMen: '7', uk: '6.5', cm: '26', usWomen: '8.5' },
  { eu: 41, usMen: '8', uk: '7.5', cm: '27', usWomen: '9.5' },
  { eu: 42, usMen: '8.5', uk: '8', cm: '27.5', usWomen: '10' },
  { eu: 43, usMen: '9.5', uk: '9', cm: '28.5', usWomen: '11' },
  { eu: 44, usMen: '10', uk: '9.5', cm: '29', usWomen: '11.5' },
  { eu: 45, usMen: '11', uk: '10.5', cm: '30', usWomen: '12.5' },
  { eu: 46, usMen: '11.5', uk: '11', cm: '30.5', usWomen: '13' },
  { eu: 47, usMen: '12.5', uk: '12', cm: '31.5', usWomen: '14' },
]

export function SizeGuide({ isOpen, onClose, selectedSize, gender = 'men' }: SizeGuideProps) {
  const [activeGender, setActiveGender] = useState<'men' | 'women'>(gender)
  const [showMeasurement, setShowMeasurement] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm px-6 py-4">
              <h2 className="text-xl font-bold text-white">Size Guide</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveGender('men')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeGender === 'men' ? 'bg-gold text-black' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Men's
                </button>
                <button
                  onClick={() => setActiveGender('women')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeGender === 'women' ? 'bg-gold text-black' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Women's
                </button>
              </div>

              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-3 px-4 text-left font-semibold text-gold">EU</th>
                      <th className="py-3 px-4 text-left font-semibold text-gold">
                        {activeGender === 'men' ? 'US Men' : 'US Women'}
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-gold">UK</th>
                      <th className="py-3 px-4 text-left font-semibold text-gold">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map((row) => {
                      const isSelected = selectedSize === String(row.eu)
                      return (
                        <tr
                          key={row.eu}
                          className={`border-b border-gray-800/50 transition-colors ${
                            isSelected ? 'bg-gold/10' : 'hover:bg-gray-800/50'
                          }`}
                        >
                          <td className={`py-3 px-4 font-medium ${isSelected ? 'text-gold font-bold' : 'text-white'}`}>
                            {row.eu}
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {activeGender === 'men' ? row.usMen : row.usWomen}
                          </td>
                          <td className="py-3 px-4 text-gray-300">{row.uk}</td>
                          <td className="py-3 px-4 text-gray-300">{row.cm}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <button
                  onClick={() => setShowMeasurement(!showMeasurement)}
                  className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
                >
                  <svg className={`h-5 w-5 transition-transform ${showMeasurement ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium">How to Measure Your Foot</span>
                </button>

                <AnimatePresence>
                  {showMeasurement && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex justify-center">
                          <svg viewBox="0 0 200 300" className="w-48 h-auto">
                            <ellipse cx="100" cy="100" rx="55" ry="85" fill="none" stroke="#D4AF37" strokeWidth="2" />
                            <ellipse cx="100" cy="190" rx="45" ry="70" fill="none" stroke="#D4AF37" strokeWidth="2" />
                            <ellipse cx="70" cy="40" rx="12" ry="16" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                            <ellipse cx="90" cy="25" rx="10" ry="14" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                            <ellipse cx="110" cy="22" rx="10" ry="13" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                            <ellipse cx="128" cy="28" rx="9" ry="12" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                            <ellipse cx="140" cy="40" rx="8" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                            <line x1="45" y1="100" x2="155" y2="100" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" />
                            <line x1="100" y1="15" x2="100" y2="275" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" />
                            <text x="100" y="295" textAnchor="middle" fill="#9CA3AF" fontSize="11">Foot Outline</text>
                          </svg>
                        </div>
                        <div className="space-y-3 text-sm text-gray-400">
                          <p className="font-medium text-white">Follow these steps:</p>
                          <ol className="space-y-2 list-decimal list-inside">
                            <li>Place your foot on a piece of paper against a wall</li>
                            <li>Mark the longest toe and the heel on the paper</li>
                            <li>Measure the distance between the two marks in cm</li>
                            <li>Match your measurement to the CM column above</li>
                          </ol>
                          <p className="text-xs text-gray-500">Tip: Measure both feet — use the larger measurement.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
