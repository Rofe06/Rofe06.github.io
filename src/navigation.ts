import type { ComponentType, SVGProps } from 'react'
import { CodeIcon, FolderIcon, MailIcon, RouteIcon, UserIcon } from './components/icons'
import type { UIKey } from './i18n/ui'
import type { Route } from './router'

export interface NavItem {
  route: Exclude<Route, 'home'>
  label: UIKey
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

/** Pages affichées dans l'island de navigation, dans l'ordre. */
export const NAV_ITEMS: NavItem[] = [
  { route: 'about', label: 'nav.about', Icon: UserIcon },
  { route: 'skills', label: 'nav.skills', Icon: CodeIcon },
  { route: 'projects', label: 'nav.projects', Icon: FolderIcon },
  { route: 'journey', label: 'nav.journey', Icon: RouteIcon },
  { route: 'contact', label: 'nav.contact', Icon: MailIcon },
]

/** Id du conteneur qui défile (si le contenu d'une page dépasse l'écran). */
export const MAIN_ID = 'main'
