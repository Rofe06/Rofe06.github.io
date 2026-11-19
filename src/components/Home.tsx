import { profile } from '../data/profile'
import { useLang } from '../i18n/context'
import { href } from '../router'
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import styles from './Home.module.css'

export function Home() {
  const { t, tr } = useLang()

  return (
    <div className={`container ${styles.home}`}>
      {profile.available && (
        <p className={`${styles.badge} ${styles.enter}`}>
          <span className={styles.dot} aria-hidden />
          {t('hero.available')}
        </p>
      )}

      <h1 className={`${styles.title} ${styles.enter}`} style={{ animationDelay: '80ms' }}>
        <span className={styles.greeting}>{t('hero.greeting')}</span>
        <span className="gradient-text">{profile.name}</span>
      </h1>

      <p className={`${styles.role} ${styles.enter}`} style={{ animationDelay: '160ms' }}>
        {tr(profile.role)}
      </p>

      <p className={`${styles.tagline} ${styles.enter}`} style={{ animationDelay: '240ms' }}>
        {tr(profile.tagline)}
      </p>

      <div className={`${styles.ctas} ${styles.enter}`} style={{ animationDelay: '320ms' }}>
        <a href={href('projects')} className="btn btn-primary">
          {t('hero.ctaProjects')}
          <ArrowRightIcon />
        </a>
        <a href={href('contact')} className="btn">
          {t('hero.ctaContact')}
        </a>
      </div>

      <ul className={`${styles.socials} ${styles.enter}`} style={{ animationDelay: '400ms' }}>
        <li>
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
        </li>
        {profile.links.linkedin && (
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </li>
        )}
        <li>
          <a href={`mailto:${profile.links.email}`} aria-label="Email">
            <MailIcon />
          </a>
        </li>
      </ul>
    </div>
  )
}
