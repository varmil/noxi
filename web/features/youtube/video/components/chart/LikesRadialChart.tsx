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

export function LikesRadialChart({ rate }: PropsWithoutRef<Props>) {
  return <RadialChart config={config} name="Likes" rate={rate} maxRate={15} />
}
