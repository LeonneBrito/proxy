'use client'

import 'leaflet/dist/leaflet.css'

import L, { type LatLng, type LatLngBoundsLiteral } from 'leaflet'
import { type ReactNode } from 'react'
import { renderToString } from 'react-dom/server'
import {
  ImageOverlay,
  MapContainer,
  Marker,
  Tooltip,
  useMapEvents,
} from 'react-leaflet'

import type { PointData } from './map-interface'

function CustomMarkerIcon() {
  return (
    <div className="relative">
      <div className="w-6 h-6 bg-green-500 rounded-full animate-ping opacity-75 absolute top-0 left-0" />
      <div className="w-6 h-6 bg-green-600 rounded-full z-10 relative" />
    </div>
  )
}

// Wrapper to generate Leaflet icon from React
function createReactIcon(node: ReactNode) {
  return L.divIcon({
    html: renderToString(node),
    className: '', // remove default leaflet styles
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  })
}

// Corrige ícones padrão no Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Caminho da imagem do mapa (GTA V)
const MAP_IMAGE_URL =
  'https://www.bragitoff.com/wp-content/uploads/2015/11/GTAV-HD-MAP-satellite.jpg'

// Tamanho da imagem (em pixels) tratado como "coordenadas"
const bounds: LatLngBoundsLiteral = [
  [0, 0],
  [2048, 2048],
]

function ClickLogger({ onMapClick }: { onMapClick: (coords: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng)
    },
  })
  return null
}

export default function LosSantosMap({ points }: { points: PointData[] }) {
  const handleMapClick = (latlng: LatLng) => {
    console.log('🛰️ Coordenada clicada:', latlng)
  }

  return (
    <div className="w-full h-full">
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        minZoom={-2}
        maxZoom={2}
        zoom={0}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
      >
        <ImageOverlay url={MAP_IMAGE_URL} bounds={bounds} />

        <ClickLogger onMapClick={handleMapClick} />
        {points.map((point, index) => (
          <Marker
            key={index}
            position={[point.lat, point.lng]}
            icon={createReactIcon(<CustomMarkerIcon />)}
          >
            <Tooltip
              direction="top"
              offset={[0, -12]}
              opacity={1}
              className="bg-black text-green-400 border border-green-700 px-2 py-1 rounded text-xs shadow-md"
              permanent={false}
            >
              {point.label}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
