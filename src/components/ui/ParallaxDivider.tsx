'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

type ParallaxHeight = 'sm' | 'md' | 'lg'

interface ParallaxDividerProps {
  image: string
  height?: ParallaxHeight
  overlay?: number
  children?: React.ReactNode
}

const heightMap: Record<ParallaxHeight, string> = {
  sm: 'h-[200px]',
  md: 'h-[300px]',
  lg: 'h-[400px]',
}

export default function ParallaxDivider({
  image,
  height = 'md',
  overlay = 0.6,
  children,
}: ParallaxDividerProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={ref} className={`relative ${heightMap[height]} w-full overflow-hidden`}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <svg viewBox="0 0 1200 400" className="w-full h-[130%] -top-[15%] relative" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`parallax-bg-${height}`} x1="0" y1="0" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="50%" stopColor="#16213e" />
              <stop offset="100%" stopColor="#0f3460" />
            </linearGradient>
            <pattern id={`parallax-texture-${height}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="transparent" />
              <circle cx="20" cy="20" r="0.5" fill="rgba(212,175,55,0.1)" />
            </pattern>
          </defs>
          <rect width="1200" height="400" fill={`url(#parallax-bg-${height})`} />
          <rect width="1200" height="400" fill={`url(#parallax-texture-${height})`} />
          <text x="600" y="200" textAnchor="middle" fill="rgba(212,175,55,0.08)" fontSize="120" fontFamily="sans-serif" fontWeight="800">
            W
          </text>
        </svg>
      </motion.div>
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlay }}
      />
      {children && (
        <div className="relative z-10 h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </section>
  )
}
