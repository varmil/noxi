'use client'

import { useMemo } from 'react'
import { NumberFormatOptions, useFormatter, useTranslations } from 'next-intl'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { CardDescription } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { GoldenTimesSchema } from 'apis/youtube/schema/goldenTimeSchema'
import ChartTooltipFormatter from 'components/chart/ChartTooltipFormatter'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader,
  ChartCardTitle
} from 'components/styles/card/ChartCard'
import type { NameType } from 'recharts/types/component/DefaultTooltipContent'

const NumberFormat: NumberFormatOptions = {
  notation: 'compact'
}

/** 偶数・奇数で上下2段に分けて表示するカスタムtick */
function StaggeredTick({
  x,
  y,
  payload
}: {
  x: number
  y: number
  payload: { value: number }
}) {
  const hour = payload.value
  // 奇数時は上段（y座標を小さく）、偶数時は下段
  const yOffset = hour % 2 === 1 ? -4 : 8
  return (
    <text
      x={x}
      y={y + yOffset}
      textAnchor="middle"
      className="fill-muted-foreground text-xs"
    >
      {hour}
    </text>
  )
}

// 曜日キー（月曜始まり）
const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
type DayKey = (typeof DAY_KEYS)[number]

interface TransformedData {
  hour: number
  mon: number
  tue: number
  wed: number
  thu: number
  fri: number
  sat: number
  sun: number
}

interface Props {
  data: GoldenTimesSchema
}

export function GoldenTimeChart({ data }: Props) {
  const t = useTranslations('Features.goldenTime')
  const tGlobal = useTranslations('Global')
  const format = useFormatter()

  // APIレスポンスをRechartsの積み上げ棒グラフ用に変換
  const chartData = useMemo(() => {
    const hourMap = new Map<number, TransformedData>()

    // 0-23時で初期化
    for (let h = 0; h < 24; h++) {
      hourMap.set(h, {
        hour: h,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
        sun: 0
      })
    }

    // APIデータをマッピング
    for (const item of data) {
      const hourData = hourMap.get(item.hour)
      if (hourData) {
        const dayKey = DAY_KEYS[item.dayOfWeek]
        hourData[dayKey] = item.streamCount
      }
    }

    return Array.from(hourMap.values())
  }, [data])

  const weekdayLabels: Record<DayKey, string> = {
    mon: tGlobal('weekday.mon'),
    tue: tGlobal('weekday.tue'),
    wed: tGlobal('weekday.wed'),
    thu: tGlobal('weekday.thu'),
    fri: tGlobal('weekday.fri'),
    sat: tGlobal('weekday.sat'),
    sun: tGlobal('weekday.sun')
  }

  // 月～金: chart-2、土日: chart-1
  const chartConfig: ChartConfig = {
    mon: { label: weekdayLabels.mon, color: 'var(--chart-2)' },
    tue: { label: weekdayLabels.tue, color: 'var(--chart-2)' },
    wed: { label: weekdayLabels.wed, color: 'var(--chart-2)' },
    thu: { label: weekdayLabels.thu, color: 'var(--chart-2)' },
    fri: { label: weekdayLabels.fri, color: 'var(--chart-2)' },
    sat: { label: weekdayLabels.sat, color: 'var(--chart-1)' },
    sun: { label: weekdayLabels.sun, color: 'var(--chart-1)' }
  }

  const formatHour = (hour: number) => `${hour}`

  return (
    <ChartCard>
      <ChartCardHeader>
        <ChartCardTitle>{t('title')}</ChartCardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </ChartCardHeader>
      <ChartCardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ left: -20, top: 10, right: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              interval={0}
              tick={StaggeredTick}
            />
            <YAxis
              tickLine={false}
              tickFormatter={(value: number) =>
                format.number(value, NumberFormat)
              }
            />
            <ChartTooltip
              allowEscapeViewBox={{ x: false, y: true }}
              wrapperStyle={{ zIndex: 10 }}
              content={
                <ChartTooltipContent
                  className="w-[180px] sm:w-[200px]"
                  labelFormatter={(_label, [{ payload }]) =>
                    `${payload.hour}${t('hourSuffix')}`
                  }
                  formatter={(value, name) => {
                    const key = name as DayKey
                    const formattedValue = format.number(value as number)
                    return (
                      <ChartTooltipFormatter
                        indicatorColor={name}
                        name={(chartConfig[key]?.label as NameType) || name}
                        value={formattedValue}
                      />
                    )
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            {/* 月曜始まり順で積み上げ（stackId="a"で同一スタック） */}
            {DAY_KEYS.map(dayKey => (
              <Bar
                key={dayKey}
                dataKey={dayKey}
                stackId="a"
                fill={`var(--color-${dayKey})`}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ChartContainer>
        {/* SEO・アクセシビリティ用テーブル */}
        <table className="sr-only">
          <caption>{t('title')}</caption>
          <thead>
            <tr>
              <th scope="col">{t('table.hour')}</th>
              {DAY_KEYS.map(dayKey => (
                <th key={dayKey} scope="col">
                  {weekdayLabels[dayKey]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chartData.map(row => (
              <tr key={row.hour}>
                <td>{formatHour(row.hour)}</td>
                {DAY_KEYS.map(dayKey => (
                  <td key={dayKey}>{row[dayKey]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCardContent>
    </ChartCard>
  )
}
