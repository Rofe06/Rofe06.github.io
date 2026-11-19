import { useId } from 'react'
import type { Lang } from '../i18n/types'

function FlagFR() {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ce1126" />
    </svg>
  )
}

function FlagGB() {
  // Les id de clipPath doivent être uniques dans la page.
  const id = useId()
  const area = `${id}-area`
  const diag = `${id}-diag`
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <clipPath id={area}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={diag}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${area})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${diag})`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

export function Flag({ lang }: { lang: Lang }) {
  return lang === 'fr' ? <FlagFR /> : <FlagGB />
}
