import React, { useEffect, useState } from 'react'
import { LANDING_CMS_PAGES, getCmsDefaults, mergeCmsPage } from '../../constants/cmsPageRegistry'
import { API_BASE_URL } from '../../constants/api'
import AdminImageField from '../../components/admin/AdminImageField'
import './Admin.css'

const SECTIONS = [
  { id: 'meta', label: 'Page Meta' },
  { id: 'hero', label: 'Hero' },
  { id: 'logos', label: 'Client Logos' },
  { id: 'problems', label: 'Problems & Fixes' },
  { id: 'midCta', label: 'Mid CTA' },
  { id: 'features', label: 'Features' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'form', label: 'Lead Form' },
]

const listToText = (list) => (Array.isArray(list) ? list.join('\n') : '')
const textToList = (text) =>
  String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const AdminLandingPages = () => {
  const [activePageSlug, setActivePageSlug] = useState('employee-transportation')
  const [activeSection, setActiveSection] = useState('meta')
  const [pageTitle, setPageTitle] = useState(() => getCmsDefaults('employee-transportation').pageTitle)
  const [metaDescription, setMetaDescription] = useState(
    () => getCmsDefaults('employee-transportation').metaDescription
  )
  const [sections, setSections] = useState(() =>
    JSON.parse(JSON.stringify(getCmsDefaults('employee-transportation').sections))
  )
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const showMsg = (msg) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const patch = (key, field, value) =>
    setSections((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }))

  const patchList = (key, listKey, index, field, value) => {
    setSections((prev) => {
      const list = [...(prev[key][listKey] || [])]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, [key]: { ...prev[key], [listKey]: list } }
    })
  }

  const addLogo = () => {
    setSections((prev) => {
      const items = [...(prev.logos?.items || [])]
      items.push({ order: items.length + 1, name: '', image: '' })
      return { ...prev, logos: { ...prev.logos, items } }
    })
  }

  const removeLogo = (index) => {
    setSections((prev) => {
      const items = [...(prev.logos?.items || [])]
      items.splice(index, 1)
      return { ...prev, logos: { ...prev.logos, items } }
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
      showMsg(result.success ? 'Saved! Landing page will show updated content.' : result.message || 'Save failed')
    } catch {
      showMsg('Error saving')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="admin-home"><p>Loading...</p></div>

  const { hero, logos, problems, midCta, features, testimonials, faq, form } = sections
  const activePage = LANDING_CMS_PAGES.find((p) => p.slug === activePageSlug)
  const isRac = activePageSlug === 'rac'

  return (
    <div className="admin-home">
      <div className="admin-page-header">
        <h2>Landing Pages CMS</h2>
        <p>Edit all sections for Employee Transportation and Corporate Car Rental (RAC) landing pages.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {LANDING_CMS_PAGES.map((page) => (
          <button
            key={page.slug}
            type="button"
            className={`admin-cms-nav-item ${activePageSlug === page.slug ? 'active' : ''}`}
            style={{
              padding: '10px 18px',
              border: '1px solid #ddd',
              borderRadius: 8,
              background: activePageSlug === page.slug ? '#F4553B' : '#fff',
              color: activePageSlug === page.slug ? '#fff' : '#333',
              cursor: 'pointer',
            }}
            onClick={() => setActivePageSlug(page.slug)}
          >
            {page.label}
          </button>
        ))}
      </div>

      {saveMessage && (
        <div className="admin-success-message" style={{ marginBottom: 16 }}>
          {saveMessage}
        </div>
      )}

      <div className="admin-cms-layout">
        <nav className="admin-cms-nav">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`admin-cms-nav-item ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="admin-cms-content">
          {activeSection === 'meta' && (
            <div className="admin-section-card">
              <h3>Page Meta — {activePage?.label}</h3>
              <div className="admin-form-group">
                <label>Page Title</label>
                <input value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Meta Description</label>
                <textarea rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
              </div>
            </div>
          )}

          {activeSection === 'hero' && hero && (
            <div className="admin-section-card">
              <h3>Hero Section</h3>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title line 1</label>
                  <input value={hero.titleLine1 || ''} onChange={(e) => patch('hero', 'titleLine1', e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Title highlight</label>
                  <input value={hero.titleHighlight || ''} onChange={(e) => patch('hero', 'titleHighlight', e.target.value)} />
                </div>
              </div>
              {isRac ? (
                <>
                  <h4 style={{ marginTop: 12 }}>Service buttons (hero)</h4>
                  {(hero.serviceButtons || []).map((item, i) => (
                    <div key={i} className="admin-form-group">
                      <label>Button {i + 1}</label>
                      <input
                        value={item.label || ''}
                        onChange={(e) => patchList('hero', 'serviceButtons', i, 'label', e.target.value)}
                        placeholder={['Airport Transfers', 'Chauffeured Rentals', 'Intercity Travel'][i]}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="admin-form-group">
                  <label>Menu / services line (badge text)</label>
                  <input
                    value={hero.servicesLine || ''}
                    onChange={(e) => patch('hero', 'servicesLine', e.target.value)}
                    placeholder="AI-Powered ETMS for Enterprises • Employee Transportation Services"
                  />
                </div>
              )}
              <div className="admin-form-group">
                <label>Lead paragraph</label>
                <textarea rows={2} value={hero.lead || ''} onChange={(e) => patch('hero', 'lead', e.target.value)} />
              </div>
              <AdminImageField
                label="Hero background image"
                value={hero.backgroundImage || ''}
                onChange={(url) => patch('hero', 'backgroundImage', url)}
                hint="Upload an image or paste a URL. Shown behind the hero section."
              />
              <h4 style={{ marginTop: 20 }}>Highlights</h4>
              {(hero.highlights || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <div className="admin-form-group">
                    <label>Highlight {i + 1}</label>
                    <input value={item.text || ''} onChange={(e) => patchList('hero', 'highlights', i, 'text', e.target.value)} />
                  </div>
                </div>
              ))}
              <h4 style={{ marginTop: 20 }}>Trust stats</h4>
              {(hero.trustStats || []).map((stat, i) => (
                <div key={i} className="admin-item-card">
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Value {i + 1}</label>
                      <input value={stat.value || ''} onChange={(e) => patchList('hero', 'trustStats', i, 'value', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label>Label {i + 1}</label>
                      <input value={stat.label || ''} onChange={(e) => patchList('hero', 'trustStats', i, 'label', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'logos' && logos && (
            <div className="admin-section-card">
              <h3>Client Logos Strip</h3>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title (before highlight)</label>
                  <input value={logos.titlePrefix || ''} onChange={(e) => patch('logos', 'titlePrefix', e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Title highlight</label>
                  <input value={logos.titleHighlight || ''} onChange={(e) => patch('logos', 'titleHighlight', e.target.value)} />
                </div>
              </div>
              <h4 style={{ marginTop: 20 }}>Client logos</h4>
              {(logos.items || []).map((logo, i) => (
                <div key={i} className="admin-item-card">
                  <div className="admin-form-row" style={{ alignItems: 'flex-start' }}>
                    <div className="admin-form-group" style={{ flex: 1 }}>
                      <label>Company name {i + 1}</label>
                      <input
                        value={logo.name || ''}
                        onChange={(e) => patchList('logos', 'items', i, 'name', e.target.value)}
                        placeholder="e.g. Amazon"
                      />
                    </div>
                    <button
                      type="button"
                      className="admin-delete-button"
                      onClick={() => removeLogo(i)}
                      style={{ marginTop: 28 }}
                    >
                      Remove
                    </button>
                  </div>
                  <AdminImageField
                    label="Logo image"
                    value={logo.image || ''}
                    onChange={(url) => patchList('logos', 'items', i, 'image', url)}
                  />
                </div>
              ))}
              <button type="button" className="admin-add-button" onClick={addLogo} style={{ marginTop: 12 }}>
                + Add client logo
              </button>
            </div>
          )}

          {activeSection === 'problems' && problems && (
            <div className="admin-section-card">
              <h3>Problems & Fixes</h3>
              {!isRac && (
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Title (before highlight)</label>
                    <input value={problems.titlePrefix || ''} onChange={(e) => patch('problems', 'titlePrefix', e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label>Title highlight</label>
                    <input value={problems.titleHighlight || ''} onChange={(e) => patch('problems', 'titleHighlight', e.target.value)} />
                  </div>
                </div>
              )}
              {isRac && (
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Title (before highlight)</label>
                    <input value={problems.titlePrefix || ''} onChange={(e) => patch('problems', 'titlePrefix', e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label>Title highlight</label>
                    <input value={problems.titleHighlight || ''} onChange={(e) => patch('problems', 'titleHighlight', e.target.value)} />
                  </div>
                </div>
              )}
              <div className="admin-form-group">
                <label>Intro text</label>
                <textarea rows={2} value={problems.lead || ''} onChange={(e) => patch('problems', 'lead', e.target.value)} />
              </div>
              {(problems.blocks || []).map((block, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Block {i + 1}</h4>
                  <div className="admin-form-group">
                    <label>Problem</label>
                    <textarea rows={2} value={block.problem || ''} onChange={(e) => patchList('problems', 'blocks', i, 'problem', e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label>Fix title</label>
                    <input value={block.fixTitle || ''} onChange={(e) => patchList('problems', 'blocks', i, 'fixTitle', e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label>Fix description</label>
                    <textarea rows={2} value={block.fix || ''} onChange={(e) => patchList('problems', 'blocks', i, 'fix', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'midCta' && midCta && (
            <div className="admin-section-card">
              <h3>Mid-page CTA</h3>
              {isRac && (
                <div className="admin-form-group">
                  <label>Title</label>
                  <input value={midCta.title || ''} onChange={(e) => patch('midCta', 'title', e.target.value)} />
                </div>
              )}
              <div className="admin-form-group">
                <label>Description</label>
                <textarea rows={2} value={midCta.description || ''} onChange={(e) => patch('midCta', 'description', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Button text</label>
                <input value={midCta.buttonText || ''} onChange={(e) => patch('midCta', 'buttonText', e.target.value)} />
              </div>
            </div>
          )}

          {activeSection === 'features' && features && (
            <div className="admin-section-card">
              <h3>Features</h3>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title (before highlight)</label>
                  <input value={features.titlePrefix || ''} onChange={(e) => patch('features', 'titlePrefix', e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Title highlight</label>
                  <input value={features.titleHighlight || ''} onChange={(e) => patch('features', 'titleHighlight', e.target.value)} />
                </div>
              </div>
              <div className="admin-form-row">
                <AdminImageField
                  label="Features image"
                  value={features.image || ''}
                  onChange={(url) => patch('features', 'image', url)}
                  hint="Side image in the features section."
                />
                <div className="admin-form-group">
                  <label>Image alt text</label>
                  <input value={features.imageAlt || ''} onChange={(e) => patch('features', 'imageAlt', e.target.value)} />
                </div>
              </div>
              {(features.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Feature {i + 1}</h4>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Icon class</label>
                      <input value={item.icon || ''} onChange={(e) => patchList('features', 'items', i, 'icon', e.target.value)} placeholder="plane or fa-tachometer-alt" />
                    </div>
                    <div className="admin-form-group">
                      <label>Label</label>
                      <input value={item.label || ''} onChange={(e) => patchList('features', 'items', i, 'label', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'testimonials' && testimonials && (
            <div className="admin-section-card">
              <h3>Testimonials</h3>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title (before highlight)</label>
                  <input value={testimonials.titlePrefix || ''} onChange={(e) => patch('testimonials', 'titlePrefix', e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Title highlight</label>
                  <input value={testimonials.titleHighlight || ''} onChange={(e) => patch('testimonials', 'titleHighlight', e.target.value)} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Subtitle</label>
                <input value={testimonials.subtitle || ''} onChange={(e) => patch('testimonials', 'subtitle', e.target.value)} />
              </div>
              {(testimonials.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>Testimonial {i + 1}</h4>
                  <div className="admin-form-group">
                    <label>Quote</label>
                    <textarea rows={4} value={item.quote || ''} onChange={(e) => patchList('testimonials', 'items', i, 'quote', e.target.value)} />
                  </div>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Name</label>
                      <input value={item.name || ''} onChange={(e) => patchList('testimonials', 'items', i, 'name', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label>Role</label>
                      <input value={item.role || ''} onChange={(e) => patchList('testimonials', 'items', i, 'role', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Company</label>
                    <input value={item.company || ''} onChange={(e) => patchList('testimonials', 'items', i, 'company', e.target.value)} />
                  </div>
                  <AdminImageField
                    label="Company logo"
                    value={item.logoImage || ''}
                    onChange={(url) => patchList('testimonials', 'items', i, 'logoImage', url)}
                    hint="Upload a logo image. If empty, text logo fields below are shown instead."
                  />
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Logo primary (text fallback)</label>
                      <input value={item.logoPrimary || ''} onChange={(e) => patchList('testimonials', 'items', i, 'logoPrimary', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                      <label>Logo secondary (text fallback)</label>
                      <input value={item.logoSecondary || ''} onChange={(e) => patchList('testimonials', 'items', i, 'logoSecondary', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'faq' && faq && (
            <div className="admin-section-card">
              <h3>FAQ</h3>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title (before highlight)</label>
                  <input value={faq.titlePrefix || ''} onChange={(e) => patch('faq', 'titlePrefix', e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Title highlight</label>
                  <input value={faq.titleHighlight || ''} onChange={(e) => patch('faq', 'titleHighlight', e.target.value)} />
                </div>
              </div>
              {(faq.items || []).map((item, i) => (
                <div key={i} className="admin-item-card">
                  <h4>FAQ {i + 1}</h4>
                  <div className="admin-form-group">
                    <label>Question</label>
                    <input value={item.question || ''} onChange={(e) => patchList('faq', 'items', i, 'question', e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label>Answer (leave empty if using bullet list)</label>
                    <textarea rows={3} value={item.answer || ''} onChange={(e) => patchList('faq', 'items', i, 'answer', e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label>Bullet list (one item per line)</label>
                    <textarea
                      rows={4}
                      value={listToText(item.list)}
                      onChange={(e) => patchList('faq', 'items', i, 'list', textToList(e.target.value))}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'form' && form && (
            <div className="admin-section-card">
              <h3>Lead Form Card</h3>
              <div className="admin-form-group">
                <label>Form title</label>
                <input value={form.title || ''} onChange={(e) => patch('form', 'title', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Form note</label>
                <textarea rows={2} value={form.note || ''} onChange={(e) => patch('form', 'note', e.target.value)} />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Button text</label>
                  <input value={form.buttonText || ''} onChange={(e) => patch('form', 'buttonText', e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Submitting text</label>
                  <input value={form.submittingText || ''} onChange={(e) => patch('form', 'submittingText', e.target.value)} />
                </div>
              </div>
              <AdminImageField
                label="Final section background"
                value={form.backgroundImage || ''}
                onChange={(url) => patch('form', 'backgroundImage', url)}
                hint="Background behind the bottom lead form section."
              />
              <p style={{ fontSize: 13, color: '#666' }}>Form fields (name, email, phone, etc.) are fixed in the page layout.</p>
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <button type="button" className="admin-save-button" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLandingPages
