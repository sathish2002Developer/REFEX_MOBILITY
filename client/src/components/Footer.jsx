import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer id="contact" className="footer-one iq-bg-dark iq-over-dark-90">
      <div className="footer-topbar">
        <div className="container">
          <div className="row">
          </div>
        </div>
      </div>
      
      {/* Address */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget text-left">
                <img 
                  decoding="async" 
                  src="https://refexmobility.com/wp-content/uploads/2025/07/Logo-1.png" 
                  width="158" 
                  alt="Refex Mobility"
                  loading="lazy"
                />
                <div className="social-media-icons">
                  <a href="https://www.facebook.com/refexmobility" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://x.com/RefexMobility" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X (Twitter)">
                    <svg className="social-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-7.1L6 22H2.9l7.3-8.4L1 2h6.2l4.3 6.4L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"></path>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/refex-mobility" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://www.instagram.com/refexmobility" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 mt-4 mt-lg-0 mt-md-0">
              <div className="widget footer-logo text-left">
                <h4 className="footer-title">Quick Links</h4>
                <ul className="ftr-menus">
                  <li>
                    <a href="https://refexmobility.com/drive-for-us/">Drive With Us</a>
                  </li>
                  <li>
                    <Link to="/business-commute">Business Commute</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4">
              <div className="widget text-left">
                <h4 className="footer-title">Info & Policies</h4>
                <ul className="ftr-menus">
                  <li>
                    <Link to="/terms-and-conditions">Terms and Condition</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/refunds-and-cancellation-policy">Refunds and Cancellation Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 mt-lg-0 mt-4">
              <div className="widget text-left">
                <h4 className="footer-title">Contact Us</h4>
                <div className="footer-address">
                  <p className="company-name">Refex Green Mobility Limited</p>
                  <p className="cin-info">CIN: U74909TN2023PLC158849</p>

                  <p className="address-line">2nd Floor, No. 313, Refex Towers, Sterling Road</p>
                  <p className="address-line">Valluvar Kottam High Road, Nungambakkam</p>
                  <p className="address-line">Chennai – 600034, Tamil Nadu, India</p>
                  <p className="phone-info">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <a href="tel:+917305077276">+91 7305077276</a>
                  </p>
                  <p className="email-info">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <a href="mailto:refexmobility@refex.co.in">refexmobility@refex.co.in</a>
                  </p>
                  <p className="email-info">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <a href="mailto:cscompliance@refex.co.in">cscompliance@refex.co.in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Address END */}
      <div className="copyright-footer">
        <div className="container">
          <div className="pt-3 pb-3">
            <div className="row justify-content-between">
              <div className="col-lg-12 col-md-12 text-md-center text-center">
                <span className="copyright">
                  © 2026 Refex Mobility. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

