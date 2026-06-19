import { API_BASE_URL } from './api'

/** Business enquiry form — keep in sync with server/config/siteConfig.js */

export const BUSINESS_SERVICES = [
  'Employee Transfers',
  'Airport Transfers',
  'Spot Rental',
  'Outstation Rides',
  'Business Travel',
  "All Services",
]

export const BUSINESS_REGIONS = [
  'Chennai',
  'Bengaluru',
  'Mumbai',
  'Hyderabad',
  'Delhi NCR',
  "All Regions",
]

// Production: VITE_API_BASE_URL (https://refexmobility.com). Dev: same URL unless proxy needed.
export { API_BASE_URL }
export const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  '6Lcu4JIrAAAAAI6_Qg8PfbukWRTSwDH6tD9MWyTy'

export function isLocalhost() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  return host === 'localhost' || host === '127.0.0.1' || host.includes('localhost')
}
