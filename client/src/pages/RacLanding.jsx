import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Header from '../components/Header'
import SubmissionSuccessOverlay from '../components/SubmissionSuccessOverlay'
import { useCmsPage } from '../hooks/useCmsPage'
import {
  API_BASE_URL,
  RECAPTCHA_SITE_KEY,
  isLocalhost as isLocalhostHost,
} from '../constants/businessForm'
import { resolveCmsAssetUrl, getHeroBackgroundStyle, getFinalBackgroundStyle } from '../utils/cmsAssetUrl'
import './EtsLanding.css'
import './RacLanding.css'

const CITIES = ['Chennai', 'Bangalore', 'Delhi NCR', 'Mumbai', 'Hyderabad']
const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  companyName: '',
  city: '',
}

const CITY_TO_REGION = {
  Chennai: 'Chennai',
  Bangalore: 'Bengaluru',
  'Delhi NCR': 'Delhi NCR',
  Mumbai: 'Mumbai',
  Hyderabad: 'Hyderabad',
}

function validateEmail(email) {
  if (!email) return 'Work email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid work email'
  return ''
}

function validatePhone(phone) {
  if (!phone) return 'Phone number is required'
  try {
    const parsed = parsePhoneNumberFromString(phone.startsWith('+') ? phone : `+${phone}`)
    if (!parsed || !parsed.isValid()) return 'Enter a valid phone number'
  } catch {
    return 'Enter a valid phone number'
  }
  return ''
}

