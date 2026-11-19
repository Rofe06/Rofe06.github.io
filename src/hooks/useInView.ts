import { useEffect, useRef, useState } from 'react'

/** Passe à `true` la première fois que l'élément entre dans le viewport. */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null)
  // Sans IntersectionObserver (très vieux navigateurs), on affiche directement.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView] as const
}
