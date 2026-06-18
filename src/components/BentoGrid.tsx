import { useCallback, useEffect, useRef, useState } from 'react'
import { computeScale, tileSize } from '../bentoLayout'
import { BentoUnit } from './BentoUnit'
import './BentoGrid.css'

const TILES_PER_AXIS = 5
const CENTER_INDEX = Math.floor(TILES_PER_AXIS / 2)
const FOOTER_ASPECT = 2996 / 10985

export function BentoGrid() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(computeScale)
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth)
  const [scrollLeft, setScrollLeft] = useState(0)

  const { width: tileW, height: tileH, gutter } = tileSize(scale)
  const worldW = tileW * TILES_PER_AXIS
  const tilesH = tileH * TILES_PER_AXIS
  const footerH = viewportWidth * FOOTER_ASPECT
  const worldH = tilesH + footerH

  useEffect(() => {
    const onResize = () => {
      setScale(computeScale())
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    el.scrollLeft = tileW * CENTER_INDEX
    el.scrollTop = tileH * CENTER_INDEX
    setScrollLeft(el.scrollLeft)
  }, [tileW, tileH])

  const wrapScroll = useCallback(() => {
    const el = viewportRef.current
    if (!el) return

    const edgeX = tileW * (TILES_PER_AXIS - 1)
    if (el.scrollLeft >= edgeX) el.scrollLeft -= tileW
    else if (el.scrollLeft <= 0) el.scrollLeft += tileW

    if (el.scrollTop <= 0) el.scrollTop += tileH

    setScrollLeft(el.scrollLeft)
  }, [tileW, tileH])

  const tiles = []
  for (let row = 0; row < TILES_PER_AXIS; row++) {
    for (let col = 0; col < TILES_PER_AXIS; col++) {
      tiles.push(
        <div
          key={`${row}-${col}`}
          className="bento-tile"
          style={{
            left: col * tileW,
            top: row * tileH,
            width: tileW,
            height: tileH,
          }}
        >
          <BentoUnit
            gutter={gutter}
            mapPriority={row === CENTER_INDEX && col === CENTER_INDEX}
          />
        </div>,
      )
    }
  }

  return (
    <div ref={viewportRef} className="bento-viewport" onScroll={wrapScroll}>
      <div className="bento-world" style={{ width: worldW, height: worldH }}>
        {tiles}
        <footer
          className="bento-footer"
          style={{
            top: tilesH,
            left: scrollLeft,
            width: viewportWidth,
            height: footerH,
          }}
        >
          <img src="/assets/footer.png" alt="" draggable={false} />
        </footer>
      </div>
    </div>
  )
}
