import React, { useEffect, useMemo, useRef } from 'react'
import { resolveLandingLogoImage } from '../constants/landingClientLogosDefaults'
import { resolveCmsAssetUrl } from '../utils/cmsAssetUrl'

const SWIPER_JS = '/wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min.js'
const SWIPER_CSS = '/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.css'

function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

function ensureScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      if (window.Swiper) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      })
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.body.appendChild(script)
  })
}

function waitForSwiper(timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    if (window.Swiper) {
      resolve(window.Swiper)
      return
    }
    const started = Date.now()
    const tick = () => {
      if (window.Swiper) {
        resolve(window.Swiper)
        return
      }
      if (Date.now() - started > timeoutMs) {
        reject(new Error('Swiper not available'))
        return
      }
      window.setTimeout(tick, 50)
    }
    tick()
  })
}

/** Normalize CMS typos / aliases for display + CSS hooks */
function normalizeLogoMeta(name = '') {
  const compact = String(name).toLowerCase().replace(/[^a-z0-9]/g, '')
  if (
    compact.includes('ltimindtree') ||
    compact.includes('mindtree') ||
    compact.includes('ltmnintrr') ||
    compact.includes('ltmintree') ||
    compact.includes('ltimind') ||
    /^ltm/.test(compact)
  ) {
    return { label: 'LTIMindtree', tone: 'compact' }
  }
  if (compact.includes('samsung')) return { label: 'Samsung', tone: 'compact' }
  if (compact.includes('lemontree')) return { label: name, tone: 'compact' }
  if (compact.includes('londonstock') || compact.includes('stockexchange')) {
    return { label: name, tone: 'compact' }
  }
  // Already large / fills the canvas — never apply compact boost
  if (compact.includes('fairfield')) return { label: name, tone: 'tall' }
  if (compact.includes('flipkart')) return { label: name, tone: 'wide' }
  if (compact.includes('mindsprint')) return { label: name, tone: 'wide' }
  if (compact.includes('nestle') || compact === 'nestl') return { label: name, tone: 'tall' }
  return { label: name || 'Client logo', tone: 'default' }
}

/**
 * Detect logos with heavy transparent/white padding so we can enlarge only those.
 * Returns fill ratios of the ink bounding box vs the image canvas.
 */
function measureLogoInkFill(img) {
  try {
    const nw = img.naturalWidth
    const nh = img.naturalHeight
    if (!nw || !nh) return { area: 1, height: 1, width: 1 }

    const maxSide = 160
    const scale = Math.min(1, maxSide / Math.max(nw, nh))
    const cw = Math.max(1, Math.round(nw * scale))
    const ch = Math.max(1, Math.round(nh * scale))
    const canvas = document.createElement('canvas')
    canvas.width = cw
    canvas.height = ch
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return { area: 1, height: 1, width: 1 }

    ctx.drawImage(img, 0, 0, cw, ch)
    const { data } = ctx.getImageData(0, 0, cw, ch)

    let minX = cw
    let minY = ch
    let maxX = -1
    let maxY = -1

    for (let y = 0; y < ch; y += 1) {
      for (let x = 0; x < cw; x += 1) {
        const i = (y * cw + x) * 4
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const a = data[i + 3]
        const isInk = a > 24 && (r < 248 || g < 248 || b < 248)
        if (!isInk) continue
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }
    }

    if (maxX < 0) return { area: 1, height: 1, width: 1 }

    const fillW = (maxX - minX + 1) / cw
    const fillH = (maxY - minY + 1) / ch
    return { area: fillW * fillH, height: fillH, width: fillW }
  } catch {
    // CORS / tainted canvas — leave sizing alone
    return { area: 1, height: 1, width: 1 }
  }
}

function isPaddedTinyLogo(fill) {
  return fill.height < 0.58 || fill.width < 0.5 || fill.area < 0.3
}

