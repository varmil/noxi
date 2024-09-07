'use client'

import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('Features.youtube.video')
  return (
    <>
      <RadialChart
        config={config}
        Icon={CommentIcon}
        rate={rate}
        maxRate={0.3}
      />
      <div className="sr-only">
        {t('commentRatio', { rate: rate.toFixed(2) })}
      </div>
    </>
  )
}
