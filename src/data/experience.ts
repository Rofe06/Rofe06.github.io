import type { Localized } from '../i18n/types'

export interface JourneyItem {
  kind: 'education' | 'work'
  period: Localized
  title: Localized
  organization: string
  location?: string
  description: Localized
  tags?: string[]
}

export const journey: JourneyItem[] = [
  {
    kind: 'education',
    period: { fr: '2021 - 2024', en: '2021 - 2024' },
    title: { fr: 'Baccalauréat', en: 'High school Diploma' },
    organization: 'Don Bosco Nice',
    description: {
      fr: 'Spécialités Histoire Géopolitique, Anglais Contemporain et Droit.',
      en: 'Majors in History & Geopolitics, Contemporary English and Law.',
    },
  },
  {
    kind: 'education',
    period: { fr: '2024 — Aujourd’hui', en: '2024 — Present' },
    title: {
      fr: 'Programme Grande École — Expert en technologies de l’information',
      en: 'Master’s Program — Expert in Information Technology',
    },
    organization: 'Epitech',
    description: {
      fr: 'Pédagogie par projets : programmation système, algorithmie, développement objet, web, DevOps et gestion de projet en équipe.',
      en: 'Project-based learning: systems programming, algorithms, object-oriented development, web, DevOps and team project management.',
    },
  },
  {
    kind: 'work',
    period: { fr: 'Août 2025 - Janv.2026', en: 'Aug. 2025 - Jan. 2026' },
    title: { fr: 'Stage Développeur Full-Stack', en: 'Full-Stack Developer Internship' },
    organization: 'Métropole Nice Côte d’Azur',
    description: {
      fr: 'Développement d’un dashboard en React pour l’annualisation des contrats, la gestion des contrats et la gestion des congés.',
      en: 'Development of a React dashboard for contract annualization, contract management and leave management.',
    },
  },
    {
      kind: 'work',
      period: { fr: '2026', en: '2026' },
      title: { fr: 'Auto-Entrepreneur', en: 'Self-Employed' },
      organization: '',
      description: {
        fr: 'Entrepreneur Freelance développant des Solutions Web pour des PME et Services Com-munaux.',
        en: 'Freelance Entrepreneur developing Web Solutions for SMEs and Municipal Services.',
      },
    },  
]
