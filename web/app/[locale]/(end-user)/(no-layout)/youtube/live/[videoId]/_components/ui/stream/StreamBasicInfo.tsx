import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getChannel } from 'apis/youtube/getChannel'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { LiveTitleDropdownMenu } from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/dropdown-menu/LiveTitleDropdownMenu'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import { Link } from 'lib/navigation'
import { OnelineStatsContainer } from './online-stats/OnelineStats'
import OnelineStatsOfEnded from './online-stats/OnelineStatsOfEnded'
import OnelineStatsOfLive from './online-stats/OnelineStatsOfLive'
import OnelineStatsOfScheduled from './online-stats/OnelineStatsOfScheduled'

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
      {/* Title */}
      <div className="flex w-full items-center justify-between gap-x-2">
        <h1 className="text-lg sm:text-xl font-bold flex-1">{title}</h1>
        <LiveTitleDropdownMenu />
      </div>

      {/* Channel */}
      <div className="flex items-center gap-x-2">
        <Link href={`/${group}/channels/${basicInfo.id}`}>
          <Avatar className="size-8 sm:size-10 transition-all hover:scale-105">
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
              className="flex-1 text-base font-semibold hover:text-accent-foreground"
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
