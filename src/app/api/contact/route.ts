import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit'
import { sanitize, validateContactForm } from '@/lib/validate'
import { validateCsrfToken } from '@/lib/csrf'
import { sendEmail, buildContactNotificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const { allowed, remaining } = await rateLimit(`contact:${ip}`, RATE_LIMITS.contact)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    )
  }

  if (!validateCsrfToken(request)) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Sanitize all string fields
  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== 'string') continue
    sanitized[key] = sanitize(value, key === 'message' ? 5000 : 200)
  }

  const errors = validateContactForm(sanitized)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 })
  }

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'inquiries',
      data: {
        companyName: String(sanitized.company),
        country: String(sanitized.country),
        contactPerson: String(sanitized.name),
        email: String(sanitized.email),
        phone: String(sanitized.phone || ''),
        message: String(sanitized.message),
        priority: 'medium',
      },
      overrideAccess: true,
    })

    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@elwaheedshoes.com',
      subject: `[Contact Inquiry] ${sanitized.name} — ${sanitized.subject || 'General Inquiry'}`,
      html: buildContactNotificationEmail({
        name: String(sanitized.name),
        company: String(sanitized.company),
        country: String(sanitized.country),
        email: String(sanitized.email),
        phone: String(sanitized.phone || ''),
        subject: String(sanitized.subject || 'General Inquiry'),
        message: String(sanitized.message),
      }),
    })
  } catch (error) {
    console.error('Failed to create contact inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again later.' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { success: true, message: 'Inquiry submitted successfully' },
    { status: 200, headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}
