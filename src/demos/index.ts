import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

/**
 * Démos jouables, accessibles via #/projects/<id>.
 * Chaque démo est chargée à la demande (code splitting) : elle ne pèse rien
 * sur le reste du site tant qu'on ne l'ouvre pas.
 */
export const DEMOS: Record<string, LazyExoticComponent<ComponentType>> = {
  cartridge: lazy(() => import('./cartridge/CartridgeDemo')),
}
