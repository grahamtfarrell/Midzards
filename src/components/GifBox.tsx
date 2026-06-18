import { useState } from 'react'
import './GifBox.css'

export function GifBox() {
  const [useFallback, setUseFallback] = useState(false)

  if (useFallback) {
    return (
      <div className="gif-box">
        <img src="/assets/gif.png" alt="Midzards character" className="gif-box__fallback" />
      </div>
    )
  }

  return (
    <div className="gif-box">
      <img
        src="/assets/midzards.gif"
        alt="Midzards characters"
        className="gif-box__gif"
        onError={() => setUseFallback(true)}
      />
    </div>
  )
}
