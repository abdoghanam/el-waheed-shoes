interface RateLimitEntry {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL = 60_000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (now > entry.resetTime) store.delete(key)
  }
}

if (typeof setInterval !== 'undefined') {
  setInterval(cleanup, CLEANUP_INTERVAL)
}

export interface RateLimitConfig {
  windowMs: number
  max: number
}

export function rateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetMs: number } {
  cleanup()

  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + config.windowMs })
    return { allowed: true, remaining: config.max - 1, resetMs: config.windowMs }
  }

  if (entry.count >= config.max) {
    const resetMs = entry.resetTime - now
    return { allowed: false, remaining: 0, resetMs }
  }

  entry.count++
  return { allowed: true, remaining: config.max - entry.count, resetMs: entry.resetTime - now }
}

export function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) {
    const firstIp = xff.split(',')[0].trim()
    if (firstIp) return firstIp
  }
  return 'unknown'
}

export const RATE_LIMITS = {
  newsletter: { windowMs: 60_000, max: 10 },
  contact: { windowMs: 60_000, max: 5 },
  quote: { windowMs: 60_000, max: 3 },
} as const
