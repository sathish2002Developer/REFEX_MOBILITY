/**
 * Business / work email validation for landing-page lead forms.
 * Rejects known personal/free providers; accepts company domains.
 */

const EMAIL_FORMAT_RE =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

/** Exact domains (lowercase) that are not accepted as business email. */
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
  // Disposable / temporary (also covered by spam filter patterns)
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

const BUSINESS_EMAIL_ERROR =
  'Please enter your business email address. Personal email addresses such as Gmail or Yahoo are not accepted.'

function normalizeEmail(email) {
  return String(email ?? '').trim()
}

function extractEmailDomain(email) {
  const normalized = normalizeEmail(email).toLowerCase()
  const at = normalized.lastIndexOf('@')
  if (at <= 0 || at === normalized.length - 1) return ''
  return normalized.slice(at + 1)
}

/**
 * True when domain is a known personal/free/disposable provider
 * (exact match or subdomain, e.g. mail.yahoo.com).
 * Does NOT treat company.com containing "gmail" as personal.
 */
function isPersonalOrFreeEmailDomain(domain) {
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

function isValidEmailFormat(email) {
  const normalized = normalizeEmail(email)
  if (!normalized) return false
  return EMAIL_FORMAT_RE.test(normalized)
}

/**
 * @returns {{ ok: boolean, error?: string, email?: string, domain?: string }}
 */
function validateBusinessEmail(email) {
  const normalized = normalizeEmail(email)
  if (!normalized) {
    return { ok: false, error: 'email is required' }
  }
  if (!isValidEmailFormat(normalized)) {
    return { ok: false, error: 'email is invalid' }
  }
  const domain = extractEmailDomain(normalized)
  if (!domain) {
    return { ok: false, error: 'email is invalid' }
  }
  if (isPersonalOrFreeEmailDomain(domain)) {
    return { ok: false, error: BUSINESS_EMAIL_ERROR, email: normalized, domain }
  }
  return { ok: true, email: normalized, domain }
}

function isBusinessEmail(email) {
  return validateBusinessEmail(email).ok
}

module.exports = {
  PERSONAL_EMAIL_DOMAINS,
  BUSINESS_EMAIL_ERROR,
  normalizeEmail,
  extractEmailDomain,
  isPersonalOrFreeEmailDomain,
  isValidEmailFormat,
  validateBusinessEmail,
  isBusinessEmail,
}
