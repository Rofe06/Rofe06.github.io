import { profile } from '../data/profile'
import { useLang } from '../i18n/context'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import styles from './About.module.css'

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function About() {
  const { t, tr } = useLang()

  return (
    <div className="container">
      <Reveal>
        <SectionHeader eyebrow={t('nav.about')} title={t('about.title')} />
      </Reveal>

      <div className={styles.grid}>
        <Reveal className={styles.text}>
          {profile.about.map((paragraph, i) => (
            <p key={i}>{tr(paragraph)}</p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <aside className={`card ${styles.profileCard}`}>
            {profile.photo ? (
              <div className={styles.photo}>
                <img src={profile.photo} alt={profile.name} width={800} height={800} decoding="async" />
              </div>
            ) : (
              <div className={styles.avatar}>
                <span aria-hidden>{initials(profile.name)}</span>
              </div>
            )}
            <dl className={styles.facts}>
              {profile.facts.map((fact, i) => (
                <div key={i} className={styles.fact}>
                  <dt>{tr(fact.label)}</dt>
                  <dd>{tr(fact.value)}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Reveal>
      </div>
    </div>
  )
}
