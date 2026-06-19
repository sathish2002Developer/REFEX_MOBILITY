import { useEffect, useState } from 'react'
import { getCmsDefaults, mergeCmsPage } from '../constants/cmsPageRegistry'
import { setPageMetaDescription } from '../utils/pageMeta'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export function useCmsPage(slug, { setTitle = true, setMeta = true, heroStyleId = null } = {}) {
  const [cms, setCms] = useState(() => getCmsDefaults(slug))

  useEffect(() => {
    const load = async () => {
      try {
        const base = API_BASE_URL || window.location.origin
        const res = await fetch(`${base}/api/cms/pages/${slug}`)
        if (res.ok) {
          const result = await res.json()
          if (result.success && result.data) {
            setCms(mergeCmsPage(slug, result.data))
          }
        }
      } catch (e) {
        console.warn(`CMS load failed for ${slug}`, e)
      }
    }
    load()
  }, [slug])

  useEffect(() => {
    if (!setMeta && !setTitle) return
    if (setMeta) setPageMetaDescription(cms.metaDescription)
    if (setTitle && cms.pageTitle) document.title = cms.pageTitle
  }, [cms.metaDescription, cms.pageTitle, setMeta, setTitle])

  useEffect(() => {
    if (!heroStyleId) return
    const bg = cms.sections?.hero?.backgroundImage
    const el = document.getElementById(heroStyleId)
    if (!el || !bg) return
    el.textContent = el.textContent.replace(/url\('[^']+'\)/g, `url('${bg}')`)
  }, [cms.sections?.hero?.backgroundImage, heroStyleId])

  return cms
}
