'use client'

import { PropsWithoutRef } from 'react'
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'

type Props = {
  streams: StreamsSchema
  chartConfig: ChartConfig
}

export default function Chart({
  streams,
  chartConfig
}: PropsWithoutRef<Props>) {
  const histogramData = processData(streams)

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>配信時間帯</CardTitle>
        <CardDescription>
          各時間帯におけるYouTubeライブ配信の頻度を表示しています。配信時間全体を通じてカウントされています。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <BarChart data={histogramData}>
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={37}
              tickMargin={8}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="var(--color-main)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              時間帯
            </span>
            <span className="font-bold text-muted-foreground">{label}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              配信回数
            </span>
            <span className="font-bold">{payload[0].value}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const processData = (streams: StreamsSchema) => {
  const hourCounts: { [key: string]: number } = {}

  streams.forEach(stream => {
    const {
      streamTimes: { actualStartTime, actualEndTime }
    } = stream

    if (actualStartTime && actualEndTime) {
      const startTime = new Date(actualStartTime)
      const endTime = new Date(actualEndTime)

      let currentHour = new Date(startTime)
      currentHour.setMinutes(0, 0, 0)

      while (currentHour <= endTime) {
        const hour = currentHour.getHours()
        hourCounts[hour] = (hourCounts[hour] || 0) + 1
        currentHour.setHours(currentHour.getHours() + 1)
      }
    }
  })

  const data = Object.entries(hourCounts)
    .map(([hour, count]) => ({
      hour: `${hour}時`,
      count
    }))
    .sort((a, b) => parseInt(a.hour) - parseInt(b.hour))

  return data
}
