import type { Localized } from '../i18n/types'

/** Un élément : texte identique dans les deux langues, ou traduit { fr, en }. */
export type SkillItem = string | Localized

export interface SkillGroup {
  title: Localized
  items: SkillItem[]
}

export interface SpokenLanguage {
  name: Localized
  level: Localized
}

/* ---- Compétences techniques ---- */
export const skills: SkillGroup[] = [
  {
    title: { fr: 'Langages', en: 'Programming Languages' },
    items: ['C/C++', 'ASM', 'Python', 'TypeScript', 'Kotlin', 'Rust'],
  },
  {
    title: { fr: 'Front-end', en: 'Front-end' },
    items: ['React', 'Vite', 'HTML', 'CSS'],
  },
  {
    title: { fr: 'Back-end & Données', en: 'Back-end & Data' },
    items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
  },
  {
    title: { fr: 'Outils & Environnement', en: 'Tools & Environment' },
    items: ['Git', 'Linux', 'Docker', 'GitHub Actions', 'CMake', 'Bash'],
  },
]

export const spokenLanguages: {
  title: Localized
  items: SpokenLanguage[]
  note?: Localized
} = {
  title: { fr: 'Langues', en: 'Languages' },
  items: [
    { name: { fr: 'Français', en: 'French' }, level: { fr: 'Natif', en: 'Native' } },
    { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'Bilingue (C2)*', en: 'Bilingual (C2)*' } },
    { name: { fr: 'Espagnol', en: 'Spanish' }, level: { fr: 'Intermédiaire (B2)', en: 'Intermediate (B2)' } },
  ],
  note: { fr: '*Équivalent TOEIC 870', en: '*TOEIC 870 equivalent' },
}

/* ---- Compétences humaines ---- */
export const softSkills: SkillGroup = {
  title: { fr: 'Compétences Humaines', en: 'Soft Skills' },
  items: [
    { fr: 'Communication', en: 'Communication' },
    { fr: 'Travail en équipe', en: 'Teamwork' },
    { fr: 'Autonomie', en: 'Self-reliance' },
    { fr: 'Curiosité', en: 'Curiosity' },
    { fr: 'Créativité', en: 'Creativity' },
    { fr: 'Adaptabilité', en: 'Adaptability' },
    { fr: 'Gestion de projet', en: 'Project Management' },
    { fr: 'Rigueur', en: 'Rigor' },
  ],
}
