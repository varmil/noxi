import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { getLast50Streams } from 'utils/stream/getLast50Streams'
import Chart from './Chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

type Props = {
  channelId: string
  className?: string
}

export default async function ConcurrentViewersBarChart({
  channelId,
  className
}: PropsWithoutRef<Props>) {
  const streams = await getLast50Streams({ channelId })

  if (streams.length === 0) {
    return null
  }

  return (
    <Chart className={className} chartConfig={chartConfig} streams={streams} />
  )
}
