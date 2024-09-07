'use client'

import { PropsWithoutRef } from 'react'
import { ChartConfig } from '@/components/ui/chart'
import CommentIcon from 'components/icons/CommentIcon'
import { RadialChart } from 'features/youtube/video/components/chart/RadialChart'

type Props = {
  rate: number
}

export function CommentsRadialChart({ rate }: PropsWithoutRef<Props>) {
  const config = {
    main: {
      color: rate > 0.2 ? 'hsl(var(--chart-3))' : 'hsl(var(--muted))'
    }
  } satisfies ChartConfig
  return (
    <RadialChart config={config} Icon={CommentIcon} rate={rate} maxRate={0.3} />
  )
}
