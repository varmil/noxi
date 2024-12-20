'use client'

import { PropsWithoutRef } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts'
import { CardDescription } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
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
        <ChartCardTitle>{t('streamTimeHistogram')}</ChartCardTitle>
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
              allowDecimals={false}
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

      const isValid = validateDuration(startTime, endTime)
      if (!isValid) {
        // console.log(
        //   'Stream exceeds 24 hours and is excluded from aggregation:',
        //   stream
        // )
        return
      }

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

// 開始時間と終了時間の差が24時間以上ならスキップ
const validateDuration = (start: Date, end: Date) => {
  const timeDifference = end.getTime() - start.getTime()
  const hoursDifference = timeDifference / (1000 * 60 * 60) // ミリ秒を時間に変換

  if (hoursDifference > 24) {
    return false
  }

  return true
}
