import type { Localized } from '../i18n/types'

export interface Project {
  title: string
  description: Localized
  tags: string[]
  /** Lien vers le dépôt de code. */
  repo?: string
  /** Lien vers une démo en ligne. */
  demo?: string
  /** Image d'aperçu placée dans /public (ex. '/projects/mysh.png'). */
  image?: string
  /** Id d'une démo jouable dans le site (voir src/demos/index.ts). */
  play?: string
}

/*
 * TODO : seul le premier projet (ce portfolio) est réel. Les autres sont des
 * EXEMPLES à remplacer par tes vrais projets avant de publier.
 */
export const projects: Project[] = [
  {
    title: 'Portfolio',
    description: {
      fr: 'Ce site : une application React + Vite bilingue, sans dépendance superflue, déployée automatiquement sur GitHub Pages via GitHub Actions.',
      en: 'This website: a bilingual React + Vite app with no unnecessary dependencies, automatically deployed to GitHub Pages with GitHub Actions.',
    },
    tags: ['React', 'TypeScript', 'Vite', 'CSS', 'GitHub Actions'],
  },
  {
    title: '42sh',
    description: {
      fr: 'Un interpréteur de commandes inspiré de tcsh : pipes, redirections, variables d’environnement et builtins, écrit en C sans bibliothèque externe.',
      en: 'A tcsh-inspired command interpreter: pipes, redirections, environment variables and builtins, written in C with no external libraries.',
    },
    tags: ['C', 'Unix', 'Makefile', 'System Programming', 'Low-level Programming'],
  },
  {
    title: 'R-Type',
    description: {
      fr: 'Un remake multijoueur en réseau et multiplaforme sur PC/Switch/3DS du shoot’em up horizontal R-Type, écrit en C++20 sur un moteur de jeu maison.',
      en: 'A networked, multiplayer and cross-platform (PC/Switch/3DS) remake of the R-Type horizontal shooter, written in C++20 on top of an in-house game engine.',
    },
    tags: ['C++', 'Raylib', 'OOP', 'Networking', 'Game Development', 'ECS'],
  },
  {
    title: 'Cartridge',
    description: {
      fr: 'Réalisation de jeu Game Boy en Assembler, avec les contraintes techniques du système. Récréation de Tetris.',
      en: 'A Game Boy game made in Assembler, with the technical constraints of the system. Recreation of Tetris.',
    },
    tags: ['Assembler', 'RGBASM', 'Low-level Programming', 'Game Development'],
    play: 'cartridge',
  },
  {
    title: 'Wolf3D',
    description: {
      fr: 'Réalisation de jeu de type Wolfenstein 3D en C, avec les contraintes techniques du système.',
      en: 'A Wolfenstein 3D-style game made in C, with the technical constraints of the system.',
    },
    tags: ['C', 'CSFML', 'Raycasting', 'Game Development'],
  },
  {
    title: 'JouéTekPlay',
    description: {
      fr: 'Création d\'un logiciel de lecture musicale pour un périphérique MIDI (JouéPlay), avec interface graphique et gestion des fichiers audio.',
      en: 'A music player software for a MIDI device (JouéPlay), with a graphical interface and audio file management.',
    },
    tags: ['C++', 'Software Engineering', 'Midi-Hardware', 'Music'],
  },
]
