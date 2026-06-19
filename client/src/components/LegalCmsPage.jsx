import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useCmsPage } from '../hooks/useCmsPage'
import { getCmsDefaults } from '../constants/cmsPageRegistry'

const HERO_TITLE_STYLE = {
  fontFamily: '"Poppins", Sans-serif',
  fontSize: '56px',
  fontWeight: 700,
  color: '#FFFFFF',
  lineHeight: '1.2em',
  margin: '0 0 20px 0',
  textAlign: 'center',
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
}

/**
 * Shared layout for legal/policy CMS pages (hero + HTML body).
 */
export default function LegalCmsPage({
  slug,
  siteClass,
  elementorClass,
  bodyClass,
  heroSectionClass,
  contentSectionClass,
  contentWrapperClass,
  contentInnerClass,
}) {
  const cms = useCmsPage(slug)
  const defaults = getCmsDefaults(slug)
  const hero = { ...defaults.sections.hero, ...cms.sections?.hero }
  const bodyHtml = cms.sections?.body?.html || defaults.sections?.body?.html || ''

  useEffect(() => {
    document.body.className = bodyClass
    document.body.setAttribute('data-spy', 'scroll')
    document.body.setAttribute('data-offset', '80')
    return () => {
      document.body.className = ''
      document.body.removeAttribute('data-spy')
      document.body.removeAttribute('data-offset')
    }
  }, [bodyClass])

  return (
    <div id="page" className={`site ${siteClass}`}>
      <a className="skip-link screen-reader-text" href="#content"></a>
      <Header />
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <article className={`enerzee-panel page type-page status-publish hentry ${siteClass}`}>
                <div className="panel-content">
                  <div className="container">
                    <div className="sf-content">
                      <div data-elementor-type="wp-page" className={`elementor ${elementorClass}`}>
                        <section
                          data-particle_enable="false"
                          data-particle-mobile-disabled="false"
                          className={`elementor-section elementor-top-section elementor-section-height-min-height elementor-section-stretched elementor-section-full_width elementor-section-items-center elementor-section-height-default ${heroSectionClass}`}
                          data-element_type="section"
                          data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
                          fetchPriority="high"
                          style={{
                            backgroundImage: `url('${hero.backgroundImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            minHeight: '350px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            position: 'relative',
                            width: '100vw',
                            maxWidth: '100vw',
                            marginLeft: 'calc(-50vw + 50%)',
                            marginRight: 'calc(-50vw + 50%)',
                            left: 0,
                            right: 0,
                            paddingTop: 0,
                            paddingBottom: '60px',
                          }}
                        >
                          <div
                            className="elementor-background-overlay"
                            style={{
                              backgroundColor: '#000000',
                              opacity: 0.6,
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              zIndex: 1,
                            }}
                          />
                          <div
                            className="elementor-container elementor-column-gap-default"
                            style={{
                              position: 'relative',
                              zIndex: 2,
                              maxWidth: '1200px',
                              margin: '0 auto',
                              padding: '90px 15px 0 15px',
                              width: '100%',
                              boxSizing: 'border-box',
                            }}
                          >
                            <div className="elementor-column elementor-col-100 elementor-top-column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-widget elementor-widget-heading">
                                  <div className="elementor-widget-container">
                                    <h1 className="elementor-heading-title elementor-size-default" style={HERO_TITLE_STYLE}>
                                      {hero.title}
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section
                          className={`elementor-section elementor-top-section elementor-section-boxed elementor-section-height-default ${contentSectionClass}`}
                          data-element_type="section"
                        >
                          <div
                            className="elementor-container elementor-column-gap-default"
                            style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' }}
                          >
                            <div className="elementor-column elementor-col-100 elementor-top-column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-widget elementor-widget-text-editor">
                                  <div className={`elementor-widget-container ${contentWrapperClass}`.trim()}>
                                    {contentInnerClass ? (
                                      <div
                                        className={contentInnerClass}
                                        dangerouslySetInnerHTML={{ __html: bodyHtml }}
                                      />
                                    ) : (
                                      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
