'use client'
import React from 'react'
import { motion } from 'motion/react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
  narrow?: boolean
}

export function Section({ children, className = '', id, dark = true, narrow = true }: SectionProps) {
  return (
    <section
      id={id}
      className={`section-padding ${dark ? 'bg-section-dark' : 'bg-section-card'} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={narrow ? 'section-narrow' : ''}
      >
        {children}
      </motion.div>
    </section>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="label-tag mb-4">{children}</p>
}

export function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`heading-lg mb-6 ${className}`}>{children}</h2>
}

export function SectionDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`body-lg max-w-2xl ${className}`}>{children}</p>
}

export function SectionGrid({ children, cols = 3, className = '' }: { children: React.ReactNode; cols?: 2 | 3 | 4; className?: string }) {
  const gridCols = cols === 2 ? 'grid-cols-1 md:grid-cols-2' : cols === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  return <div className={`grid ${gridCols} gap-6 ${className}`}>{children}</div>
}

export function SectionHeader({ label, title, description, align = 'center', className = '' }: { label: string; title: string; description?: string; align?: 'left' | 'center'; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mb-10 md:mb-12 lg:mb-16 ${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      <p className="label-tag mb-4">{label}</p>
      <h2 className="heading-lg mb-4 overflow-hidden">{title}</h2>
      {description && (
        <p className={`body-lg ${align === 'center' ? 'mx-auto' : ''} max-w-2xl overflow-hidden`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
