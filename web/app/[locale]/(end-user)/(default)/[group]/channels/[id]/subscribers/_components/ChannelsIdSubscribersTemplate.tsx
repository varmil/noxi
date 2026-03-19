'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import { StatisticsHistoryChart } from 'features/statistics-history/components/StatisticsHistoryChart'
import { StatisticsHistoryFilters } from 'features/statistics-history/components/StatisticsHistoryFilters'
import { StatisticsHistoryTable } from 'features/statistics-history/components/StatisticsHistoryTable'
import { useStatisticsHistoryParams } from 'features/statistics-history/hooks/useStatisticsHistoryParams'
import type {
  IntervalType,
  StatisticsHistoryPoint
} from 'features/statistics-history/types/statistics-history'

interface Props {
  data: StatisticsHistoryPoint[]
  interval: IntervalType
  start: string
  end: string
}

export function ChannelsIdSubscribersTemplate({
  data,
  interval,
  start,
  end
}: Props) {
  const feat = useTranslations('Features.statisticsHistory')
  const { setParams } = useStatisticsHistoryParams()

  const handleIntervalChange = useCallback(
    (newInterval: IntervalType) => {
      setParams({ interval: newInterval, start, end })
    },
    [setParams, start, end]
  )

  const handleDateRangeChange = useCallback(
    (newStart: string, newEnd: string) => {
      setParams({ interval, start: newStart, end: newEnd })
    },
    [setParams, interval]
  )

  return (
    <Sections>
      <Section>
        <div className="space-y-10">
          <StatisticsHistoryFilters
            interval={interval}
            start={start}
            end={end}
            onIntervalChange={handleIntervalChange}
            onDateRangeChange={handleDateRangeChange}
          />
          <section className="space-y-6 max-w-6xl mx-auto">
            <StatisticsHistoryChart
              data={data}
              labels={{
                total: feat('chart.total'),
                diff: feat('chart.diff')
              }}
              interval={interval}
            />
            <StatisticsHistoryTable
              data={data}
              labels={{
                date: feat('table.date'),
                total: feat('table.total'),
                diff: feat('table.diff')
              }}
              totalLabel={feat('total')}
              interval={interval}
            />
          </section>
        </div>
      </Section>
    </Sections>
  )
}
