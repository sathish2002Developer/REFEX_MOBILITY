import { useCmsPage } from './useCmsPage'

export function useHomeCms() {
  return useCmsPage('home', { heroStyleId: 'hero-background-style' })
}
