import { useRef, useState } from 'react'
import { useMainScroll } from '../hooks/useMainScroll'
import { useLang } from '../i18n/context'
import { NAV_ITEMS } from '../navigation'
import { href, useRoute } from '../router'
import styles from './BottomNav.module.css'

/**
 * Navigation flottante façon « island ».
 * Si une page est plus haute que l'écran, l'island se compacte (icônes seules)
 * quand on descend, et se déploie quand on remonte, au survol / focus,
 * en haut et en bas de page.
 */
export function BottomNav() {
  const { t } = useLang()
  const route = useRoute()
  const [compact, setCompact] = useState(false)
  const lastY = useRef(0)

  useMainScroll((el) => {
    const y = el.scrollTop
    const nearBottom = el.scrollHeight - el.clientHeight - y < 48
    if (y < 80 || nearBottom) setCompact(false)
    else if (y > lastY.current + 6) setCompact(true)
    else if (y < lastY.current - 6) setCompact(false)
    lastY.current = y
  })

  return (
    <nav className={`${styles.island} ${compact ? styles.compact : ''}`} aria-label={t('nav.label')}>
      <ul className={styles.list}>
        {NAV_ITEMS.map(({ route: target, label, Icon }) => (
          <li key={target}>
            <a
              href={href(target)}
              className={styles.item}
              aria-current={route === target ? 'page' : undefined}
            >
              <Icon className={styles.icon} width={20} height={20} />
              <span className={styles.label}>
                <span>{t(label)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
