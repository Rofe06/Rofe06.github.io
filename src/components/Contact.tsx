import { profile } from '../data/profile'
import { useLang } from '../i18n/context'
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import { Reveal } from './Reveal'
import styles from './Contact.module.css'

const YEAR = new Date().getFullYear()

export function Contact() {
  const { t, tr } = useLang()

  return (
    <div className="container">
      <Reveal>
        <div className={`card ${styles.panel}`}>
          <div className={styles.glow} aria-hidden />
          <p className={styles.eyebrow}>{t('nav.contact')}</p>
          <h1 className={styles.title}>{t('contact.title')}</h1>
          <p className={styles.text}>{t('contact.text')}</p>

          <div className={styles.actions}>
            <a href={`mailto:${profile.links.email}`} className="btn btn-primary">
              <MailIcon />
              {t('contact.cta')}
            </a>
            {profile.cv && (
              <a href={tr(profile.cv)} className="btn" download>
                <DownloadIcon />
                {t('contact.cv')}
              </a>
            )}
          </div>

          <p className={`mono ${styles.email}`}>{profile.links.email}</p>

          <ul className={styles.socials}>
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <GitHubIcon width={18} height={18} />
                GitHub
              </a>
            </li>
            {profile.links.linkedin && (
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  <LinkedInIcon width={18} height={18} />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </Reveal>

      <p className={styles.copyright}>
        © {YEAR} {profile.name} · <span className="mono">{t('footer.built')}</span>
      </p>
    </div>
  )
}
