export const MOJAVE = { longitude: -115.5, latitude: 35.0 }
export const MAP_STYLE = 'mapbox://styles/mapbox/satellite-streets-v12'
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

/** Warm the Mapbox chunk and fallback image while the landing page is visible. */
export function preloadMapModule() {
  void import('./components/MapBox')
  const img = new Image()
  img.src = '/assets/map.png'
}
