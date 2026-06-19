/** Meta descriptions for non-CMS static pages. */
export const STATIC_PAGE_META = {
  investorRelations: {
    pageTitle: 'Investor Relations | Refex Mobility',
    metaDescription:
      'Explore Refex Mobility Investor Relations. Discover our premium, safe, sustainable corporate mobility solutions in India, financial performance, and clean transport growth.',
  },
}

export function applyPageMeta({ pageTitle, metaDescription }) {
  if (pageTitle) document.title = pageTitle
  if (!metaDescription) return
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', metaDescription)

  const og = document.querySelector('meta[property="og:description"]')
  if (og) og.setAttribute('content', metaDescription)

  const twitter = document.querySelector('meta[name="twitter:description"]')
  if (twitter) twitter.setAttribute('content', metaDescription)
}
