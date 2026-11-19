import { Suspense } from 'react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { DEMOS } from '../demos'
import { useLang } from '../i18n/context'
import { useLocation } from '../router'
import { ArrowRightIcon } from './icons'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import styles from './Projects.module.css'

export function Projects() {
  const { t } = useLang()
  const { param } = useLocation()

  // #/projects/<id> : page de démo jouable (chargée à la demande).
  const Demo = param ? DEMOS[param] : undefined
  if (Demo) {
    return (
      <Suspense fallback={<div className="container" aria-busy="true" />}>
        <Demo />
      </Suspense>
    )
  }

  return (
    <div className="container">
      <Reveal>
        <SectionHeader
          eyebrow={t('nav.projects')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          aside={
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="btn">
              {t('projects.more')}
              <ArrowRightIcon />
            </a>
          }
        />
      </Reveal>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 100}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
