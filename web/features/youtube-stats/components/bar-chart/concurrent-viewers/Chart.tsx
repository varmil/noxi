'use client'

import { PropsWithoutRef } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ReferenceLine,
  XAxis,
  YAxis
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip
} from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import ThumbnailTooltip from '../tooltip/ThumbnailTooltip'

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

  const data = streams
    .map(stream => ({
      title: stream.snippet.title,
      date: stream.snippet.publishedAt,
      peakConcurrentViewers: stream.metrics.peakConcurrentViewers,
      avgConcurrentViewers: stream.metrics.avgConcurrentViewers,
      chatMessages: stream.metrics.chatMessages,
      thumbnail: stream.snippet.thumbnails['medium']?.url
    }))
    .reverse()

  const dateRange = [
    format.dateTime(new Date(data[0].date), {
      month: 'long',
      day: 'numeric'
    }),
    '-',
    format.dateTime(new Date(data[data.length - 1].date), {
      month: 'long',
      day: 'numeric'
    })
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('peakConcurrentViewersChart')}</CardTitle>
        <CardDescription>{dateRange.join(' ')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              tickMargin={10}
              tickSize={3}
              minTickGap={32}
              axisLine={false}
              tickFormatter={value =>
                format.dateTime(new Date(value), {
                  month: 'long',
                  day: 'numeric'
                })
              }
            />
            <YAxis
              width={37}
              tickMargin={8}
              tickSize={0}
              axisLine={false}
              tickFormatter={value =>
                format.number(value, { notation: 'compact' })
              }
            />
            <ChartTooltip
              allowEscapeViewBox={{ x: false, y: true }}
              content={<ThumbnailTooltip />}
            />
            <Bar
              dataKey="peakConcurrentViewers"
              fill="var(--color-desktop)"
              radius={2}
            />

            <ReferenceLine
              y={average(streams)}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Avg. Concurrent Viewers"
                className="text-sm"
                offset={10}
                fill="hsl(var(--foreground))"
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <div className="sr-only">
        {t('srPeakConcurrentViewersChart', {
          dateRange: dateRange.join(''),
          viewers: average(streams)
        })}
      </div>
    </Card>
  )
}

const average = (streams: StreamsSchema) => {
  return Math.round(
    streams.reduce((acc, cur) => acc + cur.metrics.avgConcurrentViewers, 0) /
      streams.length
  )
}
