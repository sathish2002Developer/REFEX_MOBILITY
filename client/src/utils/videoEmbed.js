/** Parse common video URLs into embed-friendly sources for modal playback. */
export function parseVideoUrl(url) {
  const raw = String(url || '').trim()
  if (!raw) return null

  const youtubeMatch =
    raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/) ||
    raw.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/)
  if (youtubeMatch) {
    const id = youtubeMatch[1]
    return {
      type: 'iframe',
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    }
  }

  const vimeoMatch = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) {
    return {
      type: 'iframe',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    }
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(raw) || raw.startsWith('/uploads/') || raw.startsWith('/wp-content/')) {
    return { type: 'file', embedUrl: raw }
  }

  if (/^https?:\/\//i.test(raw)) {
    return { type: 'iframe', embedUrl: raw }
  }

  return null
}
