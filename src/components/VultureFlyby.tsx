import { useEffect, useState } from 'react'
import './VultureFlyby.css'

const FLY_INTERVAL_MS = 25_000
const BENTO_FIRST_FLY_MS = 6_000
const LANDING_FIRST_FLY_MS = 25_000
const FLY_DURATION_MS = 4_000

type VultureFlybyProps = {
  entered: boolean
}

export function VultureFlyby({ entered }: VultureFlybyProps) {
  const [flightKey, setFlightKey] = useState(0)
  const [visible, setVisible] = useState(false)
  const [top, setTop] = useState('calc(var(--star-banner-height) + 28vh)')

  useEffect(() => {
    let intervalId: number | undefined

    const startFlight = () => {
      const lane = 12 + Math.random() * 28
      setTop(`calc(var(--star-banner-height) + ${lane}vh)`)
      setFlightKey((key) => key + 1)
      setVisible(true)
    }

    const initialDelay = entered ? BENTO_FIRST_FLY_MS : LANDING_FIRST_FLY_MS

    const initialId = window.setTimeout(() => {
      startFlight()
      intervalId = window.setInterval(startFlight, FLY_INTERVAL_MS)
    }, initialDelay)

    return () => {
      window.clearTimeout(initialId)
      if (intervalId !== undefined) window.clearInterval(intervalId)
    }
  }, [entered])

  useEffect(() => {
    if (!visible) return

    const hideId = window.setTimeout(() => setVisible(false), FLY_DURATION_MS)
    return () => window.clearTimeout(hideId)
  }, [visible, flightKey])

  if (!visible) return null

  return (
    <img
      key={flightKey}
      src="/assets/vulture.gif"
      alt=""
      className="vulture-flyby"
      style={{ top }}
      aria-hidden="true"
      draggable={false}
    />
  )
}
