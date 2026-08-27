/**
 * Shared spam / XSS guards for all public lead forms.
 * Suspicious submissions are ignored (fake success) so bots do not adapt.
 */

const BLOCKED_EMAILS = new Set([
  'test@gmail.com',
  'test@company.com',
  'test@test.com',
  'test@example.com',
]);

const BLOCKED_EMAIL_PATTERNS = [
  /^test(\+.*)?@/i,
  /^tester(\+.*)?@/i,
  /^asdf(\+.*)?@/i,
  /@test\.com$/i,
  /@example\.(com|org|net)$/i,
  /@mailinator\.com$/i,
  /@guerrillamail\./i,
  /@tempmail\./i,
];

/** Known spam / probe phone numbers (digits only). */
const BLOCKED_PHONES = new Set([
  '918234567890',
  '8234567890',
  '1234567890',
  '9999999999',
  '0000000000',
]);

const HTML_OR_SCRIPT_RE =
  /<\s*\/?\s*(script|iframe|object|embed|svg|img|link|meta|style|form|input|button)\b|javascript\s*:|on\w+\s*=|data:\s*text\/html|&lt;\s*\/?\s*script/i;

function normalizePhoneDigits(phone) {
  return String(phone ?? '').replace(/\D/g, '');
}

function containsSuspiciousHtml(value) {
  const s = String(value ?? '');
  if (!s) return false;
  return HTML_OR_SCRIPT_RE.test(s);
}

function isBlockedEmail(email) {
  const e = String(email ?? '')
    .trim()
    .toLowerCase();
  if (!e) return false;
  if (BLOCKED_EMAILS.has(e)) return true;
  return BLOCKED_EMAIL_PATTERNS.some((re) => re.test(e));
}

function isBlockedPhone(phone) {
  const digits = normalizePhoneDigits(phone);
  if (!digits) return false;
  if (BLOCKED_PHONES.has(digits)) return true;
  // Match national number even when country code is present
  if (digits.length >= 10 && BLOCKED_PHONES.has(digits.slice(-10))) return true;
  return false;
}

function collectStringValues(value, out = []) {
  if (value == null) return out;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    out.push(String(value));
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectStringValues(item, out));
    return out;
  }
  if (typeof value === 'object') {
    Object.values(value).forEach((item) => collectStringValues(item, out));
  }
  return out;
}

/**
 * @returns {null | { reason: string, detail?: string }}
 */
function getSpamRejection(body = {}) {
  const strings = collectStringValues(body);
  for (const s of strings) {
    if (containsSuspiciousHtml(s)) {
      return { reason: 'xss_or_html', detail: s.slice(0, 80) };
    }
  }

  if (isBlockedEmail(body.email)) {
    return { reason: 'blocked_email', detail: String(body.email) };
  }

  if (isBlockedPhone(body.phone)) {
    return { reason: 'blocked_phone', detail: normalizePhoneDigits(body.phone) };
  }

  return null;
}

function isSpamSubmission(body) {
  return Boolean(getSpamRejection(body));
}

module.exports = {
  getSpamRejection,
  isSpamSubmission,
  isBlockedEmail,
  isBlockedPhone,
  containsSuspiciousHtml,
  normalizePhoneDigits,
};
