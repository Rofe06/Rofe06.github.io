import { useLang } from '../i18n/context'
import { LANGS } from '../i18n/types'
import { Flag } from './flags'
import styles from './LangSwitch.module.css'

const LANG_NAMES = { fr: 'Français', en: 'English' } as const

export function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div className={styles.switch} role="group" aria-label={t('lang.label')}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={styles.option}
          aria-pressed={lang === l}
          aria-label={LANG_NAMES[l]}
          title={LANG_NAMES[l]}
          onClick={() => setLang(l)}
          lang={l}
        >
          <span className={styles.flag}>
            <Flag lang={l} />
          </span>
          <span aria-hidden>{l.toUpperCase()}</span>
        </button>
      ))}
      <span className={styles.thumb} data-pos={lang === LANGS[0] ? 'start' : 'end'} aria-hidden />
    </div>
  )
}
