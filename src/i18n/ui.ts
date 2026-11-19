import type { Lang } from './types'

/** Libellés de l'interface. Le contenu (projets, parcours…) vit dans src/data. */
const fr = {
  'nav.home': 'Accueil',
  'nav.about': 'À propos',
  'nav.skills': 'Compétences',
  'nav.projects': 'Projets',
  'nav.journey': 'Parcours',
  'nav.contact': 'Contact',
  'nav.label': 'Navigation principale',

  'lang.label': 'Choisir la langue',

  'hero.available': 'Ouvert aux opportunités',
  'hero.greeting': 'Bonjour, je suis',
  'hero.ctaProjects': 'Voir mes projets',
  'hero.ctaContact': 'Me contacter',

  'about.title': 'Qui suis-je ?',

  'skills.title': 'Compétences Techniques',

  'projects.title': 'Projets sélectionnés',
  'projects.subtitle': 'Quelques projets dont je suis fier, de l’école comme de mon temps libre.',
  'projects.code': 'Code source',
  'projects.demo': 'Démo',
  'projects.more': 'Voir tous mes projets sur GitHub',
  'projects.play': 'Jouer',

  'demo.back': 'Projets',
  'demo.start': 'Lancer la partie',
  'demo.startHint': 'Le son sera activé',
  'demo.loading': 'Chargement de l’émulateur…',
  'demo.error': 'Impossible de lancer l’émulateur.',
  'demo.retry': 'Réessayer',
  'demo.pause': 'Pause',
  'demo.resume': 'Reprendre',
  'demo.paused': 'En pause',
  'demo.reset': 'Redémarrer',
  'demo.mute': 'Couper le son',
  'demo.unmute': 'Activer le son',
  'demo.fullscreen': 'Plein écran',
  'demo.palette': 'Palette',
  'demo.palette.site': 'Rofe',
  'demo.palette.classic': 'Classique',
  'demo.palette.gray': 'Gris',
  'demo.controls': 'Contrôles',
  'demo.gamepad': 'Manette',
  'demo.dpad': 'Croix',
  'demo.key.arrows': 'Flèches',
  'demo.key.enter': 'Entrée',
  'demo.key.shift': 'Maj',
  'demo.key.space': 'Espace',
  'demo.emulatedWith': 'Émulé dans le navigateur avec',

  'journey.title': 'Mon Parcours',
  'journey.education': 'Formation',
  'journey.work': 'Expérience',

  'contact.title': 'Travaillons ensemble',
  'contact.text':
    'Un stage, une alternance ou un projet en tête ? Je suis toujours partant pour échanger. Ma boîte mail est ouverte.',
  'contact.cta': 'Envoyer un email',
  'contact.cv': 'Télécharger mon CV',

  'footer.built': 'Conçu et développé avec React & Vite.',
}

export type UIKey = keyof typeof fr

const en: Record<UIKey, string> = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.projects': 'Projects',
  'nav.journey': 'Journey',
  'nav.contact': 'Contact',
  'nav.label': 'Main navigation',

  'lang.label': 'Choose language',

  'hero.available': 'Open to opportunities',
  'hero.greeting': 'Hi, I’m',
  'hero.ctaProjects': 'See my work',
  'hero.ctaContact': 'Get in touch',

  'about.title': 'Who am I?',

  'skills.title': 'Hard Skills',

  'projects.title': 'Selected projects',
  'projects.subtitle': 'A few projects I’m proud of, from school and from my spare time.',
  'projects.code': 'Source code',
  'projects.demo': 'Live demo',
  'projects.more': 'See all my projects on GitHub',
  'projects.play': 'Play',

  'demo.back': 'Projects',
  'demo.start': 'Start playing',
  'demo.startHint': 'Sound will be on',
  'demo.loading': 'Loading emulator…',
  'demo.error': 'Could not start the emulator.',
  'demo.retry': 'Try again',
  'demo.pause': 'Pause',
  'demo.resume': 'Resume',
  'demo.paused': 'Paused',
  'demo.reset': 'Restart',
  'demo.mute': 'Mute',
  'demo.unmute': 'Unmute',
  'demo.fullscreen': 'Fullscreen',
  'demo.palette': 'Palette',
  'demo.palette.site': 'Rofe',
  'demo.palette.classic': 'Classic',
  'demo.palette.gray': 'Gray',
  'demo.controls': 'Controls',
  'demo.gamepad': 'Gamepad',
  'demo.dpad': 'D-pad',
  'demo.key.arrows': 'Arrow keys',
  'demo.key.enter': 'Enter',
  'demo.key.shift': 'Shift',
  'demo.key.space': 'Space',
  'demo.emulatedWith': 'Emulated in the browser with',

  'journey.title': 'My Journey',
  'journey.education': 'Education',
  'journey.work': 'Experience',

  'contact.title': 'Let’s work together',
  'contact.text':
    'An internship, a work-study position or a project in mind? I’m always happy to talk. My inbox is open.',
  'contact.cta': 'Send an email',
  'contact.cv': 'Download my resume',

  'footer.built': 'Designed and built with React & Vite.',
}

export const ui: Record<Lang, Record<UIKey, string>> = { fr, en }
