export function setPageMetaDescription(description) {
  if (!description) return
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)

  const og = document.querySelector('meta[property="og:description"]')
  if (og) og.setAttribute('content', description)

  const twitter = document.querySelector('meta[name="twitter:description"]')
  if (twitter) twitter.setAttribute('content', description)
}
