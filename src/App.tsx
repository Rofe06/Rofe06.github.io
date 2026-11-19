import { useEffect, useRef, type ComponentType } from 'react'
import { About } from './components/About'
import { Backdrop } from './components/Backdrop'
import { BottomNav } from './components/BottomNav'
import { Contact } from './components/Contact'
import { Home } from './components/Home'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Timeline } from './components/Timeline'
import { TopBar } from './components/TopBar'
import { profile } from './data/profile'
import { projects } from './data/projects'
import { useLang } from './i18n/context'
import { MAIN_ID, NAV_ITEMS } from './navigation'
import { useLocation, type Route } from './router'

const PAGES: Record<Route, ComponentType> = {
  home: Home,
  about: About,
  skills: Skills,
  projects: Projects,
  journey: Timeline,
  contact: Contact,
}

export default function App() {
  const { t, tr } = useLang()
  const { route, param } = useLocation()
  const pageKey = param ? `${route}/${param}` : route
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // Titre de l'onglet + description selon la page et la langue.
  useEffect(() => {
    const item = NAV_ITEMS.find((i) => i.route === route)
    const demo = param ? projects.find((p) => p.play === param) : undefined
    document.title = demo
      ? `${demo.title} — ${profile.name}`
      : item
        ? `${t(item.label)} — ${profile.name}`
        : `${profile.name} — ${tr(profile.role)}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', tr(profile.tagline))
  }, [route, param, t, tr])

  // Changement de page : retour en haut et focus sur le contenu (accessibilité clavier).
  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    main.scrollTo({ top: 0 })
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    main.focus({ preventScroll: true })
  }, [pageKey])

  const Page = PAGES[route]

  return (
    <>
      <Backdrop />
      <TopBar />
      <main id={MAIN_ID} ref={mainRef} className="viewport" tabIndex={-1}>
        <div key={pageKey} className="page">
          <Page />
        </div>
      </main>
      <BottomNav />
    </>
  )
}
