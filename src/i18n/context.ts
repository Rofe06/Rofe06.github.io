import { createContext, useContext } from 'react'
import type { Lang, Localized } from './types'
import type { UIKey } from './ui'

export interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Libellé d'interface traduit. */
  t: (key: UIKey) => string
  /** Résout un champ de contenu { fr, en } dans la langue courante. */
  tr: (value: Localized) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang doit être utilisé dans <LanguageProvider>')
  return ctx
}
