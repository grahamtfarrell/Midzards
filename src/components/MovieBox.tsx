import { useRef, useEffect, useState } from 'react'
import './MovieBox.css'

export function MovieBox() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const showFallback = () => setUseFallback(true)

    video.addEventListener('error', showFallback)
    video.play().catch(showFallback)

    return () => video.removeEventListener('error', showFallback)
  }, [])

  if (useFallback) {
    return (
      <div className="movie-box">
        <img src="/assets/movie.png" alt="Western scene" className="movie-box__fallback" />
      </div>
    )
  }

  return (
    <div className="movie-box">
      <video
        ref={videoRef}
        className="movie-box__video"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/movie.png"
      >
        <source src="/assets/video/movie.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
