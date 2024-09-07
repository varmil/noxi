'use client'

import { PropsWithoutRef } from 'react'
import { ThumbsUp } from 'lucide-react'
import { ChartConfig } from '@/components/ui/chart'
import { RadialChart } from 'features/youtube/video/components/chart/RadialChart'

type Props = {
  rate: number
}

export function LikesRadialChart({ rate }: PropsWithoutRef<Props>) {
  const config = {
    main: {
      color: rate > 10 ? 'hsl(var(--chart-3))' : 'hsl(var(--muted))'
    }
  } satisfies ChartConfig

  return (
    <RadialChart config={config} Icon={ThumbsUp} rate={rate} maxRate={15} />
  )
}
