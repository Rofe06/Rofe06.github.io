import { useSyncExternalStore } from 'react'

/*
 * Mini-routeur par hash (#/projects, #/projects/cartridge…), sans dépendance.
 * Le hash fonctionne sur GitHub Pages sans configuration serveur :
 * liens directs et rechargement de page inclus.
 */

export const ROUTES = ['home', 'about', 'skills', 'projects', 'journey', 'contact'] as const
export type Route = (typeof ROUTES)[number]

export interface Location {
  route: Route
  /** Sous-page éventuelle, ex. 'cartridge' dans #/projects/cartridge. */
  param?: string
}

export function parseHash(hash: string): Location {
  const [name, param] = hash.replace(/^#\/?/, '').split('?')[0].split('/')
  if (!(ROUTES as readonly string[]).includes(name)) return { route: 'home' }
  return { route: name as Route, param: param || undefined }
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash

export function useLocation(): Location {
  return parseHash(useSyncExternalStore(subscribe, getHash))
}

export function useRoute(): Route {
  return useLocation().route
}

export function href(route: Route, param?: string) {
  if (route === 'home') return '#/'
  return param ? `#/${route}/${param}` : `#/${route}`
}
