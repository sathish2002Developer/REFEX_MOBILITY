import { useEffect, useLayoutEffect, useState } from 'react'
import { getCmsDefaults, mergeCmsPage } from '../constants/cmsPageRegistry'
import { applyPageMeta } from '../constants/pageMeta'
import { API_BASE_URL } from '../constants/api'

export function useCmsPage(slug, { setTitle = true, setMeta = true, heroStyleId = null } = {}) {
  const [cms, setCms] = useState(() => getCmsDefaults(slug))

  useLayoutEffect(() => {
    const defaults = getCmsDefaults(slug)
    applyPageMeta({
      pageTitle: setTitle ? defaults.pageTitle : undefined,
      metaDescription: setMeta ? defaults.metaDescription : undefined,
    })
  }, [slug, setMeta, setTitle])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/cms/pages/${slug}`)
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

  useLayoutEffect(() => {
    if (!setMeta && !setTitle) return
    applyPageMeta({
      pageTitle: setTitle ? cms.pageTitle : undefined,
      metaDescription: setMeta ? cms.metaDescription : undefined,
    })
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
