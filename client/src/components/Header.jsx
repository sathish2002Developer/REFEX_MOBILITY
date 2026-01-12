import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const isHome = location.pathname === '/'
  const isBusinessCommute = location.pathname === '/business-commute'
  const isDriveForUs = location.pathname === '/drive-for-us'
  const isInvestorRelations = location.pathname === '/investor-relations'

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="style-one" id="main-header">
        <div className="container main-header">
          <div className="row">
            <div className="col-sm-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/">
                  <img 
                    width="150" 
                    height="106" 
                    className="img-fluid logo" 
                    src="https://refexmobility.com/wp-content/uploads/2025/07/heder-log.png" 
                    alt="refex mobility"
                  />
                </Link>
                <button 
                  ref={buttonRef}
                  className="navbar-toggler" 
                  type="button" 
                  data-toggle="collapse" 
                  data-target="#navbarSupportedContent" 
                  aria-controls="navbarSupportedContent" 
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle navigation"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsMenuOpen(!isMenuOpen)
                  }}
                >
                  <span className="navbar-toggler-icon">
                    <i className="ion-navicon"></i>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'inline-block', verticalAlign: 'middle'}}>
                      <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <div 
                  ref={menuRef}
                  className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
                  id="navbarSupportedContent"
                >
                  <div id="iq-menu-container" className="menu-main-top-navigation-container">
                    <ul id="top-menu" className="navbar-nav ml-auto">
                      <li id="menu-item-5766" className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-home ${isHome ? 'current-menu-item page_item current_page_item' : ''} menu-item-5766`}>
                        <Link to="/" aria-current={isHome ? 'page' : undefined}>Home</Link>
                      </li>
                      <li id="menu-item-5667" className={`menu-item menu-item-type-post_type menu-item-object-page ${isBusinessCommute ? 'current-menu-item page_item current_page_item' : ''} menu-item-5667`}>
                        <Link to="/business-commute" aria-current={isBusinessCommute ? 'page' : undefined}>Business Commute</Link>
                      </li>
                      <li id="menu-item-6565" className={`menu-item menu-item-type-post_type menu-item-object-page ${isDriveForUs ? 'current-menu-item page_item current_page_item' : ''} menu-item-6565`}>
                        <Link to="/drive-for-us" aria-current={isDriveForUs ? 'page' : undefined}>Drive For Us</Link>
                      </li>
                      <li id="menu-item-investor-relations" className={`menu-item menu-item-type-post_type menu-item-object-page ${isInvestorRelations ? 'current-menu-item page_item current_page_item' : ''} menu-item-investor-relations`}>
                        <Link to="/investor-relations" aria-current={isInvestorRelations ? 'page' : undefined}>Investor Relations</Link>
                      </li>
                      <li id="menu-item-8699" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-8699">
                        <a target="_blank" rel="noopener noreferrer" href="https://refex.eveelz.in">Corporate Login</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="sub-main">
                  <ul className="shop_list"></ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="iq-height"></div>
    </>
  )
}

export default Header

