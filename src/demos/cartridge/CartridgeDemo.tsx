import { ArrowLeftIcon } from '../../components/icons'
import { useLang } from '../../i18n/context'
import type { Localized } from '../../i18n/types'
import { href } from '../../router'
import { GameBoyPlayer } from '../gameboy/GameBoyPlayer'
import styles from '../DemoPage.module.css'

const ROM_URL = `${import.meta.env.BASE_URL}demos/cartridge/cartridge.gb`

const intro: Localized = {
  fr: 'Une cartouche Game Boy écrite en assembleur (RGBDS) : un menu et trois jeux, dans les contraintes de la console d’origine. Ce qui tourne ici est la vraie ROM compilée depuis le code source, exécutée par un émulateur directement dans le navigateur.',
  en: 'A Game Boy cartridge written in assembly (RGBDS): a menu and three games, within the constraints of the original console. What runs here is the actual ROM built from the source code, executed by an emulator right in your browser.',
}

const games: { name: string; how: Localized }[] = [
  {
    name: 'Tetris',
    how: { fr: '← → ↓ déplacer · ↑ pivoter', en: '← → ↓ move · ↑ rotate' },
  },
  {
    name: 'Snake',
    how: { fr: 'Croix : diriger le serpent', en: 'D-pad: steer the snake' },
  },
  {
    name: 'Eric in Danger',
    how: { fr: '↑ ↓ esquiver les ennemis', en: '↑ ↓ dodge the enemies' },
  },
]

const menuHelp: Localized = {
  fr: 'Menu : ↑ ↓ pour choisir, A ou Start pour lancer. « Redémarrer » ramène au menu.',
  en: 'Menu: ↑ ↓ to choose, A or Start to launch. “Restart” brings you back to the menu.',
}

export default function CartridgeDemo() {
  const { t, tr } = useLang()

  const controls: [string, string][] = [
    [t('demo.dpad'), t('demo.key.arrows')],
    ['A', 'X'],
    ['B', 'Z / W'],
    ['Start', t('demo.key.enter')],
    ['Select', t('demo.key.shift')],
    [t('demo.pause'), t('demo.key.space')],
  ]

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.stage}>
        <GameBoyPlayer romUrl={ROM_URL} label="CARTRIDGE.GB" />
      </div>

      <header className={styles.head}>
        <a href={href('projects')} className={styles.back}>
          <ArrowLeftIcon width={16} height={16} />
          {t('demo.back')}
        </a>
        <h1 className={styles.title}>Cartridge</h1>
        <ul className="tag-list">
          {['Assembler', 'RGBDS', 'Game Boy'].map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <aside className={styles.info}>
        <p className={styles.intro}>{tr(intro)}</p>

        <ul className={styles.games}>
          {games.map((game) => (
            <li key={game.name}>
              <span className={styles.gameName}>{game.name}</span>
              <span className={styles.gameHow}>{tr(game.how)}</span>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{tr(menuHelp)}</p>

        <div className={styles.controls}>
          <h2 className={styles.subtitle}>{t('demo.controls')}</h2>
          <dl>
            {controls.map(([button, key]) => (
              <div key={button}>
                <dt>{button}</dt>
                <dd>
                  <kbd>{key}</kbd>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className={styles.credit}>
          {t('demo.emulatedWith')}{' '}
          <a href="https://github.com/binji/binjgb" target="_blank" rel="noreferrer">
            binjgb
          </a>{' '}
          (MIT).
        </p>
      </aside>
    </div>
  )
}
