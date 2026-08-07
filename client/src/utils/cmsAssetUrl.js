import { API_BASE_URL } from '../constants/api'

/** Resolve CMS image paths (uploads, wp-content, absolute URLs) for use in src/background. */
export function resolveCmsAssetUrl(url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('/uploads/')) return `${API_BASE_URL}${url}`
  return url
}

export function getHeroBackgroundStyle(imageUrl) {
  if (!imageUrl) return undefined
  const url = resolveCmsAssetUrl(imageUrl)
  return {
    background: `linear-gradient(120deg, rgba(255, 249, 248, 0.97) 0%, rgba(255, 255, 255, 0.88) 55%, rgba(255, 249, 248, 0.7) 100%), url('${url}') center right / cover no-repeat`,
  }
}

export function getFinalBackgroundStyle(imageUrl) {
  // Keep form side soft; pin photo to the right so car + person stay in the open area.
  const gradient =
    'linear-gradient(90deg, #fff9f8 0%, #fff9f8 28%, rgba(255, 249, 248, 0.55) 42%, rgba(255, 255, 255, 0.12) 58%, rgba(255, 255, 255, 0) 72%)'
  if (!imageUrl) {
    return { background: gradient }
  }
  const url = resolveCmsAssetUrl(imageUrl)
  return {
    backgroundImage: `${gradient}, url('${url}')`,
    backgroundPosition: 'center, right center',
    backgroundSize: '100% 100%, auto 100%',
    backgroundRepeat: 'no-repeat',
  }
}
