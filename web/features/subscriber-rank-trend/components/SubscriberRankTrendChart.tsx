'use client'

import { useMemo } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { SubscriberRankTrendSchema } from 'apis/subscriber-rank-trends/schema/subscriberRankTrendSchema'
import ChartTooltipFormatter from 'components/chart/ChartTooltipFormatter'
import { ChartCard } from 'components/styles/card/ChartCard'
import type { NameType } from 'recharts/types/component/DefaultTooltipContent'

interface Props {
  data: SubscriberRankTrendSchema
}

function toPercentile(rank: number, total: number): number {
  return Math.round((rank / total) * 1000) / 10
}

export function SubscriberRankTrendChart({ data }: Props) {
  const t = useTranslations('Features.subscriberRankTrend')
  const format = useFormatter()

  const chartConfig: ChartConfig = {
    percentile: {
      label: t('rank'),
      color: 'var(--chart-1)'
    }
  }

  const chartData = useMemo(
    () =>
      data.points.map(p => ({
        week: p.week,
        percentile: toPercentile(p.rank, p.totalChannels),
        rank: p.rank,
        totalChannels: p.totalChannels,
        subscriberCount: p.subscriberCount
      })),
    [data.points]
  )

  const currentPercentile =
    chartData.length > 0
      ? chartData[chartData.length - 1].percentile
      : undefined

  const trendColor =
    data.trend === 'upward'
      ? 'text-green-600'
      : data.trend === 'downward'
        ? 'text-red-500'
        : 'text-muted-foreground'

  const formatWeek = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <ChartCard>
      <div className="flex items-center gap-6">
        {/* 左: パーセンタイル + トレンド */}
        <div className="shrink-0 min-w-[80px] text-center">
          {currentPercentile !== undefined && (
            <div className="text-3xl font-bold tabular-nums">
              {t('topPrefix')}
              {currentPercentile}
              <span className="text-base font-normal text-muted-foreground ml-0.5">
                %
              </span>
            </div>
          )}
          <div className={`text-sm ${trendColor}`}>
            {t(`trend.${data.trend}`)}
          </div>
        </div>

        {/* 右: チャート */}
        <div className="min-w-0 flex-1">
          <ChartContainer
            config={chartConfig}
            className="h-[120px] sm:h-[220px] w-full"
          >
            <AreaChart
              data={chartData}
              margin={{ left: 0, top: 5, right: 5, bottom: 0 }}
            >
              <defs>
                <linearGradient id="rankFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-percentile)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-percentile)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                minTickGap={40}
                tickFormatter={formatWeek}
              />
              <YAxis reversed domain={['dataMin', 'dataMax']} hide />
              <ChartTooltip
                allowEscapeViewBox={{ x: false, y: true }}
                content={
                  <ChartTooltipContent
                    className="w-[180px] sm:w-[200px]"
                    labelFormatter={(_label, payloads) =>
                      format.dateTime(new Date(payloads[0]?.payload.week), {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    formatter={(value, name) => {
                      const key = name as string
                      return (
                        <ChartTooltipFormatter
                          indicatorColor={name}
                          name={(chartConfig[key]?.label as NameType) || name}
                          value={`${t('topPrefix')}${value as number}%`}
                        />
                      )
                    }}
                  />
                }
              />
              <Area
                type="linear"
                dataKey="percentile"
                stroke="var(--color-percentile)"
                strokeWidth={1.5}
                fill="url(#rankFill)"
                baseValue="dataMax"
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {/* SEO・アクセシビリティ用 */}
      <table className="sr-only">
        <caption>{t('title')}</caption>
        <thead>
          <tr>
            <th scope="col">{t('table.week')}</th>
            <th scope="col">{t('table.rank')}</th>
            <th scope="col">{t('table.subscriberCount')}</th>
          </tr>
        </thead>
        <tbody>
          {data.points.map(point => (
            <tr key={point.week}>
              <td>{point.week}</td>
              <td>{format.number(point.rank)}</td>
              <td>{format.number(point.subscriberCount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartCard>
  )
}
