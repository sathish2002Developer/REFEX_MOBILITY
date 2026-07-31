import { DEFAULT_HOME_CMS, mergeHomeCms } from './homeCmsDefaults'
import { DEFAULT_DRIVE_FOR_US_CMS, mergeDriveForUsCms } from './driveForUsCmsDefaults'
import { DEFAULT_BUSINESS_COMMUTE_CMS, mergeBusinessCommuteCms } from './businessCommuteCmsDefaults'
import { DEFAULT_RAC_LANDING_CMS, mergeRacLandingCms } from './racLandingCmsDefaults'
import { DEFAULT_ETS_LANDING_CMS, mergeEtsLandingCms } from './etsLandingCmsDefaults'
import {
  DEFAULT_TERMS_CMS,
  DEFAULT_PRIVACY_CMS,
  DEFAULT_REFUNDS_CMS,
  mergeLegalPageCms,
} from './legalPagesCmsDefaults'

export const CMS_PAGES = [
  { slug: 'home', label: 'Website Home', path: '/' },
  { slug: 'drive-for-us', label: 'Drive For Us', path: '/drive-for-us' },
  { slug: 'business-commute', label: 'Business Commute', path: '/business-commute' },
  { slug: 'terms-and-conditions', label: 'Terms & Conditions', path: '/terms-and-conditions' },
  { slug: 'privacy-policy', label: 'Privacy Policy', path: '/privacy-policy' },
  { slug: 'refunds-and-cancellation-policy', label: 'Refunds & Cancellation', path: '/refunds-and-cancellation-policy' },
]

export const LANDING_CMS_PAGES = [
  { slug: 'employee-transportation', label: 'Employee Transportation (ETS)', path: '/employee-transportation' },
  { slug: 'rac', label: 'Corporate Car Rental (RAC)', path: '/rac' },
]

const REGISTRY = {
  home: { defaults: DEFAULT_HOME_CMS, merge: mergeHomeCms },
  'drive-for-us': { defaults: DEFAULT_DRIVE_FOR_US_CMS, merge: mergeDriveForUsCms },
  'business-commute': { defaults: DEFAULT_BUSINESS_COMMUTE_CMS, merge: mergeBusinessCommuteCms },
  'employee-transportation': { defaults: DEFAULT_ETS_LANDING_CMS, merge: mergeEtsLandingCms },
  rac: { defaults: DEFAULT_RAC_LANDING_CMS, merge: mergeRacLandingCms },
  'terms-and-conditions': { defaults: DEFAULT_TERMS_CMS, merge: (d) => mergeLegalPageCms(DEFAULT_TERMS_CMS, d) },
  'privacy-policy': { defaults: DEFAULT_PRIVACY_CMS, merge: (d) => mergeLegalPageCms(DEFAULT_PRIVACY_CMS, d) },
  'refunds-and-cancellation-policy': { defaults: DEFAULT_REFUNDS_CMS, merge: (d) => mergeLegalPageCms(DEFAULT_REFUNDS_CMS, d) },
}

export function getCmsDefaults(slug) {
  return REGISTRY[slug]?.defaults || DEFAULT_HOME_CMS
}

export function mergeCmsPage(slug, apiData) {
  const entry = REGISTRY[slug]
  if (!entry) return mergeHomeCms(apiData)
  return entry.merge(apiData)
}
