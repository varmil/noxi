import { PropsWithChildren, PropsWithoutRef } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'api/youtube/schema/channelSchema'
import { StreamSchema } from 'api/youtube/schema/streamSchema'
import Bullet from 'components/styles/Bullet'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import DurationBadge from 'features/group/stream/components/badge/DurationBadge'
import UpcomingBadge from 'features/group/stream/components/badge/UpcomingBadge'
import dayjs from 'lib/dayjs'

const LiveBadge = () => (
  <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded flex items-center gap-1">
    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
    LIVE
  </div>
)

const SmallLiveBadge = () => (
  <div className="relative text-xs text-white bg-red-600 py-0.5 px-1 rounded -mt-1 z-10">
    LIVE
  </div>
)

/**
 * @note 関連動画を見せるUIとしてコメントアウト部分は使えそう
 */
const Container = ({ children }: PropsWithChildren) => (
  // <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">{children}</div>
  <div className="flex flex-col gap-2">{children}</div>
)

/**
 * @note 関連動画を見せるUIとしてコメントアウト部分は使えそう
 */
const ImgContainer = ({ children }: PropsWithChildren) => (
  // <div className="relative aspect-video w-full sm:w-[220px] rounded-lg overflow-hidden">
  <div className="relative aspect-video w-full rounded-lg overflow-hidden">
    {children}
  </div>
)

type Props = {
  stream: StreamSchema
  channel: ChannelSchema
}

export default async function Stream({
  stream,
  channel
}: PropsWithoutRef<Props>) {
  const {
    videoId,
    snippet: { title, thumbnails },
    streamTimes,
    maxViewerCount,
    likeCount
  } = stream

  const isLive = stream.status === 'live'
  const isScheduled = stream.status === 'scheduled'
  const t = useTranslations('Features.stream')
  const format = useFormatter()

  return (
    <Container>
      <ImgContainer>
        <a href={`https://youtube.com/watch?v=${videoId}`} target="_blank">
          <img
            src={thumbnails['high']?.url}
            alt={title}
            className="object-cover w-full h-full"
          />
          {isLive && <LiveBadge />}
          {isScheduled && <UpcomingBadge />}
          {isLive && (
            <DurationBadge
              duration={dayjs
                .duration(dayjs(dayjs()).diff(streamTimes.actualStartTime))
                .toISOString()}
            />
          )}
        </a>
      </ImgContainer>
      <div className="flex-1 grid grid-cols-[auto,1fr,auto] gap-x-3 gap-y-1">
        <div className="items-center text-center">
          <Avatar className="w-9 h-9 sm:w-11 sm:h-11">
            <AvatarImage src={channel.basicInfo.thumbnails['medium']?.url} />
          </Avatar>
          {isLive && <SmallLiveBadge />}
        </div>
        <div>
          <h3 className="text-sm line-clamp-2 mb-1">{title}</h3>
          <div className="col-start-2 flex items-center gap-1">
            <div className="text-xs sm:text-sm text-muted-foreground">
              <div>{channel.basicInfo.title}</div>
              {isLive && (
                <div>
                  <IntlNumberFormat>{maxViewerCount}</IntlNumberFormat>{' '}
                  {t('watching')}
                </div>
              )}
              {isScheduled && (
                <>
                  <span>
                    <IntlNumberFormat>{likeCount}</IntlNumberFormat>{' '}
                    {t('likes')}
                    <Bullet />
                    {t('scheduledFor', {
                      datetime: format.dateTime(
                        new Date(streamTimes.scheduledStartTime),
                        {
                          month: '2-digit',
                          day: '2-digit',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false
                        }
                      )
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