function handleLogoLoad(event, tone) {
  const img = event.currentTarget
  const slot = img.closest('.landing-client-logos__slot')
  if (!slot || tone === 'tall' || tone === 'wide') return

  if (tone === 'compact') {
    slot.classList.add('tone-compact')
    return
  }

  const fill = measureLogoInkFill(img)
  if (isPaddedTinyLogo(fill)) {
    slot.classList.remove('tone-default')
    slot.classList.add('tone-compact')
  }
}

/**
 * Business Commute–style client logos with even visual scale.
 */
export default function LandingClientLogos({ titlePrefix, titleHighlight, items = [] }) {
  const swiperRef = useRef(null)
  const logos = useMemo(() => {
    const seen = new Set()
    return (items || [])
      .map((logo) => {
        const meta = normalizeLogoMeta(logo?.name)
        return {
          ...logo,
          name: meta.label,
          tone: meta.tone,
          image: resolveLandingLogoImage(logo?.name, logo?.image),
        }
      })
      .filter((logo) => {
        if (!logo?.image) return false
        const key = `${String(logo.name || '').trim().toLowerCase()}|${logo.image}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify((items || []).map((l) => [l?.name, l?.image]))])

  const slides = useMemo(() => {
    if (!logos.length) return []
    if (logos.length >= 10) return logos
    const out = []
    while (out.length < 10) {
      logos.forEach((logo) => out.push(logo))
    }
    return out
  }, [logos])

  useEffect(() => {
    if (!slides.length) return undefined

    let swiperInstance = null
    let cancelled = false
    let retryTimer = null

    const init = async () => {
      try {
        loadStylesheet(SWIPER_CSS)
        await ensureScript(SWIPER_JS)
        await waitForSwiper()
        if (cancelled || !swiperRef.current || !window.Swiper) return

        if (swiperRef.current.swiper) {
          swiperRef.current.swiper.destroy(true, true)
        }

        swiperInstance = new window.Swiper(swiperRef.current, {
          slidesPerView: 5,
          spaceBetween: 28,
          speed: 500,
          autoplay: {
            delay: 1000,
            disableOnInteraction: false,
          },
          loop: true,
          breakpoints: {
            1920: { slidesPerView: 5, spaceBetween: 32 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            480: { slidesPerView: 2, spaceBetween: 16 },
            0: { slidesPerView: 2, spaceBetween: 14 },
          },
        })
      } catch {
        if (!cancelled) {
          retryTimer = window.setTimeout(init, 400)
        }
      }
    }

    retryTimer = window.setTimeout(init, 0)

    return () => {
      cancelled = true
      if (retryTimer) window.clearTimeout(retryTimer)
      if (swiperInstance) {
        swiperInstance.destroy(true, true)
      } else if (swiperRef.current?.swiper) {
        swiperRef.current.swiper.destroy(true, true)
      }
    }
  }, [slides])

  if (!logos.length) return null

  return (
    <section className="ets-logos landing-client-logos" aria-label="Trusted by clients">
      <div className="ets-container">
        <p className="ets-logos__title">
          {titlePrefix} <strong>{titleHighlight}</strong>
        </p>
      </div>
      <div className="landing-client-logos__swiper-wrap">
        <div className="elementor-swiper">
          <div
            ref={swiperRef}
            className="elementor-main-swiper swiper landing-client-logos-swiper client-logos-swiper"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client logos"
          >
            <div className="swiper-wrapper">
              {slides.map((logo, index) => {
                const label = logo.name || `Logo ${index + 1}`
                return (
                  <div
                    className="swiper-slide"
                    key={`${label}-${index}`}
                    role="group"
                    aria-roledescription="slide"
                  >
                    <div className={`landing-client-logos__slot tone-${logo.tone || 'default'}`}>
                      <img
                        className="landing-client-logos__img"
                        src={resolveCmsAssetUrl(logo.image)}
                        alt={label}
                        loading="lazy"
                        decoding="async"
                        onLoad={(event) => handleLogoLoad(event, logo.tone || 'default')}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
