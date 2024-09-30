'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { Area, AreaChart, CartesianGrid } from 'recharts'
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
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { ViewerCountsSchema } from 'apis/youtube/schema/viewerCountSchema'
import {
  StreamStatsGradient,
  StreamStatsXAxis,
  StreamStatsYAxis
} from 'features/stream-stats/chart/StreamStatsAreaChart'
import { useDateRange } from 'features/stream-stats/hooks/useDateRange'

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export default function ViewerCounts({
  viewerCounts,
  stream
}: {
  viewerCounts: ViewerCountsSchema
  stream: StreamSchema
}) {
  const t = useTranslations('Page.group.live.stats')
  const data = useGroupByMinute(viewerCounts)
  const dateRange = useDateRange(
    viewerCounts[0]?.createdAt,
    viewerCounts[viewerCounts.length - 1]?.createdAt
  )

  if (viewerCounts.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Concurrent viewers</CardTitle>
        <CardDescription>{dateRange.join(' ')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 10, left: 0, right: 0 }}
          >
            {StreamStatsXAxis()}
            {StreamStatsYAxis()}
            <CartesianGrid vertical={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
      </CardContent>
      <div className="sr-only">
        {t('srChatCountsChart', {
          dateRange: dateRange.join(''),
          total: stream.metrics.chatMessages
        })}
      </div>
    </Card>
  )
}

/* 5分単位でレコードをグループ化 */
const useGroupByMinute = (
  data: ViewerCountsSchema
): {
  count: number
  time: string
}[] => {
  const format = useFormatter()
  const reduced = data.reduce((acc, cur) => {
    const date = new Date(cur.createdAt)
    const minutes = date.getMinutes()
    const roundedMinutes = Math.floor(minutes / 5) * 5 // 5分単位に丸める

    // 分を5分単位にセットし、秒とミリ秒を0にリセット
    date.setMinutes(roundedMinutes)
    date.setSeconds(0)
    date.setMilliseconds(0)

    // グループ化キーを 'HH:mm' 形式に変換
    const dateKey = format.dateTime(date, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    })

    if (!acc[dateKey]) {
      acc[dateKey] = {
        count: 0,
        time: dateKey
      }
    }

    // チャットデータを集計
    acc[dateKey].count += cur.count

    return acc
  }, {} as Record<string, any>)

  // reduced の結果を配列として返す
  return Object.values(reduced)
}
