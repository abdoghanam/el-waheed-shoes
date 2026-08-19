export interface RateLimitConfig {
  windowMs: number
  max: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetMs: number
}

async function upstashRateLimit(
  key: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return fallbackRateLimit(key, config)

  const windowKey = `${key}:${Math.floor(Date.now() / config.windowMs)}`
  const redisKey = `rl:${windowKey}`

  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', redisKey],
      ['PTTL', redisKey],
      ['EXPIRE', redisKey, Math.ceil(config.windowMs / 1000)],
    ]),
  })

  if (!res.ok) return fallbackRateLimit(key, config)

  const data = await res.json()
  const count = data[0]?.result ?? 1
  const ttl = data[1]?.result ?? config.windowMs

  return {
    allowed: count <= config.max,
    remaining: Math.max(0, config.max - count),
    resetMs: ttl > 0 ? ttl : config.windowMs,
  }
}

const memStore = new Map<string, { count: number; resetTime: number }>()
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < 60_000) return
  lastCleanup = now
  for (const [k, v] of memStore) {
    if (now > v.resetTime) memStore.delete(k)
  }
}

function fallbackRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  cleanup()
  const now = Date.now()
  const entry = memStore.get(key)

  if (!entry || now > entry.resetTime) {
    memStore.set(key, { count: 1, resetTime: now + config.windowMs })
    return { allowed: true, remaining: config.max - 1, resetMs: config.windowMs }
  }

  if (entry.count >= config.max) {
    return { allowed: false, remaining: 0, resetMs: entry.resetTime - now }
  }

  entry.count++
  return { allowed: true, remaining: config.max - entry.count, resetMs: entry.resetTime - now }
}

export async function rateLimit(
  key: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  return upstashRateLimit(key, config)
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
