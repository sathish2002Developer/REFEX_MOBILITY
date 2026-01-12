import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Home.css'
import './TermsAndConditions.css'

const TermsAndConditions = () => {
  useEffect(() => {
    // Add body classes
    document.body.className = 'page-template-default page page-terms-and-conditions elementor-default elementor-kit-6330 elementor-page elementor-page-terms-and-conditions'
    document.body.setAttribute('data-spy', 'scroll')
    document.body.setAttribute('data-offset', '80')

    return () => {
      document.body.className = ''
      document.body.removeAttribute('data-spy')
      document.body.removeAttribute('data-offset')
    }
  }, [])

  return (
    <div id="page" className="site terms-and-conditions">
      <a className="skip-link screen-reader-text" href="#content"></a>
      <Header />
   
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <article className="enerzee-panel post-terms-and-conditions page type-page status-publish hentry">
                <div className="panel-content">
                  <div className="container">
                    <div className="sf-content">
                      <div data-elementor-type="wp-page" data-elementor-id="terms-and-conditions" className="elementor elementor-terms-and-conditions">
                        
                        {/* Hero Banner Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false"
                          className="elementor-section elementor-top-section elementor-element elementor-element-terms-hero elementor-section-height-min-height elementor-section-stretched elementor-section-full_width elementor-section-items-center elementor-section-height-default"
                          data-id="terms-hero"
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
                                      Terms And Conditions
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Terms and Conditions Content Section */}
                        <section 
                          className="elementor-section elementor-top-section elementor-element elementor-element-terms-content elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="terms-content"
                          data-element_type="section"
                        >
                          <div className="elementor-container elementor-column-gap-default" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' }}>
                            <div className="elementor-column elementor-col-100 elementor-top-column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-terms-text elementor-widget elementor-widget-text-editor" data-id="terms-text" data-element_type="widget" data-widget_type="text-editor.default">
                                  <div className="elementor-widget-container terms-content-wrapper">
                                    <p><strong>1. Introduction</strong><br />
                                    These terms and conditions govern your use of our cab booking app; by using our app, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our app.</p>

                                    <p><strong>2. License to use app</strong><br />
                                    Unless otherwise stated, we or our licensors own the intellectual property rights in the app and material on the app. Subject to the license below, all these intellectual property rights are reserved. You may view, download for caching purposes only, and print pages from the app for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions. You must not:</p>
                                    <ul>
                                      <li>Republish material from this app (including republication on another website)</li>
                                      <li>Sell, rent or sub-license material from the app</li>
                                      <li>Show any material from the app in public</li>
                                      <li>Reproduce, duplicate, copy or otherwise exploit material on our app for a commercial purpose</li>
                                      <li>Edit or otherwise modify any material on the app</li>
                                      <li>Redistribute material from this app except for content specifically and expressly made available for redistribution.</li>
                                    </ul>

                                    <p><strong>3. Acceptable use</strong><br />
                                    You must not use our app in any way that causes, or may cause, damage to the app or impairment of the availability or accessibility of the app; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.<br />
                                    You must not use our app to copy, store, host, transmit, send, use, publish or distribute any material which consists of or is linked to any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software. You must not conduct any systematic or automated data collection activities on or in relation to our app without our express written consent. You must not use our app to transmit or send unsolicited commercial communications or for marketing without our express written consent.</p>

                                    <p><strong>4. User content</strong><br />
                                    In these terms and conditions, "your user content" means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to our app for whatever purpose. You grant to us a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You also grant to us the right to sublicense these rights and the right to bring an action for infringement of these rights. Your user content must not be illegal or unlawful, must not infringe any third party's legal rights and must not give rise to legal action. We reserve the right to edit or remove any material submitted to our app.</p>

                                    <p><strong>5. Data Privacy and Consent</strong><br />
                                    By registering on the Refex Green Mobility platform, users explicitly consent to the collection, processing, and storage of their personal information, including but not limited to business contact details, in accordance with the Digital Personal Data Protection Act (DPDPA), 2023.<br />
                                    Users have the right to withdraw their consent or request deletion of their personal data (such as email address) at any time. Such requests can be submitted by contacting tech@refex.co.in. Upon verification, the requested data will be securely deleted from our systems within 15 working days, unless required for legal or compliance purposes. Refex Green Mobility retains personal data for a maximum period of 7 years from the date of last activity or usage, after which it is automatically removed from the system.<br />
                                    We are ISO/IEC 27001:2013 certified, and our systems are designed to safeguard personal data using industry-standard security practices, including encryption, access controls, and regular audits to prevent unauthorized access or misuse.</p>

                                    <p><strong>6. Limitations of liability</strong><br />
                                    The information on this app is provided free-of-charge and you acknowledge that it would be unreasonable to hold us liable in respect of this app and the information on this app. Our liability is limited and excluded to the maximum extent permitted under applicable law. We will not be liable for any direct or indirect loss or damage arising under these terms and conditions or in connection with our app. Nothing in these terms and conditions shall exclude or limit our liability for fraud, death or personal injury caused by our negligence, or for any other liability which cannot be excluded or limited under applicable law.</p>

                                    <p><strong>7. Indemnity</strong><br />
                                    You hereby indemnify us and undertake to keep us indemnified against any losses, damages, costs, liabilities and expenses (including legal expenses and any amounts paid by us to a third party in settlement of a claim or dispute) incurred or suffered by us arising out of any breach by you of any provision of these terms and conditions.</p>

                                    <p><strong>8. Breaches of these terms and conditions</strong><br />
                                    If you breach these terms and conditions in any way, we may take such action as we deem appropriate to deal with the breach, including suspending or blocking your access to the app, and/or bringing court proceedings against you.</p>
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

export default TermsAndConditions

