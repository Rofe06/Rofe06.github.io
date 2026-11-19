import { journey } from '../data/experience'
import { useLang } from '../i18n/context'
import { BriefcaseIcon, GraduationIcon } from './icons'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import styles from './Timeline.module.css'

export function Timeline() {
  const { t, tr } = useLang()

  return (
    <div className="container">
      <Reveal>
        <SectionHeader eyebrow={t('nav.journey')} title={t('journey.title')} />
      </Reveal>

      <ol className={styles.timeline}>
        {journey.map((item, i) => {
          const Icon = item.kind === 'education' ? GraduationIcon : BriefcaseIcon
          return (
            <li key={i} className={styles.item}>
              <span className={styles.marker} aria-hidden>
                <Icon width={16} height={16} />
              </span>
              <Reveal delay={60}>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.period}>{tr(item.period)}</span>
                    <span className={styles.kind}>
                      {item.kind === 'education' ? t('journey.education') : t('journey.work')}
                    </span>
                  </div>
                  <h3 className={styles.title}>{tr(item.title)}</h3>
                  <p className={styles.org}>
                    {item.organization}
                    {item.location && <span> · {item.location}</span>}
                  </p>
                  <p className={styles.description}>{tr(item.description)}</p>
                  {item.tags && item.tags.length > 0 && (
                    <ul className={`tag-list ${styles.tags}`}>
                      {item.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
