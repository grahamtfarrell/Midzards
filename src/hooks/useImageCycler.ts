import { useEffect, useState } from 'react'

export function useImageCycler(
  images: readonly string[],
  intervalMs: number,
  startIndex = 0,
) {
  const [index, setIndex] = useState(startIndex % images.length)

  useEffect(() => {
    if (images.length === 0) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [images, intervalMs])

  return images[index] ?? images[0]
}
