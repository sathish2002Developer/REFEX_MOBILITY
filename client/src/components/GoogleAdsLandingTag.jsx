import { useEffect } from 'react'
import { configGoogleAdsLanding } from '../utils/googleAds'

/**
 * Configures Google Ads (AW-17993928802) on Corporate Rentals / ETS landing pages.
 */
export default function GoogleAdsLandingTag({ pagePath }) {
  useEffect(() => {
    configGoogleAdsLanding(pagePath).catch(() => {})
  }, [pagePath])

  return null
}
