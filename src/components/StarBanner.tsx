import './StarBanner.css'

const STAR_COUNT = 64

function Star() {
  return <span className="star-banner__star" aria-hidden="true" />
}

export function StarBanner() {
  return (
    <div className="star-banner" aria-hidden="true">
      <div className="star-banner__track">
        <div className="star-banner__group">
          {Array.from({ length: STAR_COUNT }, (_, index) => (
            <Star key={`a-${index}`} />
          ))}
        </div>
        <div className="star-banner__group">
          {Array.from({ length: STAR_COUNT }, (_, index) => (
            <Star key={`b-${index}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
