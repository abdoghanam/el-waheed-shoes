export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, '')
}

export function sanitize(input: string, maxLength = 5000): string {
  return stripHtmlTags(input).trim().slice(0, maxLength)
}

export function validateEmail(email: string): boolean {
  if (!email || email.length > 320) return false
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(email)
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true
  const cleaned = phone.replace(/[\s\-().+]/g, '')
  return /^\d{7,15}$/.test(cleaned)
}

export function validateRequired(value: string | null | undefined, fieldName: string): string | null {
  if (!value || !value.trim()) return `${fieldName} is required`
  return null
}

export function validateLength(value: string, min: number, max: number, fieldName: string): string | null {
  if (value.length < min) return `${fieldName} must be at least ${min} characters`
  if (value.length > max) return `${fieldName} must be at most ${max} characters`
  return null
}

export interface ValidationErrors {
  [field: string]: string
}

export function validateContactForm(data: Record<string, unknown>): ValidationErrors {
  const errors: ValidationErrors = {}

  const name = sanitize(String(data.name || ''))
  const company = sanitize(String(data.company || ''))
  const country = sanitize(String(data.country || ''))
  const email = String(data.email || '').trim()
  const phone = String(data.phone || '').trim()
  const message = sanitize(String(data.message || ''))

  const nameErr = validateRequired(name, 'Name')
  if (nameErr) errors.name = nameErr
  else { const lenErr = validateLength(name, 2, 100, 'Name'); if (lenErr) errors.name = lenErr }

  const companyErr = validateRequired(company, 'Company')
  if (companyErr) errors.company = companyErr
  else { const lenErr = validateLength(company, 2, 100, 'Company'); if (lenErr) errors.company = lenErr }

  const countryErr = validateRequired(country, 'Country')
  if (countryErr) errors.country = countryErr
  else { const lenErr = validateLength(country, 2, 100, 'Country'); if (lenErr) errors.country = lenErr }

  if (!validateEmail(email)) errors.email = 'Invalid email address'
  if (phone && !validatePhone(phone)) errors.phone = 'Invalid phone number'

  const messageErr = validateRequired(message, 'Message')
  if (messageErr) errors.message = messageErr
  else { const lenErr = validateLength(message, 10, 5000, 'Message'); if (lenErr) errors.message = lenErr }

  return errors
}

export function validateQuoteForm(data: Record<string, unknown>): ValidationErrors {
  const errors: ValidationErrors = {}

  const companyName = sanitize(String(data.companyName || ''))
  const country = sanitize(String(data.country || ''))
  const contactPerson = sanitize(String(data.contactPerson || ''))
  const email = String(data.email || '').trim()
  const phone = String(data.phone || '').trim()
  const message = sanitize(String(data.message || ''))

  const companyErr = validateRequired(companyName, 'Company name')
  if (companyErr) errors.companyName = companyErr

  const countryErr = validateRequired(country, 'Country')
  if (countryErr) errors.country = countryErr

  const contactErr = validateRequired(contactPerson, 'Contact person')
  if (contactErr) errors.contactPerson = contactErr

  if (!validateEmail(email)) errors.email = 'Invalid email address'
  if (phone && !validatePhone(phone)) errors.phone = 'Invalid phone number'

  const messageErr = validateRequired(message, 'Message')
  if (messageErr) errors.message = messageErr
  else { const lenErr = validateLength(message, 10, 5000, 'Message'); if (lenErr) errors.message = lenErr }

  return errors
}
