'use client'

import { useFormatter } from 'next-intl'
import { XAxis, YAxis } from 'recharts'

export function StreamStatsXAxis({
  dataKey,
  tickFormatter
}: {
  dataKey: string
  tickFormatter?: (value: string) => string
}) {
  // 1時間おきのticksを生成
  // const generateTicks = () => {
  //   if (data.length === 0) return []
  //   const allHours = data.map(item => item.time.split(':')[0])
  //   const uniqueHours = [...new Set(allHours)]
  //   return uniqueHours.map(hour => `${hour}:00`)
  // }

  return (
    <XAxis
      dataKey={dataKey}
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      minTickGap={70}
      // ticks={generateTicks()}
      tickFormatter={tickFormatter}
    />
  )
}

export function StreamStatsYAxis() {
  const format = useFormatter()
  return (
    <YAxis
      tickLine={false}
      axisLine={false}
      width={50}
      tickMargin={8}
      tickCount={4}
      tickFormatter={(tick: number) =>
        tick != 0 ? format.number(tick, { notation: 'compact' }) : ''
      }
    />
  )
}

export function StreamStatsGradient({
  id,
  color
}: {
  id: string
  color: string
}) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
        <stop offset="95%" stopColor={color} stopOpacity={0.1} />
      </linearGradient>
    </defs>
  )
}
