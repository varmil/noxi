import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getLast50Streams } from 'utils/stream/getLast50Streams'
import Chart from './Chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-3)'
  }
} satisfies ChartConfig

type Props = {
  channelId: string
}

/** @deprecated 目的が不明瞭なので一旦非推奨 */
export default async function ViewsBarChart({
  channelId
}: PropsWithoutRef<Props>) {
  const streams = await getLast50Streams({ channelId })
  const videos = await getStatistics({
    videoIds: streams.map(stream => stream.videoId)
  })

  if (streams.length === 0) {
    return null
  }

  return (
    <Chart
      chartConfig={chartConfig}
      streams={streams}
      statisticsList={videos}
    />
  )
}
