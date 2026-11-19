import { useState } from 'react'
import { useMainScroll } from '../hooks/useMainScroll'
import { useLang } from '../i18n/context'
import { href, useRoute } from '../router'
import { LangSwitch } from './LangSwitch'
import styles from './TopBar.module.css'

export function TopBar() {
  const { t } = useLang()
  const route = useRoute()
  const [scrolled, setScrolled] = useState(false)

  useMainScroll((el) => setScrolled(el.scrollTop > 8))

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.bar}`}>
        <a
          href={href('home')}
          className={styles.logo}
          aria-label={t('nav.home')}
          aria-current={route === 'home' ? 'page' : undefined}
        >
          <span className="gradient-text">~/</span>rofe
        </a>
        <LangSwitch />
      </div>
    </header>
  )
}
