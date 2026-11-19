/*
 * Petite surcouche autour de binjgb : boucle d'émulation, rendu canvas 2D,
 * audio Web Audio et entrées. Adapté de docs/simple.js de binjgb
 * (Copyright (C) 2020 Ben Smith, licence MIT).
 */
import type { BinjgbModule } from './binjgb'

export const SCREEN_WIDTH = 160
export const SCREEN_HEIGHT = 144

const CPU_TICKS_PER_SECOND = 4194304
const MAX_UPDATE_SEC = 5 / 60
const AUDIO_FRAMES = 4096
const AUDIO_LATENCY_SEC = 0.1
const EVENT_NEW_FRAME = 1
const EVENT_AUDIO_BUFFER_FULL = 2
const EVENT_UNTIL_TICKS = 4
const VOLUME = 0.5

export type GBButton = 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'start' | 'select'

/** 4 teintes 0xRRGGBB, de la plus claire à la plus foncée. */
export type Palette = readonly [number, number, number, number]

const BUTTON_SETTERS = {
  up: '_set_joyp_up',
  down: '_set_joyp_down',
  left: '_set_joyp_left',
  right: '_set_joyp_right',
  a: '_set_joyp_A',
  b: '_set_joyp_B',
  start: '_set_joyp_start',
  select: '_set_joyp_select',
} as const satisfies Record<GBButton, keyof BinjgbModule>

/** 0xRRGGBB → 0xAABBGGRR (ordre des octets attendu par binjgb). */
function toABGR(rgb: number) {
  return (0xff000000 | ((rgb & 0xff) << 16) | (rgb & 0xff00) | ((rgb >> 16) & 0xff)) >>> 0
}

export class GameBoy {
  private readonly m: BinjgbModule
  private readonly audio: AudioContext
  private readonly e: number
  private readonly romPtr: number
  private readonly joypadPtr: number
  private readonly ctx: CanvasRenderingContext2D
  private readonly image: ImageData
  private readonly gain: GainNode
  private raf = 0
  private lastSec = 0
  private leftoverTicks = 0
  private audioStartSec = 0
  private running = false

  constructor(m: BinjgbModule, rom: ArrayBuffer, canvas: HTMLCanvasElement, audio: AudioContext) {
    this.m = m
    this.audio = audio
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D indisponible')
    this.ctx = ctx
    this.image = ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT)

    this.romPtr = m._malloc(rom.byteLength)
    new Uint8Array(m.HEAP8.buffer, this.romPtr, rom.byteLength).set(new Uint8Array(rom))
    this.e = m._emulator_new_simple(this.romPtr, rom.byteLength, audio.sampleRate, AUDIO_FRAMES)
    if (this.e === 0) {
      m._free(this.romPtr)
      throw new Error('ROM invalide')
    }
    this.joypadPtr = m._joypad_new()
    m._emulator_set_default_joypad_callback(this.e, this.joypadPtr)

    this.gain = audio.createGain()
    this.gain.gain.value = VOLUME
    this.gain.connect(audio.destination)
  }

  get isRunning() {
    return this.running
  }

  start() {
    if (this.running) return
    this.running = true
    this.lastSec = 0
    this.leftoverTicks = 0
    this.audioStartSec = 0
    void this.audio.resume()
    this.raf = requestAnimationFrame(this.frame)
  }

  pause() {
    if (!this.running) return
    this.running = false
    cancelAnimationFrame(this.raf)
    void this.audio.suspend()
  }

  setButton(button: GBButton, pressed: boolean) {
    this.m[BUTTON_SETTERS[button]](this.e, pressed ? 1 : 0)
  }

  releaseAll() {
    for (const button of Object.keys(BUTTON_SETTERS) as GBButton[]) this.setButton(button, false)
  }

  setMuted(muted: boolean) {
    this.gain.gain.value = muted ? 0 : VOLUME
  }

  /** Applique la même palette au fond et aux deux palettes de sprites. */
  setPalette(palette: Palette) {
    const [white, light, dark, black] = palette.map(toABGR)
    for (let type = 0; type < 3; type++) {
      this.m._emulator_set_bw_palette_simple(this.e, type, white, light, dark, black)
    }
  }

  destroy() {
    this.pause()
    this.m._emulator_delete(this.e)
    this.m._joypad_delete(this.joypadPtr)
    this.m._free(this.romPtr)
    this.gain.disconnect()
  }

  // ---- Boucle d'émulation calée sur requestAnimationFrame ----

  private readonly frame = (ms: number) => {
    this.raf = requestAnimationFrame(this.frame)
    const sec = ms / 1000
    const deltaSec = Math.max(sec - (this.lastSec || sec), 0)
    const startTicks = this.m._emulator_get_ticks_f64(this.e)
    const untilTicks =
      startTicks + Math.min(deltaSec, MAX_UPDATE_SEC) * CPU_TICKS_PER_SECOND - this.leftoverTicks
    this.runUntil(untilTicks)
    this.leftoverTicks = (this.m._emulator_get_ticks_f64(this.e) - untilTicks) | 0
    this.lastSec = sec
    this.ctx.putImageData(this.image, 0, 0)
  }

  private runUntil(ticks: number) {
    for (;;) {
      const event = this.m._emulator_run_until_f64(this.e, ticks)
      if (event & EVENT_NEW_FRAME) this.uploadFrame()
      if (event & EVENT_AUDIO_BUFFER_FULL) this.pushAudio()
      if (event & EVENT_UNTIL_TICKS) break
    }
  }

  private uploadFrame() {
    const ptr = this.m._get_frame_buffer_ptr(this.e)
    const size = this.m._get_frame_buffer_size(this.e)
    this.image.data.set(new Uint8Array(this.m.HEAP8.buffer, ptr, size))
  }

  private pushAudio() {
    const now = this.audio.currentTime
    const start = this.audioStartSec || now + AUDIO_LATENCY_SEC
    if (start < now) {
      // Retard accumulé (onglet en arrière-plan…) : on resynchronise.
      this.audioStartSec = now + AUDIO_LATENCY_SEC
      return
    }
    const samples = new Uint8Array(
      this.m.HEAP8.buffer,
      this.m._get_audio_buffer_ptr(this.e),
      this.m._get_audio_buffer_capacity(this.e),
    )
    const buffer = this.audio.createBuffer(2, AUDIO_FRAMES, this.audio.sampleRate)
    const left = buffer.getChannelData(0)
    const right = buffer.getChannelData(1)
    for (let i = 0; i < AUDIO_FRAMES; i++) {
      left[i] = samples[2 * i] / 255
      right[i] = samples[2 * i + 1] / 255
    }
    const source = this.audio.createBufferSource()
    source.buffer = buffer
    source.connect(this.gain)
    source.start(start)
    this.audioStartSec = start + AUDIO_FRAMES / this.audio.sampleRate
  }
}
