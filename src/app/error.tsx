'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
    console.error('[RootError]', error.message, error.digest)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-[8rem] font-bold leading-none text-gold-gradient opacity-20">
          !
        </h1>
        <h2 className="text-3xl font-bold text-white mt-[-2rem] mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
