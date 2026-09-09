import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCmsPage } from '../hooks/useCmsPage'
import { applyPageMeta } from '../constants/pageMeta'
import { resolveCmsAssetUrl } from '../utils/cmsAssetUrl'
import { resolveLeadershipImage } from '../constants/leadershipImages'
import { resolveBrandValueIcon } from '../constants/brandValueIcons'
import './AboutUs.css'

function getInitials(name = '') {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

const AboutUs = () => {
  const cms = useCmsPage('about-us')
  const { hero, intro, brandValues, brandGoals, leadership } = cms.sections
  const [selectedLeader, setSelectedLeader] = useState(null)
  const [brokenImages, setBrokenImages] = useState({})

  useEffect(() => {
    document.body.className =
      'page-template-default page page-about-us elementor-default elementor-kit-6330 elementor-page elementor-page-about-us'
    applyPageMeta({
      pageTitle: cms.pageTitle,
      metaDescription: cms.metaDescription,
    })
    return () => {
      document.body.className = ''
    }
  }, [cms.pageTitle, cms.metaDescription])

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    })
    AOS.refresh()
  }, [hero, intro, brandValues, brandGoals, leadership])

  useEffect(() => {
    if (!selectedLeader) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedLeader(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedLeader])

  const leaders = leadership?.items || []

  return (
    <div id="page" className="site about-us-page">
      <a className="skip-link screen-reader-text" href="#content">
        Skip to content
      </a>
      <Header />
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <main id="main" className="site-main">
            <section
              className="about-us-hero"
              style={{
                backgroundImage: `url('${resolveCmsAssetUrl(
                  hero?.backgroundImage || '/wp-content/uploads/2025/07/bussiness-banner-1-scaled.webp'
                )}')`,
              }}
            >
              <div className="about-us-hero__overlay" aria-hidden="true" />
              <div className="about-us-hero__content">
                <h1 data-aos="fade-up">{hero?.title || 'About Us'}</h1>
                
              </div>
            </section>

            <section className="about-us-intro">
              <div className="about-us-container">
                <h2 className="about-us-section-title" data-aos="fade-up">
                  {intro?.titlePrefix || 'About'}{' '}
                  <span>{intro?.titleHighlight || 'Refex Mobility'}</span>
                </h2>
                <div className="about-us-intro__copy">
                  {(intro?.paragraphs || []).map((paragraph, index) => (
                    <p
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={100 + index * 100}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section className="about-us-values">
              <div className="about-us-container">
                <div className="about-us-values__heading" data-aos="fade-up">
                  <p className="about-us-values__eyebrow">What we stand for</p>
                  <h2 className="about-us-section-title about-us-section-title--center">
                    {brandValues?.titlePrefix || 'Brand'}{' '}
                    <span>{brandValues?.titleHighlight || 'Values'}</span>
                  </h2>
                </div>
                <div className="about-us-values__grid">
                  {(brandValues?.items || []).map((item, index) => {
                    const iconSrc = resolveBrandValueIcon(item, index)
                    return (
                      <article
                        key={item.label || item.order}
                        className="about-us-value-card"
                        data-aos="fade-up"
                        data-aos-delay={index * 120}
                      >
                        <div className="about-us-value-card__icon">
                          {iconSrc ? (
                            <img src={iconSrc} alt="" />
                          ) : (
                            <i className={`fas ${item.icon || 'fa-check'}`} aria-hidden="true" />
                          )}
                        </div>
                        <h3>{item.label}</h3>
                        {item.description ? <p>{item.description}</p> : null}
                      </article>
                    )
                  })}
                </div>
              </div>
            </section>

            <section className="about-us-goals">
              <div className="about-us-container">
                <div className="about-us-goals__heading" data-aos="fade-up">
                  <h2 className="about-us-section-title about-us-section-title--center">
                    {brandGoals?.titlePrefix || 'Brand'}{' '}
                    <span>{brandGoals?.titleHighlight || 'Goals'}</span>
                  </h2>
                </div>
                <div className="about-us-goals__list">
                  {(brandGoals?.items || []).map((item, index) => (
                    <article
                      key={item.label || item.order}
                      className="about-us-goal-card"
                      data-aos="fade-up"
                      data-aos-delay={index * 120}
                    >
                      <div className="about-us-goal-card__icon" aria-hidden="true">
                        <i className={`fas ${item.icon || 'fa-flag'}`} />
                      </div>
                      <div className="about-us-goal-card__body">
                        <h3>{item.label}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="about-us-leadership">
              <div className="about-us-container">
                <div className="about-us-leadership__heading" data-aos="fade-up">
                  <p className="about-us-leadership__eyebrow">The people behind the rides</p>
                  <h2 className="about-us-section-title about-us-section-title--center">
                    {leadership?.titlePrefix || 'Leadership'}{' '}
                    <span>{leadership?.titleHighlight || 'Team'}</span>
                  </h2>
                </div>
                <div className="about-us-leadership__grid">
                  {leaders.map((leader, index) => {
                    const imageSrc = resolveCmsAssetUrl(resolveLeadershipImage(leader))
                    const showImage = Boolean(imageSrc) && !brokenImages[leader.name]
                    return (
                      <article
                        key={leader.name || index}
                        className="about-us-leader-card"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <div className="about-us-leader-card__inner">
                          <div className="about-us-leader-card__photo-ring">
                            <div className="about-us-leader-card__photo">
                              {showImage ? (
                                <img
                                  src={imageSrc}
                                  alt={leader.name}
                                  loading="lazy"
                                  onError={() =>
                                    setBrokenImages((prev) => ({ ...prev, [leader.name]: true }))
                                  }
                                />
                              ) : (
                                <span className="about-us-leader-card__initials" aria-hidden="true">
                                  {getInitials(leader.name)}
                                </span>
                              )}
                            </div>
                          </div>
                          <h3>{leader.name}</h3>
                          <p className="about-us-leader-card__role">{leader.role}</p>
                          <button
                            type="button"
                            className="about-us-leader-card__more"
                            onClick={() => setSelectedLeader(leader)}
                          >
                            Read More
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />

      {selectedLeader ? (
        <div
          className="about-us-leader-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-us-leader-modal-title"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="about-us-leader-modal__panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="about-us-leader-modal__close"
              aria-label="Close bio"
              onClick={() => setSelectedLeader(null)}
            >
              ×
            </button>
            <div className="about-us-leader-modal__header">
              <div className="about-us-leader-modal__photo">
                {resolveLeadershipImage(selectedLeader) && !brokenImages[selectedLeader.name] ? (
                  <img
                    src={resolveCmsAssetUrl(resolveLeadershipImage(selectedLeader))}
                    alt={selectedLeader.name}
                    onError={() =>
                      setBrokenImages((prev) => ({ ...prev, [selectedLeader.name]: true }))
                    }
                  />
                ) : (
                  <span aria-hidden="true">{getInitials(selectedLeader.name)}</span>
                )}
              </div>
              <div>
                <h3 id="about-us-leader-modal-title">{selectedLeader.name}</h3>
                <p>{selectedLeader.role}</p>
              </div>
            </div>
            <div className="about-us-leader-modal__bio">
              {(Array.isArray(selectedLeader.bio)
                ? selectedLeader.bio
                : [selectedLeader.bio]
              )
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AboutUs
