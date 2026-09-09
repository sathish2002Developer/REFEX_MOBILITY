import React, { useEffect, useState } from 'react'
import { CMS_PAGES, getCmsDefaults, mergeCmsPage } from '../../constants/cmsPageRegistry'
import { API_BASE_URL } from '../../constants/api'
import AdminImageField from '../../components/admin/AdminImageField'
import './Admin.css'

const HOME_SECTIONS = [
  { id: 'meta', label: 'Page Meta' },
  { id: 'hero', label: 'Hero' },
  { id: 'sustainabilityImpact', label: 'Sustainability' },
  { id: 'whyChooseUs', label: 'Why Choose Us' },
  { id: 'rideOptions', label: 'Ride Options' },
  { id: 'expandingNetwork', label: 'Network' },
  { id: 'fleet', label: 'Fleet' },
  { id: 'aboutUs', label: 'About Us' },
]

const DRIVE_SECTIONS = [
  { id: 'meta', label: 'Page Meta' },
  { id: 'hero', label: 'Hero' },
  { id: 'whyChooseUs', label: 'Why Drive For Us' },
  { id: 'faq', label: 'FAQ' },
]

const BUSINESS_SECTIONS = [
  { id: 'meta', label: 'Page Meta' },
  { id: 'hero', label: 'Hero' },
  { id: 'whyChooseRefex', label: 'Why Choose Refex' },
  { id: 'industries', label: 'Industries' },
  { id: 'faq', label: 'FAQ' },
]

const LEGAL_SECTIONS = [
  { id: 'meta', label: 'Page Meta' },
  { id: 'hero', label: 'Hero' },
  { id: 'body', label: 'Page Content' },
]

const ABOUT_SECTIONS = [
  { id: 'meta', label: 'Page Meta' },
  { id: 'hero', label: 'Hero' },
  { id: 'intro', label: 'Intro' },
  { id: 'brandValues', label: 'Brand Values' },
  { id: 'brandGoals', label: 'Brand Goals' },
  { id: 'leadership', label: 'Leadership Team' },
  { id: 'momentsMilestones', label: 'Moments & Milestones' },
]

const PAGE_SECTIONS = {
  home: HOME_SECTIONS,
  'about-us': ABOUT_SECTIONS,
  'drive-for-us': DRIVE_SECTIONS,
  'business-commute': BUSINESS_SECTIONS,
  'terms-and-conditions': LEGAL_SECTIONS,
  'privacy-policy': LEGAL_SECTIONS,
  'refunds-and-cancellation-policy': LEGAL_SECTIONS,
}

