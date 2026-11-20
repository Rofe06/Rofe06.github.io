import type { Localized } from '../i18n/types'

/*
 * ✏️  Informations personnelles : modifie ce fichier pour personnaliser le site.
 *     Les champs marqués TODO contiennent du contenu d'exemple à remplacer.
 */

export interface Profile {
  name: string
  role: Localized
  tagline: Localized
  available: boolean
  about: Localized[]
  facts: { label: Localized; value: Localized }[]
  /** Photo de la page « À propos » (dans /public). Sans photo, les initiales sont affichées. */
  photo?: string
  /** Portrait détouré (fond transparent) affiché sur l'accueil, au-dessus de la fenêtre de code. */
  portrait?: string
  links: {
    github: string
    linkedin?: string
    email: string
  }
  /** Chemins des CV placés dans /public. Laisser undefined pour masquer le bouton. */
  cv?: Localized
}

export const profile: Profile = {
  name: 'Raphaël GUILLOT',
  role: {
    fr: 'Développeur Full-Stack | Étudiant à Epitech Nice | Auto-Entrepreneur',
    en: 'Full-Stack Developer | Student at Epitech Nice | Self-Employed',
  },

  tagline: {
    // TODO
    fr: 'Étudiant à Epitech, je conçois des applications soignées, du bas niveau jusqu’à l’interface. Avec des prestations personnalisées',
    en: 'Student at Epitech, I build polished applications, from low-level code to the user interface. With personalized services',
  },

  available: true,
  about: [
    // TODO : paragraphes de présentation
    {
      fr: 'Je m’appelle Raphaël, étudiant en développement logiciel à Epitech Nice. Curieux et autonome, j’aime résoudre des problèmes concrets avec un code propre et maintenable. Je recherche actuellement un stage : n’hésitez pas à me contacter !',
      en: 'I’m Raphaël, a software development student at Epitech Nice. Curious and autonomous, I enjoy solving real-world problems with clean and maintainable code. I’m currently looking for an internship: feel free to contact me!',
    },
    {
      fr: 'À Epitech, la pédagogie par projets de l’école m’a appris à apprendre vite, à travailler en équipe et à mener un projet de A à Z, en programmation système comme en développement web, mobile, jeux vidéo et IA. En dehors des cours, j’explore de nouvelles technos et je soigne mon environnement Linux.',
      en: 'At Epitech, the school’s project-based learning taught me to learn quickly, work in a team and manage a project from A to Z, from systems programming to web, mobile, game and AI development. Outside of class, I explore new technologies and take care of my Linux environment.',
    },
  ],

  facts: [
    { label: { fr: 'Localisation', en: 'Location' }, value: { fr: 'France - Nice', en: 'France - Nice' } },
    { label: { fr: 'École', en: 'School' }, value: { fr: 'Epitech', en: 'Epitech' } },
  ],

  // Versions WebP optimisées de public/ppwbg.png et public/pp.png
  photo: '/images/photo.webp',
  portrait: '/images/portrait.webp',
  links: {
    github: 'https://github.com/Rofe06',
    linkedin: 'https://www.linkedin.com/in/raphaël-guillot-145a94336/',
    email: 'raphael.guillot@epitech.eu',
  },
  cv: undefined, // TODO : ex. { fr: '/cv-fr.pdf', en: '/cv-en.pdf' }
}
