import termsBodyHtml from '../content/legal/terms-body.html?raw'
import privacyBodyHtml from '../content/legal/privacy-body.html?raw'
import refundsBodyHtml from '../content/legal/refunds-body.html?raw'

export const LEGAL_HERO_BACKGROUND =
  'https://refexmobility.com/wp-content/uploads/2025/07/drive-section-1-scaled.webp'

export function mergeLegalPageCms(defaults, apiData) {
  if (!apiData) return defaults
  return {
    pageTitle: apiData.pageTitle || defaults.pageTitle,
    metaDescription: apiData.metaDescription || defaults.metaDescription,
    sections: {
      ...defaults.sections,
      ...(apiData.sections || {}),
      hero: { ...defaults.sections.hero, ...(apiData.sections?.hero || {}) },
      body: { ...defaults.sections.body, ...(apiData.sections?.body || {}) },
    },
  }
}

export const DEFAULT_TERMS_CMS = {
  pageTitle: 'Terms and Conditions | Refex Mobility',
  metaDescription:
    'Most reliable, safe and sustainable mobility service for corporate travel. Trusted by enterprises driving clean transport goals.',
  sections: {
    hero: {
      title: 'Terms And Conditions',
      backgroundImage: LEGAL_HERO_BACKGROUND,
    },
    body: { html: termsBodyHtml },
  },
}

export const DEFAULT_PRIVACY_CMS = {
  pageTitle: 'Privacy Policy | Refex Mobility',
  metaDescription:
    "India's safest, most reliable and on-time mobility service for corporates and premium travel. Trusted by businesses, driving sustainability goals.",
  sections: {
    hero: {
      title: 'Privacy Policy',
      backgroundImage: LEGAL_HERO_BACKGROUND,
    },
    body: { html: privacyBodyHtml },
  },
}

export const DEFAULT_REFUNDS_CMS = {
  pageTitle: 'Refunds And Cancellation Policy | Refex Mobility',
  metaDescription:
    'Most reliable, safe and sustainable mobility service for corporate travel. Trusted by enterprises driving clean transport goals.',
  sections: {
    hero: {
      title: 'Refunds And Cancellation Policy',
      backgroundImage: LEGAL_HERO_BACKGROUND,
    },
    body: { html: refundsBodyHtml },
  },
}