const AdminWebsiteHome = () => {
  const [activePageSlug, setActivePageSlug] = useState('home')
  const [activeSection, setActiveSection] = useState('meta')
  const [pageTitle, setPageTitle] = useState(() => getCmsDefaults('home').pageTitle)
  const [metaDescription, setMetaDescription] = useState(() => getCmsDefaults('home').metaDescription)
  const [sections, setSections] = useState(() => JSON.parse(JSON.stringify(getCmsDefaults('home').sections)))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const showMsg = (msg) => { setSaveMessage(msg); setTimeout(() => setSaveMessage(''), 3000) }
  const patch = (key, field, value) => setSections((p) => ({ ...p, [key]: { ...p[key], [field]: value } }))
  const patchList = (key, listKey, i, field, value) => {
    setSections((p) => {
      const list = [...(p[key][listKey] || [])]
      list[i] = { ...list[i], [field]: value }
      return { ...p, [key]: { ...p[key], [listKey]: list } }
    })
  }

  useEffect(() => {
    setLoading(true)
    const defaults = getCmsDefaults(activePageSlug)
    setPageTitle(defaults.pageTitle)
    setMetaDescription(defaults.metaDescription)
    setSections(JSON.parse(JSON.stringify(defaults.sections)))
    setActiveSection('meta')
    fetch(`${API_BASE_URL}/api/cms/pages/${activePageSlug}`)
      .then((r) => r.json())
      .then((result) => {
        if (result.success && result.data) {
          const merged = mergeCmsPage(activePageSlug, result.data)
          setPageTitle(merged.pageTitle)
          setMetaDescription(merged.metaDescription)
          setSections(merged.sections)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [activePageSlug])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/cms/pages/${activePageSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageTitle, metaDescription, sections }),
      })
      const result = await res.json()
      showMsg(result.success ? 'Saved! Website will show updated content.' : (result.message || 'Save failed'))
    } catch {
      showMsg('Error saving')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="admin-home"><p>Loading...</p></div>

  const { hero, sustainabilityImpact, whyChooseUs, rideOptions, expandingNetwork, fleet, aboutUs, whyChooseRefex, industries, faq, body, intro, brandValues, brandGoals, leadership, momentsMilestones } = sections
  const sectionNav = PAGE_SECTIONS[activePageSlug] || HOME_SECTIONS
  const activePage = CMS_PAGES.find((p) => p.slug === activePageSlug)

  return (
    <div className="admin-home">
      <div className="admin-page-header">
        <h2>Website CMS — Content Only</h2>
        <p>Edit text, images, links and numbers for all website pages. Design and layout stay unchanged.</p>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {CMS_PAGES.map((page) => (
          <button
            key={page.slug}
            type="button"
            className={`admin-cms-nav-item ${activePageSlug === page.slug ? 'active' : ''}`}
            style={{ padding: '10px 18px', border: '1px solid #ddd', borderRadius: 8, background: activePageSlug === page.slug ? '#F4553B' : '#fff', color: activePageSlug === page.slug ? '#fff' : '#333', cursor: 'pointer' }}
            onClick={() => setActivePageSlug(page.slug)}
          >
            {page.label}
          </button>
        ))}
      </div>
      {saveMessage && <div className="admin-success-message" style={{ marginBottom: 16 }}>{saveMessage}</div>}

      <div className="admin-cms-layout">
        <nav className="admin-cms-nav">
          {sectionNav.map((s) => (
            <button key={s.id} type="button" className={`admin-cms-nav-item ${activeSection === s.id ? 'active' : ''}`} onClick={() => setActiveSection(s.id)}>{s.label}</button>
          ))}
        </nav>
        <div className="admin-cms-content">
          {activeSection === 'meta' && (
            <div className="admin-section-card">
              <h3>Page Meta — {activePage?.label}</h3>
              <div className="admin-form-group"><label>Page Title</label><input value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} /></div>
              <div className="admin-form-group"><label>Meta Description</label><textarea rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} /></div>
            </div>
          )}
          {activeSection === 'hero' && hero && !['terms-and-conditions', 'privacy-policy', 'refunds-and-cancellation-policy'].includes(activePageSlug) && (
            <div className="admin-section-card">
              <h3>Hero Banner</h3>
              {hero.titlePrefix !== undefined ? (
                <>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Title (before highlight)</label><input value={hero.titlePrefix || ''} onChange={(e) => patch('hero', 'titlePrefix', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Title Highlight</label><input value={hero.titleHighlight || ''} onChange={(e) => patch('hero', 'titleHighlight', e.target.value)} /></div>
                  </div>
                  <div className="admin-form-group"><label>Title (after highlight)</label><input value={hero.titleSuffix || ''} onChange={(e) => patch('hero', 'titleSuffix', e.target.value)} /></div>
                </>
              ) : (
                <div className="admin-form-group"><label>Title</label><input value={hero.title || ''} onChange={(e) => patch('hero', 'title', e.target.value)} /></div>
              )}
              <div className="admin-form-group"><label>Subtitle</label><textarea rows={2} value={hero.subtitle || ''} onChange={(e) => patch('hero', 'subtitle', e.target.value)} /></div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Button Text</label><input value={hero.ctaText || ''} onChange={(e) => patch('hero', 'ctaText', e.target.value)} /></div>
                <div className="admin-form-group"><label>Button Link</label><input value={hero.ctaLink || ''} onChange={(e) => patch('hero', 'ctaLink', e.target.value)} /></div>
              </div>
              {activePageSlug === 'business-commute' && (
                <div style={{ borderTop: '1px solid #eee', marginTop: 16, paddingTop: 16 }}>
                  <h4 style={{ margin: '0 0 12px 0' }}>Secondary hero links</h4>
                  {(hero.secondaryCtas || [
                    { label: 'Employee Transportation Service', link: '/employee-transportation' },
                    { label: 'RAC', link: '/CorporateRentals' },
                  ]).map((cta, i) => (
                    <div className="admin-form-row" key={i}>
                      <div className="admin-form-group">
                        <label>Button {i + 1} text</label>
                        <input
                          value={cta.label || ''}
                          onChange={(e) => {
                            const list = [...(hero.secondaryCtas || [])]
                            while (list.length < 2) {
                              list.push(
                                i === 0
                                  ? { label: 'Employee Transportation Service', link: '/employee-transportation' }
                                  : { label: 'RAC', link: '/CorporateRentals' }
                              )
                            }
                            list[i] = { ...list[i], label: e.target.value }
                            patch('hero', 'secondaryCtas', list)
                          }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Button {i + 1} link</label>
                        <input
                          value={cta.link || ''}
                          onChange={(e) => {
                            const list = [...(hero.secondaryCtas || [])]
                            while (list.length < 2) {
                              list.push(
                                i === 0
                                  ? { label: 'Employee Transportation Service', link: '/employee-transportation' }
                                  : { label: 'RAC', link: '/CorporateRentals' }
                              )
                            }
                            list[i] = { ...list[i], link: e.target.value }
                            patch('hero', 'secondaryCtas', list)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="admin-form-group"><label>Background Image URL</label><input value={hero.backgroundImage || ''} onChange={(e) => patch('hero', 'backgroundImage', e.target.value)} /></div>
              {activePageSlug === 'home' && (
                <div style={{ borderTop: '1px solid #eee', marginTop: 20, paddingTop: 20 }}>
                  <h4 style={{ margin: '0 0 12px 0' }}>Hero highlight card</h4>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={hero.highlightCard?.enabled !== false}
                      onChange={(e) => patch('hero', 'highlightCard', { ...(hero.highlightCard || {}), enabled: e.target.checked })}
                    />
                    Show highlight card in hero
                  </label>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Card line 1</label>
                      <input
                        value={hero.highlightCard?.line1 || ''}
                        onChange={(e) => patch('hero', 'highlightCard', { ...(hero.highlightCard || {}), line1: e.target.value })}
                        placeholder="Reliable Fleet"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Card line 2</label>
                      <input
                        value={hero.highlightCard?.line2 || ''}
                        onChange={(e) => patch('hero', 'highlightCard', { ...(hero.highlightCard || {}), line2: e.target.value })}
                        placeholder="Exceptional Experience"
                      />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Video link (YouTube, Vimeo, or .mp4 — opens full-page popup on card click)</label>
                    <input
                      value={hero.highlightCard?.videoLink || ''}
                      onChange={(e) => patch('hero', 'highlightCard', { ...(hero.highlightCard || {}), videoLink: e.target.value })}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {activePageSlug === 'home' && activeSection === 'sustainabilityImpact' && (
            <div className="admin-section-card">
              <h3>Sustainability Impact</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={sustainabilityImpact.titlePrefix} onChange={(e) => patch('sustainabilityImpact', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={sustainabilityImpact.titleHighlight} onChange={(e) => patch('sustainabilityImpact', 'titleHighlight', e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Description</label><input value={sustainabilityImpact.description} onChange={(e) => patch('sustainabilityImpact', 'description', e.target.value)} /></div>
              {(sustainabilityImpact.counters || []).map((c, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Counter {i + 1}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Label</label><input value={c.title} onChange={(e) => patchList('sustainabilityImpact', 'counters', i, 'title', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Value</label><input type="number" step="any" value={c.value} onChange={(e) => patchList('sustainabilityImpact', 'counters', i, 'value', parseFloat(e.target.value) || 0)} /></div>
                    <div className="admin-form-group"><label>Suffix</label><input value={c.suffix} onChange={(e) => patchList('sustainabilityImpact', 'counters', i, 'suffix', e.target.value)} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {(activePageSlug === 'home' || activePageSlug === 'drive-for-us') && activeSection === 'whyChooseUs' && whyChooseUs && (
            <div className="admin-section-card">
              <h3>{activePageSlug === 'drive-for-us' ? 'Why Drive For Us' : 'Why Choose Us'}</h3>              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={whyChooseUs.titlePrefix} onChange={(e) => patch('whyChooseUs', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={whyChooseUs.titleHighlight} onChange={(e) => patch('whyChooseUs', 'titleHighlight', e.target.value)} /></div>
              </div>
              {(whyChooseUs.cards || []).map((card, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Card {i + 1}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Title line 1</label><input value={card.titleLine1 || ''} onChange={(e) => patchList('whyChooseUs', 'cards', i, 'titleLine1', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Title line 2</label><input value={card.titleLine2 || ''} onChange={(e) => patchList('whyChooseUs', 'cards', i, 'titleLine2', e.target.value)} /></div>
                  </div>
                  <div className="admin-form-group"><label>Title (single line, if no line 1/2)</label><input value={card.title || ''} onChange={(e) => patchList('whyChooseUs', 'cards', i, 'title', e.target.value)} /></div>                  <div className="admin-form-group"><label>Description</label><textarea rows={2} value={card.description} onChange={(e) => patchList('whyChooseUs', 'cards', i, 'description', e.target.value)} /></div>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Icon Image URL</label><input value={card.image} onChange={(e) => patchList('whyChooseUs', 'cards', i, 'image', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Alt Text</label><input value={card.alt} onChange={(e) => patchList('whyChooseUs', 'cards', i, 'alt', e.target.value)} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'home' && activeSection === 'rideOptions' && rideOptions && (
            <div className="admin-section-card">
              <h3>Ride Options</h3>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Use Enter for line breaks in descriptions (same as website layout).</p>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={rideOptions.titlePrefix} onChange={(e) => patch('rideOptions', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={rideOptions.titleHighlight} onChange={(e) => patch('rideOptions', 'titleHighlight', e.target.value)} /></div>
              </div>
              {(rideOptions.tabs || []).map((tab, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Tab {i + 1}: {tab.label}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Tab Label</label><input value={tab.label} onChange={(e) => patchList('rideOptions', 'tabs', i, 'label', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Heading</label><input value={tab.heading} onChange={(e) => patchList('rideOptions', 'tabs', i, 'heading', e.target.value)} /></div>
                  </div>
                  <div className="admin-form-group"><label>Description</label><textarea rows={4} value={tab.description} onChange={(e) => patchList('rideOptions', 'tabs', i, 'description', e.target.value)} /></div>
                  <div className="admin-form-group"><label>Image URL</label><input value={tab.image} onChange={(e) => patchList('rideOptions', 'tabs', i, 'image', e.target.value)} /></div>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Button Text</label><input value={tab.ctaText} onChange={(e) => patchList('rideOptions', 'tabs', i, 'ctaText', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Button Link</label><input value={tab.ctaLink} onChange={(e) => patchList('rideOptions', 'tabs', i, 'ctaLink', e.target.value)} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'home' && activeSection === 'expandingNetwork' && (            <div className="admin-section-card">
              <h3>Expanding Network</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={expandingNetwork.titlePrefix} onChange={(e) => patch('expandingNetwork', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={expandingNetwork.titleHighlight} onChange={(e) => patch('expandingNetwork', 'titleHighlight', e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Description</label><input value={expandingNetwork.description} onChange={(e) => patch('expandingNetwork', 'description', e.target.value)} /></div>
              {(expandingNetwork.cities || []).map((city, i) => (
                <div key={i} className="admin-item-card">
                  <h4>City {i + 1}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Name</label><input value={city.name} onChange={(e) => patchList('expandingNetwork', 'cities', i, 'name', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Image URL</label><input value={city.image} onChange={(e) => patchList('expandingNetwork', 'cities', i, 'image', e.target.value)} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'home' && activeSection === 'fleet' && (            <div className="admin-section-card">
              <h3>Fleet</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={fleet.titlePrefix} onChange={(e) => patch('fleet', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={fleet.titleHighlight} onChange={(e) => patch('fleet', 'titleHighlight', e.target.value)} /></div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Description line 1</label><input value={fleet.descriptionPart1} onChange={(e) => patch('fleet', 'descriptionPart1', e.target.value)} /></div>
                <div className="admin-form-group"><label>Description line 2</label><input value={fleet.descriptionPart2} onChange={(e) => patch('fleet', 'descriptionPart2', e.target.value)} /></div>
              </div>
              {(fleet.vehicles || []).map((v, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Vehicle {i + 1} — alt text only (image unchanged)</h4>
                  <div className="admin-form-group"><label>Alt Text</label><input value={v.alt} onChange={(e) => patchList('fleet', 'vehicles', i, 'alt', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'home' && activeSection === 'aboutUs' && (            <div className="admin-section-card">
              <h3>About Us</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={aboutUs.titlePrefix} onChange={(e) => patch('aboutUs', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={aboutUs.titleHighlight} onChange={(e) => patch('aboutUs', 'titleHighlight', e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Image URL</label><input value={aboutUs.image} onChange={(e) => patch('aboutUs', 'image', e.target.value)} /></div>
              {(aboutUs.paragraphs || []).map((p, i) => (
                <div key={i} className="admin-form-group">
                  <label>Paragraph {i + 1}</label>
                  <textarea rows={3} value={p} onChange={(e) => {
                    const paragraphs = [...aboutUs.paragraphs]
                    paragraphs[i] = e.target.value
                    patch('aboutUs', 'paragraphs', paragraphs)
                  }} />
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'about-us' && activeSection === 'hero' && hero && (
            <div className="admin-section-card">
              <h3>Hero Banner</h3>
              <div className="admin-form-group">
                <label>Title</label>
                <input value={hero.title || ''} onChange={(e) => patch('hero', 'title', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Subtitle</label>
                <input value={hero.subtitle || ''} onChange={(e) => patch('hero', 'subtitle', e.target.value)} />
              </div>
              <AdminImageField
                label="Background image"
                value={hero.backgroundImage || ''}
                onChange={(url) => patch('hero', 'backgroundImage', url)}
                hint="Wide banner recommended. Used behind the About Us title."
              />
            </div>
          )}
          {activePageSlug === 'about-us' && activeSection === 'intro' && intro && (
            <div className="admin-section-card">
              <h3>About intro</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={intro.titlePrefix || ''} onChange={(e) => patch('intro', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title highlight</label><input value={intro.titleHighlight || ''} onChange={(e) => patch('intro', 'titleHighlight', e.target.value)} /></div>
              </div>
              {(intro.paragraphs || []).map((p, i) => (
                <div key={i} className="admin-form-group">
                  <label>Paragraph {i + 1}</label>
                  <textarea
                    rows={4}
                    value={p}
                    onChange={(e) => {
                      const paragraphs = [...(intro.paragraphs || [])]
                      paragraphs[i] = e.target.value
                      patch('intro', 'paragraphs', paragraphs)
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'about-us' && activeSection === 'brandValues' && brandValues && (
            <div className="admin-section-card">
              <h3>Brand Values</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={brandValues.titlePrefix || ''} onChange={(e) => patch('brandValues', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title highlight</label><input value={brandValues.titleHighlight || ''} onChange={(e) => patch('brandValues', 'titleHighlight', e.target.value)} /></div>
              </div>
              {(brandValues.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Value {i + 1}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Label</label><input value={item.label || ''} onChange={(e) => patchList('brandValues', 'items', i, 'label', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Icon class</label><input value={item.icon || ''} onChange={(e) => patchList('brandValues', 'items', i, 'icon', e.target.value)} placeholder="fa-shield-alt" /></div>
                  </div>
                  <div className="admin-form-group"><label>Description</label><textarea rows={2} value={item.description || ''} onChange={(e) => patchList('brandValues', 'items', i, 'description', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'about-us' && activeSection === 'brandGoals' && brandGoals && (
            <div className="admin-section-card">
              <h3>Brand Goals</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={brandGoals.titlePrefix || ''} onChange={(e) => patch('brandGoals', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title highlight</label><input value={brandGoals.titleHighlight || ''} onChange={(e) => patch('brandGoals', 'titleHighlight', e.target.value)} /></div>
              </div>
              {(brandGoals.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>{item.label || `Goal ${i + 1}`}</h4>
                  <div className="admin-form-group"><label>Label</label><input value={item.label || ''} onChange={(e) => patchList('brandGoals', 'items', i, 'label', e.target.value)} /></div>
                  <div className="admin-form-group"><label>Text</label><textarea rows={3} value={item.text || ''} onChange={(e) => patchList('brandGoals', 'items', i, 'text', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'about-us' && activeSection === 'momentsMilestones' && momentsMilestones && (
            <div className="admin-section-card">
              <h3>Moments & Milestones</h3>
              <div className="admin-status-tabs" role="tablist" aria-label="Section visibility">
                <button
                  type="button"
                  role="tab"
                  className={`admin-status-tab${!momentsMilestones.enabled ? ' is-active' : ''}`}
                  aria-selected={!momentsMilestones.enabled}
                  onClick={() => patch('momentsMilestones', 'enabled', false)}
                >
                  Inactive
                </button>
                <button
                  type="button"
                  role="tab"
                  className={`admin-status-tab${momentsMilestones.enabled ? ' is-active' : ''}`}
                  aria-selected={!!momentsMilestones.enabled}
                  onClick={() => patch('momentsMilestones', 'enabled', true)}
                >
                  Active
                </button>
              </div>
              <p style={{ fontSize: 13, color: '#666', margin: '0 0 16px' }}>
                {momentsMilestones.enabled
                  ? 'Active — this section is visible on the About Us page.'
                  : 'Inactive — this section is hidden on the About Us page.'}
              </p>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={momentsMilestones.titlePrefix || ''} onChange={(e) => patch('momentsMilestones', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title highlight</label><input value={momentsMilestones.titleHighlight || ''} onChange={(e) => patch('momentsMilestones', 'titleHighlight', e.target.value)} /></div>
              </div>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
                Gallery for event photos, press releases, and media. Type: event, press, or media.
              </p>
              {(momentsMilestones.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>{item.title || `Item ${i + 1}`}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Title</label><input value={item.title || ''} onChange={(e) => patchList('momentsMilestones', 'items', i, 'title', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Date</label><input value={item.date || ''} onChange={(e) => patchList('momentsMilestones', 'items', i, 'date', e.target.value)} /></div>
                  </div>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Type</label>
                      <select value={item.type || 'media'} onChange={(e) => patchList('momentsMilestones', 'items', i, 'type', e.target.value)}>
                        <option value="event">Event Photo</option>
                        <option value="press">Press Release</option>
                        <option value="media">Media</option>
                      </select>
                    </div>
                    <div className="admin-form-group"><label>Press / media link</label><input value={item.link || ''} onChange={(e) => patchList('momentsMilestones', 'items', i, 'link', e.target.value)} placeholder="https://" /></div>
                  </div>
                  <AdminImageField
                    label="Image"
                    variant="logo"
                    value={item.image || ''}
                    onChange={(url) => patchList('momentsMilestones', 'items', i, 'image', url)}
                    hint="Event, press, or media image."
                  />
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'about-us' && activeSection === 'leadership' && leadership && (
            <div className="admin-section-card">
              <h3>Leadership Team</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={leadership.titlePrefix || ''} onChange={(e) => patch('leadership', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title highlight</label><input value={leadership.titleHighlight || ''} onChange={(e) => patch('leadership', 'titleHighlight', e.target.value)} /></div>
              </div>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
                Upload headshots for each leader. Bio opens on the public page via Read More.
              </p>
              {(leadership.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>{item.name || `Leader ${i + 1}`}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Name</label><input value={item.name || ''} onChange={(e) => patchList('leadership', 'items', i, 'name', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Role</label><input value={item.role || ''} onChange={(e) => patchList('leadership', 'items', i, 'role', e.target.value)} /></div>
                  </div>
                  <AdminImageField
                    label="Headshot"
                    variant="logo"
                    value={item.image || ''}
                    onChange={(url) => patchList('leadership', 'items', i, 'image', url)}
                    hint="Square headshot recommended."
                  />
                  {(Array.isArray(item.bio) ? item.bio : [item.bio || '']).map((para, pIndex) => (
                    <div key={pIndex} className="admin-form-group">
                      <label>Bio paragraph {pIndex + 1}</label>
                      <textarea
                        rows={4}
                        value={para || ''}
                        onChange={(e) => {
                          const bio = [...(Array.isArray(item.bio) ? item.bio : [item.bio || ''])]
                          bio[pIndex] = e.target.value
                          patchList('leadership', 'items', i, 'bio', bio)
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'business-commute' && activeSection === 'whyChooseRefex' && whyChooseRefex && (
            <div className="admin-section-card">
              <h3>Why Choose Refex</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={whyChooseRefex.titlePrefix || ''} onChange={(e) => patch('whyChooseRefex', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={whyChooseRefex.titleHighlight || ''} onChange={(e) => patch('whyChooseRefex', 'titleHighlight', e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Description</label><textarea rows={2} value={whyChooseRefex.description || ''} onChange={(e) => patch('whyChooseRefex', 'description', e.target.value)} /></div>
              {(whyChooseRefex.cards || []).map((card, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Card {i + 1}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Title line 1</label><input value={card.titleLine1 || ''} onChange={(e) => patchList('whyChooseRefex', 'cards', i, 'titleLine1', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Title line 2</label><input value={card.titleLine2 || ''} onChange={(e) => patchList('whyChooseRefex', 'cards', i, 'titleLine2', e.target.value)} /></div>
                  </div>
                  <div className="admin-form-group"><label>Title (single line)</label><input value={card.title || ''} onChange={(e) => patchList('whyChooseRefex', 'cards', i, 'title', e.target.value)} /></div>
                  <div className="admin-form-group"><label>Description</label><textarea rows={2} value={card.description || ''} onChange={(e) => patchList('whyChooseRefex', 'cards', i, 'description', e.target.value)} /></div>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Icon Image URL</label><input value={card.image || ''} onChange={(e) => patchList('whyChooseRefex', 'cards', i, 'image', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Alt Text</label><input value={card.alt || ''} onChange={(e) => patchList('whyChooseRefex', 'cards', i, 'alt', e.target.value)} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activePageSlug === 'business-commute' && activeSection === 'industries' && industries && (
            <div className="admin-section-card">
              <h3>Industries</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={industries.titlePrefix || ''} onChange={(e) => patch('industries', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={industries.titleHighlight || ''} onChange={(e) => patch('industries', 'titleHighlight', e.target.value)} /></div>
              </div>
              <div className="admin-form-group"><label>Description</label><textarea rows={3} value={industries.description || ''} onChange={(e) => patch('industries', 'description', e.target.value)} /></div>
              {(industries.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Industry {i + 1}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Title line 1</label><input value={item.titleLine1 || ''} onChange={(e) => patchList('industries', 'items', i, 'titleLine1', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Title line 2</label><input value={item.titleLine2 || ''} onChange={(e) => patchList('industries', 'items', i, 'titleLine2', e.target.value)} /></div>
                  </div>
                  <div className="admin-form-group"><label>Title (single line)</label><input value={item.title || ''} onChange={(e) => patchList('industries', 'items', i, 'title', e.target.value)} /></div>
                  <div className="admin-form-group"><label>Description</label><textarea rows={2} value={item.description || ''} onChange={(e) => patchList('industries', 'items', i, 'description', e.target.value)} /></div>
                  <div className="admin-form-row">
                    <div className="admin-form-group"><label>Image URL</label><input value={item.image || ''} onChange={(e) => patchList('industries', 'items', i, 'image', e.target.value)} /></div>
                    <div className="admin-form-group"><label>Alt Text</label><input value={item.alt || ''} onChange={(e) => patchList('industries', 'items', i, 'alt', e.target.value)} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {(activePageSlug === 'drive-for-us' || activePageSlug === 'business-commute') && activeSection === 'faq' && faq && (
            <div className="admin-section-card">
              <h3>FAQ</h3>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>Title (before)</label><input value={faq.titlePrefix || ''} onChange={(e) => patch('faq', 'titlePrefix', e.target.value)} /></div>
                <div className="admin-form-group"><label>Title Highlight</label><input value={faq.titleHighlight || ''} onChange={(e) => patch('faq', 'titleHighlight', e.target.value)} /></div>
              </div>
              {(faq.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>FAQ {i + 1}</h4>
                  <div className="admin-form-group"><label>Question</label><input value={item.question || ''} onChange={(e) => patchList('faq', 'items', i, 'question', e.target.value)} /></div>
                  <div className="admin-form-group"><label>Answer</label><textarea rows={3} value={item.answer || ''} onChange={(e) => patchList('faq', 'items', i, 'answer', e.target.value)} /></div>
                </div>
              ))}
            </div>
          )}
          {['terms-and-conditions', 'privacy-policy', 'refunds-and-cancellation-policy'].includes(activePageSlug) && activeSection === 'hero' && hero && (
            <div className="admin-section-card">
              <h3>Hero Banner</h3>
              <div className="admin-form-group"><label>Title</label><input value={hero.title || ''} onChange={(e) => patch('hero', 'title', e.target.value)} /></div>
              <div className="admin-form-group"><label>Background Image URL</label><input value={hero.backgroundImage || ''} onChange={(e) => patch('hero', 'backgroundImage', e.target.value)} /></div>
            </div>
          )}
          {['terms-and-conditions', 'privacy-policy', 'refunds-and-cancellation-policy'].includes(activePageSlug) && activeSection === 'body' && body && (
            <div className="admin-section-card">
              <h3>Page Content (HTML)</h3>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Edit the page body HTML. Use standard tags: p, strong, ul, li, a, h2, h3, br.</p>
              <div className="admin-form-group">
                <label>Body HTML</label>
                <textarea rows={22} value={body.html || ''} onChange={(e) => patch('body', 'html', e.target.value)} style={{ fontFamily: 'monospace', fontSize: 13 }} />
              </div>
            </div>
          )}
          <div className="admin-form-actions">            <button type="button" className="admin-save-button" disabled={saving} onClick={handleSave}>{saving ? 'Saving...' : 'Save Content'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminWebsiteHome
