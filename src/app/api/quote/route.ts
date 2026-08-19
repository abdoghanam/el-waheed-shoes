import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit'
import { sanitize, validateQuoteForm } from '@/lib/validate'

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const { allowed, remaining } = rateLimit(`quote:${ip}`, RATE_LIMITS.quote)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    )
  }

  let body: Record<string, unknown>
  try {
    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      body = {}
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          body[key] = value
        }
      }
    } else {
      body = await request.json()
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== 'string') continue
    sanitized[key] = sanitize(value, key === 'message' ? 5000 : 200)
  }

  const errors = validateQuoteForm(sanitized)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 })
  }

  const payload = await getPayload({ config })

  await payload.create({
    collection: 'inquiries',
    data: {
      companyName: String(sanitized.companyName),
      country: String(sanitized.country),
      contactPerson: String(sanitized.contactPerson),
      email: String(sanitized.email),
      phone: String(sanitized.phone || ''),
      message: String(sanitized.message),
      priority: 'high',
    },
  })

  return NextResponse.json(
    { success: true, message: 'Quote request submitted successfully' },
    { status: 200, headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}
