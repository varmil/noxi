'use client'

import { PropsWithoutRef } from 'react'
import { ThumbsUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ChartConfig } from '@/components/ui/chart'
import { RadialChart } from 'features/youtube/video/components/chart/RadialChart'

type Props = {
  rate: number
}

const MAX_RATE = 15

export function LikesRadialChart({ rate }: PropsWithoutRef<Props>) {
  const config = {
    main: {
      color: 'hsl(var(--muted))'
    },
    text: {
      color:
        rate >= MAX_RATE
          ? 'hsl(var(--foreground))'
          : 'hsl(var(--muted-foreground))'
    }
  } satisfies ChartConfig

  const t = useTranslations('Features.youtube.video')
  return (
    <>
      <RadialChart
        config={config}
        Icon={ThumbsUp}
        rate={rate}
        maxRate={MAX_RATE}
      />
      <div className="sr-only">{t('likeRatio', { rate: rate.toFixed(2) })}</div>
    </>
  )
}
