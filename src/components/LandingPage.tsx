import { useEffect, useState } from 'react'
import { preloadMapModule } from '../mapConfig'
import './LandingPage.css'

const ZARD_COUNT = 7
const ZARD_FRAMES = Array.from(
  { length: 14 },
  (_, i) => `/assets/landing/zards/zard-${String(i).padStart(2, '0')}.png`,
)

const FLIP_INTERVAL_MS = 480

function nextUniqueFrame(current: number, used: readonly number[]) {
  let candidate = (current + 1) % ZARD_FRAMES.length
  let guard = 0

  while (used.includes(candidate) && guard < ZARD_FRAMES.length) {
    candidate = (candidate + 1) % ZARD_FRAMES.length
    guard++
  }

  return candidate
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
}: {
  slotIndex: number
  frameIndex: number
}) {
  return (
    <div
      className="landing__zard"
      style={{
        zIndex: slotIndex,
        animationDelay: `${slotIndex * 0.13}s`,
        animationDuration: `${2.05 + slotIndex * 0.19}s`,
      }}
    >
      <img src={ZARD_FRAMES[frameIndex]} alt="" draggable={false} />
    </div>
  )
}

function ZardsRow() {
  const [frames, setFrames] = useState<number[]>(() =>
    Array.from({ length: ZARD_COUNT }, (_, index) => index),
  )

  useEffect(() => {
    preloadImages(ZARD_FRAMES)
    preloadMapModule()
  }, [])

  useEffect(() => {
    const intervalIds: number[] = []
    const timeoutIds: number[] = []

    const flipSlot = (slotIndex: number) => {
      setFrames((previous) => {
        const usedByOthers = previous.filter((_, index) => index !== slotIndex)
        const nextFrame = nextUniqueFrame(previous[slotIndex], usedByOthers)
        const next = [...previous]
        next[slotIndex] = nextFrame
        return next
      })
    }

    for (let slotIndex = 0; slotIndex < ZARD_COUNT; slotIndex++) {
      const phaseOffset = Math.round((FLIP_INTERVAL_MS / ZARD_COUNT) * slotIndex)

      const timeoutId = window.setTimeout(() => {
        flipSlot(slotIndex)
        const intervalId = window.setInterval(
          () => flipSlot(slotIndex),
          FLIP_INTERVAL_MS,
        )
        intervalIds.push(intervalId)
      }, phaseOffset)

      timeoutIds.push(timeoutId)
    }

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId))
      intervalIds.forEach((intervalId) => window.clearInterval(intervalId))
    }
  }, [])

  return (
    <>
      {frames.map((frameIndex, index) => (
        <ZardSlot key={index} slotIndex={index} frameIndex={frameIndex} />
      ))}
    </>
  )
}

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="landing">
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
