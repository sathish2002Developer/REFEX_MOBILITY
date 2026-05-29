import React, { useEffect, useState, Fragment } from 'react'
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
  const ACTIVE_SECTION_KEY = 'investorActiveSection'
  const ACTIVE_YEAR_KEY = 'investorActiveYear'
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://refexmobility.com'
  
  // Load data from localStorage or use defaults
  const [heroData, setHeroData] = useState({
    title: 'Investor Relations',
    description: 'Building trust through transparency. Access our financial reports, annual returns, and investor communications to stay informed about our growth and performance.',
    backgroundImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1920&auto=format&fit=crop'
  })
  
  const [menuItems, setMenuItems] = useState([
    { id: 'annual-return', label: 'Annual Return', hasSubItems: true },
    { id: 'notice', label: 'General Meetings', hasSubItems: false },
    { id: 'policies', label: 'Policies', hasSubItems: false },
  ])
  
  const [years, setYears] = useState([])
  const [filesData, setFilesData] = useState({})
  const [filesBySection, setFilesBySection] = useState({}) // Store files by section
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
          
          const annual = sectionData['annual-return'] || {}
          setFilesData(Object.keys(annual).length ? annual : (result.data.filesByYear || {}))
          const apiYears =
            (result.data.years && result.data.years.length > 0)
              ? result.data.years
              : Object.keys(annual).sort().reverse()
          setYears(apiYears)
          
          // Set active year to first available year if not set
          setActiveYear((prevYear) => {
            if (!prevYear && apiYears.length > 0) {
              setIsAnnualReturnExpanded(true)
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

  const applyMenuItems = (itemsToSet) => {
    setMenuItems(itemsToSet)
    if (itemsToSet.length > 0) {
      const storedSection = localStorage.getItem(ACTIVE_SECTION_KEY)
      const storedYear = localStorage.getItem(ACTIVE_YEAR_KEY) || ''
      const resolvedSection = itemsToSet.some((m) => m.id === storedSection)
        ? storedSection
        : itemsToSet[0].id
      setActiveSection(resolvedSection)
      localStorage.setItem(ACTIVE_SECTION_KEY, resolvedSection)

      setActiveYear(storedYear)
      if (storedYear) {
        setExpandedYears({ [storedYear]: true })
      }

      const selected = itemsToSet.find((m) => m.id === resolvedSection)
      if (selected?.hasSubItems && resolvedSection === 'annual-return') {
        setIsAnnualReturnExpanded(true)
      }
    }
  }

  // Load data on mount
  useEffect(() => {
    const loadMenu = async () => {
      const fallback = [
        { id: 'annual-return', label: 'Annual Return', hasSubItems: true },
        { id: 'notice', label: 'General Meetings', hasSubItems: false },
        { id: 'policies', label: 'Policies', hasSubItems: false },
      ]
      try {
        const response = await fetch(`${API_BASE_URL}/api/investor/menu`)
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data?.items?.length) {
            const mapped = result.data.items.map((x) => ({
              id: x.id,
              label: x.label,
              hasSubItems: !!x.hasSubItems,
            }))
            applyMenuItems(mapped)
            return
          }
        }
      } catch (e) {
        console.warn('Investor menu API unavailable, using cache', e)
      }
      const savedMenuItems = localStorage.getItem('investorMenuItems')
      if (savedMenuItems) {
        try {
          const parsed = JSON.parse(savedMenuItems)
          if (Array.isArray(parsed) && parsed.length) {
            applyMenuItems(parsed)
            return
          }
        } catch (_) {}
      }
      applyMenuItems(fallback)
    }

    loadMenu()
    loadFilesFromAPI()
  }, [])

const handleDownload = (file) => {
  let fileUrl = file.url

  // Fix relative URL
  if (fileUrl && !fileUrl.startsWith('http')) {
    fileUrl = `${API_BASE_URL}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`
  }

  // Fix wrong https//
  fileUrl = fileUrl.replace('https//', 'https://')

  // File name
  let fileName = file.name || file.originalName || 'download'

  if (!fileName.includes('.')) {
    const extension =
      file.type === 'pdf' ? '.pdf' :
      file.type === 'doc' ? '.doc' :
      file.type === 'docx' ? '.docx' :
      file.type === 'xls' ? '.xls' :
      file.type === 'xlsx' ? '.xlsx' : '.pdf'
    fileName += extension
  }

  // Force download
  const link = document.createElement('a')
  link.href = fileUrl
  link.setAttribute('download', fileName)
  link.setAttribute('target', '_self') // IMPORTANT: no new tab
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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
      localStorage.setItem(ACTIVE_SECTION_KEY, 'annual-return')
      setActiveYear('')
      localStorage.removeItem(ACTIVE_YEAR_KEY)
      return
    }
    setActiveSection(section)
    localStorage.setItem(ACTIVE_SECTION_KEY, section)
    setActiveYear('')
    localStorage.removeItem(ACTIVE_YEAR_KEY)
  }

  const handleYearClick = (year) => {
    setActiveYear(year)
    setActiveSection('annual-return')
    localStorage.setItem(ACTIVE_SECTION_KEY, 'annual-return')
    localStorage.setItem(ACTIVE_YEAR_KEY, year)
    setIsAnnualReturnExpanded(true)
    setExpandedYears({ [year]: true })
  }

  const getAllFilesForSection = (sectionId) => {
    const sec = filesBySection?.[sectionId] || {}
    return Object.keys(sec).length ? Object.values(sec).flat() : []
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
                          fetchpriority="high"
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
                                              const sectionYears = years
                                              const expanded = isAnnualReturnExpanded
                                              return (
                                                <Fragment key={item.id}>
                                                  <button
                                                    className={`sidebar-nav-item sidebar-nav-parent ${activeSection === item.id ? 'active' : ''} ${expanded ? 'expanded' : ''}`}
                                                    type="button"
                                                    onClick={() => handleSectionClick(item.id)}
                                                  >
                                                    <span>{item.label}</span>
                                                    <i className={`fa fa-chevron-${expanded ? 'down' : 'right'}`}></i>
                                                  </button>
                                                  {expanded && sectionYears.length > 0 ? (
                                                    sectionYears.map((year) => (
                                                      <button
                                                        key={`${item.id}-${year}`}
                                                        type="button"
                                                        className={`sidebar-nav-item sidebar-nav-link ${activeSection === item.id && activeYear === year ? 'active' : ''}`}
                                                        onClick={() => handleYearClick(year)}
                                                      >
                                                        {year === 'general' ? 'General' : `FY ${year}`}
                                                      </button>
                                                    ))
                                                  ) : expanded ? (
                                                    <div className="sidebar-nav-item" style={{ padding: '10px', fontSize: '14px', opacity: 0.7 }}>
                                                      No years available
                                                    </div>
                                                  ) : null}
                                                </Fragment>
                                              )
                                            }
                                            if (item.id === 'notice') {
                                              return (
                                                <button
                                                  key={item.id}
                                                  type="button"
                                                  className={`sidebar-nav-item ${activeSection === 'notice' ? 'active' : ''}`}
                                                  onClick={() => handleSectionClick('notice')}
                                                >
                                                  {item.label}
                                                </button>
                                              )
                                            }
                                            return (
                                              <button
                                                key={item.id}
                                                type="button"
                                                className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
                                                onClick={() => handleSectionClick(item.id)}
                                              >
                                                {item.label}
                                              </button>
                                            )
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
                                        {activeSection !== 'annual-return' && (
                                          <div className="content-wrapper">
                                            <h2 className="content-heading">
                                              {menuItems.find((m) => m.id === activeSection)?.label || 'Documents'}
                                            </h2>
                                            {loading ? (
                                              <div className="content-message">
                                                <p>Loading files...</p>
                                              </div>
                                            ) : (() => {
                                              const allFiles = getAllFilesForSection(activeSection)
                                              if (!allFiles.length) {
                                                return (
                                                  <div className="content-message">
                                                    <p>No documents in this section yet.</p>
                                                  </div>
                                                )
                                              }
                                              return (
                                                <div className="files-list">
                                                  {allFiles.map((file) => (
                                                    <div key={file.id} className="file-item">
                                                      <div className="file-info">
                                                        <h4 className="file-name">{file.name}</h4>
                                                      </div>
                                                      <div className="file-actions">
                                                        <button className="btn-view" type="button" onClick={() => handleView(file)}>
                                                          View
                                                        </button>
                                                        <button className="btn-download" type="button" onClick={() => handleDownload(file)}>
                                                          Download
                                                        </button>
                                                      </div>
                                                    </div>
                                                  ))}
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


