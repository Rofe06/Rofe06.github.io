import type { ReactNode } from 'react'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  /** Élément optionnel affiché à droite (ex. un lien). */
  aside?: ReactNode
}

export function SectionHeader({ eyebrow, title, subtitle, aside }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </header>
  )
}
