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
import { StatisticsListSchema } from 'apis/youtube/data-api/schema/statisticsSchema'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import ThumbnailTooltip from '../tooltip/ThumbnailTooltip'

type Props = {
  chartConfig: ChartConfig
  streams: StreamsSchema
  statisticsList: StatisticsListSchema
}

type ViewsBarChartData = {
  title: string
  date: string
  views: number
  likes: number
  comments: number
  thumbnail: string | undefined
}

export default function Chart({
  chartConfig,
  streams,
  statisticsList
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.chart')
  const format = useFormatter()

  const data: ViewsBarChartData[] = streams
    .map(stream => {
      const video = statisticsList.find(stats => stats.id === stream.videoId)
      if (!video) return null
      return { stream, video }
    })
    .filter(item => item !== null)
    .map(({ stream, video }) => ({
      title: stream.snippet.title,
      date: stream.snippet.publishedAt,
      views: video.statistics.viewCount || 0,
      likes: video.statistics.likeCount || 0,
      comments: video.statistics.commentCount || 0,
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
        <CardTitle>{t('viewsChart')}</CardTitle>
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
            <Bar dataKey="views" fill="var(--color-desktop)" radius={2} />

            <ReferenceLine
              y={averageViews(statisticsList)}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Avg. Views"
                className="text-sm"
                offset={10}
                fill="hsl(var(--foreground))"
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <div className="sr-only">
        {t('srViewsChart', {
          dateRange: dateRange.join(''),
          views: averageViews(statisticsList)
        })}
      </div>
    </Card>
  )
}

const averageViews = (statisticsList: StatisticsListSchema) => {
  return Math.round(
    statisticsList.reduce(
      (acc, cur) => acc + (cur.statistics.viewCount ?? 0),
      0
    ) / statisticsList.length
  )
}
