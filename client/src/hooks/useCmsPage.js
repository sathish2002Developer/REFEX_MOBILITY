import { useEffect, useLayoutEffect, useState } from 'react'
import { getCmsDefaults, mergeCmsPage } from '../constants/cmsPageRegistry'
import { applyPageMeta } from '../constants/pageMeta'
import { API_BASE_URL } from '../constants/api'

const cacheKey = (slug) => `cms-page-cache:${slug}`

function readCachedCms(slug) {
  try {
    const raw = sessionStorage.getItem(cacheKey(slug))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.sections) return null
    return parsed
  } catch {
    return null
  }
}

function writeCachedCms(slug, cms) {
  try {
    sessionStorage.setItem(
      cacheKey(slug),
      JSON.stringify({
        pageTitle: cms.pageTitle,
        metaDescription: cms.metaDescription,
        sections: cms.sections,
      })
    )
  } catch {
    /* ignore quota / private mode */
  }
}

function getInitialCms(slug) {
  const cached = readCachedCms(slug)
  if (cached) return mergeCmsPage(slug, cached)

  // Show text sections immediately (Problem/Fix, hero, etc.).
  // Keep logos empty until CMS returns so removed logos cannot flash back.
  const defaults = getCmsDefaults(slug)
  return {
    pageTitle: defaults.pageTitle,
    metaDescription: defaults.metaDescription,
    sections: {
      ...defaults.sections,
      logos: defaults.sections.logos
        ? { ...defaults.sections.logos, items: [] }
        : defaults.sections.logos,
    },
  }
}

export function useCmsPage(slug, { setTitle = true, setMeta = true, heroStyleId = null } = {}) {
  const [cms, setCms] = useState(() => getInitialCms(slug))

  useLayoutEffect(() => {
    const initial = getInitialCms(slug)
    setCms(initial)
    applyPageMeta({
      pageTitle: setTitle ? initial.pageTitle : undefined,
      metaDescription: setMeta ? initial.metaDescription : undefined,
    })
  }, [slug, setMeta, setTitle])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/cms/pages/${slug}`)
        if (!res.ok) return
        const result = await res.json()
        if (cancelled || !result.success || !result.data) return
        const merged = mergeCmsPage(slug, result.data)
        setCms(merged)
        writeCachedCms(slug, merged)
      } catch (e) {
        console.warn(`CMS load failed for ${slug}`, e)
      }
    }
    load()
    return () => {
      cancelled = true
    }
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
