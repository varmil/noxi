'use client'

import { PropsWithoutRef, useCallback } from 'react'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ReferenceLine,
  XAxis,
  YAxis
} from 'recharts'
import { CardDescription } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip
} from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import ChannelConcurrentViewersCards from 'features/channel/components/concurrent-viewers/card/ChannelConcurrentViewersCards'
import ThumbnailTooltip from '../tooltip/ThumbnailTooltip'
import type { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart'

type Props = {
  streams: StreamsSchema
  chartConfig: ChartConfig
  className?: string
}

export default function Chart({
  streams,
  chartConfig,
  className
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.chart')
  const format = useFormatter()
  const locale = useLocale()

  const data = streams
    .map(stream => ({
      videoId: stream.videoId,
      title: stream.snippet.title,
      date: stream.snippet.publishedAt,
      peakConcurrentViewers: stream.metrics.peakConcurrentViewers,
      avgConcurrentViewers: stream.metrics.avgConcurrentViewers,
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

  const handleClick: CategoricalChartFunc = useCallback(
    (entry, e) => {
      // if it's a touch device, do nothing
      if (window.matchMedia('(pointer: coarse)').matches) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      window.open(
        `/${locale}/youtube/live/${entry.activePayload?.[0].payload?.videoId}`,
        '_blank'
      )
    },
    [locale]
  )

  return (
    <ChartCard className={className}>
      <ChartCardHeader className="px-0">
        <ChartCardTitle>{t('peakConcurrentViewers')}</ChartCardTitle>
        <CardDescription>{dateRange.join(' ')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent className="space-y-2">
        <ChannelConcurrentViewersCards streams={streams} />

        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            margin={{ top: 10 }}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            <CartesianGrid strokeDasharray={'3 3'} />
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
              tickFormatter={v => format.number(v, { notation: 'compact' })}
            />
            <ChartTooltip
              allowEscapeViewBox={{ x: false, y: true }}
              content={<ThumbnailTooltip />}
              wrapperStyle={{ pointerEvents: 'auto' }} // be clickable
              position={{ y: -90 }}
            />
            <Bar
              dataKey="peakConcurrentViewers"
              fill="var(--color-desktop)"
              radius={2}
            />

            <ReferenceLine
              y={average(streams)}
              stroke="var(--muted-foreground)"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value={t('avgConcurrentViewers')}
                offset={10}
                fill="var(--foreground)"
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </ChartCardContent>
      <div className="sr-only">
        {t('srPeakConcurrentViewersChart', {
          dateRange: dateRange.join(''),
          viewers: average(streams).toString()
        })}
      </div>
    </ChartCard>
  )
}

const average = (streams: StreamsSchema) => {
  return Math.round(
    streams.reduce((acc, cur) => acc + cur.metrics.avgConcurrentViewers, 0) /
      streams.length
  )
}
