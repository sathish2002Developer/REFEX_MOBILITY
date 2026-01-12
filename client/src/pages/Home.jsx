import React, { useState, useEffect } from 'react'
import './Home.css'

const Home = () => {
  const [counters, setCounters] = useState({
    riders: 0,
    co2: 0,
    kms: 0,
    fuel: 0
  })

  useEffect(() => {
    // Counter targets
    const targets = {
      riders: 25000,
      co2: 280,
      kms: 43.6,
      fuel: 3.4
    }
    
    // Current values
    const current = {
      riders: 0,
      co2: 0,
      kms: 0,
      fuel: 0
    }
    
    // Animation step
    const duration = 2000 // 2 seconds
    const steps = 100
    const stepTime = duration / steps
    
    let step = 0
    
    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      
      // Calculate current values based on progress
      current.riders = Math.floor(targets.riders * progress)
      current.co2 = Math.floor(targets.co2 * progress)
      current.kms = parseFloat((targets.kms * progress).toFixed(1))
      current.fuel = parseFloat((targets.fuel * progress).toFixed(1))
      
      // Update state
      setCounters({
        riders: current.riders,
        co2: current.co2,
        kms: current.kms,
        fuel: current.fuel
      })
      
      // Stop when animation is complete
      if (progress >= 1) {
        clearInterval(timer)
        // Set final values to ensure exact targets
        setCounters({
          riders: targets.riders,
          co2: targets.co2,
          kms: targets.kms,
          fuel: targets.fuel
        })
      }
    }, stepTime)
    
    // Cleanup
    return () => clearInterval(timer)
  }, [])

  return (
    <div id="primary" className="content-area">
      <main id="main" className="site-main">
        {/* Hero Section */}
        <section className="hero-section" id="home">
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="hero-content">
                  <h1 className="hero-title">Where Reliability Meets Responsibility.</h1>
                  <p className="hero-description">
                    Rides that keep your business moving – on time, every time.
                  </p>
                  <div className="hero-buttons">
                    <a 
                      href="#contact" 
                      className="button primary-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Impact Section */}
        <section className="sustainability-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-header">
                  <h2 className="section-title">Sustainability Impact</h2>
                  <p className="section-description">
                    Every ride counts toward a cleaner planet.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="stat-box">
                  <div className="stat-number">{counters.riders.toLocaleString()}+</div>
                  <div className="stat-label">Happy Riders</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-box">
                  <div className="stat-number">{counters.co2.toLocaleString()} Tonnes+</div>
                  <div className="stat-label">CO₂ Saved</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-box">
                  <div className="stat-number">{counters.kms} Million+</div>
                  <div className="stat-label">Kms Covered</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-box">
                  <div className="stat-number">{counters.fuel} Million+</div>
                  <div className="stat-label">Ltrs Of Fuel Saved</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-section" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-header">
                  <h2 className="section-title">Why Choose Us?</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="feature-box">
                  <div className="feature-icon">
                    <i className="fa fa-leaf"></i>
                  </div>
                  <h3 className="feature-title">Eco-Friendly Rides</h3>
                  <p className="feature-description">
                    Go electric and travel cleaner - for you and the environment.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="feature-box">
                  <div className="feature-icon">
                    <i className="fa fa-building"></i>
                  </div>
                  <h3 className="feature-title">Corporate Ride Solutions</h3>
                  <p className="feature-description">
                    Custom packages and dashboards for business and employee transport.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="feature-box">
                  <div className="feature-icon">
                    <i className="fa fa-user-shield"></i>
                  </div>
                  <h3 className="feature-title">Verified and Trained Drivers</h3>
                  <p className="feature-description">
                    All drivers are background-checked and professionally trained.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="feature-box">
                  <div className="feature-icon">
                    <i className="fa fa-shield-alt"></i>
                  </div>
                  <h3 className="feature-title">Safety and Hygiene Protocols</h3>
                  <p className="feature-description">
                    Sanitized vehicles with strict hygiene standards for a worry-free ride.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ride Options Section */}
        <section className="ride-options-section" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-header">
                  <h2 className="section-title">Ride Options</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="ride-option-box">
                  <h3 className="ride-title">Corporate Commute</h3>
                  <p className="ride-description">
                    Reliable daily transport for your employees using 100% electric vehicles. 
                    Safe, punctual, and sustainable rides tailored for modern workplaces.
                  </p>
                  <a href="#contact" className="button primary-btn">Get Started</a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="ride-option-box">
                  <h3 className="ride-title">Airport Transfers</h3>
                  <p className="ride-description">
                    Enjoy stress-free airport pickups and drop-offs with professional drivers 
                    and on-time service. Travel in comfort, whether you're arriving or departing.
                  </p>
                  <a href="#contact" className="button primary-btn">Get Started</a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="ride-option-box">
                  <h3 className="ride-title">Hourly Rentals</h3>
                  <p className="ride-description">
                    Hourly Rentals offers customers the convenience of booking a car with a 
                    professional driver for a fixed number of hours. Whether it's a business 
                    meeting, city tour, shopping spree, users can choose the duration and travel comfortably.
                  </p>
                  <a href="#contact" className="button primary-btn">Get Started</a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="ride-option-box">
                  <h3 className="ride-title">Outstation Rides</h3>
                  <p className="ride-description">
                    Whether it's a weekend escape, a business trip, or a visit home, our 
                    outstation rides offer safe, comfortable travel beyond city limits, so 
                    you can focus on the journey, not the hassle.
                  </p>
                  <a href="#contact" className="button primary-btn">Get Started</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expanding Network Section */}
        <section className="network-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-header">
                  <h2 className="section-title">Our Expanding Network</h2>
                  <p className="section-description">
                    Growing reach to meet your travel needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="city-box">
                  <h4>Bangalore</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="city-box">
                  <h4>Hyderabad</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="city-box">
                  <h4>Delhi NCR</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="city-box">
                  <h4>Mumbai</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="city-box">
                  <h4>Chennai</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="about-us-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-header">
                  <h2 className="section-title">About Us</h2>
                </div>
                <div className="about-content">
                  <p>
                    <strong>Refex Green Mobility Limited (RGML)</strong> is a wholly-owned subsidiary 
                    of Refex Group's flagship listed entity, Refex Industries Limited. RGML underscores 
                    the group's commitment to sustainability and delivers clean mobility services for 
                    corporate transportation needs and B2B2C use cases with 1400+ company-owned vehicles. 
                    It leverages technology and aims to transform the mobility sector.
                  </p>
                  <p>
                    Operating under the brand name <strong>"Refex Mobility"</strong>, RGML runs 100% 
                    cleaner-fueled vehicles. At Refex Mobility, we go beyond transportation, and we 
                    invite you to be part of a movement redefining sustainable mobility.
                  </p>
                  <p>
                    Enhance your journey with us and step into a future where sustainability meets innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-header">
                  <h2 className="section-title">Feedback That Drives Us</h2>
                  <p className="section-description">
                    Discover how we deliver value, comfort, and reliability.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="testimonial-box">
                  <p className="testimonial-text">
                    "Booking a cab has never been this easy! The app is fast, reliable, and user-friendly. 
                    I love the real-time tracking and prompt driver updates. Whether it's a last-minute ride 
                    or a scheduled trip, I can count on it every time!"
                  </p>
                  <div className="testimonial-author">
                    <strong>John Peter</strong>
                    <span>Bangalore</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="testimonial-box">
                  <p className="testimonial-text">
                    "The booking process was smooth, and the ride was extremely comfortable. The driver 
                    was polite, and the vehicle was clean and well-maintained. Highly recommended!"
                  </p>
                  <div className="testimonial-author">
                    <strong>Ethel Johnston</strong>
                    <span>Chennai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-header">
                  <h2 className="section-title">Frequently Asked Questions</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="faq-item">
                  <h4 className="faq-question">
                    What are the benefits of onboarding refex as a mobility partner for our organisation?
                  </h4>
                  <div className="faq-answer">
                    <p>As a Refex customer, you get several perks which include:</p>
                    <ul>
                      <li>Dedicated enterprise dashboard for onboarding/off-boarding users</li>
                      <li>Create, modify and track all your rides</li>
                      <li>Detailed monthly ride and payment reports</li>
                      <li>Payments and invoicing (e-invoices)</li>
                      <li>and all this can also be done using end to end encrypted secure API integrations.</li>
                    </ul>
                  </div>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">
                    Do I get any carbon savings certificate?
                  </h4>
                  <div className="faq-answer">
                    <p>
                      Yes, Refex Mobility provides carbon savings certificates to our business clients, 
                      recognizing your contributions to sustainable and eco-friendly transportation.
                    </p>
                  </div>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">
                    Who is responsible for ownership and maintains the fleet and drivers?
                  </h4>
                  <div className="faq-answer">
                    <p>
                      We at Refex ensure all fleet maintenance and driver training, maintaining high 
                      standards of safety, cleanliness, and reliability for every ride.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home

