export type Lang = 'fr' | 'en'

export const LANGS: readonly Lang[] = ['fr', 'en']

/** Texte disponible dans chaque langue du site. */
export type Localized = Record<Lang, string>
