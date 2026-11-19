import { useEffect, useRef } from 'react'
import { MAIN_ID } from '../navigation'

/**
 * Appelle `onScroll(el)` à chaque défilement du conteneur principal
 * (la page elle-même ne défile pas, seul <main> peut défiler).
 */
export function useMainScroll(onScroll: (el: HTMLElement) => void) {
  const callback = useRef(onScroll)

  useEffect(() => {
    callback.current = onScroll
  })

  useEffect(() => {
    const el = document.getElementById(MAIN_ID)
    if (!el) return
    const handler = () => callback.current(el)
    handler()
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [])
}
