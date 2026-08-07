import React, { useEffect, useState } from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Header from '../components/Header'
import GoogleAdsLandingTag from '../components/GoogleAdsLandingTag'
import LandingClientLogos from '../components/LandingClientLogos'
import SubmissionSuccessOverlay from '../components/SubmissionSuccessOverlay'
import { sanitizeCmsHtml } from '../utils/sanitizeHtml'
import { useCmsPage } from '../hooks/useCmsPage'
import {
  API_BASE_URL,
  RECAPTCHA_SITE_KEY,
  isLocalhost as isLocalhostHost,
} from '../constants/businessForm'
import { resolveCmsAssetUrl, getHeroBackgroundStyle } from '../utils/cmsAssetUrl'
import { trackGoogleAdsConversion } from '../utils/googleAds'
import './EtsLanding.css'
import './RacLanding.css'

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  companyName: '',
  numberOfEmployees: '',
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

function EtsLeadForm({
  formId,
  submitting,
  setSubmitting,
  onSuccess,
  variant = 'default',
  formCopy,
}) {
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
      numberOfEmployees: form.numberOfEmployees.trim() ? '' : 'Number of employees is required',
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
        recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'ets_lead' })
      }
    } catch (_) {
      recaptchaToken = ''
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/business-commute/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          companyName: form.companyName.trim(),
          email: form.email.trim(),
          phone: form.phone.startsWith('+') ? form.phone : `+${form.phone}`,
          service: ['Employee Transfers'],
          department: 'Enterprise Mobility',
          regions: ['All Regions'],
          numberOfEmployees: form.numberOfEmployees.trim(),
          comment: 'Lead from ETS Landing Page',
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
      trackGoogleAdsConversion('employeeTransportation').catch(() => {})
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
      <h3 className="ets-form-card__title">{formCopy.title}</h3>
      <p className="ets-form-card__note">{formCopy.note}</p>
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
                <label htmlFor={`${formId}-employees`}>Number of employees</label>
                <select
                  id={`${formId}-employees`}
                  value={form.numberOfEmployees}
                  onChange={(e) => updateField('numberOfEmployees', e.target.value)}
                >
                  <option value="">Select range</option>
                  <option value="1-50">1–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201-500">201–500</option>
                  <option value="501-1000">501–1,000</option>
                  <option value="1000+">1,000+</option>
                </select>
                {errors.numberOfEmployees ? (
                  <div className="ets-field-error">{errors.numberOfEmployees}</div>
                ) : null}
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
              <label htmlFor={`${formId}-employees`}>Number of employees</label>
              <select
                id={`${formId}-employees`}
                value={form.numberOfEmployees}
                onChange={(e) => updateField('numberOfEmployees', e.target.value)}
              >
                <option value="">Select range</option>
                <option value="1-50">1–50</option>
                <option value="51-200">51–200</option>
                <option value="201-500">201–500</option>
                <option value="501-1000">501–1,000</option>
                <option value="1000+">1,000+</option>
              </select>
              {errors.numberOfEmployees ? (
                <div className="ets-field-error">{errors.numberOfEmployees}</div>
              ) : null}
            </div>
          </>
        )}
        {apiError ? <div className="ets-form-error">{apiError}</div> : null}
        <button type="submit" className="ets-btn ets-btn--primary" disabled={submitting}>
          {submitting ? formCopy.submittingText : formCopy.buttonText}
        </button>
      </form>
    </div>
  )
}

