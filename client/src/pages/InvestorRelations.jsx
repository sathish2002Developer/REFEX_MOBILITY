import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Home.css'
import './InvestorRelations.css'

const InvestorRelations = () => {
  const [activeSection, setActiveSection] = useState('annual-return')
  const [activeYear, setActiveYear] = useState('')
  const [isAnnualReturnExpanded, setIsAnnualReturnExpanded] = useState(false)
  const [expandedYears, setExpandedYears] = useState({}) // Track which years are expanded
  const [loading, setLoading] = useState(true)
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://uat.refexmobility.in'
  
  // Load data from localStorage or use defaults
  const [heroData, setHeroData] = useState({
    title: 'Investor Relations',
    description: 'Building trust through transparency. Access our financial reports, annual returns, and investor communications to stay informed about our growth and performance.',
    backgroundImage: 'https://refexmobility.com/wp-content/uploads/2025/07/investor-banner.webp'
  })
  
  const [menuItems, setMenuItems] = useState([
    { id: 'annual-return', label: 'Annual Return', hasSubItems: true },
    { id: 'notice', label: 'Notice of the General meetings', hasSubItems: false }
  ])
  
  const [years, setYears] = useState([])
  const [filesData, setFilesData] = useState({})
  const [filesBySection, setFilesBySection] = useState({}) // Store files by section
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(false) // Track notice expansion

  // Load files from API
  const loadFilesFromAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/investor/files`)
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          // Store files by section
          const sectionData = result.data.filesBySection || {}
          setFilesBySection(sectionData)
          
          // Annual Return files (for backward compatibility)
          setFilesData(result.data.filesByYear || {})
          const apiYears = result.data.years || []
          setYears(apiYears)
          
          // Set active year to first available year if not set
          setActiveYear(prevYear => {
            if (!prevYear && apiYears.length > 0) {
              // Also ensure annual-return section is active and expanded
              setActiveSection('annual-return')
              setIsAnnualReturnExpanded(true)
              // Expand first year by default
              setExpandedYears({ [apiYears[0]]: true })
              return apiYears[0]
            }
            return prevYear
          })
        }
      } else {
        console.error('Failed to load files from API')
        // Fallback to localStorage if API fails
        loadFromLocalStorage()
      }
    } catch (error) {
      console.error('Error loading files from API:', error)
      // Fallback to localStorage if API fails
      loadFromLocalStorage()
    } finally {
      setLoading(false)
    }
  }

  // Fallback: Load data from localStorage
  const loadFromLocalStorage = () => {
    const savedYears = localStorage.getItem('investorYears')
    const savedFilesData = localStorage.getItem('investorFilesData')

    if (savedYears) {
      const parsedYears = JSON.parse(savedYears)
      setYears(parsedYears)
      setActiveYear(prevYear => {
        if (!prevYear && parsedYears.length > 0) {
          return parsedYears[0]
        }
        return prevYear
      })
    }
    if (savedFilesData) {
      setFilesData(JSON.parse(savedFilesData))
    }
  }

  // Load data on mount
  useEffect(() => {
    // Load hero and menu from localStorage (can be moved to database later)
    const savedHeroData = localStorage.getItem('investorHeroData')
    const savedMenuItems = localStorage.getItem('investorMenuItems')

    if (savedHeroData) {
      setHeroData(JSON.parse(savedHeroData))
    }
    
    let itemsToSet = [
      { id: 'annual-return', label: 'Annual Return', hasSubItems: true },
      { id: 'notice', label: 'Notice of the General meetings', hasSubItems: false }
    ]
    
    if (savedMenuItems) {
      itemsToSet = JSON.parse(savedMenuItems)
      setMenuItems(itemsToSet)
    } else {
      setMenuItems(itemsToSet)
    }

    // Set first menu item as active by default
    if (itemsToSet.length > 0) {
      const firstMenuItem = itemsToSet[0]
      setActiveSection(firstMenuItem.id)
      if (firstMenuItem.id === 'annual-return' && firstMenuItem.hasSubItems) {
        setIsAnnualReturnExpanded(true)
      }
    }

    // Load files from API
    loadFilesFromAPI()
  }, [])

  const handleDownload = async (file) => {
    try {
      // If URL is relative, make it absolute using API base URL
      let fileUrl = file.url
      if (file.url && !file.url.startsWith('http')) {
        fileUrl = `${API_BASE_URL}${file.url.startsWith('/') ? '' : '/'}${file.url}`
      }

      // Fetch the file as a blob
      const response = await fetch(fileUrl, {
        method: 'GET',
        headers: {}
      })
      
      if (!response.ok) {
        throw new Error('Failed to download file')
      }

      const blob = await response.blob()
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob)
      
      // Create download link
      const link = document.createElement('a')
      link.href = blobUrl
      link.style.display = 'none'
      
      // Get file extension from original filename or type
      let fileName = file.name || file.originalName || 'download'
      // Ensure filename has proper extension
      if (!fileName.includes('.')) {
        const extension = file.type === 'pdf' ? '.pdf' : 
                         file.type === 'doc' ? '.doc' : 
                         file.type === 'docx' ? '.docx' :
                         file.type === 'xls' ? '.xls' : 
                         file.type === 'xlsx' ? '.xlsx' : '.pdf'
        fileName = `${fileName}${extension}`
      }
      
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
      }, 100)
    } catch (error) {
      console.error('Download error:', error)
      // Fallback: try to open in new tab
      let fileUrl = file.url
      if (file.url && !file.url.startsWith('http')) {
        fileUrl = `${API_BASE_URL}${file.url.startsWith('/') ? '' : '/'}${file.url}`
      }
      window.open(fileUrl, '_blank')
      alert('Unable to download file directly. The file has been opened in a new tab. Please use the browser\'s save option to download.')
    }
  }

  const handleView = (file) => {
    // If URL is relative, make it absolute using API base URL
    let fileUrl = file.url
    if (file.url && !file.url.startsWith('http')) {
      fileUrl = `${API_BASE_URL}${file.url.startsWith('/') ? '' : '/'}${file.url}`
    }
    window.open(fileUrl, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    // Add body classes
    document.body.className = 'page-template-default page page-investor-relations elementor-default elementor-kit-6330 elementor-page elementor-page-investor-relations'
    document.body.setAttribute('data-spy', 'scroll')
    document.body.setAttribute('data-offset', '80')

    return () => {
      document.body.className = ''
      document.body.removeAttribute('data-spy')
      document.body.removeAttribute('data-offset')
    }
  }, [])

  const handleSectionClick = (section) => {
    if (section === 'annual-return') {
      setIsAnnualReturnExpanded(!isAnnualReturnExpanded)
      setActiveSection('annual-return')
      // Clear active year when clicking main section
      setActiveYear('')
    } else if (section === 'notice') {
      setActiveSection('notice')
      // Clear active year when clicking main section
      setActiveYear('')
      // Auto-expand all notice years when notice section is activated (if no year selected)
      if (filesBySection && filesBySection['notice'] && !activeYear) {
        const noticeYears = Object.keys(filesBySection['notice'])
        const expandedNoticeYears = {}
        noticeYears.forEach(year => {
          expandedNoticeYears[year] = true
        })
        setExpandedYears(prev => ({ ...prev, ...expandedNoticeYears }))
      }
    } else {
      setActiveSection(section)
      setActiveYear('')
    }
  }

  const handleYearClick = (year) => {
    setActiveYear(year)
    setActiveSection('annual-return')
    setIsAnnualReturnExpanded(true) // Keep expanded when year is selected
    // Expand only the selected year, collapse others
    setExpandedYears({ [year]: true })
  }

  const toggleYearDropdown = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }))
  }

  return (
    <div id="page" className="site investor-relations">
      <a className="skip-link screen-reader-text" href="#content"></a>
      <Header />
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <article className="enerzee-panel post-investor-relations page type-page status-publish hentry">
                <div className="panel-content">
                  <div className="container">
                    <div className="sf-content">
                      <div data-elementor-type="wp-page" data-elementor-id="investor-relations" className="elementor elementor-investor-relations">
                        
                        {/* Hero Banner Section */}
                        <section 
                          data-particle_enable="false" 
                          data-particle-mobile-disabled="false" 
                          className="elementor-section elementor-top-section elementor-element elementor-element-investor-hero elementor-section-height-min-height elementor-section-stretched elementor-section-full_width elementor-section-items-center elementor-section-height-default"
                          data-id="investor-hero"
                          data-element_type="section"
                          data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
                          fetchPriority="high"
                          style={{
                            backgroundImage: `url('${heroData.backgroundImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            backgroundAttachment: 'fixed',
                            minHeight: '400px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            width: '100vw',
                            maxWidth: '100vw',
                            marginLeft: 'calc(-50vw + 50%)',
                            marginRight: 'calc(-50vw + 50%)',
                            left: 0,
                            right: 0,
                            padding: '60px 0',
                            overflow: 'hidden'
                          }}
                        >
                          <div className="elementor-background-overlay" style={{
                            backgroundColor: '#000000',
                            opacity: 0.5,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1
                          }}></div>
                          <div className="elementor-container elementor-column-gap-default" style={{ position: 'relative', zIndex: 2 }}>
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
                                      {heroData.title}
                                    </h1>
                                   
                                  </div>
                                </div>
                           
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Investor Relations Section */}
                        <section 
                          className="elementor-section elementor-top-section elementor-element elementor-element-investor-relations elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                          data-id="investor-relations"
                          data-element_type="section"
                        >
                          <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column">
                              <div className="elementor-widget-wrap elementor-element-populated">
                                {/* Two Column Layout */}
                                <div className="elementor-element elementor-element-investor-content elementor-widget elementor-widget-html" data-id="investor-content" data-element_type="widget" data-widget_type="html.default">
                                  <div className="elementor-widget-container">
                                    <div className="investor-relations-layout">
                                      {/* Left Sidebar */}
                                      <div className="investor-sidebar">
                                        <div className="sidebar-nav">
                                          {menuItems.map((item) => {
                                            if (item.id === 'annual-return' && item.hasSubItems) {
                                              return (
                                                <React.Fragment key={item.id}>
                                                  <button 
                                                    className={`sidebar-nav-item sidebar-nav-parent ${activeSection === 'annual-return' ? 'active' : ''} ${isAnnualReturnExpanded ? 'expanded' : ''}`}
                                                    onClick={() => handleSectionClick('annual-return')}
                                                  >
                                                    <span>{item.label}</span>
                                                    <i className={`fa fa-chevron-${isAnnualReturnExpanded ? 'down' : 'right'}`}></i>
                                                  </button>
                                                  {isAnnualReturnExpanded && years.length > 0 ? (
                                                    years.map((year) => (
                                                      <button 
                                                        key={year}
                                                        className={`sidebar-nav-item sidebar-nav-link ${activeSection === 'annual-return' && activeYear === year ? 'active' : ''}`}
                                                        onClick={() => handleYearClick(year)}
                                                      >
                                                        FY {year}
                                                      </button>
                                                    ))
                                                  ) : isAnnualReturnExpanded ? (
                                                    <div className="sidebar-nav-item" style={{ padding: '10px', fontSize: '14px', opacity: 0.7 }}>
                                                      No years available
                                                    </div>
                                                  ) : null}
                                                </React.Fragment>
                                              )
                                            } else if (item.id === 'notice') {
                                              return (
                                                <button
                                                  key={item.id}
                                                  className={`sidebar-nav-item ${activeSection === 'notice' ? 'active' : ''}`}
                                                  onClick={() => handleSectionClick('notice')}
                                                >
                                                  {item.label}
                                                </button>
                                              )
                                            } else {
                                              return (
                                                <button
                                                  key={item.id}
                                                  className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
                                                  onClick={() => handleSectionClick(item.id)}
                                                >
                                                  {item.label}
                                                </button>
                                              )
                                            }
                                          })}
                                        </div>
                                      </div>

                                      {/* Right Content Area */}
                                      <div className="investor-content-area">
                                        {activeSection === 'annual-return' && (
                                          <div className="content-wrapper">
                                            <h2 className="content-heading">
                                              Annual Return
                                            </h2>
                                            
                                            {/* Dropdown/Accordion for Years */}
                                            {loading ? (
                                              <div className="content-message">
                                                <p>Loading files...</p>
                                              </div>
                                            ) : years.length > 0 ? (
                                              <div className="annual-returns-accordion" style={{ marginTop: '30px' }}>
                                                {years
                                                  .filter(year => {
                                                    // If a year is selected from menu, show only that year
                                                    // Otherwise show all years
                                                    return activeYear ? year === activeYear : true
                                                  })
                                                  .map((year) => {
                                                    const isExpanded = expandedYears[year] !== undefined ? expandedYears[year] : (activeYear ? year === activeYear : false)
                                                    const yearFiles = filesData[year] || []
                                                  
                                                  return (
                                                    <div key={year} className="year-dropdown-item" style={{
                                                      marginBottom: '15px',
                                                      border: '1px solid #e0e0e0',
                                                      borderRadius: '12px',
                                                      overflow: 'hidden',
                                                      backgroundColor: '#FFFFFF',
                                                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                                      transition: 'all 0.3s ease'
                                                    }}>
                                                      {/* Year Header - Clickable */}
                                                      <div
                                                        className="year-dropdown-header"
                                                        onClick={() => toggleYearDropdown(year)}
                                                        style={{
                                                          padding: '20px 25px',
                                                          backgroundColor: isExpanded ? '#FFF9F8' : '#FFFFFF',
                                                          cursor: 'pointer',
                                                          display: 'flex',
                                                          justifyContent: 'space-between',
                                                          alignItems: 'center',
                                                          transition: 'background-color 0.3s ease'
                                                        }}
                                                      >
                                                        <h3 style={{
                                                          fontFamily: '"Poppins", Sans-serif',
                                                          fontSize: '22px',
                                                          fontWeight: 600,
                                                          color: '#5D3F3A',
                                                          margin: 0
                                                        }}>
                                                          FY {year}
                                                        </h3>
                                                       
                                                      </div>

                                                      {/* Year Content - Files List */}
                                                      {isExpanded && (
                                                        <div className="year-dropdown-content" style={{
                                                          padding: '0 25px 25px 25px',
                                                          borderTop: '1px solid #e0e0e0',
                                                          backgroundColor: '#FFFFFF'
                                                        }}>
                                                          {yearFiles.length > 0 ? (
                                                            <div className="files-list" style={{ marginTop: '20px' }}>
                                                              {yearFiles.map((file) => {
                                                                // Determine icon based on file type
                                                                let iconClass = 'fa-file-pdf'
                                                                if (file.type === 'doc' || file.type === 'docx') {
                                                                  iconClass = 'fa-file-word'
                                                                } else if (file.type === 'xls' || file.type === 'xlsx') {
                                                                  iconClass = 'fa-file-excel'
                                                                }

                                                                return (
                                                                  <div key={file.id} className="file-item" style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    padding: '15px',
                                                                    marginBottom: '12px',
                                                                    backgroundColor: '#FAFAFA',
                                                                    borderRadius: '8px',
                                                                    border: '1px solid #f0f0f0',
                                                                    transition: 'all 0.2s ease'
                                                                  }}>
                                                                    <div className="file-icon" style={{
                                                                      fontSize: '32px',
                                                                      color: '#F4553B',
                                                                      marginRight: '15px'
                                                                    }}>
                                                                      <i className={`fa ${iconClass}`}></i>
                                                                    </div>
                                                                    <div className="file-info" style={{ flex: 1 }}>
                                                                      <h4 className="file-name" style={{
                                                                        fontFamily: '"Poppins", Sans-serif',
                                                                        fontSize: '16px',
                                                                        fontWeight: 600,
                                                                        color: '#5D3F3A',
                                                                        margin: '0 0 8px 0'
                                                                      }}>{file.name}</h4>
                                                                      <div className="file-meta" style={{
                                                                        display: 'flex',
                                                                        gap: '15px',
                                                                        fontSize: '14px',
                                                                        color: '#888'
                                                                      }}>
                                                                        <span className="file-type" style={{
                                                                          textTransform: 'uppercase',
                                                                          fontWeight: 500
                                                                        }}>{file.type}</span>
                                                                        {file.size && <span className="file-size">{file.size}</span>}
                                                                       
                                                                      </div>
                                                                    </div>
                                                                    <div className="file-actions" style={{
                                                                      display: 'flex',
                                                                      gap: '10px',
                                                                      marginLeft: '15px'
                                                                    }}>
                                                                      <button 
                                                                        className="btn-view" 
                                                                        onClick={() => handleView(file)}
                                                                        title="View File"
                                                                        style={{
                                                                          padding: '8px 16px',
                                                                          backgroundColor: '#F4553B',
                                                                          color: '#FFFFFF',
                                                                          border: 'none',
                                                                          borderRadius: '6px',
                                                                          cursor: 'pointer',
                                                                          fontFamily: '"Poppins", Sans-serif',
                                                                          fontSize: '14px',
                                                                          fontWeight: 500,
                                                                          transition: 'background-color 0.2s ease',
                                                                          display: 'flex',
                                                                          alignItems: 'center',
                                                                          gap: '6px'
                                                                        }}
                                                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e0452b'}
                                                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#F4553B'}
                                                                      >
                                                                        <i className="fa fa-eye"></i>
                                                                        <span>View</span>
                                                                      </button>
                                                                      <button 
                                                                        className="btn-download" 
                                                                        onClick={() => handleDownload(file)}
                                                                        title="Download File"
                                                                        style={{
                                                                          padding: '8px 16px',
                                                                          backgroundColor: '#FFFFFF',
                                                                          color: '#F4553B',
                                                                          border: '2px solid #F4553B',
                                                                          borderRadius: '6px',
                                                                          cursor: 'pointer',
                                                                          fontFamily: '"Poppins", Sans-serif',
                                                                          fontSize: '14px',
                                                                          fontWeight: 500,
                                                                          transition: 'all 0.2s ease',
                                                                          display: 'flex',
                                                                          alignItems: 'center',
                                                                          gap: '6px'
                                                                        }}
                                                                        onMouseEnter={(e) => {
                                                                          e.target.style.backgroundColor = '#F4553B'
                                                                          e.target.style.color = '#FFFFFF'
                                                                        }}
                                                                        onMouseLeave={(e) => {
                                                                          e.target.style.backgroundColor = '#FFFFFF'
                                                                          e.target.style.color = '#F4553B'
                                                                        }}
                                                                      >
                                                                        <i className="fa fa-download"></i>
                                                                        <span>Download</span>
                                                                      </button>
                                                                    </div>
                                                                  </div>
                                                                )
                                                              })}
                                                            </div>
                                                          ) : (
                                                            <div className="content-message" style={{
                                                              padding: '30px 0',
                                                              textAlign: 'center',
                                                              color: '#888'
                                                            }}>
                                                              <p>No files available for FY {year} yet.</p>
                                                              <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
                                                                Files will be uploaded soon.
                                                              </p>
                                                            </div>
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            ) : (
                                              <div className="content-message" style={{
                                                padding: '40px 0',
                                                textAlign: 'center'
                                              }}>
                                                <p>No annual returns available yet.</p>
                                                <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
                                                  Files will be uploaded soon.
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                        {activeSection === 'notice' && (
                                          <div className="content-wrapper">
                                            <h2 className="content-heading">
                                              Notice of the General meetings
                                            </h2>
                                            
                                            {/* Dropdown/Accordion for Notice Years - Filtered by Menu Selection */}
                                            {loading ? (
                                              <div className="content-message">
                                                <p>Loading files...</p>
                                              </div>
                                            ) : (() => {
                                              // Get notice years
                                              const noticeSection = filesBySection && filesBySection['notice'] ? filesBySection['notice'] : {}
                                              let noticeYearsList = Object.keys(noticeSection).filter(y => y !== 'general').sort().reverse()
                                              if (noticeSection['general']) {
                                                noticeYearsList.push('general')
                                              }
                                              
                                              // Filter by activeYear if set (from menu click)
                                              if (activeYear && noticeYearsList.includes(activeYear)) {
                                                noticeYearsList = [activeYear]
                                              }
                                              
                                              return noticeYearsList.length > 0 ? (
                                                <div className="annual-returns-accordion" style={{ marginTop: '30px' }}>
                                                  {noticeYearsList.map((year) => {
                                                    // Auto-expand selected year or all if none selected
                                                    const isExpanded = expandedYears[year] !== undefined ? expandedYears[year] : (activeYear ? year === activeYear : true)
                                                    // Get notice files for this year from filesBySection
                                                    const yearFiles = noticeSection[year] || []
                                                    
                                                    return (
                                                      <div key={year} className="year-dropdown-item" style={{
                                                        marginBottom: '15px',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        backgroundColor: '#FFFFFF',
                                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                                        transition: 'all 0.3s ease'
                                                      }}>
                                                        {/* Year Header - Clickable */}
                                                        <div
                                                          className="year-dropdown-header"
                                                          onClick={() => toggleYearDropdown(year)}
                                                          style={{
                                                            padding: '20px 25px',
                                                            backgroundColor: isExpanded ? '#FFF9F8' : '#FFFFFF',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            transition: 'background-color 0.3s ease'
                                                          }}
                                                        >
                                                          <h3 style={{
                                                            fontFamily: '"Poppins", Sans-serif',
                                                            fontSize: '22px',
                                                            fontWeight: 600,
                                                            color: '#5D3F3A',
                                                            margin: 0
                                                          }}>
                                                            {year !== 'general' ? `FY ${year}` : 'General Notices'}
                                                          </h3>
                                                         
                                                        </div>

                                                        {/* Year Content - Files List - Auto Expanded */}
                                                        {isExpanded && (
                                                          <div className="year-dropdown-content" style={{
                                                            padding: '0 25px 25px 25px',
                                                            borderTop: '1px solid #e0e0e0',
                                                            backgroundColor: '#FFFFFF'
                                                          }}>
                                                            {yearFiles.length > 0 ? (
                                                              <div className="files-list" style={{ marginTop: '20px' }}>
                                                                {yearFiles.map((file) => {
                                                                  // Determine icon based on file type
                                                                  let iconClass = 'fa-file-pdf'
                                                                  if (file.type === 'doc' || file.type === 'docx') {
                                                                    iconClass = 'fa-file-word'
                                                                  } else if (file.type === 'xls' || file.type === 'xlsx') {
                                                                    iconClass = 'fa-file-excel'
                                                                  }

                                                                  return (
                                                                    <div key={file.id} className="file-item" style={{
                                                                      display: 'flex',
                                                                      alignItems: 'center',
                                                                      padding: '15px',
                                                                      marginBottom: '12px',
                                                                      backgroundColor: '#FAFAFA',
                                                                      borderRadius: '8px',
                                                                      border: '1px solid #f0f0f0',
                                                                      transition: 'all 0.2s ease'
                                                                    }}>
                                                                      <div className="file-icon" style={{
                                                                        fontSize: '32px',
                                                                        color: '#F4553B',
                                                                        marginRight: '15px'
                                                                      }}>
                                                                        <i className={`fa ${iconClass}`}></i>
                                                                      </div>
                                                                      <div className="file-info" style={{ flex: 1 }}>
                                                                        <h4 className="file-name" style={{
                                                                          fontFamily: '"Poppins", Sans-serif',
                                                                          fontSize: '16px',
                                                                          fontWeight: 600,
                                                                          color: '#5D3F3A',
                                                                          margin: '0 0 8px 0'
                                                                        }}>{file.name}</h4>
                                                                        <div className="file-meta" style={{
                                                                          display: 'flex',
                                                                          gap: '15px',
                                                                          fontSize: '14px',
                                                                          color: '#888'
                                                                        }}>
                                                                          <span className="file-type" style={{
                                                                            textTransform: 'uppercase',
                                                                            fontWeight: 500
                                                                          }}>{file.type}</span>
                                                                          {file.size && <span className="file-size">{file.size}</span>}
                                                                        
                                                                        </div>
                                                                      </div>
                                                                    <div className="file-actions" style={{
                                                                      display: 'flex',
                                                                      gap: '10px',
                                                                      marginLeft: '15px',
                                                                      visibility: 'visible',
                                                                      opacity: 1,
                                                                      minWidth: 'fit-content',
                                                                      flexShrink: 0
                                                                    }}>
                                                                        <button 
                                                                          className="btn-view" 
                                                                          onClick={() => handleView(file)}
                                                                          title="View File"
                                                                          style={{
                                                                            padding: '8px 16px',
                                                                            backgroundColor: '#F4553B',
                                                                            color: '#FFFFFF',
                                                                            border: 'none',
                                                                            borderRadius: '6px',
                                                                            cursor: 'pointer',
                                                                            fontFamily: '"Poppins", Sans-serif',
                                                                            fontSize: '14px',
                                                                            fontWeight: 500,
                                                                            transition: 'background-color 0.2s ease',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '6px',
                                                                            visibility: 'visible',
                                                                            opacity: 1
                                                                          }}
                                                                          onMouseEnter={(e) => e.target.style.backgroundColor = '#e0452b'}
                                                                          onMouseLeave={(e) => e.target.style.backgroundColor = '#F4553B'}
                                                                        >
                                                                          <i className="fa fa-eye"></i>
                                                                          <span>View</span>
                                                                        </button>
                                                                        <button 
                                                                          className="btn-download" 
                                                                          onClick={() => handleDownload(file)}
                                                                          title="Download File"
                                                                          style={{
                                                                            padding: '8px 16px',
                                                                            backgroundColor: '#FFFFFF',
                                                                            color: '#F4553B',
                                                                            border: '2px solid #F4553B',
                                                                            borderRadius: '6px',
                                                                            cursor: 'pointer',
                                                                            fontFamily: '"Poppins", Sans-serif',
                                                                            fontSize: '14px',
                                                                            fontWeight: 500,
                                                                            transition: 'all 0.2s ease',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '6px',
                                                                            visibility: 'visible',
                                                                            opacity: 1,
                                                                            position: 'relative',
                                                                            zIndex: 1
                                                                          }}
                                                                          onMouseEnter={(e) => {
                                                                            e.target.style.backgroundColor = '#F4553B'
                                                                            e.target.style.color = '#FFFFFF'
                                                                          }}
                                                                          onMouseLeave={(e) => {
                                                                            e.target.style.backgroundColor = '#FFFFFF'
                                                                            e.target.style.color = '#F4553B'
                                                                          }}
                                                                        >
                                                                          <i className="fa fa-download"></i>
                                                                          <span>Download</span>
                                                                        </button>
                                                                      </div>
                                                                    </div>
                                                                  )
                                                                })}
                                                              </div>
                                                            ) : (
                                                              <div className="content-message" style={{
                                                                padding: '30px 0',
                                                                textAlign: 'center',
                                                                color: '#888'
                                                              }}>
                                                                <p>No files available for {year !== 'general' ? `FY ${year}` : 'General'} yet.</p>
                                                                <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
                                                                  Files will be uploaded soon.
                                                                </p>
                                                              </div>
                                                            )}
                                                          </div>
                                                        )}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              ) : (
                                                <div className="content-message" style={{
                                                  padding: '40px 0',
                                                  textAlign: 'center'
                                                }}>
                                                  <p>No notices available yet.</p>
                                                  <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
                                                    Files will be uploaded soon.
                                                  </p>
                                                </div>
                                              )
                                            })()}
                                          </div>
                                        )}
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

export default InvestorRelations


