'use client'

import { PropsWithoutRef } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import * as dayOfWeek from '../utils/dayOfWeek'

const chartConfig = {
  desktop: {
    color: 'hsl(var(--chart-4))'
  },
  label: {
    color: 'hsl(var(--background))'
  }
} satisfies ChartConfig

type Props = {
  streams: StreamsSchema
}

/**
 * @deprecated やや目的が不明瞭なので一旦非推奨
 * 曜日ごとの平均視聴者数を表示するグラフ
 */
export default function ViewsPerDoWBarChart({
  streams
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.chart')
  const format = useFormatter()
  const data = dayOfWeek.useAvarage(streams)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avg. Peak Concurrent Viewers by day of week</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            // layout="vertical"
            margin={{ top: 10 }}
          >
            <CartesianGrid />
            <XAxis
              dataKey="dayOfWeek"
              type="category"
              width={47}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <YAxis
              dataKey="views"
              type="number"
              tickFormatter={v => format.number(v, { notation: 'compact' })}
            />
            <Bar
              dataKey="views"
              // layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="views"
                // position="right"
                // offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={v => format.number(v, { notation: 'compact' })}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Uploaded on{' '}
          <span className="font-medium text-foreground">
            {dayOfWeek.useMaxViewsDay(streams).dayOfWeek}
          </span>{' '}
          are the most viewed
        </CardDescription>
      </CardFooter>
      <div className="sr-only">
        {t('srViewsPerDoWChart')}
        {data.map(dayData =>
          t('srViewsPerDoWChartLoop', {
            views: dayData.peak,
            DoW: dayData.dayOfWeek
          })
        )}
      </div>
    </Card>
  )
}
