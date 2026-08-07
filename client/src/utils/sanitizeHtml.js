/** Minimal HTML sanitizer for CMS rich text (Problem/Fix cells). */
export function sanitizeCmsHtml(html) {
  if (!html) return ''
  const raw = String(html)
  // Plain text (legacy CMS values) — escape and keep line breaks
  if (!/<[a-z][\s\S]*>/i.test(raw)) {
    return raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>')
  }

  return raw
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
}
