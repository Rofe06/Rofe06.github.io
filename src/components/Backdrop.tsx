import { useEffect, useRef } from 'react'
import styles from './Backdrop.module.css'

/** Fond d'ambiance global : halos colorés discrets + lueur qui suit la souris. */
export function Backdrop() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduced) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={styles.backdrop} aria-hidden>
      <div className={`${styles.blob} ${styles.blobA}`} />
      <div className={`${styles.blob} ${styles.blobB}`} />
      <div className={styles.spotlight} />
    </div>
  )
}
