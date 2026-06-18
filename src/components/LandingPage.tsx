import { useEffect, useState, type CSSProperties } from 'react'
import { preloadMapModule } from '../mapConfig'
import './LandingPage.css'

const ZARD_COUNT = 7
const ZARD_FRAMES = Array.from(
  { length: 14 },
  (_, i) => `/assets/landing/zards/zard-${String(i).padStart(2, '0')}.png`,
)

const FLIP_MIN_MS = 400
const FLIP_MAX_MS = 1100

const INTRO_LOGO_DELAY_MS = 150
const INTRO_LOGO_DURATION_MS = 650
const INTRO_ZARD_STAGGER_MS = 85
const INTRO_ZARD_DURATION_MS = 480
const INTRO_ENTER_DURATION_MS = 550

function shuffleIntroOrder(count: number) {
  const center = Math.floor(count / 2)
  const order: number[] = [center]

  for (let offset = 1; offset <= center; offset++) {
    if (center - offset >= 0) order.push(center - offset)
    if (center + offset < count) order.push(center + offset)
  }

  return order
}

const ZARD_INTRO_ORDER = shuffleIntroOrder(ZARD_COUNT)
const ZARD_INTRO_RANK = ZARD_INTRO_ORDER.reduce<Record<number, number>>(
  (ranks, slotIndex, rank) => {
    ranks[slotIndex] = rank
    return ranks
  },
  {},
)

const INTRO_ZARDS_START_MS = INTRO_LOGO_DELAY_MS + INTRO_LOGO_DURATION_MS + 80
const INTRO_ENTER_START_MS =
  INTRO_ZARDS_START_MS +
  (ZARD_COUNT - 1) * INTRO_ZARD_STAGGER_MS +
  INTRO_ZARD_DURATION_MS +
  120
const INTRO_COMPLETE_MS = INTRO_ENTER_START_MS + INTRO_ENTER_DURATION_MS

function zardSettleMs(slotIndex: number) {
  return (
    INTRO_ZARDS_START_MS +
    ZARD_INTRO_RANK[slotIndex] * INTRO_ZARD_STAGGER_MS +
    INTRO_ZARD_DURATION_MS
  )
}

function randomUniqueFrame(current: number, usedByOthers: readonly number[]) {
  const available = ZARD_FRAMES.map((_, index) => index).filter(
    (frame) => frame !== current && !usedByOthers.includes(frame),
  )

  if (available.length === 0) return current

  return available[Math.floor(Math.random() * available.length)]
}

function randomFlipDelay() {
  return FLIP_MIN_MS + Math.random() * (FLIP_MAX_MS - FLIP_MIN_MS)
}

function randomInitialFrames() {
  const pool = ZARD_FRAMES.map((_, index) => index)

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(0, ZARD_COUNT)
}

function preloadImages(urls: readonly string[]) {
  urls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

type LandingPageProps = {
  onEnter: () => void
}

function ZardSlot({
  slotIndex,
  frameIndex,
  settled,
}: {
  slotIndex: number
  frameIndex: number
  settled: boolean
}) {
  return (
    <div
      className={`landing__zard${settled ? ' landing__zard--settled' : ''}`}
      style={
        {
          zIndex: slotIndex,
          '--zard-intro-delay': `${INTRO_ZARDS_START_MS + ZARD_INTRO_RANK[slotIndex] * INTRO_ZARD_STAGGER_MS}ms`,
        } as CSSProperties
      }
    >
      <img src={ZARD_FRAMES[frameIndex]} alt="" draggable={false} />
    </div>
  )
}

function ZardsRow() {
  const [frames, setFrames] = useState<number[]>(randomInitialFrames)
  const [settledSlots, setSettledSlots] = useState<ReadonlySet<number>>(() => new Set())

  useEffect(() => {
    preloadImages(ZARD_FRAMES)
    preloadMapModule()
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const timeoutIds: number[] = []

    const scheduleSlot = (slotIndex: number) => {
      const settleMs = prefersReducedMotion ? 0 : zardSettleMs(slotIndex)

      const settleId = window.setTimeout(() => {
        setSettledSlots((previous) => new Set(previous).add(slotIndex))

        const flip = () => {
          setFrames((previous) => {
            const usedByOthers = previous.filter((_, index) => index !== slotIndex)
            const next = [...previous]
            next[slotIndex] = randomUniqueFrame(previous[slotIndex], usedByOthers)
            return next
          })

          const nextFlipId = window.setTimeout(flip, randomFlipDelay())
          timeoutIds.push(nextFlipId)
        }

        flip()
      }, settleMs)

      timeoutIds.push(settleId)
    }

    for (let slotIndex = 0; slotIndex < ZARD_COUNT; slotIndex++) {
      scheduleSlot(slotIndex)
    }

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  return (
    <>
      {frames.map((frameIndex, index) => (
        <ZardSlot
          key={index}
          slotIndex={index}
          frameIndex={frameIndex}
          settled={settledSlots.has(index)}
        />
      ))}
    </>
  )
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const timeoutId = window.setTimeout(
      () => setIntroComplete(true),
      prefersReducedMotion ? 0 : INTRO_COMPLETE_MS,
    )

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <div
      className={`landing${introComplete ? ' landing--intro-complete' : ' landing--intro'}`}
      style={
        {
          '--intro-logo-delay': `${INTRO_LOGO_DELAY_MS}ms`,
          '--intro-enter-delay': `${INTRO_ENTER_START_MS}ms`,
        } as CSSProperties
      }
    >
      <header className="landing__header">
        <span className="landing__tagline">Infinite Fun</span>
        <span className="landing__tagline">2026</span>
      </header>

      <main className="landing__main">
        <div className="landing__scene">
          <img
            className="landing__logo"
            src="/assets/landing/logo.png"
            alt="Midzards"
            draggable={false}
          />

          <div className="landing__zards" aria-hidden="true">
            <ZardsRow />
          </div>
        </div>

        <button type="button" className="landing__enter" onClick={onEnter}>
          <img src="/assets/landing/enter.png" alt="Enter" draggable={false} />
        </button>
      </main>
    </div>
  )
}
