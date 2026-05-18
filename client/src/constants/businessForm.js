/** Business enquiry form — keep in sync with server/config/siteConfig.js */

export const BUSINESS_SERVICES = [
  'Corporate Commute',
  'Airport Transfers',
  'Hourly Rentals',
  'Outstation Rides',
]

export const BUSINESS_REGIONS = [
  'Chennai',
  'Bengaluru',
  'Mumbai',
  'Hyderabad',
  'Delhi NCR',
]

// Dev: same origin → Vite proxies /api to localhost:3009
export const API_BASE_URL = import.meta.env.DEV
  ? ''
  : import.meta.env.VITE_API_BASE_URL || ''

export const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  '6Lcu4JIrAAAAAI6_Qg8PfbukWRTSwDH6tD9MWyTy'

export function isLocalhost() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  return host === 'localhost' || host === '127.0.0.1' || host.includes('localhost')
}
