import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getChannel } from 'apis/youtube/getChannel'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import OnelineStatsOfEnded from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/stream/OnelineStatsOfEnded'
import OnelineStatsOfScheduled from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/stream/OnelineStatsOfScheduled'
import OnelineStatsOfLive from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/stream/online-stats/OnelineStatsOfLive'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import { Link } from 'lib/navigation'
import { OnelineStatsContainer } from './online-stats/OnelineStats'

export default async function StreamBasicInfo({
  stream
}: {
  stream: StreamSchema
}) {
  const {
    snippet: { title, channelId },
    group
  } = stream
  const [{ basicInfo, statistics }] = await Promise.all([getChannel(channelId)])
  const isLive = stream.status === 'live'
  const isScheduled = stream.status === 'scheduled'
  const isEnded = stream.status === 'ended'

  return (
    <section className="space-y-4">
      <h1 className="text-lg sm:text-xl font-bold">{title}</h1>

      {/* Channel */}
      <div className="flex items-center space-x-2">
        <Link href={`/${group}/channels/${basicInfo.id}`} prefetch={true}>
          <Avatar className="w-7 h-7 sm:w-11 sm:h-11 transition-all hover:scale-105">
            <AvatarImage
              src={basicInfo.thumbnails.medium?.url}
              alt={basicInfo.title}
            />
            <AvatarFallback>{basicInfo.title}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <p className="flex gap-x-1 items-center">
            <Link
              href={`/${group}/channels/${basicInfo.id}`}
              prefetch={true}
              className="flex-1 font-semibold hover:text-accent-foreground"
            >
              {basicInfo.title}
            </Link>
            <span className="w-16 text-sm text-muted-foreground">
              <IntlNumberFormat>{statistics.subscriberCount}</IntlNumberFormat>
            </span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <OnelineStatsContainer>
        {isScheduled && <OnelineStatsOfScheduled stream={stream} />}
        {isLive && <OnelineStatsOfLive stream={stream} />}
        {isEnded && <OnelineStatsOfEnded stream={stream} />}
      </OnelineStatsContainer>
    </section>
  )
}
