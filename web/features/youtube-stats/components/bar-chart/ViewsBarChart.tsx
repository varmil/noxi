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
import { VideosSchema } from 'api/youtube/schema/videoSchema'
import ThumbnailTooltip from 'features/youtube-stats/components/bar-chart/ThumbnailTooltip'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type Props = {
  videos: VideosSchema
}

export type ViewsBarChartData = {
  date: string
  views: number
  likes: number
  comments: number
  thumnbnail: string | undefined
}

export default function ViewsBarChart({ videos }: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.chart')
  const format = useFormatter()

  const data: ViewsBarChartData[] = videos
    .map(video => ({
      date: video.snippet.publishedAt,
      views: video.statistics.viewCount,
      likes: video.statistics.likeCount,
      comments: video.statistics.commentCount,
      thumnbnail: video.snippet.thumbnails['medium']?.url
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
        <ChartContainer config={chartConfig}>
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
            <ChartTooltip cursor={true} content={<ThumbnailTooltip />} />
            <Bar dataKey="views" fill="var(--color-desktop)" radius={2} />

            <ReferenceLine
              y={averageViews(videos)}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Views"
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
          views: averageViews(videos)
        })}
      </div>
    </Card>
  )
}

const averageViews = (videos: VideosSchema) => {
  return Math.round(
    videos.reduce((acc, cur) => acc + cur.statistics.viewCount, 0) /
      videos.length
  )
}
