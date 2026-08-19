'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
  name?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SectionErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[SectionErrorBoundary:${this.props.name || 'unknown'}]`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="section-padding bg-section-dark">
          <div className="section-narrow text-center py-12">
            <p className="text-text-muted body-md">
              This section failed to load. Please try refreshing the page.
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
