import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import { RadialChart } from 'features/youtube/video/components/chart/RadialChart'

type Props = {
  rate: number
}

const config = {
  main: {
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig

export function CommentsRadialChart({ rate }: PropsWithoutRef<Props>) {
  return (
    <RadialChart config={config} name="Comments" rate={rate} maxRate={0.8} />
  )
}
