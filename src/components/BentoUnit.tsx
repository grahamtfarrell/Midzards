import type { CSSProperties } from 'react'
import { StarButton } from './StarButton'
import { MovieBox } from './MovieBox'
import { GifBox } from './GifBox'
import { BoardBox } from './BoardBox'
import { MapSlot } from './MapSlot'
import './BentoUnit.css'

function StaticImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="bento-box__img" draggable={false} />
}

interface BentoUnitProps {
  gutter: number
  mapPriority?: boolean
}

export function BentoUnit({ gutter, mapPriority = false }: BentoUnitProps) {
  return (
    <div
      className="bento-unit"
      style={{ '--bento-gutter': `${gutter}px` } as CSSProperties}
    >
      <div className="bento-box bento-box--story">
        <StaticImage src="/assets/story.png" alt="The Story" />
        <StarButton />
      </div>

      <div className="bento-box bento-box--clip">
        <StaticImage src="/assets/clip.png" alt="How it works" />
      </div>

      <div className="bento-mapcol">
        <div className="bento-box bento-box--map">
          <MapSlot priority={mapPriority} />
        </div>
        <div className="bento-box bento-box--movie">
          <MovieBox />
        </div>
      </div>

      <div className="bento-box bento-box--gif">
        <GifBox />
      </div>

      <div className="bento-box bento-box--free">
        <StaticImage src="/assets/free.png" alt="Free mint info" />
      </div>

      <div className="bento-box bento-box--board">
        <BoardBox />
      </div>

      <div className="bento-box bento-box--why">
        <StaticImage src="/assets/why.png" alt="Why Midzards" />
      </div>
    </div>
  )
}
