import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './SubmissionSuccessOverlay.css'

/**
 * Fullscreen success overlay after form submission.
 * Uses Refex primary red theme (--primary-color / #F4553B).
 *
 * @param {{ onDone: () => void }} props
 */
export default function SubmissionSuccessOverlay({ onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onDone()
    }, 10000)
    return () => window.clearTimeout(timer)
  }, [onDone])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return createPortal(
    <div
      id="submission-success-overlay-root"
      className="submission-success-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-success-title"
    >
      <div className="submission-success-card">
        <div className="submission-success-glow submission-success-glow--top" aria-hidden="true" />
        <div className="submission-success-glow submission-success-glow--bottom" aria-hidden="true" />

        <div className="submission-success-content">
          <div className="submission-success-icon-wrap">
            <div className="submission-success-icon-ring" aria-hidden="true" />
            <div className="submission-success-icon">
              <span aria-hidden="true">✓</span>
            </div>
          </div>

          <div className="submission-success-message">
            <p id="submission-success-title" className="submission-success-title">
              Your enquiry has{' '}
              <span className="submission-success-highlight">submitted successfully!</span>
            </p>
            <p className="submission-success-body">
              Thank you for reaching out to us.
              <br />
              <br />
              Our <span className="submission-success-accent">Agentic AI</span> will call you
              shortly for further enquiry and details. During the call, you can provide more details
              and also ask any queries regarding our businesses and our products.
            </p>
            <p className="submission-success-footer">We&apos;re here to help!</p>
          </div>

          <button type="button" onClick={onDone} className="submission-success-close-btn">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
