'use client'

import { PropsWithoutRef } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts'
import { CardTitle, CardDescription } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader
} from 'components/styles/card/ChartCard'
import CustomTooltip from './CustomTooltip'

type Props = {
  streams: StreamsSchema
  chartConfig: ChartConfig
}

export default function Chart({
  streams,
  chartConfig
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.chart')
  const format = useFormatter()
  const histogram = useHistogram(streams, format)

  return (
    <ChartCard className="w-full max-w-3xl mx-auto">
      <ChartCardHeader>
        <CardTitle>{t('streamTimeHistogram')}</CardTitle>
        <CardDescription>{t('descStreamTimeHistogram')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={histogram} margin={{ top: 10 }}>
            <XAxis
              dataKey="text"
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              minTickGap={36}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={37}
              tickMargin={8}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="var(--color-main)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </ChartCardContent>
    </ChartCard>
  )
}

const useHistogram = (
  streams: StreamsSchema,
  format: ReturnType<typeof useFormatter>
) => {
  const hourCounts: { [key: string]: { text: string; count: number } } = {}

  // 24時間すべてについてプロットしたいので。
  for (let i = 0; i < 24; i++) {
    hourCounts[i] = {
      text: format.dateTime(new Date().setHours(i, 0, 0, 0), {
        hour: 'numeric'
      }),
      count: 0
    }
  }

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
        hourCounts[hour] = {
          text: format.dateTime(currentHour, { hour: 'numeric' }),
          count: (hourCounts[hour].count || 0) + 1
        }
        currentHour.setHours(currentHour.getHours() + 1)
      }
    }
  })

  const data = Object.entries(hourCounts)
    .map(([hour, { text, count }]) => ({
      hour,
      text,
      count
    }))
    // 6時から始まるようにソート
    .sort((a, b) => {
      const START = 6
      const hourA = parseInt(a.hour)
      const hourB = parseInt(b.hour)
      return (
        (hourA < START ? hourA + 24 : hourA) -
        (hourB < START ? hourB + 24 : hourB)
      )
    })

  return data
}
