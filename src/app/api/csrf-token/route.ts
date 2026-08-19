import { NextResponse } from 'next/server'
import { generateCsrfToken } from '@/lib/csrf'

export async function GET() {
  const token = await generateCsrfToken()
  const res = NextResponse.json({ token })
  res.cookies.set('_csrf', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 3600,
  })
  return res
}
