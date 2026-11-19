import type { Project } from '../data/projects'
import { useLang } from '../i18n/context'
import { href } from '../router'
import { ExternalIcon, FolderIcon, GitHubIcon, PlayIcon } from './icons'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  const { t, tr } = useLang()
  // Lien principal (toute la carte est cliquable) : démo jouable > démo en ligne > dépôt.
  const playHref = project.play ? href('projects', project.play) : undefined
  const mainLink = playHref ?? project.demo ?? project.repo
  const external = !playHref

  return (
    <article className={`card ${styles.card}`}>
      {project.image && (
        <div className={styles.media}>
          <img src={project.image} alt="" loading="lazy" />
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.top}>
          <h2 className={styles.title}>
            <FolderIcon className={styles.folder} width={18} height={18} />
            {mainLink ? (
              <a
                href={mainLink}
                className={styles.titleLink}
                {...(external && { target: '_blank', rel: 'noreferrer' })}
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h2>
          <div className={styles.links}>
            {playHref && (
              <a href={playHref} className={styles.play}>
                <PlayIcon width={14} height={14} />
                {t('projects.play')}
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`${t('projects.code')} — ${project.title}`}>
                <GitHubIcon width={18} height={18} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${t('projects.demo')} — ${project.title}`}>
                <ExternalIcon width={18} height={18} />
              </a>
            )}
          </div>
        </div>

        <p className={styles.description}>{tr(project.description)}</p>

        <ul className={`tag-list ${styles.tags}`}>
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
