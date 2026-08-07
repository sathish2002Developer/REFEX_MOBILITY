/** Google Ads — shared conversion account for landing pages */
export const GOOGLE_ADS_ID = 'AW-17993928802'

export const GOOGLE_ADS_CONVERSIONS = {
  corporateRentals: {
    sendTo: `${GOOGLE_ADS_ID}/8v4rCMuvw90cEOKgloRD`,
    pagePath: '/CorporateRentals',
  },
  employeeTransportation: {
    sendTo: `${GOOGLE_ADS_ID}/2HxOCKLrtd0cEOKgloRD`,
    pagePath: '/employee-transportation',
  },
}

function ensureGtag() {
  if (typeof window === 'undefined') return Promise.resolve()

  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
  }

  const hasScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
  if (hasScript) return Promise.resolve()

  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
    script.dataset.googleAds = GOOGLE_ADS_ID
    script.onload = () => resolve()
    script.onerror = () => resolve()
    document.head.appendChild(script)
  })
}

/** Configure Google Ads base tag for a landing page. */
export async function configGoogleAdsLanding(pagePath) {
  await ensureGtag()
  if (typeof window.gtag !== 'function') return
  window.gtag('config', GOOGLE_ADS_ID, {
    page_path: pagePath || window.location.pathname,
    send_page_view: true,
  })
}

/**
 * Fire a Google Ads conversion event.
 * @param {'corporateRentals' | 'employeeTransportation'} landingKey
 */
export async function trackGoogleAdsConversion(landingKey) {
  const conversion = GOOGLE_ADS_CONVERSIONS[landingKey]
  if (!conversion) return

  await ensureGtag()
  if (typeof window.gtag !== 'function') return

  window.gtag('event', 'conversion', {
    send_to: conversion.sendTo,
  })
}
