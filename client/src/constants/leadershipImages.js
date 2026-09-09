import AnirudhArun from '../assets/leadership/anirudh-arun.png'
import MeetGoradia from '../assets/leadership/meet-goradia.png'
import AnkkitGroverr from '../assets/leadership/ankkit-groverr.png'
import SasikumarArumugham from '../assets/leadership/sasikumar-arumugham.png'

/** Bundled headshots — used when CMS has no custom upload yet. */
export const LEADERSHIP_DEFAULT_IMAGES = {
  'Anirudh Arun': AnirudhArun,
  'Meet Goradia': MeetGoradia,
  'Ankkit Groverr': AnkkitGroverr,
  'Sasikumar Arumugham': SasikumarArumugham,
}

export function resolveLeadershipImage(leader = {}) {
  const raw = String(leader.image || '').trim()
  const name = String(leader.name || '').trim()
  const bundled = LEADERSHIP_DEFAULT_IMAGES[name]

  // Placeholder paths or empty → bundled asset
  if (!raw || raw.includes('/uploads/leadership/')) {
    return bundled || ''
  }

  return raw
}
