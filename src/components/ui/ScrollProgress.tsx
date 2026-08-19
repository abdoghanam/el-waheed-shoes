'use client'

import { useState, useEffect } from 'react'
import { motion, useSpring } from 'motion/react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const scaleX = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const p = total > 0 ? window.scrollY / total : 0
      setProgress(p)
      scaleX.set(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scaleX])

  return (
    <motion.div
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #B8960C, #D4AF37, #F0D68A)',
      }}
    />
  )
}
