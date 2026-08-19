import React from 'react'

function sanitizeString(value: unknown): unknown {
  if (typeof value === 'string') {
    return value
      .replace(/<[^>]*>/g, '')
      .slice(0, 5000)
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeString)
  }
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(value)) {
      result[key] = sanitizeString(val)
    }
    return result
  }
  return value
}

export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[]
}) {
  const sanitized = sanitizeString(data)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(sanitized) }}
    />
  )
}
