import type { CSSProperties } from 'react'
import { STORY_PARAGRAPHS, StarButton, WHY_PARAGRAPHS } from './StarButton'
import { MovieBox } from './MovieBox'
import { GifBox } from './GifBox'
import { BoardBox } from './BoardBox'
import { MapSlot } from './MapSlot'
import './BentoUnit.css'

function StaticImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="bento-box__img" draggable={false} />
}

function FramedImage({
  src,
  alt,
  frameClassName,
}: {
  src: string
  alt: string
  frameClassName: string
}) {
  return (
    <div className={`bento-box__frame ${frameClassName}`}>
      <img src={src} alt={alt} className="bento-box__img" draggable={false} />
    </div>
  )
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
        <StarButton
          paragraphs={STORY_PARAGRAPHS}
          modalLabel="The Story of Midland"
          modalVariant="story"
          fillBox
        >
          <StaticImage src="/assets/story.png" alt="The Story" />
        </StarButton>
      </div>

      <div className="bento-box bento-box--clip">
        <FramedImage
          src="/assets/clip.png"
          alt="How it works"
          frameClassName="bento-box__frame--clip"
        />
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
        <FramedImage
          src="/assets/free.png"
          alt="Free mint info"
          frameClassName="bento-box__frame--free"
        />
      </div>

      <div className="bento-box bento-box--board">
        <BoardBox />
      </div>

      <div className="bento-box bento-box--why">
        <StarButton
          paragraphs={WHY_PARAGRAPHS}
          modalLabel="Why Midzards"
          modalVariant="compact"
          fillBox
        >
          <FramedImage
            src="/assets/why.png"
            alt="Why Midzards"
            frameClassName="bento-box__frame--why"
          />
        </StarButton>
      </div>
    </div>
  )
}
