import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Home.css'
import './RefundsAndCancellation.css'

const RefundsAndCancellation = () => {
  useEffect(() => {
    // Add body classes
    document.body.className = 'page-template-default page page-refunds-and-cancellation-policy elementor-default elementor-kit-6330 elementor-page elementor-page-refunds-and-cancellation-policy'
    document.body.setAttribute('data-spy', 'scroll')
    document.body.setAttribute('data-offset', '80')

    return () => {
      document.body.className = ''
      document.body.removeAttribute('data-spy')
      document.body.removeAttribute('data-offset')
    }
  }, [])

  return (
    <div id="page" className="site refunds-and-cancellation">
      <a className="skip-link screen-reader-text" href="#content"></a>
      <Header />
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <article className="enerzee-panel post-refunds-and-cancellation page type-page status-publish hentry">
                <div className="panel-content">
                  <div className="container">
                    <div className="sf-content">
                      <div data-elementor-type="wp-page" data-elementor-id="refunds-and-cancellation" className="elementor elementor-refunds-and-cancellation">
                        
                        {/* Hero Banner Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false"
                          className="elementor-section elementor-top-section elementor-element elementor-element-refunds-hero elementor-section-height-min-height elementor-section-stretched elementor-section-full_width elementor-section-items-center elementor-section-height-default"
                          data-id="refunds-hero"
                          data-element_type="section"
                          data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
                          fetchPriority="high"
                          style={{
                            backgroundImage: "url('https://refexmobility.com/wp-content/uploads/2025/07/drive-section-1-scaled.webp')",
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
                            paddingTop: '0',
                            paddingBottom: '60px',
                            marginTop: '0',
                            marginBottom: '0'
                          }}
                        >
                          <div className="elementor-background-overlay" style={{
                            backgroundColor: '#000000',
                            opacity: 0.6,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1
                          }}></div>
                          <div className="elementor-container elementor-column-gap-default" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '90px 15px 0 15px', width: '100%', boxSizing: 'border-box' }}>
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-hero-column" data-id="hero-column" data-element_type="column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-hero-heading elementor-widget__width-initial elementor-widget-tablet__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading" data-id="hero-heading" data-element_type="widget" data-widget_type="heading.default">
                                  <div className="elementor-widget-container">
                                    <h1 className="elementor-heading-title elementor-size-default" style={{
                                      fontFamily: '"Poppins", Sans-serif',
                                      fontSize: '56px',
                                      fontWeight: 700,
                                      color: '#FFFFFF',
                                      lineHeight: '1.2em',
                                      margin: '0 0 20px 0',
                                      textAlign: 'center',
                                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                                    }}>
                                      Refunds And Cancellation Policy
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Refunds and Cancellation Policy Content Section */}
                        <section 
                          className="elementor-section elementor-top-section elementor-element elementor-element-refunds-content elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="refunds-content"
                          data-element_type="section"
                        >
                          <div className="elementor-container elementor-column-gap-default" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' }}>
                            <div className="elementor-column elementor-col-100 elementor-top-column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-refunds-text elementor-widget elementor-widget-text-editor" data-id="refunds-text" data-element_type="widget" data-widget_type="text-editor.default">
                                  <div className="elementor-widget-container refunds-content-wrapper">
                                    <p><strong>Refund Policy</strong></p>
                                    <p>1. This website with the URL of <a href="https://refexmobility.com" target="_blank" rel="noopener noreferrer">https://refexmobility.com</a> ("Website/Site") is operated by Refex Green Mobility (RGML) Private Limited ("We/Our/Us").</p>

                                    <p>2. We are committed to providing our customers with the highest quality services. However, on rare occasions, services may be found to be deficient. In such cases, we offer refund in accordance with this Refund Policy ("Policy").</p>

                                    <p>3. You are advised to read Our Terms and Conditions along with this Policy.</p>

                                    <p>4. By using this website, You agree to be bound by the terms contained in this policy without modification. If you do not agree to the terms contained in this Policy, You are advised not to transact on this website.</p>

                                    <p>5. We offer 4-7 working Days refund policy for the eligible Services.</p>

                                    <p>6. Please read this policy before availing service on this website, so that You can understand Your Rights as well as what You can expect from Us if You are not happy with Your purchase.</p>

                                    <p><strong>DEFINITIONS</strong></p>
                                    <p>1. "Business Days" – means a day that is not a Saturday, Sunday, public holiday, or bank holiday in India or in the state where our office is located.</p>

                                    <p>2. "Customer" – means a person who avails services for considerations and does not include commercial purchases.</p>

                                    <p>3. "Date of Transaction" – means the date of invoice of the service, which includes the date of renewal processed in accordance with the terms and conditions of the applicable service agreement.</p>

                                    <p>4. "Website" – means this website with the URL: <a href="https://refexmobility.com" target="_blank" rel="noopener noreferrer">https://refexmobility.com</a></p>

                                    <p><strong>REFUNDS RULES</strong></p>
                                    <p>1. We will not process a refund if You have placed the order for the wrong service.</p>

                                    <p>2. When you make a qualifying refund request. We may refund the full amount, less any additional cost incurred by Us in providing such Services.</p>

                                    <p>3. Refund shall only be considered once the Customer concerned produces relevant documents and proof.</p>

                                    <p>4. Once qualified, the refunds are applied to the original payment option.</p>

                                    <p>5. The request for a refund of Services can be made in the following manner:</p>
                                    <p>A) You can send an email to <a href="mailto:sasi.a@refex.co.in">sasi.a@refex.co.in</a>.<br />
                                    B) To be eligible for a refund, You have to request for refund within 24 Hours (1 Day) just after the placement of your booking.<br />
                                    C) You will not be entitled to any kind of refund after 24 Hours (1 Day) of your booking.</p>

                                    <p><strong>EXEMPTIONS</strong></p>
                                    <p>Notwithstanding the other provisions of this Policy, We may refuse to provide a refund for a service if:</p>
                                    <p>A) You knew or were made aware of the problem(s) with the service before you availed it.<br />
                                    B) Free Services.<br />
                                    C) Refund requests are placed after the refund window is closed.</p>

                                    <p>Apart from the above, the following exemptions are applicable when it comes to the refund:</p>
                                    <p>A) Payment towards Vinyl Printing<br />
                                    B) Payment towards Vehicle Registration Program (Vehicle Enrolment Scheme)<br />
                                    C) Payment towards delivered Advertising Services</p>

                                    <p><strong>RESPONSE TIME</strong></p>
                                    <p>1. Refunds are normally processed within 4-7 Business Days after checking the veracity of the refund request.</p>

                                    <p>2. The period of the refund may also depend on various banking and payment channels, and We will not be liable for any errors or delays in a refund due to banks or third-party service providers.</p>

                                    <p><strong>CANCELLATION OF RETURN REQUEST</strong></p>
                                    <p>A request for return or refund once made can be cancelled by contacting customer care at <a href="https://refexmobility.com" target="_blank" rel="noopener noreferrer">https://refexmobility.com</a>, <a href="tel:+917305956214">(+91) 7305956214</a>.</p>

                                    <p><strong>REFUSAL OF RETURN OR REFUND REQUEST</strong></p>
                                    <p>We reserve the right to refuse any request for a or refund if such request is not in compliance with this Policy or applicable laws.</p>

                                    <p><strong>Contact Us</strong></p>
                                    <p>If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at <a href="mailto:rgml.support@refex.co.in">rgml.support@refex.co.in</a></p>
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

export default RefundsAndCancellation

