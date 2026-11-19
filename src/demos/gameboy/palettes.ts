import type { UIKey } from '../../i18n/ui'
import type { Palette } from './GameBoy'

export type PaletteId = 'site' | 'classic' | 'gray'

export const PALETTES: Record<PaletteId, { label: UIKey; colors: Palette }> = {
  // Teintes du site : clair bleuté → cyan → violet → presque noir
  site: { label: 'demo.palette.site', colors: [0xe4f4fb, 0x7cc4dc, 0x5b4fc4, 0x110e24] },
  // Vert « écran LCD » d'origine
  classic: { label: 'demo.palette.classic', colors: [0xe0f8d0, 0x88c070, 0x346856, 0x081820] },
  gray: { label: 'demo.palette.gray', colors: [0xf2f2f2, 0xa8a8a8, 0x545454, 0x0f0f0f] },
}

export const PALETTE_IDS = Object.keys(PALETTES) as PaletteId[]
