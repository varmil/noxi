import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { getStreamsCount } from 'apis/youtube/getStreams'
import ChartPaginationButtons from 'features/youtube-stats/components/pagination/ChartPaginationButtons'
import { getLast50Streams, PAGE_SIZE } from 'utils/stream/getLast50Streams'
import Chart from './Chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

type Props = {
  channelId: string
  page?: number
  className?: string
}

export default async function ConcurrentViewersBarChart({
  channelId,
  page,
  className
}: PropsWithoutRef<Props>) {
  const [streams, count] = await Promise.all([
    getLast50Streams({ channelId, page }),
    getStreamsCount({
      channelId,
      status: 'ended',
      avgConcurrentViewers: { gte: 1 }
    })
  ])

  if (count === 0) {
    return null
  }

  return (
    <section className="flex flex-col gap-y-4">
      <Chart
        className={className}
        chartConfig={chartConfig}
        streams={streams}
      />
      <ChartPaginationButtons
        totalPages={Math.ceil(count / PAGE_SIZE)}
        className="ml-8"
      />
    </section>
  )
}
