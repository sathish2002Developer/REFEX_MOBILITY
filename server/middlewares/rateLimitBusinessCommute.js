/** Simple in-memory rate limit for business enquiry (production). */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = Number(process.env.BUSINESS_FORM_RATE_LIMIT || 20);
const hits = new Map();

function rateLimitBusinessCommute(req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  const ip =
    String(req.headers['x-forwarded-for'] || '')
      .split(',')[0]
      .trim() || req.ip || 'unknown';

  const now = Date.now();
  let entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    entry = { start: now, count: 0 };
    hits.set(ip, entry);
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: 'Too many submissions. Please try again later.',
      errorMessages: ['Too many submissions. Please try again later.'],
      errors: [],
    });
  }

  return next();
}

module.exports = rateLimitBusinessCommute;
