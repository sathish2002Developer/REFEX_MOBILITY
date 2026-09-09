import ReliableIcon from '../assets/brand-values/reliable-handshake.jpg'
import SafeIcon from '../assets/brand-values/safe-shield.jpg'
import SustainableIcon from '../assets/brand-values/sustainable-infinity.jpg'

const ICONS_BY_LABEL = {
  Reliable: ReliableIcon,
  Safe: SafeIcon,
  Sustainable: SustainableIcon,
}

const ICONS_BY_INDEX = [ReliableIcon, SafeIcon, SustainableIcon]

export function resolveBrandValueIcon(item = {}, index = 0) {
  const label = String(item.label || '').trim()
  return ICONS_BY_LABEL[label] || ICONS_BY_INDEX[index] || ''
}
