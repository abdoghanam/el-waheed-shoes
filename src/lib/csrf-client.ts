'use client'

let cachedToken: string | null = null

export async function getCsrfToken(): Promise<string> {
  if (cachedToken) return cachedToken
  try {
    const res = await fetch('/api/csrf-token')
    const data = await res.json()
    cachedToken = data.token
    return data.token
  } catch {
    return ''
  }
}

export function csrfHeaders(token: string): Record<string, string> {
  return { 'x-csrf-token': token }
}

export function resetCsrfToken() {
  cachedToken = null
}
