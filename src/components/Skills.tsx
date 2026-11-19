import { skills, softSkills, spokenLanguages, type SkillGroup, type SkillItem } from '../data/skills'
import { useLang } from '../i18n/context'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import styles from './Skills.module.css'

function GroupCard({ group, label }: { group: SkillGroup; label: (item: SkillItem) => string }) {
  const { tr } = useLang()
  return (
    <article className={`card ${styles.group}`}>
      <h2 className={styles.title}>{tr(group.title)}</h2>
      <ul className="tag-list">
        {group.items.map((item, i) => (
          <li key={i} className="tag">
            {label(item)}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Skills() {
  const { t, tr } = useLang()
  const label = (item: SkillItem) => (typeof item === 'string' ? item : tr(item))

  return (
    <div className="container">
      <Reveal>
        <SectionHeader eyebrow={t('nav.skills')} title={t('skills.title')} />
      </Reveal>

      <div className={styles.grid}>
        {skills.map((group, i) => (
          <Reveal key={i} delay={i * 80}>
            <GroupCard group={group} label={label} />
          </Reveal>
        ))}
      </div>

      <div className={`${styles.grid} ${styles.secondary}`}>
        <Reveal delay={320}>
          <article className={`card ${styles.group}`}>
            <h2 className={styles.title}>{tr(spokenLanguages.title)}</h2>
            <dl className={styles.languages}>
              {spokenLanguages.items.map((lang, i) => (
                <div key={i} className={styles.language}>
                  <dt>{tr(lang.name)}</dt>
                  <dd>{tr(lang.level)}</dd>
                </div>
              ))}
            </dl>
            {spokenLanguages.note && <p className={styles.note}>{tr(spokenLanguages.note)}</p>}
          </article>
        </Reveal>

        <Reveal delay={400}>
          <GroupCard group={softSkills} label={label} />
        </Reveal>
      </div>
    </div>
  )
}
