'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { mapPoints } from '@/constants/map-points'

const LosSantosMap = dynamic(() => import('./los-santos-map'), { ssr: false })

export type PointData = {
  label: string
  lat: number
  lng: number
}

export function MapInterface({ mapId }: { mapId: string }) {
  const router = useRouter()
  const [points, setPoints] = useState<PointData[]>([])

  useEffect(() => {
    const data = mapPoints[mapId]
    if (data) {
      setPoints(data)
    } else {
      router.push('/error')
    }
  }, [mapId, router])

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <section className="border border-green-800 bg-gray-950 p-6">
        <h2 className="text-xl text-white mb-4">
          LOCALIZAÇÃO_DOS_NOSSOS_CYBERMASCOTES
        </h2>
        <div className="aspect-[1/1] w-full max-w-4xl mx-auto">
          <LosSantosMap points={points} />
        </div>
      </section>
    </div>
  )
}
