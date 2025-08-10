'use client'

import { allyGangs } from '@/constants/gangs'
import { funnyGangs } from '@/constants/funny-gangs'
import { formatCurrency } from '@/utils/format-currency'
import { formatDateTime } from '@/utils/format-datetime'
import { useMemo, useState } from 'react'

type Item = {
  _id?: string
  gangLogin?: string
  gangName: string
  totalSpent: number
  history?: Array<{ amount: number; at: string; source?: string }>
}

export function RankTable({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const normalized = (s: string) =>
      s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
    const slugify = (s: string) => normalized(s).replace(/\s+/g, '')

    const q = normalized(query)

    const arr = [...items]
      .filter((i) => {
        if (!q) return true
        return normalized(i.gangName).includes(q) || normalized(i.gangLogin ?? '').includes(q)
      })
      .sort((a, b) => b.totalSpent - a.totalSpent)

    return arr.map((item, idx) => {
      const login = (item.gangLogin ?? '').toLowerCase()
      const isAlly = allyGangs
        .map((g) => slugify(g))
        .some((g) => g === login || g === slugify(item.gangName))

      const key = login || slugify(item.gangName)
      const displayName = funnyGangs[key] || item.gangName

      return { rank: idx + 1, isAlly, displayName, ...item }
    })
  }, [items, query])

  return (
    <div className="border border-green-800 bg-gray-950">
      <div className="p-3 flex items-center justify-between gap-3 border-b border-green-900/60">
        <div className="text-xs">REGISTROS: {rows.length}</div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="filtrar por gangue..."
          className="text-xs bg-gray-950 border border-green-700 px-2 py-1 outline-none focus:ring-0 focus:border-green-400 placeholder-green-700"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left border-b border-green-900/60">
            <tr className="text-green-500">
              <th className="px-3 py-2 w-14">#</th>
              <th className="px-3 py-2">GANGUE</th>
              <th className="px-3 py-2 text-right">TOTAL_GASTO</th>
              <th className="px-3 py-2">ÚLTIMO_REGISTRO</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => {
              const last = r.history?.[r.history.length - 1]
              return (
                <tr key={r._id ?? r.rank} className="border-b border-green-900/40 hover:bg-black/30 transition-colors">
                  <td className="px-3 py-2 text-green-400/80">{r.rank}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-300">{r.displayName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right text-green-200">{formatCurrency(r.totalSpent)}</td>
                  <td className="px-3 py-2 text-xs text-green-600/80">
                    {last ? `${formatCurrency(last.amount)} · ${formatDateTime(last.at)}` : '—'}
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-green-600/70">
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
