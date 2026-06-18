import { useEffect } from 'react'
import { MOOD_BOARD_IMAGES } from '../moodBoardImages'
import { useImageCycler } from '../hooks/useImageCycler'
import './BoardBox.css'

const PANELS = [
  { intervalMs: 180, startIndex: 0 },
  { intervalMs: 260, startIndex: 10 },
  { intervalMs: 340, startIndex: 20 },
] as const

function CyclingPanel({
  intervalMs,
  startIndex,
}: {
  intervalMs: number
  startIndex: number
}) {
  const src = useImageCycler(MOOD_BOARD_IMAGES, intervalMs, startIndex)

  return (
    <div className="board-box__panel">
      <img src={src} alt="" className="board-box__img" draggable={false} />
    </div>
  )
}

export function BoardBox() {
  useEffect(() => {
    MOOD_BOARD_IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return (
    <div className="board-box">
      {PANELS.map((panel, i) => (
        <CyclingPanel
          key={i}
          intervalMs={panel.intervalMs}
          startIndex={panel.startIndex}
        />
      ))}
    </div>
  )
}