const EtsLanding = () => {
  const cms = useCmsPage('employee-transportation')
  const { hero, logos, problems, midCta, features, testimonials, faq, form } = cms.sections
  const testimonialItems = testimonials.items ?? []

  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false)
  const [finalSectionRef, finalInView] = useInViewOnce(0.2)

  useEffect(() => {
    document.body.className =
      'page-template-default page page-ets-landing elementor-default elementor-kit-6330'
    return () => {
      document.body.className = ''
    }
  }, [])

  useEffect(() => {
    if (isLocalhostHost() || !RECAPTCHA_SITE_KEY) return undefined
    if (document.getElementById('ets-recaptcha-script')) return undefined
    const script = document.createElement('script')
    script.id = 'ets-recaptcha-script'
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    document.body.appendChild(script)
    return undefined
  }, [])

  useEffect(() => {
    if (isTestimonialPaused || testimonialItems.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialItems.length)
    }, 2800)
    return () => window.clearInterval(timer)
  }, [isTestimonialPaused, testimonialItems.length])

  const goToPrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonialItems.length) % testimonialItems.length)
  }

  const goToNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonialItems.length)
  }

  const scrollToHeroForm = (e) => {
    e?.preventDefault?.()
    document.getElementById('ets-lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div id="page" className="site ets-page rac-page">
      <GoogleAdsLandingTag pagePath="/employee-transportation" />
      <Header />
      <main>
        <section className="ets-hero" style={getHeroBackgroundStyle(hero.backgroundImage)}>
          <div className="ets-container ets-hero__grid">
            <div className="ets-hero__copy">
              <h1 className="ets-h1">
                {hero.titleLine1}
                <br />
                <span>{hero.titleHighlight}</span>
              </h1>
              <p className="ets-lead">{hero.lead}</p>
              <ul className="ets-highlights">
                {(hero.highlights ?? []).map((item) => (
                  <li key={item.text}>{item.text}</li>
                ))}
              </ul>
              <div className="rac-hero-stats rac-hero-stats--ets">
                {(hero.trustStats ?? []).map((stat) => (
                  <div key={stat.label} className="rac-hero-stats__item">
                    <strong className="rac-hero-stats__value">{stat.value}</strong>
                    <span className="rac-hero-stats__label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <EtsLeadForm
              variant="compact"
              formId="ets-lead-form"
              submitting={submitting}
              setSubmitting={setSubmitting}
              onSuccess={() => setShowSuccess(true)}
              formCopy={form}
            />
          </div>
        </section>
        <LandingClientLogos
          titlePrefix={logos.titlePrefix}
          titleHighlight={logos.titleHighlight}
          items={logos.items}
        />

        <section className="ets-section ets-problems-section">
          <div className="ets-container">
            <div className="ets-problems__intro">
              <h2 className="ets-h2 ets-problems__title">
                {problems.titlePrefix || problems.titleHighlight ? (
                  <>
                    {problems.titlePrefix}{' '}
                    {problems.titleHighlight ? <span>{problems.titleHighlight}</span> : null}
                  </>
                ) : (
                  problems.title
                )}
              </h2>
              <p className="ets-lead">{problems.lead}</p>
            </div>
            <div className="rac-problems-table-wrap">
              <table className="rac-problems-table">
                <thead>
                  <tr>
                    <th scope="col">Problem</th>
                    <th scope="col">Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {(problems.blocks ?? []).map((block, i) => (
                    <tr key={`${i}-${block.fixTitle || 'row'}`}>
                      <td
                        className="rac-problems-table__rich"
                        dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(block.problem) }}
                      />
                      <td
                        className="rac-problems-table__rich"
                        dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(block.fix) }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="ets-mid-cta">
          <div className="ets-container ets-mid-cta__inner">
            <div className="ets-mid-cta__copy">
              {midCta.title ? <p className="ets-mid-cta__title">{midCta.title}</p> : null}
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
                  {(features.items ?? []).map((feature) => (
                    <li key={feature.label} className="rac-features-step">
                      <span className="rac-features-step__icon" aria-hidden="true">
                        <i className={`fa ${feature.icon}`} />
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
                  {testimonialItems.map((item, index) => (
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
                          "
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
              {(faq.items ?? []).map((item) => (
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

        <section
          ref={finalSectionRef}
          className={`ets-final rac-final${finalInView ? ' is-in-view' : ''}`}
          id="ets-lead-section"
        >
          {form.backgroundImage ? (
            <div className="rac-final__media" aria-hidden="true">
              <img src={resolveCmsAssetUrl(form.backgroundImage)} alt="" />
            </div>
          ) : null}
          <div className="rac-final__scrim" aria-hidden="true" />
          <div className="ets-container rac-final__grid">
            <div className="rac-final__form-wrap">
              <EtsLeadForm
                variant="final"
                formId="ets-final-form"
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

export default EtsLanding
