import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import WebsiteHome from './pages/WebsiteHome'
import BusinessCommute from './pages/BusinessCommute'
import EtsLanding from './pages/EtsLanding'
import RacLanding from './pages/RacLanding'
import DriveForUs from './pages/DriveForUs'
import InvestorRelations from './pages/InvestorRelations'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import RefundsAndCancellation from './pages/RefundsAndCancellation'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminHome from './pages/admin/AdminHome'
import AdminInvestorRelations from './pages/admin/AdminInvestorRelations'
import AdminWebsiteHome from './pages/admin/AdminWebsiteHome'
import AdminLandingPages from './pages/admin/AdminLandingPages'
import AboutUs from './pages/AboutUs'
import './App.css'

// ScrollToTop component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WebsiteHome />} />
        <Route path="/business-commute" element={<BusinessCommute />} />
        <Route path="/employee-transportation" element={<EtsLanding />} />
        <Route path="/ets" element={<EtsLanding />} />
        <Route path="/CorporateRentals" element={<RacLanding />} />
        <Route path="/corporate-car-rental" element={<RacLanding />} />
        <Route path="/rac" element={<Navigate to="/CorporateRentals" replace />} />
        <Route path="/drive-for-us" element={<DriveForUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/investor-relations" element={<InvestorRelations />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refunds-and-cancellation-policy" element={<RefundsAndCancellation />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="website-home" element={<AdminWebsiteHome />} />
          <Route path="landing-pages" element={<AdminLandingPages />} />
          <Route path="investor-relations" element={<AdminInvestorRelations />} />
        </Route>
      </Routes>
      {showBackToTop && (
        <div id="back-to-top">
          <a className="top" id="top" href="#top" onClick={scrollToTop}>
            <i className="fas fa-arrow-up"></i>
          </a>
        </div>
      )}
    </Router>
  )
}

export default App

