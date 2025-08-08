
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/liveData.json')
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <div className="text-white p-4">Laster data...</div>

  const totalLån = data.lån.reduce((sum, l) => sum + l.beløp, 0)
  const totalInntekter = data.faste_inntekter.reduce((sum, i) => sum + i.beløp, 0)
  const totalBudsjett = data.budsjett.reduce((sum, b) => sum + b.månedlig, 0)

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Seaside Invest v5.4 🏝️</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent><p className="text-sm text-muted">Totalt lån</p><p className="text-xl font-semibold">{totalLån.toLocaleString()} kr</p></CardContent></Card>
        <Card><CardContent><p className="text-sm text-muted">Totale inntekter</p><p className="text-xl font-semibold">{totalInntekter.toLocaleString()} kr</p></CardContent></Card>
        <Card><CardContent><p className="text-sm text-muted">Totalt budsjett</p><p className="text-xl font-semibold">{totalBudsjett.toLocaleString()} kr</p></CardContent></Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Lånefordeling</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.lån}>
            <XAxis dataKey="navn" stroke="#888" angle={-30} textAnchor="end" interval={0} height={80}/>
            <YAxis stroke="#888"/>
            <Tooltip />
            <Bar dataKey="beløp" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Inntekter</h2>
        <ul className="space-y-1">
          {data.faste_inntekter.map((item, i) => (
            <li key={i} className="flex justify-between border-b border-gray-800 py-1">
              <span>{item.type}</span>
              <span>{item.beløp.toLocaleString()} kr</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Budsjett</h2>
        <ul className="space-y-1">
          {data.budsjett.map((item, i) => (
            <li key={i} className="flex justify-between border-b border-gray-800 py-1">
              <span>{item.kategori}</span>
              <span>{item.månedlig.toLocaleString()} kr</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
