import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Home.css'

const DriveForUs = () => {
  const [openFaqs, setOpenFaqs] = useState({})

  const toggleFaq = (index) => {
    setOpenFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  useEffect(() => {
    // Add body classes from original HTML
    document.body.className = 'page-template-default page page-id-6414 page-two-column colors-light page-drive-for-us elementor-default elementor-kit-6330 elementor-page elementor-page-6414'
    document.body.setAttribute('data-spy', 'scroll')
    document.body.setAttribute('data-offset', '80')

    // Load icon fonts - try both original and CDN sources
    const iconFonts = [
      {
        id: 'ionicons-css',
        href: 'https://refexmobility.com/wp-content/cache/min/1/wp-content/themes/enerzee/assets/css/ionicons.min.css?ver=1759743467',
        fallback: 'https://cdn.jsdelivr.net/npm/ionicons@5.5.2/dist/css/ionicons.min.css',
        rel: 'stylesheet'
      },
      {
        id: 'font-awesome-css',
        href: 'https://refexmobility.com/wp-content/cache/min/1/wp-content/plugins/elementor/assets/lib/font-awesome/css/font-awesome.min.css?ver=1759743467',
        fallback: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
        rel: 'stylesheet'
      },
      {
        id: 'elementor-icons-css',
        href: 'https://refexmobility.com/wp-content/cache/min/1/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css?ver=1759743467',
        rel: 'stylesheet'
      }
    ]

    iconFonts.forEach(font => {
      if (!document.getElementById(font.id)) {
        const link = document.createElement('link')
        link.id = font.id
        link.rel = font.rel
        link.href = font.href
        link.media = 'all'
        link.crossOrigin = 'anonymous'
        
        // Add error handler to try fallback
        if (font.fallback) {
          link.onerror = () => {
            const fallbackLink = document.createElement('link')
            fallbackLink.id = font.id + '-fallback'
            fallbackLink.rel = font.rel
            fallbackLink.href = font.fallback
            fallbackLink.media = 'all'
            document.head.appendChild(fallbackLink)
          }
        }
        
        document.head.appendChild(link)
      }
    })

    // Wait for fonts to load and force icon re-render
    const waitForFonts = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Force reflow to ensure icons render
          const icons = document.querySelectorAll('.page-drive-for-us i')
          icons.forEach(icon => {
            icon.style.display = 'none'
            icon.offsetHeight // Force reflow
            icon.style.display = ''
          })
        })
      } else {
        setTimeout(() => {
          const icons = document.querySelectorAll('.page-drive-for-us i')
          icons.forEach(icon => {
            icon.style.visibility = 'hidden'
            icon.offsetHeight // Force reflow
            icon.style.visibility = 'visible'
          })
        }, 500)
      }
    }
    
    setTimeout(waitForFonts, 200)

    // Load external scripts
    const scripts = [
      'https://refexmobility.com/wp-content/themes/enerzee/assets/js/bootstrap.min.js',
      'https://refexmobility.com/wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min.js'
    ]

    scripts.forEach(src => {
      const script = document.createElement('script')
      script.src = src
      script.defer = true
      document.body.appendChild(script)
    })

    // Initialize Swiper for Why Drive For Us carousel
    const initSwiper = () => {
      if (window.Swiper) {
        const whyDriveSwiper = document.querySelector('.whychoose-sec.drive-us .elementor-main-swiper')
        if (whyDriveSwiper && !whyDriveSwiper.swiper) {
          const container = whyDriveSwiper.closest('.elementor-widget-container')
          new window.Swiper(whyDriveSwiper, {
            slidesPerView: 2,
            spaceBetween: 40,
            speed: 500,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            pagination: {
              el: container?.querySelector('.swiper-pagination'),
              clickable: true,
              type: 'bullets',
            },
            navigation: {
              nextEl: container?.querySelector('.elementor-swiper-button-next'),
              prevEl: container?.querySelector('.elementor-swiper-button-prev'),
            },
            breakpoints: {
              1024: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              }
            }
          })
        }
      } else {
        setTimeout(initSwiper, 100)
      }
    }

    // Wait for Swiper to load - try multiple times
    let attempts = 0
    const tryInit = () => {
      attempts++
      if (window.Swiper || attempts > 50) {
        initSwiper()
      } else {
        setTimeout(tryInit, 100)
      }
    }
    setTimeout(tryInit, 500)
    
    // Also try on DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSwiper)
    } else {
      initSwiper()
    }

    return () => {
      // Cleanup
      document.body.className = ''
      document.body.removeAttribute('data-spy')
      document.body.removeAttribute('data-offset')
      const inlineStyle = document.getElementById('drive-for-us-style-inline-css')
      const heroBgStyle = document.getElementById('drive-for-us-hero-bg')
      if (inlineStyle) inlineStyle.remove()
      if (heroBgStyle) heroBgStyle.remove()
      
      // Destroy Swiper instance if it exists
      const whyDriveSwiper = document.querySelector('.whychoose-sec.drive-us .elementor-main-swiper')
      if (whyDriveSwiper && whyDriveSwiper.swiper) {
        whyDriveSwiper.swiper.destroy(true, true)
      }
    }
  }, [])

  return (
    <div id="page" className="site">
      <a className="skip-link screen-reader-text" href="#content"></a>
      <Header />
     
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <div className="container">
                <article id="post-6414" className="post-6414 page type-page status-publish hentry">
                  <div className="sf-content">
                    <div data-elementor-type="wp-page" data-elementor-id="6414" className="elementor elementor-6414" data-elementor-post-type="page">
                      
                      {/* Hero Section */}
                      <section 
                        data-particle_enable="false" 
                        data-particle-mobile-disabled="false" 
                        className="elementor-section elementor-top-section elementor-element elementor-element-b485948 elementor-section-stretched elementor-section-height-min-height elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-items-middle"
                        data-id="b485948"
                        data-element_type="section"
                        data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
                        style={{
                          backgroundImage: "url('https://refexmobility.com/wp-content/uploads/2025/07/drive-section-1-scaled.webp')",
                          backgroundSize: 'cover',
                          backgroundPosition: 'center center',
                          backgroundRepeat: 'no-repeat',
                          minHeight: '600px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          position: 'relative',
                          width: '100vw',
                          maxWidth: '100%',
                          marginLeft: 'calc(-50vw + 50%)',
                          marginRight: 'calc(-50vw + 50%)',
                          left: 0,
                          right: 0,
                          paddingTop: '0',
                          paddingBottom: '100px'
                        }}
                      >
                  
                        <div className="elementor-container elementor-column-gap-default" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '90px 15px 0 15px', width: '100%', boxSizing: 'border-box' }}>
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-cb3f33f" data-id="cb3f33f" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div className="elementor-element elementor-element-c00bf29 elementor-widget__width-initial elementor-widget-tablet__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading" data-id="c00bf29" data-element_type="widget" data-widget_type="heading.default">
                                <div className="elementor-widget-container">
                                  <h2 className="elementor-heading-title elementor-size-default" style={{ color: '#FFFFFF', fontFamily: '"Poppins", Sans-serif', fontSize: '56px', fontWeight: 700, lineHeight: '1.2em' }}>
                                    Power Your Earnings - Drive Smart
                                  </h2>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-a11fdc0 elementor-widget__width-initial elementor-widget elementor-widget-text-editor" data-id="a11fdc0" data-element_type="widget" data-widget_type="text-editor.default">
                                <div className="elementor-widget-container" style={{ color: '#FFFFFF', fontFamily: '"Poppins", Sans-serif', fontSize: '20px', fontWeight: 400, lineHeight: '1.6em' }}>
                                  <p style={{ color: '#FFFFFF' }}>We provide the car. You bring the skill. Join us as a professional driver and start earning with our all-electric fleet.</p>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-ed3826a elementor-mobile-align-left elementor-hidden-mobile elementor-widget elementor-widget-button" data-id="ed3826a" data-element_type="widget" data-widget_type="button.default">
                                <div className="elementor-widget-container">
                                  <div className="elementor-button-wrapper">
                                    <a className="elementor-button elementor-button-link elementor-size-sm" href="#join-form" style={{
                                      backgroundColor: '#F4553B',
                                      fontFamily: '"Poppins", Sans-serif',
                                      fontSize: '18px',
                                      fontWeight: 600,
                                      color: '#FFFFFF',
                                      borderRadius: '50px',
                                      padding: '15px 40px',
                                      textDecoration: 'none',
                                      display: 'inline-block',
                                      transition: 'all 0.3s ease'
                                    }}>
                                      <span className="elementor-button-content-wrapper">
                                        <span className="elementor-button-text">Get Started</span>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-9a17849 elementor-mobile-align-left elementor-hidden-desktop elementor-hidden-laptop elementor-hidden-tablet elementor-widget elementor-widget-button" data-id="9a17849" data-element_type="widget" data-widget_type="button.default">
                                <div className="elementor-widget-container">
                                  <div className="elementor-button-wrapper">
                                    <a className="elementor-button elementor-button-link elementor-size-sm" href="#join-forms" style={{
                                      backgroundColor: '#F4553B',
                                      fontFamily: '"Poppins", Sans-serif',
                                      fontSize: '18px',
                                      fontWeight: 600,
                                      color: '#FFFFFF',
                                      borderRadius: '50px',
                                      padding: '15px 40px',
                                      textDecoration: 'none',
                                      display: 'inline-block',
                                      transition: 'all 0.3s ease'
                                    }}>
                                      <span className="elementor-button-content-wrapper">
                                        <span className="elementor-button-text">Get Started</span>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Why Drive For Us Section */}
                      <section 
                        data-particle_enable="false" 
                        data-particle-mobile-disabled="false" 
                        className="elementor-section elementor-top-section elementor-element elementor-element-d1b05c3 whychoose-sec drive-us elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="d1b05c3"
                        data-element_type="section"
                      >
                        <div className="elementor-container elementor-column-gap-default">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-01f0ea9" data-id="01f0ea9" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div className="elementor-element elementor-element-85ebe70 elementor-widget__width-initial elementor-widget elementor-widget-image-box" data-id="85ebe70" data-element_type="widget" data-widget_type="image-box.default">
                                <div className="elementor-widget-container">
                                  <div className="elementor-image-box-wrapper">
                                    <div className="elementor-image-box-content">
                                      <h3 className="elementor-image-box-title">
                                        Why <span style={{color: '#F4553B'}}>Drive For Us ?</span>
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div 
                                className="elementor-element elementor-element-d4e5211 elementor-testimonial--layout-image_above elementor-testimonial--skin-default elementor-testimonial--align-center elementor-arrows-yes elementor-pagination-type-bullets elementor-widget elementor-widget-testimonial-carousel" 
                                data-id="d4e5211" 
                                data-element_type="widget" 
                                data-settings='{"slides_per_view":"2","space_between":{"unit":"px","size":40,"sizes":[]},"autoplay_speed":3000,"slides_per_view_tablet":"2","space_between_tablet":{"unit":"px","size":30,"sizes":[]},"show_arrows":"yes","pagination":"bullets","speed":500,"autoplay":"yes","pause_on_hover":"yes","pause_on_interaction":"yes","space_between_laptop":{"unit":"px","size":10,"sizes":[]},"space_between_mobile":{"unit":"px","size":10,"sizes":[]}}'
                                data-widget_type="testimonial-carousel.default"
                              >
                                <div className="elementor-widget-container">
                                  <div className="elementor-swiper">
                                    <div className="elementor-main-swiper swiper" role="region" aria-roledescription="carousel" aria-label="Slides">
                                      <div className="swiper-wrapper">
                                        <div className="swiper-slide" role="group" aria-roledescription="slide">
                                          <div className="elementor-testimonial">
                                            <div className="elementor-testimonial__content">
                                              <div className="elementor-testimonial__text">
                                                Zero Ownership<br />Cost
                                              </div>
                                              <cite className="elementor-testimonial__cite">
                                                <span className="elementor-testimonial__title">No need to buy or rent. Drive our fully maintained electric vehicles.</span>
                                              </cite>
                                            </div>
                                            <div className="elementor-testimonial__footer">
                                              <div className="elementor-testimonial__image">
                                                <img 
                                                  width="196" 
                                                  height="196" 
                                                  decoding="async" 
                                                  src="https://refexmobility.com/wp-content/uploads/2025/07/zero-ownership.png" 
                                                  alt="Zero Ownership Cost"
                                                  loading="lazy"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="swiper-slide" role="group" aria-roledescription="slide">
                                          <div className="elementor-testimonial">
                                            <div className="elementor-testimonial__content">
                                              <div className="elementor-testimonial__text">
                                                Guaranteed Earnings + <span style={{color: '#F4553B'}}>Incentivest</span>
                                              </div>
                                              <cite className="elementor-testimonial__cite">
                                                <span className="elementor-testimonial__title">Earn weekly or monthly payouts with performance bonuses and rewards.</span>
                                              </cite>
                                            </div>
                                            <div className="elementor-testimonial__footer">
                                              <div className="elementor-testimonial__image">
                                                <img 
                                                  width="196" 
                                                  height="196" 
                                                  decoding="async" 
                                                  src="https://refexmobility.com/wp-content/uploads/2025/07/earning-incentive.png" 
                                                  alt="Guaranteed Earnings + Incentives"
                                                  loading="lazy"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="swiper-slide" role="group" aria-roledescription="slide">
                                          <div className="elementor-testimonial">
                                            <div className="elementor-testimonial__content">
                                              <div className="elementor-testimonial__text">
                                                App-Based Ride Assignments
                                              </div>
                                              <cite className="elementor-testimonial__cite">
                                                <span className="elementor-testimonial__title">Easy-to-use driver app with trip details, navigation, and payments.</span>
                                              </cite>
                                            </div>
                                            <div className="elementor-testimonial__footer">
                                              <div className="elementor-testimonial__image">
                                                <img 
                                                  width="196" 
                                                  height="196" 
                                                  decoding="async" 
                                                  src="https://refexmobility.com/wp-content/uploads/2025/07/ride-assignmentes.png" 
                                                  alt="App-Based Ride Assignments"
                                                  loading="lazy"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="swiper-slide" role="group" aria-roledescription="slide">
                                          <div className="elementor-testimonial">
                                            <div className="elementor-testimonial__content">
                                              <div className="elementor-testimonial__text">
                                                Reliable Support. Anytime.
                                              </div>
                                              <cite className="elementor-testimonial__cite">
                                                <span className="elementor-testimonial__title">We handle the vehicle upkeep. You focus on driving.</span>
                                              </cite>
                                            </div>
                                            <div className="elementor-testimonial__footer">
                                              <div className="elementor-testimonial__image">
                                                <img 
                                                  width="196" 
                                                  height="196" 
                                                  decoding="async" 
                                                  src="https://refexmobility.com/wp-content/uploads/2025/07/support.png" 
                                                  alt="Reliable Support. Anytime."
                                                  loading="lazy"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-swiper-button elementor-swiper-button-prev" role="button" tabIndex="0" aria-label="Previous">
                                        <i aria-hidden="true" className="eicon-chevron-left"></i>
                                      </div>
                                      <div className="elementor-swiper-button elementor-swiper-button-next" role="button" tabIndex="0" aria-label="Next">
                                        <i aria-hidden="true" className="eicon-chevron-right"></i>
                                      </div>
                                      <div className="swiper-pagination"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* How to Get Started Section - Desktop */}
                      <section 
                        data-particle_enable="false" 
                        data-particle-mobile-disabled="false" 
                        className="elementor-section elementor-top-section elementor-element elementor-element-4e2da43 get-started elementor-hidden-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="4e2da43"
                        data-element_type="section"
                        data-settings='{"background_background":"classic"}'
                        style={{
                          backgroundColor: '#FFF9F8',
                          background: '#FFF9F8',
                          borderRadius: '48px'
                        }}
                      >
                        <div className="elementor-container elementor-column-gap-default">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a560985" data-id="a560985" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <section 
                                data-particle_enable="false" 
                                data-particle-mobile-disabled="false" 
                                className="elementor-section elementor-inner-section elementor-element elementor-element-f771643 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                data-id="f771643"
                                data-element_type="section"
                              >
                                <div className="elementor-container elementor-column-gap-wide">
                                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-485cb03" data-id="485cb03" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <div className="elementor-element elementor-element-227e12f elementor-widget elementor-widget-image" data-id="227e12f" data-element_type="widget" data-widget_type="image.default">
                                        <div className="elementor-widget-container">
                                          <img 
                                            width="490" 
                                            height="610" 
                                            decoding="async" 
                                            src="https://refexmobility.com/wp-content/uploads/elementor/thumbs/Happy-Driver-r8qhaxxfltwntgv5ciruby6j2r5o2jhwx8sob46slw.png" 
                                            title="Happy Driver" 
                                            alt="Happy Driver" 
                                            loading="lazy"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-column elementor-inner-column elementor-element elementor-element-ee225d0" data-id="ee225d0" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <div className="elementor-element elementor-element-3d59c79 elementor-widget elementor-widget-image-box" data-id="3d59c79" data-element_type="widget" data-widget_type="image-box.default">
                                        <div className="elementor-widget-container">
                                          <div className="elementor-image-box-wrapper">
                                            <div className="elementor-image-box-content">
                                              <h3 className="elementor-image-box-title">
                                                How to <span style={{color: '#F4553B'}}>Get Started </span>
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-2cef8ef elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="2cef8ef"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column  elementor-inner-column elementor-element elementor-element-db9c8db" data-id="db9c8db" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-d08a723 number-sec elementor-widget elementor-widget-text-editor" data-id="d08a723" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>1</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-9202232" data-id="9202232" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-f1ef916 elementor-widget elementor-widget-image-box" data-id="f1ef916" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Apply Online</h3>
                                                      <p className="elementor-image-box-description">Submit your basic details through our form.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-494158e elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="494158e"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column  elementor-inner-column elementor-element elementor-element-333c1ab" data-id="333c1ab" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-284df2a number-sec elementor-widget elementor-widget-text-editor" data-id="284df2a" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>2</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-a4626f7" data-id="a4626f7" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-909ae83 elementor-widget elementor-widget-image-box" data-id="909ae83" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Get a Call from Our Team</h3>
                                                      <p className="elementor-image-box-description">We'll reach out to guide you through the next steps.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-89b0148 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="89b0148"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column  elementor-inner-column elementor-element elementor-element-b3d0c2c" data-id="b3d0c2c" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-d2b023d number-sec elementor-widget elementor-widget-text-editor" data-id="d2b023d" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>3</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-d76c196" data-id="d76c196" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-53bbc2a elementor-widget elementor-widget-image-box" data-id="53bbc2a" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Attend an Interview</h3>
                                                      <p className="elementor-image-box-description">Understand the process and ask us anything.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-cbc34a1 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="cbc34a1"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column  elementor-inner-column elementor-element elementor-element-62ab4a7" data-id="62ab4a7" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-c4e1cad number-sec elementor-widget elementor-widget-text-editor" data-id="c4e1cad" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>4</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-a1d44a0" data-id="a1d44a0" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-f6d9652 elementor-widget elementor-widget-image-box" data-id="f6d9652" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Submit Your Documents</h3>
                                                      <p className="elementor-image-box-description">Provide the required paperwork for verification.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-9d6811a elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="9d6811a"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column  elementor-inner-column elementor-element elementor-element-a5b079f" data-id="a5b079f" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-b53add1 number-sec elementor-widget elementor-widget-text-editor" data-id="b53add1" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>5</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-554a6e8" data-id="554a6e8" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-fe854a3 elementor-widget elementor-widget-image-box" data-id="fe854a3" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Training & Onboarding</h3>
                                                      <p className="elementor-image-box-description">Learn our system, customer service & how to use the app.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-d671613 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="d671613"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-inner-column elementor-element elementor-element-e27c1d0" data-id="e27c1d0" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-b32d270 number-sec elementor-widget elementor-widget-text-editor" data-id="b32d270" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>6</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-26d890e" data-id="26d890e" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-e78168e elementor-widget elementor-widget-image-box" data-id="e78168e" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Start Driving</h3>
                                                      <p className="elementor-image-box-description">Get assigned a company vehicle and start earning.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Ready to Join Section - Desktop */}
                      <section 
                        data-particle_enable="false" 
                        data-particle-mobile-disabled="false" 
                        className="elementor-section elementor-top-section elementor-element elementor-element-3ceeb1d elementor-hidden-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="3ceeb1d"
                        data-element_type="section"
                        id="join-form"
                      >
                        <div className="elementor-container elementor-column-gap-default">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-efc04fb" data-id="efc04fb" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <section 
                                data-particle_enable="false" 
                                data-particle-mobile-disabled="false" 
                                className="elementor-section elementor-inner-section elementor-element elementor-element-6a0ffb7 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                data-id="6a0ffb7"
                                data-element_type="section"
                              >
                                <div className="elementor-container elementor-column-gap-wider">
                                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-3bd2997" data-id="3bd2997" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <div className="elementor-element elementor-element-8fb221b elementor-widget__width-initial elementor-widget-tablet__width-initial ready-joins elementor-widget elementor-widget-image-box" data-id="8fb221b" data-element_type="widget" data-widget_type="image-box.default">
                                        <div className="elementor-widget-container">
                                          <div className="elementor-image-box-wrapper">
                                            <div className="elementor-image-box-content">
                                              <h3 className="elementor-image-box-title">
                                                Ready to <span style={{color: '#F4553B'}}> Join?</span>
                                              </h3>
                                              <p className="elementor-image-box-description">
                                                No need to buy or maintain a car - we will provide you the car. Enjoy steady income, flexible hours, and full support. No EMI. No hassle. Just drive and earn.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-b33dd0e join-no elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="b33dd0e"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-84f80bf" data-id="84f80bf" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-call-to-join-cta elementor-widget elementor-widget-html" data-id="call-to-join-cta" data-element_type="widget" data-widget_type="html.default">
                                                <div className="elementor-widget-container">
                                                  <div className="call-to-join-box" style={{
                                                    borderRadius: '15px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 4px 15px rgba(244, 85, 59, 0.15)'
                                                  }}>
                                                    {/* Top Section - Orange Background */}
                                                    <div style={{
                                                      backgroundColor: '#F4553B',
                                                      padding: '20px 30px',
                                                      textAlign: 'center'
                                                    }}>
                                                      <h2 style={{
                                                        fontFamily: '"Poppins", Sans-serif',
                                                        fontSize: '20px',
                                                        fontWeight: 600,
                                                        color: '#FFFFFF',
                                                        margin: 0
                                                      }}>
                                                        Call to Join
                                                      </h2>
                                                    </div>
                                                    {/* Bottom Section - White Background */}
                                                    <div style={{
                                                      backgroundColor: '#FFFFFF',
                                                      padding: '25px 30px',
                                                      border: '1px solid rgba(244, 85, 59, 0.2)',
                                                      borderTop: 'none',
                                                      borderRadius: '0 0 15px 15px',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      gap: '16px'
                                                    }}>
                                                      <a href="tel:7418299987" style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px',
                                                        textDecoration: 'none'
                                                      }}>
                                                        <i className="fas fa-phone-alt" style={{
                                                          fontSize: '36px',
                                                          color: '#F4553B'
                                                        }}></i>
                                                        <span style={{
                                                          fontFamily: '"Poppins", Sans-serif',
                                                          fontSize: '48px',
                                                          fontWeight: 700,
                                                          color: '#F4553B',
                                                          letterSpacing: '1px'
                                                        }}>
                                                          7418299987
                                                        </span>
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                  </div>
                                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-76db20b" data-id="76db20b" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <div className="elementor-element elementor-element-a525162 elementor-widget elementor-widget-image" data-id="a525162" data-element_type="widget" data-widget_type="image.default">
                                        <div className="elementor-widget-container">
                                          <img 
                                            fetchPriority="high" 
                                            decoding="async" 
                                            width="1152" 
                                            height="910" 
                                            src="https://refexmobility.com/wp-content/uploads/2025/07/Driver-key-1.png" 
                                            className="attachment-full size-full wp-image-8417" 
                                            alt="" 
                                            loading="lazy"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* How to Get Started Section - Mobile */}
                      <section 
                        data-particle_enable="false" 
                        data-particle-mobile-disabled="false" 
                        className="elementor-section elementor-top-section elementor-element elementor-element-f92cf14 get-started elementor-section-stretched elementor-hidden-desktop elementor-hidden-laptop elementor-hidden-tablet elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="f92cf14"
                        data-element_type="section"
                        data-settings='{"background_background":"classic","stretch_section":"section-stretched"}'
                        style={{
                          backgroundColor: '#FFF9F8',
                          marginBottom: '30px !important',
                          background: '#FFF9F8'
                        }}
                      >
                        <div className="elementor-container elementor-column-gap-default">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-265cfd9" data-id="265cfd9" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <section 
                                data-particle_enable="false" 
                                data-particle-mobile-disabled="false" 
                                className="elementor-section elementor-inner-section elementor-element elementor-element-fef5a44 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                data-id="fef5a44"
                                data-element_type="section"
                              >
                                <div className="elementor-container elementor-column-gap-wide">
                                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-f8f22de" data-id="f8f22de" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <div className="elementor-element elementor-element-1ed8b02 elementor-widget elementor-widget-image-box" data-id="1ed8b02" data-element_type="widget" data-widget_type="image-box.default">
                                        <div className="elementor-widget-container">
                                          <div className="elementor-image-box-wrapper">
                                            <div className="elementor-image-box-content">
                                              <h3 className="elementor-image-box-title">
                                                How to <span style={{color: '#F4553B'}}>Get Started </span>
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-6c1b3d1 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="6c1b3d1"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-0973c2f" data-id="0973c2f" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-fa4e053 number-sec elementor-widget elementor-widget-text-editor" data-id="fa4e053" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>1</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-d571da4" data-id="d571da4" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-cd2e69c elementor-widget elementor-widget-image-box" data-id="cd2e69c" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Apply Online</h3>
                                                      <p className="elementor-image-box-description">Submit your basic details through our form.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-572a929 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="572a929"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-3510fb5" data-id="3510fb5" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-a605938 number-sec elementor-widget elementor-widget-text-editor" data-id="a605938" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>2</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-9c39481" data-id="9c39481" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-1cd1e64 elementor-widget elementor-widget-image-box" data-id="1cd1e64" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Get a Call from Our Team</h3>
                                                      <p className="elementor-image-box-description">We'll reach out to guide you through the next steps.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-28add35 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="28add35"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-7134428" data-id="7134428" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-cc89672 number-sec elementor-widget elementor-widget-text-editor" data-id="cc89672" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>3</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-0df0736" data-id="0df0736" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-24f855c elementor-widget elementor-widget-image-box" data-id="24f855c" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Attend an Interview</h3>
                                                      <p className="elementor-image-box-description">Understand the process and ask us anything.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-38e8982 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="38e8982"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-27f8a07" data-id="27f8a07" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-82061f3 number-sec elementor-widget elementor-widget-text-editor" data-id="82061f3" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>4</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-656ac18" data-id="656ac18" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-8a01b4d elementor-widget elementor-widget-image-box" data-id="8a01b4d" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Submit Your Documents</h3>
                                                      <p className="elementor-image-box-description">Provide the required paperwork for verification.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-b42bf2b elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="b42bf2b"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-ea9c5ba" data-id="ea9c5ba" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-d902980 number-sec elementor-widget elementor-widget-text-editor" data-id="d902980" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>5</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-8396fe7" data-id="8396fe7" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-0206bcb elementor-widget elementor-widget-image-box" data-id="0206bcb" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Training & Onboarding</h3>
                                                      <p className="elementor-image-box-description">Learn our system, customer service & how to use the app</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-01b4ff0 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="01b4ff0"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-97ab8d2" data-id="97ab8d2" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-a56aba6 number-sec elementor-widget elementor-widget-text-editor" data-id="a56aba6" data-element_type="widget" data-widget_type="text-editor.default">
                                                <div className="elementor-widget-container">
                                                  <p>6</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-67f9f4a" data-id="67f9f4a" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-3cec6ff elementor-widget elementor-widget-image-box" data-id="3cec6ff" data-element_type="widget" data-widget_type="image-box.default">
                                                <div className="elementor-widget-container">
                                                  <div className="elementor-image-box-wrapper">
                                                    <div className="elementor-image-box-content">
                                                      <h3 className="elementor-image-box-title">Start Driving</h3>
                                                      <p className="elementor-image-box-description">Get assigned a company vehicle and start earning.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                  </div>
                                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-f8fc824" data-id="f8fc824" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <div className="elementor-element elementor-element-f25e4be elementor-widget elementor-widget-image" data-id="f25e4be" data-element_type="widget" data-widget_type="image.default">
                                        <div className="elementor-widget-container">
                                          <img 
                                            width="490" 
                                            height="610" 
                                            decoding="async" 
                                            src="https://refexmobility.com/wp-content/uploads/elementor/thumbs/Happy-Driver-r8qhaxxfltwntgv5ciruby6j2r5o2jhwx8sob46slw.png" 
                                            title="Happy Driver" 
                                            alt="Happy Driver" 
                                            loading="lazy"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Ready to Join Section - Mobile */}
                      <section 
                        data-particle_enable="false" 
                        data-particle-mobile-disabled="false" 
                        className="elementor-section elementor-top-section elementor-element elementor-element-a7e5292 elementor-hidden-desktop elementor-hidden-laptop elementor-hidden-tablet elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="a7e5292"
                        data-element_type="section"
                        id="join-forms"
                      >
                        <div className="elementor-container elementor-column-gap-default">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-0af9526" data-id="0af9526" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <section 
                                data-particle_enable="false" 
                                data-particle-mobile-disabled="false" 
                                className="elementor-section elementor-inner-section elementor-element elementor-element-0094535 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                data-id="0094535"
                                data-element_type="section"
                              >
                                <div className="elementor-container elementor-column-gap-wider">
                                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-39a5326" data-id="39a5326" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <div className="elementor-element elementor-element-fb22398 elementor-widget__width-initial elementor-widget-tablet__width-initial ready-joins elementor-widget elementor-widget-image-box" data-id="fb22398" data-element_type="widget" data-widget_type="image-box.default">
                                        <div className="elementor-widget-container">
                                          <div className="elementor-image-box-wrapper">
                                            <div className="elementor-image-box-content">
                                              <h3 className="elementor-image-box-title">
                                                Ready to <span style={{color: '#F4553B'}}> Join?</span>
                                              </h3>
                                              <p className="elementor-image-box-description">
                                                No need to buy or maintain a car - we will provide you the car. Enjoy steady income, flexible hours, and full support. No EMI. No hassle. Just drive and earn.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-element elementor-element-5f5dc5e elementor-widget elementor-widget-image" data-id="5f5dc5e" data-element_type="widget" data-widget_type="image.default">
                                        <div className="elementor-widget-container">
                                          <img 
                                            fetchPriority="high" 
                                            decoding="async" 
                                            width="1152" 
                                            height="910" 
                                            src="https://refexmobility.com/wp-content/uploads/2025/07/Driver-key-1.png" 
                                            className="attachment-full size-full wp-image-8417" 
                                            alt="" 
                                            loading="lazy"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-cb977db" data-id="cb977db" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <section 
                                        data-particle_enable="false" 
                                        data-particle-mobile-disabled="false" 
                                        className="elementor-section elementor-inner-section elementor-element elementor-element-061367d join-no elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                        data-id="061367d"
                                        data-element_type="section"
                                      >
                                        <div className="elementor-container elementor-column-gap-default">
                                          <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-c0deb12" data-id="c0deb12" data-element_type="column">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                              <div className="elementor-element elementor-element-call-to-join-cta-mobile elementor-widget elementor-widget-html" data-id="call-to-join-cta-mobile" data-element_type="widget" data-widget_type="html.default">
                                                <div className="elementor-widget-container">
                                                  <div className="call-to-join-box" style={{
                                                    borderRadius: '48px !important',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 4px 15px rgba(244, 85, 59, 0.15)'
                                                  }}>
                                                    {/* Top Section - Orange Background */}
                                                    <div style={{
                                                      backgroundColor: '#F4553B',
                                                      padding: '20px 30px',
                                                      textAlign: 'center'
                                                    }}>
                                                      <h2 style={{
                                                        fontFamily: '"Poppins", Sans-serif',
                                                        fontSize: '20px',
                                                        fontWeight: 600,
                                                        color: '#FFFFFF',
                                                        margin: 0
                                                      }}>
                                                        Call to Join
                                                      </h2>
                                                    </div>
                                                    {/* Bottom Section - White Background */}
                                                    <div style={{
                                                      backgroundColor: '#FFFFFF',
                                                      padding: '25px 30px',
                                                      border: '1px solid rgba(244, 85, 59, 0.2)',
                                                      borderTop: 'none',
                                                      borderRadius: '0 0 15px 15px',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      gap: '16px'
                                                    }}>
                                                      <a href="tel:7418299987" style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px',
                                                        textDecoration: 'none'
                                                      }}>
                                                        <i className="fas fa-phone-alt" style={{
                                                          fontSize: '36px',
                                                          color: '#F4553B'
                                                        }}></i>
                                                        <span style={{
                                                          fontFamily: '"Poppins", Sans-serif',
                                                          fontSize: '48px !important',
                                                          fontWeight: 700,
                                                          color: '#F4553B',
                                                          letterSpacing: '1px'
                                                        }}>
                                                          7418299987
                                                        </span>
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* FAQ Section */}
                      <section 
                        data-particle_enable="false" 
                        data-particle-mobile-disabled="false" 
                        className="elementor-section elementor-top-section elementor-element elementor-element-5c129aa faq-sec elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="5c129aa"
                        data-element_type="section"
                        data-settings='{"background_background":"classic"}'
                        style={{
                          backgroundColor: '#FFF9F8',
                          background: '#FFF9F8',
                          borderRadius: '48px'
                        }}
                      >
                        <div className="elementor-container elementor-column-gap-default">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a96ab41" data-id="a96ab41" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                              <div className="elementor-element elementor-element-e456f82 elementor-widget__width-initial elementor-widget elementor-widget-image-box" data-id="e456f82" data-element_type="widget" data-widget_type="image-box.default">
                                <div className="elementor-widget-container">
                                  <div className="elementor-image-box-wrapper">
                                    <div className="elementor-image-box-content">
                                      <h3 className="elementor-image-box-title">
                                        Frequently Asked <span style={{color: '#F4553B'}}>Questions</span>
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <section 
                                data-particle_enable="false" 
                                data-particle-mobile-disabled="false" 
                                className="elementor-section elementor-inner-section elementor-element elementor-element-5b91282 frequently-qus elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                                data-id="5b91282"
                                data-element_type="section"
                              >
                                <div className="elementor-container elementor-column-gap-default">
                                  <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-dda93ac" data-id="dda93ac" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      <div className="elementor-element elementor-element-531ab1a elementor-widget elementor-widget-toggle" data-id="531ab1a" data-element_type="widget" data-widget_type="toggle.default">
                                        <div className="elementor-widget-container">
                                          <div className="elementor-toggle">
                                            <div className="elementor-toggle-item">
                                              <div 
                                                id="elementor-tab-title-8711" 
                                                className={`elementor-tab-title ${openFaqs[1] ? 'active' : ''}`}
                                                onClick={() => toggleFaq(1)}
                                                role="button"
                                                tabIndex="0"
                                                style={{ cursor: 'pointer' }}
                                                aria-expanded={openFaqs[1] ? 'true' : 'false'}
                                              >
                                                <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                  <span className="elementor-toggle-icon-closed">
                                                    <i className="ion ion-plus"></i>
                                                  </span>
                                                  <span className="elementor-toggle-icon-opened">
                                                    <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                  </span>
                                                </span>
                                                <a className="elementor-toggle-title" tabIndex="0">Who owns the vehicle in this partnership model?</a>
                                              </div>
                                              <div 
                                                id="elementor-tab-content-8711" 
                                                className={`elementor-tab-content elementor-clearfix ${openFaqs[1] ? '' : 'elementor-tab-content-hidden'}`}
                                                style={{ display: openFaqs[1] ? 'block' : 'none' }}
                                              >
                                                <p><span style={{fontWeight: 400}}>Refex Mobility owns and maintains the fleet of vehicles. As a driver partner, you do not need to invest in purchasing a vehicle. You simply drive and earn — we handle the rest, including vehicle maintenance, insurance, and compliance.</span></p>
                                              </div>
                                            </div>
                                            <div className="elementor-toggle-item">
                                              <div 
                                                id="elementor-tab-title-8712" 
                                                className={`elementor-tab-title ${openFaqs[2] ? 'active' : ''}`}
                                                onClick={() => toggleFaq(2)}
                                                role="button"
                                                tabIndex="0"
                                                style={{ cursor: 'pointer' }}
                                                aria-expanded={openFaqs[2] ? 'true' : 'false'}
                                              >
                                                <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                  <span className="elementor-toggle-icon-closed">
                                                    <i className="ion ion-plus"></i>
                                                  </span>
                                                  <span className="elementor-toggle-icon-opened">
                                                    <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                  </span>
                                                </span>
                                                <a className="elementor-toggle-title" tabIndex="0">Is there consistent demand or do I have to find my own rides?</a>
                                              </div>
                                              <div 
                                                id="elementor-tab-content-8712" 
                                                className={`elementor-tab-content elementor-clearfix ${openFaqs[2] ? '' : 'elementor-tab-content-hidden'}`}
                                                style={{ display: openFaqs[2] ? 'block' : 'none' }}
                                              >
                                                <p><span style={{fontWeight: 400}}>No need to worry about finding rides.</span> <span style={{fontWeight: 400}}>Refex Mobility takes full responsibility for generating ride demand across all our operating cities, ensuring that our driver partners stay productive.</span></p>
                                              </div>
                                            </div>
                                            <div className="elementor-toggle-item">
                                              <div 
                                                id="elementor-tab-title-8713" 
                                                className={`elementor-tab-title ${openFaqs[3] ? 'active' : ''}`}
                                                onClick={() => toggleFaq(3)}
                                                role="button"
                                                tabIndex="0"
                                                style={{ cursor: 'pointer' }}
                                                aria-expanded={openFaqs[3] ? 'true' : 'false'}
                                              >
                                                <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                  <span className="elementor-toggle-icon-closed">
                                                    <i className="ion ion-plus"></i>
                                                  </span>
                                                  <span className="elementor-toggle-icon-opened">
                                                    <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                  </span>
                                                </span>
                                                <a className="elementor-toggle-title" tabIndex="0">When and how do I receive my payouts?</a>
                                              </div>
                                              <div 
                                                id="elementor-tab-content-8713" 
                                                className={`elementor-tab-content elementor-clearfix ${openFaqs[3] ? '' : 'elementor-tab-content-hidden'}`}
                                                style={{ display: openFaqs[3] ? 'block' : 'none' }}
                                              >
                                                <p><span style={{fontWeight: 400}}>Payouts are made on time, every time</span><b>. </b><span style={{fontWeight: 400}}>We follow a fixed payout cycle and deposit earnings directly into your registered bank account.</span></p>
                                              </div>
                                            </div>
                                            <div className="elementor-toggle-item">
                                              <div 
                                                id="elementor-tab-title-8714" 
                                                className={`elementor-tab-title ${openFaqs[4] ? 'active' : ''}`}
                                                onClick={() => toggleFaq(4)}
                                                role="button"
                                                tabIndex="0"
                                                style={{ cursor: 'pointer' }}
                                                aria-expanded={openFaqs[4] ? 'true' : 'false'}
                                              >
                                                <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                  <span className="elementor-toggle-icon-closed">
                                                    <i className="ion ion-plus"></i>
                                                  </span>
                                                  <span className="elementor-toggle-icon-opened">
                                                    <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                  </span>
                                                </span>
                                                <a className="elementor-toggle-title" tabIndex="0">What kind of support do I get on-road and off-road?</a>
                                              </div>
                                              <div 
                                                id="elementor-tab-content-8714" 
                                                className={`elementor-tab-content elementor-clearfix ${openFaqs[4] ? '' : 'elementor-tab-content-hidden'}`}
                                                style={{ display: openFaqs[4] ? 'block' : 'none' }}
                                              >
                                                <p><span style={{fontWeight: 400}}>We provide 24×7 Command Center support</span><b>,</b><span style={{fontWeight: 400}}> including emergency assistance, route optimization, vehicle service coordination, and app guidance — so you're never alone on the road.</span></p>
                                              </div>
                                            </div>
                                            <div className="elementor-toggle-item">
                                              <div 
                                                id="elementor-tab-title-8715" 
                                                className={`elementor-tab-title ${openFaqs[5] ? 'active' : ''}`}
                                                onClick={() => toggleFaq(5)}
                                                role="button"
                                                tabIndex="0"
                                                style={{ cursor: 'pointer' }}
                                                aria-expanded={openFaqs[5] ? 'true' : 'false'}
                                              >
                                                <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                  <span className="elementor-toggle-icon-closed">
                                                    <i className="ion ion-plus"></i>
                                                  </span>
                                                  <span className="elementor-toggle-icon-opened">
                                                    <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                  </span>
                                                </span>
                                                <a className="elementor-toggle-title" tabIndex="0">Are there different models for driver partnerships?</a>
                                              </div>
                                              <div 
                                                id="elementor-tab-content-8715" 
                                                className={`elementor-tab-content elementor-clearfix ${openFaqs[5] ? '' : 'elementor-tab-content-hidden'}`}
                                                style={{ display: openFaqs[5] ? 'block' : 'none' }}
                                              >
                                                <p><span style={{fontWeight: 400}}>Yes. We offer flexible models and shifts</span> <span style={{fontWeight: 400}}>based on your preference</span></p>
                                              </div>
                                            </div>
                                            <div className="elementor-toggle-item">
                                              <div 
                                                id="elementor-tab-title-8716" 
                                                className={`elementor-tab-title ${openFaqs[6] ? 'active' : ''}`}
                                                onClick={() => toggleFaq(6)}
                                                role="button"
                                                tabIndex="0"
                                                style={{ cursor: 'pointer' }}
                                                aria-expanded={openFaqs[6] ? 'true' : 'false'}
                                              >
                                                <span className="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
                                                  <span className="elementor-toggle-icon-closed">
                                                    <i className="ion ion-plus"></i>
                                                  </span>
                                                  <span className="elementor-toggle-icon-opened">
                                                    <i className="elementor-toggle-icon-opened ion ion-minus"></i>
                                                  </span>
                                                </span>
                                                <a className="elementor-toggle-title" tabIndex="0"> How do I get started as a driver partner with Refex Mobility?</a>
                                              </div>
                                              <div 
                                                id="elementor-tab-content-8716" 
                                                className={`elementor-tab-content elementor-clearfix ${openFaqs[6] ? '' : 'elementor-tab-content-hidden'}`}
                                                style={{ display: openFaqs[6] ? 'block' : 'none' }}
                                              >
                                                <p><span style={{fontWeight: 400}}>Getting started is simple. Just reach out to the mobile number listed on our website. Our team will guide you to the nearest onboarding center, verify your documents, explain the onboarding process, and get you started.</span></p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </section>

                    </div>
                  </div>
                </article>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DriveForUs

