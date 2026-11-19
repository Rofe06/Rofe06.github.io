import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ExpandIcon,
  MuteIcon,
  PauseIcon,
  PlayIcon,
  RestartIcon,
  VolumeIcon,
} from '../../components/icons'
import { useLang } from '../../i18n/context'
import { loadBinjgb, type BinjgbModule } from './binjgb'
import { GameBoy, SCREEN_HEIGHT, SCREEN_WIDTH, type GBButton } from './GameBoy'
import { PALETTES, PALETTE_IDS, type PaletteId } from './palettes'
import styles from './GameBoyPlayer.module.css'

type Status = 'idle' | 'loading' | 'running' | 'paused' | 'error'

/** Clavier → boutons. Basé sur `event.key`, donc valable en QWERTY comme en AZERTY. */
const KEY_MAP: Record<string, GBButton> = {
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right',
  x: 'a',
  k: 'a',
  z: 'b',
  w: 'b',
  j: 'b',
  enter: 'start',
  shift: 'select',
  backspace: 'select',
}

function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value && (allowed as readonly string[]).includes(value) ? (value as T) : fallback
  } catch {
    return fallback
  }
}

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Préférence non persistée : sans conséquence.
  }
}

interface GameBoyPlayerProps {
  /** URL de la ROM (.gb) dans /public. */
  romUrl: string
  /** Nom affiché sous l'écran. */
  label: string
}

