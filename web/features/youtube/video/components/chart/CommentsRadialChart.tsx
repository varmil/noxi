'use client'

import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { ChartConfig } from '@/components/ui/chart'
import CommentIcon from 'components/icons/CommentIcon'
import { RadialChart } from 'features/youtube/video/components/chart/RadialChart'

type Props = {
  rate: number
}

const MAX_RATE = 0.3

export function CommentsRadialChart({ rate }: PropsWithoutRef<Props>) {
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
        Icon={CommentIcon}
        rate={rate}
        maxRate={MAX_RATE}
      />
      <div className="sr-only">
        {t('commentRatio', { rate: rate.toFixed(2) })}
      </div>
    </>
  )
}
