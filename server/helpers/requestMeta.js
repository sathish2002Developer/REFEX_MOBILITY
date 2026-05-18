const dayjs = require('dayjs');

function phoneToDigitsOnly(phone) {
  return String(phone ?? '').replace(/\D/g, '');
}

function parseUserAgent(ua) {
  const userAgent = String(ua ?? '');
  const uaLower = userAgent.toLowerCase();

  let deviceType = 'desktop';
  if (/(ipad|tablet)/i.test(userAgent)) deviceType = 'tablet';
  else if (/(mobi|android|iphone|ipod)/i.test(userAgent)) deviceType = 'mobile';

  let browser = 'unknown';
  if (uaLower.includes('edg/')) browser = 'edge';
  else if (uaLower.includes('opr/') || uaLower.includes('opera')) browser = 'opera';
  else if (uaLower.includes('chrome/')) browser = 'chrome';
  else if (uaLower.includes('safari/') && !uaLower.includes('chrome/')) browser = 'safari';
  else if (uaLower.includes('firefox/')) browser = 'firefox';

  return { deviceType, browser };
}

function getRequestMeta(req) {
  const now = dayjs();
  const timestamp = Date.now();

  const xForwardedFor = req.headers['x-forwarded-for'];
  const ipAddress =
    (Array.isArray(xForwardedFor) ? xForwardedFor[0] : String(xForwardedFor ?? '').split(',')[0]).trim() ||
    req.ip ||
    req.socket?.remoteAddress ||
    '';

  const userAgent = req.get('user-agent') || '';
  const { deviceType, browser } = parseUserAgent(userAgent);

  const countryCode =
    req.headers['cf-ipcountry'] ||
    req.headers['x-vercel-ip-country'] ||
    req.headers['x-country-code'] ||
    '';

  const referer = req.get('referer') || '';
  // Kissflow expects full page URL as source when available (see reference payload)
  const source = referer || 'direct';

  const istDate = new Date();
  const date = istDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const time = istDate.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return {
    timestamp,
    dateTime: now.toISOString(),
    date,
    time,
    ipAddress,
    userAgent,
    deviceType,
    browser,
    countryCode: String(countryCode || '').toUpperCase(),
    referer,
    source,
  };
}

module.exports = {
  getRequestMeta,
  phoneToDigitsOnly,
  parseUserAgent,
};

