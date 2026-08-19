import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit'
import { sanitize, validateEmail } from '@/lib/validate'

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const { allowed, remaining } = rateLimit(`newsletter:${ip}`, RATE_LIMITS.newsletter)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const email = sanitize(String(body.email || ''), 320)

  if (!validateEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'inquiries',
    where: {
      and: [{ email: { equals: email } }, { companyName: { equals: '__newsletter__' } }],
    },
    limit: 1,
  })

  if (existing.docs.length === 0) {
    await payload.create({
      collection: 'inquiries',
      data: {
        companyName: '__newsletter__',
        country: 'N/A',
        contactPerson: email,
        email,
        message: 'Newsletter subscription',
        priority: 'low',
      },
      overrideAccess: true,
    })
  }

  return NextResponse.json(
    { success: true, message: 'Subscribed successfully' },
    { status: 200, headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}
