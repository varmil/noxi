'use client'

import { PropsWithoutRef } from 'react'
import { ThumbsUpIcon } from 'lucide-react'
import CommentIcon from 'components/icons/CommentIcon'
import Image from 'components/styles/Image'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import dayjs from 'lib/dayjs'
import type { ViewsBarChartData } from 'features/youtube-stats/components/bar-chart/ViewsBarChart'

type Props = {
  payload?: { payload: ViewsBarChartData }[]
}

export default function ThumbnailTooltip({ payload }: PropsWithoutRef<Props>) {
  const data = payload?.at(0)?.payload
  return (
    <section className="grid h-auto w-40 sm:w-72 grid-cols-3 p-1.5 sm:p-3 gap-1.5 sm:gap-4 bg-secondary rounded-sm border">
      <div className="col-span-2">
        <div className="aspect-video overflow-hidden rounded-sm">
          <Image
            width={160}
            height={90}
            alt={'tooltip image'}
            src={data?.thumnbnail ?? ''}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">
          <IntlNumberFormat>{data?.views ?? 0}</IntlNumberFormat> views
        </div>
      </div>
      <div className="col-span-1 text-xs sm:text-sm text-muted-foreground">
        <div className="mb-1 sm:mb-2">{dayjs(data?.date).format('MMM D')}</div>
        <div>
          <div className="flex items-center gap-1">
            <ThumbsUpIcon className="h-3 w-3" />
            <IntlNumberFormat>{data?.likes ?? 0}</IntlNumberFormat>
          </div>
          <div className="flex items-center gap-1">
            <CommentIcon className="h-3 w-3" />
            <IntlNumberFormat>{data?.comments ?? 0}</IntlNumberFormat>
          </div>
        </div>
      </div>
    </section>
  )
}
