import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const MapBox = lazy(() => import('./MapBox').then((m) => ({ default: m.MapBox })))

function MapPlaceholder() {
  return (
    <img
      src="/assets/map.png"
      alt="Map"
      className="map-box__fallback"
      draggable={false}
    />
  )
}

type MapSlotProps = {
  /** Center tile mounts Mapbox immediately; others wait until scrolled near. */
  priority?: boolean
}

export function MapSlot({ priority = false }: MapSlotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(priority)

  useEffect(() => {
    if (active) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '30%' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [active])

  return (
    <div ref={ref} className="map-slot">
      {active ? (
        <Suspense fallback={<MapPlaceholder />}>
          <MapBox />
        </Suspense>
      ) : (
        <MapPlaceholder />
      )}
    </div>
  )
}
