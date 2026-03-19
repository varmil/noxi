'use client'

import { useTranslations } from 'next-intl'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DateRangePicker } from './DateRangePicker'
import type { IntervalType } from '../types/statistics-history'

const INTERVALS: IntervalType[] = ['daily', 'weekly', 'monthly', 'yearly']

interface Props {
  interval: IntervalType
  start: string
  end: string
  onIntervalChange: (interval: IntervalType) => void
  onDateRangeChange: (start: string, end: string) => void
}

export function StatisticsHistoryFilters({
  interval,
  start,
  end,
  onIntervalChange,
  onDateRangeChange
}: Props) {
  const t = useTranslations('Features.statisticsHistory')

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <DateRangePicker
        start={start}
        end={end}
        onApply={onDateRangeChange}
      />
      <Tabs
        value={interval}
        onValueChange={v => onIntervalChange(v as IntervalType)}
      >
        <TabsList>
          {INTERVALS.map(i => (
            <TabsTrigger key={i} value={i}>
              {t(`interval.${i}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
