/*
 * Chargement de binjgb (émulateur Game Boy en WebAssembly, licence MIT,
 * https://github.com/binji/binjgb). Les fichiers sont servis depuis
 * public/demos/binjgb/ et ne sont téléchargés qu'à l'ouverture d'une démo.
 */

type Ptr = number

export interface BinjgbModule {
  HEAP8: Int8Array
  _malloc(size: number): Ptr
  _free(ptr: Ptr): void
  _emulator_new_simple(rom: Ptr, romSize: number, sampleRate: number, audioFrames: number): Ptr
  _emulator_delete(e: Ptr): void
  _emulator_get_ticks_f64(e: Ptr): number
  _emulator_run_until_f64(e: Ptr, ticks: number): number
  _emulator_set_bw_palette_simple(
    e: Ptr,
    type: number,
    white: number,
    lightGray: number,
    darkGray: number,
    black: number,
  ): void
  _emulator_set_default_joypad_callback(e: Ptr, joypad: Ptr): void
  _joypad_new(): Ptr
  _joypad_delete(joypad: Ptr): void
  _get_frame_buffer_ptr(e: Ptr): Ptr
  _get_frame_buffer_size(e: Ptr): number
  _get_audio_buffer_ptr(e: Ptr): Ptr
  _get_audio_buffer_capacity(e: Ptr): number
  _set_joyp_up(e: Ptr, pressed: number): void
  _set_joyp_down(e: Ptr, pressed: number): void
  _set_joyp_left(e: Ptr, pressed: number): void
  _set_joyp_right(e: Ptr, pressed: number): void
  _set_joyp_A(e: Ptr, pressed: number): void
  _set_joyp_B(e: Ptr, pressed: number): void
  _set_joyp_start(e: Ptr, pressed: number): void
  _set_joyp_select(e: Ptr, pressed: number): void
}

type BinjgbFactory = (options?: { locateFile?: (path: string) => string }) => Promise<BinjgbModule>

declare global {
  interface Window {
    Binjgb?: BinjgbFactory
  }
}

export const BINJGB_BASE = `${import.meta.env.BASE_URL}demos/binjgb/`

let modulePromise: Promise<BinjgbModule> | null = null

/** Charge le script + le .wasm une seule fois, puis réutilise le module. */
export function loadBinjgb(): Promise<BinjgbModule> {
  if (!modulePromise) {
    modulePromise = new Promise<BinjgbModule>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `${BINJGB_BASE}binjgb.js`
      script.async = true
      script.onload = () => {
        if (!window.Binjgb) return reject(new Error('binjgb introuvable'))
        window.Binjgb({ locateFile: (path) => BINJGB_BASE + path }).then(resolve, reject)
      }
      script.onerror = () => reject(new Error('Échec du chargement de binjgb'))
      document.head.appendChild(script)
    }).catch((error: unknown) => {
      modulePromise = null // permet de réessayer
      throw error
    })
  }
  return modulePromise
}
