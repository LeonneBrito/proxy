'use client'
import { useEffect, useState } from 'react'

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState('24:00:00')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedStart = localStorage.getItem('finishOrderStart')
    const startTime = savedStart ? new Date(savedStart) : new Date()
    if (!savedStart) {
      localStorage.setItem('finishOrderStart', startTime.toISOString())
    }

    const countdown = setInterval(() => {
      const now = new Date()
      const elapsed = now.getTime() - new Date(startTime).getTime()
      const remaining = 24 * 60 * 60 * 1000 - elapsed

      if (remaining <= 0) {
        setTimeLeft('00:00:00')
        clearInterval(countdown)
        return
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60))
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

      setTimeLeft(
        [hours, minutes, seconds]
          .map((t) => String(t).padStart(2, '0'))
          .join(':'),
      )
    }, 1000)

    return () => clearInterval(countdown)
  }, [])

  return (
    <div className="mt-6 p-4 border border-yellow-500 bg-gray-950 text-center">
      <div className="text-yellow-400 font-bold text-lg">
        CONTAGEM_REGRESSIVA_AUTODESTRUTIVA
      </div>
      <div className="text-yellow-300 text-sm mt-1">
        Tempo restante até eliminação automática:{' '}
        <span className="font-mono">{timeLeft}</span>
      </div>
      <div className="text-xs text-yellow-600 mt-2">
        Faça o download de todos os arquivos e registros necessários antes do
        prazo.
      </div>
    </div>
  )
}
