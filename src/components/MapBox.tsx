import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, MAP_STYLE, MOJAVE } from '../mapConfig'
import './MapBox.css'

export function MapBox() {
  if (!MAPBOX_TOKEN) {
    return (
      <div className="map-box">
        <img src="/assets/map.png" alt="Map" className="map-box__fallback" />
      </div>
    )
  }

  return (
    <div className="map-box">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          ...MOJAVE,
          zoom: 8,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        scrollZoom={false}
        dragRotate={false}
        pitchWithRotate={false}
        touchZoomRotate={false}
        fadeDuration={0}
        reuseMaps
        logoPosition="bottom-right"
      >
        <Marker {...MOJAVE} anchor="center">
          <div className="map-pin__dot" aria-hidden="true" />
        </Marker>
      </Map>
    </div>
  )
}
