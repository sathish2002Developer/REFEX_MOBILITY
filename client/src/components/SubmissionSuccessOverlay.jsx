import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './SubmissionSuccessOverlay.css'

/**
 * Fullscreen success overlay after form submission (Tailwind).
 * Scoped via #submission-success-overlay-root so WP/global CSS does not override utilities.
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#06121f]/90 font-poppins"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-success-title"
    >
      <div className="relative w-full max-w-3xl rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-[#06121f] via-[#071a2c] to-[#06121f] shadow-2xl overflow-hidden">
        <div
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative px-8 py-10 md:px-12 md:py-12">
          <div className="flex flex-col items-center text-center">
            {/* Success icon stack */}
            <div className="relative h-20 w-20 mb-6 shrink-0">
              <div
                className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-3 rounded-full border border-emerald-400/30 animate-spin [animation-duration:6s]"
                aria-hidden="true"
              />
              <div className="relative h-20 w-20 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span className="text-white text-2xl font-bold leading-none" aria-hidden="true">
                    ✓
                  </span>
                </div>
              </div>
            </div>

            {/* Copy block — gap-6 rhythm from icon via mb-6 above */}
            <div className="w-full max-w-2xl rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-6 py-5">
              <p
                id="submission-success-title"
                className="text-white text-lg md:text-xl font-semibold leading-snug"
              >
                Your enquiry has{' '}
                <span className="text-emerald-300">submitted successfully!</span>
              </p>
              <p className="mt-2 text-sm md:text-base text-slate-200/90 leading-relaxed">
                Thank you for reaching out to us.
                <br />
                <br />
                Our <span className="text-emerald-200 font-semibold">Agentic AI</span> will call
                you shortly for further enquiry and details. During the call, you can provide more
                details and also ask any queries regarding our businesses and our products.
              </p>
              <p className="mt-3 text-sm text-emerald-200 font-semibold">We&apos;re here to help!</p>
            </div>

            <button
              type="button"
              onClick={onDone}
              className="mt-2 text-xs text-slate-200/70 hover:text-slate-200 underline underline-offset-4 bg-transparent border-0 cursor-pointer font-poppins"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
