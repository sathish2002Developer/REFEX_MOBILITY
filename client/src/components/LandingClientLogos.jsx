import React, { useEffect, useMemo, useRef } from 'react'
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

/**
 * Business Commute–style client logo Swiper for ETS / CorporateRentals.
 */
export default function LandingClientLogos({ titlePrefix, titleHighlight, items = [] }) {
  const swiperRef = useRef(null)
  const logos = useMemo(
    () => (items || []).filter((logo) => logo?.image),
    // Stabilize on content, not array identity (CMS merge recreates arrays each render)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify((items || []).map((l) => [l?.name, l?.image]))]
  )

  useEffect(() => {
    if (!logos.length) return undefined

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
          spaceBetween: 15,
          speed: 500,
          autoplay: {
            delay: 1000,
            disableOnInteraction: false,
          },
          loop: true,
          watchOverflow: true,
          breakpoints: {
            1920: { slidesPerView: 5, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 8 },
            480: { slidesPerView: 3, spaceBetween: 6 },
            0: { slidesPerView: 2, spaceBetween: 6 },
          },
        })
      } catch {
        if (!cancelled) {
          retryTimer = window.setTimeout(init, 400)
        }
      }
    }

    // Wait a frame so the ref + slides are in the DOM
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
  }, [logos])

  if (!logos.length) return null

  return (
    <section className="ets-logos landing-client-logos" aria-label="Trusted by clients">
      <div className="ets-container">
        <p className="ets-logos__title">
          {titlePrefix} <strong>{titleHighlight}</strong>
        </p>
      </div>
      <div className="landing-client-logos__swiper-wrap">
        <div
          ref={swiperRef}
          className="swiper landing-client-logos-swiper client-logos-swiper"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client logos"
        >
          <div className="swiper-wrapper">
            {logos.map((logo, index) => (
              <div
                className="swiper-slide"
                key={`${logo.name}-${index}`}
                role="group"
                aria-roledescription="slide"
              >
                <div
                  className="landing-client-logos__image elementor-carousel-image"
                  role="img"
                  aria-label={logo.name}
                  style={{ backgroundImage: `url(${resolveCmsAssetUrl(logo.image)})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