function RacLeadForm({ formId, submitting, setSubmitting, onSuccess, variant = 'default', formCopy }) {
  const isCompact = variant === 'compact'
  const isFinal = variant === 'final'
  const useRowLayout = isCompact || isFinal
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {
      name: form.name.trim() ? '' : 'Name is required',
      email: validateEmail(form.email.trim()),
      phone: validatePhone(form.phone),
      companyName: form.companyName.trim() ? '' : 'Company is required',
      city: form.city.trim() ? '' : 'City is required',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      setApiError('Please fix the highlighted fields and try again.')
      return
    }

    setApiError('')
    setSubmitting(true)

    const isLocalhost = isLocalhostHost()
    let recaptchaToken = isLocalhost ? 'localhost-development' : ''
    try {
      if (!isLocalhost && window.grecaptcha && RECAPTCHA_SITE_KEY) {
        recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'rac_lead' })
      }
    } catch (_) {
      recaptchaToken = ''
    }

    const region = CITY_TO_REGION[form.city] || form.city

    try {
      const response = await fetch(`${API_BASE_URL}/api/business-commute/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          companyName: form.companyName.trim(),
          email: form.email.trim(),
          phone: form.phone.startsWith('+') ? form.phone : `+${form.phone}`,
          service: ['Airport Transfers', 'Spot Rental', 'Outstation Rides'],
          department: 'Corporate Travel',
          regions: [region],
          numberOfEmployees: 'Not specified',
          comment: `Lead from RAC Landing Page | City: ${form.city}`,
          recaptchaToken: recaptchaToken || (isLocalhost ? 'localhost-development' : null),
        }),
      })

      let result = {}
      try {
        result = await response.json()
      } catch (_) {
        result = {}
      }

      const ok = response.ok && (result.success === true || result.success === undefined)
      if (!ok) {
        const msg =
          (Array.isArray(result.errorMessages) && result.errorMessages.join('\n')) ||
          result.message ||
          'Something went wrong. Please try again.'
        setApiError(msg)
        return
      }

      setForm(EMPTY_FORM)
      onSuccess?.()
    } catch (err) {
      setApiError(err?.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className={`ets-form-card${isCompact ? ' rac-hero-form-card' : ''}${isFinal ? ' rac-final-form-card' : ''}`}
      id={formId}
    >
      <h3 className="ets-form-card__title">{formCopy?.title}</h3>
      <p className="ets-form-card__note">{formCopy?.note}</p>
      <form
        className={`ets-form${useRowLayout ? ' ets-form--hero-compact' : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="ets-field">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input
            id={`${formId}-name`}
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
          />
          {errors.name ? <div className="ets-field-error">{errors.name}</div> : null}
        </div>
        {useRowLayout ? (
          <>
            <div className="ets-form-row">
              <div className="ets-field">
                <label htmlFor={`${formId}-email`}>Work email</label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="name@company.com"
                  autoComplete="email"
                />
                {errors.email ? <div className="ets-field-error">{errors.email}</div> : null}
              </div>
              <div className="ets-field">
                <label htmlFor={`${formId}-phone`}>Phone number</label>
                <PhoneInput
                  country="in"
                  value={form.phone}
                  onChange={(value) => updateField('phone', value)}
                  inputProps={{ id: `${formId}-phone`, name: 'phone' }}
                  containerClass="ets-phone-input"
                  inputClass="ets-phone-input__field"
                  buttonClass="ets-phone-input__button"
                  enableSearch
                />
                {errors.phone ? <div className="ets-field-error">{errors.phone}</div> : null}
              </div>
            </div>
            <div className="ets-form-row">
              <div className="ets-field">
                <label htmlFor={`${formId}-company`}>Company</label>
                <input
                  id={`${formId}-company`}
                  type="text"
                  value={form.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  placeholder="Company name"
                  autoComplete="organization"
                />
                {errors.companyName ? <div className="ets-field-error">{errors.companyName}</div> : null}
              </div>
              <div className="ets-field">
                <label htmlFor={`${formId}-city`}>City</label>
                <select
                  id={`${formId}-city`}
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                >
                  <option value="">Select city</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city ? <div className="ets-field-error">{errors.city}</div> : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="ets-field">
              <label htmlFor={`${formId}-email`}>Work email</label>
              <input
                id={`${formId}-email`}
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="name@company.com"
                autoComplete="email"
              />
              {errors.email ? <div className="ets-field-error">{errors.email}</div> : null}
            </div>
            <div className="ets-field">
              <label htmlFor={`${formId}-phone`}>Phone number</label>
              <PhoneInput
                country="in"
                value={form.phone}
                onChange={(value) => updateField('phone', value)}
                inputProps={{ id: `${formId}-phone`, name: 'phone' }}
                containerClass="ets-phone-input"
                inputClass="ets-phone-input__field"
                buttonClass="ets-phone-input__button"
                enableSearch
              />
              {errors.phone ? <div className="ets-field-error">{errors.phone}</div> : null}
            </div>
            <div className="ets-field">
              <label htmlFor={`${formId}-company`}>Company</label>
              <input
                id={`${formId}-company`}
                type="text"
                value={form.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Company name"
                autoComplete="organization"
              />
              {errors.companyName ? <div className="ets-field-error">{errors.companyName}</div> : null}
            </div>
            <div className="ets-field">
              <label htmlFor={`${formId}-city`}>City</label>
              <select
                id={`${formId}-city`}
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
              >
                <option value="">Select city</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city ? <div className="ets-field-error">{errors.city}</div> : null}
            </div>
          </>
        )}
        {apiError ? <div className="ets-form-error">{apiError}</div> : null}
        <button type="submit" className="ets-btn ets-btn--primary" disabled={submitting}>
          {submitting ? formCopy?.submittingText : formCopy?.buttonText}
        </button>
      </form>
    </div>
  )
}

const RacLanding = () => {
  const cms = useCmsPage('rac')
  const { hero, logos, problems, midCta, features, testimonials, faq, form } = cms.sections
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false)

  useEffect(() => {
    document.body.className =
      'page-template-default page page-rac-landing elementor-default elementor-kit-6330'
    return () => {
      document.body.className = ''
    }
  }, [])

  useEffect(() => {
    if (isLocalhostHost() || !RECAPTCHA_SITE_KEY) return undefined
    if (document.getElementById('rac-recaptcha-script')) return undefined
    const script = document.createElement('script')
    script.id = 'rac-recaptcha-script'
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    document.body.appendChild(script)
    return undefined
  }, [])

  useEffect(() => {
    const count = testimonials.items?.length ?? 0
    if (isTestimonialPaused || count <= 1) return undefined
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % count)
    }, 2800)
    return () => window.clearInterval(timer)
  }, [isTestimonialPaused, testimonials.items?.length])

  const goToPrevTestimonial = () => {
    const count = testimonials.items?.length ?? 0
    if (count <= 0) return
    setActiveTestimonial((prev) => (prev - 1 + count) % count)
  }

  const goToNextTestimonial = () => {
    const count = testimonials.items?.length ?? 0
    if (count <= 0) return
    setActiveTestimonial((prev) => (prev + 1) % count)
  }

  const scrollToHeroForm = (e) => {
    e?.preventDefault?.()
    document.getElementById('rac-lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const clientLogos = logos.items?.filter((logo) => logo.image) ?? []
  const logoLoop = [...clientLogos, ...clientLogos]

  return (
    <div id="page" className="site ets-page rac-page">
      <Header />
      <main>
        <section className="ets-hero" style={getHeroBackgroundStyle(hero.backgroundImage)}>
          <div className="ets-container ets-hero__grid">
            <div>
              <h1 className="ets-h1">
                {hero.titleLine1}
                <br />
                <span>{hero.titleHighlight}</span>
              </h1>
              <p className="ets-hero-services">{hero.servicesLine}</p>
              <p className="ets-lead">{hero.lead}</p>
              <ul className="ets-highlights">
                {hero.highlights?.map((item) => (
                  <li key={item.text}>{item.text}</li>
                ))}
              </ul>
              <div className="rac-hero-stats">
                {hero.trustStats?.map((stat) => (
                  <div key={stat.label} className="rac-hero-stats__item">
                    <strong className="rac-hero-stats__value">{stat.value}</strong>
                    <span className="rac-hero-stats__label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <RacLeadForm
              variant="compact"
              formId="rac-lead-form"
              submitting={submitting}
              setSubmitting={setSubmitting}
              onSuccess={() => setShowSuccess(true)}
              formCopy={form}
            />
          </div>
        </section>

        <section className="ets-logos" aria-label="Trusted by clients">
          <div className="ets-container">
            <p className="ets-logos__title">
              {logos.titlePrefix} <strong>{logos.titleHighlight}</strong>
            </p>
          </div>
          <div className="ets-logos__track-wrap">
            <div className="ets-logos__track">
              {logoLoop.map((logo, index) => (
                <img
                  key={`${logo.name}-${index}`}
                  src={resolveCmsAssetUrl(logo.image)}
                  alt={logo.name}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="ets-section ets-problems-section">
          <div className="ets-container">
            <div className="ets-problems__intro">
              <h2 className="ets-h2">
                {problems.titlePrefix} <span>{problems.titleHighlight}</span>
              </h2>
              <p className="ets-lead">{problems.lead}</p>
            </div>
            <div className="ets-compare-list">
              {problems.blocks?.map((block) => (
                <div key={block.problem} className="ets-compare-row">
                  <article className="ets-compare-card ets-compare-card--problem">
                    <div className="ets-compare-card__head">
                      <span className="ets-compare-icon ets-compare-icon--problem" aria-hidden="true">
                        !
                      </span>
                      <h3>Problem</h3>
                    </div>
                    <p>{block.problem}</p>
                  </article>
                  <article className="ets-compare-card ets-compare-card--fix">
                    <div className="ets-compare-card__head">
                      <span className="ets-compare-icon ets-compare-icon--fix" aria-hidden="true" />
                      <h3>{block.fixTitle}</h3>
                    </div>
                    <p>{block.fix}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ets-mid-cta">
          <div className="ets-container ets-mid-cta__inner">
            <div className="ets-mid-cta__copy">
              <p className="ets-mid-cta__title">{midCta.title}</p>
              <p className="ets-mid-cta__desc">{midCta.description}</p>
            </div>
            <button type="button" className="ets-btn ets-btn--primary" onClick={scrollToHeroForm}>
              {midCta.buttonText}
            </button>
          </div>
        </section>

        <section className="ets-section rac-features-section">
          <div className="ets-container">
            <div className="rac-features-layout">
              <div className="rac-features-layout__content">
                <h2 className="ets-h2 rac-features-layout__title">
                  {features.titlePrefix} <span>{features.titleHighlight}</span>
                </h2>
                <ul className="rac-features-steps">
                  {features.items?.map((feature) => (
                    <li key={feature.label} className="rac-features-step">
                      <span className="rac-features-step__icon" aria-hidden="true">
                        <i className={`fas fa-${feature.icon}`} />
                      </span>
                      <div className="rac-features-step__text">
                        <h3>{feature.label}</h3>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rac-features-layout__media">
                <img src={resolveCmsAssetUrl(features.image)} alt={features.imageAlt} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="ets-section ets-section--soft">
          <div className="ets-container">
            <div className="ets-testimonials__header">
              <h2 className="ets-h2">
                {testimonials.titlePrefix} <span>{testimonials.titleHighlight}</span>
              </h2>
              <p className="ets-lead" style={{ margin: '0 auto' }}>
                {testimonials.subtitle}
              </p>
            </div>
            <div
              className="ets-testimonial-slider"
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
            >
              <button
                type="button"
                className="ets-testimonial-arrow ets-testimonial-arrow--prev"
                onClick={goToPrevTestimonial}
                aria-label="Previous testimonial"
              >
                <i className="fas fa-chevron-left" aria-hidden="true" />
              </button>
              <div className="ets-testimonial-slider__viewport">
                <div
                  className="ets-testimonial-slider__track"
                  style={{ transform: `translate3d(-${activeTestimonial * 100}%, 0, 0)` }}
                >
                  {testimonials.items?.map((item, index) => (
                    <article
                      key={item.name}
                      className="ets-testimonial-card"
                      aria-hidden={index !== activeTestimonial}
                    >
                      <div className="ets-testimonial-card__logo" aria-label={item.company}>
                        {item.logoImage ? (
                          <img
                            src={resolveCmsAssetUrl(item.logoImage)}
                            alt={item.company || item.name}
                            className="ets-testimonial-card__logo-img"
                            loading="lazy"
                          />
                        ) : (
                          <>
                            <span className="ets-testimonial-card__logo-primary">{item.logoPrimary}</span>
                            {item.logoSecondary ? (
                              <span className="ets-testimonial-card__logo-secondary">{item.logoSecondary}</span>
                            ) : null}
                          </>
                        )}
                      </div>
                      <div className="ets-testimonial-card__content">
                        <div className="ets-testimonial-card__mark" aria-hidden="true">
                          “
                        </div>
                        <p className="ets-testimonial-card__quote">{item.quote}</p>
                        <div className="ets-testimonial-card__author">
                          <strong>{item.name}</strong>
                          <span>{item.role}</span>
                          <span className="ets-testimonial-card__company">{item.company}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="ets-testimonial-arrow ets-testimonial-arrow--next"
                onClick={goToNextTestimonial}
                aria-label="Next testimonial"
              >
                <i className="fas fa-chevron-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section className="ets-section rac-faq-section">
          <div className="ets-container">
            <div className="ets-faq__header">
              <h2 className="ets-h2">
                {faq.titlePrefix} <span>{faq.titleHighlight}</span>
              </h2>
            </div>
            <div className="ets-faq-list">
              {faq.items?.map((item) => (
                <details key={item.question} className="ets-faq-item">
                  <summary>{item.question}</summary>
                  {item.answer ? <p>{item.answer}</p> : null}
                  {item.list?.length ? (
                    <ul>
                      {item.list.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  ) : null}
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ets-final rac-final" id="rac-lead-section" style={getFinalBackgroundStyle(form.backgroundImage)}>
          <div className="ets-container rac-final__grid">
            <div className="rac-final__form-wrap">
              <RacLeadForm
                variant="final"
                formId="rac-final-form"
                submitting={submitting}
                setSubmitting={setSubmitting}
                onSuccess={() => setShowSuccess(true)}
                formCopy={form}
              />
            </div>
          </div>
        </section>
      </main>
      {showSuccess ? <SubmissionSuccessOverlay onDone={() => setShowSuccess(false)} /> : null}
    </div>
  )
}

export default RacLanding
