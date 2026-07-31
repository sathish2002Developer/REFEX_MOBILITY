/** Meta descriptions for non-CMS static pages. */
export const STATIC_PAGE_META = {
  investorRelations: {
    pageTitle: 'Investor Relations | Refex Mobility',
    metaDescription:
      'Explore Refex Mobility Investor Relations. Discover our premium, safe, sustainable corporate mobility solutions in India, financial performance, and clean transport growth.',
  },
  etsLanding: {
    pageTitle: 'AI-Powered Employee Transport Solutions | Refex Mobility',
    metaDescription:
      'Manage commute operations end-to-end with AI-powered routing, real-time tracking & automated billing across 5 cities. Audit-ready reporting. Get a quote.',
  },
  racLanding: {
    pageTitle: 'Corporate Cab Rentals & Airport Transfers | Refex Mobility',
    metaDescription:
      'Book reliable cabs for business travel, daily rentals, outstation & airport transfers across 5 cities. EV & CNG fleet, verified drivers. Get a quote.',
  },
}

export function applyPageMeta({ pageTitle, metaDescription }) {
  if (pageTitle) {
    document.title = pageTitle

    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', pageTitle)

    let twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta')
      twitterTitle.setAttribute('name', 'twitter:title')
      document.head.appendChild(twitterTitle)
    }
    twitterTitle.setAttribute('content', pageTitle)
  }

  if (!metaDescription) return

  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', metaDescription)

  let og = document.querySelector('meta[property="og:description"]')
  if (!og) {
    og = document.createElement('meta')
    og.setAttribute('property', 'og:description')
    document.head.appendChild(og)
  }
  og.setAttribute('content', metaDescription)

  let twitter = document.querySelector('meta[name="twitter:description"]')
  if (!twitter) {
    twitter = document.createElement('meta')
    twitter.setAttribute('name', 'twitter:description')
    document.head.appendChild(twitter)
  }
  twitter.setAttribute('content', metaDescription)
}
