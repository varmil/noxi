'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { CardDescription } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { ViewerCountsSchema } from 'apis/youtube/schema/viewerCountSchema'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import {
  StreamStatsGradient,
  StreamStatsXAxis,
  StreamStatsYAxis
} from 'features/stream-stats/chart/StreamStatsAreaChart'
import { useDateRange } from 'features/stream-stats/hooks/useDateRange'
import { FormatForTick } from 'features/stream-stats/hooks/useFormattedDatetime'

const chartConfig = {
  count: {
    label: 'Count',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

export default function ViewerCounts({
  viewerCounts,
  stream
}: {
  viewerCounts: ViewerCountsSchema
  stream: StreamSchema
}) {
  const format = useFormatter()
  const t = useTranslations('Features.streamStats')
  const dateRange = useDateRange(
    viewerCounts[0]?.createdAt,
    viewerCounts[viewerCounts.length - 1]?.createdAt
  )

  if (viewerCounts.length === 0) return null

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>Concurrent viewers</ChartCardTitle>
        <CardDescription>{dateRange.join(' ')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={viewerCounts}
            margin={{ top: 10, left: 0, right: 0 }}
          >
            {StreamStatsXAxis({
              dataKey: 'createdAt',
              tickFormatter: value =>
                format.dateTime(new Date(value), FormatForTick)
            })}
            {StreamStatsYAxis()}
            <CartesianGrid vertical={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(_label, payloads) =>
                    format.dateTime(
                      new Date(payloads[0]?.payload.createdAt),
                      FormatForTick
                    )
                  }
                />
              }
            />
            {StreamStatsGradient({
              id: 'fillCounts',
              color: 'var(--color-count)'
            })}
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillCounts)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
            />
          </AreaChart>
        </ChartContainer>
      </ChartCardContent>
      <div className="sr-only">
        {t('srViewerCountsChart', {
          dateRange: dateRange.join(''),
          peak: stream.metrics.peakConcurrentViewers.toString()
        })}
      </div>
    </ChartCard>
  )
}
