'use client'

import { PropsWithoutRef } from 'react'
import { useFormatter } from 'next-intl'
import Bullet from 'components/styles/Bullet'
import Image from 'components/styles/Image'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'

type TooltipProps = {
  title: string
  date: string
  thumbnail: string | undefined
  /** Videosから取得できる視聴回数 */
  views?: number
  /** Streamから取得できる最大同時視聴者数 */
  peakConcurrentViewers?: number
}

type Props = {
  payload?: { payload: TooltipProps }[]
}

export default function ThumbnailTooltip({ payload }: PropsWithoutRef<Props>) {
  const data = payload?.at(0)?.payload
  const format = useFormatter()
  if (!data) return null
  const { title, thumbnail, date, views, peakConcurrentViewers } = data

  return (
    <section className="grid h-auto w-40 sm:w-48 grid-cols-3 p-2 gap-2 bg-popover rounded border text-sm text-muted-foreground">
      <section className="col-span-full">
        <div className="aspect-video overflow-hidden rounded-sm">
          <Image
            width={160}
            height={90}
            alt={'tooltip image'}
            src={thumbnail ?? ''}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="col-span-full line-clamp-2 break-all">
        {title}
      </section>

      <section className="col-span-full flex">
        {!!views && (
          <div className="font-bold">
            <IntlNumberFormat>{views ?? 0}</IntlNumberFormat> views
          </div>
        )}
        {!!peakConcurrentViewers && (
          <div className="font-bold text-popover-foreground">
            Peak{' '}
            <IntlNumberFormat>{peakConcurrentViewers ?? 0}</IntlNumberFormat>
          </div>
        )}
        <Bullet />
        <div>
          {format.dateTime(new Date(date ?? 0), {
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </section>
    </section>
  )
}
