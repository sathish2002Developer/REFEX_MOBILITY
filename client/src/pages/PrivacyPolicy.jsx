import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Home.css'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  useEffect(() => {
    // Add body classes
    document.body.className = 'page-template-default page page-privacy-policy elementor-default elementor-kit-6330 elementor-page elementor-page-privacy-policy'
    document.body.setAttribute('data-spy', 'scroll')
    document.body.setAttribute('data-offset', '80')

    return () => {
      document.body.className = ''
      document.body.removeAttribute('data-spy')
      document.body.removeAttribute('data-offset')
    }
  }, [])

  return (
    <div id="page" className="site privacy-policy">
      <a className="skip-link screen-reader-text" href="#content"></a>
      <Header />
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <article className="enerzee-panel post-privacy-policy page type-page status-publish hentry">
                <div className="panel-content">
                  <div className="container">
                    <div className="sf-content">
                      <div data-elementor-type="wp-page" data-elementor-id="privacy-policy" className="elementor elementor-privacy-policy">
                        
                        {/* Hero Banner Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false"
                          className="elementor-section elementor-top-section elementor-element elementor-element-privacy-hero elementor-section-height-min-height elementor-section-stretched elementor-section-full_width elementor-section-items-center elementor-section-height-default"
                          data-id="privacy-hero"
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
                                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                                    }}>
                                      Privacy Policy
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Privacy Policy Content Section */}
                        <section 
                          className="elementor-section elementor-top-section elementor-element elementor-element-privacy-content elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="privacy-content"
                          data-element_type="section"
                        >
                          <div className="elementor-container elementor-column-gap-default" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 15px' }}>
                            <div className="elementor-column elementor-col-100 elementor-top-column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                <div className="elementor-element elementor-element-privacy-text elementor-widget elementor-widget-text-editor" data-id="privacy-text" data-element_type="widget" data-widget_type="text-editor.default">
                                  <div className="elementor-widget-container">
                                    <div className="privacy-policy-content">
                                      <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        This privacy policy applies to the Refex Mobility app for mobile devices that was created by Refex Green Mobility as a Free service. This service is intended for use "AS IS".
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Information Collection and Use
                                      </h2>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        The Application collects information when you download and use it. This information may include information such as
                                      </p>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>Your device's Internet Protocol address (e.g. IP address)</li>
                                        <li style={{ marginBottom: '10px' }}>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages.</li>
                                        <li style={{ marginBottom: '10px' }}>The time spent on the Application.</li>
                                        <li style={{ marginBottom: '10px' }}>The operating system you use on your mobile device.</li>
                                      </ul>

                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        To provide cab booking and ride tracking services, our app requires access to your <strong>precise location data</strong> (e.g., GPS). This data is essential for:
                                      </p>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>Matching you with nearby drivers</li>
                                        <li style={{ marginBottom: '10px' }}>Providing accurate pickup and drop-off locations</li>
                                        <li style={{ marginBottom: '10px' }}>Real-time ride tracking and navigation</li>
                                        <li style={{ marginBottom: '10px' }}>Ensuring driver and passenger safety</li>
                                        <li style={{ marginBottom: '10px' }}>Improving route efficiency and service quality</li>
                                      </ul>

                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        We collect location data only when the app is actively in use or running in the background (if permitted), and only with your explicit consent. You can manage location permissions at any time through your device settings.
                                      </p>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        Your location data is:
                                      </p>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}><strong>Securely stored</strong> and transmitted using encrypted channels</li>
                                        <li style={{ marginBottom: '10px' }}><strong>Not shared</strong> with third parties except as required for core service delivery (e.g., mapping, navigation, analytics)</li>
                                        <li style={{ marginBottom: '10px' }}><strong>Never used for unrelated marketing purposes</strong> without your consent</li>
                                      </ul>

                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        If you disable location access, certain features of the app may not function properly, including booking and tracking rides.
                                      </p>

                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.
                                      </p>

                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information, including but not limited to Email, Gender, Mobile number. The information that the Service Provider request will be retained by them and used as described in this privacy policy.
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Third Party Access
                                      </h2>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
                                      </p>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:
                                      </p>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>Google Play Services</li>
                                        <li style={{ marginBottom: '10px' }}>Google Analytics for Firebase</li>
                                        <li style={{ marginBottom: '10px' }}>Firebase Crashlytics</li>
                                      </ul>

                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        The Service Provider may disclose User Provided and Automatically Collected Information:
                                      </p>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>as required by law, such as to comply with a subpoena, or similar legal process.</li>
                                        <li style={{ marginBottom: '10px' }}>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.</li>
                                        <li style={{ marginBottom: '10px' }}>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
                                      </ul>

                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        This privacy policy explains how we collect, use, and disclose information, including SMS messages, when you use our app.
                                      </p>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        Collection of SMS Messages
                                      </h3>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>Our app may request permission to access your SMS messages for specific purposes outlined in our app's functionality. We only access SMS messages when explicitly authorized by the user.</li>
                                      </ul>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        Use of SMS Messages
                                      </h3>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>We only access and use SMS messages for purposes explicitly stated in our app's functionality. This includes purposes, such as OTP verification codes and transaction notifications.</li>
                                      </ul>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        Storage and Security
                                      </h3>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>Any SMS messages accessed by our app are securely stored on your device and are not transmitted to our servers or any third parties.</li>
                                        <li style={{ marginBottom: '10px' }}>We employ industry-standard security measures to protect your SMS messages and other personal information from unauthorized access, alteration, disclosure, or destruction.</li>
                                      </ul>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        Disclosure of SMS Messages
                                      </h3>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>We do not disclose your SMS messages to third parties.</li>
                                      </ul>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        User Control and Consent
                                      </h3>
                                      <ul style={{ marginBottom: '30px', paddingLeft: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        <li style={{ marginBottom: '10px' }}>You have full control over the permissions granted to our app, including the ability to revoke permission to access SMS messages at any time through your device settings.</li>
                                        <li style={{ marginBottom: '10px' }}>By using our app and granting permissions, you consent to the collection, use, and disclosure of SMS messages as described in this privacy policy.</li>
                                      </ul>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Opt-Out Rights
                                      </h2>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Data Retention Policy
                                      </h2>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at <a href="mailto:sasi.a@refex.co.in" style={{ color: '#F4553B', textDecoration: 'none' }}>sasi.a@refex.co.in</a> and they will respond in a reasonable time.
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Children
                                      </h2>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
                                      </p>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (<a href="mailto:rgml.support@refex.co.in" style={{ color: '#F4553B', textDecoration: 'none' }}>rgml.support@refex.co.in</a>) so that they will be able to take the necessary actions.
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Security
                                      </h2>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Changes
                                      </h2>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
                                      </p>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        This privacy policy is effective as of 2024-03-24
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Your Consent
                                      </h2>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Refund Policy
                                      </h2>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        1. This website with the URL of <a href="https://refexmobility.com" target="_blank" rel="noopener noreferrer" style={{ color: '#F4553B', textDecoration: 'none' }}>https://refexmobility.com</a> ("Website/Site") is operated by Refex Green Mobility (RGML) Private Limited ("We/Our/Us").
                                      </p>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        2. We are committed to providing our customers with the highest quality services. However, on rare occasions, services may be found to be deficient. In such cases, we offer refund in accordance with this Refund Policy ("Policy").
                                      </p>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        3. You are advised to read Our Terms and Conditions along with this Policy.
                                      </p>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        4. By using this website, You agree to be bound by the terms contained in this policy without modification. If you do not agree to the terms contained in this Policy, You are advised not to transact on this website.
                                      </p>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        5. We offer 4-7 working Days refund policy for the eligible Services.
                                      </p>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        6. Please read this policy before availing service on this website, so that You can understand Your Rights as well as what You can expect from Us if You are not happy with Your purchase.
                                      </p>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        DEFINITIONS
                                      </h3>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        1. "Business Days" – means a day that is not a Saturday, Sunday, public holiday, or bank holiday in India or in the state where our office is located.
                                      </p>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        2. "Customer" – means a person who avails services for considerations and does not include commercial purchases.
                                      </p>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        3. "Date of Transaction" – means the date of invoice of the service, which includes the date of renewal processed in accordance with the terms and conditions of the applicable service agreement.
                                      </p>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        4. "Website" – means this website with the URL: <a href="https://refexmobility.com" target="_blank" rel="noopener noreferrer" style={{ color: '#F4553B', textDecoration: 'none' }}>https://refexmobility.com</a>
                                      </p>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        REFUNDS RULES
                                      </h3>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        1. We will not process a refund if You have placed the order for the wrong service.
                                      </p>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        2. When you make a qualifying refund request. We may refund the full amount, less any additional cost incurred by Us in providing such Services.
                                      </p>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        3. Refund shall only be considered once the Customer concerned produces relevant documents and proof.
                                      </p>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        4. Once qualified, the refunds are applied to the original payment option.
                                      </p>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        5. The request for a refund of Services can be made in the following manner:
                                      </p>
                                      <p style={{ marginBottom: '10px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        A) You can send an email to <a href="mailto:sasi.a@refex.co.in" style={{ color: '#F4553B', textDecoration: 'none' }}>sasi.a@refex.co.in</a>.
                                      </p>
                                      <p style={{ marginBottom: '10px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        B) To be eligible for a refund, You have to request for refund within 24 Hours (1 Day) just after the placement of your booking.
                                      </p>
                                      <p style={{ marginBottom: '30px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        C) You will not be entitled to any kind of refund after 24 Hours (1 Day) of your booking.
                                      </p>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        EXEMPTIONS
                                      </h3>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        Notwithstanding the other provisions of this Policy, We may refuse to provide a refund for a service if:
                                      </p>
                                      <p style={{ marginBottom: '10px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        A) You knew or were made aware of the problem(s) with the service before you availed it.
                                      </p>
                                      <p style={{ marginBottom: '10px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        B) Free Services.
                                      </p>
                                      <p style={{ marginBottom: '10px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        C) Refund requests are placed after the refund window is closed.
                                      </p>
                                      <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        Apart from the above, the following exemptions are applicable when it comes to the refund:
                                      </p>
                                      <p style={{ marginBottom: '10px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        A) Payment towards Vinyl Printing
                                      </p>
                                      <p style={{ marginBottom: '10px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        B) Payment towards Vehicle Registration Program (Vehicle Enrolment Scheme)
                                      </p>
                                      <p style={{ marginBottom: '30px', marginLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        C) Payment towards delivered Advertising Services
                                      </p>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        RESPONSE TIME
                                      </h3>
                                      <p style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        1. Refunds are normally processed within 4-7 Business Days after checking the veracity of the refund request.
                                      </p>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        2. The period of the refund may also depend on various banking and payment channels, and We will not be liable for any errors or delays in a refund due to banks or third-party service providers.
                                      </p>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        CANCELLATION OF RETURN REQUEST
                                      </h3>
                                      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        A request for return or refund once made can be cancelled by contacting customer care at <a href="https://refexmobility.com" target="_blank" rel="noopener noreferrer" style={{ color: '#F4553B', textDecoration: 'none' }}>https://refexmobility.com</a>, <a href="tel:+917305956214" style={{ color: '#F4553B', textDecoration: 'none' }}>(+91) 7305956214</a>.
                                      </p>

                                      <h3 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '24px', fontWeight: 600, color: '#5D3F3A', marginTop: '30px', marginBottom: '15px' }}>
                                        REFUSAL OF RETURN OR REFUND REQUEST
                                      </h3>
                                      <p style={{ marginBottom: '40px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        We reserve the right to refuse any request for a or refund if such request is not in compliance with this Policy or applicable laws.
                                      </p>

                                      <h2 style={{ fontFamily: '"Poppins", Sans-serif', fontSize: '28px', fontWeight: 700, color: '#5D3F3A', marginTop: '40px', marginBottom: '20px' }}>
                                        Contact Us
                                      </h2>
                                      <p style={{ marginBottom: '40px', fontSize: '16px', lineHeight: '1.8', color: '#5D3F3A' }}>
                                        If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at <a href="mailto:rgml.support@refex.co.in" style={{ color: '#F4553B', textDecoration: 'none' }}>rgml.support@refex.co.in</a>
                                      </p>
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

export default PrivacyPolicy

