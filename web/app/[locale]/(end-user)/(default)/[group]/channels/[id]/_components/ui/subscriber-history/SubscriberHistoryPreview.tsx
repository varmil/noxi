import { getTranslations } from 'next-intl/server'
import { getAggregatedSubscriberCounts } from 'apis/channel-statistics/getAggregatedSubscriberCounts'
import { StatisticsHistoryChart } from 'features/statistics-history/components/StatisticsHistoryChart'

interface Props {
  channelId: string
}

export async function SubscriberHistoryPreview({ channelId }: Props) {
  const feat = await getTranslations('Features.statisticsHistory')
  const now = new Date()
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setDate(now.getDate() - 90)

  const gte = new Date(
    Date.UTC(
      threeMonthsAgo.getFullYear(),
      threeMonthsAgo.getMonth(),
      threeMonthsAgo.getDate(),
      -9
    )
  )
  const lt = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1, -9)
  )

  const data = await getAggregatedSubscriberCounts({
    channelId,
    gte,
    lt,
    interval: 'weekly'
  })

  return (
    <StatisticsHistoryChart
      data={data}
      labels={{
        total: feat('chart.total'),
        diff: feat('chart.diff')
      }}
    />
  )
}
