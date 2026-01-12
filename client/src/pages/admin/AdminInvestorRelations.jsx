import React, { useState, useEffect } from 'react'
import './Admin.css'

const AdminInvestorRelations = () => {
  const [heroData, setHeroData] = useState({
    title: 'Investor Relations',
    description: 'Stay informed about our financial performance and corporate governance.',
    backgroundImage: 'https://refexmobility.com/wp-content/uploads/2025/07/investor-banner.webp'
  })

  const [menuItems, setMenuItems] = useState([
    { id: 'annual-return', label: 'Annual Return', hasSubItems: true },
    { id: 'notice', label: 'Notice of the General meetings', hasSubItems: false }
  ])

  const [years, setYears] = useState(['2024-25', '2025-26'])
  const [filesData, setFilesData] = useState({
    '2024-25': [],
    '2025-26': []
  })
  const [filesBySection, setFilesBySection] = useState({}) // Store files by section

  const [newFile, setNewFile] = useState({
    section: 'annual-return',
    year: '2024-25',
    name: '',
    url: '',
    type: 'pdf',
    size: '',
    date: ''
  })
  const [activeSection, setActiveSection] = useState('annual-return') // Track which section is active

  const [editingFile, setEditingFile] = useState(null)
  const [newYear, setNewYear] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [expandedYears, setExpandedYears] = useState({}) // Track which years are expanded in admin
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

  // Load data from database and localStorage on mount
  useEffect(() => {
    // Load hero and menu from localStorage (can be moved to database later)
    const savedHeroData = localStorage.getItem('investorHeroData')
    const savedMenuItems = localStorage.getItem('investorMenuItems')

    if (savedHeroData) {
      setHeroData(JSON.parse(savedHeroData))
    }
    if (savedMenuItems) {
      setMenuItems(JSON.parse(savedMenuItems))
    }

    // Load files from database
    loadFilesFromDatabase()
  }, [])

  // Load files and years from database
  const loadFilesFromDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/investor/files`)
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          // Handle both new filesBySection and backward compatible filesByYear
          if (result.data.filesBySection) {
            // Store files by section
            setFilesBySection(result.data.filesBySection)
            // For annual return section, extract year-based files
            const annualReturnFiles = result.data.filesBySection['annual-return'] || {}
            setFilesData(annualReturnFiles)
            // Extract unique years from annual return files
            const apiYears = Object.keys(annualReturnFiles).sort().reverse()
            setYears(apiYears)
            // Set default year if available
            if (apiYears && apiYears.length > 0) {
              setNewFile(prev => ({ ...prev, year: apiYears[0] }))
              // Expand all years by default in admin
              const expandedState = {}
              apiYears.forEach(year => {
                expandedState[year] = true
              })
              setExpandedYears(expandedState)
            }
          } else {
            // Backward compatibility
            setFilesData(result.data.filesByYear || {})
            const apiYears = result.data.years || []
            setYears(apiYears)
            // Set default year if available
            if (apiYears && apiYears.length > 0) {
              setNewFile(prev => ({ ...prev, year: apiYears[0] }))
              // Expand all years by default in admin
              const expandedState = {}
              apiYears.forEach(year => {
                expandedState[year] = true
              })
              setExpandedYears(expandedState)
            }
          }
        }
      } else {
        console.error('Failed to load files from database')
      }
    } catch (error) {
      console.error('Error loading files:', error)
      // Fallback to localStorage if API fails
      const savedYears = localStorage.getItem('investorYears')
      const savedFilesData = localStorage.getItem('investorFilesData')
      if (savedYears) {
        setYears(JSON.parse(savedYears))
      }
      if (savedFilesData) {
        setFilesData(JSON.parse(savedFilesData))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleHeroSave = () => {
    localStorage.setItem('investorHeroData', JSON.stringify(heroData))
    showSaveMessage('Hero section saved successfully!')
  }

  const handleMenuSave = () => {
    localStorage.setItem('investorMenuItems', JSON.stringify(menuItems))
    showSaveMessage('Menu items saved successfully!')
  }

  const handleAddYear = () => {
    if (newYear && !years.includes(newYear)) {
      const updatedYears = [...years, newYear].sort().reverse()
      setYears(updatedYears)
      setFilesData({ ...filesData, [newYear]: [] })
      setNewYear('')
      showSaveMessage('Year added successfully! Note: Years are automatically generated from uploaded files.')
    }
  }

  const handleAddFile = async () => {
    if (!newFile.name) {
      showSaveMessage('Please enter a file name')
      return
    }

    if (!selectedFile) {
      showSaveMessage('Please select a file to upload')
      return
    }

    // Upload and save in one step
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      // CRITICAL: Always send section - use activeSection or newFile.section
      const sectionToSave = activeSection || newFile.section || 'annual-return'
      formData.append('section', sectionToSave)
      formData.append('name', newFile.name)
      formData.append('type', newFile.type)
      formData.append('date', newFile.date || new Date().toISOString().split('T')[0])
      // Year is optional for notice section
      if (sectionToSave === 'annual-return' && newFile.year) {
        formData.append('year', newFile.year)
      } else if (sectionToSave === 'notice') {
        // For notice, use date as year identifier or the selected year if provided
        formData.append('year', newFile.year || newFile.date || new Date().toISOString().split('T')[0])
      }

      const response = await fetch(`${API_BASE_URL}/api/investor/files`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save file')
      }

      const result = await response.json()
      if (result.success) {
        showSaveMessage('File uploaded and saved successfully!')
        // Reload files from database to refresh display
        await loadFilesFromDatabase()
        // Reset form but keep the current section
        setNewFile({
          section: activeSection || newFile.section,
          year: (activeSection || newFile.section) === 'annual-return' && years.length > 0 ? years[0] : '',
          name: '',
          url: '',
          type: 'pdf',
          size: '',
          date: ''
        })
        setSelectedFile(null)
        const fileInput = document.getElementById('file-upload-input')
        if (fileInput) fileInput.value = ''
      }
    } catch (error) {
      console.error('Error saving file:', error)
      showSaveMessage(`Failed to save file: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleEditFile = (file) => {
    setEditingFile(file)
    setNewFile({
      section: file.section || 'annual-return',
      year: file.year || newFile.year,
      name: file.name,
      url: file.url,
      type: file.type,
      size: file.size,
      date: file.date
    })
    setActiveSection(file.section || 'annual-return')
  }

  const handleUpdateFile = async () => {
    if (!editingFile || !newFile.name) {
      showSaveMessage('Please fill in all required fields')
      return
    }

    try {
      const updateData = {
        section: newFile.section || editingFile.section || 'annual-return',
        name: newFile.name,
        type: newFile.type,
        date: newFile.date || editingFile.date,
      }
      // Year is required for annual-return, optional for notice
      if (newFile.section === 'annual-return' && newFile.year) {
        updateData.year = newFile.year
      } else if (newFile.section === 'notice') {
        updateData.year = newFile.date || editingFile.date || new Date().toISOString().split('T')[0]
      }
      if (newFile.size) {
        updateData.size = newFile.size
      }

      const response = await fetch(`${API_BASE_URL}/api/investor/files/${editingFile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update file')
      }

      const result = await response.json()
      if (result.success) {
        showSaveMessage('File updated successfully!')
        // Reload files from database
        await loadFilesFromDatabase()
        setEditingFile(null)
        setNewFile({
          section: newFile.section,
          year: newFile.section === 'annual-return' ? newFile.year : '',
          name: '',
          url: '',
          type: 'pdf',
          size: '',
          date: ''
        })
      }
    } catch (error) {
      console.error('Error updating file:', error)
      showSaveMessage(`Failed to update file: ${error.message}`)
    }
  }

  const handleDeleteFile = async (year, fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/investor/files/${fileId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete file')
      }

      const result = await response.json()
      if (result.success) {
        showSaveMessage('File deleted successfully!')
        // Reload files from database
        await loadFilesFromDatabase()
      }
    } catch (error) {
      console.error('Error deleting file:', error)
      showSaveMessage(`Failed to delete file: ${error.message}`)
    }
  }

  const handleDeleteYear = async (year) => {
    if (!window.confirm(`Are you sure you want to delete all files for year ${year}?`)) {
      return
    }

    try {
      // Delete all files for this year
      const filesToDelete = filesData[year] || []
      const deletePromises = filesToDelete.map(file => 
        fetch(`${API_BASE_URL}/api/investor/files/${file.id}`, {
          method: 'DELETE',
        })
      )

      await Promise.all(deletePromises)
      showSaveMessage(`All files for year ${year} deleted successfully!`)
      // Reload files from database
      await loadFilesFromDatabase()
    } catch (error) {
      console.error('Error deleting year files:', error)
      showSaveMessage(`Failed to delete files: ${error.message}`)
    }
  }

  const showSaveMessage = (message) => {
    setSaveMessage(message)
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      // Auto-fill file name if empty
      if (!newFile.name) {
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
        setNewFile({ ...newFile, name: fileNameWithoutExt })
      }
    }
  }


  return (
    <div className="admin-investor-relations">
      <div className="admin-page-header">
        <h2>Investor Relations Content Management</h2>
        {saveMessage && <div className="admin-success-message">{saveMessage}</div>}
        {loading && <div className="admin-loading-message">Loading files...</div>}
      </div>

      {/* Hero Section Management */}
      <div className="admin-section-card">
        <h3>Hero Banner Section</h3>
        <div className="admin-form-group">
          <label>Title</label>
          <input
            type="text"
            value={heroData.title}
            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
            placeholder="Hero Title"
          />
        </div>
        <div className="admin-form-group">
          <label>Description</label>
          <textarea
            value={heroData.description}
            onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
            placeholder="Hero Description"
            rows="3"
          />
        </div>
        <div className="admin-form-group">
          <label>Background Image URL</label>
          <input
            type="text"
            value={heroData.backgroundImage}
            onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
            placeholder="Image URL"
          />
        </div>
        <button onClick={handleHeroSave} className="admin-save-button">
          Save Hero Section
        </button>
      </div>

      {/* Menu Items Management */}
      <div className="admin-section-card">
        <h3>Menu Items</h3>
        {menuItems.map((item, index) => (
          <div key={item.id} className="admin-menu-item">
            <input
              type="text"
              value={item.label}
              onChange={(e) => {
                const updated = [...menuItems]
                updated[index].label = e.target.value
                setMenuItems(updated)
              }}
              placeholder="Menu Item Label"
            />
          </div>
        ))}
        <button onClick={handleMenuSave} className="admin-save-button">
          Save Menu Items
        </button>
      </div>

      {/* Years Management */}
      <div className="admin-section-card">
        <h3>Financial Years</h3>
        <div className="admin-years-list">
          {years.map((year) => (
            <div key={year} className="admin-year-item">
              <span>{year}</span>
              <button
                onClick={() => handleDeleteYear(year)}
                className="admin-delete-button"
                disabled={years.length <= 1}
              >
                <i className="fa fa-trash"></i> Delete
              </button>
            </div>
          ))}
        </div>
        <div className="admin-add-year">
          <input
            type="text"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            placeholder="Add new year (e.g., 2026-27)"
          />
          <button onClick={handleAddYear} className="admin-add-button">
            Add Year
          </button>
        </div>
      </div>

      {/* Files Management */}
      <div className="admin-section-card">
        <h3>Files Management</h3>
        
        {/* Section Tabs */}
        <div style={{ marginBottom: '25px', borderBottom: '2px solid #e0e0e0' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setNewFile(prev => ({ 
                    ...prev, 
                    section: item.id,
                    year: item.id === 'annual-return' && years.length > 0 ? years[0] : ''
                  }))
                }}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderBottom: activeSection === item.id ? '3px solid #F4553B' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  color: activeSection === item.id ? '#F4553B' : '#888',
                  fontFamily: '"Poppins", Sans-serif',
                  fontSize: '16px',
                  fontWeight: activeSection === item.id ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-file-form">
          <div className="admin-form-row" style={{ 
            gridTemplateColumns: (activeSection || newFile.section) === 'notice' ? '1fr 1fr 1fr' : '1fr 1fr' 
          }}>
            <div className="admin-form-group">
              <label>Section</label>
              <select
                value={activeSection || newFile.section}
                onChange={(e) => {
                  const selectedSection = e.target.value
                  setActiveSection(selectedSection)
                  setNewFile({ ...newFile, section: selectedSection, year: selectedSection === 'annual-return' && years.length > 0 ? years[0] : '' })
                }}
              >
                {menuItems.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>
            {(activeSection || newFile.section) === 'annual-return' && (
              <div className="admin-form-group">
                <label>Year</label>
                <select
                  value={newFile.year}
                  onChange={(e) => setNewFile({ ...newFile, year: e.target.value })}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            )}
            {(activeSection || newFile.section) === 'notice' && (
              <>
                <div className="admin-form-group">
                  <label>Year (Optional)</label>
                  <select
                    value={newFile.year || ''}
                    onChange={(e) => setNewFile({ ...newFile, year: e.target.value })}
                  >
                    <option value="">Select Year (Optional)</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newFile.date}
                    onChange={(e) => setNewFile({ ...newFile, date: e.target.value })}
                    placeholder="dd-mm-yyyy"
                  />
                </div>
              </>
            )}
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>File Name</label>
              <input
                type="text"
                value={newFile.name}
                onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                placeholder="File Name"
              />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Upload File</label>
              <div className="admin-file-upload-section">
                <input
                  id="file-upload-input"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileSelect}
                  className="admin-file-input"
                />
                {selectedFile && (
                  <span className="admin-selected-file">
                    Selected: {selectedFile.name}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>File Type</label>
              <select
                value={newFile.type}
                onChange={(e) => setNewFile({ ...newFile, type: e.target.value })}
              >
                <option value="pdf">PDF</option>
                <option value="doc">DOC</option>
                <option value="xls">XLS</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>File Size</label>
              <input
                type="text"
                value={newFile.size}
                onChange={(e) => setNewFile({ ...newFile, size: e.target.value })}
                placeholder="e.g., 2.5 MB (auto-filled after upload)"
                readOnly
              />
            </div>
            <div className="admin-form-group">
              <label>Date</label>
              <input
                type="date"
                value={newFile.date}
                onChange={(e) => setNewFile({ ...newFile, date: e.target.value })}
              />
            </div>
          </div>
          {editingFile ? (
            <div className="admin-form-actions">
              <button onClick={handleUpdateFile} className="admin-save-button">
                Update File
              </button>
              <button
                onClick={() => {
                  setEditingFile(null)
                  setNewFile({
                    year: newFile.year,
                    name: '',
                    url: '',
                    type: 'pdf',
                    size: '',
                    date: ''
                  })
                }}
                className="admin-cancel-button"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddFile} 
              className="admin-save-button"
              disabled={uploading || !selectedFile || !newFile.name}
            >
              {uploading ? (
                <>
                  <i className="fa fa-spinner fa-spin"></i> Uploading and Saving...
                </>
              ) : (
                <>
                  <i className="fa fa-upload"></i> Upload & Save File
                </>
              )}
            </button>
          )}
        </div>

        {/* Files List - Dropdown/Accordion Style */}
        <div className="admin-files-list">
          <h4>Existing Files - {menuItems.find(item => item.id === activeSection)?.label || 'Files'}</h4>
          {activeSection === 'annual-return' ? (
            years.length > 0 ? (
              <div className="admin-annual-returns-accordion" style={{ marginTop: '20px' }}>
                {years.map((year) => {
                  const isExpanded = expandedYears[year] !== undefined ? expandedYears[year] : true // Default expanded
                  // Get files only from annual-return section for this year
                  // Strictly filter: only show files with section='annual-return' or no section (backward compatibility for old files)
                  const yearFiles = (filesData[year] || []).filter(file => {
                    // Only include if section is 'annual-return' OR (no section exists AND has year - backward compat)
                    if (file.section) {
                      return file.section === 'annual-return'
                    }
                    // For backward compatibility: files without section field but with year (assumed to be annual return)
                    return !file.section && file.year
                  })
                
                return (
                  <div key={year} className="admin-year-dropdown-item" style={{
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
                      className="admin-year-dropdown-header"
                      onClick={() => setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }))}
                      style={{
                        padding: '18px 25px',
                        backgroundColor: isExpanded ? '#FFF9F8' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'background-color 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <h5 style={{
                          fontFamily: '"Poppins", Sans-serif',
                          fontSize: '20px',
                          fontWeight: 600,
                          color: '#5D3F3A',
                          margin: 0
                        }}>
                          FY {year}
                        </h5>
                        <span style={{
                          fontSize: '14px',
                          color: '#888',
                          fontWeight: 400
                        }}>
                          ({yearFiles.length} file{yearFiles.length !== 1 ? 's' : ''})
                        </span>
                      </div>
                      <i 
                        className={`fa fa-chevron-${isExpanded ? 'up' : 'down'}`}
                        style={{
                          fontSize: '16px',
                          color: '#F4553B',
                          transition: 'transform 0.3s ease'
                        }}
                      ></i>
                    </div>

                    {/* Year Content - Files Table */}
                    {isExpanded && (
                      <div className="admin-year-dropdown-content" style={{
                        padding: '0 25px 25px 25px',
                        borderTop: '1px solid #e0e0e0',
                        backgroundColor: '#FFFFFF'
                      }}>
                        {yearFiles.length > 0 ? (
                          <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                            <table className="admin-files-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '2px solid #e0e0e0' }}>
                                  <th style={{ padding: '12px', textAlign: 'left', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Name</th>
                                  <th style={{ padding: '12px', textAlign: 'left', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Type</th>
                                  <th style={{ padding: '12px', textAlign: 'left', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Size</th>
                                  <th style={{ padding: '12px', textAlign: 'left', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Date</th>
                                  <th style={{ padding: '12px', textAlign: 'center', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {yearFiles.map((file, index) => (
                                  <tr key={file.id} style={{ 
                                    borderBottom: '1px solid #f0f0f0',
                                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                                    transition: 'background-color 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF9F8'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}
                                  >
                                    <td style={{ padding: '15px 12px', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', color: '#5D3F3A' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <i className={`fa fa-file-${file.type === 'pdf' ? 'pdf' : file.type === 'doc' || file.type === 'docx' ? 'word' : 'excel'}`} style={{ color: '#F4553B', fontSize: '18px' }}></i>
                                        <span style={{ fontWeight: 500 }}>{file.name}</span>
                                      </div>
                                    </td>
                                    <td style={{ padding: '15px 12px', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', color: '#888', textTransform: 'uppercase' }}>{file.type}</td>
                                    <td style={{ padding: '15px 12px', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', color: '#888' }}>{file.size || 'N/A'}</td>
                                    <td style={{ padding: '15px 12px', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', color: '#888' }}>{file.date || 'N/A'}</td>
                                    <td style={{ padding: '15px 12px', textAlign: 'center' }}>
                                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                        <button
                                          onClick={() => handleEditFile({ ...file, year })}
                                          className="admin-edit-button"
                                          style={{
                                            padding: '6px 12px',
                                            fontSize: '13px',
                                            backgroundColor: '#F4553B',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontFamily: '"Poppins", Sans-serif',
                                            fontWeight: 500,
                                            transition: 'background-color 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                          }}
                                          onMouseEnter={(e) => e.target.style.backgroundColor = '#e0452b'}
                                          onMouseLeave={(e) => e.target.style.backgroundColor = '#F4553B'}
                                        >
                                          <i className="fa fa-edit"></i> Edit
                                        </button>
                                        <button
                                          onClick={() => handleDeleteFile(year, file.id)}
                                          className="admin-delete-button"
                                          style={{
                                            padding: '6px 12px',
                                            fontSize: '13px',
                                            backgroundColor: '#dc3545',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontFamily: '"Poppins", Sans-serif',
                                            fontWeight: 500,
                                            transition: 'background-color 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                          }}
                                          onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                                          onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                                        >
                                          <i className="fa fa-trash"></i> Delete
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div style={{
                            padding: '30px 0',
                            textAlign: 'center',
                            color: '#888',
                            fontFamily: '"Poppins", Sans-serif',
                            fontSize: '14px'
                          }}>
                            <p>No files for FY {year} yet.</p>
                            <p style={{ marginTop: '8px', opacity: 0.7 }}>
                              Upload files using the form above.
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
            <div style={{
              padding: '40px 0',
              textAlign: 'center',
              color: '#888',
              fontFamily: '"Poppins", Sans-serif'
            }}>
              <p>No years available yet. Add a year to get started.</p>
            </div>
          )
          ) : (
            /* Notice Section Files */
            <div className="admin-notice-files" style={{ marginTop: '20px' }}>
              {(() => {
                // Get notice files - prefer from filesBySection, otherwise filter from filesData
                let noticeFiles = []
                if (filesBySection && filesBySection['notice']) {
                  // Get all files from notice section
                  Object.values(filesBySection['notice']).forEach(fileArray => {
                    noticeFiles = noticeFiles.concat(fileArray || [])
                  })
                } else {
                  // Fallback: get all notice files from filesData
                  const allFiles = Object.values(filesData).flat()
                  // Only show files that are explicitly notice section
                  noticeFiles = allFiles.filter(file => file.section === 'notice')
                }
                // Group notice files by financial year (not date)
                const noticeFilesByYear = {}
                noticeFiles.forEach(file => {
                  // Use year field for grouping (financial year)
                  const yearKey = file.year || 'general'
                  if (!noticeFilesByYear[yearKey]) {
                    noticeFilesByYear[yearKey] = []
                  }
                  noticeFilesByYear[yearKey].push(file)
                })
                const sortedYears = Object.keys(noticeFilesByYear).filter(y => y !== 'general').sort().reverse()
                // Add 'general' at the end if it exists
                if (noticeFilesByYear['general']) {
                  sortedYears.push('general')
                }

                return sortedYears.length > 0 ? (
                  sortedYears.map((yearKey) => {
                    const isExpanded = expandedYears[yearKey] !== undefined ? expandedYears[yearKey] : true
                    const yearFiles = noticeFilesByYear[yearKey]

                    return (
                      <div key={yearKey} className="admin-year-dropdown-item" style={{
                        marginBottom: '15px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease'
                      }}>
                        <div
                          className="admin-year-dropdown-header"
                          onClick={() => setExpandedYears(prev => ({ ...prev, [yearKey]: !prev[yearKey] }))}
                          style={{
                            padding: '18px 25px',
                            backgroundColor: isExpanded ? '#FFF9F8' : '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'background-color 0.3s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <h5 style={{
                              fontFamily: '"Poppins", Sans-serif',
                              fontSize: '20px',
                              fontWeight: 600,
                              color: '#5D3F3A',
                              margin: 0
                            }}>
                              {yearKey !== 'general' ? `FY ${yearKey}` : 'General Notices'}
                            </h5>
                            <span style={{
                              fontSize: '14px',
                              color: '#888',
                              fontWeight: 400
                            }}>
                              ({yearFiles.length} file{yearFiles.length !== 1 ? 's' : ''})
                            </span>
                          </div>
                          <i 
                            className={`fa fa-chevron-${isExpanded ? 'up' : 'down'}`}
                            style={{
                              fontSize: '16px',
                              color: '#F4553B',
                              transition: 'transform 0.3s ease'
                            }}
                          ></i>
                        </div>

                        {isExpanded && (
                          <div className="admin-year-dropdown-content" style={{
                            padding: '0 25px 25px 25px',
                            borderTop: '1px solid #e0e0e0',
                            backgroundColor: '#FFFFFF'
                          }}>
                            <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                              <table className="admin-files-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                  <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '2px solid #e0e0e0' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Name</th>
                                    <th style={{ padding: '12px', textAlign: 'left', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Type</th>
                                    <th style={{ padding: '12px', textAlign: 'left', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Size</th>
                                    <th style={{ padding: '12px', textAlign: 'left', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Date</th>
                                    <th style={{ padding: '12px', textAlign: 'center', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', fontWeight: 600, color: '#5D3F3A' }}>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {yearFiles.map((file, index) => (
                                    <tr key={file.id} style={{ 
                                      borderBottom: '1px solid #f0f0f0',
                                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                                      transition: 'background-color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF9F8'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}
                                    >
                                      <td style={{ padding: '15px 12px', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', color: '#5D3F3A' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                          <i className={`fa fa-file-${file.type === 'pdf' ? 'pdf' : file.type === 'doc' || file.type === 'docx' ? 'word' : 'excel'}`} style={{ color: '#F4553B', fontSize: '18px' }}></i>
                                          <span style={{ fontWeight: 500 }}>{file.name}</span>
                                        </div>
                                      </td>
                                      <td style={{ padding: '15px 12px', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', color: '#888', textTransform: 'uppercase' }}>{file.type}</td>
                                      <td style={{ padding: '15px 12px', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', color: '#888' }}>{file.size || 'N/A'}</td>
                                      <td style={{ padding: '15px 12px', fontFamily: '"Poppins", Sans-serif', fontSize: '14px', color: '#888' }}>{file.date || 'N/A'}</td>
                                      <td style={{ padding: '15px 12px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                          <button
                                            onClick={() => handleEditFile({ ...file, year: yearKey })}
                                            className="admin-edit-button"
                                            style={{
                                              padding: '6px 12px',
                                              fontSize: '13px',
                                              backgroundColor: '#F4553B',
                                              color: '#FFFFFF',
                                              border: 'none',
                                              borderRadius: '6px',
                                              cursor: 'pointer',
                                              fontFamily: '"Poppins", Sans-serif',
                                              fontWeight: 500,
                                              transition: 'background-color 0.2s ease',
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '5px'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#e0452b'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#F4553B'}
                                          >
                                            <i className="fa fa-edit"></i> Edit
                                          </button>
                                          <button
                                            onClick={() => handleDeleteFile(yearKey, file.id)}
                                            className="admin-delete-button"
                                            style={{
                                              padding: '6px 12px',
                                              fontSize: '13px',
                                              backgroundColor: '#dc3545',
                                              color: '#FFFFFF',
                                              border: 'none',
                                              borderRadius: '6px',
                                              cursor: 'pointer',
                                              fontFamily: '"Poppins", Sans-serif',
                                              fontWeight: 500,
                                              transition: 'background-color 0.2s ease',
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '5px'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                                          >
                                            <i className="fa fa-trash"></i> Delete
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })
                ) : (
                  <div style={{
                    padding: '40px 0',
                    textAlign: 'center',
                    color: '#888',
                    fontFamily: '"Poppins", Sans-serif'
                  }}>
                    <p>No notice files available yet.</p>
                    <p style={{ marginTop: '8px', opacity: 0.7 }}>
                      Upload files using the form above.
                    </p>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminInvestorRelations

