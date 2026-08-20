import crypto from 'crypto'

const _csrfSecret = process.env.CSRF_SECRET || process.env.PAYLOAD_SECRET
if (!_csrfSecret) {
  throw new Error('CSRF_SECRET or PAYLOAD_SECRET environment variable must be set')
}
const CSRF_SECRET: string = _csrfSecret
const CSRF_HEADER = 'x-csrf-token'
const TOKEN_TTL_MS = 60 * 60 * 1000

function sign(data: string): string {
  return crypto.createHmac('sha256', CSRF_SECRET).update(data).digest('hex')
}

export async function generateCsrfToken(): Promise<string> {
  const ts = Date.now().toString()
  const sig = sign(ts)
  return `${ts}:${sig}`
}

export function validateCsrfToken(request: Request): boolean {
  const headerToken = request.headers.get(CSRF_HEADER)
  if (!headerToken) return false

  const parts = headerToken.split(':')
  if (parts.length !== 2) return false

  const [tsStr, sig] = parts
  const ts = parseInt(tsStr, 10)
  if (isNaN(ts) || Date.now() - ts > TOKEN_TTL_MS) return false

  const expectedSig = sign(tsStr)
  try {
    return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expectedSig, 'hex'))
  } catch {
    return false
  }
}

export async function csrfTokenResponse(): Promise<string> {
  return generateCsrfToken()
}