export function GameBoyPlayer({ romUrl, label }: GameBoyPlayerProps) {
  const { t } = useLang()
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gbRef = useRef<GameBoy | null>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const moduleRef = useRef<BinjgbModule | null>(null)
  const romRef = useRef<ArrayBuffer | null>(null)

  const [status, setStatus] = useState<Status>('idle')
  const [muted, setMuted] = useState(() => readStored('gb-muted', ['0', '1'], '0') === '1')
  const [palette, setPalette] = useState<PaletteId>(() => readStored('gb-palette', PALETTE_IDS, 'site'))

  const settings = useRef({ muted, palette })
  useEffect(() => {
    settings.current = { muted, palette }
  })

  /** (Re)crée l'émulateur avec la ROM chargée : sert au lancement et au redémarrage. */
  const createInstance = useCallback(() => {
    const m = moduleRef.current
    const rom = romRef.current
    const canvas = canvasRef.current
    const audio = audioRef.current
    if (!m || !rom || !canvas || !audio) return
    gbRef.current?.destroy()
    const gb = new GameBoy(m, rom, canvas, audio)
    gb.setPalette(PALETTES[settings.current.palette].colors)
    gb.setMuted(settings.current.muted)
    gbRef.current = gb
    gb.start()
  }, [])

  const boot = async () => {
    // L'AudioContext doit naître pendant le clic (politique d'autoplay des navigateurs).
    audioRef.current ??= new AudioContext()
    setStatus('loading')
    try {
      const [m, rom] = await Promise.all([
        loadBinjgb(),
        fetch(romUrl).then((res) => {
          if (!res.ok) throw new Error(`ROM introuvable (${res.status})`)
          return res.arrayBuffer()
        }),
      ])
      if (!canvasRef.current) return // composant démonté pendant le chargement
      moduleRef.current = m
      romRef.current = rom
      createInstance()
      setStatus('running')
      frameRef.current?.focus({ preventScroll: true })
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  const togglePause = useCallback(() => {
    const gb = gbRef.current
    if (!gb) return
    if (gb.isRunning) {
      gb.pause()
      gb.releaseAll()
      setStatus('paused')
    } else {
      gb.start()
      setStatus('running')
      frameRef.current?.focus({ preventScroll: true })
    }
  }, [])

  const restart = () => {
    createInstance()
    setStatus('running')
    frameRef.current?.focus({ preventScroll: true })
  }

  const toggleFullscreen = () => {
    const frame = frameRef.current
    if (!frame) return
    if (document.fullscreenElement) void document.exitFullscreen()
    else void frame.requestFullscreen?.()
  }

  /** Appui sur un bouton (clavier ou tactile). Les relâchements passent toujours. */
  const press = useCallback((button: GBButton, down: boolean) => {
    const gb = gbRef.current
    if (!gb || (down && !gb.isRunning)) return
    gb.setButton(button, down)
  }, [])

  // Réglages : appliqués à chaud et mémorisés.
  useEffect(() => {
    gbRef.current?.setMuted(muted)
    store('gb-muted', muted ? '1' : '0')
  }, [muted])

  useEffect(() => {
    gbRef.current?.setPalette(PALETTES[palette].colors)
    store('gb-palette', palette)
  }, [palette])

  // Clavier
  const active = status === 'running' || status === 'paused'
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const target = e.target instanceof Element ? e.target : null
      if (target?.closest('input, textarea, select')) return
      const isActivationKey = e.key === ' ' || e.key === 'Enter'
      if (isActivationKey && target?.closest('button, a')) return // laisse les boutons fonctionner

      const down = e.type === 'keydown'
      if (e.key === ' ') {
        e.preventDefault()
        if (down && !e.repeat) togglePause()
        return
      }
      const button = KEY_MAP[e.key.toLowerCase()]
      if (!button) return
      e.preventDefault()
      press(button, down)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
    }
  }, [active, press, togglePause])

  // Onglet masqué → pause ; fenêtre quittée → on relâche tout.
  useEffect(() => {
    const onVisibility = () => {
      const gb = gbRef.current
      if (document.hidden && gb?.isRunning) {
        gb.pause()
        gb.releaseAll()
        setStatus('paused')
      }
    }
    const onBlur = () => gbRef.current?.releaseAll()
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', onBlur)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  // Nettoyage complet en quittant la page.
  useEffect(
    () => () => {
      gbRef.current?.destroy()
      gbRef.current = null
      void audioRef.current?.close()
      audioRef.current = null
    },
    [],
  )

  const ready = status === 'running' || status === 'paused'

  return (
    <div className={styles.player}>
      <div
        ref={frameRef}
        className={styles.frame}
        tabIndex={-1}
        role="region"
        aria-label={label}
        data-status={status}
      >
        <div className={styles.screen}>
          <canvas
            ref={canvasRef}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            className={styles.canvas}
            style={{ background: `#${PALETTES[palette].colors[3].toString(16).padStart(6, '0')}` }}
          />
          {status !== 'running' && (
            <div className={styles.overlay}>
              {status === 'idle' && (
                <>
                  <button type="button" className="btn btn-primary" onClick={boot}>
                    <PlayIcon />
                    {t('demo.start')}
                  </button>
                  <p className={styles.hint}>{t('demo.startHint')}</p>
                </>
              )}
              {status === 'loading' && (
                <p className={styles.loading} role="status">
                  <span className={styles.spinner} aria-hidden />
                  {t('demo.loading')}
                </p>
              )}
              {status === 'paused' && (
                <>
                  <p className={styles.hint}>{t('demo.paused')}</p>
                  <button type="button" className="btn btn-primary" onClick={togglePause}>
                    <PlayIcon />
                    {t('demo.resume')}
                  </button>
                </>
              )}
              {status === 'error' && (
                <>
                  <p className={styles.hint}>{t('demo.error')}</p>
                  <button type="button" className="btn" onClick={boot}>
                    {t('demo.retry')}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <p className={styles.caption}>
          <span className={styles.led} data-on={status === 'running'} aria-hidden />
          <span className="mono">{label}</span>
        </p>
      </div>

      <TouchPad onPress={press} label={t('demo.gamepad')} />

      <div className={styles.toolbar}>
        <div className={styles.tools}>
          <ToolButton
            label={status === 'paused' ? t('demo.resume') : t('demo.pause')}
            onClick={togglePause}
            disabled={!ready}
          >
            {status === 'paused' ? <PlayIcon /> : <PauseIcon />}
          </ToolButton>
          <ToolButton label={t('demo.reset')} onClick={restart} disabled={!ready}>
            <RestartIcon />
          </ToolButton>
          <ToolButton
            label={muted ? t('demo.unmute') : t('demo.mute')}
            onClick={() => setMuted((m) => !m)}
            pressed={muted}
          >
            {muted ? <MuteIcon /> : <VolumeIcon />}
          </ToolButton>
          <ToolButton label={t('demo.fullscreen')} onClick={toggleFullscreen} disabled={!ready}>
            <ExpandIcon />
          </ToolButton>
        </div>

        <div className={styles.palettes} role="group" aria-label={t('demo.palette')}>
          {PALETTE_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.swatch}
              aria-pressed={palette === id}
              title={t(PALETTES[id].label)}
              aria-label={`${t('demo.palette')} ${t(PALETTES[id].label)}`}
              onClick={() => setPalette(id)}
            >
              {PALETTES[id].colors.map((c, i) => (
                <span key={i} style={{ background: `#${c.toString(16).padStart(6, '0')}` }} />
              ))}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ToolButton({
  label,
  onClick,
  disabled,
  pressed,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  pressed?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={styles.tool}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
    >
      {children}
    </button>
  )
}

/* ---- Manette tactile (affichée uniquement sur écran tactile) ---- */

function TouchPad({ onPress, label }: { onPress: (b: GBButton, down: boolean) => void; label: string }) {
  const pad = (button: GBButton, className: string, content: ReactNode, aria: string) => (
    <button
      type="button"
      className={`${styles.padButton} ${className}`}
      aria-label={aria}
      onPointerDown={(e) => {
        e.preventDefault()
        e.currentTarget.setPointerCapture(e.pointerId)
        navigator.vibrate?.(8)
        onPress(button, true)
      }}
      onPointerUp={() => onPress(button, false)}
      onPointerCancel={() => onPress(button, false)}
      onLostPointerCapture={() => onPress(button, false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {content}
    </button>
  )

  return (
    <div className={styles.pad} role="group" aria-label={label}>
      <div className={styles.dpad}>
        {pad('up', styles.up, '▲', 'Up')}
        {pad('left', styles.left, '◀', 'Left')}
        {pad('right', styles.right, '▶', 'Right')}
        {pad('down', styles.down, '▼', 'Down')}
      </div>
      <div className={styles.meta}>
        {pad('select', styles.pill, 'SELECT', 'Select')}
        {pad('start', styles.pill, 'START', 'Start')}
      </div>
      <div className={styles.ab}>
        {pad('b', styles.round, 'B', 'B')}
        {pad('a', `${styles.round} ${styles.a}`, 'A', 'A')}
      </div>
    </div>
  )
}
