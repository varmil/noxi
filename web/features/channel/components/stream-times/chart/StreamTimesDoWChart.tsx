'use client'

import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { CardDescription } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import * as dayOfWeek from '../utils/dayOfWeek'

const chartConfig = {
  desktop: {
    color: 'var(--chart-2)'
  },
  label: {
    color: 'var(--background)'
  }
} satisfies ChartConfig

type Props = {
  streams: StreamsSchema
}

export default function StreamTimesDoWChart({
  streams
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.channel.streamTimes.chart.countsByDoW')
  const data = dayOfWeek.useGroupByDay(streams)

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>{t('title')}</ChartCardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data} margin={{ top: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dayOfWeek"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              tickFormatter={value => value.slice(0, 3)}
            />
            <YAxis
              width={30}
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <Bar dataKey="count" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </ChartCardContent>

      <div className="sr-only">
        {t('srOnly')}
        {data.map(dayData =>
          t('srOnlyLoop', {
            count: dayData.count.toString(),
            DoW: dayData.dayOfWeek
          })
        )}
      </div>
    </ChartCard>
  )
}
