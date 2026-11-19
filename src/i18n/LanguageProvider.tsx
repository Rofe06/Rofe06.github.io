import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, type LanguageContextValue } from './context'
import type { Lang, Localized } from './types'
import { ui, type UIKey } from './ui'

const STORAGE_KEY = 'portfolio-lang'

function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr' || stored === 'en') return stored
  } catch {
    // Stockage indisponible (navigation privée, cookies bloqués…) : on ignore.
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Préférence non persistée : le site reste fonctionnel.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: UIKey) => ui[lang][key],
      tr: (v: Localized) => v[lang],
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
