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
  const gradient =
    'linear-gradient(105deg, rgba(255, 249, 248, 0.88) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.15) 55%, rgba(255, 255, 255, 0) 70%)'
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
