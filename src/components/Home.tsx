import type { ReactNode } from 'react'
import { profile } from '../data/profile'
import { skills, spokenLanguages } from '../data/skills'
import { useLang } from '../i18n/context'
import { href } from '../router'
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import styles from './Home.module.css'

export function Home() {
  const { t, tr } = useLang()

  return (
    <div className={`container ${styles.home}`}>
      <div className={styles.intro}>
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

      <div className={styles.visual}>
        {profile.portrait && (
          <img
            className={`${styles.portrait} ${styles.enter}`}
            style={{ animationDelay: '200ms' }}
            src={profile.portrait}
            alt={profile.name}
            width={640}
            height={652}
            decoding="async"
          />
        )}
        <CodeCard />
      </div>
    </div>
  )
}

/* ---- Carte « fenêtre de code » : le profil présenté comme un objet TypeScript ---- */

const Str = ({ children }: { children: string }) => <span className={styles.str}>'{children}'</span>
const Key = ({ children }: { children: string }) => <span className={styles.key}>{children}</span>
const Kw = ({ children }: { children: string }) => <span className={styles.kw}>{children}</span>
const P = ({ children }: { children: string }) => <span className={styles.punc}>{children}</span>

function list(items: string[]): ReactNode {
  return items.map((item, i) => (
    <span key={item}>
      <Str>{item}</Str>
      {i < items.length - 1 && <P>, </P>}
    </span>
  ))
}

function CodeCard() {
  const { tr } = useLang()

  // Tout vient des fichiers de données : la carte se met à jour avec le contenu et la langue.
  const roles = tr(profile.role)
    .split('|')
    .map((r) => r.trim())
    .filter(Boolean)
  const location = profile.facts[0] ? tr(profile.facts[0].value) : undefined
  const stack = (skills[0]?.items ?? []).map((item) => (typeof item === 'string' ? item : tr(item)))
  const languages = spokenLanguages.items.map((l) => tr(l.name))

  const indent = (n: number) => ' '.repeat(n * 2)
  const prop = (name: string, value: ReactNode) => (
    <>
      {indent(1)}
      <Key>{name}</Key>
      <P>: </P>
      {value}
      <P>,</P>
    </>
  )

  const lines: ReactNode[] = [
    <>
      <Kw>const</Kw> developer <P>{'= {'}</P>
    </>,
    prop('name', <Str>{profile.name}</Str>),
    ...(location ? [prop('location', <Str>{location}</Str>)] : []),
    <>
      {indent(1)}
      <Key>roles</Key>
      <P>: [</P>
    </>,
    ...roles.map((role) => (
      <>
        {indent(2)}
        <Str>{role}</Str>
        <P>,</P>
      </>
    )),
    <>
      {indent(1)}
      <P>],</P>
    </>,
    prop('stack', <>{'['}{list(stack)}{']'}</>),
    prop('languages', <>{'['}{list(languages)}{']'}</>),
    prop('available', <span className={styles.bool}>{String(profile.available)}</span>),
    <>
      <P>{'}'}</P>
    </>,
    '',
    <>
      <Kw>export default</Kw> developer
      <span className={styles.cursor} aria-hidden />
    </>,
  ]

  return (
    <figure className={`${styles.code} ${styles.enter}`} style={{ animationDelay: '300ms' }} aria-hidden>
      <div className={styles.codeBar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.file}>~/rofe/developer.ts</span>
      </div>
      <pre className={styles.codeBody}>
        {lines.map((line, i) => (
          <span key={i} className={styles.line}>
            <span className={styles.ln}>{i + 1}</span>
            <span className={styles.lc}>{line}</span>
          </span>
        ))}
      </pre>
    </figure>
  )
}
