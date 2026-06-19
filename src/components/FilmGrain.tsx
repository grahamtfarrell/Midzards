import './FilmGrain.css'

export function FilmGrain() {
  return (
    <div className="film-grain" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <filter id="film-grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
    </div>
  )
}
