import { XAxis, YAxis } from 'recharts'

export function StreamStatsXAxis() {
  // 1時間おきのticksを生成
  // const generateTicks = () => {
  //   if (data.length === 0) return []
  //   const allHours = data.map(item => item.time.split(':')[0])
  //   const uniqueHours = [...new Set(allHours)]
  //   return uniqueHours.map(hour => `${hour}:00`)
  // }

  return (
    <XAxis
      dataKey="time"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      minTickGap={70}
      // ticks={generateTicks()}
      // tickFormatter={value => value.slice(0, 3)}
    />
  )
}

export function StreamStatsYAxis() {
  return (
    <YAxis
      tickLine={false}
      axisLine={false}
      width={50}
      tickMargin={8}
      tickCount={4}
      tickFormatter={tick => (tick != 0 ? Number(tick).toLocaleString() : '')}
    />
  )
}
