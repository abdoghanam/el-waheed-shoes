export interface RateLimitConfig {
  windowMs: number
  max: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetMs: number
}

export async function rateLimit(
  key: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return { allowed: true, remaining: config.max, resetMs: config.windowMs }
  }

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

  if (!res.ok) {
    return { allowed: true, remaining: config.max, resetMs: config.windowMs }
  }

  const data = await res.json()
  const count = data[0]?.result ?? 1
  const ttl = data[1]?.result ?? config.windowMs

  return {
    allowed: count <= config.max,
    remaining: Math.max(0, config.max - count),
    resetMs: ttl > 0 ? ttl : config.windowMs,
  }
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
