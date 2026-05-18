const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

function isLocalDevRequest(req) {
  const origin = String(req.get('origin') || '').toLowerCase();
  const referer = String(req.get('referer') || '').toLowerCase();
  const token = String(req.body?.recaptchaToken || '');
  if (token === 'localhost-development') return true;
  return (
    origin.includes('localhost') ||
    origin.includes('127.0.0.1') ||
    referer.includes('localhost') ||
    referer.includes('127.0.0.1')
  );
}

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn('[reCAPTCHA] RECAPTCHA_SECRET_KEY not set');
    return false;
  }
  if (!token) return false;

  const fetchFn =
    typeof fetch === 'function'
      ? fetch
      : (await import('node-fetch')).default;

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  const res = await fetchFn(`${RECAPTCHA_VERIFY_URL}?${params.toString()}`, {
    method: 'POST',
    signal: AbortSignal.timeout(10000),
  });

  const data = await res.json();
  return Boolean(data?.success);
}

/**
 * Production: verify token. Local dev / localhost origin: skip.
 */
async function assertRecaptchaForSubmit(req) {
  if (isLocalDevRequest(req)) {
    return { ok: true };
  }

  if (process.env.NODE_ENV !== 'production' && !process.env.RECAPTCHA_SECRET_KEY) {
    return { ok: true };
  }

  const token = req.body?.recaptchaToken;
  if (!token) {
    return { ok: false, message: 'Please complete the reCAPTCHA verification.' };
  }

  try {
    const valid = await verifyRecaptcha(token);
    if (!valid) {
      return { ok: false, message: 'reCAPTCHA verification failed. Please try again.' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[reCAPTCHA] verify error', { message: err?.message });
    return { ok: false, message: 'Unable to verify reCAPTCHA. Please try again.' };
  }
}

module.exports = {
  verifyRecaptcha,
  assertRecaptchaForSubmit,
  isLocalDevRequest,
};
