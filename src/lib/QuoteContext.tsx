'use client'
import React, { createContext, useContext, useState, useCallback } from 'react'

interface QuoteItem {
  productId: string
  name: string
  quantity: number
  notes: string
}

interface QuoteContextType {
  items: QuoteItem[]
  addItem: (item: QuoteItem) => void
  removeItem: (productId: string) => void
  clearItems: () => void
  totalItems: number
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])

  const addItem = useCallback((item: QuoteItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.productId === item.productId)
      if (exists) return prev.map(i => i.productId === item.productId ? { ...i, quantity: item.quantity } : i)
      return [...prev, item]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }, [])

  const clearItems = useCallback(() => setItems([]), [])

  return (
    <QuoteContext.Provider value={{ items, addItem, removeItem, clearItems, totalItems: items.length }}>
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) throw new Error('useQuote must be used within QuoteProvider')
  return context
}
