import { PropsWithoutRef } from 'react'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import Image from 'components/styles/Image'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import { ChannelSchema } from 'features/youtube/types/channelSchema'
import { Link } from 'lib/navigation'

type Props = {
  id: string
  name: string
  thumbnails: ChannelSchema['basicInfo']['thumbnails']
  description: string
  totalViewCount: number
  subscriberCount: number
  publishedAt: string
}

export default function ChannelCard({
  id,
  name,
  thumbnails,
  totalViewCount,
  subscriberCount,
  publishedAt
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.channel')
  return (
    <div className="relative overflow-hidden transition-transform duration-75 ease-in-out rounded-lg border shadow-md group hover:shadow-lg hover:-translate-y-2 flex items-center max-h-48">
      <Link href={`/youtube/channels/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">{t('viewChannel')}</span>
      </Link>
      <Image
        src={{ '1x': thumbnails.medium?.url, '2x': thumbnails.medium?.url }}
        alt={`${t('channel')}: ${name}`}
        width={300}
        height={200}
        className="object-cover w-[33%] h-full rounded-l-lg"
      />
      <div className="px-4 py-2 bg-background flex-1 w-[70%]">
        <h3 className="line-clamp-1 mb-2">{name}</h3>

        <div className="flex items-center gap-2">
          <div className="ra-val mb-0 sm:mb-0.5">
            <div className="text-xs sm:text-sm text-muted-foreground line leading-3">
              <span>{t('totalSubscribers')}</span>
            </div>
            <span className="text-lg font-bold text-primary">
              <IntlNumberFormat>{subscriberCount}</IntlNumberFormat>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            <IntlNumberFormat>{totalViewCount}</IntlNumberFormat>{' '}
            {t('totalViews')}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {t('joined', { date: dayjs(publishedAt).format('MMM DD, YYYY') })}
          </span>
        </div>
      </div>
    </div>
  )
}
