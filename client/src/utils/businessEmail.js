/**
 * Business / work email validation for landing-page lead forms.
 * Keep in sync with server/helpers/businessEmail.js
 */

const EMAIL_FORMAT_RE =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.in',
  'yahoo.co.uk',
  'ymail.com',
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.co.in',
  'outlook.com',
  'outlook.in',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'protonmail.com',
  'proton.me',
  'pm.me',
  'rediffmail.com',
  'mail.com',
  'gmx.com',
  'gmx.net',
  'yandex.com',
  'yandex.ru',
  'mail.ru',
  'inbox.com',
  'fastmail.com',
  'tutanota.com',
  'tutamail.com',
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'tempmail.com',
  'temp-mail.org',
  '10minutemail.com',
  'sharklasers.com',
  'trashmail.com',
  'yopmail.com',
])

export const BUSINESS_EMAIL_ERROR =
  'Please enter your business email address. Personal email addresses such as Gmail or Yahoo are not accepted.'

export function normalizeEmail(email) {
  return String(email ?? '').trim()
}

export function extractEmailDomain(email) {
  const normalized = normalizeEmail(email).toLowerCase()
  const at = normalized.lastIndexOf('@')
  if (at <= 0 || at === normalized.length - 1) return ''
  return normalized.slice(at + 1)
}

export function isPersonalOrFreeEmailDomain(domain) {
  const d = String(domain || '')
    .trim()
    .toLowerCase()
  if (!d) return false
  if (PERSONAL_EMAIL_DOMAINS.has(d)) return true
  for (const blocked of PERSONAL_EMAIL_DOMAINS) {
    if (d.endsWith(`.${blocked}`)) return true
  }
  return false
}

export function isValidEmailFormat(email) {
  const normalized = normalizeEmail(email)
  if (!normalized) return false
  return EMAIL_FORMAT_RE.test(normalized)
}

/**
 * @returns {{ ok: boolean, error?: string, email?: string, domain?: string }}
 */
export function validateBusinessEmail(email) {
  const normalized = normalizeEmail(email)
  if (!normalized) {
    return { ok: false, error: 'Work email is required' }
  }
  if (!isValidEmailFormat(normalized)) {
    return { ok: false, error: 'Enter a valid work email' }
  }
  const domain = extractEmailDomain(normalized)
  if (!domain) {
    return { ok: false, error: 'Enter a valid work email' }
  }
  if (isPersonalOrFreeEmailDomain(domain)) {
    return { ok: false, error: BUSINESS_EMAIL_ERROR, email: normalized, domain }
  }
  return { ok: true, email: normalized, domain }
}

/** Returns error string for form fields, or '' when valid. */
export function getBusinessEmailFieldError(email) {
  const result = validateBusinessEmail(email)
  return result.ok ? '' : result.error || BUSINESS_EMAIL_ERROR
}
